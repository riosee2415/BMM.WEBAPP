import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";
import { Checkbox } from "antd";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
  CommonButton,
} from "../../components/commonComponents";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";

const PostBtn = styled.button`
  width: 35%;
  height: 46px;
  margin: 10px 0;

  background-color: #f9f9fb;
  color: #b5b5b5;
  border: none;

  font-size: 16px;
  font-weight: bold;

  cursor: pointer;
`;

const SignupLabel = styled.label`
  width: 100%;
  margin-bottom: 10px;
`;

const LabelSpan = styled.span`
  color: #FF3939;
`;

const CheckSpan = styled.span`
  font-size: {width < 500 ? "16px" : "18px"};
  font-weight: bold;
  margin-left: 8px;
`;

const CheckLabel = styled.label`
  width: 100%;
  margin-bottom: 16px;
`;

const SignUp = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  // const dispatch = useDispatch();

  // const email = useInput(``);
  // const nickname = useInput(``);

  // const password = useInput(``);

  // const [passwordCheck, setPasswordCheck] = useState(``);
  // const [passwordError, setPasswordError] = useState(false);

  const width = useWidth();

  ////// REDUX //////
  // const { st_signUpLoading, st_signUpDone } = useSelector(
  //   (state) => state.user
  // );
  ////// USEEFFECT //////
  // useEffect(() => {
  //   if (st_signUpDone) {
  //     alert("회원가입 성공!");
  //     Router.replace("/");
  //   }
  // }, [st_signUpDone]);
  ////// TOGGLE //////
  ////// HANDLER //////\

  // const checkPasswordChangeHandler = useCallback(
  //   (e) => {
  //     setPasswordCheck(e.target.value);
  //     setPasswordError(e.target.value !== password.value);
  //   },
  //   [password.value]
  // );

  // const onSubmit = useCallback(() => {
  //   if (password.value !== passwordCheck) {
  //     alert("비밀번호 확인!");
  //     return setPasswordError(true);
  //   }

  //   dispatch({
  //     type: SIGNUP_REQUEST,
  //     data: {
  //       email: email.value,
  //       password: password.value,
  //       nickname: nickname.value,
  //     },
  //   });
  // }, [email, nickname, password, passwordCheck]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MIN | 회원가입</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 120px`}>
          <RsWrapper>
            <Wrapper
              width={width < 500 ? `100%` : `450px`}
              padding={width < 500 ? `80px 20px` : `80px 60px`}
              dr={`coloumn`}
              ju={`flex-start`}
            >
              <Text
                fontSize={width < 500 ? `25px` : `36px`}
                fontWeight={`600`}
                margin={`0 0 15px`}
              >
                회원가입
              </Text>
              <Text
                fontSize={width < 500 ? `16px` : `18px`}
                margin={`0 0 50px`}
                color={Theme.darkGrey_C}
              >
                바이미마인의 회원 혜택을 누려보세요!
              </Text>
              <Text
                width={`100%`}
                fontSize={width < 500 ? `18px` : `20px`}
                fontWeight={`600`}
                color={Theme.lightGrey_C}
                margin={`0 0 20px`}
              >
                개인정보
              </Text>

              <SignupLabel>아이디 <LabelSpan>*</LabelSpan></SignupLabel>

              <TextInput
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 20px`}
                placeholder="아이디"
              />
              <SignupLabel>비밀번호 <LabelSpan>*</LabelSpan></SignupLabel>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="password"
                margin={`0 0 20px`}
                required
                placeholder="비밀번호"
              />
              <SignupLabel>비밀번호 재확인 <LabelSpan>*</LabelSpan></SignupLabel>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="password"
                margin={`0 0 20px`}
                placeholder="비밀번호 재확인"
              />
              <SignupLabel>연락처</SignupLabel>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 20px`}
                placeholder="연락처"
              />
              <SignupLabel>이메일 <LabelSpan>*</LabelSpan></SignupLabel>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="email"
                margin={`0 0 20px`}
                placeholder="이메일"
              />
              <Wrapper dr="row" ju={`space-between`}>
                <label>주소</label>
                <Text color={Theme.red_C} ju={`flex-end`}>
                  *주문시 배송지로 쓰일 주소입니다.
                </Text>
              </Wrapper>
              <Wrapper dr="row" ju={`space-between`}>
                <TextInput
                  width={`60%`}
                  height={`46px`}
                  type="post"
                  placeholder="우편번호"
                />
                <PostBtn type="dashed">우편번호</PostBtn>
              </Wrapper>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 10px`}
                placeholder="기본주소"
              />
              <TextInput
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 30px`}
                placeholder="상세주소를 입력해주세요."
              />
              <Wrapper>
                <Text
                  width={`100%`}
                  fontSize={width < 500 ? `18px` : `20px`}
                  fontWeight={`600`}
                  color={Theme.lightGrey_C}
                  margin={`0 0 20px`}
                >
                  약관동의
                </Text>
                <Wrapper
                  width={`100%`}
                  height={`50px`}
                  margin={`0 0 16px`}
                  padding={`0 14px`}
                  bgColor={Theme.lightGrey3_C}
                  fontSize={width < 500 ? `16px` : `18px`}
                  dr={`coloumn`}
                  ju={`flex-start`}
                >
                  <label>
                    <Checkbox type="checkbox" bgColor={Theme.lightGrey3_C} />
                    <CheckSpan></CheckSpan>모든 약관에 동의합니다.
                  </label>
                </Wrapper>
                <Wrapper
                  width={`100%`}
                  margin={`0 0 50px`}
                  padding={`0 14px`}
                  dr={`coloumn`}
                  ju={`flex-start`}
                  fontSize={width < 500 ? `16px` : `18px`}
                >
                  <CheckLabel>
                    <Checkbox />
                    <CheckSpan>(필수)</CheckSpan> 개인정보처리방침에 동의합니다.
                  </CheckLabel>
                  <CheckLabel>
                    <Checkbox />
                    <CheckSpan>(필수)</CheckSpan> 개인정보처리방침에 동의합니다.
                  </CheckLabel>
                  <CheckLabel>
                    <Checkbox />
                    <CheckSpan>(필수)</CheckSpan> 개인정보처리방침에 동의합니다.
                  </CheckLabel>
                </Wrapper>
                <CommonButton
                  fontSize={width < 500 ? `16px` : `18px`}
                  fontWeight={`600`}
                  kindOf={`white`}
                  width={`100%`}
                  height={`54px`}
                >
                  회원가입
                </CommonButton>
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

export default SignUp;
