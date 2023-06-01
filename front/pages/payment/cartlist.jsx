import React, { useCallback, useEffect, useState } from "react";
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
import { Checkbox, Empty, Modal, message } from "antd";
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ITEM_DELETE_ALL_REQUEST,
  ITEM_LIST_VIEW_REQUEST,
  ITEM_UPDATE_REQUEST,
} from "../../reducers/wish";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas } from "../../components/commonUtils";
import { useRouter } from "next/router";

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
  const { me } = useSelector((state) => state.user);
  const {
    itemListView,
    //
    st_itemDeleteAllLoading,
    st_itemDeleteAllDone,
    st_itemDeleteAllError,
    //
    st_itemUpdateLoading,
    st_itemUpdateDone,
    st_itemUpdateError,
  } = useSelector((state) => state.wish);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [choiceModal, setChoiceModal] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const [selectCart, setSelectCart] = useState([]);

  // 총 상품금액
  const [totalPrice, setTotalPrice] = useState(0);
  // 총 무게
  const [totalWeight, setTotalWeight] = useState(0);
  // 총 배송비
  const [totalDelPrice, setTotalDelPrice] = useState(0);
  // 총 할인 금액
  const [totalDiscountPrice, setTotalDiscountPrice] = useState({
    delDiscountPrice: 0,
    userDiscountPrice: 0,
  });
  // 총 결제 금액
  const [totalBuyPrice, setTotalBuyPrice] = useState(0);

  ////// REDUX //////

  // 배송비 계산
  const weightDeliveryPrice = (weight) => {
    let price = 0;

    if (weight === 0.5) {
      price = 9900;
    } else if (weight > 0.5 && weight < 15.5) {
      price = 10000 + ((weight - 0.5) / 0.5) * 2000;
    } else {
      price = 70000 + ((weight - 15.5) / 0.5) * 1500;
    }

    return price;
  };

  ////// USEEFFECT //////

  // 금액 측정
  useEffect(() => {
    if (selectCart && me) {
      const wieghtDelPrice =
        selectCart.length > 0
          ? weightDeliveryPrice(
              selectCart
                .map((data) => data.productWeight)
                .reduce((a, b) => a + b)
            )
          : 0;

      // 총 상품긍맥
      setTotalPrice(
        selectCart.length > 0
          ? selectCart
              .map((data) => data.originRealPrice)
              .reduce((a, b) => a + b)
          : 0
      );

      // 총 무게
      setTotalWeight(
        selectCart.length > 0
          ? selectCart.map((data) => data.productWeight).reduce((a, b) => a + b)
          : 0
      );

      // 총 배송비
      setTotalDelPrice(wieghtDelPrice - wieghtDelPrice * (me.benefit / 100));

      // 총 할인 금액
      setTotalDiscountPrice({
        // 배송 할인금액
        delDiscountPrice: wieghtDelPrice * (me.benefit / 100),

        // 회원 할인 금액
        userDiscountPrice: 0,
      });
    }
  }, [selectCart, me]);

  // 총 결제 금액
  useEffect(() => {
    setTotalBuyPrice(
      totalPrice +
        totalDelPrice -
        (totalDiscountPrice.delDiscountPrice +
          totalDiscountPrice.userDiscountPrice)
    );
  }, [totalPrice, totalDelPrice, totalDiscountPrice]);

  // 전체 삭제 및 선택 삭제 후처리
  useEffect(() => {
    if (st_itemDeleteAllDone) {
      dispatch({
        type: ITEM_LIST_VIEW_REQUEST,
      });

      setSelectCart([]);

      return message.success("상품이 삭제되었습니다.");
    }

    if (st_itemDeleteAllError) {
      return message.error(st_itemDeleteAllError);
    }
  }, [st_itemDeleteAllDone, st_itemDeleteAllError]);

  // 상품 수량 수정
  useEffect(() => {
    if (st_itemUpdateDone) {
      dispatch({
        type: ITEM_LIST_VIEW_REQUEST,
      });

      setSelectCart([]);

      return message.success("상품 수량이 수정되었습니다.");
    }

    if (st_itemUpdateError) {
      return message.error(st_itemUpdateError);
    }
  }, [st_itemUpdateDone, st_itemUpdateError]);

  ////// TOGGLE //////
  const choiceModalToggle = useCallback(() => {
    setChoiceModal((prev) => !prev);
  }, [choiceModal]);

  const isModalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  ////// HANDLER //////

  // 상품 선택
  const selectCartHandler = useCallback(
    (data) => {
      let selectCartArr = selectCart.map((value) => value);

      if (selectCartArr.find((value) => value.id === data.id)) {
        setSelectCart(selectCartArr.filter((value) => value.id !== data.id));

        return;
      }

      selectCartArr.push(data);

      setSelectCart(selectCartArr);
    },
    [selectCart]
  );

  // 상품 전체 선택
  const selectAllCartHandler = useCallback(() => {
    if (selectCart.length > 0) {
      setSelectCart([]);
      return;
    }

    setSelectCart(itemListView.map((data) => data));
  }, [selectCart, itemListView]);

  // 전체 삭제 및 선택 삭제
  const itemDeleteHandler = useCallback(
    (type) => {
      if (st_itemDeleteAllLoading) {
        return;
      }

      // 전체 삭제
      if (type === 1) {
        dispatch({
          type: ITEM_DELETE_ALL_REQUEST,
          data: {
            itemIds: itemListView.map((value) => value.id),
          },
        });
      }
      // 선택 삭제
      else {
        if (!selectCart || selectCart.length === 0) {
          return message.info("상품을 선택해주세요.");
        }

        dispatch({
          type: ITEM_DELETE_ALL_REQUEST,
          data: {
            itemIds: selectCart.map((data) => data.id),
          },
        });
      }
    },
    [itemListView, selectCart, st_itemDeleteAllLoading]
  );

  // 전체상품주문 및 선택상품주문
  const orderHandler = useCallback(
    (type) => {
      // 전체상품주문
      if (type === 1) {
        sessionStorage.setItem("BMM_ORDER", JSON.stringify(itemListView));
        router.push("/payment");
      }
      // 선택상품주문
      else {
        sessionStorage.setItem("BMM_ORDER", JSON.stringify(selectCart));
        router.push("/payment");
      }
    },
    [selectCart, itemListView]
  );

  // 수량 변경
  const qunChnageHandler = useCallback(
    (id, qun) => {
      if (st_itemUpdateLoading) {
        return;
      }

      if (qun === 0) {
        return message.info("주문 수량을 더 줄일 수 없습니다.");
      }
      dispatch({
        type: ITEM_UPDATE_REQUEST,
        data: {
          id: id,
          qun: qun,
        },
      });
    },
    [st_itemUpdateLoading]
  );

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
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/next_breadcrambs.png`}
                  width={`5px`}
                />
                <Text color={Theme.lightGrey_C} margin={`0 6px`}>
                  주문서작성/결제
                </Text>
                <Image
                  alt="next icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/next_breadcrambs.png`}
                  width={`5px`}
                />
                <Text color={Theme.lightGrey_C} margin={`0 0 0 6px`}>
                  주문완료
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Wrapper
                width={width < 900 ? `100%` : `65%`}
                dr={`row`}
                ju={`space-between`}
                margin={`0 0 15px`}
              >
                <Checkbox
                  onClick={selectAllCartHandler}
                  checked={
                    selectCart &&
                    itemListView &&
                    (itemListView.length === 0
                      ? false
                      : selectCart.length === itemListView.length)
                  }
                >
                  <Text color={Theme.grey2_C}>전체 선택</Text>
                </Checkbox>
                <Wrapper width={`auto`} dr={`row`} color={Theme.grey2_C}>
                  <Text isHover onClick={() => itemDeleteHandler(1)}>
                    전체 삭제
                  </Text>
                  <Text fontSize={`10px`} margin={`0 8px`}>
                    |
                  </Text>
                  <Text isHover onClick={() => itemDeleteHandler(2)}>
                    선택 삭제
                  </Text>
                </Wrapper>
              </Wrapper>
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
                {itemListView &&
                  (itemListView.length === 0 ? (
                    <Wrapper margin={`30px 0`}>
                      <Empty description="장바구니에 담은 상품이 없습니다." />
                    </Wrapper>
                  ) : (
                    itemListView.map((data, idx) => {
                      return width < 1100 ? (
                        <Wrapper key={idx}>
                          <MobileList>
                            <Wrapper
                              dr={`row`}
                              ju={`flex-start`}
                              fontSize={`16px`}
                              fontWeight={`600`}
                              margin={`10px 0`}
                            >
                              <Checkbox
                                checked={selectCart.find(
                                  (value) => value.id === data.id
                                )}
                                onChange={() => selectCartHandler(data)}
                              />
                              <Text padding={`0 0 0 15px`}>
                                {data.productTitle}
                              </Text>
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
                                src={data.productThumbnail}
                                width={`80px`}
                                height={`80px`}
                              />
                              <Wrapper
                                width={`auto`}
                                al={`flex-start`}
                                padding={`0 0 0 10px`}
                              >
                                <Text>무게: {data.productWeight}kg</Text>
                                <Text fontWeight={`600`} margin={`2px 0 5px`}>
                                  상품금액: {data.realPrice}
                                </Text>
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
                                    height={`30px`}
                                    fontSize={`12px`}
                                  >
                                    <MinusOutlined />
                                  </Wrapper>
                                  <Wrapper
                                    width={`50px`}
                                    height={`30px`}
                                    fontWeight={`600`}
                                    color={Theme.darkGrey_C}
                                    borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                                    borderRight={`1px solid ${Theme.lightGrey2_C}`}
                                  >
                                    {data.qun}
                                  </Wrapper>
                                  <Wrapper
                                    width={`30px`}
                                    cursor={`pointer`}
                                    height={`30px`}
                                    fontSize={`12px`}
                                  >
                                    <PlusOutlined />
                                  </Wrapper>
                                </Wrapper>
                              </Wrapper>
                            </Wrapper>
                          </MobileList>
                        </Wrapper>
                      ) : (
                        <List key={idx}>
                          {console.log(data)}
                          <Checkbox
                            checked={selectCart.find(
                              (value) => value.id === data.id
                            )}
                            onChange={() => selectCartHandler(data)}
                          />
                          <Wrapper
                            width={`calc(100% - 16px - 127px - 127px - 127px)`}
                            dr={`row`}
                            ju={`space-between`}
                            padding={`0 0 0 14px`}
                          >
                            <Image
                              alt="thumbnail"
                              src={data.productThumbnail}
                              width={`64px`}
                              height={`64px`}
                            />
                            <Wrapper
                              width={`calc(100% - 70px)`}
                              al={`flex-start`}
                            >
                              <Text fontSize={`18px`} fontWeight={`600`}>
                                {data.productTitle}
                              </Text>
                              <Text fontSize={`14px`} color={Theme.grey2_C}>
                                {data.optionName}
                              </Text>
                            </Wrapper>
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
                                onClick={() =>
                                  qunChnageHandler(data.id, data.qun - 1)
                                }
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
                                {data.qun}
                              </Wrapper>
                              <Wrapper
                                width={`35px`}
                                cursor={`pointer`}
                                height={`35px`}
                                fontSize={`12px`}
                                onClick={() =>
                                  qunChnageHandler(data.id, data.qun + 1)
                                }
                              >
                                <PlusOutlined />
                              </Wrapper>
                            </Wrapper>
                          </Wrapper>
                          <Wrapper color={Theme.darkGrey_C} width={`127px`}>
                            {data.realPrice}
                          </Wrapper>
                          <Wrapper color={Theme.darkGrey_C} width={`127px`}>
                            {data.productWeight}kg
                          </Wrapper>
                        </List>
                      );
                    })
                  ))}
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
                    총 {selectCart.length}개의 상품
                  </Wrapper>

                  <BoxText fontSize={`18px`}>
                    <Text>총 상품금액</Text>
                    <Text fontWeight={`600`}>
                      {numberWithCommas(totalPrice)}원
                    </Text>
                  </BoxText>

                  <BoxText>
                    <Text>총 무게</Text>
                    <Text fontWeight={`600`}>{totalWeight}kg</Text>
                  </BoxText>
                  <BoxText>
                    <Text>총 배송비</Text>
                    <Text fontWeight={`600`}>
                      {numberWithCommas(totalDelPrice)}원
                    </Text>
                  </BoxText>
                  <BoxText margin={`0 0 13px`}>
                    <Text>총 할인금액</Text>
                    <Text fontWeight={`600`}>
                      {numberWithCommas(
                        totalDiscountPrice.delDiscountPrice +
                          totalDiscountPrice.userDiscountPrice
                      )}
                      원
                    </Text>
                  </BoxText>
                  <SubText>
                    <Text>ㄴ배송 할인금액</Text>
                    <Text>
                      -{numberWithCommas(totalDiscountPrice.delDiscountPrice)}원
                    </Text>
                  </SubText>
                  {/* <SubText>
                    <Text>ㄴ회원 할인금액(00%)</Text>
                    <Text>
                      -{numberWithCommas(totalDiscountPrice.userDiscountPrice)}
                      원
                    </Text>
                  </SubText> */}
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    borderTop={`1px solid ${Theme.lightGrey2_C}`}
                    padding={`26px 0 0`}
                  >
                    <Text fontSize={`18px`}>총 결제금액</Text>
                    <Text fontSize={`24px`} fontWeight={`bold`}>
                      {numberWithCommas(totalBuyPrice)}원
                    </Text>
                  </Wrapper>
                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`100%`}
                    height={`54px`}
                    margin={`30px 0 10px`}
                    onClick={() =>
                      selectCart &&
                      selectCart.length > 0 &&
                      selectCart
                        .map((data) => data.qun)
                        .reduce((a, b) => a + b) > 6
                        ? choiceModalToggle()
                        : orderHandler(1)
                    }
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
                margin={width < 900 ? `20px 0 20px` : `50px 0 20px`}
                fontSize={width < 900 ? `16px` : `18px`}
              >
                <Text>배송비를 제외한 총 결제금액이 150$를</Text>
                <Text>초과하면 관부가세가 추가로 발생할 수 있습니다.</Text>
                <Text>(관부가세는 개별로 결제를 하셔야 합니다.)</Text>
              </Wrapper>
              <Wrapper
                dr={`row`}
                fontSize={`18px`}
                margin={width < 900 ? `0` : `0 0 30px`}
              >
                <Checkbox />
                <Text padding={`0 5px`}>이해했습니다.</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <CommonButton
                  width={`49%`}
                  height={`54px`}
                  kindOf={`darkgrey`}
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
                  onClick={() => orderHandler(2)}
                >
                  상품 주문하기
                </CommonButton>
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

    context.store.dispatch({
      type: ITEM_LIST_VIEW_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default CartList;
