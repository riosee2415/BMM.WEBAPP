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
  CustomPage,
} from "../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../components/MypageTop";
import { LockFilled } from "@ant-design/icons";

const List = styled(Wrapper)`
  height: 60px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;
`;

const MobileList = styled(Wrapper)`
  margin: 0 0 10px;
  border: 1px solid ${Theme.lightGrey2_C};
  padding: 15px;

  &:last-child {
    margin: 0;
  }

  &:nth-child(2n) {
    background: ${Theme.subTheme_C};
  }
`;

const Request = () => {
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
        <title>BUY ME MINE | 상품요청</title>
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
              margin={`0 0 30px`}
            >
              <Text>상품 요청 내역</Text>
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
              display={width < 800 ? `none` : `flex`}
            >
              <Wrapper width={`10%`}>번호</Wrapper>
              <Wrapper width={`45%`}>제목</Wrapper>
              <Wrapper width={`15%`}>작성자</Wrapper>
              <Wrapper width={`15%`}>작성일</Wrapper>
              <Wrapper width={`15%`}>답변상태</Wrapper>
            </Wrapper>
            {width < 600 ? (
              <Wrapper>
                <MobileList>
                  <Wrapper al={`flex-start`} fontSize={`16px`}>
                    <Text>
                      상품 요청
                      <LockFilled />
                    </Text>
                  </Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    color={Theme.grey_C}
                    margin={`0 0 15px`}
                  >
                    김**
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`space-between`}>
                    <Text>2022.12.31</Text>
                    <Text>답변완료</Text>
                  </Wrapper>
                </MobileList>
              </Wrapper>
            ) : (
              <List>
                <Wrapper width={`10%`} color={Theme.grey_C}>
                  10
                </Wrapper>
                <Wrapper
                  width={`45%`}
                  padding={`0 50px`}
                  al={`flex-start`}
                  color={Theme.darkGrey_C}
                  cursor={`pointer`}
                >
                  <Text isHover>
                    상품 요청
                    <LockFilled />
                  </Text>
                </Wrapper>
                <Wrapper width={`15%`} color={Theme.grey_C}>
                  김**
                </Wrapper>
                <Wrapper width={`15%`}>2022.12.31</Wrapper>
                <Wrapper width={`15%`} fontSize={`16px`} fontWeight={`600`}>
                  답변완료
                </Wrapper>
              </List>
            )}
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

export default Request;
