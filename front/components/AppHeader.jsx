import React, { useState, useEffect, useCallback } from "react";
import {
  RowWrapper,
  ColWrapper,
  RsWrapper,
  Wrapper,
  Image,
  ATag,
  WholeWrapper,
  Text,
  TextInput,
} from "./commonComponents";
import styled from "styled-components";
import Theme from "./Theme";
import { MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import useWidth from "../hooks/useWidth";
import { Drawer, Badge, message } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { ALL_LIST_REQUEST } from "../reducers/category";
import useInput from "../hooks/useInput";

const WebRow = styled(RowWrapper)`
  z-index: 100;
  transition: 0.5s;
  position: fixed;
  top: 0;
  left: 0;
  background: ${Theme.white_C};

  @media (max-width: 800px) {
    display: none;
  }
`;

const MobileRow = styled(RowWrapper)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition: 0.5s;
  background: ${Theme.white_C};

  @media (max-width: 800px) {
    display: flex;
  }
`;

const SubMenuWrapper = styled(Wrapper)`
  position: absolute;
  top: 52px;
  left: 0;
  height: 700px;
  background: ${Theme.white_C};
  justify-content: flex-start;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
  display: none;
`;

const MenuCol = styled(Wrapper)`
  height: 52px;
  cursor: pointer;
  transition: 0.5s;
  position: relative;

  & p {
    position: relative;

    &:before {
      content: "";
      width: 0;
      height: 1px;
      background: ${Theme.basicTheme_C};
      position: absolute;
      bottom: 0;
      left: 0;
      transition: 0.3s;
    }
  }

  &:hover {
    ${SubMenuWrapper} {
      display: flex;
    }

    p:before {
      width: 100%;
    }
  }
`;

const SubMenuHover = styled(Wrapper)`
  position: absolute;
  top: 52px;
  left: 0;
  border: 1px solid ${Theme.lightGrey_C};
  background: ${Theme.white_C};
  opacity: 0;
  visibility: hidden;
  overflow: auto;
`;

const SubMenuCol = styled(ColWrapper)`
  cursor: pointer;
  position: relative;
  height: 52px;
  font-size: 17px;
  font-weight: 600;

  ${(props) =>
    props.isActive &&
    `
      border-bottom: 1px solid ${props.theme.basicTheme_C};
  `}

  &:hover {
    p {
      color: ${Theme.subTheme2_C};
    }
    ${SubMenuHover} {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (max-width: 800px) {
    font-size: 15px;
    height: 40px;
  }
`;

const InMenu = styled(Wrapper)`
  background: ${Theme.lightGrey3_C};
  position: absolute;
  bottom: 0;
  right: -100%;
  z-index: 30;
  height: 700px;
  justify-content: flex-start;
  overflow: auto;
  display: none;
`;

const SubMenu = styled(Wrapper)`
  height: 42px;
  min-height: 42px;
  font-size: ${(props) => props.fontSize || `16px`};
  cursor: pointer;
  align-items: flex-start;
  padding: 0 24px;
  color: ${Theme.grey_C};

  &:hover {
    color: ${Theme.black_C};
    text-decoration: underline;
  }
`;

const SubMenuTextCol = styled(Wrapper)`
  height: 42px;
  min-height: 42px;
  font-size: ${(props) => props.fontSize || `16px`};
  cursor: pointer;
  align-items: flex-start;
  padding: 0 24px;
  font-weight: 500;

  &:hover {
    background: ${Theme.subTheme3_C};

    & ${InMenu} {
      display: flex;
    }
  }
`;

const AppHeader = () => {
  ////////////// - USE STATE- ///////////////
  const [headerScroll, setHeaderScroll] = useState(false);
  const [pageY, setPageY] = useState(0);

  const { me } = useSelector((state) => state.user);
  const { logos } = useSelector((state) => state.logo);
  const { allList } = useSelector((state) => state.category);

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  // 검색어
  const searchInput = useInput(``);

  ///////////// - EVENT HANDLER- ////////////

  // 검색어 입력하기
  const searchHandler = useCallback(() => {
    if (searchInput.value === "") {
      return message.error("검색어를 입력해주세요.");
    }

    router.push(`/search?search=${searchInput.value}`);
  }, [searchInput.value]);

  const handleScroll = useCallback(() => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const headerScroll = pageY && pageYOffset !== 0 && pageYOffset !== pageY;
    setHeaderScroll(headerScroll);
    setPageY(pageYOffset);
  });

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  ////////////// - USE EFFECT- //////////////

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    dispatch({
      type: LOGO_GET_REQUEST,
    });

    dispatch({
      type: ALL_LIST_REQUEST,
    });
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [pageY]);
  return (
    <WholeWrapper>
      <WebRow>
        <Wrapper
          bgColor={Theme.lightGrey3_C}
          padding={`10px 0`}
          color={Theme.grey_C}
        >
          <RsWrapper dr={`row`} ju={`flex-end`} fontSize={`12px`}>
            {me ? (
              <>
                <Link href={`/mypage`}>
                  <a>
                    <Text>마이페이지</Text>
                  </a>
                </Link>
                <Text
                  fontSize={`10px`}
                  color={Theme.lightGrey4_C}
                  margin={`0 12px`}
                >
                  |
                </Text>
                <Text cursor={`pointer`}>로그아웃</Text>
                <Text
                  fontSize={`10px`}
                  color={Theme.lightGrey4_C}
                  margin={`0 12px`}
                >
                  |
                </Text>
                <Link href={`/customer/faq`}>
                  <a>
                    <Text>고객센터</Text>
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/user/signup`}>
                  <a>
                    <Text>회원가입</Text>
                  </a>
                </Link>
                <Text
                  fontSize={`10px`}
                  color={Theme.lightGrey4_C}
                  margin={`0 12px`}
                >
                  |
                </Text>
                <Link href={`/user/login`}>
                  <a>
                    <Text>로그인</Text>
                  </a>
                </Link>
                <Text
                  fontSize={`10px`}
                  color={Theme.lightGrey4_C}
                  margin={`0 12px`}
                >
                  |
                </Text>
                <Link href={`/customer/faq`}>
                  <a>
                    <Text>고객센터</Text>
                  </a>
                </Link>
              </>
            )}
          </RsWrapper>
        </Wrapper>

        <Wrapper
          borderBottom={`1px solid ${Theme.lightGrey3_C}`}
          padding={`10px 0`}
        >
          <RsWrapper dr={`row`} ju={`space-between`}>
            <ATag width={`auto`} href="/">
              {logos && logos.find((data) => data.typeOf === "H") && (
                <Image
                  width={width < 800 ? `100px` : `328px`}
                  src={logos.find((data) => data.typeOf === "H").imageURL}
                  alt="logo"
                />
              )}
            </ATag>

            <Wrapper width={`auto`} dr={`row`}>
              <Wrapper
                width={width < 900 ? `350px` : `460px`}
                position={`relative`}
              >
                <TextInput
                  type={`text`}
                  width={`100%`}
                  height={`46px`}
                  placeholder={`검색어를 입력해주세요.`}
                  radius={`46px`}
                  padding={`0 40px 0 20px`}
                  {...searchInput}
                  onKeyDown={(e) => e.keyCode === 13 && searchHandler()}
                />
                <Wrapper
                  width={`auto`}
                  position={`absolute`}
                  top={`0`}
                  right={`15px`}
                  height={`100%`}
                  onClick={searchHandler}
                >
                  <Image
                    width={`24px`}
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_search.png`}
                  />
                </Wrapper>
              </Wrapper>
              <Link href={me ? `/mypage` : `/user/login`}>
                <a>
                  <Image
                    width={`28px`}
                    margin={`0 24px 0 26px`}
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_user.png`}
                  />
                </a>
              </Link>
              <Link href={`/payment/cartlist`}>
                <a>
                  <Badge count={5}>
                    <Image
                      width={`28px`}
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_cart.png`}
                    />
                  </Badge>
                </a>
              </Link>
            </Wrapper>
          </RsWrapper>
        </Wrapper>
        <Wrapper borderBottom={`1px solid ${Theme.lightGrey4_C}`}>
          <RsWrapper>
            <Wrapper dr={`row`}>
              <Wrapper
                width={`calc(100% / 6)`}
                dr={`row`}
                position={`relative`}
              >
                <MenuCol
                  width={`100%`}
                  dr={`row`}
                  ju={`flex-start`}
                  fontSize={`17px`}
                  fontWeight={`600`}
                >
                  <Text>
                    <MenuOutlined style={{ margin: `0 10px 0 0` }} />
                    카테고리
                  </Text>

                  <SubMenuWrapper height={`48px`}>
                    {allList &&
                      allList.map((data) => {
                        return (
                          <SubMenuTextCol key={data.id}>
                            {data.value}
                            <InMenu>
                              {data.sub.map((cate) => {
                                return (
                                  <SubMenu key={cate.id}>{cate.value}</SubMenu>
                                );
                              })}
                            </InMenu>
                          </SubMenuTextCol>
                        );
                      })}
                  </SubMenuWrapper>
                </MenuCol>
              </Wrapper>

              <SubMenuCol
                width={`calc(100% / 6)`}
                isActive={router.pathname === `/notice`}
                onClick={() => moveLinkHandler(`/notice`)}
              >
                <Text>공지사항</Text>
              </SubMenuCol>
              <SubMenuCol
                width={`calc(100% / 6)`}
                isActive={router.pathname === `/event`}
                onClick={() => moveLinkHandler(`/event`)}
              >
                <Text>이벤트</Text>
              </SubMenuCol>
              <SubMenuCol
                width={`calc(100% / 6)`}
                isActive={router.pathname.includes(`/customer`)}
                onClick={() => moveLinkHandler(`/customer/faq`)}
              >
                <Text>고객센터</Text>
              </SubMenuCol>
              <Wrapper width={`calc(100% / 6 * 2)`} al={`flex-end`}>
                <Wrapper
                  bgColor={Theme.subTheme_C}
                  color={Theme.subTheme2_C}
                  height={`34px`}
                  radius={`34px`}
                  padding={`0 18px`}
                  width={`auto`}
                >
                  일본 직구는 Buy Me Mine에서!
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </RsWrapper>
        </Wrapper>
      </WebRow>
      {/* mobile */}
      <MobileRow justify={`center`} className={headerScroll && "background"}>
        <Wrapper padding={`10px 15px`} dr={`row`} ju={`space-between`}>
          <Image
            width={`20px`}
            alt="icon"
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_user.png`}
          />
          <ATag width={`auto`} href="/">
            {logos && logos.find((data) => data.typeOf === "H") && (
              <Image
                width={`200px`}
                src={logos.find((data) => data.typeOf === "H").imageURL}
                alt="logo"
              />
            )}
          </ATag>
          <Badge count={5}>
            <Image
              width={`20px`}
              alt="icon"
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_cart.png`}
            />
          </Badge>
        </Wrapper>

        <Wrapper height={`40px`} dr={`row`} bgColor={Theme.lightGrey3_C}>
          <SubMenuCol
            width={`calc(100% / 4)`}
            isActive={router.pathname === `/`}
            onClick={() => moveLinkHandler(`/`)}
          >
            <Text>메인</Text>
          </SubMenuCol>
          <SubMenuCol
            width={`calc(100% / 4)`}
            isActive={router.pathname === `/notice`}
            onClick={() => moveLinkHandler(`/notice`)}
          >
            <Text>공지사항</Text>
          </SubMenuCol>
          <SubMenuCol
            width={`calc(100% / 4)`}
            isActive={router.pathname === `/event`}
            onClick={() => moveLinkHandler(`/event`)}
          >
            <Text>이벤트</Text>
          </SubMenuCol>
          <SubMenuCol
            width={`calc(100% / 4)`}
            onClick={() => moveLinkHandler(`/`)}
          >
            <Text>고객센터</Text>
          </SubMenuCol>
        </Wrapper>
      </MobileRow>
    </WholeWrapper>
  );
};

export default AppHeader;
