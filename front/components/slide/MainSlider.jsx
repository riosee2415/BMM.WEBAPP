import React, { useEffect, useCallback } from "react";
import {
  ColWrapper,
  RowWrapper,
  Wrapper,
  CommonButton,
  RsWrapper,
  Text,
} from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { MAIN_BANNER_REQUEST } from "../../reducers/banner";
import Theme from "../Theme";
import { Carousel } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";

const MainSliderWrapper = styled(RowWrapper)`
  & .ant-carousel {
    width: 100%;
  }

  .ant-carousel .slick-dots li button,
  .ant-carousel .slick-dots li {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    opacity: 1;
  }

  .ant-carousel .slick-dots li {
    margin: 0 7px;
  }

  .ant-carousel .slick-dots li.slick-active button {
    background: ${Theme.basicTheme_C};
  }

  .ant-carousel .slick-prev,
  .ant-carousel .slick-next {
    width: 43px;
    height: 43px;
    border-radius: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
    transition: 0.3s;
    margin-top: -28px;

    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
  }
  .ant-carousel .slick-prev {
    left: 0;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 17px;
      transform: translate(-50%, -50%);
      background-size: cover;
      background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/prev_W.png");
    }
  }
  .ant-carousel .slick-next {
    right: 0;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 17px;
      transform: translate(-50%, -50%);
      background-size: cover;
      background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/next_W.png");
    }
  }
`;

const MainSlider = () => {
  const width = useWidth();

  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.banner);
  const { me } = useSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: MAIN_BANNER_REQUEST,
    });
  }, [me]);

  const moveLinkHandler = useCallback((link) => {
    window.open(link);
  }, []);

  return (
    <MainSliderWrapper>
      <Carousel
        autoplay={true}
        speed={3000}
        autoplaySpeed={7000}
        arrows
        dots={false}
      >
        {banners &&
          banners.map((data, idx) => {
            return (
              <ColWrapper
                key={idx}
                span={24}
                height={width < 800 ? `500px` : `480px`}
                bgImg={`url(${data.imageURL})`}
                position={`relative`}
                display={`flex !important`}
              >
                <RsWrapper height={`100%`} position={`relative`}>
                  <Wrapper al={`flex-start`}>
                    <Wrapper
                      al={`flex-start`}
                      fontSize={width < 700 ? `22px` : `40px`}
                      fontWeight={`bold`}
                    >
                      {data.titleUseYn === 1 && (
                        <Text lineHeight={`1.2`}>{data.title}</Text>
                      )}
                    </Wrapper>
                    <ColWrapper margin={`22px 0`}>
                      {data.contentUseYn === 1 && (
                        <Text fontSize={`1.125rem`}>{data.content}</Text>
                      )}
                    </ColWrapper>

                    {data.linkUseYn === 1 && (
                      <CommonButton onClick={() => moveLinkHandler(data.link)}>
                        링크이동
                      </CommonButton>
                    )}
                  </Wrapper>

                  <Wrapper
                    width={`auto`}
                    position={`absolute`}
                    bottom={`44px`}
                    right={`0`}
                  >
                    <Wrapper
                      width={`auto`}
                      height={`38px`}
                      radius={`40px`}
                      bgColor={`rgba(0, 0, 0, 0.4)`}
                      color={Theme.white_C}
                      padding={`0 25px`}
                      fontSize={`16px`}
                    >
                      {data.id}/{banners.length}
                    </Wrapper>
                  </Wrapper>
                </RsWrapper>
              </ColWrapper>
            );
          })}
      </Carousel>
    </MainSliderWrapper>
  );
};

export default MainSlider;
