import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST, USER_UPDATE_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
  TextInput,
} from "../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../components/MypageTop";
import Modal from "antd/lib/modal/Modal";
import { CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import useInput from "../../hooks/useInput";
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

const OutBtn = styled(Wrapper)`
  width: 49%;
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

  @media (max-width: 900px) {
    font-size: 16px;
  }
`;

const ModifyBtn = styled(Wrapper)`
  width: 100%;
  height: 54px;
  font-size: 18px;
  font-weight: 600;
  background-color: ${Theme.white_C};
  border: 1px solid ${Theme.basicTheme_C};
  margin: 0 0 12px;

  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.basicTheme_C};
    color: ${(props) => props.theme.black_C};
  }
`;

const MemberModify = () => {
  ////// GLOBAL STATE //////
  const { me, st_userUpdateDone, st_userUpdateError } = useSelector(
    (state) => state.user
  );

  const [isModal, setIsModal] = useState(false);
  const [pModal, setPModal] = useState(false);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const password = useInput(``);
  const mobile = useInput(me && me.mobile);
  const email = useInput(me && me.email);
  const zonecodeInput = useInput(me && me.postCode);
  const addressInput = useInput(me && me.address);
  const detailAddressInput = useInput(me && me.detailAddress);

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      router.push(`/user/login`);

      return message.error("로그인이 필요한 서비스입니다.");
    }
  }, [me]);

  // ********************** 회원정보 수정 후처리 *************************

  useEffect(() => {
    if (st_userUpdateError) {
      return message.error(st_userUpdateError);
    }
  }, [st_userUpdateError]);

  useEffect(() => {
    if (st_userUpdateDone) {
      password.setValue(``);

      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      return message.success("회원정보가 수정되었습니다.");
    }
  }, [st_userUpdateDone]);

  ////// TOGGLE //////
  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const pModalToggle = useCallback(() => {
    setPModal((prev) => !prev);
  }, [pModal]);

  ////// HANDLER //////

  // 회원정보수정
  const userModifyHandler = useCallback(() => {
    if (!email.value) {
      return message.error("이메일을 입력해주세요.");
    }

    if (!mobile.value) {
      return message.error("전화번호를 입력해주세요.");
    }

    if (!addressInput.value) {
      return message.error("주소를 입력해주세요.");
    }

    if (!detailAddressInput.value) {
      return message.error("상세주소를 입력해주세요.");
    }
    if (!password.value || password.value.trim() === "") {
      return message.error("비밀번호를 입력해주세요.");
    }
    //
    if (
      email.value === me.email &&
      mobile.value === me.mobile &&
      addressInput.value === me.address &&
      detailAddressInput.value === me.detailAddress
    ) {
      return message.error("변경할 정보가 없습니다.");
    }

    dispatch({
      type: USER_UPDATE_REQUEST,
      data: {
        password: password.value,
        email: email.value,
        mobile: mobile.value,
        postCode: zonecodeInput.value,
        address: addressInput.value,
        detailAddress: detailAddressInput.value,
      },
    });
  }, [
    password.value,
    email,
    mobile,
    zonecodeInput,
    addressInput,
    detailAddressInput,
  ]);
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 회원정보수정</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0` : `95px 0`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              width={width < 500 ? `100%` : `450px`}
              padding={width < 500 ? `80px 20px` : `80px 60px`}
              border={`1px solid ${Theme.lightGrey3_C}`}
              al={`flex-start`}
            >
              <Text
                fontSize={width < 500 ? `25px` : `36px`}
                fontWeight={`600`}
                margin={`0 0 50px`}
              >
                회원정보수정
              </Text>

              <SignupLabel>아이디</SignupLabel>
              <Wrapper
                width={`100%`}
                height={`46px`}
                al={`flex-start`}
                border={`1px solid ${Theme.lightGrey2_C}`}
                bgColor={Theme.lightGrey3_C}
                color={Theme.grey_C}
                margin={`0 0 20px`}
                padding={`0 10px`}
              >
                {me && me.userId}
              </Wrapper>

              <SignupLabel>비밀번호 확인</SignupLabel>
              <TextInput
                width={`100%`}
                {...password}
                height={`46px`}
                type="password"
                margin={`0 0 20px`}
                placeholder="비밀번호"
              />
              <SignupLabel>연락처</SignupLabel>
              <TextInput
                width={`100%`}
                {...mobile}
                height={`46px`}
                type="text"
                margin={`0 0 20px`}
                placeholder="연락처"
              />
              <SignupLabel>이메일</SignupLabel>
              <TextInput
                width={`100%`}
                {...email}
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
                  {...zonecodeInput}
                  width={`62%`}
                  height={`46px`}
                  type="post"
                  placeholder="우편번호"
                />
                <PostBtn onClick={pModalToggle}>우편번호</PostBtn>
              </Wrapper>
              <TextInput
                {...addressInput}
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 10px`}
                placeholder="기본주소"
              />
              <TextInput
                {...detailAddressInput}
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 30px`}
                placeholder="상세주소를 입력해주세요."
              />
              <Wrapper>
                <ModifyBtn onClick={userModifyHandler}>회원정보수정</ModifyBtn>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                color={Theme.grey_C}
                onClick={modalToggle}
              >
                <Text isHover td={`underline`}>
                  회원탈퇴
                </Text>
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
                  회원탈퇴
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
                <Wrapper
                  al={`flex-start`}
                  margin={width < 900 ? `35px 0 35px` : `50px 0 50px`}
                >
                  <Text
                    fontSize={width < 900 ? `16px` : `18px`}
                    margin={`0 0 15px`}
                  >
                    정말로 탈퇴하시겠습니까?
                  </Text>
                  <TextInput
                    width={`80%`}
                    height={`46px`}
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    margin={`0 0 12px`}
                    fontSize={width < 900 ? `14px` : `16px`}
                  />
                  <Wrapper
                    width={`100%`}
                    height={`46px`}
                    al={`flex-start`}
                    border={`1px solid ${Theme.lightGrey3_C}`}
                    bgColor={Theme.lightGrey3_C}
                    color={Theme.lightGrey_C}
                    padding={`0 11px`}
                    fontSize={width < 900 ? `14px` : `16px`}
                  >
                    <Text>회원 탈퇴시 회원가입이 불가능합니다.</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <OutBtn onClick={modalToggle}>탈퇴하기</OutBtn>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`49%`}
                    height={`54px`}
                    onClick={modalToggle}
                  >
                    이전으로
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Modal>

          <Modal visible={pModal} footer={null} onCancel={pModalToggle}>
            <DaumPostcode
              onComplete={(data) => {
                addressInput.setValue(data.address);
                zonecodeInput.setValue(data.zonecode);
                pModalToggle();
              }}
              width={width < 600 ? `100%` : `600px`}
              height={`500px`}
              autoClose={false}
              animation
            />
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

export default MemberModify;
