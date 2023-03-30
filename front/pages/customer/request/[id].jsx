import React, { useState, useCallback, useEffect } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import { REQUEST_LIST_DETAIL_REQUEST } from " ../../../reducers/request";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import CustomerLeft from "../../../components/CustomerLeft";
import Theme from "../../../components/Theme";

import styled from "styled-components";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { LockFilled } from "@ant-design/icons";
import Link from "next/dist/client/link";

const List = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  height: 60px;
  font-size: 16px;

  &:hover {
    cursor: pointer;
    border-bottom: 1px solid ${Theme.basicTheme_C};
  }

  @media (max-width: 700px) {
    height: auto;
    padding: 10px;
    border: 1px solid ${Theme.lightGrey2_C};
    margin: 0 0 15px;
    border-radius: 10px;

    &:nth-child(2n) {
      background: ${Theme.lightGrey3_C};
    }
  }
`;

const EditorWrapper = styled(Wrapper)`
  @media (max-width: 700px) {
    img {
      width: 100%;
    }
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { requestDetail } = useSelector((state) => state.request);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (router.query) {
      dispatch({
        type: REQUEST_LIST_DETAIL_REQUEST,
        data: {
          id: router.query.id,
        },
      });
    }
  }, [router.query]);

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
              <Wrapper
                borderTop={`1px solid ${Theme.basicTheme_C}`}
                padding={width < 800 ? `20px 10px` : `24px 20px`}
                dr={`row`}
                ju={`space-between`}
                bgColor={Theme.lightGrey3_C}
              >
                <Wrapper width={`auto`} al={`flex-start`}>
                  <Text
                    fontSize={width < 800 ? `16px` : `18px`}
                    fontWeight={`600`}
                    margin={`0 0 12px`}
                  >
                    {requestDetail && requestDetail.productName}
                  </Text>
                  <Text color={Theme.darkGrey_C} fontSize={`16px`}>
                    {requestDetail && requestDetail.name}
                    <SpanText margin={`0 0 0 18px`}>
                      {requestDetail && requestDetail.updatedAt}
                    </SpanText>
                  </Text>
                </Wrapper>
                <Wrapper
                  width={width < 800 ? `100%` : `auto`}
                  margin={width < 800 ? `10px 0 0` : `0`}
                  padding={`0 20px`}
                  height={`40px`}
                  bgColor={Theme.white_C}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  color={Theme.lightGrey_C}
                >
                  {requestDetail && requestDetail.isCompleted}
                </Wrapper>
                {/* <Wrapper
                  width={width < 800 ? `100%` : `auto`}
                  margin={width < 800 ? `10px 0 0` : `0`}
                  padding={`0 20px`}
                  height={`40px`}
                  border={`1px solid ${Theme.basicTheme_C}`}
                  bgColor={Theme.white_C}
                  fontSize={`16px`}
                  fontWeight={`600`}
                >
                  답변완료
                </Wrapper> */}
              </Wrapper>

              <Wrapper padding={`40px 0 60px`}>
                <Wrapper dr={`row`} fontSize={`16px`} margin={`0 0 24px`}>
                  <Text
                    width={width < 800 ? `100%` : `150px`}
                    margin={width < 800 ? `0 0 10px` : `0`}
                  >
                    이름<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <Wrapper
                    al={`flex-start`}
                    color={Theme.grey_C}
                    width={width < 800 ? `100%` : `calc(100% - 150px)`}
                  >
                    {requestDetail && requestDetail.name}
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} fontSize={`16px`} margin={`0 0 24px`}>
                  <Text
                    width={width < 800 ? `100%` : `150px`}
                    margin={width < 800 ? `0 0 10px` : `0`}
                  >
                    연락처<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <Wrapper
                    al={`flex-start`}
                    color={Theme.grey_C}
                    width={width < 800 ? `100%` : `calc(100% - 150px)`}
                  >
                    {requestDetail && requestDetail.mobile}
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} fontSize={`16px`} margin={`0 0 24px`}>
                  <Text
                    width={width < 800 ? `100%` : `150px`}
                    margin={width < 800 ? `0 0 10px` : `0`}
                  >
                    이메일<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <Wrapper
                    al={`flex-start`}
                    color={Theme.grey_C}
                    width={width < 800 ? `100%` : `calc(100% - 150px)`}
                  >
                    {requestDetail && requestDetail.email}
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} fontSize={`16px`} margin={`0 0 24px`}>
                  <Text
                    width={width < 800 ? `100%` : `150px`}
                    margin={width < 800 ? `0 0 10px` : `0`}
                  >
                    상품명<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <Wrapper
                    al={`flex-start`}
                    color={Theme.grey_C}
                    width={width < 800 ? `100%` : `calc(100% - 150px)`}
                  >
                    {requestDetail && requestDetail.productName}
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} fontSize={`16px`} margin={`0 0 24px`}>
                  <Text
                    width={width < 800 ? `100%` : `150px`}
                    margin={width < 800 ? `0 0 10px` : `0`}
                  >
                    상품URL<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <Wrapper
                    al={`flex-start`}
                    color={Theme.grey_C}
                    width={width < 800 ? `100%` : `calc(100% - 150px)`}
                  >
                    {requestDetail && requestDetail.productUrl}
                  </Wrapper>
                </Wrapper>

                <EditorWrapper margin={`40px 0 0`}>
                  에디터 연동자리
                </EditorWrapper>
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                fontSize={width < 800 ? `20px` : `28px`}
                fontWeight={`bold`}
                margin={`0 0 14px`}
              >
                답변
              </Wrapper>
              <Wrapper
                bgColor={Theme.lightGrey3_C}
                radius={`30px`}
                padding={width < 800 ? `20px 15px` : `40px 26px`}
              >
                <Text>{requestDetail && requestDetail.answer}</Text>
              </Wrapper>

              <Wrapper dr={`row`} margin={`36px 0 0`}>
                <Link href={`/customer/request`}>
                  <a>
                    <CommonButton
                      kindOf={`darkGrey`}
                      width={width < 800 ? `150px` : `240px`}
                      height={`54px`}
                      fontSize={width < 800 ? `16px` : `18px`}
                      fontWeight={`600`}
                      margin={`0 10px 0 0`}
                    >
                      목록으로
                    </CommonButton>
                  </a>
                </Link>
                {me ? (
                  <CommonButton
                    kindOf={`white`}
                    width={width < 800 ? `150px` : `240px`}
                    height={`54px`}
                    fontSize={width < 800 ? `16px` : `18px`}
                    fontWeight={`600`}
                  >
                    장바구니 바로가기
                  </CommonButton>
                ) : (
                  <Link href={`/user/login`}>
                    <a>
                      <CommonButton
                        kindOf={`white`}
                        width={width < 800 ? `150px` : `240px`}
                        height={`54px`}
                        fontSize={width < 800 ? `16px` : `18px`}
                        fontWeight={`600`}
                      >
                        로그인하러가기
                      </CommonButton>
                    </a>
                  </Link>
                )}
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
