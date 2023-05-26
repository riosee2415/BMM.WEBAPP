import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  Table,
  message,
  Form,
  Input,
  Button,
  Image,
  Modal,
  Popconfirm,
  Switch,
  Drawer,
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
  SortView,
  UpBtn,
  DownBtn,
  DelBtn,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  MAIN_BANNER_REQUEST,
  BANNER_SORT_UPDATE_REQUEST,
  BANNER_UPDATE_REQUEST,
  BANNER_UPLOAD_REQUEST,
  UPLOAD_BANNER_INIT_REQUEST,
  BANNER_ONLY_IMAGE_REQUEST,
  BANNER_USE_YN_REQUEST,
  BANNER_DELETE_REQUEST,
  BANNER_FAST_CREATE_REQUEST,
} from "../../../reducers/banner";
import Theme from "../../../components/Theme";
import { items } from "../../../components/AdminLayout";
import {
  HomeOutlined,
  RightOutlined,
  AlertOutlined,
  EyeOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  ALL_LIST_REQUEST,
  UP_LIST_REQUEST,
  UP_NEW_REQUEST,
} from "../../../reducers/category";

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

const FlagText = styled.div`
  width: 120px;
  margin: 0px 20px 0px 0px;
`;

const BannerImage = styled(Image)`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const ViewStatusIcon = styled(EyeOutlined)`
  font-size: 18px;
  color: ${(props) =>
    props.active ? props.theme.subTheme5_C : props.theme.lightGrey_C};
`;

const Category = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const bannerInageRef = useRef();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("상품관리");
  const [level2, setLevel2] = useState("");
  const [sameDepth, setSameDepth] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [dataIssueModal, setDataIssueModal] = useState(false);

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

  const {
    upList,
    //
    st_upNewDone,
    st_upNewError,
  } = useSelector((state) => state.category);

  ////// HOOKS //////

  // MODAL
  const [isOneCateModal, setIsOneCateMdoal] = useState(false);

  // FORM
  const [productForm] = Form.useForm();

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_upNewDone) {
      dispatch({
        type: UP_LIST_REQUEST,
      });
      setIsOneCateMdoal(false);
      return message.success("카테고리를 생성했습니다.");
    }

    if (st_upNewError) {
      return message.error(st_upNewError);
    }
  }, [st_upNewDone, st_upNewError]);

  ////// TOGGLE //////

  // 1depth 카테고리 모달
  const oneDepthCateModalToggle = useCallback(() => {
    setIsOneCateMdoal(!isOneCateModal);
  }, [isOneCateModal]);

  ////// HANDLER //////

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

  // 1Depth create
  const oneDepthCreateHandler = useCallback((data) => {
    dispatch({
      type: UP_NEW_REQUEST,
      data: {
        value: data.value,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////
  const col = [
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
          onConfirm={() => deleteBanner(data)}
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
            {level2}
          </HomeText>
        </Popover>
      </Wrapper>

      {/* GUIDE */}
      <Wrapper margin={`10px 0px 0px 0px`}>
        <GuideUl>
          <GuideLi>상품 등록시 필요한 카테고리를 관리할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            데이터 변경 시 즉시 반영되니 신중하게 수정해주시기 바랍니다.
          </GuideLi>
          <GuideLi isImpo={true}>삭제된 데이터는 복구가 불가능합니다.</GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 50px" al="flex-start">
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper margin={`10px 0px`} al={`flex-end`}>
            <Button
              size="small"
              type="primary"
              onClick={oneDepthCateModalToggle}
            >
              카테고리 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={upList}
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
                기본정보 제어
              </InfoTitle>
              <Wrapper>
                <Form
                  style={{ width: "100%" }}
                  // form={infoForm}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  // onFinish={updateButtonHandler}
                >
                  <Form.Item label="이미지 명칭" name="title">
                    <Input.TextArea size="small" allowClear />
                  </Form.Item>

                  <Form.Item label="텍스트 뷰" name="content">
                    <Input.TextArea size="small" allowClear />
                  </Form.Item>

                  <Form.Item label="연결링크" name="link">
                    <Input size="small" allowClear />
                  </Form.Item>

                  <Form.Item label="최근 작업자" name="updator">
                    <Input size="small" allowClear readOnly />
                  </Form.Item>

                  <Form.Item label="최근 작업일" name="updatedAt">
                    <Input size="small" allowClear readOnly />
                  </Form.Item>

                  <Form.Item label="생성일" name="createdAt">
                    <Input size="small" allowClear readOnly />
                  </Form.Item>

                  <Wrapper al="flex-end" margin="0px 0px 20px 0px">
                    <Button type="primary" size="small" htmlType="submit">
                      데이터 수정
                    </Button>
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

      <Drawer
        visible={isOneCateModal}
        onClose={oneDepthCateModalToggle}
        width="600px"
        title="상위 카테고리 생성"
      >
        <Form form={productForm} onFinish={oneDepthCreateHandler}>
          <Form.Item
            label={"카테고리 이름"}
            name="value"
            rules={[
              {
                required: true,
                message: "상위 카테고리명을 입력해주세요.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>

          <Wrapper al={`flex-end`}>
            <Button type="primary" size="small" htmlType="submit">
              생성
            </Button>
          </Wrapper>
        </Form>
      </Drawer>
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
      type: MAIN_BANNER_REQUEST,
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
