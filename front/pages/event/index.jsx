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
import styled from "styled-components";

const List = styled(Wrapper)`
  width: 49%;
  margin: 0 0 60px;
  align-items: flex-start;

  &:hover {
    cursor: pointer;

    & img {
      box-shadow: 3px 3px 10px ${Theme.lightGrey_C};
    }
  }

  @media (max-width: 700px) {
    width: 100%;
    margin: 0 0 30px;
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
        <title>BUY ME MINE | 이벤트</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 0`}>
          <RsWrapper>
            <Wrapper al={`flex-start`}>
              <Text
                fontSize={width < 500 ? `20px` : `34px`}
                fontWeight={`600`}
                margin={`0 0 30px`}
              >
                이벤트
              </Text>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`} al={`flex-start`}>
              <List>
                <Image
                  alt="thumbnail"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/event1.png`}
                />
                <Text
                  width={`100%`}
                  isEllipsis
                  margin={`22px 0 5px`}
                  fontSize={width < 700 ? `16px` : `20px`}
                >
                  이벤트명이 들어올 곳입니다.
                </Text>
                <Text color={Theme.grey_C}>2022.12.01~2022.12.31</Text>
              </List>
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
