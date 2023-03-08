import React, { useEffect } from "react";
import { Wrapper, Text, WholeWrapper, ATag } from "./commonComponents";
import Theme from "./Theme";
import useWidth from "../hooks/useWidth";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";

const Btn = styled(Wrapper)`
  width: auto;
  height: 40px;
  padding: 0 20px;
  border-radius: 40px;
  font-size: 18px;
  color: ${Theme.lightGrey_C};
  margin: 0 0 16px;
  font-weight: 600;
  border: 1px solid ${Theme.lightGrey2_C};

  ${(props) =>
    props.isActive &&
    `
    color: ${Theme.black_C};
    background: ${Theme.subTheme3_C};
    border: 1px solid ${Theme.basicTheme_C};
  `}

  &:hover {
    cursor: pointer;
    color: ${Theme.black_C};
    background: ${Theme.subTheme3_C};
    border: 1px solid ${Theme.basicTheme_C};
  }
  @media (max-width: 800px) {
    font-size: 14px;
    height: 35px;
    margin: 0 5px 5px 0;
  }
`;

const CustomerLeft = () => {
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Wrapper
      width={width < 1100 ? (width < 900 ? `100%` : `200px`) : `260px`}
      al={`flex-start`}
      position={width < 900 ? `relative` : `sticky`}
      top={width < 900 ? `0` : `200px`}
      left={`0`}
      margin={width < 900 ? `0 0 30px` : `0`}
    >
      <Text
        fontSize={width < 900 ? `22px` : `34px`}
        fontWeight={`bold`}
        margin={`0 0 24px`}
      >
        고객센터
      </Text>
      <Wrapper
        al={`flex-start`}
        ju={width < 900 && `flex-start`}
        dr={width < 900 ? `row` : `column`}
      >
        <Link href={`/customer/faq`}>
          <a>
            <Btn isActive={router.pathname === `/customer/faq`}>FAQ</Btn>
          </a>
        </Link>
        <Link href={`/customer/`}>
          <a>
            <Btn isActive={router.pathname === `/customer/`}>문의 게시판</Btn>
          </a>
        </Link>
        <Link href={`/customer/`}>
          <a>
            <Btn isActive={router.pathname === `/customer/`}>상품 요청</Btn>
          </a>
        </Link>
      </Wrapper>
    </Wrapper>
  );
};

export default CustomerLeft;
