import React, { useCallback, useState } from "react";
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
  ATag,
  SpanText,
} from "../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../components/MypageTop";
import Link from "next/dist/client/link";

const ListBtn = styled(Wrapper)`
  width: 240px;
  height: 54px;
  font-size: 18px;
  font-weight: 600;
  background-color: ${Theme.white_C};
  border: 1px solid ${Theme.lightGrey2_C};

  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.lightGrey2_C};
    color: ${(props) => props.theme.black_C};
  }

  @media (max-width: 500px) {
    font-size: 16px;
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
        <WholeWrapper padding={`95px 0 100px`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 700 ? `26px` : `30px`}
              fontWeight={`600`}
              margin={width < 800 ? `0 0 35px` : `0 0 50px`}
            >
              <Text>1:1 문의 내역</Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 33px`}>
              <Text margin={width < 800 ? `0 0 5px` : `0`}>
                아이디<SpanText color={Theme.red_C}>*</SpanText>
              </Text>
              <Wrapper
                width={width < 800 ? `100%` : `90%`}
                height={`46px`}
                border={`1px solid ${Theme.lightGrey2_C}`}
                bgColor={Theme.lightGrey3_C}
                al={`flex-start`}
                padding={`0 10px`}
              >
                <Text color={Theme.grey_C}>screenscratchcost300,000won</Text>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 33px`}>
              <Text margin={width < 800 ? `0 0 5px` : `0`}>
                이름<SpanText color={Theme.red_C}>*</SpanText>
              </Text>
              <Wrapper
                width={width < 800 ? `100%` : `90%`}
                height={`46px`}
                border={`1px solid ${Theme.lightGrey2_C}`}
                bgColor={Theme.lightGrey3_C}
                al={`flex-start`}
                padding={`0 10px`}
              >
                <Text color={Theme.grey_C}>김똑진</Text>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 33px`}>
              <Text margin={width < 800 ? `0 0 5px` : `0`}>
                제목<SpanText color={Theme.red_C}>*</SpanText>
              </Text>
              <Wrapper
                width={width < 800 ? `100%` : `90%`}
                height={`46px`}
                border={`1px solid ${Theme.lightGrey2_C}`}
                bgColor={Theme.lightGrey3_C}
                al={`flex-start`}
                padding={`0 10px`}
              >
                <Text color={Theme.grey_C}>제목입니다.</Text>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`}>
              <Text margin={width < 800 ? `0 0 5px` : `-10px 0 0`}>
                내용<SpanText color={Theme.red_C}>*</SpanText>
              </Text>
              <Wrapper
                width={width < 800 ? `100%` : `90%`}
                border={`1px solid ${Theme.lightGrey2_C}`}
                bgColor={Theme.lightGrey3_C}
                al={`flex-start`}
                margin={`0 0 40px`}
              >
                <Text
                  width={`100%`}
                  height={`120px`}
                  padding={`10px`}
                  color={Theme.grey_C}
                >
                  내용입니다.
                </Text>
              </Wrapper>
            </Wrapper>
            <Link href={`/mypage/question`}>
              <ATag>
                <ListBtn>목록으로</ListBtn>
              </ATag>
            </Link>
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
