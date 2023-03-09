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
} from "../../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../../components/MypageTop";
import Link from "next/dist/client/link";

const List = styled(Wrapper)`
  height: 100px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;
  margin: 0 0 60px;
`;

const RefondBtn = styled(Wrapper)`
  width: 70%;
  border: 1px solid ${Theme.lightGrey2_C};
  border-radius: 10%;
  background-color: ${Theme.lightGrey3_C};

  cursor: pointer;

  &:hover {
    transition: 0.2s;
    background-color: ${Theme.lightGrey_C};
  }
`;

const ReviewBtn = styled(Wrapper)`
  width: 70%;
  border: 1px solid ${Theme.basicTheme_C};
  border-radius: 10%;
  background-color: ${Theme.basicTheme_C};
  margin: 0 0 5px;

  cursor: pointer;

  &:hover {
    transition: 0.2s;
    background-color: ${Theme.white_C};
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
              <Wrapper width={`10%`} al={`flex-end`}>
                <Wrapper fontSize={`16px`} fontWeight={`600`}>
                  배송완료
                </Wrapper>
                <Wrapper>
                  <ReviewBtn>리뷰 작성</ReviewBtn>
                </Wrapper>
                <Wrapper>
                  <RefondBtn>환불신청</RefondBtn>
                </Wrapper>
              </Wrapper>
            </List>
            <Wrapper width={`70%`} al={`flex-start`}>
              <Wrapper>
                <Text width={`15%`} fontSize={`24px`} fontWeight={`600`}>
                  수령인 정보입력
                </Text>
                <Wrapper
                  width={`20%`}
                  dr={`row`}
                  ju={`flex-start`}
                  border={`2px solid ${Theme.basicTheme_C}`}
                >
                  <Text fontSize={`16px`}>우체국 택배</Text>
                  <Text fontSize={`16px`} fontWeight={`600`}>
                    110-0848-01545468
                  </Text>
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
