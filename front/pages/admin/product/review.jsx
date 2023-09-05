import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Image,
  Input,
  Popover,
  Select,
  Table,
  message,
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
import {
  HomeOutlined,
  RightOutlined,
  AlertOutlined,
  EyeOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { PRODUCT_ADMIN_LIST_REQUEST } from "../../../reducers/product";
import { REVIEW_ADMIN_LIST_REQUEST } from "../../../reducers/review";

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

const Review = ({}) => {
  ////// HOOKS //////
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const { reviewAdminList } = useSelector((state) => state.review);
  const { productAdminList } = useSelector((state) => state.product);

  const router = useRouter();
  const dispatch = useDispatch();

  const [searchForm] = Form.useForm();
  const [infoForm] = Form.useForm();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("상품관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);

  const [currentData, setCurrentData] = useState(null);
  const [selectProduct, setSelectProduct] = useState(null);
  const [searchData, setSearchData] = useState(null);

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }

      if (!(me && me.menuRight7)) {
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

  // 페이지 이동
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 리뷰 선택
  const beforeSetDataHandler = useCallback(
    (data) => {
      setCurrentData(data);

      infoForm.setFieldsValue({
        username: data.username,
        content: data.content,
        viewCreatedAt: data.viewCreatedAt,
        viewUpdatedAt: data.viewUpdatedAt,
      });
    },
    [currentData]
  );

  // 상품 선택
  const selectProductChangeHandler = useCallback(
    (data) => {
      setSelectProduct(data);

      dispatch({
        type: REVIEW_ADMIN_LIST_REQUEST,
        data: {
          ProductId: data,
          username: searchData && searchData.username,
        },
      });
    },
    [selectProduct, searchData]
  );

  // 검색
  const searchHandler = useCallback(
    (data) => {
      setSearchData(data);

      dispatch({
        type: REVIEW_ADMIN_LIST_REQUEST,
        data: {
          ProductId: selectProduct,
          username: data.username,
        },
      });
    },
    [searchData, selectProduct]
  );
  const searchResetHandler = useCallback(
    (data) => {
      searchForm.setFieldsValue({
        username: "",
      });

      dispatch({
        type: REVIEW_ADMIN_LIST_REQUEST,
        data: {
          ProductId: selectProduct,
          username: "",
        },
      });
    },
    [selectProduct]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

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

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "작성자",
      dataIndex: "username",
    },
    {
      title: "작성일",
      dataIndex: "viewCreatedAt",
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
            {level2}{" "}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>회원이 작성한 리뷰를 상품별로 확인할 수 있습니다.</GuideLi>
          <GuideLi>상품 및 작성자로 검색할 수 있습니다.</GuideLi>
        </GuideUl>
      </Wrapper>

      {/* SEARCH */}

      <Wrapper padding="0px 50px">
        <Wrapper
          dr={`row`}
          ju={`flex-start`}
          padding={`10px`}
          radius={`5px`}
          bgColor={`rgba(0,0,0,0.5)`}
          margin={`0 0 10px`}
        >
          <Form size="small" form={searchForm} onFinish={searchHandler}>
            <Wrapper dr={`row`}>
              <Form.Item
                style={{ width: `250px`, margin: `0 0 0 0` }}
                name="ProductId"
              >
                <Select
                  placeholder="상품을 선택해주세요."
                  value={selectProduct}
                  onChange={selectProductChangeHandler}
                >
                  {productAdminList.map((data, idx) => {
                    return (
                      <Select.Option key={idx} value={data.id}>
                        {data.title}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ width: `250px`, margin: `0 5px 0 0` }}
                name="username"
              >
                <Input size="small" placeholder="작성자를 입력해주세요." />
              </Form.Item>

              <Button size="small" type="primary" htmlType="submit">
                검색
              </Button>
              <Button size="small" type="default" onClick={searchResetHandler}>
                초기화
              </Button>
            </Wrapper>
          </Form>
        </Wrapper>
      </Wrapper>

      {/* CONTENT */}
      <Wrapper dr="row" padding="0px 50px" al="flex-start">
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={reviewAdminList}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <>
              <InfoTitle>
                <CheckOutlined />
                상세정보
              </InfoTitle>
              <Wrapper padding={`0 0 10px`}>
                <Form
                  style={{ width: "100%" }}
                  form={infoForm}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                  <Form.Item label="작성자" name="username">
                    <Input readOnly={true} size="small" />
                  </Form.Item>
                  <Form.Item label="검색태그명" name="content">
                    <Input readOnly={true} size="small" />
                  </Form.Item>
                  <Form.Item label="생성일" name="viewCreatedAt">
                    <Input readOnly={true} size="small" />
                  </Form.Item>
                  <Form.Item label="최근수정일" name="viewUpdatedAt">
                    <Input readOnly={true} size="small" />
                  </Form.Item>

                  <Wrapper dr={`row`} ju={`flex-start`}>
                    {currentData.imagePath1 ? (
                      <Wrapper width={`calc(100% / 4)`}>
                        <Image
                          src={currentData.imagePath1}
                          alt="imagePath1"
                          width={`200px`}
                        />
                      </Wrapper>
                    ) : (
                      ""
                    )}
                    {currentData.imagePath2 ? (
                      <Wrapper width={`calc(100% / 4)`}>
                        <Image
                          src={currentData.imagePath2}
                          alt="imagePath2"
                          width={`200px`}
                        />
                      </Wrapper>
                    ) : (
                      ""
                    )}
                    {currentData.imagePath3 ? (
                      <Wrapper width={`calc(100% / 4)`}>
                        <Image
                          src={currentData.imagePath3}
                          alt="imagePath3"
                          width={`200px`}
                        />
                      </Wrapper>
                    ) : (
                      ""
                    )}
                    {currentData.imagePath4 ? (
                      <Wrapper width={`calc(100% / 4)`}>
                        <Image
                          src={currentData.imagePath4}
                          alt="imagePath4"
                          width={`200px`}
                        />
                      </Wrapper>
                    ) : (
                      ""
                    )}
                  </Wrapper>
                </Form>
              </Wrapper>
            </>
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
      type: PRODUCT_ADMIN_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Review);
