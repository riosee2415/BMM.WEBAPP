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
  TextInput,
  CommonButton,
} from "../../components/commonComponents";
import styled from "styled-components";

const SnsBtn = styled(Wrapper)`
  width: 58px;
  height: 58px;
  border: 1px solid ${Theme.lightGrey2_C};
  border-radius: 100%;

  &:hover {
    cursor: pointer;

    background: ${(props) => props.hoverColor};
    border: ${(props) => props.hoverColor};
  }
`;

const FindPw = () => {
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
        <title>BUY ME MIN | 아이디 찾기</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 120px`}>
          <RsWrapper>
            <Wrapper
              width={width < 500 ? `100%` : `450px`}
              padding={width < 500 ? `80px 20px` : `80px 60px`}
            >
              <Text
                fontSize={width < 500 ? `25px` : `36px`}
                fontWeight={`600`}
                margin={`0 0 15px`}
              >
                아이디 찾기
              </Text>
              <Text
                fontSize={width < 500 ? `16px` : `18px`}
                margin={`0 0 40px`}
                color={Theme.darkGrey_C}
              >
                아이디 찾기 결과
              </Text>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 12px`}
              />
              <Wrapper
                dr={`row`}
                ju={`flex-end`}
                color={Theme.grey_C}
                margin={`0 0 30px`}
              >
                <Text isHover td={`underline`}>
                  비밀번호 재설정
                </Text>
              </Wrapper>
              <CommonButton
                fontSize={width < 500 ? `16px` : `18px`}
                fontWeight={`600`}
                kindOf={`white`}
                width={`100%`}
                height={`54px`}
                margin={`0 0 40px`}
              >
                로그인하러가기
              </CommonButton>
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

export default FindPw;
