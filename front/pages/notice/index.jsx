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
  CustomSelect,
  CustomPage,
  TextInput,
  ATag,
} from "../../components/commonComponents";
import { Empty, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/dist/client/link";
import { useDispatch, useSelector } from "react-redux";
import { NOTICE_LIST_REQUEST } from "../../reducers/notice";
import useInput from "../../hooks/useInput";

const List = styled(Wrapper)`
  height: 60px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;

  &:hover {
    cursor: pointer;
    background: ${Theme.subTheme_C};
  }

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { notices, lastPage } = useSelector((state) => state.notice);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderType, setOrderType] = useState(1); // 순서

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();

  const search = useInput("");

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: NOTICE_LIST_REQUEST,
      data: {
        searchTitle: search.value,
        page: currentPage,
        orderType: orderType,
      },
    });
  }, [search.value, currentPage, orderType]);

  ////// TOGGLE //////

  ////// HANDLER //////
  // 페이지네이션
  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
    },
    [currentPage]
  );

  // 순서
  const orderTypeHandler = useCallback(
    (data) => {
      setOrderType(data);
    },
    [orderType]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 공지사항</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 0` : `95px 0 0`}>
          <RsWrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 500 ? `20px` : `34px`}
              fontWeight={`bold`}
              margin={`0 0 33px`}
            >
              <Text margin={width < 700 ? `0 0 20px` : `0`}>공지사항</Text>
              <Wrapper
                width={width < 700 ? `100%` : `auto`}
                dr={`row`}
                ju={`flex-end`}
              >
                <CustomSelect
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `100px` : `124px`}
                  height={width < 500 ? `40px` : `46px`}
                >
                  <Select
                    placeholder="최신순"
                    value={orderType}
                    onChange={orderTypeHandler}
                  >
                    <Select.Option value={1}>최신순</Select.Option>
                    <Select.Option value={2}>제목순</Select.Option>
                  </Select>
                </CustomSelect>
                <Wrapper
                  width={width < 500 ? `190px` : `288px`}
                  position={`relative`}
                >
                  <TextInput
                    width={width < 500 ? `190px` : `288px`}
                    height={width < 500 ? `40px` : `46px`}
                    type="text"
                    fontSize={width < 500 ? `8px` : `16px`}
                    placeholder="검색어를 입력해주세요."
                    radius={`46px`}
                    padding={`0 40px 0 10px`}
                    {...search}
                  />
                  <Wrapper
                    width={`auto`}
                    fontSize={width < 500 ? `14px` : `16px`}
                    position={`absolute`}
                    right={`16px`}
                    top={`0`}
                    cursor={`pointer`}
                    height={width < 500 ? `40px` : `46px`}
                  >
                    <SearchOutlined />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              height={`54px`}
              dr={`row`}
              bgColor={Theme.lightGrey3_C}
              borderTop={`1px solid ${Theme.basicTheme_C}`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
              fontSize={width < 500 ? `14px` : `16px`}
              fontWeight={`600`}
            >
              <Wrapper width={width < 900 ? `10%` : `6%`}>번호</Wrapper>
              <Wrapper width={width < 900 ? `50%` : `74%`}>제목</Wrapper>
              <Wrapper width={width < 900 ? `15%` : `10%`}>조회수</Wrapper>
              <Wrapper width={width < 900 ? `25%` : `10%`}>작성일</Wrapper>
            </Wrapper>
            {notices && notices.length === 0 ? (
              <Wrapper padding={`50px 0`}>
                <Empty description="조회된 공지사항이 없습니다." />
              </Wrapper>
            ) : (
              notices.map((data) => {
                return (
                  <Link href={`/notice/${data.id}`} key={`data.id`}>
                    <ATag>
                      <List>
                        <Wrapper width={width < 900 ? `10%` : `6%`}>
                          {data.num}
                        </Wrapper>
                        <Wrapper
                          width={width < 900 ? `50%` : `74%`}
                          padding={width < 900 ? `0` : `0 14px`}
                          al={`flex-start`}
                        >
                          <Text width={`100%`} isEllipsis>
                            {data.title}
                          </Text>
                        </Wrapper>
                        <Wrapper width={width < 900 ? `15%` : `10%`}>
                          {data.hit}
                        </Wrapper>
                        <Wrapper width={width < 900 ? `25%` : `10%`}>
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
      type: NOTICE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
