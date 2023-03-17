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
  Image,
  CommonButton,
  SpanText,
  TextInput,
  CustomSelect,
  ATag,
} from "../../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../../components/MypageTop";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Select } from "antd";
import Link from "next/dist/client/link";
const List = styled(Wrapper)`
  height: 100px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;
  margin: 0 0 60px;
`;

const MobileList = styled(Wrapper)`
  margin: 0 0 60px;
  border: 1px solid ${Theme.lightGrey2_C};
  padding: 15px;
`;
const PictureWrapper = styled(Wrapper)`
  width: 111px;
  height: 111px;
  margin: 0 11px 10px 0;

  border: 1px solid ${Theme.lightGrey2_C};
  border-radius: 5%;
  background-color: ${Theme.lightGrey2_C};
  color: ${Theme.grey_C};
  cursor: pointer;

  &:hover {
    transition: 0.3s;
    background: ${(props) => props.theme.lightGrey3_C};
  }

  @media (max-width: 1100px) {
    width: 150px;
    height: 150px;
  }
`;

const Circle = styled(Wrapper)`
  width: 15px;
  height: 15px;
  background: ${Theme.white_C};
  border-radius: 100%;
  color: ${Theme.red_C};
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 10px;

  &:hover {
    cursor: pointer;
    background: ${Theme.red_C};
    color: ${Theme.white_C};
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
        <title>BUY ME MINE | 환불 주문서</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`95px 0 100px`}>
          <RsWrapper>
            <MypageTop />
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 1100 ? `26px` : `30px`}
              fontWeight={`600`}
              margin={width < 700 ? `0 0 15px` : `0 0 30px`}
            >
              <Text>환불 신청하기</Text>
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
              <Wrapper width={`10%`}>주문일자</Wrapper>
              <Wrapper width={`40%`}>상품명</Wrapper>
              <Wrapper width={`10%`}>주문수량</Wrapper>
              <Wrapper width={`10%`}>상품금액</Wrapper>
              <Wrapper width={`10%`}>무게</Wrapper>
              <Wrapper width={`10%`}>배송비</Wrapper>
              <Wrapper width={`10%`}>상태</Wrapper>
            </Wrapper>
            {width < 1100 ? (
              <Wrapper>
                <MobileList>
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 5px`}>
                    <Text fontWeight={`600`}>배송 완료</Text>
                    <Text color={Theme.grey_C} margin={`0 0 0 5px`}>
                      2022.12.21
                    </Text>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={`14px`}
                    margin={`0 0 10px`}
                  >
                    <Image
                      alt="샘플사진"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                      width={`70px`}
                      height={`70px`}
                    />
                    <Wrapper
                      width={`auto`}
                      al={`flex-start`}
                      padding={`0 0 0 10px`}
                    >
                      <Text>오레오 시리즈 420g</Text>
                      <Text>주문수량 : 1</Text>
                      <Text>상품금액: 28,000원 + 4,000원</Text>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper>
                    <CommonButton
                      width={`49%`}
                      height={`26px`}
                      padding={`0`}
                      radius={`3px`}
                      kindOf={`white`}
                      margin={`5px 0 8px`}
                    >
                      리뷰 작성
                    </CommonButton>
                  </Wrapper>
                </MobileList>
              </Wrapper>
            ) : (
              <>
                <List>
                  <Wrapper color={Theme.darkGrey_C} width={`10%`}>
                    2022.12.21
                  </Wrapper>
                  <Wrapper
                    width={`40%`}
                    dr={`row`}
                    ju={`flex-start`}
                    fontSize={`18px`}
                    fontWeight={`600`}
                    padding={`0 0 0 38px`}
                  >
                    <Image
                      alt="샘플사진"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                      width={`64px`}
                      height={`64px`}
                    />
                    <Text padding={`0 0 0 14px`}>오레오 시리즈</Text>
                  </Wrapper>
                  <Wrapper width={`10%`}>1</Wrapper>
                  <Wrapper color={Theme.darkGrey_C} width={`10%`}>
                    28,000원
                  </Wrapper>
                  <Wrapper color={Theme.darkGrey_C} width={`10%`}>
                    420g
                  </Wrapper>
                  <Wrapper color={Theme.darkGrey_C} width={`10%`}>
                    4,000원
                  </Wrapper>
                  <Wrapper width={`10%`}>
                    <Wrapper fontSize={`16px`} fontWeight={`600`}>
                      배송완료
                    </Wrapper>
                    <CommonButton
                      width={`70px`}
                      height={`26px`}
                      padding={`0`}
                      radius={`3px`}
                      kindOf={`white`}
                      margin={`5px 0 8px`}
                    >
                      리뷰 작성
                    </CommonButton>
                  </Wrapper>
                </List>
              </>
            )}

            <Wrapper al={`flesx-start`}>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                borderBottom={`1px solid ${Theme.basicTheme_C}`}
              >
                <Text
                  fontSize={width < 1100 ? `20px` : `24px`}
                  fontWeight={`600`}
                  margin={`0 0 20px`}
                >
                  환불 주문서
                </Text>
              </Wrapper>
            </Wrapper>
            <Wrapper width={`100%`}>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                padding={`16px 0`}
                borderBottom={`1px solid ${Theme.lightGrey5_C}`}
              >
                <Text
                  width={width < 1100 ? `100%` : `20%`}
                  lineHeight={`46px`}
                  fontSize={`16px`}
                >
                  수령인 이름<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  width={width < 1100 ? `100%` : `30%`}
                  height={`46px`}
                  border={`1px solid ${Theme.lightGrey2_C}`}
                  al={`flex-start`}
                  placeholder="이름을 입력해주세요."
                />
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                padding={`16px 0`}
              >
                <Text
                  width={width < 1100 ? `100%` : `20%`}
                  lineHeight={`46px`}
                  fontSize={`16px`}
                >
                  이메일<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  width={width < 1100 ? `100%` : `30%`}
                  height={`46px`}
                  border={`1px solid ${Theme.lightGrey2_C}`}
                  al={`flex-start`}
                  placeholder="이메일을 입력해주세요."
                />
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                padding={`16px 0`}
              >
                <Text
                  width={width < 1100 ? `100%` : `20%`}
                  lineHeight={`46px`}
                  fontSize={`16px`}
                >
                  연락처<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  width={width < 1100 ? `100%` : `30%`}
                  height={`46px`}
                  border={`1px solid ${Theme.lightGrey2_C}`}
                  al={`flex-start`}
                  placeholder="'-' 제외 연락처를 입력해주세요."
                />
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                padding={`16px 0`}
              >
                <Wrapper
                  width={width < 1100 ? `45%` : `20%`}
                  al={`flex-start`}
                  lineHeight={`46px`}
                  fontSize={`16px`}
                >
                  <Text>
                    주소<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                </Wrapper>

                <Wrapper
                  width={width < 1100 ? `100%` : `30%`}
                  al={`flex-start`}
                >
                  <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 10px`}>
                    <TextInput
                      width={`calc(100% - 120px)`}
                      height={`46px`}
                      border={`1px solid ${Theme.lightGrey2_C}`}
                      al={`flex-start`}
                      margin={`0 10px 0 0`}
                      placeholder="우편번호"
                    />
                    <CommonButton
                      width={`110px`}
                      height={`46px`}
                      fontSize={`16px`}
                      fontWeight={`600`}
                    >
                      우편번호
                    </CommonButton>
                  </Wrapper>

                  <TextInput
                    width={`100%`}
                    height={`46px`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    al={`flex-start`}
                    margin={`0 0 10px`}
                    placeholder="기본주소"
                  />
                  <TextInput
                    width={`100%`}
                    height={`46px`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    al={`flex-start`}
                    placeholder="상세주소를 입력해주세요."
                  />
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                padding={`16px 0`}
              >
                <Text
                  width={width < 1100 ? `100%` : `20%`}
                  lineHeight={`46px`}
                  fontSize={`16px`}
                >
                  상품 이미지<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <Wrapper
                  width={width < 1100 ? `100%` : `80%`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <Wrapper
                    margin={`0 11px 10px 0`}
                    position={`relative`}
                    width={width < 1100 ? `150px` : `111px`}
                  >
                    <Image
                      height={width < 1100 ? `150px` : `111px`}
                      alt="리뷰 사진"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                    />
                    <Circle>
                      <CloseOutlined />
                    </Circle>
                  </Wrapper>
                  <PictureWrapper>
                    <Text fontSize={width < 1100 ? `14px` : `20px`}>
                      <PlusOutlined />
                    </Text>
                    <Text>첨부하기</Text>
                  </PictureWrapper>
                  <PictureWrapper>
                    <Text fontSize={width < 1100 ? `14px` : `20px`}>
                      <PlusOutlined />
                    </Text>
                    <Text>첨부하기</Text>
                  </PictureWrapper>
                  <PictureWrapper>
                    <Text fontSize={width < 1100 ? `14px` : `20px`}>
                      <PlusOutlined />
                    </Text>
                    <Text>첨부하기</Text>
                  </PictureWrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                margin={`0 0 50px`}
                borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                padding={`16px 0`}
              >
                <Text
                  width={width < 1100 ? `100%` : `20%`}
                  lineHeight={`46px`}
                  fontSize={`16px`}
                >
                  환불 사유<SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <CustomSelect
                  width={width < 1100 ? `100%` : `30%`}
                  height={`46px`}
                  margin={`0 10px 0 0`}
                  radius={`0`}
                >
                  <Select placeholder={`환불 사유를 선택해주세요.`}>
                    <Select.Option>전체</Select.Option>
                    <Select.Option>2</Select.Option>
                    <Select.Option>3</Select.Option>
                  </Select>
                </CustomSelect>
              </Wrapper>
            </Wrapper>
            <Wrapper
              color={Theme.red_C}
              fontSize={width < 800 ? `14px` : `16px`}
              fontWeight={`bold`}
              margin={`0 0 21px`}
            >
              · 환불 신청은 취소할 수 없습니다. 신중한 신청 부탁드립니다.
            </Wrapper>
            <Link href={`/mypage/refond/1`}>
              <ATag>
                <CommonButton
                  fontSize={width < 1100 ? `16px` : `18px`}
                  fontWeight={`600`}
                  kindOf={`white`}
                  width={`240px`}
                  height={`54px`}
                >
                  환불 신청하기
                </CommonButton>
              </ATag>
            </Link>
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
