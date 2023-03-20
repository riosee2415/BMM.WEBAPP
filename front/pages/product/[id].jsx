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
import GallerySlider from "../../components/slide/GallerySlider";

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

const Index = () => {
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
        <title>BUY ME MINE | 상품</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 800 ? `70px 0 0` : `95px 0 0`}>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Text
                fontSize={width < 800 ? `22px` : `34px`}
                fontWeight={`bold`}
              >
                의류
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
                  의류
                </Text>
                <Image
                  alt="next icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/next.png`}
                  width={`5px`}
                />
                <Text color={Theme.grey_C} margin={`0 0 0 6px`}>
                  상의
                </Text>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} margin={`30px 0 0`} al={`flex-start`}>
              <Wrapper width={`50%`} padding={`0 80px 0 0`}>
                <GallerySlider />
              </Wrapper>
              <Wrapper width={`50%`} al={`flex-start`}>
                <Text fontSize={`28px`} fontWeight={`600`}>
                  오레오 시리즈
                </Text>
                <Text
                  fontSize={`18px`}
                  margin={`10px 0 28px`}
                  color={Theme.darkGrey_C}
                >
                  상품설명이 들어오는 곳입니다.
                </Text>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  height={`40px`}
                  fontSize={`16px`}
                >
                  <Text width={`116px`} color={Theme.grey_C}>
                    시중가
                  </Text>
                  <Text margin={`0 0 0 14px`} color={Theme.darkGrey_C}>
                    9,900원
                  </Text>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  height={`40px`}
                  fontSize={`16px`}
                >
                  <Text width={`116px`} color={Theme.grey_C}>
                    회원가
                  </Text>
                  <Text margin={`0 0 0 14px`} color={Theme.darkGrey_C}>
                    9,900원
                  </Text>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  height={`40px`}
                  fontSize={`16px`}
                >
                  <Text width={`116px`} color={Theme.grey_C}>
                    브랜드
                  </Text>
                  <Text margin={`0 0 0 14px`} color={Theme.darkGrey_C}>
                    Gelato pique
                  </Text>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  height={`40px`}
                  fontSize={`16px`}
                >
                  <Text width={`116px`} color={Theme.grey_C}>
                    무게
                  </Text>
                  <Text margin={`0 0 0 14px`} color={Theme.darkGrey_C}>
                    450g
                  </Text>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  height={`40px`}
                  fontSize={`16px`}
                >
                  <Text width={`116px`} color={Theme.grey_C}>
                    구매 제한
                  </Text>
                  <Text margin={`0 0 0 14px`} color={Theme.darkGrey_C}>
                    최소 0개 ~ 최소 000개
                  </Text>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`20px 0 30px`}
                  fontSize={`26px`}
                >
                  <Text fontWeight={`bold`} color={Theme.red_C}>
                    10%
                  </Text>
                  <Wrapper width={`auto`} dr={`row`}>
                    <Text className="line" color={Theme.lightGrey_C}>
                      9,900원
                    </Text>
                    <Text fontWeight={`600`} margin={`0 0 0 10px`}>
                      9,000원
                    </Text>
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  borderTop={`1px solid ${Theme.lightGrey2_C}`}
                  padding={`20px 0 12px`}
                >
                  <CustomSelect>
                    <Select placeholder="상품을 선택해주세요.">
                      <Select.Option>옵션1</Select.Option>
                      <Select.Option>옵션2</Select.Option>
                    </Select>
                  </CustomSelect>
                </Wrapper>
              </Wrapper>
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
