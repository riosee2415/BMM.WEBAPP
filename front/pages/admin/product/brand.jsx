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
  Popconfirm,
  Image,
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
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import {
  HomeOutlined,
  RightOutlined,
  AlertOutlined,
  EyeOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  BRAND_CREATE_REQUEST,
  BRAND_DELETE_REQUEST,
  BRAND_IMAGE_RESET,
  BRAND_LIST_REQUEST,
  BRAND_UPDATE_REQUEST,
  BRAND_UPLOAD_REQUEST,
} from "../../../reducers/brand";

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

const Brand = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("상품관리");
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

  const {
    brandList,
    brandPath,
    //
    st_brandCreateDone,
    st_brandCreateError,
    //
    st_brandDeleteDone,
    st_brandDeleteError,
    //
    st_brandUpdateDone,
    st_brandUpdateError,
  } = useSelector((state) => state.brand);

  ////// HOOKS //////

  // REF
  const imageRef = useRef(``);

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_brandUpdateDone) {
      dispatch({
        type: BRAND_LIST_REQUEST,
      });

      return message.success("브랜드를 수정했습니다.");
    }

    if (st_brandUpdateError) {
      return message.error(st_brandUpdateError);
    }
  }, [st_brandUpdateDone, st_brandUpdateError]);

  useEffect(() => {
    if (st_brandDeleteDone) {
      dispatch({
        type: BRAND_LIST_REQUEST,
      });
      setCurrentData(null);
      return message.success("브랜드를 삭제했습니다.");
    }

    if (st_brandDeleteError) {
      return message.error(st_brandDeleteError);
    }
  }, [st_brandDeleteDone, st_brandDeleteError]);

  useEffect(() => {
    if (st_brandCreateDone) {
      dispatch({
        type: BRAND_LIST_REQUEST,
      });

      return message.success("브랜드를 생성했습니다.");
    }

    if (st_brandCreateError) {
      return message.error(st_brandCreateError);
    }
  }, [st_brandCreateDone, st_brandCreateError]);

  ////// TOGGLE //////

  // 이미지 클릭
  const imageClickToggle = useCallback(() => {
    imageRef.current.click();
  }, []);

  ////// HANDLER //////

  // 이미지 업로드
  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: BRAND_UPLOAD_REQUEST,
      data: formData,
    });
  });

  // 데이터세팅
  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);
      dispatch({
        type: BRAND_IMAGE_RESET,
      });

      infoForm.setFieldsValue({
        name: record.name,
        subDesc: record.subDesc,
        viewCreatedAt: record.viewCreatedAt,
      });
    },
    [currentData, infoForm]
  );

  // 브랜드 삭제
  const brandDeleteHandler = useCallback((data) => {
    dispatch({
      type: BRAND_DELETE_REQUEST,
      data: {
        id: data.id,
        name: data.name,
      },
    });
  }, []);

  //   브랜드 수정
  const brandUpdateHandler = useCallback(
    (data) => {
      dispatch({
        type: BRAND_UPDATE_REQUEST,
        data: {
          id: currentData && currentData.id,
          imagePath: brandPath,
          name: data.name,
          subDesc: data.subDesc,
        },
      });
    },
    [currentData, brandPath]
  );

  //   브랜드 생성
  const brandCreateHandler = useCallback(() => {
    dispatch({
      type: BRAND_CREATE_REQUEST,
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
      title: "브랜드명",
      dataIndex: "name",
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
          onConfirm={() => brandDeleteHandler(data)}
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
          <GuideLi>상품 등록시 필요한 브랜드를 관리할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            데이터 변경 시 즉시 반영되니 신중하게 수정해주시기 바랍니다.
          </GuideLi>
          <GuideLi isImpo={true}>삭제된 데이터는 복구가 불가능합니다.</GuideLi>
          <GuideLi isImpo={true}>
            이미지 수정 후 데이터 수정을 눌러야 수정이됩니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 50px" al="flex-start">
        <Wrapper
          width="50%"
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper margin={`10px 0px`} al={`flex-end`}>
            <Button size="small" type="primary" onClick={brandCreateHandler}>
              브랜드 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="id"
            columns={col}
            dataSource={brandList}
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
                브랜드 이미지
              </InfoTitle>

              <Wrapper
                padding={`0 0 10px`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
              >
                <Image
                  src={
                    brandPath ? brandPath : currentData && currentData.imagePath
                  }
                  alt="image"
                />
                <Wrapper al={`flex-end`}>
                  <input
                    type="file"
                    name="image"
                    accept=".png, .jpg"
                    // multiple
                    hidden
                    ref={imageRef}
                    onChange={onChangeImages}
                  />

                  <Button
                    size="small"
                    type="primary"
                    onClick={imageClickToggle}
                  >
                    이미지 업로드
                  </Button>
                </Wrapper>
              </Wrapper>

              <InfoTitle>
                <CheckOutlined />
                기본정보
              </InfoTitle>
              <Wrapper padding={`0 0 10px`}>
                <Form
                  style={{ width: "100%" }}
                  form={infoForm}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  onFinish={brandUpdateHandler}
                >
                  <Form.Item label="브랜드명" name="name">
                    <Input allowClear size="small" />
                  </Form.Item>
                  <Form.Item label="브랜드 설명" name="subDesc">
                    <Input allowClear size="small" />
                  </Form.Item>
                  <Form.Item label="생성일" name="viewCreatedAt">
                    <Input readOnly={true} size="small" />
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
      type: BRAND_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Brand);
