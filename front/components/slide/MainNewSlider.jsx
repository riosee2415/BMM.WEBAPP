import React, { useEffect, useCallback } from "react";
import { Wrapper, Image, Text, SquareBox } from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../Theme";
import { Carousel } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";

const MainNewSliderWrapper = styled(Wrapper)`
  background: ${Theme.white_C};
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  padding: 30px;

  &:hover {
    .ant-carousel .slick-prev,
    .ant-carousel .slick-next {
      opacity: 1;
      visibility: visible;
    }
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
    opacity: 0;
    visibility: hidden;

    &:hover {
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
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

const MainNewSlider = () => {
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const bannerData = [
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_3nd_banner1.png",
      name: "베진카 300정",
      content: "일본 위장약 소화제 위염약",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_3nd_banner2.png",
      name: "베진카 300정",
      content: "일본 위장약 소화제 위염약",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_3nd_banner1.png",
      name: "베진카 300정",
      content: "일본 위장약 소화제 위염약",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_3nd_banner2.png",
      name: "베진카 300정",
      content: "일본 위장약 소화제 위염약",
    },
  ];

  return (
    <MainNewSliderWrapper>
      <Wrapper position={`relative`}>
        <Wrapper
          width={`77px`}
          height={width < 800 ? `50px` : `67px`}
          bgColor={Theme.basicTheme_C}
          position={`absolute`}
          top={`-10px`}
          right={`-10px`}
          fontSize={width < 800 ? `20px` : `23px`}
          fontWeight={`bold`}
          zIndex={`10`}
        >
          NEW
        </Wrapper>
        <SliderWrapper
          autoplay={true}
          speed={2000}
          autoplaySpeed={6000}
          slidesToShow={1}
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
                >
                  <SquareBox position={`relative`}>
                    <Image alt="thumbnail" src={data.img} />
                  </SquareBox>
                  <Text
                    fontSize={width < 800 ? `20px` : `24px`}
                    fontWeight={`600`}
                    margin={`18px 0 8px`}
                  >
                    {data.name}
                  </Text>
                  <Text color={Theme.grey_C} fontSize={`16px`}>
                    {data.content}
                  </Text>
                </Wrapper>
              );
            })}
        </SliderWrapper>
      </Wrapper>
    </MainNewSliderWrapper>
  );
};

export default MainNewSlider;
