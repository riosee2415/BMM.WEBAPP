import React from "react";
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
} from "../../components/commonComponents";
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

const List = styled(Wrapper)`
  height: 60px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;

  &:hover {
    cursor: pointer;
    border-bottom: 1px solid ${Theme.basicTheme_C};
  }

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const width = useWidth();

  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////

  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 공지사항</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 0`}>
          <RsWrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 500 ? `20px` : `34px`}
              fontWeight={`600`}
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
                  <Select>
                    <Select.Option>전체</Select.Option>
                    <Select.Option>2</Select.Option>
                    <Select.Option>3</Select.Option>
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

            <List>
              <Wrapper width={width < 900 ? `10%` : `6%`}>1</Wrapper>
              <Wrapper
                width={width < 900 ? `50%` : `74%`}
                padding={width < 900 ? `0` : `0 14px`}
                al={`flex-start`}
              >
                <Text width={`100%`} isEllipsis>
                  공지사항 제목이 들어오는 곳입니다.
                </Text>
              </Wrapper>
              <Wrapper width={width < 900 ? `15%` : `10%`}>456</Wrapper>
              <Wrapper width={width < 900 ? `25%` : `10%`}>2022.12.31</Wrapper>
            </List>
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
