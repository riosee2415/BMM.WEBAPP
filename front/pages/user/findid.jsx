import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import {
  FIND_ID_CODE_REQUEST,
  FIND_ID_REQUEST,
  LOAD_MY_INFO_REQUEST,
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
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

const FindId = () => {
  ////// GLOBAL STATE //////
  const {
    st_findIdDone,
    st_findIdError,
    st_findIdCodeDone,
    st_findIdCodeError,
    resultId,
  } = useSelector((state) => state.user);

  const [currentTab, setCurrentTab] = useState(0);

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();

  const username = useInput(``);
  const email = useInput(``);
  const secret = useInput(``);

  ////// REDUX //////
  ////// USEEFFECT //////
  ////////////// 인증코드 전송 후처리 //////////////
  useEffect(() => {
    if (st_findIdDone) {
      setCurrentTab(1);

      return message.success("입력하신 이메일로 인증코드가 전송되었습니다.");
    }
  }, [st_findIdDone]);

  useEffect(() => {
    if (st_findIdError) {
      return message.error(st_findIdError);
    }
  }, [st_findIdError]);

  ////////////// 인증코드 확인 후처리 //////////////
  useEffect(() => {
    if (st_findIdCodeDone) {
      secret.setValue("");

      setCurrentTab(2);

      return message.success("인증코드가 획인이 되었습니다.");
    }
  }, [st_findIdCodeDone]);

  useEffect(() => {
    if (st_findIdCodeError) {
      return message.error(st_findIdCodeError);
    }
  }, [st_findIdCodeError]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const findIdHandler = useCallback(() => {
    if (!username.value || username.value.trim() === "") {
      return message.error("이름을 입력해주세요.");
    }
    if (!email.value || email.value.trim() === "") {
      return message.error("이메일을 입력해주세요.");
    }

    dispatch({
      type: FIND_ID_REQUEST,
      data: {
        username: username.value,
        email: email.value,
      },
    });
  }, [username.value, email.value]);

  const checkSecretCodeHandler = useCallback(() => {
    if (!secret.value || secret.value.trim() === "") {
      return message.error("인증코드를 입력해주세요.");
    }

    dispatch({
      type: FIND_ID_CODE_REQUEST,
      data: { secret: secret.value },
    });
  }, [secret.value]);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 아이디 찾기</title>
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
                아이디 찾기
              </Text>
              {currentTab === 0 && (
                <>
                  <Text
                    fontSize={width < 500 ? `16px` : `18px`}
                    margin={`0 0 40px`}
                    color={Theme.darkGrey_C}
                  >
                    개인정보를 입력해주세요.
                  </Text>
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
                    type="email"
                    margin={`0 0 10px`}
                    placeholder="이메일"
                    onKeyDown={(e) => e.keyCode === 13 && findIdHandler()}
                    {...email}
                  />
                  <Wrapper
                    dr={`row`}
                    ju={`flex-end`}
                    color={Theme.grey_C}
                    margin={`0 0 30px`}
                  >
                    <Link href={`/user/findpw`}>
                      <a>
                        <Text isHover td={`underline`}>
                          비밀번호 재설정
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
                    onClick={() => findIdHandler()}
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
                    onKeyDown={(e) =>
                      e.keyCode === 13 && checkSecretCodeHandler()
                    }
                    {...secret}
                  />
                  <Wrapper
                    dr={`row`}
                    ju={`flex-end`}
                    color={Theme.grey_C}
                    margin={`0 0 30px`}
                  >
                    <Link href={`/user/findpw`}>
                      <a>
                        <Text isHover td={`underline`}>
                          비밀번호 재설정
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
                    onClick={() => checkSecretCodeHandler()}
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
                    아이디 찾기 결과
                  </Text>
                  <TextInput
                    width={`100%`}
                    height={`46px`}
                    type="text"
                    margin={`0 0 12px`}
                    readOnly
                    value={
                      resultId.length > 3
                        ? resultId.replace(/.{3}$/g, "***")
                        : resultId.replace(/.{1}$/g, "*")
                    }
                  />
                  <Wrapper
                    dr={`row`}
                    ju={`flex-end`}
                    color={Theme.grey_C}
                    margin={`0 0 30px`}
                  >
                    <Link href={`/user/findpw`}>
                      <a>
                        <Text isHover td={`underline`}>
                          비밀번호 재설정
                        </Text>
                      </a>
                    </Link>
                  </Wrapper>
                  <Link href={`/user/login`}>
                    <ATag>
                      <CommonButton
                        fontSize={width < 500 ? `16px` : `18px`}
                        fontWeight={`600`}
                        kindOf={`white`}
                        width={`100%`}
                        height={`54px`}
                      >
                        로그인하러가기
                      </CommonButton>
                    </ATag>
                  </Link>
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

export default FindId;
