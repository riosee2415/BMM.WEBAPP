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
import { items } from "../../../components/AdminLayout";
import {
  AlertOutlined,
  CheckOutlined,
  EyeOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  ADVERTISE_CREATE_REQUEST,
  ADVERTISE_DELETE_REQUEST,
  ADVERTISE_IMAGE_RESET,
  ADVERTISE_LIST_REQUEST,
  ADVERTISE_UPDATE_REQUEST,
  ADVERTISE_UPLOAD_REQUEST,
} from "../../../reducers/advertise";

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

const Advertise = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    advertiseList,
    advertisePath,

    st_advertiseCreateDone,
    st_advertiseCreateError,

    st_advertiseUpdateDone,
    st_advertiseUpdateError,

    st_advertiseDeleteDone,
    st_advertiseDeleteError,

    st_advertiseUploadLoading,
    st_advertiseUploadDone,
    st_advertiseUploadError,
  } = useSelector((state) => state.advertise);

  const router = useRouter();
  const dispatch = useDispatch();

  // 상위메뉴 변수
  const [level1, setLevel1] = useState("배너관리");
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

  const imgRef = useRef();

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

  // ********************** 광고배너 생성 후처리 *************************

  useEffect(() => {
    if (st_advertiseCreateDone) {
      dispatch({
        type: ADVERTISE_LIST_REQUEST,
      });

      return message.success("광고배너가 생성되었습니다.");
    }

    if (st_advertiseCreateError) {
      return message.error(st_advertiseCreateError);
    }
  }, [st_advertiseCreateDone, st_advertiseCreateError]);

  // ********************** 광고배너 수정 후처리 *************************

  useEffect(() => {
    if (st_advertiseUpdateDone) {
      dispatch({
        type: ADVERTISE_LIST_REQUEST,
      });

      return message.success("광고배너가 수정되었습니다.");
    }

    if (st_advertiseUpdateError) {
      return message.error(st_advertiseUpdateError);
    }
  }, [st_advertiseUpdateDone, st_advertiseUpdateError]);

  // ********************** 광고배너 삭제 후처리 *************************
  useEffect(() => {
    if (st_advertiseDeleteDone) {
      setCurrentData(null);

      dispatch({
        type: ADVERTISE_LIST_REQUEST,
      });

      return message.success("광고배너가 삭제되었습니다.");
    }

    if (st_advertiseDeleteError) {
      return message.error(st_advertiseDeleteError);
    }
  }, [st_advertiseDeleteDone, st_advertiseDeleteError]);

  // ********************** 광고배너 이미지 후처리 *************************

  useEffect(() => {
    if (st_advertiseUploadDone) {
      return message.success("광고배너이미자가 업로드되었습니다.");
    }

    if (st_advertiseUploadError) {
      return message.error(st_advertiseUploadError);
    }
  }, [st_advertiseUploadDone, st_advertiseUploadError]);

  ////// HANDLER //////

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);
      dispatch({
        type: ADVERTISE_IMAGE_RESET,
      });

      infoForm.setFieldsValue({
        link: record.link,
        createdAt: record.viewCreatedAt,
        updatedAt: record.viewUpdatedAt,
        updator: record.updator,
      });
    },
    [currentData, infoForm]
  );

  const clickImgUpload = useCallback(() => {
    imgRef.current.click();
  }, [imgRef.current]);

  const onChangeImg = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    if (e.target.files.length < 1) {
      return;
    }

    dispatch({
      type: ADVERTISE_UPLOAD_REQUEST,
      data: formData,
    });
  });

  const createHandler = useCallback(() => {
    dispatch({
      type: ADVERTISE_CREATE_REQUEST,
    });
  }, []);

  const updateHandler = useCallback(
    (data) => {
      dispatch({
        type: ADVERTISE_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          imagePath: advertisePath ? advertisePath : currentData.imagePath,
          link: data.link,
        },
      });
    },
    [currentData, advertisePath]
  );

  const deleteHandler = useCallback((data) => {
    dispatch({
      type: ADVERTISE_DELETE_REQUEST,
      data: {
        id: data.id,
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
      title: "썸네일",
      render: (data) => (
        <Image style={{ width: `100px` }} src={data.imagePath} />
      ),
    },
    {
      title: "링크",
      dataIndex: "link",
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
          <GuideLi>광고배너를 추가 / 삭제 등 관리를 할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            광고배너 이미지는 5MB이하로 올려주세요.
          </GuideLi>
          <GuideLi isImpo={true}>
            삭제처리 된 광고배너은 복구가 불가능합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      <Wrapper dr="row" padding="0px 20px" al="flex-start" ju={`space-between`}>
        <Wrapper
          width={`calc(50% - 10px)`}
          padding="0px 10px"
          shadow={`3px 3px 6px ${Theme.lightGrey_C}`}
        >
          <Wrapper al="flex-end" margin={`0px 0px 5px 0px`}>
            <Button size="small" type="primary" onClick={createHandler}>
              이벤트 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="num"
            columns={col}
            dataSource={advertiseList}
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
                  광고배너 이미지 정보
                </InfoTitle>
              </Wrapper>

              <Wrapper width={`300px`} margin={`30px 0`}>
                <Image
                  width={`100%`}
                  height={`150px`}
                  src={advertisePath ? advertisePath : currentData.imagePath}
                  alt={`image`}
                />

                <input
                  hidden
                  type={`file`}
                  ref={imgRef}
                  accept={`.jpg, .png`}
                  onChange={onChangeImg}
                />
                <Button
                  loading={st_advertiseUploadLoading}
                  style={{ width: `100%`, marginTop: `5px` }}
                  size="small"
                  type="primary"
                  onClick={clickImgUpload}
                >
                  광고배너 이미지 업로드
                </Button>
              </Wrapper>

              <Wrapper
                width="100%"
                height="1px"
                bgColor={Theme.lightGrey_C}
                margin={`30px 0px`}
              ></Wrapper>

              <Wrapper margin={`0px 0px 5px 0px`}>
                <InfoTitle>
                  <CheckOutlined />
                  광고배너 기본정보
                </InfoTitle>
              </Wrapper>

              <Form
                form={infoForm}
                style={{ width: `100%` }}
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                onFinish={updateHandler}
              >
                <Form.Item
                  label="링크"
                  name="link"
                  rules={[
                    { required: true, message: "링크은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item label="작성일" name="createdAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="수정일" name="updatedAt">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Form.Item label="최근작업자" name="updator">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
                </Form.Item>

                <Wrapper al="flex-end">
                  <Button type="primary" size="small" htmlType="submit">
                    정보 업데이트
                  </Button>
                </Wrapper>
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
      type: ADVERTISE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Advertise);
