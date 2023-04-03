import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Popover,
  Table,
  message,
  Modal,
  Form,
  Input,
  Popconfirm,
} from "antd";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  Text,
  HomeText,
  PopWrapper,
  OtherMenu,
  GuideUl,
  GuideLi,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import {
  UP_DEL_REQUEST,
  UP_LIST_REQUEST,
  UP_NEW_REQUEST,
  UP_UPDATE_REQUEST,
  DOWN_LIST_REQUEST,
} from "../../../reducers/category";

const Category = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    upList,
    downList,
    //
    st_upNewDone,
    st_upNewError,
    st_upUpdateDone,
    st_upUpdateError,
    st_upDelDone,
    st_upDelError,
  } = useSelector((state) => state.category);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("기초정보관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [nForm] = Form.useForm();
  const [uForm] = Form.useForm();

  const [newModal, setNewModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [currentUp, setCurrentUp] = useState(null);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const content = (
    <PopWrapper>
      {sameDepth.map((data) => {
        if (data.name === level2) return;

        return (
          <OtherMenu key={data.link} onClick={() => moveLinkHandler(data.link)}>
            {data.name}
          </OtherMenu>
        );
      })}
    </PopWrapper>
  );

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////

  ////// USEEFFECT //////

  // 상위 카테고리 생성 후처리
  useEffect(() => {
    if (st_upNewDone) {
      nForm.resetFields();
      newModalToggle();
      dispatch({
        type: UP_LIST_REQUEST,
      });
    }

    if (st_upNewError) {
      return message.error(st_upNewError);
    }
  }, [st_upNewDone, st_upNewError]);

  // 상위 카테고리 수정 후처리
  useEffect(() => {
    if (st_upUpdateDone) {
      uForm.resetFields();
      updateModalToggle(null);
      dispatch({
        type: UP_LIST_REQUEST,
      });
    }

    if (st_upUpdateError) {
      return message.error(st_upUpdateError);
    }
  }, [st_upUpdateDone, st_upUpdateError]);

  // 상위 카테고리 삭제 후처리
  useEffect(() => {
    if (st_upDelDone) {
      dispatch({
        type: UP_LIST_REQUEST,
      });
    }

    if (st_upDelError) {
      return message.error(st_upDelError);
    }
  }, [st_upDelDone, st_upDelError]);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight2)) {
        message.error("접근권한이 없는 페이지 입니다.");
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  useEffect(() => {
    const currentMenus = items[level1];

    setSameDepth(currentMenus);

    currentMenus.map((data) => {
      if (data.link === router.pathname) {
        setLevel2(data.name);
      }
    });
  }, []);

  ////// HANDLER //////
  const newModalToggle = useCallback(() => {
    setNewModal((p) => !p);
  }, [newModal]);

  const updateModalToggle = useCallback(
    (row) => {
      setUpdateModal((p) => !p);

      if (updateModal) {
      } else {
        uForm.setFieldsValue({
          id: row.id,
          value: row.value,
        });
      }
    },
    [updateModal, uForm]
  );

  const nFormSubmitHandler = useCallback(({ value }) => {
    dispatch({
      type: UP_NEW_REQUEST,
      data: {
        value,
      },
    });
  }, []);

  const uFormSubmitHandler = useCallback(({ id, value }) => {
    dispatch({
      type: UP_UPDATE_REQUEST,
      data: {
        id,
        value,
      },
    });
  }, []);

  const upDeleteHandler = useCallback((id) => {
    dispatch({
      type: UP_DEL_REQUEST,
      data: {
        id,
      },
    });
  }, []);

  const selectHandler = useCallback((row) => {
    setCurrentUp(row);

    dispatch({
      type: DOWN_LIST_REQUEST,
      data: {
        CateUpId: row.id,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////
  const columns1 = [
    {
      title: "번호",
      dataIndex: "num",
    },

    {
      title: "카테고리명",
      dataIndex: "value",
    },

    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },

    {
      title: "최근수정일",
      dataIndex: "viewUpdatedAt",
    },

    {
      title: "제어",
      render: (row) => (
        <Wrapper dr="row" ju="flex-start">
          <Button
            size="small"
            type="default"
            onClick={() => updateModalToggle(row)}
          >
            수정
          </Button>

          <Popconfirm
            title="정말 삭제하시겠습니까?"
            okText="삭제"
            cancelText="취소"
            onConfirm={() => upDeleteHandler(row.id)}
          >
            <Button size="small" type="danger">
              삭제
            </Button>
          </Popconfirm>
        </Wrapper>
      ),
    },

    {
      title: "제어2",
      render: (row) => (
        <Wrapper al="flex-start">
          <Button
            size="small"
            type={
              currentUp && parseInt(currentUp.id) === parseInt(row.id)
                ? "primary"
                : "dashed"
            }
            onClick={() => selectHandler(row)}
          >
            하위 카테고리 관리
          </Button>
        </Wrapper>
      ),
    },
  ];

  const columns2 = [
    {
      title: "번호",
      dataIndex: "num",
    },

    {
      title: "세부카테고리명",
      dataIndex: "value",
    },

    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },

    {
      title: "최근수정일",
      dataIndex: "viewUpdatedAt",
    },

    {
      title: "제어",
      render: (row) => (
        <Wrapper dr="row" ju="flex-start">
          <Button size="small" type="default">
            수정
          </Button>

          <Popconfirm
            title="정말 삭제하시겠습니까?"
            okText="삭제"
            cancelText="취소"
          >
            <Button size="small" type="danger">
              삭제
            </Button>
          </Popconfirm>
        </Wrapper>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* MENU TAB */}
      <Wrapper
        height={`30px`}
        bgColor={Theme.lightGrey_C}
        dr={`row`}
        ju={`flex-start`}
        al={`center`}
        padding={`0px 15px`}
        color={Theme.grey_C}
      >
        <HomeText
          margin={`3px 20px 0px 20px`}
          onClick={() => moveLinkHandler("/admin")}
        >
          <HomeOutlined style={{ fontSize: "15px", marginRight: "5px" }} />
          메인
        </HomeText>
        <RightOutlined />
        <Text margin={`3px 20px 0px 20px`}>{level1} </Text>
        <RightOutlined />
        <Popover content={content}>
          <HomeText cur={true} margin={`3px 20px 0px 20px`}>
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>
            화면에 즉시 반영되는 카테고리를 제어할 수 있습니다. 카테고리는 이름
            순으로 정렬 됩니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            삭제된 카테고리는 복구할 수 없으니 신중한 처리가 필요합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* CONTENT */}
      <Wrapper padding="0px 20px">
        <Wrapper>
          <Wrapper dr="row" ju="flex-start">
            <Text margin="0px 10px 0px 0px">
              상위 카테고리 [{upList.length}개]
            </Text>
            <Button size="small" type="primary" onClick={newModalToggle}>
              + 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            size="small"
            columns={columns1}
            dataSource={upList}
            rowKey="id"
          ></Table>
        </Wrapper>

        <Wrapper
          height="1px"
          bgColor={Theme.lightGrey2_C}
          margin="30px 0px"
        ></Wrapper>

        {currentUp ? (
          <Wrapper>
            <Wrapper dr="row" ju="flex-start">
              <Text margin="0px 10px 0px 0px">세부 카테고리</Text>
              <Button size="small" type="primary">
                + 생성
              </Button>
            </Wrapper>
            <Table
              style={{ width: "100%" }}
              size="small"
              columns={columns2}
              dataSource={downList}
              rowKey="id"
            ></Table>
          </Wrapper>
        ) : (
          <Wrapper dr="row">
            <Text color={Theme.darkGrey_C}>
              상단 상위 카테고리를 선택하면, 하위 카테고리 관리가 가능합니다.
            </Text>
          </Wrapper>
        )}
      </Wrapper>

      {/* NEW MODAL */}
      <Modal
        width="530px"
        footer={null}
        visible={newModal}
        title="상위 카테고리 생성하기"
        onCancel={newModalToggle}
      >
        <Text fontSize="11.5px" color={Theme.red_C} margin="0px 0px 15px 0px">
          카테고리명은 가능한 짧은 단어로 구성해주세요. 최대 10자를 넘어가면
          디자인이 상이해질 수 있습니다.
        </Text>

        <Form form={nForm} colon={false} onFinish={nFormSubmitHandler}>
          <Form.Item
            label="카테고리명"
            name="value"
            rules={[{ required: true, message: "카테고리명은 필수 입니다." }]}
          >
            <Input
              size="small"
              placeholder="새로 생성할 카테고리명을 입력해주세요."
              maxLength={15}
            />
          </Form.Item>

          <Wrapper al="flex-end">
            <Button size="small" type="primary" htmlType="submit">
              생성
            </Button>
          </Wrapper>
        </Form>
      </Modal>

      {/* UPDATE MODAL */}
      <Modal
        width="530px"
        footer={null}
        visible={updateModal}
        title="상위 카테고리 수정하기"
        onCancel={() => updateModalToggle(null)}
      >
        <Text fontSize="11.5px" color={Theme.red_C} margin="0px 0px 15px 0px">
          카테고리명은 가능한 짧은 단어로 구성해주세요. 최대 10자를 넘어가면
          디자인이 상이해질 수 있습니다.
        </Text>

        <Form form={uForm} colon={false} onFinish={uFormSubmitHandler}>
          <Form.Item name="id" hidden>
            <Input size="small" maxLength={15} />
          </Form.Item>

          <Form.Item
            label="카테고리명"
            name="value"
            rules={[{ required: true, message: "카테고리명은 필수 입니다." }]}
          >
            <Input size="small" maxLength={15} />
          </Form.Item>

          <Wrapper al="flex-end">
            <Button size="small" type="primary" htmlType="submit">
              수정
            </Button>
          </Wrapper>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: UP_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Category);
