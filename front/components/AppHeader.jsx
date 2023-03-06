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
  CommonButton,
} from "./commonComponents";
import styled from "styled-components";
import Theme from "./Theme";
import {
  AlignRightOutlined,
  MenuOutlined,
  DownloadOutlined,
  UserOutlined,
  DownOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import useWidth from "../hooks/useWidth";
import { Drawer, Empty, Form, Button, message, Badge } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";

const WebRow = styled(RowWrapper)`
  z-index: 10000;
  transition: 0.5s;
  position: fixed;
  top: 0;
  left: 0;
  background: ${Theme.white_C};

  @media (max-width: 700px) {
    display: none;
  }
`;

const MobileRow = styled(RowWrapper)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  transition: 0.5s;
  @media (max-width: 700px) {
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
`;

const InMenu = styled(Wrapper)`
  background: ${Theme.lightGrey3_C};
  position: absolute;
  top: 0;
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
  position: relative;
  height: 42px;
  min-height: 42px;
  font-size: ${(props) => props.fontSize || `16px`};
  cursor: pointer;
  align-items: flex-start;
  padding: 0 24px;
  font-weight: 500;

  &:hover {
    background: ${Theme.subTheme3_C};

    & + ${InMenu} {
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

  // const documentRef = useRef(document);

  const [drawar, setDrawar] = useState(false);
  const [subMenu, setSubMenu] = useState(``);

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ///////////// - EVENT HANDLER- ////////////

  const drawarToggle = useCallback(() => {
    setDrawar(!drawar);
  });

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
  }, [router.query]);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, [router.query]);

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
                <Link href={`/`}>
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
                <Link href={`/`}>
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
              <Wrapper width={`460px`} position={`relative`}>
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
                    width={`24px`}
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_search.png`}
                  />
                </Wrapper>
              </Wrapper>
              <Image
                width={`28px`}
                margin={`0 24px 0 26px`}
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_user.png`}
              />
              <Badge count={5}>
                <Image
                  width={`28px`}
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/header/icon_cart.png`}
                />
              </Badge>
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
                    <SubMenuTextCol>LUSH(러쉬)</SubMenuTextCol>
                    <SubMenuTextCol>의류 </SubMenuTextCol>
                    <SubMenuTextCol>편의점</SubMenuTextCol>
                    <SubMenuTextCol>DAISO(다이소)</SubMenuTextCol>
                    <InMenu>
                      <SubMenu>LUSH(러쉬)</SubMenu>
                      <SubMenu>의류</SubMenu>
                      <SubMenu>편의점</SubMenu>
                      <SubMenu>DAISO(다이소)</SubMenu>
                    </InMenu>
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
                onClick={() => moveLinkHandler(`/lease?type=장비판매의뢰`)}
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
        <ColWrapper
          span={4}
          al={`flex-start`}
          fontSize={`1.6rem`}
          padding={`0 10px`}
        >
          {!me && (
            <Link href={`/login`}>
              <a>
                <UserOutlined />
              </a>
            </Link>
          )}
        </ColWrapper>
        <ColWrapper span={16}>
          <ATag width={`auto`} href="/">
            <Image
              width={`160px`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/logo/logo.png`}
            />
          </ATag>
        </ColWrapper>
        <ColWrapper
          span={4}
          al={`flex-end`}
          fontSize={`1.6rem`}
          padding={`0 10px`}
        >
          <AlignRightOutlined onClick={drawarToggle} />
        </ColWrapper>
        <Wrapper
          height={`40px`}
          bgColor={Theme.basicTheme_C}
          color={Theme.white_C}
          overflow={`auto`}
          wrap={`nowrap`}
          dr={`row`}
          ju={`flex-start`}
          padding={`0 10px`}
        >
          <Wrapper minWidth={`80px`} margin={`0 5px`} cursor={`pointer`}>
            건설기계
          </Wrapper>
          <Wrapper
            minWidth={`80px`}
            margin={`0 5px`}
            onClick={() => moveLinkHandler(`/product?isUsed=true`)}
            cursor={`pointer`}
          >
            중고장비
          </Wrapper>
          <Wrapper
            minWidth={`80px`}
            margin={`0 5px`}
            onClick={() => moveLinkHandler(`/product?isSale=true`)}
            cursor={`pointer`}
          >
            특가상품
          </Wrapper>
          <Wrapper
            minWidth={`80px`}
            margin={`0 5px`}
            onClick={() => moveLinkHandler(`/lease?type=임대문의`)}
            cursor={`pointer`}
          >
            임대문의
          </Wrapper>
          <Wrapper
            minWidth={`80px`}
            margin={`0 5px`}
            onClick={() => moveLinkHandler(`/lease?type=장비수리문의`)}
            cursor={`pointer`}
          >
            장비수리문의
          </Wrapper>
          <Wrapper
            minWidth={`80px`}
            margin={`0 5px`}
            onClick={() => moveLinkHandler(`/lease?type=장비판매의뢰`)}
            cursor={`pointer`}
          >
            장비판매의뢰
          </Wrapper>
        </Wrapper>
        {drawar && (
          <Drawer
            placement="right"
            closable={true}
            onClose={drawarToggle}
            visible={drawarToggle}
            getContainer={false}
          >
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              borderBottom={`1px solid ${Theme.lightGrey_C}`}
              padding={`0 0 15px`}
            >
              {me ? (
                <>
                  <Link href={`/mypage/order`}>
                    <a>
                      <Text fontSize={`12px`}>주문조회</Text>
                    </a>
                  </Link>
                  <Link href={`/mypage`}>
                    <a>
                      <Text fontSize={`12px`} margin={`0 0 0 20px`}>
                        마이페이지
                      </Text>
                    </a>
                  </Link>

                  <Text margin={`0 0 0 30px`} cursor={`pointer`}>
                    로그아웃
                  </Text>
                </>
              ) : (
                <>
                  <Link href={`/login`}>
                    <a>
                      <Text fontSize={`12px`}>로그인</Text>
                    </a>
                  </Link>
                  <Link href={`/user/signup`}>
                    <a>
                      <Text fontSize={`12px`} margin={`0 0 0 20px`}>
                        회원가입
                      </Text>
                    </a>
                  </Link>
                </>
              )}
            </Wrapper>
            <Wrapper width={`100%`} position={`relative`} margin={`20px 0`}>
              <TextInput
                type={`text`}
                width={`100%`}
                height={`35px`}
                placeholder={`검색어를 입력해주세요.`}
                radius={`18px`}
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
                  width={`14px`}
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/header/icon_search.png`}
                />
              </Wrapper>
            </Wrapper>
            <ColWrapper al={`flex-start`}>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                padding={`10px 0`}
                fontSize={`1.2rem`}
                onClick={() => {
                  setSubMenu(0);
                }}
              >
                카테고리
                <DownOutlined style={{ color: Theme.basicTheme_C }} />
              </Wrapper>
              {subMenu === 0 && (
                <Wrapper>
                  <Wrapper bgColor={Theme.lightGrey_C}>메뉴</Wrapper>

                  <Wrapper al={`flex-start`} padding={`5px`}>
                    메뉴
                  </Wrapper>
                </Wrapper>
              )}
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                padding={`10px 0`}
                fontSize={`1.2rem`}
                onClick={() => {
                  setSubMenu(1);
                }}
              >
                커뮤니티
                <DownOutlined style={{ color: Theme.basicTheme_C }} />
              </Wrapper>
              {subMenu === 1 && (
                <Wrapper bgColor={Theme.lightGrey_C}>
                  <Link href={`/community/faq`}>
                    <a>
                      <Wrapper al={`flex-start`} padding={`5px`}>
                        이용안내 FAQ
                      </Wrapper>
                    </a>
                  </Link>
                  <Link href={`/community/notice`}>
                    <a>
                      <Wrapper al={`flex-start`} padding={`5px`}>
                        공지사항
                      </Wrapper>
                    </a>
                  </Link>
                  <Link href={`/community/question`}>
                    <a>
                      <Wrapper al={`flex-start`} padding={`5px`}>
                        1:1 맞춤문의
                      </Wrapper>
                    </a>
                  </Link>
                  <Link href={`/community/productQnA`}>
                    <a>
                      <Wrapper al={`flex-start`} padding={`5px`}>
                        상품문의
                      </Wrapper>
                    </a>
                  </Link>
                </Wrapper>
              )}
              <Wrapper al={`flex-start`}>
                <Wrapper al={`flex-start`} margin={`20px 0 5px`}>
                  고객센터
                </Wrapper>
                <Wrapper
                  width={`30px`}
                  height={`1px`}
                  bgColor={Theme.basicTheme_C}
                ></Wrapper>
                <Wrapper
                  dr={`row`}
                  margin={`10px 0`}
                  ju={`flex-start`}
                  fontSize={`20px`}
                >
                  <Wrapper
                    width={`35px`}
                    height={`35px`}
                    bgColor={Theme.basicTheme_C}
                    color={Theme.white_C}
                    radius={`100%`}
                    margin={`0 5px 0 0`}
                  >
                    <PhoneOutlined />
                  </Wrapper>
                  0000-0000
                </Wrapper>
                <Text color={Theme.grey_C} fontSize={`13px`}>
                  평일 오전 09:00 ~ 오후 6:00
                </Text>
                <Text color={Theme.grey_C} fontSize={`13px`}>
                  토요일 오전 09:00 ~ 오후 5:00
                </Text>
                <Text color={Theme.grey_C} fontSize={`13px`}>
                  일, 공휴일 휴무
                </Text>
                <Text color={Theme.grey_C} fontSize={`13px`}>
                  점심시간 12:00 ~ 13:00
                </Text>
              </Wrapper>
            </ColWrapper>
          </Drawer>
        )}
      </MobileRow>
    </WholeWrapper>
  );
};

export default AppHeader;
