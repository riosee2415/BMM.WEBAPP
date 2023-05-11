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
} from "../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../components/MypageTop";

const List = styled(Wrapper)`
  height: 60px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const Grade = () => {
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
        <title>BUY ME MINE | 회원 등급</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 80px` : `95px 0 120px`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              fontSize={width < 700 ? `24px` : `30px`}
              fontWeight={`600`}
              margin={`0 0 30px`}
            >
              <Text>회원 등급</Text>
            </Wrapper>
            <Wrapper
              height={`54px`}
              dr={`row`}
              color={Theme.grey_C}
              bgColor={Theme.lightGrey3_C}
              borderTop={`1px solid ${Theme.basicTheme_C}`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              fontSize={width < 700 ? `14px` : `16px`}
              fontWeight={`600`}
            >
              <Wrapper width={`calc(100% / 3)`}>회원등급</Wrapper>
              <Wrapper width={`calc(100% / 3)`}>조건</Wrapper>
              <Wrapper width={`calc(100% / 3)`}>혜택</Wrapper>
            </Wrapper>
            <List>
              <Wrapper width={`calc(100% / 3)`}>실버</Wrapper>
              <Wrapper width={`calc(100% / 3)`}>-</Wrapper>
              <Wrapper width={`calc(100% / 3)`}>-</Wrapper>
            </List>
            <List>
              <Wrapper width={`calc(100% / 3)`}>골드</Wrapper>
              <Wrapper width={`calc(100% / 3)`}>5회 이상주문</Wrapper>
              <Wrapper width={`calc(100% / 3)`}>3% 할인</Wrapper>
            </List>
            <List>
              <Wrapper width={`calc(100% / 3)`}>플래티넘</Wrapper>
              <Wrapper width={`calc(100% / 3)`}>10회 이상주문</Wrapper>
              <Wrapper width={`calc(100% / 3)`}>5% 할인</Wrapper>
            </List>
            <List>
              <Wrapper width={`calc(100% / 3)`}>다이아몬드</Wrapper>
              <Wrapper width={`calc(100% / 3)`}>20회 이상주문</Wrapper>
              <Wrapper width={`calc(100% / 3)`}>10% 할인</Wrapper>
            </List>
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

export default Grade;
