import React from "react";
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
import { Select } from "antd";
import styled from "styled-components";

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
  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////
  const bannerData = [
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_3nd_banner1.png",
      name: "베진카 300정",
      content: "일본 위장약 소화제 위염약",
      price: "9,000원",
      sale: "9,000원",
      persent: "10%",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_3nd_banner1.png",
      name: "베진카 300정",
      content: "일본 위장약 소화제 위염약",
      price: "9,000원",
      sale: "9,000원",
      persent: "10%",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_3nd_banner1.png",
      name: "베진카 300정",
      content: "일본 위장약 소화제 위염약",
      price: "9,000원",
      sale: "9,000원",
      persent: "10%",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_3nd_banner1.png",
      name: "베진카 300정",
      content: "일본 위장약 소화제 위염약",
      price: "9,000원",
      sale: "9,000원",
      persent: "10%",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_3nd_banner1.png",
      name: "베진카 300정",
      content: "일본 위장약 소화제 위염약",
      price: "9,000원",
      sale: "9,000원",
      persent: "10%",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_3nd_banner1.png",
      name: "베진카 300정",
      content: "일본 위장약 소화제 위염약",
      price: "9,000원",
      sale: "9,000원",
      persent: "10%",
    },
  ];

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
            <Wrapper dr={`row`} ju={`space-between`} margin={`28px 0 24px`}>
              <Text
                fontSize={width < 800 ? `14px` : `16px`}
                color={Theme.grey_C}
              >
                총&nbsp;
                <SpanText fontWeight={`500`} color={Theme.black_C}>
                  43
                </SpanText>
                개의 상품이 있습니다.
              </Text>

              <CustomSelect>
                <Select placeholder={`선택해주세요.`}>
                  <Select.Option>추천순</Select.Option>
                  <Select.Option>조회순</Select.Option>
                </Select>
              </CustomSelect>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              {bannerData &&
                bannerData.map((data, idx) => {
                  return (
                    <ProductWrapper key={idx}>
                      <SquareBox position={`relative`}>
                        <Image alt="thumbnail" src={data.img} />
                      </SquareBox>
                      <Text
                        fontSize={width < 800 ? `14px` : `16px`}
                        fontWeight={`600`}
                        margin={width < 800 ? `10px 0 5px` : `18px 0 8px`}
                      >
                        {data.name}
                      </Text>
                      <Text
                        color={Theme.grey_C}
                        fontSize={width < 800 ? `14px` : `16px`}
                        margin={width < 700 ? `0 0 5px` : `0 0 15px`}
                        width={`100%`}
                        isEllipsis
                      >
                        {data.content}
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
                            {data.price}
                          </Text>
                          <Text
                            color={Theme.lightGrey_C}
                            fontSize={width < 800 ? `12px` : `16px`}
                            margin={`0 5px`}
                            className="line"
                          >
                            {data.sale}
                          </Text>
                          <Text
                            fontSize={width < 800 ? `13px` : `18px`}
                            fontWeight={`600`}
                            color={Theme.red_C}
                          >
                            {data.persent}
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
                })}

              <CustomPage />
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

export default Index;
