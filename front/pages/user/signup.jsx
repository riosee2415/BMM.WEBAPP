import React, { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Checkbox } from "antd";
import useInput from "../../hooks/useInput";
import useWidth from "../../hooks/useWidth";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_REQUEST } from "../../reducers/user";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
  CommonButton,
  SpanText,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const PostBtn = styled.button`
  width: 35%;
  height: 46px;

  background-color: ${Theme.lightGrey3_C};
  color: ${Theme.lightGrey_C};
  border: none;

  font-size: 16px;
  font-weight: bold;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.lightGrey2_C};
    color: ${(props) => props.theme.darkGrey_C};
  }
`;

const SignupLabel = styled.label`
  margin-bottom: ${(props) => props.marginBottom || `10px`};
  font-size: 16px;
`;

const CheckSpan = styled.span`
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const SignUp = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const userId = useInput("");
  const password = useInput("");
  const passCheck = useInput("");
  const mobile = useInput("");
  const email = useInput("");
  const postCode = useInput("");
  const address = useInput("");
  const detailAddress = useInput("");

  ////// USEEFFECT //////
  ////// TOGGLE ////////
  ////// HANDLER ///////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 회원가입</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 120px`}>
          <RsWrapper>
            <Wrapper
              width={width < 500 ? `100%` : `450px`}
              padding={width < 500 ? `80px 20px` : `80px 60px`}
              al={`flex-start`}
              border={`1px solid ${Theme.lightGrey3_C}`}
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
                fontSize={width < 500 ? `18px` : `20px`}
                fontWeight={`600`}
                color={Theme.lightGrey_C}
                margin={`0 0 20px`}
              >
                개인정보
              </Text>

              <SignupLabel>
                아이디 <SpanText color={Theme.red_C}>*</SpanText>
              </SignupLabel>

              <TextInput
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 20px`}
                placeholder="아이디"
              />
              <SignupLabel>
                비밀번호 <SpanText color={Theme.red_C}>*</SpanText>
              </SignupLabel>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="password"
                margin={`0 0 20px`}
                required
                placeholder="비밀번호"
              />
              <SignupLabel>
                비밀번호 재확인 <SpanText color={Theme.red_C}>*</SpanText>
              </SignupLabel>
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
              <SignupLabel>
                이메일 <SpanText color={Theme.red_C}>*</SpanText>
              </SignupLabel>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="email"
                margin={`0 0 20px`}
                placeholder="이메일"
              />
              <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 10px`}>
                <SignupLabel marginBottom={`0`}>주소</SignupLabel>
                <Text color={Theme.red_C}>
                  *주문시 배송지로 쓰일 주소입니다.
                </Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 10px`}>
                <TextInput
                  width={`62%`}
                  height={`46px`}
                  type="post"
                  placeholder="우편번호"
                />
                <PostBtn>우편번호</PostBtn>
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
                  bgColor={Theme.lightGrey3_C}
                  fontSize={width < 500 ? `16px` : `18px`}
                >
                  <Wrapper
                    padding={width < 500 ? `18px` : `10px`}
                    dr={`coloumn`}
                    ju={`flex-start`}
                  >
                    <Checkbox>
                      <Text fontSize={width < 500 ? `16px` : `18px`}>
                        모든 약관에 동의합니다.
                      </Text>
                    </Checkbox>
                  </Wrapper>
                </Wrapper>

                <Checkbox>
                  <Text
                    fontSize={width < 500 ? `16px` : `18px`}
                    margin={`0 0 16px`}
                  >
                    <CheckSpan>(필수)</CheckSpan> 개인정보처리방침에 동의합니다.
                  </Text>
                </Checkbox>

                <Wrapper
                  margin={`0 0 50px`}
                  padding={`0 10px`}
                  al={`flex-start`}
                >
                  <Checkbox>
                    <Text
                      fontSize={width < 500 ? `16px` : `18px`}
                      margin={`0 0 16px`}
                    >
                      <CheckSpan>(필수)</CheckSpan> 이용약관에 동의합니다.
                    </Text>
                  </Checkbox>
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
