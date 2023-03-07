import React, { useEffect, useCallback, useRef } from "react";
import {
  RowWrapper,
  Wrapper,
  Image,
  Text,
  SpanText,
  CommonButton,
  SquareBox,
} from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../Theme";
import { Carousel } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

const ArrowBtn = styled(Wrapper)`
  width: 43px;
  height: 43px;
  background: ${Theme.white_C};
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border-radius: 100%;
  font-size: 20px;

  &:hover {
    background: ${Theme.basicTheme_C};
  }
`;

const MainBrandWrapper = styled(RowWrapper)`
  overflow: hidden;

  & .ant-carousel {
    width: 100%;
  }

  & .slick-list {
    padding: 0 !important;
  }

  & .ant-carousel .slick-slider {
    height: 100%;
    overflow: hidden;
  }
`;

const SliderWrapper = styled(Carousel)`
  overflow: hidden;

  & .slick-list {
    width: auto;
  }
`;

const MainBrandSlider = () => {
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();
  const slideRef = useRef();

  const bannerData = [
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_intro_1.png",
      content: "소화제의 명가",
      name: "카베진a",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_intro_2.png",
      content: "소화제의 명가",
      name: "카베진a",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_intro_3.png",
      content: "소화제의 명가",
      name: "카베진a",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_intro_4.png",
      content: "소화제의 명가",
      name: "카베진a",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_intro_5.png",
      content: "소화제의 명가",
      name: "카베진a",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_intro_6.png",
      content: "소화제의 명가",
      name: "카베진a",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_intro_4.png",
      content: "소화제의 명가",
      name: "카베진a",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_intro_5.png",
      content: "소화제의 명가",
      name: "카베진a",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_intro_6.png",
      content: "소화제의 명가",
      name: "카베진a",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_intro_4.png",
      content: "소화제의 명가",
      name: "카베진a",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_intro_5.png",
      content: "소화제의 명가",
      name: "카베진a",
    },
    {
      img: "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_intro_6.png",
      content: "소화제의 명가",
      name: "카베진a",
    },
  ];

  return (
    <MainBrandWrapper>
      <SliderWrapper
        draggable={true}
        autoplay={false}
        slidesToShow={3}
        centerMode={false}
        dots={true}
        ref={slideRef}
        slidesToScroll={1}
        rows={2}
      >
        {bannerData &&
          bannerData.map((data, idx) => {
            return (
              <Wrapper
                key={idx}
                position={`relative`}
                display={`flex !important`}
                height={`100%`}
                padding={`10px`}
              >
                <SquareBox bgImg={`url(${data.img})`}>
                  <Wrapper
                    height={`100%`}
                    position={`absolute`}
                    top={`0`}
                    left={`0`}
                    padding={`30px`}
                    al={`flex-start`}
                    ju={`flex-start`}
                  >
                    <Text fontSize={`15px`}>{data.content}</Text>
                    <Text fontSize={`23px`} fontWeight={`bold`}>
                      {data.name}
                    </Text>
                  </Wrapper>
                </SquareBox>
              </Wrapper>
            );
          })}
      </SliderWrapper>
      <Wrapper
        height={`100%`}
        dr={`row`}
        ju={`space-between`}
        zIndex={`100`}
        padding={`15px 0`}
      >
        <Wrapper width={`auto`} dr={`row`}>
          <ArrowBtn
            margin={`0 18px 0 0`}
            onClick={() => slideRef.current.prev()}
          >
            <LeftOutlined />
          </ArrowBtn>

          <ArrowBtn onClick={() => slideRef.current.next()}>
            <RightOutlined />
          </ArrowBtn>
        </Wrapper>
      </Wrapper>
    </MainBrandWrapper>
  );
};

export default MainBrandSlider;
