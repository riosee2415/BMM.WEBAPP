import React, { useCallback, useState } from "react";
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
  CommonButton,
  TextInput,
} from "../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../components/MypageTop";
import Modal from "antd/lib/modal/Modal";
import { CloseOutlined } from "@ant-design/icons";

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
        <title>BUY ME MINE | 회원정보수정</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 0` : `95px 0 0`}>
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

              <TextInput
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 20px`}
                placeholder="아이디"
              />
              <SignupLabel>비밀번호 확인</SignupLabel>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="password"
                margin={`0 0 20px`}
                placeholder="비밀번호"
              />
              <SignupLabel>연락처</SignupLabel>
              <TextInput
                width={`100%`}
                height={`46px`}
                type="text"
                margin={`0 0 20px`}
                placeholder="연락처"
              />
              <SignupLabel>이메일</SignupLabel>
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
                <ModifyBtn>회원정보수정</ModifyBtn>
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
                    <Text>탈퇴시 주의사항이 들어올 곳입니다.</Text>
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
