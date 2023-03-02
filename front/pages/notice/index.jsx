import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  CustomSelect,
  CustomPage,
  TextInput,
} from "../../components/commonComponents";
import { Select, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import vData from "./vData";
import { useRouter } from "next/router";

const Index = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////
  const moveDetailPage = (targetId) => {
    router.push(`/notice/${targetId}`);
};
  const col = [

    {
        title : "번호",
        dataIndex : "id"
    },
    {
        title : "제목",
        render : (row) => (
            <div onClick={() => moveDetailPage(row.id)}>{row.title}</div>
        ),
    },
    {
        title : "조회수",
        dataIndex : "hit"
    },
    {
        title : "작성일",
        dataIndex : "createdAt"
    },
];

  return (
    <>
      <Head>
        <title>BUY ME MIN | 공지사항</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`100px 0 0`}>
          <RsWrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 500 ? `20px` : `34px`}
              fontWeight={`600`}
              margin={`0 0 33px`}
            >
              <Text>공지사항</Text>
              <Wrapper width={`auto`} dr={`row`}> 
                  
                <CustomSelect margin={`0 10px 0 0`} width={width < 500 ? `80px` : `124px`} height={width < 500 ? `100%` : `46px`}>
                  <Select>
                    <Select.Option>전체</Select.Option>
                    <Select.Option>2</Select.Option>
                    <Select.Option>3</Select.Option>
                  </Select>
                </CustomSelect>
                <TextInput
                  width={width < 500 ? `170px` : `288px`}
                  height={width < 500 ? `100%` : `46px`}
                  type="text"
                  fontSize={width < 500 ? `8px` : `16px`}
                  placeholder="검색어를 입력해주세요."
                  radius={`46px`}
                />
                <Text
                  fontSize={width < 500 ? `14px` : `16px`}
                  position={`absolute`}
                  right={`100px`}
                  cursor={`pointer`}
                >
                  <SearchOutlined />
                </Text>
              </Wrapper>
            </Wrapper>
            <Table rowKey = "id" columns={col} dataSource={vData}/>
            <CustomPage />
          </RsWrapper>
        </WholeWrapper>
      </ClientLayout> 
    </>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
