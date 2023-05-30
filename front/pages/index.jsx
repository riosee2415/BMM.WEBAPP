import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
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
import { ConsoleSqlOutlined, RightOutlined } from "@ant-design/icons";
import { ADVERTISE_LIST_REQUEST } from "../reducers/advertise";
import { EVENT_LIST_REQUEST } from "../reducers/event";
import Link from "next/dist/client/link";
import { Empty } from "antd";
import { PRODUCT_LECO_LIST_REQUEST } from "../reducers/product";

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

const Home = ({}) => {
  ////// GLOBAL STATE //////
  const { advertiseList } = useSelector((state) => state.advertise);
  const { eventList } = useSelector((state) => state.event);
  const { productLecoList } = useSelector((state) => state.product);

  ////// HOOKS //////
  const width = useWidth();

  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////
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
                <MainNewSlider />
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
              <Btn isActive>건강</Btn>
              <Btn>뷰티</Btn>
              <Btn>다이어트</Btn>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              {/* 최대 8개 */}
              {bannerData &&
                bannerData.map((data, idx) => {
                  return (
                    <ProductWrapper key={idx}>
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
                    </ProductWrapper>
                  );
                })}
            </Wrapper>

            <CommonButton
              width={width < 800 ? `230px` : `274px`}
              height={width < 800 ? `50px` : `68px`}
              fontSize={width < 800 ? `16px` : `20px`}
              kindOf={`grey`}
              margin={width < 800 ? `30px 0 50px` : `0 0 100px`}
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
