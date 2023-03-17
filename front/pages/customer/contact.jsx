import React, { useState, useCallback } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import CustomerLeft from "../../components/CustomerLeft";
import Theme from "../../components/Theme";

import styled from "styled-components";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Contact = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////

  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 1:1문의</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `70px 0` : `95px 0 100px`}>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <CustomerLeft />
            <Wrapper
              width={
                width < 1100
                  ? width < 900
                    ? `100%`
                    : `calc(100% - 200px)`
                  : `calc(100% - 260px)`
              }
            >
              <Wrapper
                bgColor={Theme.lightGrey3_C}
                padding={width < 900 ? `20px 10px` : `40px`}
                dr={`row`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/3D_1vs1-conver.png`}
                  width={width < 900 ? `90px` : `115px`}
                />
                <Wrapper
                  width={
                    width < 900 ? `calc(100% - 90px)` : `calc(100% - 115px)`
                  }
                  padding={width < 900 ? `0 0 0 10px` : `0 0 0 18px`}
                  al={`flex-start`}
                  height={width < 1100 ? `auto` : `115px`}
                  ju={`space-between`}
                >
                  <Wrapper
                    al={`flex-start`}
                    fontSize={width < 900 ? `14px` : `24px`}
                  >
                    <Text>궁금한 사항이 있으신가요?</Text>
                    <Text>
                      <SpanText fontWeight={`bold`}>1:1 문의</SpanText>를
                      이용해보세요!
                    </Text>
                  </Wrapper>
                  {width < 900 ? (
                    <>
                      <Wrapper al={`flex-start`} fontSize={`14px`}>
                        1:1문의는 회원만 이용할 수 있습니다.
                      </Wrapper>
                      <Wrapper dr={`row`} ju={`flex-start`} fontSize={`16px`}>
                        <Text
                          onClick={() => router.push(`/user/login`)}
                          isHover
                          fontWeight={`600`}
                          td={`underline`}
                        >
                          로그인
                        </Text>
                        을 해주세요!
                      </Wrapper>
                    </>
                  ) : (
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      fontSize={width < 900 ? `14px` : `18px`}
                    >
                      1:1문의는 회원만 이용할 수 있습니다.
                      <Text
                        onClick={() => router.push(`/user/login`)}
                        isHover
                        fontWeight={`600`}
                        td={`underline`}
                        margin={`0 0 0 5px`}
                      >
                        로그인
                      </Text>
                      을 해주세요!
                    </Wrapper>
                  )}
                </Wrapper>
              </Wrapper>

              <Wrapper al={`flex-start`} margin={`45px 0 40px`}>
                <Text
                  fontSize={width < 900 ? `22px` : `28px`}
                  fontWeight={`bold`}
                >
                  1:1 문의
                </Text>
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 32px`}>
                <Text
                  fontSize={`16px`}
                  lineHeight={`45px`}
                  width={width < 700 ? `100%` : `135px`}
                >
                  아이디<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  readOnly
                  width={width < 700 ? `100%` : `calc(100% - 135px)`}
                  height={`45px`}
                  placeholder={!me && `로그인이 필요한 서비스입니다.`}
                  value={me && me.userId}
                />
              </Wrapper>
              <Wrapper dr={`row`} margin={`0 0 32px`}>
                <Text
                  fontSize={`16px`}
                  lineHeight={`45px`}
                  width={width < 700 ? `100%` : `135px`}
                >
                  이름<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  readOnly
                  width={width < 700 ? `100%` : `calc(100% - 135px)`}
                  height={`45px`}
                  placeholder={!me && `로그인이 필요한 서비스입니다.`}
                  value={me && me.username}
                />
              </Wrapper>
              <Wrapper dr={`row`} margin={`0 0 32px`}>
                <Text
                  fontSize={`16px`}
                  lineHeight={`45px`}
                  width={width < 700 ? `100%` : `135px`}
                >
                  제목<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  width={width < 700 ? `100%` : `calc(100% - 135px)`}
                  height={`45px`}
                  placeholder="제목을 입력해주세요."
                />
              </Wrapper>
              <Wrapper dr={`row`} margin={`0 0 32px`} al={`flex-start`}>
                <Text
                  fontSize={`16px`}
                  lineHeight={`45px`}
                  width={width < 700 ? `100%` : `135px`}
                >
                  내용<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <Wrapper
                  width={width < 700 ? `100%` : `calc(100% - 135px)`}
                  al={`flex-start`}
                >
                  <TextArea
                    width={`100%`}
                    height={`120px`}
                    placeholder="내용을 입력해주세요."
                  />
                  <CommonButton
                    margin={`40px 0 0`}
                    width={`240px`}
                    height={`54px`}
                    kindOf={`white`}
                    fontWeight={`600`}
                    fontSize={`18px`}
                  >
                    1:1 문의하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>
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

export default Contact;
