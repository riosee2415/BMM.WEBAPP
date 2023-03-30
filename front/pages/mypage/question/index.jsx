import React, { useCallback, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Theme from "../../../components/Theme";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  CustomPage,
  ATag,
} from "../../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../../components/MypageTop";
import Link from "next/dist/client/link";
import { useSelector } from "react-redux";
import { MY_QUE_LIST_REQUEST } from "../../../reducers/question";
import { Empty } from "antd";

const List = styled(Wrapper)`
  height: 60px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;

  &:hover {
    cursor: pointer;
    background: ${Theme.subTheme_C};
  }

  @media (max-width: 800px) {
    font-size: 14px;
  }
`;

const Question = () => {
  ////// GLOBAL STATE //////
  const { myQueList, lastPage } = useSelector((state) => state.question);

  const [currentPage, setCurrentPage] = useState(1);

  ////// HOOKS //////
  const width = useWidth();

  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  // 페이지네이션
  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
    },
    [currentPage]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 1:1 문의 내역</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 0` : `95px 0 0`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 700 ? `26px` : `30px`}
              fontWeight={`600`}
              margin={`0 0 30px`}
            >
              <Text>1:1 문의 내역</Text>
            </Wrapper>

            <Wrapper
              height={`54px`}
              dr={`row`}
              color={Theme.grey_C}
              bgColor={Theme.lightGrey3_C}
              borderTop={`1px solid ${Theme.basicTheme_C}`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              fontSize={width < 800 ? `14px` : `16px`}
              fontWeight={`600`}
            >
              <Wrapper width={`10%`} display={width < 800 ? `none` : `flex`}>
                번호
              </Wrapper>
              <Wrapper width={width < 800 ? `65%` : `75%`}>제목</Wrapper>
              <Wrapper width={width < 800 ? `35%` : `15%`}>문의날짜</Wrapper>
            </Wrapper>
            {myQueList && myQueList.length === 0 ? (
              <Wrapper padding={`50px 0`}>
                <Empty description="조회된 1:1문의 내역이 없습니다." />
              </Wrapper>
            ) : (
              myQueList.map((data) => {
                return (
                  <Link key={data.id} href={`/mypage/question/${data.id}`}>
                    <ATag>
                      <List>
                        <Wrapper
                          width={`10%`}
                          color={Theme.grey_C}
                          display={width < 800 ? `none` : `flex`}
                        >
                          {data.num}
                        </Wrapper>
                        <Wrapper
                          width={width < 800 ? `65%` : `75%`}
                          padding={width < 800 ? `0 10px` : `0 50px`}
                          color={Theme.darkGrey_C}
                        >
                          <Wrapper dr={`row`} ju={`flex-start`}>
                            <Text
                              width={width < 800 ? `100%` : `75%`}
                              isEllipsis
                            >
                              {data.title}
                            </Text>
                          </Wrapper>
                        </Wrapper>
                        <Wrapper width={width < 800 ? `35%` : `15%`}>
                          {data.viewCreatedAt}
                        </Wrapper>
                      </List>
                    </ATag>
                  </Link>
                );
              })
            )}

            <CustomPage
              defaultCurrent={1}
              current={parseInt(currentPage)}
              total={lastPage * 10}
              pageSize={10}
              onChange={(page) => otherPageCall(page)}
            />
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
      type: MY_QUE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Question;
