import React from "react";
import ClientLayout from "../../../components/ClientLayout";
import Theme from "../../../components/Theme";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  CustomPage,
  Image,
} from "../../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../../components/MypageTop";

const MobileList = styled(Wrapper)`
  margin: 0 0 20px;
  border: 1px solid ${Theme.lightGrey2_C};
  padding: 15px;
`;

const ListText = styled(Wrapper)`
  width: ${(props) => props.width || `10%`};
  font-size: 16px;
`;

const Box = styled(Wrapper)`
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};

  &:last-child {
    border-bottom: none;
  }
`;

const RefondList = () => {
  ////// GLOBAL STATE //////
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
        <title>BUY ME MINE | 취소 / 환불 내역</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 0` : `95px 0 0`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 700 ? `26px` : `30px`}
              fontWeight={`bold`}
              margin={`0 0 30px`}
            >
              <Text>취소 / 환불 내역</Text>
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
              display={width < 900 ? `none` : `flex`}
            >
              <Wrapper width={`10%`}>주문일자</Wrapper>
              <Wrapper width={`60%`} dr={`row`}>
                <Wrapper width={`60%`}>상품명</Wrapper>
                <Wrapper width={`20%`}>주문수량</Wrapper>
                <Wrapper width={`20%`}>상품금액</Wrapper>
              </Wrapper>
              <Wrapper width={`10%`}>무게</Wrapper>
              <Wrapper width={`10%`}>배송비</Wrapper>
              <Wrapper width={`10%`}>상태</Wrapper>
            </Wrapper>

            {width < 900 ? (
              <Wrapper>
                <MobileList>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                    <Text fontWeight={`600`}>환불 신청 완료</Text>
                    <Text color={Theme.grey_C} margin={`0 0 0 5px`}>
                      2022.12.21
                    </Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={`14px`}
                    margin={`0 0 10px`}
                  >
                    <Image
                      alt="샘플사진"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                      width={`70px`}
                      height={`70px`}
                    />
                    <Wrapper
                      width={`auto`}
                      al={`flex-start`}
                      padding={`0 0 0 10px`}
                    >
                      <Text>오레오 시리즈 420g</Text>
                      <Text>주문수량 : 1</Text>
                      <Text>상품금액: 28,000원 + 4,000원</Text>
                    </Wrapper>
                  </Wrapper>
                </MobileList>
                <MobileList>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                    <Text fontWeight={`600`}>취소 완료</Text>
                    <Text color={Theme.grey_C} margin={`0 0 0 5px`}>
                      2022.12.21
                    </Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={`14px`}
                    margin={`0 0 10px`}
                  >
                    <Image
                      alt="샘플사진"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                      width={`70px`}
                      height={`70px`}
                    />
                    <Wrapper
                      width={`auto`}
                      al={`flex-start`}
                      padding={`0 0 0 10px`}
                    >
                      <Text>오레오 시리즈 420g</Text>
                      <Text>주문수량 : 1</Text>
                      <Text>상품금액: 28,000원 + 4,000원</Text>
                    </Wrapper>
                  </Wrapper>
                </MobileList>
              </Wrapper>
            ) : (
              <>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                >
                  <ListText>2022.12.21</ListText>
                  <Wrapper width={`60%`} dr={`row`}>
                    <Box>
                      <Wrapper
                        width={`60%`}
                        borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                      >
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          fontSize={`18px`}
                          fontWeight={`600`}
                          padding={`0 0 0 38px`}
                          margin={`18px 0 18px`}
                        >
                          <Image
                            alt="샘플사진"
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                            width={`64px`}
                            height={`64px`}
                          />
                          <Text padding={`0 0 0 14px`}>오레오 시리즈</Text>
                        </Wrapper>
                      </Wrapper>
                      <ListText width={`20%`}>1</ListText>
                      <ListText width={`20%`}>28,000원</ListText>
                    </Box>
                  </Wrapper>
                  <ListText>420g</ListText>
                  <ListText>4,000원</ListText>
                  <ListText fontWeight={`600`}>환불 신청 완료</ListText>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                >
                  <ListText>2022.12.21</ListText>
                  <Wrapper width={`60%`} dr={`row`}>
                    <Box>
                      <Wrapper
                        width={`60%`}
                        borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                      >
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          fontSize={`18px`}
                          fontWeight={`600`}
                          padding={`0 0 0 38px`}
                          margin={`18px 0 18px`}
                        >
                          <Image
                            alt="샘플사진"
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                            width={`64px`}
                            height={`64px`}
                          />
                          <Text padding={`0 0 0 14px`}>오레오 시리즈</Text>
                        </Wrapper>
                      </Wrapper>
                      <ListText width={`20%`}>1</ListText>
                      <ListText width={`20%`}>28,000원</ListText>
                    </Box>
                  </Wrapper>
                  <ListText>420g</ListText>
                  <ListText>4,000원</ListText>
                  <ListText fontWeight={`600`}>취소 완료</ListText>
                </Wrapper>
              </>
            )}

            <CustomPage />
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

export default RefondList;
