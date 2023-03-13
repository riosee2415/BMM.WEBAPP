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
  Image,
  CommonButton,
  SpanText,
} from "../../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../../components/MypageTop";
import Link from "next/dist/client/link";
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
              <Text>주문상세 정보</Text>
            </Wrapper>
            <RefondTop />
            <Wrapper al={`flesx-start`}>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                margin={width < 1100 ? `20px 0 20px` : `0 0 20px`}
              >
                <Text
                  fontSize={width < 800 ? `20px` : `24px`}
                  fontWeight={`600`}
                  margin={`0 35px 0 0`}
                >
                  수령인 정보입력
                </Text>
                <Wrapper
                  width={width < 1100 ? `80%` : `20%`}
                  height={`30px`}
                  border={`1px solid ${Theme.basicTheme_C}`}
                  radius={`5%`}
                  margin={width < 1100 ? `10px 0 0` : `0`}
                >
                  <Text fontSize={`16px`}>우체국 택배</Text>
                  <Text fontSize={`16px`} fontWeight={`600`}>
                    110-0848-01545468
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={width < 800 ? `100%` : `65%`}>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderTop={`1px solid ${Theme.basicTheme_C}`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                  margin={`0 0 16px`}
                >
                  <Text
                    width={width < 800 ? `30%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
                    margin={width < 1100 ? `16px 0 0` : `16px 0 16px`}
                  >
                    수령인 이름<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <Wrapper
                    width={width < 800 ? `100%` : `45%`}
                    height={`46px`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    bgColor={Theme.lightGrey3_C}
                    al={`flex-start`}
                    padding={`0 10px`}
                    margin={`16px 0 16px`}
                  >
                    <Text color={Theme.grey_C}>김똑진</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                >
                  <Text
                    width={width < 800 ? `35%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
                    margin={`0 0 16px`}
                  >
                    수령인 영어이름<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <Wrapper
                    width={width < 800 ? `100%` : `45%`}
                    height={`46px`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    bgColor={Theme.lightGrey3_C}
                    al={`flex-start`}
                    padding={`0 10px`}
                    margin={`0 0 16px`}
                  >
                    <Text color={Theme.grey_C}>Kim mine</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                  margin={`0 0 16px`}
                >
                  <Wrapper
                    width={width < 800 ? `45%` : `20%`}
                    al={`flex-start`}
                  >
                    <Text lineHeight={`46px`} fontSize={`16px`}>
                      개인통관고유부호
                      <SpanText color={Theme.red_C}>*</SpanText>
                    </Text>
                  </Wrapper>
                  <Wrapper width={width < 800 ? `100%` : `45%`}>
                    <Wrapper
                      height={`46px`}
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      bgColor={Theme.lightGrey3_C}
                      al={`flex-start`}
                      padding={`0 10px`}
                      margin={`16px 0 0`}
                    >
                      <Text color={Theme.grey_C}>P123456789123</Text>
                    </Wrapper>
                    <Wrapper
                      al={`flex-start`}
                      color={Theme.red_C}
                      margin={`16px 0 16px`}
                    >
                      <Text>
                        * 반드시
                        <SpanText fontWeight={`600`}>
                          수령인의 '개인통관고유부호'
                        </SpanText>
                        를 입력해주세요.
                      </Text>
                      <Text>
                        * 개인통관고유부호가 불일치할 경우, 통관이 진행되지
                        않습니다.
                      </Text>
                      <Text>
                        * 개인통관고유부호는 관세청사이트에서 발급받을 수
                        있습니다.
                      </Text>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                  margin={`0 0 16px`}
                >
                  <Text
                    width={width < 800 ? `45%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
                    margin={`0 0 16px`}
                  >
                    이메일<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <Wrapper
                    width={width < 800 ? `100%` : `45%`}
                    height={`46px`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    bgColor={Theme.lightGrey3_C}
                    al={`flex-start`}
                    padding={`0 10px`}
                    margin={`0 0 16px`}
                  >
                    <Text color={Theme.grey_C}>mine01@gmail.com</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                  margin={`0 0 16px`}
                >
                  <Text
                    width={width < 800 ? `45%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
                    margin={`0 0 16px`}
                  >
                    연락처<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <Wrapper
                    width={width < 800 ? `100%` : `45%`}
                    height={`46px`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    bgColor={Theme.lightGrey3_C}
                    al={`flex-start`}
                    padding={`0 10px`}
                    margin={`0 0 16px`}
                  >
                    <Text color={Theme.grey_C}>010-0000-0000</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                  margin={`0 0 16px`}
                >
                  <Wrapper
                    width={width < 800 ? `45%` : `20%`}
                    al={`flex-start`}
                  >
                    <Text lineHeight={`46px`} fontSize={`16px`}>
                      주소<SpanText color={Theme.red_C}>*</SpanText>
                    </Text>
                  </Wrapper>
                  <Wrapper width={width < 800 ? `100%` : `45%`}>
                    <Wrapper
                      height={`46px`}
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      bgColor={Theme.lightGrey3_C}
                      al={`flex-start`}
                      padding={`0 10px`}
                      margin={`0 0 10px`}
                    >
                      <Text color={Theme.grey_C}>35555</Text>
                    </Wrapper>
                    <Wrapper
                      height={`46px`}
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      bgColor={Theme.lightGrey3_C}
                      al={`flex-start`}
                      padding={`0 10px`}
                      margin={`0 0 10px`}
                    >
                      <Text color={Theme.grey_C}>
                        대전광역시 서구 대덕대로 234
                      </Text>
                    </Wrapper>
                    <Wrapper
                      height={`46px`}
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      bgColor={Theme.lightGrey3_C}
                      al={`flex-start`}
                      padding={`0 10px`}
                      margin={`0 0 16px`}
                    >
                      <Text color={Theme.grey_C}>1607호</Text>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                >
                  <Wrapper
                    width={width < 800 ? `45%` : `20%`}
                    al={`flex-start`}
                  >
                    <Text lineHeight={`46px`} fontSize={`16px`}>
                      배송 메시지
                    </Text>
                  </Wrapper>

                  <Wrapper width={width < 800 ? `100%` : `45%`}>
                    <Wrapper
                      height={`46px`}
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      bgColor={Theme.lightGrey3_C}
                      al={`flex-start`}
                      padding={`0 10px`}
                      margin={`0 0 10px`}
                    >
                      <Text color={Theme.grey_C}>직접입력</Text>
                    </Wrapper>
                    <Wrapper
                      height={`46px`}
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      bgColor={Theme.lightGrey3_C}
                      al={`flex-start`}
                      padding={`0 10px`}
                      margin={`0 0 16px`}
                    >
                      <Text color={Theme.grey_C}>
                        부재 시 연락 부탁드립니다.
                      </Text>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  fontSize={width < 800 ? `20px` : `24px`}
                  fontWeight={`600`}
                  al={`flex-start`}
                  margin={`60px 0 20px`}
                >
                  쿠폰 및 포인트
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderTop={`1px solid ${Theme.basicTheme_C}`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                  margin={`0 0 16px`}
                >
                  <Text
                    width={width < 1100 ? `30%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
                    margin={width < 1100 ? `16px 0 0` : `16px 0 16px`}
                  >
                    쿠폰
                  </Text>
                  <Wrapper
                    width={width < 1100 ? `100%` : `45%`}
                    height={`46px`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    bgColor={Theme.lightGrey3_C}
                    al={`flex-start`}
                    padding={`0 10px`}
                    margin={`16px 0 16px`}
                  >
                    <Text color={Theme.grey_C}>
                      회원가입 / ~22.12.30 / 만 원 이상 / 1,000원 할인
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                >
                  <Text
                    width={width < 1100 ? `35%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
                    margin={`0 0 16px`}
                  >
                    포인트
                  </Text>
                  <Wrapper
                    width={width < 800 ? `100%` : `45%`}
                    height={`46px`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    bgColor={Theme.lightGrey3_C}
                    al={`flex-start`}
                    padding={`0 10px`}
                    margin={`0 0 16px`}
                  >
                    <Text color={Theme.grey_C}>2,000P</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  fontSize={width < 800 ? `20px` : `24px`}
                  fontWeight={`600`}
                  al={`flex-start`}
                  margin={`60px 0 20px`}
                >
                  결제 수단
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderTop={`1px solid ${Theme.basicTheme_C}`}
                  margin={`0 0 16px`}
                >
                  <Text
                    width={width < 800 ? `30%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
                    margin={width < 1100 ? `10px 0 0` : `16px 0 16px`}
                  >
                    결제수단
                  </Text>
                  <Wrapper
                    width={width < 800 ? `100%` : `45%`}
                    fontSize={`16px`}
                  >
                    <Wrapper dr="row" ju={`flex-start`} margin={`30px 0 16px`}>
                      <SpanText color={Theme.lightGrey_C} padding={`0 5px`}>
                        <CheckCircleOutlined />
                      </SpanText>
                      신용카드
                    </Wrapper>
                    <Wrapper
                      height={`46px`}
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      bgColor={Theme.lightGrey3_C}
                      al={`flex-start`}
                      padding={`0 10px`}
                      margin={`0 0 10px`}
                    >
                      <Text color={Theme.grey_C}>KB 국민</Text>
                    </Wrapper>
                    <Wrapper
                      height={`46px`}
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      bgColor={Theme.lightGrey3_C}
                      al={`flex-start`}
                      padding={`0 10px`}
                    >
                      <Text color={Theme.grey_C}>일시불</Text>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper width={width < 800 ? `100%` : `30%`}>
                <Wrapper
                  height={`255px`}
                  border={`1px solid ${Theme.lightGrey2_C}`}
                  bgColor={Theme.lightGrey3_C}
                  margin={`0 0 30px`}
                >
                  <Image
                    alt="check icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/check.png`}
                    width={`19px`}
                    hegiht={`19px`}
                    margin={`0 0 12px`}
                  />
                  <Text
                    fontSize={`27px`}
                    fontWeight={`bold`}
                    margin={`0 0 18px`}
                  >
                    상품은 잘 받아보셨나요?
                  </Text>
                  <Text
                    fontSize={`16px`}
                    fontWeight={`600`}
                    color={Theme.lightGrey_C}
                    margin={`0 0 30px`}
                  >
                    리뷰 작성하시고 포인트 받아가세요!
                  </Text>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`80%`}
                    height={`54px`}
                    margin={`0 0 10px`}
                  >
                    리뷰 작성하기
                  </CommonButton>
                </Wrapper>
                <Wrapper
                  height={`445px`}
                  border={`1px solid ${Theme.lightGrey2_C}`}
                  bgColor={Theme.lightGrey3_C}
                  borderBottom={`1px soild ${Theme.basicTheme_C}`}
                >
                  <Wrapper
                    width={`90%`}
                    height={`400px`}
                    dr={`row`}
                    al={`flex-start`}
                    ju={`flex-start`}
                    margin={`0`}
                  >
                    <Text fontSize={`20px`} fontWeight={`600`}>
                      총 2개의 상품
                    </Text>
                    <Wrapper dr={`row`} ju={`space-between`}>
                      <Text>총 상품금액</Text>
                      <Text>18,000원</Text>
                    </Wrapper>

                    <Wrapper dr={`row`} ju={`space-between`}>
                      <Text>총 무게</Text>
                      <Text>240g</Text>
                    </Wrapper>
                    <Wrapper dr={`row`} ju={`space-between`}>
                      <Text>총 배송비</Text>
                      <Text>6,000원</Text>
                    </Wrapper>
                    <Wrapper dr={`row`} ju={`space-between`}>
                      <Text>총 할인금액</Text>
                      <Text>4,000원</Text>
                    </Wrapper>
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
