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


`;


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
        <title>BUY ME MINE | 주문 / 배송 조회</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 0`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 700 ? `26px` : `30px`}
              fontWeight={`600`}
              margin={`0 0 30px`}
            >
              <Text>주문 / 배송 조회</Text>
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
              <Wrapper width={`10%`}>주문일자</Wrapper>
              <Wrapper width={`40%`}>상품명</Wrapper>
              <Wrapper width={`10%`}>주문수량</Wrapper>
              <Wrapper width={`10%`}>상품금액</Wrapper>
              <Wrapper width={`10%`}>무게</Wrapper>
              <Wrapper width={`10%`}>배송비</Wrapper>
              <Wrapper width={`10%`}>상태</Wrapper>
            </Wrapper>

            <List>      
              <Wrapper width={`10%`} color={Theme.grey_C} display={width < 800 ? `none` : `flex`}>
                10
              </Wrapper>
              <Wrapper
                width={width < 800 ? `75%` : `75%`}
                padding={`0 50px`}
                color={Theme.darkGrey_C}
                cursor={`pointer`}
              >
                <Link href={`/ordercheck/`}>
                  <ATag>
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <Text width={`75%`} isEllipsis isHover>제목이 들어올 곳입니다.</Text>
                    </Wrapper>
                  </ATag>
                </Link>
              </Wrapper>
              <Wrapper width={width < 800 ? `25%` : `15%`} >
                2022.12.22
              </Wrapper>
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

export default Index;
