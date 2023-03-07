import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import {
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
} from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import Popup from "../components/popup/popup";
import Mainslider from "../components/slide/MainSlider";
import MainEventSlider from "../components/slide/MainEventSlider";
import MainNewSlider from "../components/slide/MainNewSlider";
import MainBrandSlider from "../components/slide/MainBrandSlider";

const Home = ({}) => {
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
        <title>BUY ME MINE</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Mainslider />
          <RsWrapper>
            <MainEventSlider />
            <Wrapper dr={`row`} margin={`0 0 100px`} ju={`space-between`}>
              <Wrapper width={`38%`}>
                <MainNewSlider />
              </Wrapper>
              <Wrapper width={`60%`}>
                <MainBrandSlider />
              </Wrapper>
            </Wrapper>

            <Image
              alt="banner"
              margin={`0 0 30px`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_4nd_banner1.png`}
            />
            <Image
              alt="banner"
              margin={`0 0 30px`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_4nd_banner2.png`}
            />

            <Text margin={`60px 0 40px`} fontSize={`36px`} fontWeight={`600`}>
              바이미마인의 추천!
            </Text>
          </RsWrapper>

          <Popup />
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
export default Home;
