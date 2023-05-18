import React from "react";
import { Wrapper, Text, WholeWrapper, ATag } from "./commonComponents";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import styled from "styled-components";
import Link from "next/dist/client/link";
import { useSelector } from "react-redux";

const MypageBox = styled(Wrapper)`
  position: relative;
  width: 25%;
  height: 100%;

  &:before {
    content: "";
    width: 1px;
    height: 60px;
    background: ${Theme.lightGrey2_C};
    position: absolute;
    right: 0;
    top: 50%;
    margin: -30px 0 0;
  }

  &:first-child:before,
  &:last-child:before {
    display: none;
  }

  @media (max-width: 700px) {
    width: 50%;
    height: 50%;

    &:before {
      display: none;
    }
  }
`;

const MypageTop = () => {
  const { me } = useSelector((state) => state.user);

  const width = useWidth();

  return (
    <WholeWrapper>
      <Wrapper>
        <Text fontSize={width < 700 ? `32px` : `42px`} fontWeight={`600`}>
          마이페이지
        </Text>
        <Text fontSize={width < 700 ? `16px` : `18px`} margin={`0 0 30px`}>
          {me && me.username} 회원님 환영합니다!
        </Text>
      </Wrapper>
      <Wrapper
        dr={`row`}
        border={`1px solid ${Theme.lightGrey2_C}`}
        margin={`0 0 60px`}
        height={width < 700 ? `160px` : `130px`}
      >
        <MypageBox bgColor={Theme.lightGrey3_C}>
          <Link href={`/mypage/grade`}>
            <ATag dr={`column`} height={`100%`}>
              <Text
                fontSize={width < 700 ? `18px` : `28px`}
                fontWeight={`bold`}
                color={Theme.grey_C}
              >
                {me && me.gradeName}
              </Text>
              <Text>회원 등급</Text>
            </ATag>
          </Link>
        </MypageBox>
        <MypageBox>
          <Link href={`/mypage/point`}>
            <ATag dr={`column`} height={`100%`}>
              <Text
                isHover
                fontSize={width < 700 ? `18px` : `28px`}
                fontWeight={`bold`}
              >
                {me && me.formatPoint}
              </Text>
              <Text>포인트</Text>
            </ATag>
          </Link>
        </MypageBox>

        <MypageBox>
          <Link href={`/mypage/wishlist`}>
            <ATag dr={`column`} height={`100%`}>
              <Text
                fontSize={width < 700 ? `18px` : `28px`}
                fontWeight={`bold`}
                isHover
              >
                3
              </Text>
              <Text>찜목록</Text>
            </ATag>
          </Link>
        </MypageBox>
        <MypageBox>
          <Link href={`/mypage/ordercheck`}>
            <ATag dr={`column`} height={`100%`}>
              <Text
                fontSize={width < 700 ? `18px` : `28px`}
                fontWeight={`bold`}
                isHover
              >
                6
              </Text>
              <Text>나의 주문 내역</Text>
            </ATag>
          </Link>
        </MypageBox>
      </Wrapper>
    </WholeWrapper>
  );
};

export default MypageTop;
