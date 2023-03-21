import React, { useCallback, useState } from "react";
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
import { Drawer, Modal, Select } from "antd";
import styled from "styled-components";
import GallerySlider from "../../components/slide/GallerySlider";
import {
  CloseOutlined,
  MinusOutlined,
  PlusOutlined,
  PictureOutlined,
} from "@ant-design/icons";

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
  const [reviewModal, setReviewModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [cModal, setCModal] = useState(false);

  ////// HOOKS //////
  const width = useWidth();
  ////// REDUX //////
  ////// USEEFFECT //////
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

  ////// HANDLER //////
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

            <Wrapper dr={`row`} margin={`30px 0 50px`} al={`flex-start`}>
              <Wrapper
                width={width < 900 ? `100%` : `50%`}
                padding={width < 900 ? `0 0 50px` : `0 80px 0 0`}
              >
                <GallerySlider />
              </Wrapper>
              <Wrapper width={width < 900 ? `100%` : `50%`} al={`flex-start`}>
                <Text
                  fontSize={width < 900 ? `20px` : `28px`}
                  fontWeight={`600`}
                >
                  오레오 시리즈
                </Text>
                <Text
                  fontSize={width < 900 ? `15px` : `18px`}
                  margin={`10px 0 28px`}
                  color={Theme.darkGrey_C}
                >
                  상품설명이 들어오는 곳입니다.
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
                    9,900원
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
                    9,900원
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
                    Gelato pique
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
                    450g
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
                    최소 0개 ~ 최소 000개
                  </Text>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`15px 0`}
                  fontSize={width < 900 ? `20px` : `26px`}
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

                <Wrapper
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
                    오레오 핑크
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

                    <Wrapper dr={`row`} width={`auto`}>
                      <Text
                        fontSize={width < 900 ? `15px` : `20px`}
                        fontWeight={`600`}
                      >
                        9,000원
                      </Text>
                      <Text
                        isHover
                        margin={`0 0 0 10px`}
                        fontSize={width < 900 ? `15px` : `18px`}
                      >
                        <CloseOutlined />
                      </Text>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>

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
                    9,000원
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

                  <CommonButton
                    width={`calc((100% - 74px) / 2)`}
                    height={`54px`}
                    kindOf={`darkgrey`}
                    fontSize={width < 900 ? `15px` : `18px`}
                    fontWeight={`600`}
                  >
                    장바구니
                  </CommonButton>
                  <CommonButton
                    width={`calc((100% - 74px) / 2)`}
                    height={`54px`}
                    kindOf={`white`}
                    fontSize={width < 900 ? `15px` : `18px`}
                    fontWeight={`600`}
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
                <Tag>초콜릿</Tag>
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
                <ProductWrapper>
                  <SquareBox>
                    <Image
                      alt="product"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png`}
                    />
                  </SquareBox>
                </ProductWrapper>
                <ProductWrapper>
                  <SquareBox>
                    <Image
                      alt="product"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png`}
                    />
                  </SquareBox>
                </ProductWrapper>
                <ProductWrapper>
                  <SquareBox>
                    <Image
                      alt="product"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png`}
                    />
                  </SquareBox>
                </ProductWrapper>
                <ProductWrapper>
                  <SquareBox>
                    <Image
                      alt="product"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png`}
                    />
                  </SquareBox>
                </ProductWrapper>
                <ProductWrapper>
                  <SquareBox>
                    <Image
                      alt="product"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png`}
                    />
                  </SquareBox>
                </ProductWrapper>
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
                        src={`https://www.youtube.com/embed/4DZ7meQ4XIU`}
                      />
                    </IFrameWrapper>
                    <Image
                      margin={`50px 0`}
                      alt="image"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/product.png`}
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
                          상품명
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
                          450g
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
                          일본
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
                          제조사명
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
                          일본
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
                          사용방법
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
                          사용기한
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
                          보관방법
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
                          02-0000-0000
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
                          주의 사항이 들어오는 곳입니다.
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
                          <Text>· 해당 내용이 들어오는 곳입니다.</Text>
                          <Text>· 해당 내용이 들어오는 곳입니다.</Text>
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
                          배송비
                        </Wrapper>
                        <Wrapper
                          bgColor={Theme.white_C}
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `20px 22px`}
                        >
                          <Text>· 해당 내용이 들어오는 곳입니다.</Text>
                          <Text>· 해당 내용이 들어오는 곳입니다.</Text>
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
                          <Text>· 해당 내용이 들어오는 곳입니다.</Text>
                          <Text>· 해당 내용이 들어오는 곳입니다.</Text>
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
                          환불 안내
                        </Wrapper>
                        <Wrapper
                          bgColor={Theme.white_C}
                          width={width < 900 ? `100%` : `calc(100% - 200px)`}
                          al={`flex-start`}
                          padding={width < 900 ? `15px 10px` : `20px 22px`}
                        >
                          <Text>· 해당 내용이 들어오는 곳입니다.</Text>
                          <Text>· 해당 내용이 들어오는 곳입니다.</Text>
                          <Text>· 해당 내용이 들어오는 곳입니다.</Text>
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
                  오레오 시리즈
                </Text>
                <CustomSelect>
                  <Select placeholder="상품을 선택해주세요.">
                    <Select.Option>옵션1</Select.Option>
                    <Select.Option>옵션2</Select.Option>
                  </Select>
                </CustomSelect>
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
                    오레오 시리즈
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

                    <Wrapper dr={`row`} width={`auto`}>
                      <Text
                        fontSize={width < 900 ? `15px` : `20px`}
                        fontWeight={`600`}
                      >
                        9,000원
                      </Text>
                      <Text
                        isHover
                        margin={`0 0 0 10px`}
                        fontSize={width < 900 ? `15px` : `18px`}
                      >
                        <CloseOutlined />
                      </Text>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
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
                    9,000원
                  </Text>
                </Wrapper>
                <CommonButton
                  width={`100%`}
                  height={`54px`}
                  kindOf={`white`}
                  fontSize={width < 900 ? `15px` : `18px`}
                  fontWeight={`600`}
                  margin={`0 0 10px`}
                >
                  바로구매
                </CommonButton>
                <CommonButton
                  width={`100%`}
                  height={`54px`}
                  kindOf={`darkgrey`}
                  fontSize={width < 900 ? `15px` : `18px`}
                  fontWeight={`600`}
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
                오레오 시리즈
              </Text>
              <CustomSelect>
                <Select placeholder="상품을 선택해주세요.">
                  <Select.Option>옵션1</Select.Option>
                  <Select.Option>옵션2</Select.Option>
                </Select>
              </CustomSelect>
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
                  오레오 시리즈
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

                  <Wrapper dr={`row`} width={`auto`}>
                    <Text
                      fontSize={width < 900 ? `15px` : `20px`}
                      fontWeight={`600`}
                    >
                      9,000원
                    </Text>
                    <Text
                      isHover
                      margin={`0 0 0 10px`}
                      fontSize={width < 900 ? `15px` : `18px`}
                    >
                      <CloseOutlined />
                    </Text>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
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
                  9,000원
                </Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`}>
                <CommonButton
                  width={`49%`}
                  height={`54px`}
                  kindOf={`white`}
                  fontWeight={`600`}
                >
                  바로구매
                </CommonButton>
                <CommonButton
                  width={`49%`}
                  height={`54px`}
                  kindOf={`darkgrey`}
                  fontWeight={`600`}
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
