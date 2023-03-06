import React from "react";
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
} from "../../components/commonComponents";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";

const DetailText = styled.p`
  color: ${Theme.grey_C};
  font-size: 16px;

  &:hover {
    cursor: pointer;
    color: ${Theme.darkGrey_C};
  }

  @media (max-width: 700px) {
    font-size: 14px;
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
        <title>BUY ME MINE | 마이페이지</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 100px`}>
          <RsWrapper>
            <Wrapper>
              <Text fontSize={width < 700 ? `32px` : `42px`} fontWeight={`600`}>
                마이페이지
              </Text>
              <Text
                fontSize={width < 700 ? `16px` : `18px`}
                margin={`0 0 30px`}
              >
                000 회원님 환영합니다!
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              borderTop={`1px solid ${Theme.lightGrey2_C}`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              margin={`0 0 60px`}
            >
              <Wrapper
                width={`25%`}
                height={`129px`}
                bgColor={Theme.lightGrey3_C}
              >
                <Text
                  fontSize={width < 700 ? `20px` : `28px`}
                  fontWeight={`bold`}
                  color={Theme.grey_C}
                >
                  등급명
                </Text>
                <Text>회원 등급</Text>
              </Wrapper>
              <Wrapper
                width={`25%`}
                height={`129px`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Text
                  fontSize={width < 700 ? `20px` : `28px`}
                  fontWeight={`bold`}
                >
                  10,000
                </Text>
                <Text>포인트</Text>
              </Wrapper>

              <Wrapper
                width={`25%`}
                height={`129px`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Text
                  fontSize={width < 700 ? `20px` : `28px`}
                  fontWeight={`bold`}
                >
                  3
                </Text>
                <Text>찜목록</Text>
              </Wrapper>
              <Wrapper width={`25%`} height={`129px`}>
                <Text
                  fontSize={width < 700 ? `20px` : `28px`}
                  fontWeight={`bold`}
                >
                  6
                </Text>
                <Text>나의 주문 내역</Text>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={width < 700 ? `100%` : `45%`}>
                <Wrapper
                  al={`flex-start`}
                  fontSize={width < 700 ? `18px` : `20px`}
                  fontWeight={`bold`}
                  margin={`0 0 20px`}
                >
                  <Text>쇼핑 정보</Text>
                </Wrapper>
                <Wrapper
                  height={`210px`}
                  al={`flex-start`}
                  bgColor={Theme.lightGrey3_C}
                  padding={`0 20px`}
                  position={`relative`}
                  margin={`0 0 20px`}
                >
                  <DetailText>주문 / 배송 조회</DetailText>
                  <Wrapper
                    width={`auto`}
                    fontSize={width < 700 ? `14px` : `16px`}
                    position={`absolute`}
                    right={`16px`}
                    top={width < 700 ? `35px` : `25px`}
                    color={Theme.grey_C}
                  >
                    <RightOutlined />
                  </Wrapper>
                  <DetailText>취소 / 환불 내역</DetailText>
                  <Wrapper
                    width={`auto`}
                    fontSize={width < 700 ? `14px` : `16px`}
                    position={`absolute`}
                    right={`16px`}
                    top={width < 700 ? `70px` : `65px`}
                    color={Theme.grey_C}
                  >
                    <RightOutlined />
                  </Wrapper>
                  <DetailText>쿠폰 목록</DetailText>
                  <Wrapper
                    width={`auto`}
                    fontSize={width < 700 ? `14px` : `16px`}
                    position={`absolute`}
                    right={`16px`}
                    top={width < 700 ? `105px` : `105px`}
                    color={Theme.grey_C}
                  >
                    <RightOutlined />
                  </Wrapper>
                  <DetailText>포인트 내역</DetailText>
                  <Wrapper
                    width={`auto`}
                    fontSize={width < 700 ? `14px` : `16px`}
                    position={`absolute`}
                    right={`16px`}
                    top={width < 700 ? `143px` : `145px`}
                    color={Theme.grey_C}
                  >
                    <RightOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper width={width < 700 ? `100%` : `45%`}>
                <Wrapper
                  al={`flex-start`}
                  fontSize={width < 700 ? `18px` : `20px`}
                  fontWeight={`bold`}
                  margin={`0 0 20px`}
                >
                  <Text>회원 정보</Text>
                </Wrapper>
                <Wrapper
                  height={`210px`}
                  al={`flex-start`}
                  bgColor={Theme.lightGrey3_C}
                  padding={`0 20px`}
                  position={`relative`}
                  margin={`0 0 20px`}
                >
                  <DetailText>상품 요청 내역</DetailText>
                  <Wrapper
                    width={`auto`}
                    fontSize={width < 700 ? `14px` : `16px`}
                    position={`absolute`}
                    right={`16px`}
                    top={width < 700 ? `35px` : `25px`}
                    color={Theme.grey_C}
                  >
                    <RightOutlined />
                  </Wrapper>
                  <DetailText>1:1 문의 내역</DetailText>
                  <Wrapper
                    width={`auto`}
                    fontSize={width < 700 ? `14px` : `16px`}
                    position={`absolute`}
                    right={`16px`}
                    top={width < 700 ? `70px` : `65px`}
                    color={Theme.grey_C}
                  >
                    <RightOutlined />
                  </Wrapper>
                  <DetailText>나의 리뷰 내역</DetailText>
                  <Wrapper
                    width={`auto`}
                    fontSize={width < 700 ? `14px` : `16px`}
                    position={`absolute`}
                    right={`16px`}
                    top={width < 700 ? `105px` : `105px`}
                    color={Theme.grey_C}
                  >
                    <RightOutlined />
                  </Wrapper>
                  <DetailText>회원정보수정</DetailText>
                  <Wrapper
                    width={`auto`}
                    fontSize={width < 700 ? `14px` : `16px`}
                    position={`absolute`}
                    right={`16px`}
                    top={width < 700 ? `143px` : `145px`}
                    color={Theme.grey_C}
                  >
                    <RightOutlined />
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
