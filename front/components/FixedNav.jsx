import React, { useCallback } from "react";
import styled from "styled-components";
import useWidth from "../hooks/useWidth";
import Theme from "./Theme";
import { Image, Wrapper, Text } from "./commonComponents";
import { ArrowUpOutlined } from "@ant-design/icons";

const Btn = styled(Wrapper)`
  width: 58px;
  height: 58px;
  border-radius: 100%;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.09);

  &:hover {
    cursor: pointer;
    background: ${(props) => props.hoverColor};
    border: 1px solid ${Theme.lightGrey2_C};

    & .hoverIcon {
      display: block;
    }
  }

  & .hoverIcon {
    display: none;
  }
`;

const FixedNav = () => {
  ////// HOOKS //////
  const width = useWidth();

  ////// HANDLER //////
  const handleScroll = () => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper
      width={`auto`}
      position={`fixed`}
      bottom={width < 800 ? `80px` : `20px`}
      right={width < 800 ? `20px` : `50px`}
    >
      <Btn
        margin={`0 0 12px`}
        bgColor={Theme.kakao_C}
        hoverColor={Theme.white_C}
      >
        <Image
          alt="kakao icon"
          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/login/icon_kakao.png`}
          width={`26px`}
        />
      </Btn>

      <Btn
        bgColor={Theme.basicTheme_C}
        hoverColor={Theme.white_C}
        onClick={handleScroll}
      >
        <Text fontSize={`24px`}>
          <ArrowUpOutlined />
        </Text>
      </Btn>
    </Wrapper>
  );
};

export default FixedNav;
