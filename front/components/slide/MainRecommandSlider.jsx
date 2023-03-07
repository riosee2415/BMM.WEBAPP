import React, { useEffect, useCallback } from "react";
import { Wrapper, Image, Text, SquareBox } from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../Theme";
import { Carousel } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";

const MainRecommandSliderWrapper = styled(Wrapper)`
  justify-content: flex-start;

  @media (max-width: 900px) {
    height: 390px;
  }

  @media (max-width: 800px) {
    height: 310px;
  }

  & .ant-carousel {
    width: 100%;
  }

  .ant-carousel .slick-slider {
    height: 100%;
    overflow: inherit;
  }

  .ant-carousel .slick-prev,
  .ant-carousel .slick-next {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background: ${Theme.white_C};
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    transition: 0.3s;

    &:hover {
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 800px) {
      width: 35px;
      height: 35px;
      background: rgba(255, 255, 255, 0.4);
    }
  }

  .ant-carousel .slick-prev {
    left: -20px;

    @media (max-width: 900px) {
      left: 0;
    }

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 17px;
      transform: translate(-50%, -50%);
      background-size: contain;
      background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/prev.png");
    }
  }
  .ant-carousel .slick-next {
    right: -20px;

    @media (max-width: 900px) {
      right: 0;
    }

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 17px;
      transform: translate(-50%, -50%);
      background-size: contain;
      background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/next.png");
    }
  }
`;

const SliderWrapper = styled(Carousel)`
  overflow: hidden;

  & .slick-list {
    width: auto;
  }
`;

const MainRecommandSlider = () => {
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

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
  ];

  return (
    <MainRecommandSliderWrapper
      overflow={bannerData && bannerData.length < 4 && `hidden`}
      height={bannerData && bannerData.length < 4 && `420px`}
    >
      <SliderWrapper
        autoplay={true}
        speed={2000}
        autoplaySpeed={6000}
        slidesToShow={width < 1100 ? (width < 800 ? 2 : 3) : 4}
        dots={false}
        arrows={true}
      >
        {bannerData &&
          bannerData.map((data, idx) => {
            return (
              <Wrapper
                key={idx}
                position={`relative`}
                display={`flex !important`}
                al={`flex-start`}
                padding={`0 10px 30px`}
              >
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
              </Wrapper>
            );
          })}
      </SliderWrapper>
    </MainRecommandSliderWrapper>
  );
};

export default MainRecommandSlider;
