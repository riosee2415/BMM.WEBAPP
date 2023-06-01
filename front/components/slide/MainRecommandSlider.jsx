import React, { useEffect, useCallback, useState } from "react";
import { Wrapper, Image, Text, SquareBox } from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../Theme";
import { Carousel, Modal, message } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { LIKE_CREATE_REQUEST } from "../../reducers/like";
import { PRODUCT_LECO_LIST_REQUEST } from "../../reducers/product";
import { ITEM_CREATE_REQUEST } from "../../reducers/wish";

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
    height: 449px;
  }
`;

const OptionModal = styled(Modal)`
  & .ant-modal-body {
    padding: 0px;
  }
`;

const OptionWrapper = styled(Wrapper)`
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.subTheme_C};
  }
`;

const MainRecommandSlider = ({ datum }) => {
  const { me } = useSelector((state) => state.user);
  const { st_likeCreateDone } = useSelector((state) => state.like);
  const { st_itemCreateLoading, st_itemCreateDone, st_itemCreateError } =
    useSelector((state) => state.wish);

  const [isLikeState, setIsLikeState] = useState(false);

  // 옵션 선택
  const [oModal, setOModal] = useState(false);
  const [oData, setOData] = useState(null);

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_likeCreateDone) {
      dispatch({
        type: PRODUCT_LECO_LIST_REQUEST,
      });

      if (isLikeState) {
        message.success("찜목록에서 삭제되었습니다.");
      } else {
        message.success("찜목록에 추가되었습니다.");
      }
    }
  }, [st_likeCreateDone]);

  ////// TOGGLE //////
  const oModalToggle = useCallback(
    (data) => {
      if (data) {
        setOData(data);
      } else {
        setOData(null);
      }

      setOModal((prev) => !prev);
    },
    [oModal, oData]
  );

  ////// HANDLER //////

  const likeCreateHandler = useCallback(
    (data) => {
      if (me) {
        setIsLikeState(data.isLike);
        dispatch({
          type: LIKE_CREATE_REQUEST,
          data: {
            ProductId: data.id,
          },
        });
      } else {
        message.error("로그인이 필요한 서비스입니다.");
      }
    },
    [isLikeState, me]
  );

  // 장바구니 담기
  const itemCreateHandler = useCallback(
    (data) => {
      if (!me) {
        router.push("/user/login");
        return message.error("로그인 후 이용해주세요.");
      }

      if (st_itemCreateLoading) {
        return;
      }

      if (!oData) {
        return message.info("잠시 후 다시 시도해주세요.");
      }

      dispatch({
        type: ITEM_CREATE_REQUEST,
        data: {
          ProductId: oData.id,
          productPrice: oData.marketPrice,
          productDiscount: oData.discount,
          productTitle: oData.title,
          productThumbnail: oData.thumbnail1,
          productWeight: oData.weight,
          optionList: [
            {
              optionName: data.value,
              optionPrice: data.price,
              optionId: data.id,
              qun: 1,
            },
          ],
        },
      });
    },
    [me, oData]
  );

  return (
    <MainRecommandSliderWrapper
      overflow={datum && datum.length < 4 && `hidden`}
      height={datum && datum.length < 4 && `420px`}
    >
      <SliderWrapper
        autoplay={true}
        speed={2000}
        autoplaySpeed={6000}
        slidesToShow={width < 1100 ? (width < 800 ? 2 : 3) : 4}
        dots={false}
        arrows={true}
      >
        {datum &&
          datum.map((data, idx) => {
            return (
              <Wrapper
                key={idx}
                position={`relative`}
                display={`flex !important`}
                al={`flex-start`}
                padding={`0 10px 30px`}
              >
                <SquareBox
                  position={`relative`}
                  onClick={() => router.push(`/product/${data.id}`)}
                >
                  <Image alt="thumbnail" src={data.thumbnail1} />
                </SquareBox>
                <Text
                  fontSize={width < 800 ? `14px` : `16px`}
                  fontWeight={`600`}
                  margin={width < 800 ? `10px 0 5px` : `18px 0 8px`}
                >
                  {data.title}
                </Text>
                <Text
                  color={Theme.grey_C}
                  fontSize={width < 800 ? `14px` : `16px`}
                  margin={width < 700 ? `0 0 5px` : `0 0 15px`}
                  width={`100%`}
                  isEllipsis
                >
                  {data.description}
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
                      {data.concatMemberPrice}
                    </Text>
                    <Text
                      color={Theme.lightGrey_C}
                      fontSize={width < 800 ? `12px` : `16px`}
                      margin={`0 5px`}
                      className="line"
                    >
                      {data.realPrice}
                    </Text>
                    <Text
                      fontSize={width < 800 ? `13px` : `18px`}
                      fontWeight={`600`}
                      color={Theme.red_C}
                    >
                      {data.viewDiscount}
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
                      onClick={() => oModalToggle(data)}
                    />
                    {data.isLike === 0 ? (
                      <Image
                        cursor={`pointer`}
                        width={width < 800 ? `18px` : `21px`}
                        alt="like icon"
                        onClick={() => likeCreateHandler(data)}
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/heart.png`}
                      />
                    ) : (
                      <Image
                        cursor={`pointer`}
                        width={width < 800 ? `18px` : `21px`}
                        alt="like icon"
                        onClick={() => likeCreateHandler(data)}
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/heart_A.png`}
                      />
                    )}
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            );
          })}
      </SliderWrapper>

      <OptionModal
        title="옵션 선택"
        visible={oModal}
        onCancel={() => oModalToggle(null)}
        footer={null}
      >
        <Wrapper
          bgColor={Theme.basicTheme_C}
          dr={`row`}
          ju={`space-between`}
          padding={`10px`}
          color={Theme.white_C}
        >
          <Text>옵션명</Text>
          <Text>가격</Text>
        </Wrapper>
        {oData &&
          (oData.options.length === 0 ? (
            <Wrapper margin={`30px`}>
              <Empty description="상품에 옵션이 없습니다." />
            </Wrapper>
          ) : (
            oData.options.map((data, idx) => {
              return (
                <OptionWrapper
                  key={idx}
                  dr={`row`}
                  ju={`space-between`}
                  borderTop={idx === 0 && `1px solid ${Theme.basicTheme_C}`}
                  borderBottom={`1px solid ${Theme.basicTheme_C}`}
                  padding={`10px`}
                  onClick={() => itemCreateHandler(data)}
                >
                  <Text width={`60%`} isEllipsis>
                    {data.value}
                  </Text>
                  <Text width={`40%`} isEllipsis textAlign={`end`}>
                    {data.concatPrice}
                  </Text>
                </OptionWrapper>
              );
            })
          ))}
      </OptionModal>
    </MainRecommandSliderWrapper>
  );
};

export default MainRecommandSlider;
