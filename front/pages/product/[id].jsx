import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  SquareBox,
  Text,
  WholeWrapper,
  Wrapper,
  TextArea,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { Drawer, Empty, message, Modal, Select } from "antd";
import styled from "styled-components";
import GallerySlider from "../../components/slide/GallerySlider";
import {
  CloseOutlined,
  MinusOutlined,
  PlusOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { PRODUCT_DETAIL_REQUEST } from "../../reducers/product";
import { LIKE_CREATE_REQUEST } from "../../reducers/like";
import { PRODUCT_REVIEW_REQUEST } from "../../reducers/review";
import { numberWithCommas } from "../../components/commonUtils";
import { ITEM_CREATE_REQUEST } from "../../reducers/wish";

const CustomSelect = styled(Wrapper)`
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height || `50px`};

  .ant-select {
    width: 100%;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  .ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector
    .ant-select-selection-search-input {
    width: 100%;
    height: ${(props) => props.height || `50px`};
    border: 1px solid ${(props) => props.theme.lightGrey2_C};
  }

  .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    width: 100%;
    line-height: ${(props) => props.height || `50px`};
  }

  .ant-select-selector {
    align-items: center !important;
  }
`;

const Tag = styled(Wrapper)`
  width: auto;
  border: 1px solid ${Theme.lightGrey2_C};
  height: 40px;
  border-radius: 20px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 600;
  color: ${Theme.lightGrey_C};
  margin: 0 10px 5px 0;
`;

const ProductWrapper = styled(Wrapper)`
  width: calc(100% / 5 - 18px);
  margin: 0 22px 0 0;
  align-items: flex-start;
  min-width: 250px;

  &:nth-child(5n) {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

const IFrameWrapper = styled(Wrapper)`
  width: 100%;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    display: block;
    padding-bottom: 56.25%;
  }

  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const List = styled(Wrapper)`
  height: 62px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;

  &:hover {
    cursor: pointer;
    border-bottom: 1px solid ${Theme.basicTheme_C};
  }
`;

const PictureWrapper = styled(Wrapper)`
  width: 111px;
  height: 111px;
  border: 1px solid ${Theme.lightGrey2_C};
  border-radius: 5%;
  background-color: ${Theme.lightGrey2_C};
  color: ${Theme.grey_C};
  cursor: pointer;

  &:hover {
    transition: 0.3s;
    background: ${(props) => props.theme.lightGrey3_C};
  }

  @media (max-width: 600px) {
    width: 150px;
    height: 150px;
  }
`;

const Circle = styled(Wrapper)`
  width: 15px;
  height: 15px;
  background: ${Theme.white_C};
  border-radius: 100%;
  color: ${Theme.red_C};
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 10px;

  &:hover {
    cursor: pointer;
    background: ${Theme.red_C};
    color: ${Theme.white_C};
  }
`;

const TextWrapper = styled(Wrapper)`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0 0 0 50px;
  font-size: 16px;

  @media (max-width: 700px) {
    width: 75%;
    padding: 0;
    font-size: 14px;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { productDetail } = useSelector((state) => state.product);
  const { st_likeCreateDone } = useSelector((state) => state.like);
  const { productReviewList } = useSelector((state) => state.review);
  const { items, st_itemCreateLoading, st_itemCreateDone, st_itemCreateError } =
    useSelector((state) => state.wish);

  const [reviewModal, setReviewModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [limitModal, setLimitModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [cModal, setCModal] = useState(false);
  const [option, setOption] = useState([]);
  const [selectOptionPrice, setSelectOptionPrice] = useState(0);

  const [isLikeState, setIsLikeState] = useState(false);

  const [buyType, setBuyType] = useState(null);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (router.query) {
      dispatch({
        type: PRODUCT_DETAIL_REQUEST,
        data: {
          ProductId: router.query.id,
        },
      });
      dispatch({
        type: PRODUCT_REVIEW_REQUEST,
        data: {
          ProductId: router.query.id,
        },
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (st_likeCreateDone) {
      dispatch({
        type: PRODUCT_DETAIL_REQUEST,
      });

      if (isLikeState) {
        message.success("찜목록에서 삭제되었습니다.");
      } else {
        message.success("찜목록에 추가되었습니다.");
      }
    }
  }, [st_likeCreateDone]);

  useEffect(() => {
    if (st_itemCreateDone) {
      if (buyType === 1) {
        setCartModal(true);
        setOption([]);
      } else {
        sessionStorage.setItem("BMM_ORDER", JSON.stringify(items));
        router.push("/payment");
      }
      return;
    }

    if (st_itemCreateError) {
      return message.error(st_itemCreateError);
    }
  }, [st_itemCreateDone, st_itemCreateError]);

  ////// TOGGLE //////

  const modalToggle = useCallback(() => {
    setIsModal((prev) => !prev);
  }, [isModal]);

  const cModalToggle = useCallback(() => {
    setCModal((prev) => !prev);
  }, [cModal]);

  const reviewModalToggle = useCallback(() => {
    setReviewModal((prev) => !prev);
  }, [reviewModal]);

  const mobileMenuToggle = useCallback(() => {
    setMobileMenu((prev) => !prev);
  }, [mobileMenu]);

  const cartModalToggle = useCallback(() => {
    setCartModal((prev) => !prev);
    setMobileMenu(false);
  }, [cartModal]);

  const limitModalToggle = useCallback(() => {
    setLimitModal((prev) => !prev);
  }, [limitModal]);

  ////// HANDLER //////
  const likeCreateHandler = useCallback(
    (data) => {
      if (me) {
        setIsLikeState(data.isLike);

        dispatch({
          type: LIKE_CREATE_REQUEST,
          data: {
            ProductId: data.id,
          },
        });
      } else {
        message.error("로그인이 필요한 서비스입니다.");
      }
    },
    [isLikeState]
  );

  // 옵션 선택
  const optionClickHandler = useCallback(
    (optionId) => {
      if (!optionId) {
        return;
      } else {
        const duple = option.find(
          (item) => parseInt(item.id) === parseInt(optionId)
        );

        if (duple) {
          return message.info("이미 선택한 상품입니다.");
        } else {
          let targetData = productDetail.optionList.find(
            (item) => parseInt(item.id) === parseInt(optionId)
          );

          targetData = { ...targetData, cnt: 1 };

          setOption(option.concat(targetData));
        }
      }

      //TODO -> clear select
    },
    [productDetail, option]
  );

  useEffect(() => {
    let num = 0;

    if (option.length !== 0) {
      option.map((item) => (num += item.price * item.cnt));
    }

    setSelectOptionPrice(num);
  }, [option]);

  // 갯수 선택
  const quantityHandler = useCallback(
    (type, item) => {
      if (type === 1) {
        if (item.cnt < 2) {
          return message.info("1개 보다 적게 구매할 수 없습니다.");
        } else {
          const nextCnt = item.cnt - 1;
          const nextItem = { ...item, cnt: nextCnt };

          const findIndex = option.findIndex(
            (element) => parseInt(element.id) == parseInt(item.id)
          );
          let copyArray = [...option];

          copyArray[findIndex] = { ...copyArray[findIndex], cnt: nextCnt };

          setOption(copyArray);
        }
      }

      if (type === 2) {
        if (
          parseInt(item.cnt) >=
          parseInt(productDetail.detailData.buyMaxLimitCount)
        ) {
          return message.info("최대 구매수량을 확인해주세요.");
        } else {
          const nextCnt = item.cnt + 1;

          const findIndex = option.findIndex(
            (element) => parseInt(element.id) == parseInt(item.id)
          );
          let copyArray = [...option];

          copyArray[findIndex] = { ...copyArray[findIndex], cnt: nextCnt };

          setOption(copyArray);
        }
      }
    },
    [option, productDetail]
  );

  // 옵션 삭제
  const removeOptionItem = useCallback(
    (targetItem) => {
      setOption(option.filter((item) => item.id !== targetItem.id));
    },
    [option]
  );

  // 장바구니 담기
  const itemCreateHandler = useCallback(
    (type) => {
      if (!me) {
        router.push("/user/login");
        return message.error("로그인 후 이용해주세요.");
      }

      if (!productDetail) {
        return message.error("잠시 후 다시 시도해주세요.");
      }

      if (!option || option.length === 0) {
        return message.info("상품을 선택해주세요.");
      }

      setBuyType(type);

      dispatch({
        type: ITEM_CREATE_REQUEST,
        data: {
          ProductId: productDetail.detailData.id,
          productPrice: productDetail.detailData.marketPrice,
          productDiscount: productDetail.detailData.discount,
          productTitle: productDetail.detailData.title,
          productThumbnail: productDetail.detailData.thumbnail1,
          productWeight: productDetail.detailData.weight,
          optionList: option.map((data) => ({
            optionName: data.value,
            optionPrice: data.price,
            optionId: data.id,
            qun: data.cnt,
          })),
        },
      });
    },
    [productDetail, me, option]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 상품</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 800 ? `50px 0 0` : `95px 0 0`}>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Text
                fontSize={width < 800 ? `22px` : `34px`}
                fontWeight={`bold`}
              >
                {productDetail && productDetail.detailData.upCategoryValue}
              </Text>
              <Wrapper dr={`row`} width={`auto`}>
                <Image
                  alt="home icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/home.png`}
                  width={`12px`}
                />
                <Text color={Theme.grey_C} margin={`0 6px`}>
                  HOME
                </Text>
                <Image
                  alt="next icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/next.png`}
                  width={`5px`}
                />
                <Text color={Theme.grey_C} margin={`0 6px`}>
                  {productDetail && productDetail.detailData.upCategoryValue}
                </Text>
                <Image
                  alt="next icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/next.png`}
                  width={`5px`}
                />
                <Text color={Theme.grey_C} margin={`0 0 0 6px`}>
                  {productDetail && productDetail.detailData.downCategoryValue}
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} margin={`30px 0 50px`} al={`flex-start`}>
              <Wrapper
                width={width < 900 ? `100%` : `50%`}
                padding={width < 900 ? `0 0 50px` : `0 80px 0 0`}
              >
                <GallerySlider
                  datum={productDetail && productDetail.detailData}
                />
              </Wrapper>
              <Wrapper width={width < 900 ? `100%` : `50%`} al={`flex-start`}>
                <Text
                  fontSize={width < 900 ? `20px` : `28px`}
                  fontWeight={`600`}
                >
                  {productDetail && productDetail.detailData.title}
                </Text>
                <Text
                  fontSize={width < 900 ? `15px` : `18px`}
                  margin={`10px 0 28px`}
                  color={Theme.darkGrey_C}
                >
                  {productDetail && productDetail.detailData.description}
                </Text>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  height={`40px`}
                  fontSize={width < 900 ? `14px` : `16px`}
                >
                  <Text width={`116px`} color={Theme.grey_C}>
                    시중가
                  </Text>
                  <Text margin={`0 0 0 14px`} color={Theme.darkGrey_C}>
                    {productDetail &&
                      productDetail.detailData.concatMarketPrice}
                  </Text>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  height={`40px`}
                  fontSize={width < 900 ? `14px` : `16px`}
                >
                  <Text width={`116px`} color={Theme.grey_C}>
                    회원가
                  </Text>
                  <Text margin={`0 0 0 14px`} color={Theme.darkGrey_C}>
                    {productDetail &&
                      productDetail.detailData.concatMemberPrice}
                  </Text>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  height={`40px`}
                  fontSize={width < 900 ? `14px` : `16px`}
                >
                  <Text width={`116px`} color={Theme.grey_C}>
                    브랜드
                  </Text>
                  <Text margin={`0 0 0 14px`} color={Theme.darkGrey_C}>
                    {productDetail && productDetail.detailData.brandName}
                  </Text>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  height={`40px`}
                  fontSize={width < 900 ? `14px` : `16px`}
                >
                  <Text width={`116px`} color={Theme.grey_C}>
                    무게
                  </Text>
                  <Text margin={`0 0 0 14px`} color={Theme.darkGrey_C}>
                    {productDetail && productDetail.detailData.concatWeight}
                  </Text>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  height={`40px`}
                  fontSize={width < 900 ? `14px` : `16px`}
                >
                  <Text width={`116px`} color={Theme.grey_C}>
                    구매 제한
                  </Text>
                  <Text margin={`0 0 0 14px`} color={Theme.darkGrey_C}>
                    {productDetail &&
                      productDetail.detailData.viewBuyLimitCount}
                  </Text>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`15px 0`}
                  fontSize={width < 900 ? `20px` : `26px`}
                >
                  <Text fontWeight={`bold`} color={Theme.red_C}>
                    {productDetail && productDetail.detailData.viewDiscount}
                  </Text>
                  <Wrapper width={`auto`} dr={`row`}>
                    <Text className="line" color={Theme.lightGrey_C}>
                      {productDetail &&
                        productDetail.detailData.concatMarketPrice}
                    </Text>
                    <Text fontWeight={`600`} margin={`0 0 0 10px`}>
                      {productDetail && productDetail.detailData.realPrice}
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  borderTop={`1px solid ${Theme.lightGrey2_C}`}
                  padding={`20px 0 12px`}
                >
                  <CustomSelect>
                    <Select
                      value={null}
                      allowClear
                      placeholder="상품을 선택해주세요."
                      onChange={optionClickHandler}
                    >
                      {productDetail &&
                      productDetail.optionList.length === 0 ? (
                        <Select.Option value="">옵션이 없습니다.</Select.Option>
                      ) : (
                        productDetail &&
                        productDetail.optionList.map((data) => {
                          return (
                            <Select.Option key={data.id} value={data.id}>
                              {data.value}
                            </Select.Option>
                          );
                        })
                      )}
                    </Select>
                  </CustomSelect>
                </Wrapper>

                {option.length !== 0
                  ? option.map((item) => {
                      return (
                        <Wrapper
                          key={item.id}
                          padding={`20px`}
                          bgColor={Theme.lightGrey3_C}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          radius={`2px`}
                          al={`flex-start`}
                          margin={`0 0 30px`}
                        >
                          <Text
                            fontSize={width < 900 ? `15px` : `18px`}
                            fontWeight={`600`}
                            color={Theme.grey_C}
                            margin={`0 0 20px`}
                          >
                            {item.value}
                          </Text>
                          <Wrapper dr={`row`} ju={`space-between`}>
                            <Wrapper
                              width={`auto`}
                              dr={`row`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              bgColor={Theme.white_C}
                            >
                              <Wrapper
                                onClick={() => quantityHandler(1, item)}
                                width={`35px`}
                                cursor={`pointer`}
                                height={`35px`}
                                fontSize={`12px`}
                              >
                                <MinusOutlined />
                              </Wrapper>
                              <Wrapper
                                width={`68px`}
                                height={`35px`}
                                fontSize={width < 900 ? `14px` : `16px`}
                                fontWeight={`600`}
                                color={Theme.darkGrey_C}
                                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                                borderRight={`1px solid ${Theme.lightGrey2_C}`}
                              >
                                {item.cnt}
                              </Wrapper>
                              <Wrapper
                                onClick={() => quantityHandler(2, item)}
                                width={`35px`}
                                cursor={`pointer`}
                                height={`35px`}
                                fontSize={`12px`}
                              >
                                <PlusOutlined />
                              </Wrapper>
                            </Wrapper>

                            <Wrapper dr={`row`} width={`auto`}>
                              <Text
                                fontSize={width < 900 ? `15px` : `20px`}
                                fontWeight={`600`}
                              >
                                {numberWithCommas(item.price * item.cnt)}원
                              </Text>
                              <Text
                                isHover
                                margin={`0 0 0 10px`}
                                fontSize={width < 900 ? `15px` : `18px`}
                              >
                                <CloseOutlined
                                  onClick={() => removeOptionItem(item)}
                                />
                              </Text>
                            </Wrapper>
                          </Wrapper>
                        </Wrapper>
                      );
                    })
                  : null}

                <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 30px`}>
                  <Text
                    fontSize={width < 900 ? `15px` : `18px`}
                    fontWeight={`600`}
                  >
                    총 상품금액
                  </Text>
                  <Text
                    fontSize={width < 900 ? `20px` : `32px`}
                    fontWeight={`bold`}
                  >
                    {productDetail &&
                      numberWithCommas(
                        productDetail.detailData.calcPrice + selectOptionPrice
                      )}
                    원
                  </Text>
                </Wrapper>

                <Wrapper dr={`row`} ju={`space-between`}>
                  <CommonButton
                    width={`54px`}
                    height={`54px`}
                    padding={`0`}
                    kindOf={`darkgrey`}
                    fontSize={width < 900 ? `15px` : `20px`}
                  >
                    {productDetail && productDetail.detailData.isLike === 0 ? (
                      <Image
                        onClick={() =>
                          likeCreateHandler(
                            productDetail && productDetail.detailData
                          )
                        }
                        alt="heart icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/heart.png`}
                        width={`24px`}
                      />
                    ) : (
                      <Image
                        onClick={() =>
                          likeCreateHandler(
                            productDetail && productDetail.detailData
                          )
                        }
                        alt="heart icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/heart_A.png`}
                        width={`24px`}
                      />
                    )}
                  </CommonButton>

                  <CommonButton
                    width={`calc((100% - 74px) / 2)`}
                    height={`54px`}
                    kindOf={`darkgrey`}
                    fontSize={width < 900 ? `15px` : `18px`}
                    fontWeight={`600`}
                    // onClick={cartModalToggle}
                    onClick={() => itemCreateHandler(1)}
                    loading={st_itemCreateLoading}
                  >
                    장바구니
                  </CommonButton>
                  <CommonButton
                    width={`calc((100% - 74px) / 2)`}
                    height={`54px`}
                    kindOf={`white`}
                    fontSize={width < 900 ? `15px` : `18px`}
                    fontWeight={`600`}
                    onClick={() => itemCreateHandler(2)}
                    loading={st_itemCreateLoading}
                  >
                    바로구매
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-start`}>
              <Text fontSize={width < 900 ? `20px` : `28px`} fontWeight={`600`}>
                검색 태그
              </Text>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`30px 0 80px`}>
                {productDetail && productDetail.searchTagList.length === 0 ? (
                  <Wrapper>조회된 검색태그가 없습니다.</Wrapper>
                ) : (
                  productDetail &&
                  productDetail.searchTagList &&
                  productDetail.searchTagList.map((data) => {
                    return <Tag key={data.id}>{data.value}</Tag>;
                  })
                )}
              </Wrapper>
            </Wrapper>
            <Wrapper al={`flex-start`}>
              <Text fontSize={width < 900 ? `20px` : `28px`} fontWeight={`600`}>
                관련 상품
              </Text>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                margin={`30px 0 80px`}
                overflow={`auto`}
                wrap={`nowrap`}
              >
                {productDetail &&
                  (productDetail.relateProductList &&
                  productDetail.relateProductList.length === 0 ? (
                    <Wrapper>
                      <Empty description="조회된 관련 상품이 없습니다." />
                    </Wrapper>
                  ) : (
                    productDetail.relateProductList.map((data) => {
                      return (
                        <ProductWrapper key={data.id}>
                          <SquareBox>
                            <Image alt="product" src={data.thumbnail1} />
                          </SquareBox>
                        </ProductWrapper>
                      );
                    })
                  ))}
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              position={`relative`}
              al={`flex-start`}
              padding={`0 0 100px`}
            >
              <Wrapper
                width={width < 1100 ? `100%` : `calc(100% - 400px)`}
                padding={width < 1100 ? `0` : `0 40px 0 0`}
              >
                <Wrapper
                  borderTop={`1px solid ${Theme.basicTheme_C}`}
                  height={`54px`}
                  borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                  bgColor={Theme.lightGrey3_C}
                  dr={`row`}
                  margin={`0 0 50px`}
                  fontWeight={`600`}
                  fontSize={width < 900 ? `15px` : `18px`}
                >
                  <Wrapper
                    width={`calc(100% / 3)`}
                    onClick={() => setCurrentTab(0)}
                    color={currentTab === 0 ? Theme.black_C : Theme.lightGrey_C}
                  >
                    <Text isHover>상품정보</Text>
                  </Wrapper>
                  <Wrapper
                    width={`calc(100% / 3)`}
                    onClick={() => setCurrentTab(1)}
                    color={currentTab === 1 ? Theme.black_C : Theme.lightGrey_C}
                  >
                    <Text isHover>배송/교환/반품</Text>
                  </Wrapper>
                  <Wrapper
                    width={`calc(100% / 3)`}
                    onClick={() => setCurrentTab(2)}
                    color={currentTab === 2 ? Theme.black_C : Theme.lightGrey_C}
                  >
                    <Text isHover>상품리뷰</Text>
                  </Wrapper>
                </Wrapper>
                {currentTab === 0 && (
                  <Wrapper>
                    <IFrameWrapper>
                      <iframe
                        width={`100%`}
                        height={`100%`}
                        frameborder="0"
                        src={
                          productDetail && productDetail.detailData.youtubeLink
                        }
                      />
                    </IFrameWrapper>
                    <Image
                      margin={`50px 0`}
                      alt="image"
                      src={
                        productDetail && productDetail.detailData.detailImage
                      }
                    />
                    <Wrapper
                      borderTop={`1px solid ${Theme.grey2_C}`}
                      fontSize={width < 900 ? `14px` : `16px`}
                      color={Theme.darkGrey_C}
                    >
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                      >
                        <Wrapper
                          height={width < 900 ? `50px` : `60px`}
                          width={width < 900 ? `100%` : `200px`}
                          bgColor={Theme.lightGrey3_C}
                          padding={width < 900 ? `0 10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          상품명
                        </Wrapper>
                        <Wrapper
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `0 22px`}
                        >
                          {productDetail && productDetail.detailData.title}
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                      >
                        <Wrapper
                          height={width < 900 ? `50px` : `60px`}
                          width={width < 900 ? `100%` : `200px`}
                          bgColor={Theme.lightGrey3_C}
                          padding={width < 900 ? `0 10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          용량, 크기, 수량
                        </Wrapper>
                        <Wrapper
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `0 22px`}
                        >
                          {productDetail &&
                            productDetail.detailData.concatWeight}
                          ,
                          {productDetail &&
                            productDetail.detailData.viewBuyLimitCount}
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                      >
                        <Wrapper
                          height={width < 900 ? `50px` : `60px`}
                          width={width < 900 ? `100%` : `200px`}
                          bgColor={Theme.lightGrey3_C}
                          padding={width < 900 ? `0 10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          원산지
                        </Wrapper>
                        <Wrapper
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `0 22px`}
                        >
                          {productDetail && productDetail.detailData.origin}
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                      >
                        <Wrapper
                          height={width < 900 ? `50px` : `60px`}
                          width={width < 900 ? `100%` : `200px`}
                          bgColor={Theme.lightGrey3_C}
                          padding={width < 900 ? `0 10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          제조사/책임판매원
                        </Wrapper>
                        <Wrapper
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `0 22px`}
                        >
                          {productDetail &&
                            productDetail.detailData.madeCompany}
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                      >
                        <Wrapper
                          height={width < 900 ? `50px` : `60px`}
                          width={width < 900 ? `100%` : `200px`}
                          bgColor={Theme.lightGrey3_C}
                          padding={width < 900 ? `0 10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          생산자 및 소재지
                        </Wrapper>
                        <Wrapper
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `0 22px`}
                        >
                          {productDetail && productDetail.detailData.location}
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                      >
                        <Wrapper
                          height={width < 900 ? `50px` : `60px`}
                          width={width < 900 ? `100%` : `200px`}
                          bgColor={Theme.lightGrey3_C}
                          padding={width < 900 ? `0 10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          사용방법
                        </Wrapper>
                        <Wrapper
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `0 22px`}
                        >
                          {productDetail && productDetail.detailData.howToUse}
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                      >
                        <Wrapper
                          height={width < 900 ? `50px` : `60px`}
                          width={width < 900 ? `100%` : `200px`}
                          bgColor={Theme.lightGrey3_C}
                          padding={width < 900 ? `0 10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          제조연월일 및 사용기한
                        </Wrapper>
                        <Wrapper
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `0 22px`}
                        >
                          {productDetail && productDetail.detailData.madeDate}
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                      >
                        <Wrapper
                          height={width < 900 ? `50px` : `60px`}
                          width={width < 900 ? `100%` : `200px`}
                          bgColor={Theme.lightGrey3_C}
                          padding={width < 900 ? `0 10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          보관방법/취급방법
                        </Wrapper>
                        <Wrapper
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `0 22px`}
                        >
                          {productDetail && productDetail.detailData.howToKeep}
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                      >
                        <Wrapper
                          height={width < 900 ? `50px` : `60px`}
                          width={width < 900 ? `100%` : `200px`}
                          bgColor={Theme.lightGrey3_C}
                          padding={width < 900 ? `0 10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          고객센터 전화번호
                        </Wrapper>
                        <Wrapper
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `0 22px`}
                        >
                          {productDetail && productDetail.detailData.tel}
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                      >
                        <Wrapper
                          height={width < 900 ? `50px` : `60px`}
                          width={width < 900 ? `100%` : `200px`}
                          bgColor={Theme.lightGrey3_C}
                          padding={width < 900 ? `0 10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          주의사항
                        </Wrapper>
                        <Wrapper
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `0 22px`}
                        >
                          <Text>
                            {productDetail && productDetail.detailData.warning}
                          </Text>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                )}
                {currentTab === 1 && (
                  <Wrapper>
                    <Wrapper
                      borderTop={`1px solid ${Theme.grey2_C}`}
                      fontSize={width < 900 ? `14px` : `16px`}
                      color={Theme.darkGrey_C}
                    >
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                        bgColor={Theme.lightGrey3_C}
                      >
                        <Wrapper
                          width={width < 900 ? `100%` : `200px`}
                          padding={width < 900 ? `10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          배송가능 지역
                        </Wrapper>
                        <Wrapper
                          bgColor={Theme.white_C}
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `20px 22px`}
                        >
                          <Text>
                            {productDetail &&
                              productDetail.detailData.canDeliveryArea}
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                        bgColor={Theme.lightGrey3_C}
                      >
                        <Wrapper
                          width={width < 900 ? `100%` : `200px`}
                          padding={width < 900 ? `10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          배송비
                        </Wrapper>
                        <Wrapper
                          bgColor={Theme.white_C}
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `20px 22px`}
                        >
                          <Text>· 해당 내용이 들어오는 곳입니다.</Text>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                        bgColor={Theme.lightGrey3_C}
                      >
                        <Wrapper
                          width={width < 900 ? `100%` : `200px`}
                          padding={width < 900 ? `10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          관부가세 안내
                        </Wrapper>
                        <Wrapper
                          bgColor={Theme.white_C}
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `20px 22px`}
                        >
                          <Text>
                            {productDetail &&
                              productDetail.detailData.customInfo}
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey3_C}`}
                        bgColor={Theme.lightGrey3_C}
                      >
                        <Wrapper
                          width={width < 900 ? `100%` : `200px`}
                          padding={width < 900 ? `10px` : `0 20px`}
                          al={`flex-start`}
                          fontWeight={`600`}
                        >
                          환불 안내
                        </Wrapper>
                        <Wrapper
                          bgColor={Theme.white_C}
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `20px 22px`}
                        >
                          <Text>
                            {productDetail &&
                              productDetail.detailData.refundInfo}
                          </Text>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                )}
                {currentTab === 2 && (
                  <Wrapper>
                    <Text
                      fontSize={width < 900 ? `18px` : `22px`}
                      fontWeight={`600`}
                    >
                      리뷰를 작성하시면 포인트를 드립니다.
                    </Text>
                    <Text
                      fontSize={width < 900 ? `14px` : `16px`}
                      color={Theme.grey_C}
                      margin={`12px 0 25px`}
                    >
                      사진 리뷰 등록 : 000p, 일반 리뷰 등록 : 00p
                    </Text>
                    <CommonButton
                      kindOf={`white`}
                      width={`160px`}
                      height={`48px`}
                      fontSize={width < 900 ? `15px` : `18px`}
                      fontWeight={`600`}
                      onClick={cModalToggle}
                    >
                      리뷰 작성하기
                    </CommonButton>

                    <Wrapper
                      borderTop={`1px solid ${Theme.lightGrey_C}`}
                      margin={`60px 0 0`}
                    >
                      <List onClick={modalToggle}>
                        <TextWrapper>
                          <Text
                            maxWidth={width < 700 ? `80%` : `52%`}
                            isEllipsis
                            isHover
                          >
                            리뷰의 내용이 30자로 들어오게 됩니다. 제목의 역할을
                            하게 됩니다. 내용이 더 들어오게 된다면 이렇게
                            나타납니다. 내용이 더 들어오게 된다면 이렇게
                            나타납니다. 내용이 더 들어오게 된다면 이렇게
                            나타납니다. 내용이 더 들어오게 된다면 이렇게
                            나타납니다.
                          </Text>
                          <Wrapper width={`auto`} color={Theme.lightGrey_C}>
                            <PictureOutlined />
                          </Wrapper>
                        </TextWrapper>
                        <Wrapper
                          width={width < 700 ? `25%` : `15%`}
                          color={Theme.lightGrey_C}
                        >
                          2022.12.31
                        </Wrapper>
                      </List>

                      {isModal && (
                        <Wrapper
                          bgColor={Theme.lightGrey3_C}
                          padding={width < 700 ? `15px` : `30px`}
                        >
                          <Wrapper
                            dr={`row`}
                            ju={`space-between`}
                            padding={`0 0 14px`}
                            color={Theme.lightGrey_C}
                          >
                            <Text fontSize={width < 900 ? `14px` : `16px`}>
                              작성자 : imnickname
                            </Text>
                            <Text>2022.12.21</Text>
                          </Wrapper>
                          <Wrapper dr={`row`} ju={`flex-start`}>
                            <Image
                              alt="리뷰 사진"
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                              width={width < 700 ? `95px` : `122px`}
                              height={width < 700 ? `95px` : `122px`}
                              margin={`0 11px 10px 0`}
                            />
                            <Image
                              alt="리뷰 사진"
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                              width={width < 700 ? `95px` : `122px`}
                              height={width < 700 ? `95px` : `122px`}
                              margin={`0 11px 10px 0`}
                            />
                            <Image
                              alt="리뷰 사진"
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                              width={width < 700 ? `95px` : `122px`}
                              height={width < 700 ? `95px` : `122px`}
                              margin={`0 11px 10px 0`}
                            />
                            <Image
                              alt="리뷰 사진"
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                              width={width < 700 ? `95px` : `122px`}
                              height={width < 700 ? `95px` : `122px`}
                              margin={`0 11px 10px 0`}
                            />
                          </Wrapper>

                          <Wrapper
                            margin={`0 0 30px`}
                            color={Theme.grey_C}
                            fontSize={width < 900 ? `14px` : `16px`}
                          >
                            <Text>
                              리뷰의 내용이 30자로 들어오게 됩니다. 제목의
                              역할을 하게 됩니다. 내용이 더 들어오게 된다면
                              이렇게 나타납니다. 내용이 더 들어오게 된다면
                              이렇게 나타납니다. 내용이 더 들어오게 된다면
                              이렇게 나타납니다. 내용이 더 들어오게 된다면
                              이렇게 나타납니다.
                            </Text>
                          </Wrapper>
                          <Wrapper al={`flex-end`}>
                            <Text
                              onClick={modalToggle}
                              fontSize={width < 900 ? `14px` : `16px`}
                              fontWeight={`600`}
                              color={Theme.lightGrey_C}
                              isHover
                            >
                              닫기 <CloseOutlined />
                            </Text>
                          </Wrapper>
                        </Wrapper>
                      )}
                    </Wrapper>
                  </Wrapper>
                )}
              </Wrapper>
              <Wrapper
                display={width < 1100 ? `none` : `flex`}
                width={`400px`}
                bgColor={Theme.lightGrey3_C}
                border={`1px solid ${Theme.lightGrey2_C}`}
                padding={`30px 20px`}
                position={`sticky`}
                top={`200px`}
                right={`0`}
                al={`flex-start`}
              >
                <Text
                  fontSize={width < 900 ? `15px` : `20px`}
                  fontWeight={`600`}
                  margin={`0 0 18px`}
                >
                  {productDetail && productDetail.detailData.title}
                </Text>
                <CustomSelect>
                  <Select
                    value={null}
                    allowClear
                    placeholder="상품을 선택해주세요."
                    onChange={optionClickHandler}
                  >
                    {productDetail && productDetail.optionList.length === 0 ? (
                      <Select.Option value="">옵션이 없습니다.</Select.Option>
                    ) : (
                      productDetail &&
                      productDetail.optionList.map((data) => {
                        return (
                          <Select.Option key={data.id} value={data.id}>
                            {data.value}
                          </Select.Option>
                        );
                      })
                    )}
                  </Select>
                </CustomSelect>

                {option.length !== 0
                  ? option.map((item) => {
                      return (
                        <Wrapper
                          bgColor={Theme.white_C}
                          padding={`20px`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          margin={`12px 0 26px`}
                          al={`flex-start`}
                        >
                          <Text
                            fontSize={width < 900 ? `15px` : `18px`}
                            fontWeight={`600`}
                            margin={`0 0 18px`}
                          >
                            {item.value}
                          </Text>
                          <Wrapper dr={`row`} ju={`space-between`}>
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
                                onClick={() => quantityHandler(1, item)}
                              >
                                <MinusOutlined />
                              </Wrapper>
                              <Wrapper
                                width={`68px`}
                                height={`35px`}
                                fontSize={width < 900 ? `14px` : `16px`}
                                fontWeight={`600`}
                                color={Theme.darkGrey_C}
                                borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                                borderRight={`1px solid ${Theme.lightGrey2_C}`}
                              >
                                {item.cnt}
                              </Wrapper>
                              <Wrapper
                                width={`35px`}
                                cursor={`pointer`}
                                height={`35px`}
                                fontSize={`12px`}
                                onClick={() => quantityHandler(2, item)}
                              >
                                <PlusOutlined />
                              </Wrapper>
                            </Wrapper>

                            <Wrapper dr={`row`} width={`auto`}>
                              <Text
                                fontSize={width < 900 ? `15px` : `20px`}
                                fontWeight={`600`}
                              >
                                {numberWithCommas(item.price * item.cnt)}원
                              </Text>
                              <Text
                                isHover
                                margin={`0 0 0 10px`}
                                fontSize={width < 900 ? `15px` : `18px`}
                                onClick={() => removeOptionItem(item)}
                              >
                                <CloseOutlined />
                              </Text>
                            </Wrapper>
                          </Wrapper>
                        </Wrapper>
                      );
                    })
                  : null}

                <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 30px`}>
                  <Text
                    fontSize={width < 900 ? `15px` : `18px`}
                    fontWeight={`600`}
                  >
                    총 결제금액
                  </Text>
                  <Text
                    fontSize={width < 900 ? `20px` : `32px`}
                    fontWeight={`bold`}
                  >
                    {productDetail &&
                      numberWithCommas(
                        productDetail.detailData.calcPrice + selectOptionPrice
                      )}
                    원
                  </Text>
                </Wrapper>
                <CommonButton
                  width={`100%`}
                  height={`54px`}
                  kindOf={`white`}
                  fontSize={width < 900 ? `15px` : `18px`}
                  fontWeight={`600`}
                  margin={`0 0 10px`}
                  onClick={() => itemCreateHandler(2)}
                  loading={st_itemCreateLoading}
                >
                  바로구매
                </CommonButton>
                <CommonButton
                  width={`100%`}
                  height={`54px`}
                  kindOf={`darkgrey`}
                  fontSize={width < 900 ? `15px` : `18px`}
                  fontWeight={`600`}
                  // onClick={cartModalToggle}
                  onClick={() => itemCreateHandler(1)}
                  loading={st_itemCreateLoading}
                >
                  장바구니
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </RsWrapper>
          <Wrapper
            display={width < 900 ? `flex` : `none`}
            position={`fixed`}
            bottom={`0`}
            left={`0`}
            dr={`row`}
            ju={`space-between`}
            zIndex={`100`}
            bgColor={Theme.white_C}
            padding={`5px`}
          >
            <CommonButton
              width={`calc(100% - 64px)`}
              height={`54px`}
              kindOf={`white`}
              fontWeight={`600`}
              onClick={mobileMenuToggle}
            >
              구매하기
            </CommonButton>
            <CommonButton
              width={`54px`}
              height={`54px`}
              padding={`0`}
              kindOf={`darkgrey`}
              fontSize={width < 900 ? `15px` : `20px`}
            >
              <Image
                alt="heart icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/heart.png`}
                width={`24px`}
              />

              {/* 색칠된 하트
                    <Image
                      alt="heart icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/heart_A.png`}
                      width={`24px`}
                    /> */}
            </CommonButton>
          </Wrapper>
          <Drawer
            visible={mobileMenu}
            onClose={mobileMenuToggle}
            placement={`bottom`}
            height={`auto`}
          >
            <Wrapper>
              <Text
                fontSize={width < 900 ? `15px` : `20px`}
                fontWeight={`600`}
                margin={`0 0 18px`}
              >
                {productDetail && productDetail.detailData.title}
              </Text>
              <CustomSelect>
                <Select
                  value={null}
                  allowClear
                  placeholder="상품을 선택해주세요."
                  onChange={optionClickHandler}
                >
                  {productDetail && productDetail.optionList.length === 0 ? (
                    <Select.Option value="">옵션이 없습니다.</Select.Option>
                  ) : (
                    productDetail &&
                    productDetail.optionList.map((data) => {
                      return (
                        <Select.Option key={data.id} value={data.id}>
                          {data.value}
                        </Select.Option>
                      );
                    })
                  )}
                </Select>
              </CustomSelect>

              {option.length !== 0
                ? option.map((item) => {
                    return (
                      <Wrapper
                        bgColor={Theme.white_C}
                        padding={`20px`}
                        border={`1px solid ${Theme.lightGrey2_C}`}
                        margin={`12px 0 26px`}
                        al={`flex-start`}
                      >
                        <Text
                          fontSize={width < 900 ? `15px` : `18px`}
                          fontWeight={`600`}
                          margin={`0 0 18px`}
                        >
                          {item.value}
                        </Text>
                        <Wrapper dr={`row`} ju={`space-between`}>
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
                              onClick={() => quantityHandler(1, item)}
                            >
                              <MinusOutlined />
                            </Wrapper>
                            <Wrapper
                              width={`68px`}
                              height={`35px`}
                              fontSize={width < 900 ? `14px` : `16px`}
                              fontWeight={`600`}
                              color={Theme.darkGrey_C}
                              borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                              borderRight={`1px solid ${Theme.lightGrey2_C}`}
                            >
                              {item.cnt}
                            </Wrapper>
                            <Wrapper
                              width={`35px`}
                              cursor={`pointer`}
                              height={`35px`}
                              fontSize={`12px`}
                              onClick={() => quantityHandler(2, item)}
                            >
                              <PlusOutlined />
                            </Wrapper>
                          </Wrapper>

                          <Wrapper dr={`row`} width={`auto`}>
                            <Text
                              fontSize={width < 900 ? `15px` : `20px`}
                              fontWeight={`600`}
                            >
                              {numberWithCommas(item.price * item.cnt)}원
                            </Text>
                            <Text
                              isHover
                              margin={`0 0 0 10px`}
                              fontSize={width < 900 ? `15px` : `18px`}
                              onClick={() => removeOptionItem(item)}
                            >
                              <CloseOutlined />
                            </Text>
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                    );
                  })
                : null}

              <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 20px`}>
                <Text
                  fontSize={width < 900 ? `15px` : `18px`}
                  fontWeight={`600`}
                >
                  총 결제금액
                </Text>
                <Text
                  fontSize={width < 900 ? `20px` : `32px`}
                  fontWeight={`bold`}
                >
                  {productDetail &&
                    numberWithCommas(
                      productDetail.detailData.calcPrice + selectOptionPrice
                    )}
                  원
                </Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <CommonButton
                  width={`49%`}
                  height={`54px`}
                  kindOf={`white`}
                  fontWeight={`600`}
                  onClick={() => itemCreateHandler(2)}
                  loading={st_itemCreateLoading}
                >
                  바로구매
                </CommonButton>
                <CommonButton
                  width={`49%`}
                  height={`54px`}
                  kindOf={`darkgrey`}
                  fontWeight={`600`}
                  // onClick={cartModalToggle}
                  onClick={() => itemCreateHandler(1)}
                  loading={st_itemCreateLoading}
                >
                  장바구니
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Drawer>
          <Modal
            onCancel={cModalToggle}
            visible={cModal}
            footer={null}
            closable={null}
            width={`570px`}
          >
            <Wrapper padding={width < 600 ? `20px 0px` : `20px`}>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 17px`}
                margin={`0 0 23px`}
              >
                <Text
                  fontSize={width < 700 ? `20px` : `24px`}
                  fontWeight={`600`}
                >
                  리뷰 작성하기
                </Text>
                <Text
                  color={Theme.grey_C}
                  isHover
                  fontSize={width < 900 ? `15px` : `20px`}
                  onClick={cModalToggle}
                >
                  <CloseOutlined />
                </Text>
              </Wrapper>
              <Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 15px`}>
                  <Text
                    lineHeight={`46px`}
                    fontSize={width < 900 ? `14px` : `16px`}
                  >
                    작성자
                  </Text>
                  <Wrapper
                    width={width < 700 ? `100%` : `80%`}
                    height={`46px`}
                    al={`flex-start`}
                    border={`1px solid ${Theme.lightGrey3_C}`}
                    bgColor={Theme.lightGrey3_C}
                    color={Theme.lightGrey_C}
                    padding={`0 11px`}
                    fontSize={width < 900 ? `14px` : `16px`}
                  >
                    <Text>imnickname</Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`0 0 20px`}
                  al={`flex-start`}
                >
                  <Text
                    fontSize={width < 900 ? `14px` : `16px`}
                    lineHeight={`46px`}
                  >
                    리뷰 내용
                  </Text>

                  <TextArea
                    width={width < 700 ? `100%` : `80%`}
                    height={`145px`}
                    placeholder="리뷰를 작성해주세요."
                  />
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  <Text fontSize={width < 900 ? `14px` : `16px`}>
                    사진 첨부
                  </Text>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} margin={`8px 0 25px`}>
                  <Wrapper
                    position={`relative`}
                    width={width < 600 ? `150px` : `111px`}
                  >
                    <Image
                      height={width < 600 ? `150px` : `111px`}
                      alt="리뷰 사진"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                    />
                    <Circle>
                      <CloseOutlined />
                    </Circle>
                  </Wrapper>

                  <PictureWrapper>
                    <Text fontSize={width < 700 ? `14px` : `20px`}>
                      <PlusOutlined />
                    </Text>
                    <Text>첨부하기</Text>
                  </PictureWrapper>
                  <PictureWrapper margin={`10px 0 0`}>
                    <Text fontSize={width < 700 ? `14px` : `20px`}>
                      <PlusOutlined />
                    </Text>
                    <Text>첨부하기</Text>
                  </PictureWrapper>
                  <PictureWrapper margin={`10px 0 0`}>
                    <Text fontSize={width < 700 ? `14px` : `20px`}>
                      <PlusOutlined />
                    </Text>
                    <Text>첨부하기</Text>
                  </PictureWrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <CommonButton
                  width={`49%`}
                  height={`54px`}
                  kindOf={`darkgrey`}
                  onClick={modalToggle}
                  fontSize={width < 500 ? `16px` : `18px`}
                  fontWeight={`600`}
                >
                  이전으로
                </CommonButton>
                <CommonButton
                  fontSize={width < 500 ? `16px` : `18px`}
                  fontWeight={`600`}
                  kindOf={`white`}
                  width={`49%`}
                  height={`54px`}
                  onClick={modalToggle}
                >
                  작성하기
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Modal>
          {/* 이 상품을 구매한 회원이 아닐경우 */}
          <Modal
            onCancel={reviewModalToggle}
            visible={reviewModal}
            footer={null}
            closable={null}
          >
            <Wrapper padding={width < 600 ? `20px 0px` : `20px`}>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 17px`}
                margin={`0 0 23px`}
              >
                <Text
                  fontSize={width < 700 ? `20px` : `24px`}
                  fontWeight={`600`}
                >
                  리뷰 작성 제한
                </Text>
                <Text
                  color={Theme.grey_C}
                  isHover
                  fontSize={width < 900 ? `15px` : `20px`}
                  onClick={reviewModalToggle}
                >
                  <CloseOutlined />
                </Text>
              </Wrapper>

              <Text
                fontSize={width < 900 ? `15px` : `18px`}
                margin={`30px 0 0`}
              >
                이 상품을 구매했던 회원만
              </Text>
              <Text
                fontSize={width < 900 ? `15px` : `18px`}
                margin={`0 0 50px`}
              >
                리뷰를 작성할 수 있습니다.
              </Text>

              <CommonButton
                fontSize={width < 500 ? `16px` : `18px`}
                fontWeight={`600`}
                kindOf={`white`}
                width={`240px`}
                height={`54px`}
                onClick={reviewModalToggle}
              >
                쇼핑 계속하기
              </CommonButton>
            </Wrapper>
          </Modal>
          <Modal
            onCancel={cartModalToggle}
            visible={cartModal}
            footer={null}
            closable={null}
          >
            <Wrapper padding={width < 600 ? `20px 0px` : `20px`}>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 17px`}
                margin={`0 0 23px`}
              >
                <Text
                  fontSize={width < 700 ? `20px` : `24px`}
                  fontWeight={`600`}
                >
                  장바구니
                </Text>
                <Text
                  color={Theme.grey_C}
                  isHover
                  fontSize={width < 900 ? `15px` : `20px`}
                  onClick={cartModalToggle}
                >
                  <CloseOutlined />
                </Text>
              </Wrapper>

              <Text
                fontSize={width < 900 ? `15px` : `18px`}
                margin={`30px 0 0`}
              >
                장바구니에 성공적으로 추가되었습니다.
              </Text>
              <Text
                fontSize={width < 900 ? `15px` : `18px`}
                margin={`0 0 50px`}
              >
                계속 쇼핑하시겠습니까?
              </Text>

              <Wrapper dr={`row`} ju={`space-between`}>
                <CommonButton
                  fontSize={width < 500 ? `16px` : `18px`}
                  fontWeight={`600`}
                  kindOf={`darkgrey`}
                  width={`49%`}
                  height={`54px`}
                  onClick={cartModalToggle}
                >
                  쇼핑 계속하기
                </CommonButton>

                <CommonButton
                  fontSize={width < 500 ? `16px` : `18px`}
                  fontWeight={`600`}
                  kindOf={`white`}
                  width={`49%`}
                  height={`54px`}
                  onClick={() => router.push(`/payment/cartlist`)}
                >
                  장바구니 확인
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Modal>

          {/* 의약품 구매제한 모달 */}
          <Modal
            onCancel={limitModalToggle}
            visible={limitModal}
            footer={null}
            closable={null}
          >
            <Wrapper padding={width < 600 ? `20px 0px` : `20px`}>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                padding={`0 0 17px`}
                margin={`0 0 23px`}
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
                  fontSize={width < 900 ? `15px` : `20px`}
                  onClick={limitModalToggle}
                >
                  <CloseOutlined />
                </Text>
              </Wrapper>

              <Text
                fontSize={width < 900 ? `15px` : `18px`}
                margin={`30px 0 0`}
              >
                의약품은 최대 6개로 구매 제한이 있습니다.
              </Text>
              <Text
                fontSize={width < 900 ? `15px` : `18px`}
                margin={`0 0 50px`}
              >
                6개 이하로 구매해주길 바랍니다.
              </Text>

              <CommonButton
                fontSize={width < 500 ? `16px` : `18px`}
                fontWeight={`600`}
                kindOf={`darkgrey`}
                width={`240px`}
                height={`54px`}
                onClick={limitModalToggle}
              >
                확인
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

export default Index;
