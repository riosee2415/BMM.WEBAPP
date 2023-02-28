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
  Image,
} from "../../components/commonComponents";
import styled from "styled-components";
import { useState } from "react";
import { useCallback } from "react";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const SnsBtn = styled(Wrapper)`
  width: 58px;
  height: 58px;
  border: 1px solid ${Theme.lightGrey2_C};
  border-radius: 100%;

  &:hover {
    cursor: pointer;

    background: ${(props) => props.hoverColor};
    border: ${(props) => props.hoverColor};

    & img {
      display: none;
    }

    & .hoverIcon {
      display: block;
    }
  }

  & .hoverIcon {
    display: none;
  }
`;

const HoverImg = styled(Image)``;

const Login = () => {
  ////// GLOBAL STATE //////

  const [isModal, setIsModal] = useState(false);

  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MIN | 로그인</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 120px`}>
          <RsWrapper>
            <Wrapper
              width={width < 500 ? `100%` : `450px`}
              padding={width < 500 ? `80px 20px` : `80px 60px`}
              border={`1px solid ${Theme.lightGrey3_C}`}
            >
              <Text
                fontSize={width < 500 ? `25px` : `36px`}
                fontWeight={`600`}
                margin={`0 0 15px`}
              >
                로그인
              </Text>
              <Text
                fontSize={width < 500 ? `16px` : `18px`}
                margin={`0 0 40px`}
                color={Theme.darkGrey_C}
              >
                바이미마인에 오신걸 환영합니다!
              </Text>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="text"
                placeholder="아이디"
                margin={`0 0 12px`}
              />
              <TextInput
                width={`100%`}
                height={`46px`}
                type="password"
                margin={`0 0 10px`}
                placeholder="비밀번호"
              />
              <Wrapper
                dr={`row`}
                ju={`flex-end`}
                color={Theme.grey_C}
                margin={`0 0 30px`}
              >
                <Text isHover td={`underline`} margin={`0 16px 0 0`}>
                  아이디 찾기
                </Text>
                <Text isHover td={`underline`}>
                  비번 재설정
                </Text>
              </Wrapper>
              <CommonButton
                fontSize={width < 500 ? `16px` : `18px`}
                fontWeight={`600`}
                width={`100%`}
                height={`54px`}
                margin={`0 0 12px`}
              >
                로그인
              </CommonButton>
              <CommonButton
                fontSize={width < 500 ? `16px` : `18px`}
                fontWeight={`600`}
                kindOf={`white`}
                width={`100%`}
                height={`54px`}
                margin={`0 0 40px`}
              >
                회원가입
              </CommonButton>
              <Text color={Theme.lightGrey_C} margin={`0 0 16px`}>
                SNS 로그인
              </Text>
              <Wrapper dr={`row`}>
                <SnsBtn
                  margin={`0 8px 0 0`}
                  hoverColor={Theme.kakao_C}
                  onClick={modalToggle}
                >
                  <Image
                    alt="kakao icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/login/icon_kakao.png`}
                    width={`26px`}
                  />
                </SnsBtn>
                <SnsBtn hoverColor={Theme.naver_C}>
                  <Image
                    alt="naver icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/login/icon_naver.png`}
                    width={`26px`}
                  />

                  <Image
                    alt="naver icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/login/icon_naver_A.png`}
                    width={`26px`}
                    className={`hoverIcon`}
                  />
                </SnsBtn>
              </Wrapper>
            </Wrapper>
          </RsWrapper>

          <Modal
            onCancel={modalToggle}
            visible={isModal}
            footer={null}
            closable={null}
            width={`570px`}
          >
            <Wrapper padding={width < 900 ? `0` : `20px`}>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 18px`}
              >
                <Text
                  fontSize={width < 900 ? `20px` : `24px`}
                  fontWeight={`600`}
                >
                  가입 완료
                </Text>
                <Text
                  color={Theme.grey_C}
                  isHover
                  fontSize={`20px`}
                  onClick={modalToggle}
                >
                  <CloseOutlined />
                </Text>
              </Wrapper>
              <Wrapper>
                <Text
                  fontSize={width < 900 ? `16px` : `18px`}
                  margin={`50px 0`}
                >
                  일반 계정으로 가입을 완료하셨습니다.
                </Text>

                <CommonButton
                  fontSize={width < 500 ? `16px` : `18px`}
                  fontWeight={`600`}
                  kindOf={`white`}
                  width={`240px`}
                  height={`54px`}
                  onClick={modalToggle}
                >
                  쇼핑 계속하기
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Modal>
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

export default Login;
