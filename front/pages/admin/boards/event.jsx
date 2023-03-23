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
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
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
  EVENT_ADMIN_LIST_REQUEST,
  EVENT_CREATE_REQUEST,
  EVENT_DELETE_REQUEST,
  EVENT_IMAGE_RESET,
  EVENT_UPDATE_REQUEST,
  EVENT_UPLOAD1_REQUEST,
  EVENT_UPLOAD2_REQUEST,
} from "../../../reducers/event";
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

const Event = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    eventAdminList,

    eventPath1,
    eventPath2,

    st_eventCreateDone,
    st_eventCreateError,

    st_eventUpdateDone,
    st_eventUpdateError,

    st_eventDeleteDone,
    st_eventDeleteError,

    st_eventUpload1Loading,
    st_eventUpload1Done,
    st_eventUpload1Error,

    st_eventUpload2Loading,
    st_eventUpload2Done,
    st_eventUpload2Error,
  } = useSelector((state) => state.event);

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

  const img1Ref = useRef();
  const img2Ref = useRef();

  const [searchForm] = Form.useForm();

  const [eventTitle, setEventTitle] = useState(""); // 이벤트 제목

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
      type: EVENT_ADMIN_LIST_REQUEST,
      data: {
        searchTitle: eventTitle,
      },
    });
  }, [eventTitle]);

  // ********************** 이벤트 생성 후처리 *************************
  useEffect(() => {
    if (st_eventCreateDone) {
      dispatch({
        type: EVENT_ADMIN_LIST_REQUEST,
        data: {
          searchTitle: eventTitle,
        },
      });

      return message.success("이벤트가 생성되었습니다.");
    }
    if (st_eventCreateError) {
      return message.error(st_eventCreateError);
    }
  }, [st_eventCreateDone, st_eventCreateError]);
  // ********************** 이벤트 수정 후처리 *************************
  useEffect(() => {
    if (st_eventUpdateDone) {
      dispatch({
        type: EVENT_ADMIN_LIST_REQUEST,
        data: {
          searchTitle: eventTitle,
        },
      });

      return message.success("이벤트가 수정되었습니다.");
    }
    if (st_eventUpdateError) {
      return message.error(st_eventUpdateError);
    }
  }, [st_eventUpdateDone, st_eventUpdateError]);
  // ********************** 이벤트 삭제 후처리 *************************
  useEffect(() => {
    if (st_eventDeleteDone) {
      setCurrentData(null);

      dispatch({
        type: EVENT_ADMIN_LIST_REQUEST,
        data: {
          searchTitle: eventTitle,
        },
      });

      return message.success("이벤트가 삭제되었습니다.");
    }
    if (st_eventDeleteError) {
      return message.error(st_eventDeleteError);
    }
  }, [st_eventDeleteDone, st_eventDeleteError]);

  // ********************** 이벤트 이미지1 변경 후처리 *************************
  useEffect(() => {
    if (st_eventUpload1Done) {
      return message.success(
        "썸네일이 업로드되었습니다. 정보 업데이트 버튼을 눌러 적용시켜주세요."
      );
    }
    if (st_eventUpload1Error) {
      return message.error(st_eventUpload1Error);
    }
  }, [st_eventUpload1Done, st_eventUpload1Error]);

  // ********************** 이벤트 이미지2 변경 후처리 *************************

  useEffect(() => {
    if (st_eventUpload2Done) {
      return message.success(
        "내용이미지가 업로드되었습니다. 정보 업데이트 버튼을 눌러 적용시켜주세요."
      );
    }
    if (st_eventUpload2Error) {
      return message.error(st_eventUpload2Error);
    }
  }, [st_eventUpload2Done, st_eventUpload2Error]);

  ////// HANDLER //////

  const searchHandler = useCallback(
    (data) => {
      setEventTitle(data.title);
    },
    [eventTitle]
  );

  const allSearchHandler = useCallback(() => {
    searchForm.resetFields();
    setEventTitle("");
  }, [eventTitle]);

  const beforeSetDataHandler = useCallback(
    (record) => {
      setCurrentData(record);

      dispatch({
        type: EVENT_IMAGE_RESET,
      });

      infoForm.setFieldsValue({
        title: record.title,
        content: record.content,
        startDate: moment(record.startDate),
        endDate: moment(record.endDate),
        hit: record.hit,
        createdAt: record.viewCreatedAt,
        updatedAt: record.viewUpdatedAt,
        updator: record.updator,
      });
    },
    [currentData, infoForm]
  );

  const clickImg1Upload = useCallback(() => {
    img1Ref.current.click();
  }, [img1Ref.current]);

  const onChangeImg1 = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    if (e.target.files.length < 1) {
      return;
    }

    dispatch({
      type: EVENT_UPLOAD1_REQUEST,
      data: formData,
    });
  });

  const clickImg2Upload = useCallback(() => {
    img2Ref.current.click();
  }, [img2Ref.current]);

  const onChangeImg2 = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    if (e.target.files.length < 1) {
      return;
    }

    dispatch({
      type: EVENT_UPLOAD2_REQUEST,
      data: formData,
    });
  });

  const createHandler = useCallback(() => {
    dispatch({
      type: EVENT_CREATE_REQUEST,
    });
  }, []);

  const updateHandler = useCallback(
    (data) => {
      dispatch({
        type: EVENT_UPDATE_REQUEST,
        data: {
          id: currentData.id,
          thumbnail: eventPath1 ? eventPath1 : currentData.thumbnail,
          imagePath: eventPath2 ? eventPath2 : currentData.imagePath,
          title: data.title,
          content: data.content,
          startDate: moment(data.startDate).format("YYYY-MM-DD"),
          endDate: moment(data.endDate).format("YYYY-MM-DD"),
        },
      });
    },
    [currentData, eventPath1, eventPath2]
  );

  const deleteHandler = useCallback((data) => {
    dispatch({
      type: EVENT_DELETE_REQUEST,
      data: {
        id: data.id,
        title: data.title,
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
        <Image style={{ width: `100px` }} src={data.thumbnail} />
      ),
    },
    {
      title: "이벤트제목",
      dataIndex: "title",
    },

    {
      title: "이벤트 기간",
      dataIndex: "viewEventDate",
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
          <GuideLi>이벤트를 추가 / 삭제 등 관리를 할 수 있습니다.</GuideLi>
          <GuideLi isImpo={true}>
            썸네일 및 내용 이미지는 5MB이하로 올려주세요.
          </GuideLi>
          <GuideLi isImpo={true}>
            삭제처리 된 이벤트은 복구가 불가능합니다.
          </GuideLi>
        </GuideUl>
      </Wrapper>

      {/* 검색 */}
      <Wrapper padding={`10px 20px`}>
        <SearchForm
          form={searchForm}
          onFinish={searchHandler}
          layout="inline"
          style={{ width: "100%" }}
        >
          <SearchFormItem name="title">
            <Input size="small" placeholder="제목으로 검색해주세요." />
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
            <Button size="small" type="primary" onClick={createHandler}>
              이벤트 생성
            </Button>
          </Wrapper>
          <Table
            style={{ width: "100%" }}
            rowKey="num"
            columns={col}
            dataSource={eventAdminList}
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
                  이벤트 썸네일 및 내용이미지 정보
                </InfoTitle>
              </Wrapper>

              <Wrapper dr={`row`} ju={`space-around`} margin={`30px 0`}>
                <Wrapper width={`300px`}>
                  <Image
                    width={`100%`}
                    height={`150px`}
                    src={eventPath1 ? eventPath1 : currentData.thumbnail}
                    alt={`image`}
                  />

                  <input
                    hidden
                    type={`file`}
                    ref={img1Ref}
                    accept={`.jpg, .png`}
                    onChange={onChangeImg1}
                  />
                  <Button
                    loading={st_eventUpload1Loading}
                    style={{ width: `100%`, marginTop: `5px` }}
                    size="small"
                    type="primary"
                    onClick={clickImg1Upload}
                  >
                    이벤트 썸네일 업로드
                  </Button>
                </Wrapper>

                <Wrapper width={`300px`}>
                  <Image
                    width={`100%`}
                    height={`400px`}
                    src={eventPath2 ? eventPath2 : currentData.imagePath}
                    alt={`image`}
                  />

                  <input
                    hidden
                    type={`file`}
                    ref={img2Ref}
                    accept={`.jpg, .png`}
                    onChange={onChangeImg2}
                  />
                  <Button
                    loading={st_eventUpload2Loading}
                    style={{ width: `100%`, marginTop: `5px` }}
                    size="small"
                    type="primary"
                    onClick={clickImg2Upload}
                  >
                    이벤트 내용이미지 업로드
                  </Button>
                </Wrapper>
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
                  이벤트 기본정보
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
                  label="제목"
                  name="title"
                  rules={[
                    { required: true, message: "제목은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item
                  label="내용"
                  name="content"
                  rules={[
                    { required: true, message: "내용은 필수 입력사항 입니다." },
                  ]}
                >
                  <Input.TextArea rows={10} />
                </Form.Item>

                <Form.Item
                  label="시작일"
                  name="startDate"
                  rules={[
                    {
                      required: true,
                      message: "시작일은 필수 선택사항 입니다.",
                    },
                  ]}
                >
                  <DatePicker size="small" />
                </Form.Item>

                <Form.Item
                  label="마감일"
                  name="endDate"
                  rules={[
                    {
                      required: true,
                      message: "마감일은 필수 선택사항 입니다.",
                    },
                  ]}
                >
                  <DatePicker size="small" />
                </Form.Item>

                <Form.Item label="조회수" name="hit">
                  <Input
                    size="small"
                    style={{ background: Theme.lightGrey_C, border: "none" }}
                    readOnly
                  />
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
      type: EVENT_ADMIN_LIST_REQUEST,
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

export default withRouter(Event);
