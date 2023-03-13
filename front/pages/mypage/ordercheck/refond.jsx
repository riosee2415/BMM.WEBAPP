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
  Image,
  CommonButton,
  SpanText,
  TextInput,
} from "../../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../../components/MypageTop";
import { CheckCircleOutlined } from "@ant-design/icons";
import RefondTop from "../../../components/RefondTop";

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
        <title>BUY ME MINE | 주문상세 정보</title>
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
              <Text>환불 신청하기</Text>
            </Wrapper>
            <RefondTop />
            <Wrapper al={`flesx-start`}>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                borderBottom={`1px solid ${Theme.basicTheme_C}`}
                margin={`0 0 16px`}
              >
                <Text
                  fontSize={width < 800 ? `20px` : `24px`}
                  fontWeight={`600`}
                  margin={`0 0 20px`}
                >
                  환불 주문서
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={width < 800 ? `100%` : `65%`}>
                <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 16px`}>
                  <Text
                    width={width < 800 ? `30%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
                    margin={width < 1100 ? `16px 0 0` : `16px 0 16px`}
                  >
                    수령인 이름<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <TextInput
                    width={width < 800 ? `100%` : `45%`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    al={`flex-start`}
                    margin={`16px 0 16px`}
                    placeholder="이름을 입력해주세요."
                  />
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 16px`}>
                  <Text
                    width={width < 800 ? `30%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
                    margin={width < 1100 ? `16px 0 0` : `16px 0 16px`}
                  >
                    이메일<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <TextInput
                    width={width < 800 ? `100%` : `45%`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    al={`flex-start`}
                    margin={`16px 0 16px`}
                    placeholder="이메일을 입력해주세요."
                  />
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 16px`}>
                  <Text
                    width={width < 1100 ? `30%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
                    margin={width < 1100 ? `16px 0 0` : `16px 0 16px`}
                  >
                    연락처<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <TextInput
                    width={width < 1100 ? `100%` : `45%`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    al={`flex-start`}
                    margin={`16px 0 16px`}
                    placeholder="'-' 제외 연락처를 입력해주세요."
                  />
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 16px`}>
                  <Wrapper
                    width={width < 800 ? `45%` : `20%`}
                    al={`flex-start`}
                  >
                    <Text lineHeight={`46px`} fontSize={`16px`}>
                      주소<SpanText color={Theme.red_C}>*</SpanText>
                    </Text>
                  </Wrapper>
                  <Wrapper width={`45%`} al={`flex-start`}>
                    <TextInput
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      al={`flex-start`}
                      margin={`0 0 10px`}
                    />
                    <TextInput
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      al={`flex-start`}
                      margin={`0 0 10px`}
                      placeholder="기본주소"
                    />
                    <TextInput
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      al={`flex-start`}
                      margin={`0 0 16px`}
                      placeholder="상세주소를 입력해주세요."
                    />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
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
