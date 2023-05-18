import React, { useEffect } from "react";
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
  ATag,
} from "../../components/commonComponents";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/dist/client/link";
import MypageTop from "../../components/MypageTop";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useRouter } from "next/router";

const DetailText = styled(Wrapper)`
  color: ${Theme.grey_C};
  font-size: 16px;
  height: 45px;

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
  const { me } = useSelector((state) => state.user);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      router.push("/user/login");
      return message.error("로그인 후 이용해주세요.");
    }
  }, [me]);
  ////// TOGGLE //////

  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 마이페이지</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 100px` : `95px 0 100px`}>
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
                  height={`210px`}
                  al={`flex-start`}
                  bgColor={Theme.lightGrey3_C}
                  padding={`15px 36px`}
                  position={`relative`}
                  margin={`0 0 20px`}
                  radius={`3px`}
                >
                  <Link href={`/mypage/ordercheck`}>
                    <ATag>
                      <DetailText dr={`row`} ju={`space-between`}>
                        <Text>주문 / 배송 조회</Text>
                        <RightOutlined />
                      </DetailText>
                    </ATag>
                  </Link>
                  <Link href={`/mypage/refond/refondlist`}>
                    <ATag>
                      <DetailText dr={`row`} ju={`space-between`}>
                        <Text>취소 / 환불 내역</Text>
                        <RightOutlined />
                      </DetailText>
                    </ATag>
                  </Link>
                  <Link href={`/mypage/coupon`}>
                    <ATag>
                      <DetailText dr={`row`} ju={`space-between`}>
                        <Text>쿠폰 목록</Text>
                        <RightOutlined />
                      </DetailText>
                    </ATag>
                  </Link>
                  <Link href={`/mypage/point`}>
                    <ATag>
                      <DetailText dr={`row`} ju={`space-between`}>
                        <Text>포인트 내역</Text>
                        <RightOutlined />
                      </DetailText>
                    </ATag>
                  </Link>
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
                  height={`210px`}
                  al={`flex-start`}
                  bgColor={Theme.lightGrey3_C}
                  padding={`15px 36px`}
                  position={`relative`}
                  margin={`0 0 20px`}
                  radius={`3px`}
                >
                  <Link href={`/mypage/request`}>
                    <ATag>
                      <DetailText dr={`row`} ju={`space-between`}>
                        <Text>상품 요청 내역</Text>
                        <RightOutlined />
                      </DetailText>
                    </ATag>
                  </Link>
                  <Link href={`/mypage/question`}>
                    <ATag>
                      <DetailText dr={`row`} ju={`space-between`}>
                        <Text>1:1 문의 내역</Text>
                        <RightOutlined />
                      </DetailText>
                    </ATag>
                  </Link>
                  <Link href={`/mypage/review`}>
                    <ATag>
                      <DetailText dr={`row`} ju={`space-between`}>
                        <Text>나의 리뷰 내역</Text>
                        <RightOutlined />
                      </DetailText>
                    </ATag>
                  </Link>
                  <Link href={`/mypage/membermodify`}>
                    <ATag>
                      <DetailText dr={`row`} ju={`space-between`}>
                        <Text>회원정보수정</Text>
                        <RightOutlined />
                      </DetailText>
                    </ATag>
                  </Link>
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
