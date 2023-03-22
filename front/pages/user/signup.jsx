import React, { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Checkbox, Modal } from "antd";
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

const style = {
  overflow: "hidden",
};

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
  const isTerm1 = useInput(false);
  const isTerm2 = useInput(false);

  const [pModal, setPModal] = useState(false); // 주소 모달

  ////// USEEFFECT //////
  ////// TOGGLE ////////
  const postCodeModalToggle = useCallback(() => {
    setPModal((prev) => !prev);
  }, [pModal]);

  ////// HANDLER ///////

  const signUpHandler = useCallback(() => {
    if (!userId.value || userId.value.trim() === "") {
      return message.error("아이디을 입력해주세요.");
    }

    if (!password.value || password.value.trim() === "") {
      return message.error("비밀번호를 입력해주세요.");
    }

    if (password.value !== passCheck.value) {
      return message.error("비밀번호가 일치하지 않습니다.");
    }

    if (!mobile.value || mobile.value.trim() === "") {
      return message.error("연락처를 입력해주세요.");
    }

    if (!email.value || email.value.trim() === "") {
      return message.error("이메일을 입력해주세요.");
    }

    if (!isTerm1.value) {
      return message.error("개인정보처리방침에 동의해주세요.");
    }

    if (!isTerm2.value) {
      return message.error("이용약관에 동의해주세요.");
    }

    dispatch({
      type: SIGNUP_REQUEST,
      data: {
        userId: userId.value,
        password: password.value,
        mobile: mobile.value,
        email: email.value,
        terms: isTerm.value,
      },
    });
  }, [
    userId.value,
    password.value,
    passCheck.value,
    mobile.value,
    email.value,
    postCode.value,
    address.value,
    detailAddress.value,
    isTerm1.value,
    isTerm2.value,
  ]);

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
                {...userId}
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
                {...password}
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
                {...passCheck}
              />
              <SignupLabel>연락처</SignupLabel>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 20px`}
                placeholder="연락처"
                {...mobile}
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
                {...email}
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
                  placeholder="우편번호"
                  readOnly
                  value={postCode.value}
                />
                <PostBtn onClick={postCodeModalToggle}>우편번호</PostBtn>
              </Wrapper>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 10px`}
                placeholder="기본주소"
                readOnly
                {...address}
              />
              <TextInput
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 30px`}
                placeholder="상세주소를 입력해주세요."
                {...detailAddress}
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
                    <Checkbox
                      checked={isTerm1.value === true && isTerm2.value === true}
                      onClick={() => {
                        isTerm1.setValue(true), isTerm2.setValue(true);
                      }}
                    >
                      <Text fontSize={width < 500 ? `16px` : `18px`}>
                        모든 약관에 동의합니다.
                      </Text>
                    </Checkbox>
                  </Wrapper>
                </Wrapper>

                <Checkbox
                  checked={isTerm1.value}
                  onClick={() => isTerm1.setValue(!isTerm1.value)}
                >
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
                  <Checkbox
                    checked={isTerm2.value}
                    onClick={() => isTerm2.setValue(!isTerm2.value)}
                  >
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
                  onClick={signUpHandler}
                >
                  회원가입
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </RsWrapper>

          {/* 주소 검색 */}
          {pModal && (
            <Modal
              width={`500px`}
              style={{ top: 200 }}
              footer={null}
              visible={pModal}
              onCancel={() => postCodeModalToggle()}
            >
              <DaumPostcode
                onComplete={(data) => {
                  postCode.setValue(data.zonecode);
                  address.setValue(data.address);

                  setPModal(false);
                }}
                width={`600px`}
                height={`500px`}
                autoClose
                animation
                style={style}
              />
            </Modal>
          )}
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
