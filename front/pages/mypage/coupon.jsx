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

const CouponWrapper = styled(Wrapper)`
  @media (max-width: 700px) {
    display: none;
    font-size: 14px;
  }
`;
const List = styled(Wrapper)`
  height: 60px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;
`;

const BeforeBtn = styled(Wrapper)`
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

const CheckBtn = styled.button`
  width: 20%;
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
              fontSize={`30px`}
              fontWeight={`600`}
              margin={`0 0 30px`}
            >
              <Text>쿠폰</Text>
              <CommonButton
                fontSize={width < 700 ? `16px` : `18px`}
                fontWeight={`600`}
                kindOf={`white`}
                width={`auto`}
                height={`33px`}
                onClick={modalToggle}
              >
                쿠폰 등록하기
              </CommonButton>
            </Wrapper>
            <CouponWrapper
              height={`54px`}
              dr={`row`}
              color={Theme.grey_C}
              bgColor={Theme.lightGrey3_C}
              borderTop={`1px solid ${Theme.basicTheme_C}`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              fontSize={`16px`}
              fontWeight={`600`}
            >
              <Wrapper width={`10%`}>번호</Wrapper>
              <Wrapper width={`50%`}>쿠폰명</Wrapper>
              <Wrapper width={`15%`}>사용 기간</Wrapper>
              <Wrapper width={`15%`}>조건 금액</Wrapper>
              <Wrapper width={`10%`}>할인 금액</Wrapper>
            </CouponWrapper>
            <List>
              <Wrapper width={width < 700 ? `0` : `10%`}>10</Wrapper>
              <Wrapper
                width={width < 700 ? `` : `50%`}
                padding={`0 50px`}
                al={`flex-start`}
              >
                쿠폰 번호 : AB542354
              </Wrapper>
              <Wrapper width={`15%`} color={Theme.grey_C}>
                2022.12.01 ~ 2022.01.31
              </Wrapper>
              <Wrapper width={width < 700 ? `20%` : `15%`} color={Theme.grey_C}>
                최소 20,000원 이상 구매
              </Wrapper>
              <Wrapper width={`10%`} fontSize={`16px`} fontWeight={`600`}>
                2,000원
              </Wrapper>
            </List>
            <CustomPage />
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
                <Wrapper margin={`50px 0 78px`} al={`flex-start`}>
                  <Text
                    fontSize={width < 900 ? `16px` : `18px`}
                    margin={`0 0 15px`}
                  >
                    쿠폰 번호를 통해 등록하실 수 있습니다.
                  </Text>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <TextInput
                      width={`50%`}
                      height={`46px`}
                      placeholder="쿠폰번호를 입력해주세요."
                    />
                    <CheckBtn>확인</CheckBtn>
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <BeforeBtn onClick={modalToggle}>이전으로</BeforeBtn>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`230px`}
                    height={`54px`}
                    onClick={modalToggle}
                  >
                    등록하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Modal>
          {/* 쿠폰번호가 틀렸을 때 */}
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
                <Wrapper margin={`50px 0 78px`} al={`flex-start`}>
                  <Text
                    fontSize={width < 900 ? `16px` : `18px`}
                    margin={`0 0 15px`}
                  >
                    쿠폰 번호를 통해 등록하실 수 있습니다.
                  </Text>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 11px`}>
                    <TextInput
                      width={`50%`}
                      height={`46px`}
                      placeholder="쿠폰번호를 입력해주세요."
                    />
                    <CheckBtn>확인</CheckBtn>
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
                    width={`230px`}
                    height={`54px`}
                    onClick={modalToggle}
                  >
                    등록하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Modal>
          \{/* 쿠폰번호가 맞았을 때 */}
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
                <Wrapper margin={`50px 0 78px`} al={`flex-start`}>
                  <Text
                    fontSize={width < 900 ? `16px` : `18px`}
                    margin={`0 0 15px`}
                  >
                    쿠폰 번호를 통해 등록하실 수 있습니다.
                  </Text>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 11px`}>
                    <TextInput
                      width={`50%`}
                      height={`46px`}
                      placeholder="쿠폰번호를 입력해주세요."
                    />
                    <CheckBtn>확인</CheckBtn>
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
                    width={`230px`}
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
