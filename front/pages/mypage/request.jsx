import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  CustomPage,
} from "../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../components/MypageTop";
import { LockFilled } from "@ant-design/icons";
import { REQUEST_MY_LIST_REQUEST } from "../../reducers/request";
import { useDispatch, useSelector } from "react-redux";
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
`;

const MobileList = styled(Wrapper)`
  margin: 0 0 10px;
  border: 1px solid ${Theme.lightGrey2_C};
  padding: 15px;

  &:last-child {
    margin: 0;
  }

  &:nth-child(2n) {
    background: ${Theme.subTheme_C};
  }
`;

const Request = () => {
  ////// GLOBAL STATE //////
  const { requestMyList, lastPage } = useSelector((state) => state.request);
  const [currentTap, setCurrentTab] = useState(1);

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: REQUEST_MY_LIST_REQUEST,
      data: {
        page: currentTap,
      },
    });
  }, [currentTap]);

  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 상품요청</title>
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
              <Text>상품 요청 내역</Text>
            </Wrapper>

            <Wrapper
              height={`54px`}
              dr={`row`}
              color={Theme.grey_C}
              bgColor={Theme.lightGrey3_C}
              borderTop={`1px solid ${Theme.basicTheme_C}`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              fontSize={`16px`}
              fontWeight={`600`}
              display={width < 800 ? `none` : `flex`}
            >
              <Wrapper width={`8%`}>번호</Wrapper>
              <Wrapper width={`50%`}>제목</Wrapper>
              <Wrapper width={`14%`}>작성자</Wrapper>
              <Wrapper width={`14%`}>작성일</Wrapper>
              <Wrapper width={`14%`}>답변상태</Wrapper>
            </Wrapper>

            {width < 700 ? (
              <Wrapper>
                {requestMyList && requestMyList.length === 0 ? (
                  <Wrapper padding={`50px 0`}>
                    <Empty description="조회된 상품요청이 없습니다." />
                  </Wrapper>
                ) : (
                  requestMyList.map((data) => {
                    return (
                      <MobileList>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          color={Theme.darkGrey_C}
                          fontSize={`16px`}
                          margin={`0 0 10px`}
                        >
                          <Text maxWidth={`90%`} isEllipsis isHover>
                            {data.productName}
                          </Text>
                          <Text padding={`0 5px`}>
                            <LockFilled />
                          </Text>
                        </Wrapper>

                        <Wrapper dr={`row`} ju={`space-between`}>
                          <Text color={Theme.grey_C}>{data.name}</Text>
                          <Text>{data.viewCreatedAt}</Text>
                          {data.isCompleted ? (
                            <Text>답변완료</Text>
                          ) : (
                            <Text color={Theme.grey_C}>답변대기</Text>
                          )}
                        </Wrapper>
                      </MobileList>
                    );
                  })
                )}
              </Wrapper>
            ) : (
              <>
                {requestMyList && requestMyList.length === 0 ? (
                  <Wrapper padding={`50px 0`}>
                    <Empty description="조회된 상품요청이 없습니다." />
                  </Wrapper>
                ) : (
                  requestMyList.map((data) => {
                    return (
                      <List>
                        <Wrapper width={`8%`} color={Theme.grey_C}>
                          {data.num}
                        </Wrapper>
                        <Wrapper
                          width={`50%`}
                          padding={`0 14px`}
                          color={Theme.darkGrey_C}
                        >
                          <Wrapper dr={`row`} ju={`flex-start`}>
                            <Text maxWidth={`52%`} isEllipsis isHover>
                              {data.productName}
                            </Text>
                            <Text padding={`0 5px`}>
                              <LockFilled />
                            </Text>
                          </Wrapper>
                        </Wrapper>
                        <Wrapper width={`14%`} color={Theme.grey_C}>
                          {data.name}
                        </Wrapper>
                        <Wrapper width={`14%`}>{data.viewCreatedAt}</Wrapper>
                        <Wrapper
                          width={`14%`}
                          fontSize={`16px`}
                          fontWeight={`600`}
                        >
                          {data.isCompleted ? (
                            <Text>답변완료</Text>
                          ) : (
                            <Text color={Theme.grey_C}>답변대기</Text>
                          )}
                        </Wrapper>
                      </List>
                    );
                  })
                )}
              </>
            )}

            <CustomPage
              defaultCurrent={1}
              current={parseInt(currentTap)}
              total={lastPage * 10}
              pageSize={10}
              onChange={(page) => nextPageCall(page)}
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Request;
