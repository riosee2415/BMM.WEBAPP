import React, { useCallback, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Theme from "../../../components/Theme";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  CustomPage,
  ATag,
} from "../../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../../components/MypageTop";
import Link from "next/dist/client/link";

const List = styled(Wrapper)`
  height: 60px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;

  &:hover {
    cursor: pointer;
    background: ${Theme.subTheme_C};
  }
`;

const Question = () => {
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
        <title>BUY ME MINE | 1:1 문의 내역</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 0` : `95px 0 0`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 700 ? `26px` : `30px`}
              fontWeight={`600`}
              margin={`0 0 30px`}
            >
              <Text>1:1 문의 내역</Text>
            </Wrapper>

            <Wrapper
              height={`54px`}
              dr={`row`}
              color={Theme.grey_C}
              bgColor={Theme.lightGrey3_C}
              borderTop={`1px solid ${Theme.basicTheme_C}`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              fontSize={`16px`}
              fontWeight={`600`}
            >
              <Wrapper width={`10%`} display={width < 800 ? `none` : `flex`}>
                번호
              </Wrapper>
              <Wrapper width={width < 800 ? `65%` : `75%`}>제목</Wrapper>
              <Wrapper width={width < 800 ? `35%` : `15%`}>문의날짜</Wrapper>
            </Wrapper>
            <Link href={`/mypage/question/1`}>
              <ATag>
                <List>
                  <Wrapper
                    width={`10%`}
                    color={Theme.grey_C}
                    display={width < 800 ? `none` : `flex`}
                  >
                    10
                  </Wrapper>
                  <Wrapper
                    width={width < 800 ? `65%` : `75%`}
                    padding={width < 800 ? `0 10px` : `0 50px`}
                    color={Theme.darkGrey_C}
                  >
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <Text width={width < 800 ? `100%` : `75%`} isEllipsis>
                        제목이 들어올 곳입니다.
                      </Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper width={width < 800 ? `35%` : `15%`}>
                    2022.12.22
                  </Wrapper>
                </List>
              </ATag>
            </Link>
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

export default Question;
