import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
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
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Index = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const width = useWidth();

  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////

  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MIN | 공지사항</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 0`}>
          <RsWrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 500 ? `20px` : `34px`}
              fontWeight={`600`}
              margin={`0 0 33px`}
            >
              <Text>공지사항</Text>
              <Wrapper width={`auto`} dr={`row`} ju={`flex-end`}>
                <CustomSelect
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `80px` : `124px`}
                  height={width < 500 ? `100%` : `46px`}
                >
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
                  right={width < 500 ? `20px` : `140px`}
                  cursor={`pointer`}
                >
                  <SearchOutlined />
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper
              height={`54px`}
              dr={`row`}
              ju={`space-between`}
              padding={`0 25px`}
              bgColor={Theme.lightGrey3_C}
              borderTop={`1px solid ${Theme.basicTheme_C}`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              fontSize={width < 500 ? `14px` : `16px`}
              fontWeight={`600`}
              textAlign={`center`}
            >
              <Text>번호</Text>
              <Text>제목</Text>
              <Text>조회수</Text>
              <Text>작성일</Text>
            </Wrapper>
            <Wrapper
              height={`60px`}
              dr={`row`}
              ju={`space-between`}
              padding={`0 30px`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              fontSize={width < 500 ? `14px` : `16px`}
            >
              <Text>1</Text>
              <Text cursor={`pointer`} rowKey="id">
                공지사항 제목이 들어오는 곳입니다.
              </Text>
              <Text>456</Text>
              <Text>2022.12.31</Text>
            </Wrapper>
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
