import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import Head from "next/head";
import Link from "next/dist/client/link";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST, LOGIN_REQUEST } from "../../reducers/user";
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
import { message, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

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

const ShoppingBtn = styled(Wrapper)`
  width: 230px;
  height: 54px;
  font-size: 18px;
  font-weight: 600;
  background-color: ${Theme.white_C};
  border: 1px solid ${Theme.lightGrey2_C};

  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.lightGrey2_C};
    color: ${(props) => props.theme.black_C};
  }

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const HoverImg = styled(Image)``;

const Login = () => {
  ////// GLOBAL STATE //////
  const { st_loginDone, st_loginError } = useSelector((state) => state.user);

  ////// HOOKS //////

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const [isModal_2, setIsModal_2] = useState(false);

  const userId = useInput("");
  const password = useInput("");
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (st_loginDone) {
      router.push(`/`);
      return message.success({
        content: "로그인되었습니다.",
        style: {
          marginTop: "200px",
        },
      });
    }

    if (st_loginError) {
      return message.error({
        content: st_loginError,
        style: {
          marginTop: "200px",
        },
      });
    }
  }, [st_loginDone, st_loginError]);

  ////// TOGGLE //////
  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const modalToggle_2 = useCallback(() => {
    setIsModal_2((prev) => !prev);
  }, [isModal_2]);
  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const loginHandler = useCallback(() => {
    if (!userId.value) {
      return message.error({
        content: "이메일을 입력해주세요.",
        style: {
          marginTop: "200px",
        },
      });
    }
    if (!password.value) {
      return message.error({
        content: "비밀번호를 입력해주세요.",
        style: {
          marginTop: "200px",
        },
      });
    }
    dispatch({
      type: LOGIN_REQUEST,
      data: {
        email: userId.value,
        password: password.value,
      },
    });
  }, [userId.value, password.value]);

  const onSubmitHandler = useCallback(
    (e) => {
      if (e.key === "Enter") {
        loginHandler();
      }
    },
    [userId, password]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 로그인</title>
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
                onKeyPress={onSubmitHandler}
                {...userId}
              />
              <TextInput
                width={`100%`}
                height={`46px`}
                type="password"
                margin={`0 0 10px`}
                placeholder="비밀번호"
                onKeyPress={onSubmitHandler}
                {...password}
              />
              <Wrapper
                dr={`row`}
                ju={`flex-end`}
                color={Theme.grey_C}
                margin={`0 0 30px`}
              >
                <Link href={`/user/findId`}>
                  <a>
                    <Text isHover td={`underline`} margin={`0 16px 0 0`}>
                      아이디 찾기
                    </Text>
                  </a>
                </Link>
                <Link href={`/user/findPw`}>
                  <a>
                    <Text isHover td={`underline`}>
                      비번 재설정
                    </Text>
                  </a>
                </Link>
              </Wrapper>
              <CommonButton
                fontSize={width < 500 ? `16px` : `18px`}
                fontWeight={`600`}
                width={`100%`}
                height={`54px`}
                margin={`0 0 12px`}
                onClick={loginHandler}
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
                <SnsBtn hoverColor={Theme.naver_C} onClick={modalToggle_2}>
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

          <Modal
            onCancel={modalToggle_2}
            visible={isModal_2}
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
                  onClick={modalToggle_2}
                >
                  <CloseOutlined />
                </Text>
              </Wrapper>
              <Wrapper>
                <Wrapper margin={`50px 0 50px`}>
                  <Text fontSize={width < 900 ? `16px` : `18px`}>
                    일반 계정으로 가입을 완료하셨습니다.
                  </Text>
                  <Text fontSize={width < 900 ? `16px` : `18px`}>
                    기본 정보 추가 기입은 회원정보수정을 이용해주세요.
                  </Text>
                  <Text color={Theme.grey_C}>
                    ※ 기본 정보 : 연락처, 이메일, 배송지
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <ShoppingBtn onClick={modalToggle_2}>
                    쇼핑 계속하기
                  </ShoppingBtn>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`230px`}
                    height={`54px`}
                    onClick={modalToggle_2}
                  >
                    회원정보수정
                  </CommonButton>
                </Wrapper>
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
