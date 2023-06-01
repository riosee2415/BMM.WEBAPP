import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import {
  ATag,
  CommonButton,
  Image,
  ProductWrapper,
  RsWrapper,
  SquareBox,
  Text,
  WholeWrapper,
  Wrapper,
} from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import styled from "styled-components";
import Head from "next/head";
import Popup from "../components/popup/popup";
import Mainslider from "../components/slide/MainSlider";
import MainEventSlider from "../components/slide/MainEventSlider";
import MainNewSlider from "../components/slide/MainNewSlider";
import MainBrandSlider from "../components/slide/MainBrandSlider";
import MainRecommandSlider from "../components/slide/MainRecommandSlider";
import { RightOutlined } from "@ant-design/icons";
import { ADVERTISE_LIST_REQUEST } from "../reducers/advertise";
import { EVENT_LIST_REQUEST } from "../reducers/event";
import Link from "next/dist/client/link";
import { Empty, Modal, message } from "antd";
import {
  PRODUCT_BEST_LIST_REQUEST,
  PRODUCT_LECO_LIST_REQUEST,
  PRODUCT_NEW_LIST_REQUEST,
} from "../reducers/product";
import { useState } from "react";
import { LIKE_CREATE_REQUEST } from "../reducers/like";
import { ITEM_CREATE_REQUEST } from "../reducers/wish";
import { useRouter } from "next/router";

const Btn = styled(Wrapper)`
  width: auto;
  height: 40px;
  padding: 0 20px;
  border-radius: 40px;
  font-size: 18px;
  background: ${Theme.lightGrey3_C};
  color: ${Theme.grey_C};
  margin: 0 12px 0 0;

  ${(props) =>
    props.isActive &&
    `
    font-weight: 600;
    color: ${Theme.black_C};
    background: ${Theme.basicTheme_C};
  `}

  &:last-child {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
    color: ${Theme.black_C};
    background: ${Theme.basicTheme_C};
  }

  @media (max-width: 800px) {
    font-size: 14px;
    height: 35px;
    margin: 0 5px 5px 0;

    &:last-child {
      margin: 0 0 5px;
    }
  }
`;

const EventBox = styled(Wrapper)`
  position: relative;
  overflow: ${(props) => props.overflow || `hidden`};

  &:before {
    content: "";
    display: block;
    padding-bottom: 33%;
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

const Home = ({}) => {
  ////// GLOBAL STATE //////
  const { advertiseList } = useSelector((state) => state.advertise);
  const { eventList } = useSelector((state) => state.event);
  const {
    productLecoList,
    productNewList,
    productBestList,
    productBestCategory,
  } = useSelector((state) => state.product);
  const { st_likeCreateDone } = useSelector((state) => state.like);
  const { me } = useSelector((state) => state.user);
  const { st_itemCreateLoading, st_itemCreateDone, st_itemCreateError } =
    useSelector((state) => state.wish);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();

  const [isLikeState, setIsLikeState] = useState(false);
  const [currentBestType, setCurrentBestType] = useState(null);

  // 옵션 선택
  const [oModal, setOModal] = useState(false);
  const [oData, setOData] = useState(null);

  ////// REDUX //////
  const dispatch = useDispatch();
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_likeCreateDone) {
      dispatch({
        type: PRODUCT_BEST_LIST_REQUEST,
      });

      if (isLikeState) {
        message.success("찜목록에서 삭제되었습니다.");
      } else {
        message.success("찜목록에 추가되었습니다.");
      }
    }
  }, [st_likeCreateDone]);

  useEffect(() => {
    if (productBestCategory.length !== 0) {
      setCurrentBestType(productBestCategory[0].id);
    }
  }, [productBestCategory]);

  useEffect(() => {
    if (st_itemCreateDone) {
      router.push("/payment/cartlist");
      return message.success("장바구니에 추가되었습니다.");
    }

    if (st_itemCreateError) {
      return message.error(st_itemCreateError);
    }
  }, [st_itemCreateDone, st_itemCreateError]);
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

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Mainslider />
          <RsWrapper>
            <MainEventSlider />
            <Wrapper dr={`row`} margin={`0 0 100px`} ju={`space-between`}>
              <Wrapper width={width < 800 ? `100%` : `38%`}>
                <MainNewSlider datum={productNewList && productNewList} />
              </Wrapper>
              <Wrapper
                width={width < 800 ? `100%` : `60%`}
                margin={width < 800 ? `50px 0 0` : `0`}
              >
                <MainBrandSlider />
              </Wrapper>
            </Wrapper>

            {advertiseList &&
              advertiseList.map((data) => {
                return (
                  <a href={data.link} target={`_blank`} key={data.id}>
                    <Image
                      alt="banner"
                      margin={`0 0 30px`}
                      src={data.imagePath}
                    />
                  </a>
                );
              })}

            <Text
              margin={width < 800 ? `30px 0 20px` : `60px 0 40px`}
              fontSize={width < 800 ? `22px` : `36px`}
              color={Theme.darkGrey_C}
              fontWeight={`600`}
            >
              바이미마인의 추천!
            </Text>

            <MainRecommandSlider datum={productLecoList} />

            <Text
              margin={width < 800 ? `50px 0 20px` : `100px 0 30px`}
              fontSize={width < 800 ? `22px` : `36px`}
              color={Theme.darkGrey_C}
              fontWeight={`600`}
            >
              카테고리별 인기상품
            </Text>

            <Wrapper dr={`row`} margin={`0 0 40px`}>
              {productBestCategory &&
                productBestCategory.map((data, idx) => {
                  return (
                    <Btn
                      onClick={() => setCurrentBestType(data.id)}
                      key={data.id}
                      isActive={currentBestType === data.id ? true : false}
                    >
                      {data.value}
                    </Btn>
                  );
                })}
            </Wrapper>
            {console.log(productBestList)}
            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              {/* 최대 8개 */}
              {productBestList &&
                productBestList.map((data, idx) => {
                  if (data.CateDownId === currentBestType) {
                    return (
                      <ProductWrapper key={idx}>
                        <SquareBox position={`relative`}>
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
                              onClick={() => oModalToggle(data)}
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_cart.png`}
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
                      </ProductWrapper>
                    );
                  }
                })}
            </Wrapper>

            <CommonButton
              width={width < 800 ? `230px` : `274px`}
              height={width < 800 ? `50px` : `68px`}
              fontSize={width < 800 ? `16px` : `20px`}
              kindOf={`grey`}
              margin={width < 800 ? `30px 0 50px` : `0 0 100px`}
              // onClick={() => router.push(`/product?parent=22&target=24`)}
            >
              해당 카테고리 상품 더보기 +
            </CommonButton>
          </RsWrapper>

          <Wrapper
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/main/img_5nd_banner.png")`}
            height={width < 800 ? `150px` : `240px`}
          ></Wrapper>

          <RsWrapper
            dr={`row`}
            ju={`space-between`}
            margin={width < 800 ? `60px 0` : `100px 0`}
          >
            {eventList && eventList.length === 0 ? (
              <Wrapper padding={`50px 0`}>
                <Empty description="조회된 이벤트가 없습니다." />
              </Wrapper>
            ) : (
              eventList.slice(0, 2).map((data) => {
                return (
                  <EventBox
                    key={data.id}
                    width={width < 800 ? `100%` : `49%`}
                    al={`flex-end`}
                    ju={`flex-end`}
                    padding={width < 800 ? `20px` : `0 50px 40px 0`}
                    margin={width < 800 ? `0 0 15px` : `0 0 30px`}
                  >
                    <Image alt="thumbnail" src={data.thumbnail} />
                    <Link href={`/event/${data.id}`}>
                      <ATag dr={`row`} ju={`flex-end`}>
                        <Text
                          isHover
                          fontSize={width < 800 ? `16px` : `18px`}
                          fontWeight={`600`}
                        >
                          자세히 보기 <RightOutlined />
                        </Text>
                      </ATag>
                    </Link>
                  </EventBox>
                );
              })
            )}
          </RsWrapper>
          <Popup />

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

    context.store.dispatch({
      type: ADVERTISE_LIST_REQUEST,
    });

    context.store.dispatch({
      type: EVENT_LIST_REQUEST,
    });

    context.store.dispatch({
      type: PRODUCT_LECO_LIST_REQUEST,
    });

    context.store.dispatch({
      type: PRODUCT_NEW_LIST_REQUEST,
    });

    context.store.dispatch({
      type: PRODUCT_BEST_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
