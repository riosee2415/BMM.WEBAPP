import React, { useEffect, useCallback } from "react";
import { Wrapper, Image, Text, SquareBox } from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../Theme";
import { Carousel } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const MainEventSliderWrapper = styled(Wrapper)`
  margin: 56px 0 60px;
  height: 260px;
  justify-content: flex-start;

  & .ant-carousel {
    width: 100%;
  }

  .ant-carousel .slick-slider {
    height: 100%;
    overflow: inherit;
  }

  .ant-carousel .slick-prev,
  .ant-carousel .slick-next {
    width: 43px;
    height: 43px;
    border-radius: 100%;
    background: ${Theme.white_C};
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    transition: 0.3s;

    &:hover {
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
    }
  }

  .ant-carousel .slick-prev {
    left: -30px;

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
    right: -30px;

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

const MainEventSlider = () => {
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const bannerData = [
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_2nd_banner1.png",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_2nd_banner2.png",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_2nd_banner1.png",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_2nd_banner2.png",
    },
  ];

  return (
    <MainEventSliderWrapper
      overflow={bannerData && bannerData.length < 2 && `hidden`}
    >
      <SliderWrapper
        autoplay={true}
        speed={3000}
        autoplaySpeed={6000}
        slidesToShow={2}
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
                padding={`0 10px`}
              >
                <Image alt="image" height={`260px`} src={data.img} />
              </Wrapper>
            );
          })}
      </SliderWrapper>
    </MainEventSliderWrapper>
  );
};

export default MainEventSlider;
