import React, { useState, useCallback } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import CustomerLeft from "../../../components/CustomerLeft";
import Theme from "../../../components/Theme";

import styled from "styled-components";
import QuillEditor from "../../../components/editor/ReactQuill";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Checkbox } from "antd";

const Index = () => {
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
        <title>BUY ME MINE | 상품 요청</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `70px 0` : `95px 0`}>
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
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/3D_product-request.png`}
                  width={width < 900 ? `90px` : `115px`}
                />
                <Wrapper
                  width={
                    width < 900 ? `calc(100% - 90px)` : `calc(100% - 115px)`
                  }
                  padding={width < 900 ? `0 0 0 10px` : `0 0 0 18px`}
                  al={`flex-start`}
                  ju={`space-between`}
                >
                  <Wrapper
                    al={`flex-start`}
                    fontSize={width < 900 ? `14px` : `24px`}
                  >
                    <Text>찾으시는 상품이 없으신가요?</Text>
                    <Text>
                      <SpanText fontWeight={`bold`}>상품 요청 서비스</SpanText>
                      를 이용해보세요!
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    al={`flex-end`}
                    fontSize={width < 900 ? `14px` : `18px`}
                  >
                    Buy ME MINE은 고객을 위해 맞춤 서비스를 제공합니다.
                    <CommonButton
                      width={`160px`}
                      height={width < 900 ? `40px` : `48px`}
                      fontSize={width < 900 ? `16px` : `18px`}
                      fontWeight={`600`}
                      kindOf={`white`}
                      onClick={() => router.push(`/customer/request/write`)}
                    >
                      상품 요청하기
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper al={`flex-start`} margin={`45px 0 40px`}>
                <Text
                  fontSize={width < 900 ? `22px` : `28px`}
                  fontWeight={`bold`}
                >
                  상품 요청
                </Text>
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
                  width={width < 700 ? `100%` : `calc(100% - 135px)`}
                  height={`45px`}
                  placeholder={`이름을 입력해주세요.`}
                  value={me && me.username}
                />
              </Wrapper>
              <Wrapper dr={`row`} margin={`0 0 32px`}>
                <Text
                  fontSize={`16px`}
                  lineHeight={`45px`}
                  width={width < 700 ? `100%` : `135px`}
                >
                  연락처<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  width={width < 700 ? `100%` : `calc(100% - 135px)`}
                  height={`45px`}
                  placeholder={`'-' 제외 연락처를 입력해주세요.`}
                  value={me && me.userId}
                  type="number"
                />
              </Wrapper>
              <Wrapper dr={`row`} margin={`0 0 32px`}>
                <Text
                  fontSize={`16px`}
                  lineHeight={`45px`}
                  width={width < 700 ? `100%` : `135px`}
                >
                  이메일<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  width={width < 700 ? `100%` : `calc(100% - 135px)`}
                  height={`45px`}
                  placeholder="이메일을 입력해주세요."
                />
              </Wrapper>
              <Wrapper dr={`row`} margin={`0 0 32px`}>
                <Text
                  fontSize={`16px`}
                  lineHeight={`45px`}
                  width={width < 700 ? `100%` : `135px`}
                >
                  상품명<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  width={width < 700 ? `100%` : `calc(100% - 135px)`}
                  height={`45px`}
                  placeholder="상품명을 입력해주세요."
                />
              </Wrapper>
              <Wrapper dr={`row`} margin={`0 0 32px`} al={`flex-start`}>
                <Text
                  fontSize={`16px`}
                  lineHeight={`45px`}
                  width={width < 700 ? `100%` : `135px`}
                >
                  상품URL<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  width={width < 700 ? `100%` : `calc(100% - 135px)`}
                  height={`45px`}
                  placeholder="상품의 링크를 입력해주세요."
                />
              </Wrapper>
              <Wrapper height={`480px`}>
                <QuillEditor />
              </Wrapper>
              <Wrapper dr={`row`} margin={`32px 0 24px`} al={`flex-start`}>
                <Text
                  fontSize={`16px`}
                  lineHeight={`45px`}
                  width={width < 700 ? `100%` : `135px`}
                >
                  비밀글 작성<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  width={width < 700 ? `100%` : `calc(100% - 135px)`}
                  height={`45px`}
                  placeholder="해당 글의 비밀번호를 입력해주세요."
                />
              </Wrapper>
              <Wrapper dr={`row`} ju={`flex-start`}>
                <Checkbox>
                  <Text fontSize={width < 700 ? `15px` : `18px`}>
                    <SpanText fontWeight={`600`} margin={`0 5px 0 0`}>
                      (필수)
                    </SpanText>
                    개인정보처리방침에 동의합니다.
                  </Text>
                </Checkbox>
                <Text
                  fontSize={`16px`}
                  td={`underline`}
                  color={Theme.grey_C}
                  isHover
                >
                  내용보기
                </Text>
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <CommonButton
                  margin={`40px 0 0`}
                  width={`240px`}
                  height={`54px`}
                  kindOf={`white`}
                  fontWeight={`600`}
                  fontSize={`18px`}
                >
                  상품 요청하기
                </CommonButton>
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

export default Index;
