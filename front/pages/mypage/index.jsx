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
import MypageTop from "../../components/MypageTop";

const DetailText = styled(Wrapper)`
  color: ${Theme.grey_C};
  font-size: 16px;
  height: 45px;
  flex-direction: row;
  justify-content: space-between;

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
            <MypageTop />
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={width < 700 ? `100%` : `48%`}>
                <Wrapper
                  al={`flex-start`}
                  fontSize={width < 700 ? `18px` : `20px`}
                  fontWeight={`bold`}
                  margin={`0 0 20px`}
                >
                  <Text>쇼핑 정보</Text>
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  bgColor={Theme.lightGrey3_C}
                  padding={width < 700 ? `15px` : `15px 36px`}
                  position={`relative`}
                  margin={width < 700 && `0 0 20px`}
                  radius={`3px`}
                >
                  <DetailText>
                    <Text>주문 / 배송 조회</Text>
                    <RightOutlined />
                  </DetailText>
                  <DetailText>
                    <Text>취소 / 환불 내역</Text>
                    <RightOutlined />
                  </DetailText>
                  <DetailText>
                    <Text>쿠폰 목록</Text>
                    <RightOutlined />
                  </DetailText>
                  <DetailText>
                    <Text>포인트 내역</Text>
                    <RightOutlined />
                  </DetailText>
                </Wrapper>
              </Wrapper>
              <Wrapper width={width < 700 ? `100%` : `48%`}>
                <Wrapper
                  al={`flex-start`}
                  fontSize={width < 700 ? `18px` : `20px`}
                  fontWeight={`bold`}
                  margin={`0 0 20px`}
                >
                  <Text>회원 정보</Text>
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  bgColor={Theme.lightGrey3_C}
                  padding={width < 700 ? `15px` : `15px 36px`}
                  position={`relative`}
                  radius={`3px`}
                >
                  <DetailText>
                    <Text>상품 요청 내역</Text>
                    <RightOutlined />
                  </DetailText>
                  <DetailText>
                    <Text>1:1 문의 내역</Text>
                    <RightOutlined />
                  </DetailText>
                  <DetailText>
                    <Text>나의 리뷰 내역</Text>
                    <RightOutlined />
                  </DetailText>
                  <DetailText>
                    <Text>회원정보수정</Text>
                    <RightOutlined />
                  </DetailText>
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
