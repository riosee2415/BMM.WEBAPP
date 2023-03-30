import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import {
  FIND_PASS_REQUEST,
  LOAD_MY_INFO_REQUEST,
  PASS_UPDATE_REQUEST,
  SECRET_CODE_REQUEST,
} from "../../reducers/user";
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
  ATag,
} from "../../components/commonComponents";
import styled from "styled-components";
import Link from "next/dist/client/link";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { message } from "antd";
import { useRouter } from "next/router";

const FindPw = () => {
  ////// GLOBAL STATE //////
  const {
    st_findPassDone,
    st_findPassError,
    //
    st_secretCodeDone,
    st_secretCodeError,
    //
    st_passUpdateDone,
    st_passUpdateError,
  } = useSelector((state) => state.user);

  const [currentTab, setCurrentTab] = useState(0);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const username = useInput("");
  const userId = useInput("");
  const email = useInput("");
  const secret = useInput("");
  const password = useInput("");
  const pwCheckInput = useInput(``);

  ////// REDUX //////
  ////// USEEFFECT //////
  ////////////// 인증코드 전송 후처리 //////////////
  useEffect(() => {
    if (st_findPassDone) {
      setCurrentTab(1);

      return message.success("입력하신 이메일로 인증코드가 전송되었습니다.");
    }
  }, [st_findPassDone]);

  useEffect(() => {
    if (st_findPassError) {
      return message.error(st_findPassError);
    }
  }, [st_findPassError]);

  ////////////// 인증코드 확인 후처리 //////////////
  useEffect(() => {
    if (st_secretCodeDone) {
      secret.setValue("");

      setCurrentTab(2);

      return message.success("인증코드가 획인이 되었습니다.");
    }
  }, [st_secretCodeDone]);

  useEffect(() => {
    if (st_secretCodeError) {
      return message.error(st_secretCodeError);
    }
  }, [st_secretCodeError]);

  ////////////// 비밀번호 변경 후처리 //////////////
  useEffect(() => {
    if (st_passUpdateDone) {
      username.setValue("");
      userId.setValue("");
      password.setValue("");

      movelinkHandler(`/`);

      return message.success("비밀번호가 변경되었습니다.");
    }
  }, [st_passUpdateDone]);

  useEffect(() => {
    if (st_passUpdateError) {
      return message.error(st_passUpdateError);
    }
  }, [st_passUpdateError]);
  ////// TOGGLE //////
  ////// HANDLER //////
  const movelinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const findPassHandler = useCallback(() => {
    if (!username.value || username.value.trim() === "") {
      return message.error("이름을 입력해주세요.");
    }
    if (!userId.value || userId.value.trim() === "") {
      return message.error("아이디를 입력해주세요.");
    }
    if (!email.value || email.value.trim() === "") {
      return message.error("이메일을 입력해주세요.");
    }

    dispatch({
      type: FIND_PASS_REQUEST,
      data: {
        username: username.value,
        userId: userId.value,
        email: email.value,
      },
    });
  }, [username.value, userId.value, email.value]);

  const checkSecretCodeHandler = useCallback(() => {
    if (!secret.value || secret.value.trim() === "") {
      return message.error("인증코드를 입력해주세요.");
    }

    dispatch({
      type: SECRET_CODE_REQUEST,
      data: { secret: secret.value },
    });
  }, [secret.value]);

  const changePasswordHandler = useCallback(() => {
    if (!password.value || password.value.trim() === "") {
      return message.error("비밀번호를 입력해주세요.");
    }

    if (!pwCheckInput.value || pwCheckInput.value.trim() === "") {
      message.error("비밀번호 재확인을 입력해주세요.");
      return;
    }

    if (password.value !== pwCheckInput.value) {
      message.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    dispatch({
      type: PASS_UPDATE_REQUEST,
      data: {
        username: username.value,
        userId: userId.value,
        password: password.value,
      },
    });
  }, [username.value, userId.value, password.value, pwCheckInput.value]);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 비밀번호 찾기</title>
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
                비밀번호 재설정
              </Text>
              <Text
                fontSize={width < 500 ? `16px` : `18px`}
                margin={`0 0 40px`}
                color={Theme.darkGrey_C}
              >
                개인정보를 입력해주세요.
              </Text>
              {currentTab === 0 && (
                <>
                  <TextInput
                    width={`100%`}
                    height={`46px`}
                    type="text"
                    placeholder="이름"
                    margin={`0 0 12px`}
                    {...username}
                  />
                  <TextInput
                    width={`100%`}
                    height={`46px`}
                    type="text"
                    margin={`0 0 10px`}
                    placeholder="아이디"
                    {...userId}
                  />
                  <TextInput
                    width={`100%`}
                    height={`46px`}
                    type="email"
                    margin={`0 0 10px`}
                    placeholder="이메일"
                    {...email}
                    onKeyDown={(e) => e.keyCode === 13 && findPassHandler()}
                  />
                  <Wrapper
                    dr={`row`}
                    ju={`flex-end`}
                    color={Theme.grey_C}
                    margin={`0 0 30px`}
                  >
                    <Link href={`/user/findid`}>
                      <a>
                        <Text isHover td={`underline`}>
                          아이디 찾기
                        </Text>
                      </a>
                    </Link>
                  </Wrapper>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`100%`}
                    height={`54px`}
                    margin={`0 0 40px`}
                    onClick={findPassHandler}
                  >
                    인증코드 전송
                  </CommonButton>
                </>
              )}
              {currentTab === 1 && (
                <>
                  <Text
                    fontSize={width < 500 ? `16px` : `18px`}
                    margin={`0 0 40px`}
                    color={Theme.darkGrey_C}
                  >
                    이메일로 발송된 인증코드를 입력해주세요.
                  </Text>
                  <TextInput
                    width={`100%`}
                    height={`46px`}
                    type="text"
                    placeholder="인증코드"
                    margin={`0 0 12px`}
                    {...secret}
                    onKeyDown={(e) =>
                      e.keyCode === 13 && checkSecretCodeHandler()
                    }
                  />
                  <Wrapper
                    dr={`row`}
                    ju={`flex-end`}
                    color={Theme.grey_C}
                    margin={`0 0 30px`}
                  >
                    <Link href={`/user/findid`}>
                      <a>
                        <Text isHover td={`underline`}>
                          아이디 찾기
                        </Text>
                      </a>
                    </Link>
                  </Wrapper>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`100%`}
                    height={`54px`}
                    margin={`0 0 40px`}
                    onClick={checkSecretCodeHandler}
                  >
                    인증코드 제출
                  </CommonButton>
                </>
              )}
              {currentTab === 2 && (
                <>
                  <Text
                    fontSize={width < 500 ? `16px` : `18px`}
                    margin={`0 0 40px`}
                    color={Theme.darkGrey_C}
                  >
                    비밀번호를 재설정 해주세요.
                  </Text>
                  <TextInput
                    width={`100%`}
                    height={`46px`}
                    type="password"
                    placeholder="비밀번호"
                    margin={`0 0 12px`}
                    {...password}
                    onKeyDown={(e) =>
                      e.keyCode === 13 && changePasswordHandler()
                    }
                  />
                  <TextInput
                    width={`100%`}
                    height={`46px`}
                    type="password"
                    placeholder="비밀번호 재확인"
                    margin={`0 0 12px`}
                    onKeyDown={(e) =>
                      e.keyCode === 13 && changePasswordHandler()
                    }
                    {...pwCheckInput}
                  />
                  <Wrapper
                    dr={`row`}
                    ju={`flex-end`}
                    color={Theme.grey_C}
                    margin={`0 0 30px`}
                  >
                    <Link href={`/user/findid`}>
                      <a>
                        <Text isHover td={`underline`}>
                          아이디 찾기
                        </Text>
                      </a>
                    </Link>
                  </Wrapper>

                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`100%`}
                    height={`54px`}
                    margin={`0 0 40px`}
                    onClick={changePasswordHandler}
                  >
                    비밀번호 재설정
                  </CommonButton>
                </>
              )}
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
