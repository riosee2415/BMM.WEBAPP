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
  CustomPage,
  Image,
} from "../../components/commonComponents";
import Link from "next/dist/client/link";

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
        <title>BUY ME MIN | 이벤트</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 0`}>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`flex-start`}>
              <Text
                fontSize={width < 500 ? `20px` : `34px`}
                fontWeight={`600`}
                margin={`0 0 33px`}
              >
                이벤트
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Image
                alt="일본안약 배너"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/event1.png`}
                width={`629px`}
                margin={`0 0 22px`}
                cursor={`pointer`}
                transition={`0.2s`}
              />
              <Image
                alt="가루비과자 배너"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/event2.png`}
                width={`629px`}
                margin={`0 0 22px`}
                cursor={`pointer`}
                transition={`0.2s`}
              />
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Text
                fontSize={width < 500 ? `16px` : `20px`}
                fontWeight={`600`}
                cursor={`pointer`}
                transition={`0.2s`}
              >
                이벤트명이 들어올 곳입니다.
              </Text>
              <Text
                fontSize={width < 500 ? `16px` : `20px`}
                fontWeight={`600`}
                cursor={`pointer`}
                transition={`0.2s`}
              >
                이벤트명이 들어올 곳입니다.
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Text margin={`0 0 60px`}>2022.12.01~2022.12.31</Text>
              <Text margin={`0 0 60px`}>2022.12.01~2022.12.31</Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Image
                alt="일본안약 배너"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/event1.png`}
                width={`629px`}
                margin={`0 0 22px`}
                cursor={`pointer`}
                transition={`0.2s`}
              />
              <Image
                alt="가루비과자 배너"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/event2.png`}
                width={`629px`}
                margin={`0 0 22px`}
                cursor={`pointer`}
                transition={`0.2s`}
              />
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Text
                fontSize={width < 500 ? `16px` : `20px`}
                fontWeight={`600`}
                cursor={`pointer`}
                transition={`0.2s`}
              >
                이벤트명이 들어올 곳입니다.
              </Text>
              <Text
                fontSize={width < 500 ? `16px` : `20px`}
                fontWeight={`600`}
                cursor={`pointer`}
                transition={`0.2s`}
              >
                이벤트명이 들어올 곳입니다.
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`}>
              <Text margin={`0 0 60px`}>2022.12.01~2022.12.31</Text>
              <Text margin={`0 0 60px`}>2022.12.01~2022.12.31</Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Image
                alt="일본안약 배너"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/event1.png`}
                width={`629px`}
                margin={`0 0 22px`}
                cursor={`pointer`}
                transition={`0.2s`}
              />
              <Image
                alt="가루비과자 배너"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/event2.png`}
                width={`629px`}
                margin={`0 0 22px`}
                cursor={`pointer`}
                transition={`0.2s`}
              />
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Text
                fontSize={width < 500 ? `16px` : `20px`}
                fontWeight={`600`}
                cursor={`pointer`}
                transition={`0.2s`}
              >
                이벤트명이 들어올 곳입니다.
              </Text>
              <Text
                fontSize={width < 500 ? `16px` : `20px`}
                fontWeight={`600`}
                cursor={`pointer`}
                transition={`0.2s`}
              >
                이벤트명이 들어올 곳입니다.
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`}>
              <Text margin={`0 0 60px`}>2022.12.01~2022.12.31</Text>
              <Text margin={`0 0 60px`}>2022.12.01~2022.12.31</Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Image
                alt="일본안약 배너"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/event1.png`}
                width={`629px`}
                margin={`0 0 22px`}
                cursor={`pointer`}
                transition={`0.2s`}
              />
              <Image
                alt="가루비과자 배너"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/event2.png`}
                width={`629px`}
                margin={`0 0 22px`}
                cursor={`pointer`}
                transition={`0.2s`}
              />
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Text
                fontSize={width < 500 ? `16px` : `20px`}
                fontWeight={`600`}
                cursor={`pointer`}
                transition={`0.2s`}
              >
                이벤트명이 들어올 곳입니다.
              </Text>
              <Text
                fontSize={width < 500 ? `16px` : `20px`}
                fontWeight={`600`}
                cursor={`pointer`}
                transition={`0.2s`}
              >
                이벤트명이 들어올 곳입니다.
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`}>
              <Text margin={`0 0 60px`}>2022.12.01~2022.12.31</Text>
              <Text margin={`0 0 60px`}>2022.12.01~2022.12.31</Text>
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
