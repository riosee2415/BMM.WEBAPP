import React, { useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { EVENT_LIST_REQUEST } from "../../reducers/event";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  CustomPage,
  Image,
  ATag,
} from "../../components/commonComponents";
import styled from "styled-components";
import Link from "next/dist/client/link";
import { useDispatch, useSelector } from "react-redux";

const List = styled(Wrapper)`
  width: 49%;
  margin: 0 0 60px;
  align-items: flex-start;

  &:hover {
    cursor: pointer;

    & img {
      box-shadow: 3px 3px 10px ${Theme.lightGrey_C};
    }
  }

  @media (max-width: 700px) {
    width: 100%;
    margin: 0 0 30px;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { eventList } = useSelector((state) => state.event);
  console.log(eventList);

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: EVENT_LIST_REQUEST,
      data: {
        page: 1,
        searchTitle: "",
      },
    });
  }, []);
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 이벤트</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 0` : `95px 0 0`}>
          <RsWrapper>
            <Wrapper al={`flex-start`}>
              <Text
                fontSize={width < 500 ? `20px` : `34px`}
                fontWeight={`bold`}
                margin={`0 0 30px`}
              >
                이벤트
              </Text>
            </Wrapper>
            {eventList &&
              eventList.map((data) => {
                return (
                  <Wrapper
                    key={data.id}
                    dr={`row`}
                    ju={`space-between`}
                    al={`flex-start`}
                  >
                    <Link href={`/event/${data.id}`}>
                      <ATag ju={`space-between`}>
                        <List>
                          <Image
                            alt="thumbnail"
                            src={eventList && eventList.thumbnail}
                          />
                          <Text
                            width={`100%`}
                            isEllipsis
                            margin={`22px 0 5px`}
                            fontSize={width < 700 ? `16px` : `20px`}
                          >
                            {data.title}
                          </Text>
                          <Text color={Theme.grey_C}>{data.content}</Text>
                        </List>
                      </ATag>
                    </Link>
                  </Wrapper>
                );
              })}

            <CustomPage />
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
