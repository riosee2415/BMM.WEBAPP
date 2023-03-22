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
  Image,
  CommonButton,
  CustomSelect,
} from "../../../components/commonComponents";
import styled from "styled-components";
import MypageTop from "../../../components/MypageTop";
import Link from "next/dist/client/link";
import { Select } from "antd";

const Box = styled(Wrapper)`
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};

  &:last-child {
    border-bottom: none;
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
        <title>BUY ME MINE | 주문 / 배송 조회</title>
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
              <Text>주문 / 배송 조회</Text>
              <CustomSelect
                width={width < 1100 ? `30%` : `10%`}
                height={`46px`}
                margin={`0 10px 0 0`}
              >
                <Select placeholder={`전체`}>
                  <Select.Option>배송 전</Select.Option>
                  <Select.Option>배송 후</Select.Option>
                </Select>
              </CustomSelect>
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
            >
              <Wrapper width={`10%`}>주문일자</Wrapper>
              <Wrapper width={`60%`} dr={`row`}>
                <Wrapper width={`60%`}>상품명</Wrapper>
                <Wrapper width={`20%`}>주문수량</Wrapper>
                <Wrapper width={`20%`}>상품금액</Wrapper>
              </Wrapper>
              <Wrapper width={`10%`}>무게</Wrapper>
              <Wrapper width={`10%`}>배송비</Wrapper>
              <Wrapper width={`10%`}>상태</Wrapper>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`10%`} fontSize={`16px`}>
                2022.12.21
              </Wrapper>
              <Wrapper width={`60%`} dr={`row`}>
                <Box>
                  <Wrapper
                    width={`60%`}
                    borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                  >
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      fontSize={`18px`}
                      fontWeight={`600`}
                      padding={`0 0 0 38px`}
                      margin={`18px 0 18px`}
                    >
                      <Image
                        alt="샘플사진"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                        width={`64px`}
                        height={`64px`}
                      />
                      <Text padding={`0 0 0 14px`}>오레오 시리즈</Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper width={`20%`} fontSize={`16px`}>
                    1
                  </Wrapper>
                  <Wrapper width={`20%`} fontSize={`16px`}>
                    28,000원
                  </Wrapper>
                </Box>
              </Wrapper>
              <Wrapper width={`10%`} fontSize={`16px`}>
                420g
              </Wrapper>
              <Wrapper width={`10%`} fontSize={`16px`}>
                4,000원
              </Wrapper>
              <Wrapper width={`10%`}>
                <Wrapper fontSize={`16px`} fontWeight={`600`}>
                  환불 신청 완료
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
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`10%`} fontSize={`16px`}>
                2022.12.21
              </Wrapper>
              <Wrapper
                width={`60%`}
                dr={`row`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Box>
                  <Wrapper
                    width={`60%`}
                    borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                  >
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      fontSize={`18px`}
                      fontWeight={`600`}
                      padding={`0 0 0 38px`}
                      margin={`18px 0 18px`}
                    >
                      <Image
                        alt="샘플사진"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                        width={`64px`}
                        height={`64px`}
                      />
                      <Text padding={`0 0 0 14px`}>오레오 시리즈</Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper width={`20%`} fontSize={`16px`}>
                    1
                  </Wrapper>
                  <Wrapper width={`20%`} fontSize={`16px`}>
                    28,000원
                  </Wrapper>
                </Box>
                <Box>
                  <Wrapper
                    width={`60%`}
                    dr={`row`}
                    ju={`flex-start`}
                    borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                  >
                    <Wrapper
                      width={`auto`}
                      al={`flex-start`}
                      padding={`0 0 0 38px`}
                      margin={`18px 0 18px`}
                    >
                      <Image
                        alt="샘플사진"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/related-product.png`}
                        width={`64px`}
                        height={`64px`}
                        radius={`3px`}
                      />
                    </Wrapper>

                    <Wrapper
                      width={`70%`}
                      al={`flex-start`}
                      padding={`0 0 0 14px`}
                    >
                      <Text fontSize={`18px`} fontWeight={`600`}>
                        랩 에센스
                      </Text>
                      <Text color={Theme.grey_C}>옵션 : 오레오 핑크</Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper width={`20%`} fontSize={`16px`}>
                    1
                  </Wrapper>
                  <Wrapper width={`20%`} fontSize={`16px`}>
                    28,000원
                  </Wrapper>
                </Box>
              </Wrapper>
              <Wrapper
                width={`10%`}
                dr={`row`}
                fontSize={`16px`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Text>840g</Text>
              </Wrapper>
              <Wrapper
                width={`10%`}
                dr={`row`}
                fontSize={`16px`}
                borderRight={`1px solid ${Theme.lightGrey2_C}`}
              >
                <Text>9,000원</Text>
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
                <Link href={`/mypage/refond`}>
                  <ATag>
                    <CommonButton
                      width={`70px`}
                      height={`26px`}
                      padding={`0`}
                      radius={`3px`}
                      kindOf={`grey`}
                    >
                      환불신청
                    </CommonButton>
                  </ATag>
                </Link>
              </Wrapper>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`10%`} fontSize={`16px`}>
                2022.12.21
              </Wrapper>
              <Wrapper width={`60%`} dr={`row`}>
                <Box>
                  <Wrapper
                    width={`60%`}
                    borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                  >
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      fontSize={`18px`}
                      fontWeight={`600`}
                      padding={`0 0 0 38px`}
                      margin={`18px 0 18px`}
                    >
                      <Image
                        alt="샘플사진"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                        width={`64px`}
                        height={`64px`}
                      />
                      <Text padding={`0 0 0 14px`}>오레오 시리즈</Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper width={`20%`} fontSize={`16px`}>
                    1
                  </Wrapper>
                  <Wrapper width={`20%`} fontSize={`16px`}>
                    28,000원
                  </Wrapper>
                </Box>
              </Wrapper>
              <Wrapper width={`10%`} fontSize={`16px`}>
                420g
              </Wrapper>
              <Wrapper width={`10%`} fontSize={`16px`}>
                4,000원
              </Wrapper>
              <Wrapper width={`10%`}>
                <Wrapper fontSize={`16px`} fontWeight={`600`}>
                  결제완료
                </Wrapper>
                <CommonButton
                  width={`70px`}
                  height={`26px`}
                  padding={`0`}
                  radius={`3px`}
                  kindOf={`grey`}
                >
                  주문취소
                </CommonButton>
              </Wrapper>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`10%`} fontSize={`16px`}>
                2022.12.21
              </Wrapper>
              <Wrapper width={`60%`} dr={`row`}>
                <Box>
                  <Wrapper
                    width={`60%`}
                    borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                  >
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      fontSize={`18px`}
                      fontWeight={`600`}
                      padding={`0 0 0 38px`}
                      margin={`18px 0 18px`}
                    >
                      <Image
                        alt="샘플사진"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                        width={`64px`}
                        height={`64px`}
                      />
                      <Text padding={`0 0 0 14px`}>오레오 시리즈</Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper width={`20%`} fontSize={`16px`}>
                    1
                  </Wrapper>
                  <Wrapper width={`20%`} fontSize={`16px`}>
                    28,000원
                  </Wrapper>
                </Box>
              </Wrapper>
              <Wrapper width={`10%`} fontSize={`16px`}>
                420g
              </Wrapper>
              <Wrapper width={`10%`} fontSize={`16px`}>
                4,000원
              </Wrapper>
              <Wrapper width={`10%`}>
                <Wrapper fontSize={`16px`} fontWeight={`600`}>
                  배송중
                </Wrapper>
                <CommonButton
                  width={`70px`}
                  height={`26px`}
                  padding={`0`}
                  radius={`3px`}
                  kindOf={`grey`}
                >
                  배송조회
                </CommonButton>
              </Wrapper>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`10%`} fontSize={`16px`}>
                2022.12.21
              </Wrapper>
              <Wrapper width={`60%`} dr={`row`}>
                <Box>
                  <Wrapper
                    width={`60%`}
                    borderLeft={`1px solid ${Theme.lightGrey2_C}`}
                  >
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      fontSize={`18px`}
                      fontWeight={`600`}
                      padding={`0 0 0 38px`}
                      margin={`18px 0 18px`}
                    >
                      <Image
                        alt="샘플사진"
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/review.png`}
                        width={`64px`}
                        height={`64px`}
                      />
                      <Text padding={`0 0 0 14px`}>오레오 시리즈</Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper width={`20%`} fontSize={`16px`}>
                    1
                  </Wrapper>
                  <Wrapper width={`20%`} fontSize={`16px`}>
                    28,000원
                  </Wrapper>
                </Box>
              </Wrapper>
              <Wrapper width={`10%`} fontSize={`16px`}>
                420g
              </Wrapper>
              <Wrapper width={`10%`} fontSize={`16px`}>
                4,000원
              </Wrapper>
              <Wrapper width={`10%`}>
                <Wrapper fontSize={`16px`} fontWeight={`600`}>
                  배송 준비 중
                </Wrapper>
              </Wrapper>
            </Wrapper>
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
