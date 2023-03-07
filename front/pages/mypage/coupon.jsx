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
  CustomPage,
  CommonButton,
  TextInput,
} from "../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../components/MypageTop";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const List = styled(Wrapper)`
  height: 60px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;
`;

const MobileList = styled(Wrapper)`
  margin: 0 0 10px;
  border: 1px solid ${Theme.lightGrey2_C};
  padding: 15px;

  &:last-child {
    margin: 0;
  }

  &:nth-child(2n) {
    background: ${Theme.subTheme_C};
  }
`;

const BeforeBtn = styled(Wrapper)`
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

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

const CheckBtn = styled.button`
  width: 20%;
  height: 46px;

  margin: 0 0 0 10px;

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

  @media (max-width: 700px) {
    width: calc(30% - 10px);
  }
`;

const Coupon = () => {
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
        <title>BUY ME MINE | 마이페이지</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 100px`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 700 ? `26px` : `30px`}
              fontWeight={`600`}
              margin={`0 0 30px`}
            >
              <Text>쿠폰</Text>
              <CommonButton
                fontSize={width < 700 ? `16px` : `18px`}
                fontWeight={`600`}
                kindOf={`white`}
                width={`126px`}
                height={`33px`}
                padding={`0`}
                radius={`3px`}
                onClick={modalToggle}
              >
                쿠폰 등록하기
              </CommonButton>
            </Wrapper>

            <Wrapper
              height={`54px`}
              dr={`row`}
              color={Theme.grey_C}
              bgColor={Theme.lightGrey3_C}
              borderTop={`1px solid ${Theme.basicTheme_C}`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              fontSize={`16px`}
              fontWeight={`600`}
              display={width < 800 ? `none` : `flex`}
            >
              <Wrapper width={`10%`}>번호</Wrapper>
              <Wrapper width={`45%`}>쿠폰명</Wrapper>
              <Wrapper width={`15%`}>사용 기간</Wrapper>
              <Wrapper width={`15%`}>조건 금액</Wrapper>
              <Wrapper width={`15%`}>할인 금액</Wrapper>
            </Wrapper>
            {width < 800 ? (
              <Wrapper>
                <MobileList>
                  <Wrapper al={`flex-start`} fontSize={`16px`}>
                    쿠폰 번호 : AB542354
                  </Wrapper>
                  <Wrapper al={`flex-start`} color={Theme.grey_C}>
                    사용기간 : 2022.12.01 ~ 2022.01.31
                  </Wrapper>
                  <Wrapper al={`flex-start`} color={Theme.grey_C}>
                    조건 금액 : 최소 20,000원 이상 구매
                  </Wrapper>
                  <Wrapper al={`flex-start`} color={Theme.grey_C}>
                    할인 금액 : 2,000원
                  </Wrapper>
                </MobileList>
              </Wrapper>
            ) : (
              <List>
                <Wrapper width={`10%`} color={Theme.grey_C}>
                  10
                </Wrapper>
                <Wrapper width={`45%`} padding={`0 50px`} al={`flex-start`}>
                  쿠폰 번호 : AB542354
                </Wrapper>
                <Wrapper width={`15%`} color={Theme.grey_C}>
                  2022.12.01 ~ 2022.01.31
                </Wrapper>
                <Wrapper width={`15%`} color={Theme.grey_C}>
                  최소 20,000원 이상 구매
                </Wrapper>
                <Wrapper width={`15%`} fontSize={`16px`} fontWeight={`600`}>
                  2,000원
                </Wrapper>
              </List>
            )}

            <CustomPage />
          </RsWrapper>

          <Modal
            onCancel={modalToggle}
            visible={isModal}
            footer={null}
            closable={null}
            width={`570px`}
          >
            <Wrapper padding={width < 700 ? `0` : `20px`}>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 18px`}
              >
                <Text
                  fontSize={width < 700 ? `20px` : `24px`}
                  fontWeight={`600`}
                >
                  쿠폰 등록하기
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
                  margin={width < 700 ? `50px 0 50px` : `50px 0 78px`}
                  al={`flex-start`}
                >
                  <Text
                    fontSize={width < 700 ? `16px` : `18px`}
                    margin={`0 0 15px`}
                  >
                    쿠폰 번호를 통해 등록하실 수 있습니다.
                  </Text>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <TextInput
                      width={width < 700 ? `70%` : `50%`}
                      height={`46px`}
                      placeholder="쿠폰번호를 입력해주세요."
                    />
                    <CheckBtn>확인</CheckBtn>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <BeforeBtn onClick={modalToggle}>이전으로</BeforeBtn>
                  <CommonButton
                    fontSize={width < 700 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`49%`}
                    height={`54px`}
                    onClick={modalToggle}
                  >
                    등록하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Modal>

          <Modal
            onCancel={modalToggle}
            visible={isModal}
            footer={null}
            closable={null}
            width={`570px`}
          >
            <Wrapper padding={width < 700 ? `0` : `20px`}>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 18px`}
              >
                <Text
                  fontSize={width < 700 ? `20px` : `24px`}
                  fontWeight={`600`}
                >
                  쿠폰 등록하기
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
                <Wrapper margin={`50px 0 50px`} al={`flex-start`}>
                  <Text
                    fontSize={width < 900 ? `16px` : `18px`}
                    margin={`0 0 15px`}
                  >
                    쿠폰 번호를 통해 등록하실 수 있습니다.
                  </Text>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 11px`}>
                    <TextInput
                      width={width < 700 ? `70%` : `50%`}
                      height={`46px`}
                      placeholder="쿠폰번호를 입력해주세요."
                    />
                    <CheckBtn>확인</CheckBtn>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                  >
                    <Wrapper
                      width={`9px`}
                      height={`9px`}
                      border={`1px solid ${Theme.basicTheme_C}`}
                      radius={`100%`}
                    ></Wrapper>
                    <Text padding={`0 5px`}>[쿠폰명]10,000원 할인 쿠폰</Text>
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`flex-start`} color={Theme.red_C}>
                    <CloseOutlined />
                    <Text padding={`0 5px`}>쿠폰 번호가 틀렸습니다.</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <BeforeBtn onClick={modalToggle}>쇼핑계속하기</BeforeBtn>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={width < 700 ? `150px` : `230px`}
                    height={`54px`}
                    onClick={modalToggle}
                  >
                    등록하기
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

export default Coupon;
