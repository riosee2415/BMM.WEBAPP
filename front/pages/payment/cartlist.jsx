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
  Image,
  CommonButton,
} from "../../components/commonComponents";
import styled from "styled-components";
import { Checkbox, Modal } from "antd";
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

const List = styled(Wrapper)`
  height: 100px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;
`;

const MobileList = styled(Wrapper)`
  margin: 0 0 30px;
  border: 1px solid ${Theme.lightGrey2_C};
  padding: 0 15px;
`;

const BoxText = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  font-size: 18px;
  margin: ${(props) => props.margin || `0 0 15px`};
`;

const SubText = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  color: ${Theme.lightGrey_C};
  margin: ${(props) => props.margin || `0 0 8px`};
`;

const CartList = () => {
  ////// GLOBAL STATE //////
  const [choiceModal, setChoiceModal] = useState(false);

  const [isModal, setIsModal] = useState(false);

  ////// HOOKS //////
  const width = useWidth();

  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  const choiceModalToggle = useCallback(() => {
    setChoiceModal((prev) => !prev);
  }, [choiceModal]);

  const isModalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 장바구니</title>
      </Head>
      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 80px` : `95px 0`}>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 30px`}>
              <Text
                fontSize={width < 900 ? `22px` : `34px`}
                fontWeight={`bold`}
              >
                장바구니
              </Text>
              <Wrapper dr={`row`} width={`auto`}>
                <Text color={Theme.black_C} margin={`0 6px`}>
                  장바구니
                </Text>
                <Image
                  alt="next icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/next.png`}
                  width={`5px`}
                />
                <Text color={Theme.grey_C} margin={`0 6px`}>
                  주문서작성/결제
                </Text>
                <Image
                  alt="next icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/next.png`}
                  width={`5px`}
                />
                <Text color={Theme.grey_C} margin={`0 0 0 6px`}>
                  주문완료
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 15px`}>
              <Checkbox>
                <Text color={Theme.grey2_C}>전체 선택</Text>
              </Checkbox>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} al={`flex-start`}>
              <Wrapper width={width < 900 ? `100%` : `65%`}>
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
                  <Wrapper width={`calc(100% - 127px - 127px - 127px)`}>
                    상품정보
                  </Wrapper>
                  <Wrapper width={`127px`}>주문수량</Wrapper>
                  <Wrapper width={`127px`}>상품금액</Wrapper>
                  <Wrapper width={`127px`}>무게</Wrapper>
                </Wrapper>
                {width < 1100 ? (
                  <Wrapper>
                    <MobileList>
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        fontSize={`16px`}
                        fontWeight={`600`}
                        margin={`10px 0 20px`}
                      >
                        <Checkbox />
                        <Text padding={`0 5px`}>오레오 시리즈</Text>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        al={`flex-start`}
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
                          padding={`0 0 0 20px`}
                        >
                          <Text fontSize={`16px`}>주문수량</Text>
                          <Wrapper
                            width={`auto`}
                            dr={`row`}
                            border={`1px solid ${Theme.lightGrey2_C}`}
                            bgColor={Theme.white_C}
                            margin={`0 0 10px`}
                          >
                            <Wrapper
                              width={`30px`}
                              cursor={`pointer`}
                              height={`35px`}
                              fontSize={`12px`}
                            >
                              <MinusOutlined />
                            </Wrapper>
                            <Wrapper
                              width={`43px`}
                              height={`35px`}
                              fontSize={width < 900 ? `14px` : `16px`}
                              fontWeight={`600`}
                              color={Theme.darkGrey_C}
                              borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                              borderRight={`1px solid ${Theme.lightGrey2_C}`}
                            >
                              1
                            </Wrapper>
                            <Wrapper
                              width={`30px`}
                              cursor={`pointer`}
                              height={`35px`}
                              fontSize={`12px`}
                            >
                              <PlusOutlined />
                            </Wrapper>
                          </Wrapper>
                          <Text fontSize={`16px`}>무게: 420g</Text>
                        </Wrapper>
                        <Wrapper al={`flex-end`} margin={`15px 0 0`}>
                          <Text fontSize={`16px`} fontWeight={`600`}>
                            상품금액: 9,000원
                          </Text>
                        </Wrapper>
                      </Wrapper>
                    </MobileList>
                    <MobileList>
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        fontSize={`16px`}
                        fontWeight={`600`}
                        margin={`10px 0 0`}
                      >
                        <Checkbox />
                        <Text padding={`0 5px`}>랩 에센스</Text>
                      </Wrapper>
                      <Wrapper
                        al={`flex-start`}
                        color={Theme.grey_C}
                        padding={`0 20px`}
                        margin={`0 0 20px`}
                      >
                        옵션 : 오레오 핑크
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        al={`flex-start`}
                        color={Theme.darkGrey_C}
                        fontSize={`14px`}
                        margin={`0 0 10px`}
                      >
                        <Image
                          alt="샘플사진"
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/related-product.png`}
                          width={`70px`}
                          height={`70px`}
                        />
                        <Wrapper
                          width={`auto`}
                          al={`flex-start`}
                          padding={`0 0 0 20px`}
                        >
                          <Text fontSize={`16px`}>주문수량</Text>
                          <Wrapper
                            width={`auto`}
                            dr={`row`}
                            border={`1px solid ${Theme.lightGrey2_C}`}
                            bgColor={Theme.white_C}
                            margin={`0 0 10px`}
                          >
                            <Wrapper
                              width={`30px`}
                              cursor={`pointer`}
                              height={`35px`}
                              fontSize={`12px`}
                            >
                              <MinusOutlined />
                            </Wrapper>
                            <Wrapper
                              width={`43px`}
                              height={`35px`}
                              fontSize={width < 900 ? `14px` : `16px`}
                              fontWeight={`600`}
                              color={Theme.darkGrey_C}
                              borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                              borderRight={`1px solid ${Theme.lightGrey2_C}`}
                            >
                              1
                            </Wrapper>
                            <Wrapper
                              width={`30px`}
                              cursor={`pointer`}
                              height={`35px`}
                              fontSize={`12px`}
                            >
                              <PlusOutlined />
                            </Wrapper>
                          </Wrapper>
                          <Text fontSize={`16px`}>무게: 420g</Text>
                        </Wrapper>
                        <Wrapper al={`flex-end`} margin={`15px 0 0`}>
                          <Text fontSize={`16px`} fontWeight={`600`}>
                            상품금액: 9,000원
                          </Text>
                        </Wrapper>
                      </Wrapper>
                    </MobileList>
                  </Wrapper>
                ) : (
                  <>
                    <List>
                      <Checkbox />
                      <Wrapper
                        width={`calc(100% - 16px - 127px - 127px - 127px)`}
                        dr={`row`}
                        ju={`flex-start`}
                        fontSize={`18px`}
                        fontWeight={`600`}
                        padding={`0 0 0 14px`}
                      >
                        <Image
                          alt="샘플사진"
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                          width={`64px`}
                          height={`64px`}
                        />
                        <Text padding={`0 0 0 14px`}>오레오 시리즈</Text>
                      </Wrapper>
                      <Wrapper width={`127px`}>
                        <Wrapper
                          width={`auto`}
                          dr={`row`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          bgColor={Theme.white_C}
                        >
                          <Wrapper
                            width={`35px`}
                            cursor={`pointer`}
                            height={`35px`}
                            fontSize={`12px`}
                          >
                            <MinusOutlined />
                          </Wrapper>
                          <Wrapper
                            width={`48px`}
                            height={`35px`}
                            fontSize={width < 900 ? `14px` : `16px`}
                            fontWeight={`600`}
                            color={Theme.darkGrey_C}
                            borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                            borderRight={`1px solid ${Theme.lightGrey2_C}`}
                          >
                            1
                          </Wrapper>
                          <Wrapper
                            width={`35px`}
                            cursor={`pointer`}
                            height={`35px`}
                            fontSize={`12px`}
                          >
                            <PlusOutlined />
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper color={Theme.darkGrey_C} width={`127px`}>
                        9,000원
                      </Wrapper>
                      <Wrapper color={Theme.darkGrey_C} width={`127px`}>
                        420g
                      </Wrapper>
                    </List>
                    <List>
                      <Checkbox />
                      <Wrapper
                        width={`auto`}
                        al={`flex-start`}
                        margin={`18px 0 18px`}
                        padding={`0 0 0 14px`}
                      >
                        <Image
                          alt="샘플사진"
                          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/related-product.png`}
                          width={`64px`}
                          height={`64px`}
                          radius={`3px`}
                        />
                      </Wrapper>

                      <Wrapper
                        width={`calc(100% - 16px - 78px - 127px - 127px - 127px)`}
                        padding={`0 0 0 14px`}
                        al={`flex-start`}
                      >
                        <Text fontSize={`18px`} fontWeight={`600`}>
                          랩 에센스
                        </Text>
                        <Text color={Theme.grey_C}>옵션 : 오레오 핑크</Text>
                      </Wrapper>
                      <Wrapper width={`127px`}>
                        <Wrapper
                          width={`auto`}
                          dr={`row`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          bgColor={Theme.white_C}
                        >
                          <Wrapper
                            width={`35px`}
                            cursor={`pointer`}
                            height={`35px`}
                            fontSize={`12px`}
                          >
                            <MinusOutlined />
                          </Wrapper>
                          <Wrapper
                            width={`48px`}
                            height={`35px`}
                            fontSize={width < 900 ? `14px` : `16px`}
                            fontWeight={`600`}
                            color={Theme.darkGrey_C}
                            borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                            borderRight={`1px solid ${Theme.lightGrey2_C}`}
                          >
                            1
                          </Wrapper>
                          <Wrapper
                            width={`35px`}
                            cursor={`pointer`}
                            height={`35px`}
                            fontSize={`12px`}
                          >
                            <PlusOutlined />
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper color={Theme.darkGrey_C} width={`127px`}>
                        9,000원
                      </Wrapper>
                      <Wrapper color={Theme.darkGrey_C} width={`127px`}>
                        420g
                      </Wrapper>
                    </List>
                  </>
                )}
                <Wrapper
                  al={`flex-start`}
                  border={`1px solid ${Theme.lightGrey2_C}`}
                  bgColor={Theme.lightGrey3_C}
                  padding={`20px 20px`}
                  margin={width < 800 ? `0 0 20px` : `24px 0 60px`}
                  fontSize={width < 800 ? `14px` : `16px`}
                >
                  <Text
                    fontSize={`18px`}
                    fontWeight={`600`}
                    color={Theme.red_C}
                    margin={`0 0 18px`}
                  >
                    ※주의사항
                  </Text>
                  <Text margin={`0 0 15px`}>
                    · 배송비를 제외한 상품금액이 150$를 초과하면 관부가세가
                    발생할 수 있습니다.
                  </Text>
                  <Text margin={`0 0 15px`}>
                    · 의약품, 건강기능식품은 한 번 주문시에 합하여 6개까지만
                    가능합니다. 초과시에는 세관에서 폐기 또는 반품처리되며, 이에
                    따르는 비용은 본인 부담입니다.
                  </Text>
                  <Text>· 주의사항이 들어오는 곳입니다.</Text>
                </Wrapper>
              </Wrapper>

              {/* ///////////////////////////////////////////////////////////////////////////// */}
              {/* ///////////////////////////////////////////////////////////////////////////// */}
              {/* ////////////////////////////////// 오른쪽 영역 ///////////////////////////////// */}
              {/* ///////////////////////////////////////////////////////////////////////////// */}
              {/* ///////////////////////////////////////////////////////////////////////////// */}

              <Wrapper width={width < 800 ? `100%` : `30%`}>
                <Wrapper
                  border={`1px solid ${Theme.lightGrey2_C}`}
                  bgColor={Theme.lightGrey3_C}
                  padding={`30px 20px`}
                  margin={`0 0 26px`}
                >
                  <Wrapper
                    al={`flex-start`}
                    fontSize={`20px`}
                    fontWeight={`600`}
                    borderBottom={`1px solid ${Theme.basicTheme_C}`}
                    margin={`0 0 16px`}
                    padding={`0 0 16px`}
                  >
                    총 2개의 상품
                  </Wrapper>

                  <BoxText fontSize={`18px`}>
                    <Text>총 상품금액</Text>
                    <Text fontWeight={`600`}>18,000원</Text>
                  </BoxText>

                  <BoxText>
                    <Text>총 무게</Text>
                    <Text fontWeight={`600`}>240g</Text>
                  </BoxText>
                  <BoxText>
                    <Text>총 배송비</Text>
                    <Text fontWeight={`600`}>6,000원</Text>
                  </BoxText>
                  <BoxText margin={`0 0 13px`}>
                    <Text>총 할인금액</Text>
                    <Text fontWeight={`600`}>4,000원</Text>
                  </BoxText>
                  <SubText>
                    <Text>ㄴ배송 할인금액</Text>
                    <Text>-2,000원</Text>
                  </SubText>
                  <SubText>
                    <Text>ㄴ회원 할인금액(00%)</Text>
                    <Text>-2,000원</Text>
                  </SubText>
                  <SubText>
                    <Text>ㄴ쿠폰 사용</Text>
                    <Text>-0원</Text>
                  </SubText>
                  <SubText margin={`0 0 30px`}>
                    <Text>ㄴ포인트 사용</Text>
                    <Text>-0원</Text>
                  </SubText>
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    borderTop={`1px solid ${Theme.lightGrey2_C}`}
                    padding={`26px 0 0`}
                  >
                    <Text fontSize={`18px`}>총 결제금액</Text>
                    <Text fontSize={`24px`} fontWeight={`bold`}>
                      22,000원
                    </Text>
                  </Wrapper>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`100%`}
                    height={`54px`}
                    margin={`30px 0 10px`}
                    onClick={choiceModalToggle}
                  >
                    전체 상품 주문
                  </CommonButton>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    width={`100%`}
                    height={`54px`}
                    onClick={isModalToggle}
                  >
                    선택 상품 주문
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </RsWrapper>
          <Modal
            onCancel={choiceModalToggle}
            visible={choiceModal}
            footer={null}
            closable={null}
            width={`570px`}
          >
            <Wrapper padding={`20px`}>
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
                  의약품 구매 제한
                </Text>
                <Text
                  color={Theme.grey_C}
                  isHover
                  fontSize={`20px`}
                  onClick={choiceModalToggle}
                >
                  <CloseOutlined />
                </Text>
              </Wrapper>
              <Wrapper textAlign={`center`} margin={`50px 0 50px`}>
                <Text fontSize={width < 900 ? `16px` : `18px`}>
                  현재 선택한 의약품이 6개 초과되었습니다.
                </Text>
                <Text fontSize={width < 900 ? `16px` : `18px`}>
                  의약품 및 건강기능식품은 6개 이하 구매 가능합니다.
                </Text>
              </Wrapper>
              <CommonButton
                width={`240px`}
                height={`54px`}
                kindOf={`white`}
                fontSize={`18px`}
                fontWeight={`600`}
                onClick={choiceModalToggle}
              >
                다시 선택하기
              </CommonButton>
            </Wrapper>
          </Modal>

          <Modal
            onCancel={isModalToggle}
            visible={isModal}
            footer={null}
            closable={null}
            width={`570px`}
          >
            <Wrapper padding={`20px`}>
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
                  관부가세 안내
                </Text>
                <Text
                  color={Theme.grey_C}
                  isHover
                  fontSize={`20px`}
                  onClick={isModalToggle}
                >
                  <CloseOutlined />
                </Text>
              </Wrapper>
              <Wrapper
                margin={width < 900 ? `20PX 0 20PX` : `50px 0 20px`}
                textAlign={`center`}
              >
                <Text fontSize={width < 900 ? `16px` : `18px`}>
                  배송비를 제외한 총 결제금액이 150$를 초과하면 관부가세가
                  추가로 발생할 수 있습니다. (관부가세는 개별로 결제를 하셔야
                  합니다.)
                </Text>
              </Wrapper>
              <Wrapper
                dr={`row`}
                fontSize={`18px`}
                margin={width < 900 ? `0` : `0 0 30px`}
              >
                <Checkbox />
                <Text padding={`0 5px`}>이해했습니다.</Text>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <CommonButton
                width={`49%`}
                height={`54px`}
                kindOf={`grey`}
                fontSize={`18px`}
                fontWeight={`600`}
                onClick={isModalToggle}
              >
                이전으로
              </CommonButton>
              <CommonButton
                fontSize={width < 500 ? `16px` : `18px`}
                fontWeight={`600`}
                kindOf={`white`}
                width={`49%`}
                height={`54px`}
                onClick={isModalToggle}
              >
                상품 주문하기
              </CommonButton>
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

export default CartList;
