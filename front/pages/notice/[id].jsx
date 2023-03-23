import React from "react";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  Image,
} from "../../components/commonComponents";
import { LeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/dist/client/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NOTICE_DETAIL_REQUEST } from "../../reducers/notice";

const ListBtn = styled(Wrapper)`
  width: 240px;
  height: 54px;
  border: 1px solid ${Theme.lightGrey2_C};
  font-size: 18px;
  font-weight: 600;

  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.lightGrey2_C};
    color: ${(props) => props.theme.black_C};
  }

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

const Detail = () => {
  ////// GLOBAL STATE //////
  const { noticeDetail } = useSelector((state) => state.notice);

  console.log(noticeDetail);
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (router) {
      dispatch({
        type: NOTICE_DETAIL_REQUEST,
        data: {
          id: router.query.id,
        },
      });
    }
  }, [router]);
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 공지사항</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 100px` : `95px 0 100px`}>
          <RsWrapper>
            <Wrapper width={width < 1100 ? `100%` : `65%`}>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
                <Link href={`/notice`}>
                  <a>
                    <Text fontSize={`23px`} color={Theme.basicTheme_C}>
                      <LeftOutlined />
                    </Text>
                  </a>
                </Link>

                <Text
                  padding={`0 0 0 10px`}
                  fontSize={width < 700 ? `20px` : `34px`}
                  fontWeight={`bold`}
                >
                  공지사항
                </Text>
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                bgColor={Theme.lightGrey3_C}
                borderTop={`1px solid ${Theme.basicTheme_C}`}
                margin={`0 0 40px`}
                padding={width < 700 ? `20px 10px` : `24px 20px`}
              >
                <Text
                  fontSize={width < 700 ? `16px` : `18px`}
                  fontWeight={`600`}
                  margin={`0 0 12px`}
                >
                  {noticeDetail && noticeDetail.title}
                </Text>
                <Text>{noticeDetail && noticeDetail.viewCreatedAt}</Text>
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Image
                  alt="이벤트 사진"
                  src={noticeDetail && noticeDetail.imagePath}
                  width={width < 500 ? `100%` : `420px`}
                  margin={`0 0 30px`}
                />

                <Text fontSize={`16px`}>
                  {noticeDetail && noticeDetail.content}
                </Text>
              </Wrapper>
              <Wrapper margin={`60px 0 0`}>
                <Link href={`/notice`}>
                  <a>
                    <ListBtn>목록으로</ListBtn>
                  </a>
                </Link>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Detail;
