import React, { useEffect, useCallback } from "react";
import { Wrapper, Image } from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../Theme";
import { Carousel, Empty } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { MAINIMAGE_LIST_REQUEST } from "../../reducers/mainImage";

const SquareBox = styled(Wrapper)`
  width: 100%;
  position: relative;
  overflow: ${(props) => props.overflow || `hidden`};

  &:before {
    content: "";
    display: block;
    padding-bottom: 42%;
  }

  & img:not(.check) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    transition: 0.5s;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const MainEventSliderWrapper = styled(Wrapper)`
  margin: 56px 0 60px;

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

    @media (max-width: 800px) {
      width: 35px;
      height: 35px;
      background: rgba(255, 255, 255, 0.4);
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
  const { mainImageList } = useSelector((state) => state.mainImage);

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: MAINIMAGE_LIST_REQUEST,
    });
  }, []);

  return (
    <MainEventSliderWrapper
      overflow={mainImageList && mainImageList.length < 2 && `hidden`}
      height={mainImageList && mainImageList.length < 2 && `260px`}
    >
      <SliderWrapper
        autoplay={true}
        speed={3000}
        autoplaySpeed={6000}
        slidesToShow={width < 900 ? 1 : 2}
        dots={false}
        arrows={true}
      >
        {mainImageList && mainImageList.length === 0 ? (
          <Wrapper display={`flex !important`} height={`500px`}>
            <Empty description="조회된 내역이 없습니다." />
          </Wrapper>
        ) : (
          mainImageList.map((data, idx) => {
            return (
              <Wrapper
                key={idx}
                position={`relative`}
                display={`flex !important`}
                padding={`0 10px`}
              >
                <SquareBox>
                  <Image alt="image" src={data.imagePath} />
                </SquareBox>
              </Wrapper>
            );
          })
        )}
      </SliderWrapper>
    </MainEventSliderWrapper>
  );
};

export default MainEventSlider;
