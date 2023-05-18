import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CustomPage,
  Image,
  ProductWrapper,
  RsWrapper,
  SquareBox,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  LIKE_CREATE_REQUEST,
  LIKE_DELETE_REQUEST,
  LIKE_LIST_REQUEST,
} from "../../reducers/like";
import { Empty, message } from "antd";
import { useRouter } from "next/router";

const DBtn = styled(Wrapper)`
  width: 10%;
  height: 33px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 5px 0 0;
  border: 1px solid ${Theme.lightGrey3_C};
  border-radius: 5%;
  background-color: ${Theme.lightGrey3_C};
  color: ${Theme.grey_C};

  cursor: pointer;

  &:hover {
    transition: 0.2s;
    background-color: ${Theme.lightGrey2_C};
  }

  @media (max-width: 800px) {
    width: 35%;
    font-size: 14px;
    margin: 0;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { likeList, likePage, st_likeCreateDone, st_likeDeleteDone } =
    useSelector((state) => state.like);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentTap, setCurrentTab] = useState(1);
  const [isLikeState, setIsLikeState] = useState(false);

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      router.push("/user/login");
      return message.error("로그인 후 이용해주세요.");
    }
  }, [me]);

  useEffect(() => {
    if (st_likeCreateDone) {
      dispatch({
        type: LIKE_LIST_REQUEST,
      });

      if (isLikeState) {
        message.success("찜목록에서 삭제되었습니다.");
      } else {
        message.success("찜목록에 추가되었습니다.");
      }
    }
  }, [st_likeCreateDone]);

  useEffect(() => {
    if (st_likeDeleteDone) {
      dispatch({
        type: LIKE_LIST_REQUEST,
      });
      message.success("찜목록이 전체 삭제되었습니다.");
    }
  }, [st_likeDeleteDone]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  //페이지네이션
  const nextPageCall = useCallback(
    (changePage) => {
      setCurrentTab(changePage);
    },
    [currentTap]
  );

  const likeCreateHandler = useCallback(
    (data) => {
      setIsLikeState(data.isLike);

      dispatch({
        type: LIKE_CREATE_REQUEST,
        data: {
          ProductId: data.ProductId,
        },
      });
    },
    [isLikeState]
  );

  const likeDeleteHandler = useCallback(() => {
    dispatch({
      type: LIKE_DELETE_REQUEST,
    });
  }, []);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 찜목록</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 800 ? `70px 0 0` : `95px 0 0`}>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 30px`}>
              <Text
                fontSize={width < 800 ? `22px` : `30px`}
                fontWeight={`bold`}
              >
                찜목록
              </Text>
              <DBtn onClick={() => likeDeleteHandler()}>목록 전체 삭제</DBtn>
            </Wrapper>
            <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
              {likeList && likeList.length === 0 ? (
                <Wrapper padding={`50px 0`}>
                  <Empty description="찜한 상품이 없습니다." />
                </Wrapper>
              ) : (
                likeList.map((data, idx) => {
                  return (
                    <ProductWrapper key={idx}>
                      <SquareBox
                        position={`relative`}
                        onClick={() =>
                          moveLinkHandler(`/product/${data.ProductId}`)
                        }
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
                            {data.realPrice}
                          </Text>
                          <Text
                            color={Theme.lightGrey_C}
                            fontSize={width < 800 ? `12px` : `16px`}
                            margin={`0 5px`}
                            className="line"
                          >
                            {data.concatMarketPrice}
                          </Text>
                          <Text
                            fontSize={width < 800 ? `13px` : `18px`}
                            fontWeight={`600`}
                            color={Theme.red_C}
                          >
                            {data.discount}%
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
                          {data.isLike === 0 ? (
                            <Image
                              width={width < 800 ? `18px` : `21px`}
                              alt="like icon"
                              onClick={() => likeCreateHandler(data)}
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/heart_A.png`}
                            />
                          ) : (
                            <Image
                              width={width < 800 ? `18px` : `21px`}
                              alt="like icon"
                              onClick={() => likeCreateHandler(data)}
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/heart.png`}
                            />
                          )}
                        </Wrapper>
                      </Wrapper>
                    </ProductWrapper>
                  );
                })
              )}

              <CustomPage
                defaultCurrent={1}
                current={parseInt(currentTap)}
                total={likePage * 10}
                pageSize={10}
                onChange={(page) => nextPageCall(page)}
              />
            </Wrapper>
          </RsWrapper>
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
      type: LIKE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
