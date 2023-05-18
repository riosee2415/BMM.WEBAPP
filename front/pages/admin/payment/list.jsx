import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Image,
  Input,
  Popconfirm,
  Popover,
  Select,
  Table,
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
  TextInput,
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
} from "@ant-design/icons";
import { BOUGHT_ADMIN_LIST_REQUEST } from "../../../reducers/wish";
import { PRODUCT_ADMIN_LIST_REQUEST } from "../../../reducers/product";

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

const List = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("고객지원관리");
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

        return (
          <OtherMenu key={data.link} onClick={() => moveLinkHandler(data.link)}>
            {data.name}
          </OtherMenu>
        );
      })}
    </PopWrapper>
  );

  /////////////////////////////////////////////////////////////////////////

  const { boughtAdminList } = useSelector((state) => state.wish);
  const { users } = useSelector((state) => state.user);
  const { productAdminList } = useSelector((state) => state.product);
  console.log(boughtAdminList);

  ////// HOOKS //////

  const [userId, setUserId] = useState(null); // 회원선택
  const [productId, setProductId] = useState(null); // 상품선택

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
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

  // 검색 초기화
  const resetHandler = useCallback(() => {
    setUserId(null);
    setProductId(null);
    setCurrentData(null);

    dispatch({
      type: BOUGHT_ADMIN_LIST_REQUEST,
    });
  }, []);

  // 상품 선택
  const productHandler = useCallback(
    (data) => {
      setProductId(data);

      dispatch({
        type: BOUGHT_ADMIN_LIST_REQUEST,
        data: {
          userId,
          ProductId: data,
        },
      });

      setCurrentData(null);
    },
    [userId]
  );

  // 회원 선택
  const userHandler = useCallback(
    (data) => {
      setUserId(data);
      dispatch({
        type: BOUGHT_ADMIN_LIST_REQUEST,
        data: {
          userId: data,
          ProductId: productId,
        },
      });
      setCurrentData(null);
    },
    [productId]
  );

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      infoForm.setFieldsValue({
        name: record.name,
        englishName: record.englishName,
        clearanceNum: record.clearanceNum,
        postCode: record.postCode,
        address: record.address,
        detailAddress: record.detailAddress,
        email: record.email,
        tel: record.tel,
        deliveryMessage: record.deliveryMessage,
        payWay: record.payWay,
        cardBankInfo: record.cardBankInfo,
        cardInstallment: record.cardInstallment,
        total: String(record.totalDeliveryPrice + record.totalPrice).replace(
          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
          ","
        ),
        usePoint: record.usePoint,
        useCoupon: record.useCoupon,
        userDiscountPrice: record.userDiscountPrice,
        deliveryCom: record.deliveryCom,
        deliveryNum: record.deliveryNum,
        viewCreatedAt: record.viewCreatedAt,
      });
    },
    [currentData, infoForm]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const col = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "주문자",
      dataIndex: "name",
    },
    {
      title: "주문자 전화번호",
      dataIndex: "tel",
    },
    {
      title: "개인통관고유번호",
      dataIndex: "clearanceNum",
    },
    {
      title: "상품이름",
      render: (data) => (
        <div>
          {data.products.length === 1
            ? data.products[0].productTitle
            : data.products[0].productTitle +
              ` 외 ${data.products.length - 1}개`}
        </div>
      ),
    },
    {
      title: "총 무게",
      dataIndex: "formatTotalWeight",
    },
    {
      title: "결제방식",
      dataIndex: "payWay",
    },
    {
      title: "결제금액",
      dataIndex: "totalPrice",
    },
    {
      title: "배송비",
      dataIndex: "totalDeliveryPrice",
    },
    {
      title: "소싱단계",
      render: (data) => (
        <div>{data.isCanBoughtCancel ? "소싱전" : "소싱후"}</div>
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
          onConfirm={() => {}}
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
          <GuideLi>
            결제내역관리는 배송전/배송후 및 고객별 상품별로 확인할 수 있습니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            결제내역관리는 확인만 가능한 페이지입니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" al="flex-start" ju="space-between" padding={`0 20px`}>
        <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 10px`}>
          <Select
            size="small"
            placeholder="회원을 선택해주세요."
            style={{ margin: `0 10px 0 0`, width: `300px` }}
            onChange={userHandler}
            value={userId}
          >
            {users.map((data) => {
              return (
                <Select.Option key={data.id} value={data.id}>
                  {data.username} | {data.userId}
                </Select.Option>
              );
            })}
          </Select>
          <Select
            size="small"
            placeholder="상품을 선택해주세요."
            style={{ margin: `0 10px 0 0`, width: `300px` }}
            onChange={productHandler}
            value={productId}
          >
            {productAdminList.map((data) => {
              return (
                <Select.Option key={data.id} value={data.id}>
                  {data.title}
                </Select.Option>
              );
            })}
          </Select>
          <Button size="small" type="primary" onClick={resetHandler}>
            초기화
          </Button>
        </Wrapper>

        <Wrapper padding="0px 10px" shadow={`3px 3px 6px ${Theme.lightGrey_C}`}>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={boughtAdminList}
            size="small"
            onRow={(record, index) => {
              return {
                onClick: (e) => beforeSetDataHandler(record),
              };
            }}
          />
        </Wrapper>

        <Wrapper
          margin={`10px 0 0`}
          padding="5px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          {currentData ? (
            <>
              <Wrapper dr={`row`} ju={`space-between`} al={`flex-start`}>
                <Wrapper width={`calc(100% / 2.1)`}>
                  <Wrapper margin={`0px 0px 5px 0px`}>
                    <InfoTitle>
                      <CheckOutlined />
                      주문자 정보
                    </InfoTitle>
                  </Wrapper>

                  <Form
                    form={infoForm}
                    style={{ width: `100%` }}
                    labelCol={{ span: 4 }}
                  >
                    <Form.Item
                      label="주문자"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "제목은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="영어이름"
                      name="englishName"
                      rules={[
                        {
                          required: true,
                          message: "제목은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="개인통관고유번호"
                      name="clearanceNum"
                      rules={[
                        {
                          required: true,
                          message: "제목은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="우편번호"
                      name="postCode"
                      rules={[
                        {
                          required: true,
                          message: "내용은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="주소"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "내용은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="상세주소"
                      name="detailAddress"
                      rules={[
                        {
                          required: true,
                          message: "내용은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="이메일"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "내용은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="전화번호"
                      name="tel"
                      rules={[
                        {
                          required: true,
                          message: "내용은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="배송메세지"
                      name="deliveryMessage"
                      rules={[
                        {
                          required: true,
                          message: "내용은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>
                  </Form>
                </Wrapper>

                <Wrapper width={`calc(100% / 2.1)`}>
                  <Wrapper margin={`0px 0px 5px 0px`}>
                    <InfoTitle>
                      <CheckOutlined />
                      결제정보
                    </InfoTitle>
                  </Wrapper>

                  <Form
                    form={infoForm}
                    style={{ width: `100%` }}
                    labelCol={{ span: 4 }}
                  >
                    <Form.Item
                      label="결제방식"
                      name="payWay"
                      rules={[
                        {
                          required: true,
                          message: "제목은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    {currentData && currentData.payway === "card" && (
                      <>
                        <Form.Item
                          label="결제한카드"
                          name="cardBankInfo"
                          rules={[
                            {
                              required: true,
                              message: "제목은 필수 입력사항 입니다.",
                            },
                          ]}
                        >
                          <Input size="small" />
                        </Form.Item>

                        <Form.Item
                          label="카드할부"
                          name="cardInstallment"
                          rules={[
                            {
                              required: true,
                              message: "제목은 필수 입력사항 입니다.",
                            },
                          ]}
                        >
                          <Input size="small" />
                        </Form.Item>
                      </>
                    )}

                    <Form.Item
                      label="결제한가격"
                      name="total"
                      rules={[
                        {
                          required: true,
                          message: "제목은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="포인트 사용가격"
                      name="usePoint"
                      rules={[
                        {
                          required: true,
                          message: "내용은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="쿠폰 사용가격"
                      name="useCoupon"
                      rules={[
                        {
                          required: true,
                          message: "내용은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="총 할인금액"
                      name="userDiscountPrice"
                      rules={[
                        {
                          required: true,
                          message: "내용은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="배송사"
                      name="deliveryCom"
                      rules={[
                        {
                          required: true,
                          message: "내용은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="배송번호"
                      name="deliveryNum"
                      rules={[
                        {
                          required: true,
                          message: "내용은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>

                    <Form.Item
                      label="결제일"
                      name="viewCreatedAt"
                      rules={[
                        {
                          required: true,
                          message: "내용은 필수 입력사항 입니다.",
                        },
                      ]}
                    >
                      <Input size="small" />
                    </Form.Item>
                  </Form>
                </Wrapper>

                <Wrapper>
                  <Wrapper margin={`0px 0px 5px 0px`}>
                    <InfoTitle>
                      <CheckOutlined />
                      상품정보
                    </InfoTitle>
                  </Wrapper>

                  <Form
                    form={infoForm}
                    style={{ width: `100%` }}
                    labelCol={{ span: 2 }}
                  >
                    {currentData &&
                      currentData.products.map((data) => {
                        return (
                          <>
                            <Wrapper dr={`row`} ju={`space-between`}>
                              <Image
                                src={data.productThumbnail}
                                width={`200px`}
                              />

                              <Wrapper width={`calc(100% - 200px - 10px)`}>
                                <Wrapper
                                  dr={`row`}
                                  ju={`space-between`}
                                  margin={`0 0 10px`}
                                >
                                  <Wrapper width={`100px`} al={`flex-start`}>
                                    상품명{" "}
                                  </Wrapper>
                                  <Input
                                    style={{ width: `calc(100% - 100px)` }}
                                    size="small"
                                    value={data.productTitle}
                                  />
                                </Wrapper>

                                <Wrapper
                                  dr={`row`}
                                  ju={`space-between`}
                                  margin={`0 0 10px`}
                                >
                                  <Wrapper width={`100px`} al={`flex-start`}>
                                    상품 무게
                                  </Wrapper>
                                  <Input
                                    style={{ width: `calc(100% - 100px)` }}
                                    size="small"
                                    value={data.concatProductWeight}
                                  />
                                </Wrapper>

                                <Wrapper
                                  dr={`row`}
                                  ju={`space-between`}
                                  margin={`0 0 10px`}
                                >
                                  <Wrapper width={`100px`} al={`flex-start`}>
                                    상품 할인율
                                  </Wrapper>
                                  <Input
                                    style={{ width: `calc(100% - 100px)` }}
                                    size="small"
                                    value={data.viewProductDiscount}
                                  />
                                </Wrapper>

                                <Wrapper
                                  dr={`row`}
                                  ju={`space-between`}
                                  margin={`0 0 10px`}
                                >
                                  <Wrapper width={`100px`} al={`flex-start`}>
                                    상품 옵션명
                                  </Wrapper>
                                  <Input
                                    style={{ width: `calc(100% - 100px)` }}
                                    size="small"
                                    value={data.optionName}
                                  />
                                </Wrapper>

                                <Wrapper
                                  dr={`row`}
                                  ju={`space-between`}
                                  margin={`0 0 10px`}
                                >
                                  <Wrapper width={`100px`} al={`flex-start`}>
                                    상품 옵션금액
                                  </Wrapper>
                                  <Input
                                    style={{ width: `calc(100% - 100px)` }}
                                    size="small"
                                    value={data.formatOptionPrice}
                                  />
                                </Wrapper>

                                <Wrapper
                                  dr={`row`}
                                  ju={`space-between`}
                                  margin={`0 0 10px`}
                                >
                                  <Wrapper width={`100px`} al={`flex-start`}>
                                    상품 가격
                                  </Wrapper>
                                  <Input
                                    style={{ width: `calc(100% - 100px)` }}
                                    size="small"
                                    value={data.viewProductPrice}
                                  />
                                </Wrapper>

                                <Wrapper
                                  dr={`row`}
                                  ju={`space-between`}
                                  margin={`0 0 10px`}
                                >
                                  <Wrapper width={`100px`} al={`flex-start`}>
                                    총 금액
                                  </Wrapper>
                                  <Input
                                    style={{ width: `calc(100% - 100px)` }}
                                    size="small"
                                    value={data.realPrice}
                                  />
                                </Wrapper>

                                <Wrapper
                                  dr={`row`}
                                  ju={`space-between`}
                                  margin={`0 0 10px`}
                                >
                                  <Wrapper width={`100px`} al={`flex-start`}>
                                    배송비
                                  </Wrapper>
                                  <Input
                                    style={{ width: `calc(100% - 100px)` }}
                                    size="small"
                                    value={data.viewProdDelPrice}
                                  />
                                </Wrapper>
                              </Wrapper>
                            </Wrapper>
                          </>
                        );
                      })}
                  </Form>
                </Wrapper>
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
      type: BOUGHT_ADMIN_LIST_REQUEST,
    });

    context.store.dispatch({
      type: USERLIST_REQUEST,
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

export default withRouter(List);
