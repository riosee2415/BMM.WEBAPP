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
import { Carousel, Empty } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { BRAND_LIST_REQUEST } from "../../reducers/brand";

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
  & .ant-carousel {
    width: 100%;
  }

  & .slick-list {
    padding: 0 !important;
  }

  & .ant-carousel .slick-slider {
    height: 100%;
  }

  .ant-carousel .slick-dots {
    bottom: -50px;
    margin-right: 0;
    margin-left: 0;
    width: calc(100% - 124px);
  }

  .ant-carousel .slick-dots li button {
    background: ${Theme.lightGrey3_C};
    opacity: 1;
    height: 6px;
    border-radius: 10px;
  }

  .ant-carousel .slick-dots li.slick-active button {
    background: ${Theme.black_C};
    border-radius: 10px;
  }

  .ant-carousel .slick-dots li {
    width: 100%;
    height: 6px;
    margin-right: 0;
    margin-left: 0;
  }
`;

const SliderWrapper = styled(Carousel)`
  & .slick-list {
    width: auto;
  }
`;

const MainBrandSlider = () => {
  const { brandList } = useSelector((state) => state.brand);

  console.log(brandList);

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const slideRef = useRef();

  useEffect(() => {
    dispatch({
      type: BRAND_LIST_REQUEST,
    });
  }, []);

  return (
    <MainBrandWrapper
      overflow={brandList && brandList.length < 6 && `hidden`}
      height={
        brandList && brandList.length < 6 && width < 700 ? `356px` : `512px`
      }
    >
      <SliderWrapper
        draggable={true}
        autoplay={false}
        slidesToShow={width < 900 ? 2 : 3}
        centerMode={false}
        dots={true}
        ref={slideRef}
        slidesToScroll={1}
        rows={2}
      >
        {brandList && brandList.length === 0 ? (
          <Wrapper display={`flex !important`} height={`500px`}>
            <Empty description="조회된 내역이 없습니다." />
          </Wrapper>
        ) : (
          brandList.map((data, idx) => {
            return (
              <Wrapper
                key={idx}
                position={`relative`}
                display={`flex !important`}
                height={`100%`}
                padding={`10px`}
              >
                <SquareBox bgImg={`url(${data.imagePath})`}>
                  <Wrapper
                    height={`100%`}
                    position={`absolute`}
                    top={`0`}
                    left={`0`}
                    padding={width < 800 ? `15px` : `30px`}
                    al={`flex-start`}
                    ju={`flex-start`}
                  >
                    <Text fontSize={`15px`}>{data.subDesc}</Text>
                    <Text
                      fontSize={width < 800 ? `18px` : `23px`}
                      fontWeight={`bold`}
                    >
                      {data.name}
                    </Text>
                  </Wrapper>
                </SquareBox>
              </Wrapper>
            );
          })
        )}
      </SliderWrapper>
      <Wrapper height={`100%`} dr={`row`} ju={`flex-end`} padding={`15px 0`}>
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
