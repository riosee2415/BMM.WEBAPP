import React, { useState, useCallback, useEffect } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import { REQUEST_LIST_REQUEST } from "../../../reducers/request";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CommonButton,
  CustomPage,
  CustomSelect,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import CustomerLeft from "../../../components/CustomerLeft";
import Theme from "../../../components/Theme";

import styled from "styled-components";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Select } from "antd";
import { LockFilled } from "@ant-design/icons";

const List = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  height: 60px;
  font-size: 16px;

  &:hover {
    cursor: pointer;
    border-bottom: 1px solid ${Theme.basicTheme_C};
  }

  @media (max-width: 700px) {
    height: auto;
    padding: 10px;
    border: 1px solid ${Theme.lightGrey2_C};
    margin: 0 0 15px;
    border-radius: 10px;

    &:nth-child(2n) {
      background: ${Theme.lightGrey3_C};
    }
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { requestList, lastPage } = useSelector((state) => state.request);
  const [currentTap, setCurrentTab] = useState(1);

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();
  const router = useRouter();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: REQUEST_LIST_REQUEST,
      data: {
        page: currentTap,
      },
    });
  }, [currentTap]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const nextPageCall = useCallback(
    (changePage) => {
      setCurrentTab(changePage);
    },
    [currentTap]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 상품 요청</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `70px 0 0` : `95px 0 0`}>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <CustomerLeft />
            <Wrapper
              width={
                width < 1100
                  ? width < 900
                    ? `100%`
                    : `calc(100% - 200px)`
                  : `calc(100% - 260px)`
              }
            >
              <Wrapper
                bgColor={Theme.lightGrey3_C}
                padding={width < 900 ? `20px 10px` : `40px`}
                dr={`row`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/3D_product-request.png`}
                  width={width < 900 ? `90px` : `115px`}
                />
                <Wrapper
                  width={
                    width < 900 ? `calc(100% - 90px)` : `calc(100% - 115px)`
                  }
                  padding={width < 900 ? `0 0 0 10px` : `0 0 0 18px`}
                  al={`flex-start`}
                  ju={`space-between`}
                >
                  <Wrapper
                    al={`flex-start`}
                    fontSize={width < 900 ? `14px` : `24px`}
                  >
                    <Text>찾으시는 상품이 없으신가요?</Text>
                    <Text>
                      <SpanText fontWeight={`bold`}>상품 요청 서비스</SpanText>
                      를 이용해보세요!
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    al={`flex-end`}
                    fontSize={width < 900 ? `14px` : `18px`}
                  >
                    Buy ME MINE은 고객을 위해 맞춤 서비스를 제공합니다.
                    <CommonButton
                      width={`160px`}
                      height={width < 900 ? `40px` : `48px`}
                      fontSize={width < 900 ? `16px` : `18px`}
                      fontWeight={`600`}
                      kindOf={`white`}
                      onClick={() => router.push(`/customer/request/write`)}
                    >
                      상품 요청하기
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} ju={`space-between`} margin={`45px 0 40px`}>
                <Text
                  fontSize={width < 900 ? `22px` : `28px`}
                  fontWeight={`bold`}
                >
                  상품 요청
                </Text>
                <Wrapper width={`auto`} dr={`row`}>
                  <CustomSelect>
                    <Select placeholder="전체">
                      <Select.Option>전체</Select.Option>
                      <Select.Option>답변대기</Select.Option>
                      <Select.Option>답변완료</Select.Option>
                    </Select>
                  </CustomSelect>
                  <Wrapper
                    width={width < 900 ? `calc(100% - 134px)` : `288px`}
                    position={`relative`}
                    margin={`0 0 0 10px`}
                  >
                    <TextInput
                      type={`text`}
                      width={`100%`}
                      height={`46px`}
                      placeholder={`검색어를 입력해주세요.`}
                      radius={`46px`}
                      padding={`0 40px 0 20px`}
                    />
                    <Wrapper
                      width={`auto`}
                      position={`absolute`}
                      top={`0`}
                      right={`15px`}
                      height={`100%`}
                    >
                      <Image
                        width={`16px`}
                        alt="icon"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_search.png`}
                      />
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                borderTop={`1px solid ${Theme.basicTheme_C}`}
                height={`54px`}
                bgColor={Theme.lightGrey3_C}
                borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                fontSize={`16px`}
                fontWeight={`600`}
                color={Theme.grey_C}
                display={width < 700 ? `none` : `flex`}
              >
                <Wrapper width={`8%`}>번호</Wrapper>
                <Wrapper width={`56%`}>제목</Wrapper>
                <Wrapper width={`12%`}>작성자</Wrapper>
                <Wrapper width={`12%`}>작성일</Wrapper>
                <Wrapper width={`12%`}>답변상태</Wrapper>
              </Wrapper>
              {requestList && requestList.length === 0 ? (
                <Wrapper padding={`50px 0`}>
                  <Empty description="조회 된 상품요청 내역이 없습니다." />
                </Wrapper>
              ) : (
                requestList.map((data) => {
                  return (
                    <List
                      onClick={() => router.push(`/customer/request/secret`)}
                      key={`data.req.user.id`}
                    >
                      <Wrapper
                        display={width < 700 ? `none` : `flex`}
                        width={`8%`}
                        color={Theme.grey_C}
                      >
                        {data.id}
                      </Wrapper>
                      <Wrapper
                        width={width < 700 ? `100%` : `56%`}
                        dr={`row`}
                        padding={width < 700 ? `0 0 10px` : `0 14px`}
                        ju={`flex-start`}
                      >
                        <Text maxWidth={`90%`} isEllipsis margin={`0 6px 0 0`}>
                          {data.productName}
                        </Text>
                        <LockFilled />
                      </Wrapper>
                      <Wrapper
                        color={Theme.grey_C}
                        width={width < 700 ? `calc(100% / 3)` : `12%`}
                      >
                        {data.name}
                      </Wrapper>
                      <Wrapper width={width < 700 ? `calc(100% / 3)` : `12%`}>
                        {data.createAt}
                      </Wrapper>
                      <Wrapper
                        width={width < 700 ? `calc(100% / 3)` : `12%`}
                        fontSize={width < 700 ? `15px` : `18px`}
                        fontWeight={`600`}
                      >
                        <Text color={Theme.grey_C}>{data.isCompleted}</Text>
                        {/* <Text>답변완료</Text> */}
                      </Wrapper>
                    </List>
                  );
                })
              )}
              <CustomPage
                defaultCurrent={1}
                current={parseInt(currentTap)}
                total={lastPage * 10}
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
