import React from "react";
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
  Image,
  CommonButton,
  SpanText,
  ATag,
} from "../../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../../components/MypageTop";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/dist/client/link";

const List = styled(Wrapper)`
  height: 100px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;
  margin: 0 0 60px;
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

const Circle = styled(Wrapper)`
  width: 15px;
  height: 15px;
  background: ${Theme.white_C};
  border-radius: 100%;
  color: ${Theme.red_C};
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 10px;

  &:hover {
    cursor: pointer;
    background: ${Theme.red_C};
    color: ${Theme.white_C};
  }
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
        <title>BUY ME MINE | 환불 신청내역</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 100px`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 1100 ? `26px` : `30px`}
              fontWeight={`600`}
              margin={`0 0 30px`}
            >
              <Text>환불 신청내역</Text>
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

              </Wrapper>
            </List>
          </>
        )}
            <Wrapper al={`flesx-start`}>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                borderBottom={`1px solid ${Theme.basicTheme_C}`}
              >
                <Text
                  fontSize={width < 1100 ? `20px` : `24px`}
                  fontWeight={`600`}
                  margin={`15px 0 20px`}
                >
                  환불 주문서
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper width={`100%`}>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                padding={`16px 0`}
                borderBottom={`1px solid ${Theme.lightGrey5_C}`}
              >
                <Text
                  width={width < 1100 ? `100%` : `20%`}
                  lineHeight={`46px`}
                  fontSize={`16px`}
                >
                  수령인 이름<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <Wrapper
                  width={width < 1100 ? `100%` : `30%`}
                  height={`46px`}
                  border={`1px solid ${Theme.lightGrey2_C}`}
                  color={Theme.grey_C}
                  bgColor={Theme.lightGrey3_C}
                  padding={`0 13px`}
                  al={`flex-start`}
                >
                  김마인
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                padding={`16px 0`}
              >
                <Text
                  width={width < 1100 ? `100%` : `20%`}
                  lineHeight={`46px`}
                  fontSize={`16px`}
                >
                  이메일<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <Wrapper
                  width={width < 1100 ? `100%` : `30%`}
                  height={`46px`}
                  color={Theme.grey_C}
                  bgColor={Theme.lightGrey3_C}
                  border={`1px solid ${Theme.lightGrey2_C}`}
                  padding={`0 13px`}
                  al={`flex-start`}
                >
                  mine@gmail.com
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                padding={`16px 0`}
              >
                <Text
                  width={width < 1100 ? `100%` : `20%`}
                  lineHeight={`46px`}
                  fontSize={`16px`}
                >
                  연락처<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <Wrapper
                  width={width < 1100 ? `100%` : `30%`}
                  height={`46px`}
                  color={Theme.grey_C}
                  bgColor={Theme.lightGrey3_C}
                  border={`1px solid ${Theme.lightGrey2_C}`}
                  al={`flex-start`}
                  padding={`0 13px`}
                >
                  01000000000
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
                  width={width < 1100 ? `45%` : `20%`}
                  al={`flex-start`}
                  lineHeight={`46px`}
                  fontSize={`16px`}
                >
                  <Text>
                    주소<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                </Wrapper>

                <Wrapper
                  width={width < 1100 ? `100%` : `30%`}
                  al={`flex-start`}
                >
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 10px`}>
                    <Wrapper
                      width={`calc(100% - 120px)`}
                      height={`46px`}
                      color={Theme.grey_C}
                      bgColor={Theme.lightGrey3_C}
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      al={`flex-start`}
                      margin={`0 10px 0 0`}
                      padding={`0 13px`}
                    >
                      43243
                    </Wrapper>

                    <CommonButton
                      width={`110px`}
                      height={`46px`}
                      fontSize={`16px`}
                      fontWeight={`600`}
                    >
                      우편번호
                    </CommonButton>
                  </Wrapper>
                  <Wrapper
                    width={`100%`}
                    height={`46px`}
                    color={Theme.grey_C}
                    bgColor={Theme.lightGrey3_C}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    padding={`0 13px`}
                  >
                    대전광역시 서구 대덕대로 324
                  </Wrapper>

                  <Wrapper
                    width={`100%`}
                    height={`46px`}
                    color={Theme.grey_C}
                    bgColor={Theme.lightGrey3_C}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    al={`flex-start`}
                    padding={`0 13px`}
                  >
                    1043호
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                padding={`16px 0`}
              >
                <Text
                  width={width < 1100 ? `100%` : `20%`}
                  lineHeight={`46px`}
                  fontSize={`16px`}
                >
                  상품 이미지<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <Wrapper
                  width={width < 1100 ? `100%` : `80%`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <Wrapper
                    margin={`0 11px 10px 0`}
                    position={`relative`}
                    width={width < 1100 ? `150px` : `111px`}
                  >
                    <Image
                      height={width < 1100 ? `150px` : `111px`}
                      alt="리뷰 사진"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                    />
                    <Circle>
                      <CloseOutlined />
                    </Circle>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                margin={`0 0 50px`}
                borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                padding={`16px 0`}
              >
                <Text
                  width={width < 1100 ? `100%` : `20%`}
                  lineHeight={`46px`}
                  fontSize={`16px`}
                >
                  환불 사유<SpanText color={Theme.red_C}>*</SpanText>
                </Text>

                <Wrapper
                  width={width < 1100 ? `100%` : `80%`}
                  al={`flex-start`}
                  margin={`0 0 10px`}
                >
                  <Wrapper
                    width={width < 1100 ? `100%` : `385px`}
                    height={`46px`}
                    color={Theme.grey_C}
                    bgColor={Theme.lightGrey3_C}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    padding={`0 13px`}
                  >
                    기타 사유 (직접 입력)
                  </Wrapper>

                  <Wrapper
                    width={width < 1100 ? `100%` : `80%`}
                    height={`46px`}
                    color={Theme.grey_C}
                    bgColor={Theme.lightGrey3_C}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    al={`flex-start`}
                    padding={`0 13px`}
                  >
                    상품의 유통기한이 지났습니다..
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Link href={`/mypage/refond/1`}>
              <ATag>
                <CommonButton
                  fontSize={width < 500 ? `16px` : `18px`}
                  fontWeight={`600`}
                  kindOf={`darkgrey`}
                  width={`240px`}
                  height={`54px`}
                >
                  목록으로
                </CommonButton>
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

export default Index;
