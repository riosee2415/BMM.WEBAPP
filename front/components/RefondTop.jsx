import React from "react";
import {
  Wrapper,
  Text,
  WholeWrapper,
  Image,
  ATag,
  CommonButton,
} from "./commonComponents";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import { useDispatch } from "react-redux";
import styled from "styled-components";
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

const RefondTop = () => {
  const width = useWidth();
  const dispatch = useDispatch();

  return (
    <WholeWrapper>
      <Wrapper>
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

              <Wrapper dr={`row`} ju={`space-between`}>
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
                <Link href={`/mypage/ordercheck/refond`}>
                  <ATag width={`49%`}>
                    <CommonButton
                      width={`100%`}
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
            </List>
          </>
        )}
      </Wrapper>
    </WholeWrapper>
  );
};

export default RefondTop;
