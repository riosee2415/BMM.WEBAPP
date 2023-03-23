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
  ATag,
  Image,
  CommonButton,
  SpanText,
} from "../../../components/commonComponents";
import styled from "styled-components";
import Link from "next/dist/client/link";
import { Radio } from "antd";
import MypageTop from "../../../components/MypageTop";

const List = styled(Wrapper)`
  height: 100px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;
  margin: 0 0 60px;
`;

const MobileList = styled(Wrapper)`
  margin: 0 0 40px;
  border: 1px solid ${Theme.lightGrey2_C};
  padding: 15px;
`;

const BoxText = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  font-size: 18px;
  margin: ${(props) => props.margin || `0 0 15px`};
`;

const SubText = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  color: ${Theme.lightGrey_C};
  margin: ${(props) => props.margin || `0 0 8px`};
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
        <title>BUY ME MINE | 주문상세 정보</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 0` : `95px 0`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 700 ? `26px` : `30px`}
              fontWeight={`bold`}
              margin={`0 0 30px`}
            >
              <Text>주문상세 정보</Text>
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
              <Wrapper width={`10%`}>주문일자</Wrapper>
              <Wrapper width={`40%`}>상품명</Wrapper>
              <Wrapper width={`10%`}>주문수량</Wrapper>
              <Wrapper width={`10%`}>상품금액</Wrapper>
              <Wrapper width={`10%`}>무게</Wrapper>
              <Wrapper width={`10%`}>배송비</Wrapper>
              <Wrapper width={`10%`}>상태</Wrapper>
            </Wrapper>

            {width < 1100 ? (
              <Wrapper>
                <MobileList>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                    <Text fontWeight={`600`}>배송 완료</Text>
                    <Text color={Theme.grey_C} margin={`0 0 0 5px`}>
                      2022.12.21
                    </Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={`14px`}
                    margin={`0 0 10px`}
                  >
                    <Image
                      alt="샘플사진"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                      width={`70px`}
                      height={`70px`}
                    />
                    <Wrapper
                      width={`auto`}
                      al={`flex-start`}
                      padding={`0 0 0 10px`}
                    >
                      <Text>오레오 시리즈 420g</Text>
                      <Text>주문수량 : 1</Text>
                      <Text>상품금액: 28,000원 + 4,000원</Text>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper dr={`row`} ju={`space-between`}>
                    <CommonButton
                      width={`49%`}
                      height={`26px`}
                      padding={`0`}
                      radius={`3px`}
                      kindOf={`white`}
                      margin={`5px 0 8px`}
                    >
                      리뷰 작성
                    </CommonButton>
                    <Link href={`/mypage/ordercheck/refond`}>
                      <ATag width={`49%`}>
                        <CommonButton
                          width={`100%`}
                          height={`26px`}
                          padding={`0`}
                          radius={`3px`}
                          kindOf={`grey`}
                        >
                          환불신청
                        </CommonButton>
                      </ATag>
                    </Link>
                  </Wrapper>
                </MobileList>
              </Wrapper>
            ) : (
              <>
                <List>
                  <Wrapper color={Theme.darkGrey_C} width={`10%`}>
                    2022.12.21
                  </Wrapper>
                  <Wrapper
                    width={`40%`}
                    dr={`row`}
                    ju={`flex-start`}
                    fontSize={`18px`}
                    fontWeight={`600`}
                    padding={`0 0 0 38px`}
                  >
                    <Image
                      alt="샘플사진"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                      width={`64px`}
                      height={`64px`}
                    />
                    <Text padding={`0 0 0 14px`}>오레오 시리즈</Text>
                  </Wrapper>
                  <Wrapper width={`10%`}>1</Wrapper>
                  <Wrapper color={Theme.darkGrey_C} width={`10%`}>
                    28,000원
                  </Wrapper>
                  <Wrapper color={Theme.darkGrey_C} width={`10%`}>
                    420g
                  </Wrapper>
                  <Wrapper color={Theme.darkGrey_C} width={`10%`}>
                    4,000원
                  </Wrapper>
                  <Wrapper width={`10%`}>
                    <Wrapper fontSize={`16px`} fontWeight={`600`}>
                      배송완료
                    </Wrapper>
                    <CommonButton
                      width={`70px`}
                      height={`26px`}
                      padding={`0`}
                      radius={`3px`}
                      kindOf={`white`}
                      margin={`5px 0 8px`}
                    >
                      리뷰 작성
                    </CommonButton>
                    <Link href={`/mypage/refond`}>
                      <ATag>
                        <CommonButton
                          width={`70px`}
                          height={`26px`}
                          padding={`0`}
                          radius={`3px`}
                          kindOf={`grey`}
                        >
                          환불신청
                        </CommonButton>
                      </ATag>
                    </Link>
                  </Wrapper>
                </List>
              </>
            )}
            <Wrapper al={`flesx-start`}>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                margin={width < 1100 ? `0 0 20px` : `0 0 20px`}
              >
                <Text
                  fontSize={width < 800 ? `20px` : `24px`}
                  fontWeight={`600`}
                  margin={`0 35px 0 0`}
                >
                  수령인 정보입력
                </Text>
                <Wrapper
                  width={`auto`}
                  height={`30px`}
                  border={`1px solid ${Theme.basicTheme_C}`}
                  radius={`5px`}
                  padding={`0 12px`}
                  dr={`row`}
                  margin={width < 1100 ? `10px 0 0` : `0`}
                >
                  <Text fontSize={`16px`}>우체국 택배</Text>
                  <Text fontSize={`16px`} fontWeight={`600`}>
                    110-0848-01545468
                  </Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`} al={`flex-start`}>
              <Wrapper width={width < 800 ? `100%` : `65%`}>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderTop={`1px solid ${Theme.basicTheme_C}`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                  padding={`16px 0`}
                >
                  <Text
                    width={width < 800 ? `30%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
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
                  >
                    <Text color={Theme.grey_C}>김똑진</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                  padding={`16px 0`}
                >
                  <Text
                    width={width < 800 ? `35%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
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
                  >
                    <Text color={Theme.grey_C}>Kim mine</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                  padding={`16px 0`}
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
                      margin={`0 0 16px`}
                      padding={`0 10px`}
                    >
                      <Text color={Theme.grey_C}>P123456789123</Text>
                    </Wrapper>
                    <Wrapper al={`flex-start`} color={Theme.red_C}>
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
                  padding={`16px 0`}
                >
                  <Text
                    width={width < 800 ? `45%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
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
                  >
                    <Text color={Theme.grey_C}>mine01@gmail.com</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                  padding={`16px 0`}
                >
                  <Text
                    width={width < 800 ? `45%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
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
                  >
                    <Text color={Theme.grey_C}>010-0000-0000</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  al={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                  padding={`16px 0`}
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
                    >
                      <Text color={Theme.grey_C}>1607호</Text>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                  padding={`16px 0`}
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
                  padding={`16px 0`}
                >
                  <Text
                    width={width < 1100 ? `30%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
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
                  padding={`16px 0`}
                >
                  <Text
                    width={width < 1100 ? `35%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
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
                  padding={`16px 0`}
                >
                  <Text
                    width={width < 800 ? `30%` : `20%`}
                    lineHeight={`46px`}
                    fontSize={`16px`}
                  >
                    결제수단
                  </Text>
                  <Wrapper
                    width={width < 800 ? `100%` : `45%`}
                    fontSize={`16px`}
                  >
                    <Wrapper al={`flex-start`} margin={`14px 0 16px`}>
                      <Radio disabled={true} defaultChecked={true}>
                        <Text color={Theme.black_C} fontSize={`16px`}>
                          신용카드
                        </Text>
                      </Radio>
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

              {/* ///////////////////////////////////////////////////////////////////////////// */}
              {/* ///////////////////////////////////////////////////////////////////////////// */}
              {/* ////////////////////////////////// 오른쪽 영역 ///////////////////////////////// */}
              {/* ///////////////////////////////////////////////////////////////////////////// */}
              {/* ///////////////////////////////////////////////////////////////////////////// */}

              <Wrapper width={width < 800 ? `100%` : `30%`}>
                <Wrapper
                  padding={`30px 20px`}
                  border={`1px solid ${Theme.lightGrey2_C}`}
                  bgColor={Theme.lightGrey3_C}
                  margin={`0 0 30px`}
                  display={width < 800 ? `none` : `flex`}
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
                    margin={`0 0 12px`}
                  >
                    상품은 잘 받아보셨나요?
                  </Text>
                  <Text
                    fontSize={`16px`}
                    fontWeight={`600`}
                    color={Theme.lightGrey_C}
                    margin={`0 0 40px`}
                  >
                    리뷰 작성하시고 포인트 받아가세요!
                  </Text>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`100%`}
                    height={`54px`}
                  >
                    리뷰 작성하기
                  </CommonButton>
                </Wrapper>
                <Wrapper
                  border={`1px solid ${Theme.lightGrey2_C}`}
                  bgColor={Theme.lightGrey3_C}
                  padding={`30px 20px`}
                >
                  <Wrapper
                    al={`flex-start`}
                    fontSize={`20px`}
                    fontWeight={`600`}
                    borderBottom={`1px solid ${Theme.basicTheme_C}`}
                    margin={`0 0 16px`}
                    padding={`0 0 16px`}
                  >
                    총 2개의 상품
                  </Wrapper>

                  <BoxText>
                    <Text>총 상품금액</Text>
                    <Text fontWeight={`600`}>18,000원</Text>
                  </BoxText>

                  <BoxText>
                    <Text>총 무게</Text>
                    <Text fontWeight={`600`}>240g</Text>
                  </BoxText>
                  <BoxText>
                    <Text>총 배송비</Text>
                    <Text fontWeight={`600`}>6,000원</Text>
                  </BoxText>
                  <BoxText margin={`0 0 13px`}>
                    <Text>총 할인금액</Text>
                    <Text fontWeight={`600`}>4,000원</Text>
                  </BoxText>
                  <SubText>
                    <Text>ㄴ배송 할인금액</Text>
                    <Text>-2,000원</Text>
                  </SubText>
                  <SubText>
                    <Text>ㄴ회원 할인금액(00%)</Text>
                    <Text>-2,000원</Text>
                  </SubText>
                  <SubText>
                    <Text>ㄴ쿠폰 사용</Text>
                    <Text>-0원</Text>
                  </SubText>
                  <SubText margin={`0 0 30px`}>
                    <Text>ㄴ포인트 사용</Text>
                    <Text>-0원</Text>
                  </SubText>
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    borderTop={`1px solid ${Theme.lightGrey2_C}`}
                    padding={`26px 0 0`}
                  >
                    <Text fontSize={`18px`}>총 결제금액</Text>
                    <Text fontSize={`24px`} fontWeight={`bold`}>
                      22,000원
                    </Text>
                  </Wrapper>
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

export default Index;
