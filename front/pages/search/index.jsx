import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
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
import { Empty, Select } from "antd";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { PRODUCT_LIST_REQUEST } from "../../reducers/product";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { SEARCHTAG_LIST_REQUEST } from "../../reducers/searchTag";

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

const Index = () => {
  ////// GLOBAL STATE //////
  const { productList, productPage } = useSelector((state) => state.product);
  const { searchTagList } = useSelector((state) => state.searchTag);
  ////// HOOKS //////
  const width = useWidth();
  const [orderType, setOrderType] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  ////// REDUX //////
  const router = useRouter();
  const dispatch = useDispatch();
  ////// USEEFFECT //////

  // 검색어 세팅
  useEffect(() => {
    if (router.query.search) {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          searchTitle: router.query.search,
          orderType,
        },
      });
    }
  }, [router.query.search]);
  ////// TOGGLE //////
  ////// HANDLER //////

  // 페이지네이션
  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);

      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          page: changePage,
        },
      });
    },
    [currentPage]
  );

  // 최신순/오래된순
  const orderTypeHandler = useCallback(
    (data) => {
      setOrderType(data);
      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          orderType: data,
        },
      });
    },
    [orderType]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 검색</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 800 ? `70px 0 0` : `95px 0 0`}>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Text
                fontSize={width < 800 ? `22px` : `34px`}
                fontWeight={`bold`}
              >
                검색결과
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
                <Text color={Theme.grey_C} margin={`0 0 0 6px`}>
                  검색결과
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              display={width < 700 ? `none` : `flex`}
            >
              {searchTagList.map((data) => {
                return (
                  <CommonButton
                    width={`auto`}
                    radius={`30px`}
                    padding={`5px 10px`}
                    margin={`0 5px 0 0`}
                    kindOf={`grey`}
                  >
                    {data.value}
                  </CommonButton>
                );
              })}
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`28px 0 24px`}>
              <Text
                fontSize={width < 800 ? `14px` : `16px`}
                color={Theme.grey_C}
              >
                총&nbsp;
                <SpanText fontWeight={`500`} color={Theme.black_C}>
                  {productList.length}
                </SpanText>
                개의 상품이 있습니다.
              </Text>

              <CustomSelect>
                <Select
                  placeholder={`선택해주세요.`}
                  value={orderType}
                  onChange={orderTypeHandler}
                >
                  <Select.Option value={1}>최신순</Select.Option>
                  <Select.Option value={2}>오래된순</Select.Option>
                </Select>
              </CustomSelect>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              {productList.length === 0 ? (
                <Wrapper height={`200px`}>
                  <Empty description="조회된 상품이 없습니다." />
                </Wrapper>
              ) : (
                productList.map((data) => {
                  return (
                    <ProductWrapper key={data.id}>
                      <SquareBox position={`relative`}>
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
                            {data.marketPrice}
                          </Text>
                          <Text
                            color={Theme.lightGrey_C}
                            fontSize={width < 800 ? `12px` : `16px`}
                            margin={`0 5px`}
                            className="line"
                          >
                            {data.memberPrice}
                          </Text>
                          <Text
                            fontSize={width < 800 ? `13px` : `18px`}
                            fontWeight={`600`}
                            color={Theme.red_C}
                          >
                            {data.discount}
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
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_cart.png`}
                          />
                          <Image
                            width={width < 800 ? `18px` : `21px`}
                            alt="like icon"
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/heart.png`}
                          />
                        </Wrapper>
                      </Wrapper>
                    </ProductWrapper>
                  );
                })
              )}

              <CustomPage
                defaultCurrent={1}
                current={parseInt(currentPage)}
                onChange={(page) => otherPageCall(page)}
                total={productPage * 10}
              />
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

    context.store.dispatch({
      type: SEARCHTAG_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
