import React, { useState } from "react";
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
  ATag,
} from "../../components/commonComponents";
import styled from "styled-components";
import Link from "next/dist/client/link";

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
  const [currentTab, setCurrentTab] = useState(0);
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
                  />
                  <TextInput
                    width={`100%`}
                    height={`46px`}
                    type="text"
                    margin={`0 0 10px`}
                    placeholder="아이디"
                  />
                  <TextInput
                    width={`100%`}
                    height={`46px`}
                    type="email"
                    margin={`0 0 10px`}
                    placeholder="이메일"
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
                    onClick={() => setCurrentTab(1)}
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
                    onClick={() => setCurrentTab(2)}
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
                    type="text"
                    placeholder="비밀번호"
                    margin={`0 0 12px`}
                  />
                  <TextInput
                    width={`100%`}
                    height={`46px`}
                    type="text"
                    placeholder="비밀번호 재확인"
                    margin={`0 0 12px`}
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
                  <Link href={`/user/findPw`}>
                    <ATag>
                      <CommonButton
                        fontSize={width < 500 ? `16px` : `18px`}
                        fontWeight={`600`}
                        kindOf={`white`}
                        width={`100%`}
                        height={`54px`}
                        margin={`0 0 40px`}
                      >
                        비밀번호 재설정
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

export default FindPw;
