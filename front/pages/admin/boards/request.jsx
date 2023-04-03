import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Popover, Table, message } from "antd";
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
  SearchForm,
  SearchFormItem,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  AlertOutlined,
  CheckOutlined,
  CloseOutlined,
  HomeOutlined,
  RightOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  REQUEST_ADMIN_LIST_REQUEST,
  REQUEST_ANSWER_UPDATE_REQUEST,
} from "../../../reducers/request";

const InfoTitle = styled.div`
  font-size: 19px;
  margin: 15px 0px 5px 0px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
  color: ${(props) => props.theme.subTheme5_C};
`;

const Request = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    requestAdminList,

    st_requestAnswerUpdateDone,
    st_requestAnswerUpdateError,
  } = useSelector((state) => state.request);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("게시판관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  const [infoForm] = Form.useForm();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const content = (
    <PopWrapper>
      {sameDepth.map((data) => {
        if (data.name === level2) return;
        if (!data.useYn) return;

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
  const [isCom, setIsCom] = useState(2);

  const [searchForm] = Form.useForm();

  const [searchProductName, setSearchProductName] = useState("");
  const [searchUserName, setSearchUserName] = useState("");

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight4)) {
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

  useEffect(() => {
    dispatch({
      type: REQUEST_ADMIN_LIST_REQUEST,
      data: {
        listType: isCom,
        searchProductName: searchProductName,
        searchUserName: searchUserName,
      },
    });
  }, [isCom, searchProductName, searchUserName]);

  //// ********************** 답변 생성 후처리 *************************
  useEffect(() => {
    if (st_requestAnswerUpdateDone) {
      dispatch({
        type: REQUEST_ADMIN_LIST_REQUEST,
      });

      return message.success("답변이 생성되었습니다.");
    }
    if (st_requestAnswerUpdateError) {
      return message.error(st_requestAnswerUpdateError);
    }
  }, [st_requestAnswerUpdateDone, st_requestAnswerUpdateError]);

  ////// HANDLER //////
  const searchProductHandler = useCallback(
    (data) => {
      searchForm.resetFields();
      setSearchProductName(data.productName);
      setSearchUserName(data.name);
    },
    [searchProductName, searchUserName]
  );

  // const searchUserHandler = useCallback(
  //   (data) => {
  //     userSearchForm.resetFields();
  //     setSearchUserName(data.name);
  //   },
  //   [searchUserName]
  // );

  const allSearchHandler = useCallback(() => {
    searchForm.resetFields();
    setSearchProductName("");
    setSearchUserName("");
  }, [searchProductName, searchUserName]);

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      infoForm.setFieldsValue({
        productName: record.productName,
        content: record.content,
        name: record.name,
        email: record.email,
        mobile: record.mobile,
        productUrl: record.productUrl,
        password: record.password,
        answer: record.answer,
      });
    },
    [currentData, infoForm]
  );

  const updateHandler = useCallback(
    (data) => {
      dispatch({
        type: REQUEST_ANSWER_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          answer: data.answer,
        },
      });
    },
    [currentData]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "상품명",
      dataIndex: "productName",
    },
    {
      title: "작성자",
      dataIndex: "name",
    },

    {
      title: "답변상태",
      render: (data) => (
        <Text>
          {data.isCompleted ? (
            <CheckOutlined style={{ color: Theme.naver_C }} />
          ) : (
            <CloseOutlined style={{ color: Theme.red_C }} />
          )}
        </Text>
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
          <GuideLi>상품요청 조회 및 답변 관리를 할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            초기데이터는 미완료된 데이터로 조회됩니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* 검색 */}
      <Wrapper dr={`row`} ju={`space-between`}>
        <SearchForm
          form={searchForm}
          onFinish={searchProductHandler}
          layout="inline"
          style={{ width: "100%" }}
        >
          <SearchFormItem name="productName">
            <Input size="small" placeholder="상품명으로 검색해주세요." />
          </SearchFormItem>
          <SearchFormItem>
            <Button icon={<SearchOutlined />} size="small" htmlType="submit">
              검색
            </Button>
          </SearchFormItem>
          <SearchFormItem name="name">
            <Input size="small" placeholder="작성자로 검색해주세요." />
          </SearchFormItem>
          <SearchFormItem>
            <Button icon={<SearchOutlined />} size="small" htmlType="submit">
              검색
            </Button>
          </SearchFormItem>
          <SearchFormItem>
            <Button
              icon={<UnorderedListOutlined />}
              size="small"
              type="primary"
              onClick={allSearchHandler}
            >
              전체조회
            </Button>
          </SearchFormItem>
        </SearchForm>
      </Wrapper>

      <Wrapper padding={`10px 20px`} dr={`row`} ju={`flex-start`}>
        <Button
          type={isCom === 2 ? "primary" : "default"}
          onClick={() => setIsCom(2)}
          size="small"
        >
          미완료
        </Button>
        <Button
          type={isCom === 1 ? "primary" : "default"}
          onClick={() => setIsCom(1)}
          size="small"
          style={{ margin: `0 5px` }}
        >
          완료
        </Button>
        <Button
          type={isCom === 3 ? "primary" : "default"}
          onClick={() => setIsCom(3)}
          size="small"
        >
          전체
        </Button>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju={`space-between`}>
        <Wrapper
          width={`calc(50% - 10px)`}
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Table
            style={{ width: "100%" }}
            rowKey="num"
            columns={col}
            dataSource={requestAdminList}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>

        <Wrapper
          width={`calc(50% - 10px)`}
          padding="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <Wrapper>
              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  상품요청 기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                style={{ width: `100%` }}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                onFinish={updateHandler}
              >
                <Form.Item label="상품명" name="productName">
                  <Input
                    style={{ background: Theme.lightGrey3_C, border: "none" }}
                    size="small"
                    readOnly
                  />
                </Form.Item>

                <Form.Item contentEditable={true} label="내용" name="content">
                  <Input.TextArea
                    style={{ background: Theme.lightGrey3_C, border: "none" }}
                    rows={5}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="이름" name="name">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey3_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="연락처" name="mobile">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey3_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="이메일" name="email">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey3_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="상품URL" name="productUrl">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey3_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="비밀번호" name="password">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey3_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>
                <Wrapper margin={`0px 0px 5px 0px`}>
                  <InfoTitle>
                    <CheckOutlined />
                    상품요청 답변
                  </InfoTitle>
                </Wrapper>

                <Form.Item label="답변내용" name="answer">
                  <Input.TextArea rows={5} />
                </Form.Item>

                <Wrapper al="flex-end">
                  <Button type="primary" size="small" htmlType="submit">
                    답변하기
                  </Button>
                </Wrapper>
                <Wrapper
                  width="100%"
                  height="1px"
                  bgColor={Theme.lightGrey_C}
                  margin={`30px 0px`}
                ></Wrapper>
              </Form>
            </Wrapper>
          ) : (
            <Wrapper padding={`50px 0px`} dr="row">
              <AlertOutlined
                style={{
                  fontSize: "20px",
                  color: Theme.red_C,
                  marginRight: "5px",
                }}
              />
              좌측 데이터를 선택하여 상세정보를 확인하세요.
            </Wrapper>
          )}
        </Wrapper>
      </Wrapper>
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
      type: REQUEST_ADMIN_LIST_REQUEST,
      data: {
        searchTitle: "",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Request);
