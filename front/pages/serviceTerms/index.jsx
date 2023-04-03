import React, { useState, useCallback, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { REQUEST_LIST_REQUEST } from "../../reducers/request";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  CustomPage,
  CustomSelect,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import CustomerLeft from "../../components/CustomerLeft";
import Theme from "../../components/Theme";

import styled from "styled-components";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Select } from "antd";
import { LockFilled } from "@ant-design/icons";

const List = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  height: 60px;
  font-size: 16px;

  &:hover {
    cursor: pointer;
    border-bottom: 1px solid ${Theme.basicTheme_C};
  }

  @media (max-width: 700px) {
    height: auto;
    padding: 10px;
    border: 1px solid ${Theme.lightGrey2_C};
    margin: 0 0 15px;
    border-radius: 10px;

    &:nth-child(2n) {
      background: ${Theme.lightGrey3_C};
    }
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
        <title>BUY ME MINE | 서비스이용안내</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `70px 0 0` : `95px 0 0`}>
          <RsWrapper>
            <Wrapper
              fontSize={width < 900 ? `28px` : `36px`}
              fontWeight={`600`}
              margin={`0 0 10px`}
            >
              바이미마인 서비스 이용안내
            </Wrapper>
            <Wrapper
              width={`100%`}
              border={`1px solid ${Theme.adminTheme_4}`}
            ></Wrapper>
            <Wrapper al={`flex-start`} margin={`30px 0 10px`} fontSize={`16px`}>
              ■ ☞회원가입
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ① 저희 바이미마인은 회원제로 운영하고 있습니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ② 회원가입은 누구나 가입비 및 월회비, 연회비등 어떠한 비용도 청구
              되지 않습니다.( 가입비/유지비100% 무료)
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ③ 회원 가입 시 가입 감사 이벤트로 1000마일리지가 지급됩니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ④ 적립된 마일리지는 1000마일리지 이상부터 사용하실 수가 있습니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ④ 적립된 마일리지는 1000마일리지 이상부터 사용하실 수가 있습니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`30px 0 10px`} fontSize={`16px`}>
              ■ ☞마일리지 제도
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ① 마일리지는 구입상품 금액의 1%가 본인의 계정에 적립되며, 가입시
              추천인의 계정에 0.5%가 적립됩니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              Ex) 본인이 10,0000의 상품을 구매 본인 계정에 1000마일리지가
              적립되며, 추천인의 계정에는 0.5%인 500마일리지가 적립됩니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              Ex) 본인을 추천인으로 등록한 지인이 100,000원 상당의 상품을
              구매하였을 경우 본인에게 0.5%인 500마일리지가 자동으로 적립됩니다.
              본인을 추천인으로 등록한10명의 추천인이 각각 100,000원의 상품을
              구매하였다면 본인은 자동적으로 5000마일의 포인트를 얻게 됩니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ② 적립 된 마일리지는 1,000마일리지 이상부터 사용하실 수가
              있습니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ③ 100마일리지는 현금 100원과 같습니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ④ 마일리지는 1,000마일리지 이상 되어야 사용하실 수가 있으며,
              한번에 사용할 수 있는 마일리지는 최대 30,000마일리지입니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ⑤ 바이미마인(바미마)에서는 리뷰에 대한 감사의 표시로 리뷰 1건에
              대해서 300마일리지(사진첨부 된 리뷰는 500마일리지)를 제공하고
              있습니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`30px 0 10px`} fontSize={`16px`}>
              ■ ☞상품주문방법
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              홈페이지 내 상품 주문
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ① 회원ID 로그인
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ① 회원ID 로그인
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ② 상품검색 및 쇼핑백에 담기
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ③ 결제방법 선택 및 결제
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ④ 주문 성공 화면 (주문번호)
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              기타 상품 주문 및 의뢰
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ① 상품 요청(상품문의 게시판에 상품정보 입력 후 견적 및 구매 의뢰)
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ② 비 회원인 경우 의뢰 시 비밀게시판을 통하여 임시 ID와 비밀번호가
              부여되며, 상품정보는 회원장바구니에 넣은 후 회원 정보를 전달하여
              드립니다. ※ 단, 주문시에는 국제배송에 필요한 정확한 추가
              정보입력이 필요합니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ③ 요청한 상품 이외에도 홈페이지 내의 추가주문도 가능합니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ④ 결제방법 선택 및 결제
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ⑤ 주문 성공 화면 (주문번호)
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              ※ “개인통관부호” 필수
            </Wrapper>
            <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
              개인통관부호는 개인물품 수입신고 시, 개인정보 유출을 막기 위해
              주민등록번호 대신 활용할 수 있는 영문 P로 시작하는 12자리 숫자가
              합쳐진 고유부호입니다. 상품 주문 시 개인통관고유부호가 꼭! 필요
              하며, 한 번 발급받으면 평생사용 가능합니다. 아래 관세청
              홈페이지에서 발급하셔서 이용 부탁드립니다.
            </Wrapper>
            <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
              관세청 홈페이지 ▶ https://unipass.customs.go.kr/csp/persIndex.do
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`30px 0 10px`} fontSize={`16px`}>
              ■ ☞주문확인 및 실시간 배송조회
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              주문을 하셨을 경우 주문/배송 확인을 통해서 실제 주문이 어떻게
              처리되고 있는지 확인하실 수 있습니다. 회원페이지에서 주문/배송
              확인을 클릭해 보세요.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              회원일 경우 ID와 비밀번호를 입력하시면 됩니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              배송은 OO택배 서비스를 이용하고 있습니다. 본 서비스는 상품 추적을
              통해 상품이 어디쯤 도착해 있는지 실시간으로 추적하실 수 있습니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`30px 0 10px`} fontSize={`16px`}>
              ■ ☞안전한 대금 결제 시스템
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              무통장 입금과 신용카드의 두 가지 결제방법을 제공하여 드립니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              이용 가능한 국내 발행 신용카드
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              - 국내발행 모든 신용카드
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              - 토스페이결제 가능
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`30px 0 10px`} fontSize={`16px`}>
              ■ ☞배송기간 및 배송방법
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              고객님이 무통장 입금으로 주문하신 경우에는 입금하신 날로부터,
              신용카드로 구매하신 경우에는 구매하신 날로부터 1~2 이내에 일본
              국내 구매가 이루어집니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              일본 국내 배송 기간(약2일~7일) +국제배송기간(약5일~7일)
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              배송기간은 주문하신 상품에 따라 조금 상이할 수 있습니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              구입하신 상품의 배송 방법을 OO택배 서비스를 원칙으로 하고
              있습니다. (배송방법은 상품 종류에 따라 상이할 수 있습니다.)
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`30px 0 10px`} fontSize={`16px`}>
              ■ ☞주문취소, 교환 및 환불
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              소비자의보호를 위해서 규정한 제반 법규를 준수합니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              바이미마인의 모든 상품은 고객 주문의뢰에 의한 구매대행으로
              이루어집니다. 고객의 주문의뢰에 대해서는 최대한 신속히 처리를 하고
              있으며, 저희가 일본 국내에서 주문 전에는 결제하셨더라도 주문
              취소가 가능합니다. 결제 후 취소는 저희 고객센터로 문의해 주시기
              바랍니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              무통장 입금의 경우 일정기간동안 송금을 하지 않으면 자동 주문
              취소가 되고, 구매자가 원하는 경우 인터넷에서 바로 취소 하실 수도
              있으며, 송금을 하신 경우에는 환불조치 해드립니다. 카드로 결제하신
              경우, 승인 취소가 가능하면 취소해드리지만 승인 취소가 불가능한
              경우 해당 금액을 모두 송금해 드립니다. 단, 일본 국내에서
              고객요청상품이 주문이 완료 된 후에는 취소가 불가능합니다.
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`0 0 95px`}>
              반송을 하실 때에는 주문번호, 회원번호를 메모하여 보내주시면 보다
              신속한 처리에 도움이 됩니다.
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

export default Index;
