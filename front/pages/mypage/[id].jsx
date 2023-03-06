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
  CustomPage,
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
const Point = () => {
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
        <title>BUY ME MINE | 마이페이지</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 100px`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              fontSize={width < 700 ? `24px` : `30px`}
              fontWeight={`600`}
              margin={`0 0 30px`}
            >
              <Text>포인트</Text>
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
              <Wrapper width={width < 700 ? `15%` : `10%`}>번호</Wrapper>
              <Wrapper width={width < 700 ? `70%` : `65%`}>포인트 내역</Wrapper>
              <Wrapper width={width < 700 ? `15%` : `25%`}>내역</Wrapper>
            </Wrapper>
            <List>
              <Wrapper width={width < 700 ? `15%` : `10%`}>1</Wrapper>
              <Wrapper
                width={width < 700 ? `70%` : `65%`}
                padding={width < 700 ? `0 10px` : `0 50px`}
                al={`flex-start`}
              >
                상품 구매 - 포인트 적립
              </Wrapper>
              <Wrapper width={width < 700 ? `15%` : `25%`}>+123</Wrapper>
            </List>
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

export default Point;
