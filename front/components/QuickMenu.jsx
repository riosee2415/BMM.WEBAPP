import {
  CloseOutlined,
  InstagramOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import styled from "styled-components";
import useWidth from "../hooks/useWidth";
import {
  ATag,
  Image,
  RsWrapper,
  Text,
  TextInput,
  Wrapper,
} from "./commonComponents";
import Theme from "./Theme";
import { mobileMenu } from "./AnimationCommon";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "antd";

const Circle = styled(Wrapper)`
  width: 56px;
  height: auto;
  padding: 7px 0;
  border-radius: 5px;
  background: ${(props) =>
    props.isActive ? props.theme.subTheme_C : props.theme.white_C};
`;

const MenuWrapper = styled(Wrapper)`
  position: fixed;
  bottom: 80px;
  left: 0;
  height: calc(100vh - 80px);
  background: ${Theme.white_C};
  animation: ${mobileMenu} 1s forwards;
  z-index: 10000;
`;

const TextBox = styled(Wrapper)`
  font-size: 16px;
  font-weight: 600;
  height: 40px;
  min-height: 40px;
  padding: 5px 15px;
  align-items: flex-start;
  cursor: pointer;
  border-bottom: 1px solid ${Theme.lightGrey3_C};

  &:last-child {
    margin: 0;
  }

  ${(props) =>
    props.isActive &&
    `
      background: ${Theme.subTheme_C};
    `};

  &:hover {
    background: ${Theme.subTheme_C};
  }
`;

const TwoTextBox = styled(Wrapper)`
  color: ${Theme.grey_C};
  font-size: 16px;
  font-weight: 600;
  height: 40px;
  min-height: 40px;
  padding: 5px 15px;
  align-items: flex-start;
  cursor: pointer;

  &:last-child {
    margin: 0;
  }

  ${(props) =>
    props.isActive &&
    `
     font-weight:bold; 
     color: ${Theme.black_C};
    `};

  &:hover {
    background: ${Theme.lightGrey_C};
    color: ${Theme.black_C};
  }
`;

const QuickMenu = () => {
  const { logos } = useSelector((state) => state.logo);

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null); // 1Depth 카테고리

  const menuToggle = useCallback(() => {
    setMenu((prev) => !prev);
  }, [menu]);

  const searchToggle = useCallback(() => {
    setIsSearch((prev) => !prev);
  }, [isSearch]);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, [router.query]);

  return (
    <Wrapper
      position={`fixed`}
      zIndex={`1000`}
      bottom={`0`}
      left={`0`}
      height={`70px`}
      bgColor={Theme.white_C}
    >
      <Wrapper width={`calc(100% / 4)`}>
        <Circle isActive={router.pathname === `/`}>
          <Image
            width={`25px`}
            alt="icon"
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/connectValue/assets/images/mobile-btm-bar/home.png`}
          />
          <Text fontSize={`12px`} margin={`5px 0 0`}>
            홈
          </Text>
        </Circle>
      </Wrapper>
      <Wrapper width={`calc(100% / 4)`} onClick={menuToggle}>
        <Circle isActive={menu}>
          <Image
            width={`25px`}
            alt="icon"
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/connectValue/assets/images/mobile-btm-bar/category.png`}
          />
          <Text fontSize={`12px`} margin={`5px 0 0`}>
            카테고리
          </Text>
        </Circle>
      </Wrapper>

      <Wrapper width={`calc(100% / 4)`} onClick={searchToggle}>
        <Circle isActive={isSearch}>
          <Image
            width={`25px`}
            alt="icon"
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/connectValue/assets/images/mobile-btm-bar/search.png`}
          />
          <Text fontSize={`12px`} margin={`5px 0 0`}>
            검색
          </Text>
        </Circle>
      </Wrapper>

      <Wrapper width={`calc(100% / 4)`}>
        <Link href={`/mypage`}>
          <ATag dr={`column`}>
            <Circle isActive={router.pathname === `/mypage`}>
              <Image
                width={`25px`}
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/connectValue/assets/images/mobile-btm-bar/user.png`}
              />
              <Text fontSize={`12px`} margin={`5px 0 0`}>
                마이페이지
              </Text>
            </Circle>
          </ATag>
        </Link>
      </Wrapper>

      {menu && (
        <MenuWrapper al={`flex-start`}>
          <RsWrapper ju={`flex-start`}>
            <Wrapper padding={`10px 0`}>
              <ATag width={`auto`} href="/">
                {logos && logos.find((data) => data.typeOf === "H") && (
                  <Image
                    width={`200px`}
                    src={logos.find((data) => data.typeOf === "H").imageURL}
                    alt="logo"
                  />
                )}
              </ATag>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`10px 15px`}
              bgColor={Theme.lightGrey3_C}
            >
              <Wrapper width={`22px`}></Wrapper>
              <Text fontSize={`16px`} fontWeight={`600`}>
                카테고리
              </Text>
              <Badge count={5}>
                <Image
                  width={`22px`}
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_cart.png`}
                />
              </Badge>
            </Wrapper>
            <Wrapper dr={`row`} al={`flex-start`} height={`calc(100% - 120px)`}>
              <Wrapper
                width={currentCategory ? `50%` : `100%`}
                height={`100%`}
                overflow={`auto`}
                wrap={`nowrap`}
                ju={`flex-start`}
              >
                <TextBox onClick={() => setCurrentCategory("22")}>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox isActive={true}>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
                <TextBox>22</TextBox>
              </Wrapper>

              {currentCategory && (
                <Wrapper
                  height={`100%`}
                  wrap={`nowrap`}
                  ju={`flex-start`}
                  overflow={`auto`}
                  width={`50%`}
                  bgColor={Theme.lightGrey3_C}
                >
                  <TwoTextBox isActive={true}>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                  <TwoTextBox>33</TwoTextBox>
                </Wrapper>
              )}
            </Wrapper>
          </RsWrapper>
        </MenuWrapper>
      )}

      {isSearch && (
        <MenuWrapper al={`flex-start`}>
          <RsWrapper ju={`flex-start`}>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              height={`100px`}
              borderBottom={`1px solid ${Theme.lightGrey2_C}`}
            >
              <Wrapper width={`300px`} position={`relative`} height={`45px`}>
                <TextInput
                  placeholder="강사, 강의, 키워드로 검색해보세요."
                  width={`100%`}
                  radius={`50px`}
                />

                <Wrapper
                  width={`auto`}
                  height={`100%`}
                  position={`absolute`}
                  top={`0`}
                  right={`10px`}
                  fontSize={`18px`}
                >
                  <SearchOutlined />
                </Wrapper>
              </Wrapper>
              <Text
                width={`40px`}
                textAlign={`center`}
                isHover
                onClick={searchToggle}
              >
                취소
              </Text>
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`20px 0`}>
              <Text fontSize={`16px`} fontWeight={`600`}>
                최근 검색어
              </Text>
            </Wrapper>

            <Wrapper dr={`row`} al={`flex-start`} ju={`flex-start`}>
              <Wrapper
                width={`auto`}
                height={`27px`}
                border={`1px solid ${Theme.grey3_C}`}
                radius={`27px`}
                dr={`row`}
                padding={`0 10px`}
                margin={`0 10px 10px 0`}
              >
                #블라블라 <CloseOutlined />
              </Wrapper>
              <Wrapper
                width={`auto`}
                height={`27px`}
                border={`1px solid ${Theme.grey3_C}`}
                radius={`27px`}
                dr={`row`}
                padding={`0 10px`}
                margin={`0 10px 10px 0`}
              >
                #블라블라 <CloseOutlined />
              </Wrapper>
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              margin={`20px 0`}
              borderTop={`1px solid ${Theme.lightGrey2_C}`}
              padding={`40px 0 0`}
            >
              <Text fontSize={`16px`} fontWeight={`600`}>
                인기 검색어
              </Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 10px`}
              fontSize={`16px`}
            >
              <Text width={`15%`} textAlign={`center`}>
                1
              </Text>
              <Text width={`85%`} isEllipsis>
                이렇게 저렇게
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 10px`}
              fontSize={`16px`}
            >
              <Text width={`15%`} textAlign={`center`}>
                2
              </Text>
              <Text width={`85%`} isEllipsis>
                검색키워드가 아주아주아주 길어졌을때는 이렇게 나오게 됩니다.
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 10px`}
              fontSize={`16px`}
            >
              <Text width={`15%`} textAlign={`center`}>
                3
              </Text>
              <Text width={`85%`} isEllipsis>
                이렇게 저렇게
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 10px`}
              fontSize={`16px`}
            >
              <Text width={`15%`} textAlign={`center`}>
                4
              </Text>
              <Text width={`85%`} isEllipsis>
                이렇게 저렇게
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 10px`}
              fontSize={`16px`}
            >
              <Text width={`15%`} textAlign={`center`}>
                5
              </Text>
              <Text width={`85%`} isEllipsis>
                이렇게 저렇게
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 10px`}
              fontSize={`16px`}
            >
              <Text width={`15%`} textAlign={`center`}>
                6
              </Text>
              <Text width={`85%`} isEllipsis>
                이렇게 저렇게
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 10px`}
              fontSize={`16px`}
            >
              <Text width={`15%`} textAlign={`center`}>
                7
              </Text>
              <Text width={`85%`} isEllipsis>
                이렇게 저렇게
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 10px`}
              fontSize={`16px`}
            >
              <Text width={`15%`} textAlign={`center`}>
                8
              </Text>
              <Text width={`85%`} isEllipsis>
                이렇게 저렇게
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 10px`}
              fontSize={`16px`}
            >
              <Text width={`15%`} textAlign={`center`}>
                9
              </Text>
              <Text width={`85%`} isEllipsis>
                이렇게 저렇게
              </Text>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`0 0 10px`}
              fontSize={`16px`}
            >
              <Text width={`15%`} textAlign={`center`}>
                10
              </Text>
              <Text width={`85%`} isEllipsis>
                이렇게 저렇게
              </Text>
            </Wrapper>
          </RsWrapper>
        </MenuWrapper>
      )}
    </Wrapper>
  );
};

export default QuickMenu;
