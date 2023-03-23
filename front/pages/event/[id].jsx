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
import Link from "next/dist/client/link";
import styled from "styled-components";

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
        <title>BUY ME MINE | 이벤트</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 100px` : `95px 0 100px`}>
          <RsWrapper>
            <Wrapper width={width < 1100 ? `100%` : `65%`}>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
                <Link href={`/event`}>
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
                  이벤트
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
                  이벤트명이 들어올 곳입니다.
                </Text>
                <Text>2022.12.31</Text>
              </Wrapper>
              <Wrapper>
                <Image
                  alt="이벤트 사진"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/sample-img/event-detail.png`}
                  width={width < 500 ? `100%` : `840px`}
                  margin={`0 0 30px`}
                />
                <Text fontSize={`16px`}>
                  헌법개정안이 제2항의 찬성을 얻은 때에는 헌법개정은 확정되며,
                  대통령은 즉시 이를 공포하여야 한다. 국가안전보장회의는
                  대통령이 주재한다. 국가는 지역간의 균형있는 발전을 위하여
                  지역경제를 육성할 의무를 진다. 국가유공자·상이군경 및
                  전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로
                  근로의 기회를 부여받는다. 공공필요에 의한 재산권의 수용·사용
                  또는 제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을
                  지급하여야 한다. 모든 국민은 법률이 정하는 바에 의하여
                  선거권을 가진다. 위원은 정당에 가입하거나 정치에 관여할 수
                  없다. 형사피의자 또는 형사피고인으로서 구금되었던 자가 법률이
                  정하는 불기소처분을 받거나 무죄판결을 받은 때에는 법률이
                  정하는 바에 의하여 국가에 정당한 보상을 청구할 수 있다.
                </Text>
              </Wrapper>
              <Wrapper margin={`60px 0 0`}>
                <Link href={`/event/`}>
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
