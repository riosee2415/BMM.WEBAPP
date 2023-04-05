import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Popover,
  Table,
  message,
  Select,
  Modal,
  DatePicker,
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
  DelBtn,
  SearchForm,
  SearchFormItem,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST, USERLIST_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  AlertOutlined,
  CheckOutlined,
  EyeOutlined,
  HomeOutlined,
  RightOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  COUPON_CREATE_REQUEST,
  COUPON_DELETE_REQUEST,
  COUPON_GRANT_REQUEST,
  COUPON_LIST_REQUEST,
} from "../../../reducers/coupon";
import moment from "moment";

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

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme5_C : props.theme.lightGrey_C};
`;

const Coupon = ({}) => {
  const { st_loadMyInfoDone, me, users } = useSelector((state) => state.user);
  const {
    couponList,

    st_couponCreateDone,
    st_couponCreateError,

    st_couponDeleteDone,
    st_couponDeleteError,

    st_couponGrantDone,
    st_couponGrantError,
  } = useSelector((state) => state.coupon);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("기초정보관리");
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

  const [searchForm] = Form.useForm();
  const [createForm] = Form.useForm();
  const [grantForm] = Form.useForm();

  const [sort, setSort] = useState(7);
  const [searchTitle, setSearchTitle] = useState("");

  const [cModal, setCModal] = useState(false);
  const [gModal, setGModal] = useState(false);

  ////// USEEFFECT //////

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

  useEffect(() => {
    dispatch({
      type: COUPON_LIST_REQUEST,
      data: {
        title: searchTitle,
        sortType: sort,
      },
    });
  }, [searchTitle, sort]);

  // ********************** 쿠폰 생성 후처리 *************************
  useEffect(() => {
    if (st_couponCreateDone) {
      dispatch({
        type: COUPON_LIST_REQUEST,
        data: {
          title: searchTitle,
          sortType: sort,
        },
      });

      createForm.resetFields();
      createModalToggle();

      return message.success("쿠폰이 등록되었습니다.");
    }

    if (st_couponCreateError) {
      return message.error(st_couponCreateError);
    }
  }, [st_couponCreateDone, st_couponCreateError]);

  // ********************** 쿠폰 삭제 후처리 *************************
  useEffect(() => {
    if (st_couponDeleteDone) {
      dispatch({
        type: COUPON_LIST_REQUEST,
        data: {
          title: searchTitle,
          sortType: sort,
        },
      });

      setCurrentData(null);

      return message.success("쿠폰이 삭제되었습니다.");
    }

    if (st_couponDeleteError) {
      return message.error(st_couponDeleteError);
    }
  }, [st_couponDeleteDone, st_couponDeleteError]);

  // ********************** 쿠폰 부여 후처리 *************************
  useEffect(() => {
    if (st_couponGrantDone) {
      grantForm.resetFields();
      grantModalToggle();

      return message.success("쿠폰이 정상적으로 부여되었습니다.");
    }

    if (st_couponGrantError) {
      return message.error(st_couponGrantError);
    }
  }, [st_couponGrantDone, st_couponGrantError]);

  ////// TOGGLE //////

  const createModalToggle = useCallback(() => {
    setCModal((prev) => !prev);
  }, [cModal]);

  const grantModalToggle = useCallback(() => {
    setGModal((prev) => !prev);
  }, [gModal]);

  ////// HANDLER //////

  const searchHandler = useCallback(
    (data) => {
      setSearchTitle(data.title);
      setSort(data.sort);
    },
    [searchTitle, sort]
  );

  const allSearchHandler = useCallback(() => {
    searchForm.resetFields();
    setSearchTitle("");
    setSort(7);
  }, [searchTitle, sort]);

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      infoForm.setFieldsValue({
        title: record.title,
        description: record.description,
        limitDate: moment(record.limitDate),
        minimunPay: record.minimunPay,
        discountPay: record.discountPay,
        createdAt: record.viewCreatedAt,
        updatedAt: record.viewUpdatedAt,
      });
    },
    [currentData, infoForm]
  );

  const createHandler = useCallback((data) => {
    dispatch({
      type: COUPON_CREATE_REQUEST,
      data: {
        title: data.title,
        description: data.description,
        limitDate: data.limitDate.format("YYYY-MM-DD"),
        minimunPay: data.minimunPay,
        discountPay: data.discountPay,
      },
    });
  }, []);

  const deleteHandler = useCallback((data) => {
    dispatch({
      type: COUPON_DELETE_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);

  const grantHandler = useCallback(
    (data) => {
      dispatch({
        type: COUPON_GRANT_REQUEST,
        data: {
          UserId: data.userid,
          CuponId: currentData.id,
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
      title: "쿠폰명",
      dataIndex: "title",
    },
    {
      title: "최소금액",
      dataIndex: "concatMinimunPay",
    },
    {
      title: "할인금액",
      dataIndex: "concatDiscountPay",
    },
    {
      title: "사용마감일",
      dataIndex: "viewLimitDate",
    },
    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "쿠폰부여",
      render: (data) => (
        <Button size="small" type="primary" onClick={grantModalToggle}>
          쿠폰부여
        </Button>
      ),
    },
    {
      title: "상태창",
      render: (data) => (
        <>
          <ViewStatusIcon
            active={
              parseInt(data.id) === (currentData && parseInt(currentData.id))
            }
          />
        </>
      ),
    },

    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          onConfirm={() => deleteHandler(data)}
          okText="삭제"
          cancelText="취소"
        >
          <DelBtn />
        </Popconfirm>
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
        // shadow={`2px 2px 6px  ${Theme.adminTheme_2}`}
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
            {level2}{" "}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>쿠폰을 추가 / 삭제 등 관리를 할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            쿠폰은 이미 지급되었거나 사용되었을 수 있기 떄문에 정보를 수정하는
            것은 불가능합니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            삭제처리 된 쿠폰은 복구가 불가능합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper padding={`10px 20px`}>
        <SearchForm
          form={searchForm}
          onFinish={searchHandler}
          layout="inline"
          style={{ width: "100%" }}
        >
          <SearchFormItem label="쿠폰명" name="title">
            <Input size="small" placeholder="쿠폰명으로 검색해주세요." />
          </SearchFormItem>

          <SearchFormItem label="정렬순서" name="sort">
            <Select size="small" placeholder="정렬순서를 선택해주세요.">
              <Select.Option value={7}>생성일 내림차순</Select.Option>
              <Select.Option value={6}>생성일 오름차순</Select.Option>
              <Select.Option value={5}>사용마감일 내림차순</Select.Option>
              <Select.Option value={4}>사용마감일 오름차순</Select.Option>
              <Select.Option value={3}>최소금액 내림차순</Select.Option>
              <Select.Option value={2}>최소금액 오름차순</Select.Option>
              <Select.Option value={1}>할인금액 내림차순</Select.Option>
              <Select.Option value={0}>할인금액 오름차순</Select.Option>
            </Select>
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

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju={`space-between`}>
        <Wrapper
          width={`calc(50% - 10px)`}
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper al="flex-end" margin={`0px 0px 5px 0px`}>
            <Button size="small" type="primary" onClick={createModalToggle}>
              쿠폰 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={couponList}
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
                  쿠폰 기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                style={{ width: `100%` }}
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
              >
                <Form.Item label="쿠폰명" name="title">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="내용" name="description">
                  <Input.TextArea rows={5} readOnly />
                </Form.Item>

                <Form.Item label="마감일" name="limitDate">
                  <DatePicker
                    size="small"
                    disabled
                    style={{ background: Theme.white_C, color: Theme.black_C }}
                  />
                </Form.Item>

                <Form.Item label="최소금액" name="minimunPay">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="할인금액" name="discountPay">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="작성일" name="createdAt">
                  <Input size="small" readOnly />
                </Form.Item>

                <Form.Item label="수정일" name="updatedAt">
                  <Input size="small" readOnly />
                </Form.Item>
              </Form>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>
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

      <Modal
        visible={cModal}
        footer={null}
        title={"쿠폰생성"}
        width={`600px`}
        onCancel={createModalToggle}
      >
        <Form
          style={{ width: "100%" }}
          form={createForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={createHandler}
        >
          <Form.Item
            label="쿠폰명"
            name="title"
            rules={[
              { required: true, message: "쿠폰명은 필수 입력사항 입니다." },
            ]}
          >
            <Input
              size="small"
              allowClear
              placeholder="쿠폰명을 입력해주세요."
            />
          </Form.Item>

          <Form.Item
            label="내용"
            name="description"
            rules={[
              { required: true, message: "내용은 필수 입력사항 입니다." },
            ]}
          >
            <Input.TextArea
              rows={5}
              allowClear
              placeholder="내용을 입력해주세요."
            />
          </Form.Item>

          <Form.Item
            label="사용마감일"
            name="limitDate"
            rules={[
              { required: true, message: "사용마감일은 필수 입력사항 입니다." },
            ]}
          >
            <DatePicker
              style={{ width: `100%` }}
              size="small"
              allowClear
              placeholder="마감일을 선택해주세요."
            />
          </Form.Item>

          <Form.Item
            label="최소금액"
            name="minimunPay"
            rules={[
              { required: true, message: "최소금액은 필수 입력사항 입니다." },
            ]}
          >
            <Input
              size="small"
              allowClear
              placeholder="쿠폰명을 입력해주세요."
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="할인금액"
            name="discountPay"
            rules={[
              { required: true, message: "할인금액은 필수 입력사항 입니다." },
            ]}
          >
            <Input
              size="small"
              allowClear
              placeholder="쿠폰명을 입력해주세요."
              type="number"
            />
          </Form.Item>

          <Wrapper al="flex-end">
            <Button size="small" type="primary" htmlType="submit">
              쿠폰등록
            </Button>
          </Wrapper>
        </Form>
      </Modal>

      <Modal
        visible={gModal}
        footer={null}
        title={"쿠폰부여하기"}
        width={`500px`}
        onCancel={grantModalToggle}
      >
        <Form
          style={{ width: "100%" }}
          form={grantForm}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          onFinish={grantHandler}
        >
          <Form.Item
            label="회원"
            name="userid"
            rules={[
              { required: true, message: "회원은 필수 선택사항 입니다." },
            ]}
          >
            <Select size="small" placeholder="회원을 선택해주세요.">
              {users &&
                users.map((data) => {
                  return (
                    <Select.Option key={data.id} value={data.id}>
                      {data.username}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>

          <Wrapper al="flex-end">
            <Button size="small" type="primary" htmlType="submit">
              쿠폰부여
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
      type: USERLIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Coupon);
