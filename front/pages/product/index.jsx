import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CustomPage,
  Image,
  ProductWrapper,
  RsWrapper,
  SpanText,
  SquareBox,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import { Empty, message, Modal, Select } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_LIST_REQUEST } from "../../reducers/product";
import { useRouter } from "next/router";
import { LIKE_CREATE_REQUEST } from "../../reducers/like";
import { LOGO_GET_REQUEST } from "../../reducers/logo";
import { ALL_LIST_REQUEST } from "../../reducers/category";
import { COMPANY_GET_REQUEST } from "../../reducers/company";
import { ITEM_CREATE_REQUEST } from "../../reducers/wish";

const CustomSelect = styled(Wrapper)`
  width: ${(props) => props.width || `145px`};
  height: ${(props) => props.height || `34px`};

  .ant-select {
    width: 100%;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  .ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector
    .ant-select-selection-search-input {
    width: 100%;
    height: ${(props) => props.height || `34px`};
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.lightGrey2_C};
  }

  .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    width: 100%;
    line-height: ${(props) => props.height || `34px`};
  }

  .ant-select-selector {
    align-items: center !important;
  }
`;

const Btn = styled(Wrapper)`
  width: auto;
  height: 40px;
  padding: 0 20px;
  border-radius: 40px;
  font-size: 18px;
  color: ${Theme.lightGrey_C};
  margin: 0 12px 0 0;
  font-weight: 600;
  border: 1px solid ${Theme.lightGrey2_C};

  ${(props) =>
    props.isActive &&
    `
    color: ${Theme.black_C};
    background: ${Theme.subTheme3_C};
    border: 1px solid ${Theme.basicTheme_C};
  `}

  &:last-child {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
    color: ${Theme.black_C};
    background: ${Theme.subTheme3_C};
    border: 1px solid ${Theme.basicTheme_C};
  }

  @media (max-width: 800px) {
    font-size: 14px;
    height: 35px;
    margin: 0 5px 5px 0;

    &:last-child {
      margin: 0 0 5px;
    }
  }
`;

const OptionModal = styled(Modal)`
  & .ant-modal-body {
    padding: 0px;
  }
`;

const OptionWrapper = styled(Wrapper)`
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.subTheme_C};
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { productList, productPage } = useSelector((state) => state.product);
  const { st_likeCreateDone } = useSelector((state) => state.like);
  const { allList } = useSelector((state) => state.category);
  const { me } = useSelector((state) => state.user);
  const { st_itemCreateLoading, st_itemCreateDone, st_itemCreateError } =
    useSelector((state) => state.wish);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [type, setType] = useState(null);
  const [orderType, setOrderType] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLikeState, setIsLikeState] = useState(false);

  // 옵션 선택
  const [oModal, setOModal] = useState(false);
  const [oData, setOData] = useState(null);

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_itemCreateDone) {
      router.push("/payment/cartlist");
      oModalToggle(null);
      return message.success("장바구니에 추가되었습니다.");
    }

    if (st_itemCreateError) {
      return message.error(st_itemCreateError);
    }
  }, [st_itemCreateDone, st_itemCreateError]);

  useEffect(() => {
    if (st_likeCreateDone) {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
      });

      if (isLikeState) {
        message.success("찜목록에서 삭제되었습니다.");
      } else {
        message.success("찜목록에 추가되었습니다.");
      }
    }
  }, [st_likeCreateDone]);

  useEffect(() => {
    if (router.query.target) {
      setType(parseInt(router.query.target));
    } else {
      return;
    }
  }, [router.query.target]);

  useEffect(() => {
    if (router.query) {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          CateUpId: router.query.parent,
          CateDownId: type,
          page: currentPage,
          orderType,
        },
      });
    }
  }, [router.query, type, currentPage, orderType]);

  ////// TOGGLE //////

  const oModalToggle = useCallback(
    (data) => {
      if (data) {
        setOData(data);
      } else {
        setOData(null);
      }

      setOModal((prev) => !prev);
    },
    [oModal, oData]
  );

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  //페이지네이션
  const nextPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
    },
    [currentPage]
  );

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

  const typeHandler = useCallback(
    (data) => {
      if (router.query) {
        if (!data) {
          setType(data);

          router.push(`/product?parent=${router.query.parent}`);
        } else {
          setType(parseInt(data));

          router.push(
            `/product?parent=${router.query.parent}&target=${data.id}`
          );
        }
      }
    },
    [type, router.query]
  );

  // 장바구니 담기
  const itemCreateHandler = useCallback(
    (data) => {
      if (!me) {
        router.push("/user/login");
        return message.error("로그인 후 이용해주세요.");
      }

      if (st_itemCreateLoading) {
        return;
      }

      if (!oData) {
        return message.info("잠시 후 다시 시도해주세요.");
      }

      dispatch({
        type: ITEM_CREATE_REQUEST,
        data: {
          ProductId: oData.id,
          productPrice: oData.marketPrice,
          productDiscount: oData.discount,
          productTitle: oData.title,
          productThumbnail: oData.thumbnail1,
          productWeight: oData.weight,
          optionList: [
            {
              optionName: data.value,
              optionPrice: data.price,
              optionId: data.id,
              qun: 1,
            },
          ],
        },
      });
    },
    [me, oData, st_itemCreateLoading]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>
          BUY ME MINE |{" "}
          {
            allList.find(
              (data) => parseInt(data.id) === parseInt(router.query.parent)
            ).value
          }
        </title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 800 ? `70px 0 0` : `95px 0 0`}>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Text
                fontSize={width < 800 ? `22px` : `34px`}
                fontWeight={`bold`}
              >
                {
                  allList.find(
                    (data) =>
                      parseInt(data.id) === parseInt(router.query.parent)
                  ).value
                }
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
                  {
                    allList.find(
                      (data) =>
                        parseInt(data.id) === parseInt(router.query.parent)
                    ).value
                  }
                </Text>

                {type !== null && (
                  <Image
                    alt="next icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/next.png`}
                    width={`5px`}
                  />
                )}

                <Text color={Theme.grey_C} margin={`0 0 0 6px`}>
                  {allList
                    .find(
                      (data) =>
                        parseInt(data.id) === parseInt(router.query.parent)
                    )
                    .sub.map((item) => {
                      if (parseInt(item.id) === parseInt(router.query.target))
                        return item.value;
                    })}
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`18px 0 0`}>
              <Btn isActive={type === null} onClick={() => typeHandler(null)}>
                전체
              </Btn>

              {allList
                .find(
                  (data) => parseInt(data.id) === parseInt(router.query.parent)
                )
                .sub.map((item) => {
                  return (
                    <Btn
                      onClick={() => typeHandler(item)}
                      isActive={
                        parseInt(item.id) === parseInt(router.query.target)
                      }
                    >
                      {item.value}
                    </Btn>
                  );
                })}
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`30px 0 24px`}>
              <Text
                fontSize={width < 800 ? `14px` : `16px`}
                color={Theme.grey_C}
              >
                총&nbsp;
                <SpanText fontWeight={`500`} color={Theme.basicTheme_C}>
                  {productList && productList.length}
                </SpanText>
                개의 상품이 있습니다.
              </Text>

              <CustomSelect>
                <Select
                  placeholder={`선택해주세요.`}
                  value={orderType}
                  onChange={setOrderType}
                >
                  <Select.Option value={1}>오래된순</Select.Option>
                  <Select.Option value={2}>최신순</Select.Option>
                </Select>
              </CustomSelect>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              {productList && productList.length === 0 ? (
                <Wrapper padding={`50px 0`}>
                  <Empty description="조회된 상품이 없습니다." />
                </Wrapper>
              ) : (
                productList.map((data, idx) => {
                  return (
                    <ProductWrapper key={idx}>
                      <SquareBox
                        position={`relative`}
                        onClick={() => moveLinkHandler(`/product/${data.id}`)}
                      >
                        <Image alt="thumbnail" src={data.thumbnail1} />
                      </SquareBox>
                      <Text
                        fontSize={width < 800 ? `14px` : `16px`}
                        fontWeight={`600`}
                        margin={width < 800 ? `10px 0 5px` : `18px 0 8px`}
                      >
                        {data.title}
                      </Text>
                      <Text
                        color={Theme.grey_C}
                        fontSize={width < 800 ? `14px` : `16px`}
                        margin={width < 700 ? `0 0 5px` : `0 0 15px`}
                        width={`100%`}
                        isEllipsis
                      >
                        {data.description}
                      </Text>
                      <Wrapper dr={`row`} ju={`space-between`}>
                        <Wrapper
                          width={width < 800 ? `100%` : `auto`}
                          dr={`row`}
                          ju={width < 800 && `flex-start`}
                        >
                          <Text
                            fontSize={width < 800 ? `13px` : `18px`}
                            fontWeight={`600`}
                          >
                            {data.realPrice}
                          </Text>
                          <Text
                            color={Theme.lightGrey_C}
                            fontSize={width < 800 ? `12px` : `16px`}
                            margin={`0 5px`}
                            className="line"
                          >
                            {data.concatMarketPrice}
                          </Text>
                          <Text
                            fontSize={width < 800 ? `13px` : `18px`}
                            fontWeight={`600`}
                            color={Theme.red_C}
                          >
                            {data.discount}%
                          </Text>
                        </Wrapper>
                        <Wrapper
                          width={width < 800 ? `100%` : `auto`}
                          dr={`row`}
                          ju={width < 800 && `flex-end`}
                          margin={width < 800 ? `5px 0 0` : `0`}
                        >
                          <Image
                            width={width < 800 ? `18px` : `21px`}
                            alt="cart icon"
                            margin={`0 14px 0 0`}
                            onClick={() => oModalToggle(data)}
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_cart.png`}
                          />
                          {data.isLike === 0 ? (
                            <Image
                              width={width < 800 ? `18px` : `21px`}
                              alt="like icon"
                              onClick={() => likeCreateHandler(data)}
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/heart.png`}
                            />
                          ) : (
                            <Image
                              width={width < 800 ? `18px` : `21px`}
                              alt="like icon"
                              onClick={() => likeCreateHandler(data)}
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/heart_A.png`}
                            />
                          )}
                        </Wrapper>
                      </Wrapper>
                    </ProductWrapper>
                  );
                })
              )}

              <CustomPage
                defaultCurrent={1}
                current={parseInt(currentPage)}
                total={productPage * 10}
                pageSize={10}
                onChange={(page) => nextPageCall(page)}
              />
            </Wrapper>
          </RsWrapper>

          <OptionModal
            title="옵션 선택"
            visible={oModal}
            onCancel={() => oModalToggle(null)}
            footer={null}
          >
            <Wrapper
              bgColor={Theme.basicTheme_C}
              dr={`row`}
              ju={`space-between`}
              padding={`10px`}
              color={Theme.white_C}
            >
              <Text>옵션명</Text>
              <Text>가격</Text>
            </Wrapper>
            {oData &&
              (oData.options.length === 0 ? (
                <Wrapper margin={`30px`}>
                  <Empty description="상품에 옵션이 없습니다." />
                </Wrapper>
              ) : (
                oData.options.map((data, idx) => {
                  return (
                    <OptionWrapper
                      key={idx}
                      dr={`row`}
                      ju={`space-between`}
                      borderTop={idx === 0 && `1px solid ${Theme.basicTheme_C}`}
                      borderBottom={`1px solid ${Theme.basicTheme_C}`}
                      padding={`10px`}
                      onClick={() => itemCreateHandler(data)}
                    >
                      <Text width={`60%`} isEllipsis>
                        {data.value}
                      </Text>
                      <Text width={`40%`} isEllipsis textAlign={`end`}>
                        {data.concatPrice}
                      </Text>
                    </OptionWrapper>
                  );
                })
              ))}
          </OptionModal>
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
      type: LOGO_GET_REQUEST,
    });

    context.store.dispatch({
      type: ALL_LIST_REQUEST,
    });

    context.store.dispatch({
      type: COMPANY_GET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
