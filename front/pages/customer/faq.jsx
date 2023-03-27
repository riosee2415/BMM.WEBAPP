import React, { useState, useCallback } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CustomSelect,
  Image,
  RsWrapper,
  SpanText,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import CustomerLeft from "../../components/CustomerLeft";
import Theme from "../../components/Theme";
import { Empty, Select } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FAQTYPE_LIST_REQUEST, FAQ_LIST_REQUEST } from "../../reducers/faq";
import { useEffect } from "react";

const List = styled(Wrapper)`
  padding: 20px 28px;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 50px;
  border: 1px solid ${Theme.lightGrey2_C};
  margin: 12px 0 0;

  &:first-child {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
    border: 1px solid ${Theme.basicTheme_C};
  }

  @media (max-width: 900px) {
    padding: 20px 15px;
  }
`;

const Faq = () => {
  ////// GLOBAL STATE //////
  const { typeList, faqList } = useSelector((state) => state.faq);

  const [isVisible, setIsVisible] = useState(false);
  const [visibleId, setVisibleId] = useState(null);
  const [searchType, setSearchType] = useState("전체");
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: FAQ_LIST_REQUEST,
      data: {
        FaqTypeId: searchType,
      },
    });
  }, [searchType]);

  ////// TOGGLE //////
  const faqToggle = useCallback(
    (data) => {
      if (data.id === visibleId) {
        setIsVisible(false);
        setVisibleId(null);

        return;
      }

      if (data) {
        setVisibleId(data.id);
        setIsVisible(true);
      }
    },
    [isVisible, visibleId]
  );

  ////// HANDLER //////
  const searchTypeHandler = useCallback(
    (data) => {
      setSearchType(data === "전체" ? null : data);
    },
    [searchType]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | FAQ</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `70px 0` : `95px 0 100px`}>
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
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/3D_faq.png`}
                  width={width < 900 ? `90px` : `115px`}
                />
                <Wrapper
                  width={width < 900 ? `100%` : `calc(100% - 115px)`}
                  padding={width < 900 ? `0` : `0 0 0 18px`}
                  al={`flex-start`}
                  height={width < 1100 ? `auto` : `115px`}
                  ju={`space-between`}
                >
                  <Wrapper
                    al={`flex-start`}
                    fontSize={width < 900 ? `14px` : `24px`}
                  >
                    <Text>무엇을 도와드릴까요?</Text>
                    <Text>
                      <SpanText fontWeight={`bold`}>Buy Me Mine</SpanText>에
                      대하여 궁금하신 사항을 알려드립니다.
                    </Text>
                  </Wrapper>
                  {width < 900 ? (
                    <>
                      <Wrapper al={`flex-start`} fontSize={`14px`}>
                        찾으시는 답변이 없으신가요?
                      </Wrapper>
                      <Wrapper dr={`row`} ju={`flex-start`} fontSize={`16px`}>
                        <Text
                          onClick={() => router.push(`/customer/contact`)}
                          isHover
                          fontWeight={`600`}
                          td={`underline`}
                        >
                          1:1
                        </Text>
                        문의를 이용해주세요!
                      </Wrapper>
                    </>
                  ) : (
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      fontSize={width < 900 ? `14px` : `18px`}
                    >
                      찾으시는 답변이 없으신가요?
                      <Text
                        onClick={() => router.push(`/customer/contact`)}
                        isHover
                        fontWeight={`600`}
                        td={`underline`}
                        margin={`0 0 0 5px`}
                      >
                        1:1
                      </Text>
                      문의를 이용해주세요!
                    </Wrapper>
                  )}
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} ju={`space-between`} margin={`45px 0 40px`}>
                <Text
                  fontSize={width < 900 ? `22px` : `28px`}
                  fontWeight={`bold`}
                >
                  FAQ
                </Text>
                <CustomSelect>
                  <Select onChange={searchTypeHandler} placeholder="유형 선택">
                    <Select.Option value={"전체"}>전체</Select.Option>
                    {typeList &&
                      typeList.map((data) => {
                        return (
                          <Select.Option key={data.id} value={data.id}>
                            {data.value}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </CustomSelect>
              </Wrapper>

              <Wrapper>
                {faqList && faqList.length === 0 ? (
                  <Wrapper padding={`50px 0`}>
                    <Empty description="조회된 FAQ가 없습니다." />
                  </Wrapper>
                ) : (
                  faqList.map((data) => {
                    return (
                      <>
                        <List onClick={() => faqToggle(data)} key={data.id}>
                          <Image
                            alt="Q"
                            width={`21px`}
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/Q.png`}
                          />
                          <Wrapper
                            width={`calc(100% - 21px - 20px)`}
                            al={`flex-start`}
                            padding={`0 12px`}
                          >
                            <Text fontSize={width < 900 ? `14px` : `18px`}>
                              {data.question}
                            </Text>
                          </Wrapper>
                          <Text color={Theme.lightGrey_C}>
                            {isVisible ? <UpOutlined /> : <DownOutlined />}
                          </Text>
                        </List>
                        {visibleId === data.id && isVisible && (
                          <Wrapper
                            radius={`30px`}
                            padding={width < 900 ? `30px 15px` : `40px 26px`}
                            bgColor={Theme.lightGrey3_C}
                            dr={`row`}
                            al={`flex-start`}
                            margin={`6px 0 0`}
                          >
                            <Image
                              alt="A"
                              width={`21px`}
                              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/A.png`}
                            />
                            <Wrapper
                              width={`calc(100% - 21px)`}
                              al={`flex-start`}
                              padding={`0 12px`}
                              color={Theme.darkGrey_C}
                            >
                              <Text fontSize={width < 900 ? `14px` : `16px`}>
                                {data.answer}
                              </Text>
                            </Wrapper>
                          </Wrapper>
                        )}
                      </>
                    );
                  })
                )}
              </Wrapper>
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
      type: FAQTYPE_LIST_REQUEST,
    });

    context.store.dispatch({
      type: FAQ_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Faq;
