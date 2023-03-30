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
        <title>BUY ME MINE | 이용 약관</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `70px 0 0` : `95px 0 0`}>
          <RsWrapper>
            <Wrapper
              fontSize={width < 900 ? `28px` : `36px`}
              fontWeight={`600`}
              margin={`0 0 10px`}
            >
              개인정보처리방침
            </Wrapper>
            <Wrapper
              width={`100%`}
              border={`1px solid ${Theme.adminTheme_4}`}
            ></Wrapper>
            <Wrapper al={`flex-start`} margin={`30px 0 10px`} fontSize={`16px`}>
              (BMM INC.) ('buymemine.com'이하 'buymemine')은(는) 「개인정보
              보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한
              고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
              개인정보 처리방침을 수립·공개합니다.
            </Wrapper>
            <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 30px`}>
              ○ 이 개인정보처리방침은 2023년 4월 1부터 적용됩니다.
            </Wrapper>
            <Wrapper>
              <Wrapper
                al={`flex-start`}
                fontSize={`16px`}
                fontWeight={`600`}
                margin={`0 0 10px`}
              >
                제1조(개인정보의 처리 목적)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ( BMM INC. )('buymemine.com'이하 'buymemine')은(는) 다음의
                목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는
                다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는
                경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등
                필요한 조치를 이행할 예정입니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                1. 홈페이지 회원가입 및 관리 회원 가입의사 확인, 회원제 서비스
                제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용
                방지, 만14세 미만 아동의 개인정보 처리 시 법정대리인의 동의여부
                확인, 각종 고지·통지 목적으로 개인정보를 처리합니다
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                2. 민원사무 처리 민원사항 확인, 사실조사를 위한 연락·통지,
                처리결과 통보 목적으로 개인정보를 처리합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                3. 재화 또는 서비스 제공 물품배송, 계약서·청구서 발송, 본인인증,
                요금결제·정산을 목적으로 개인정보를 처리합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                4. 마케팅 및 광고에의 활용 신규 서비스(제품) 개발 및 맞춤 서비스
                제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 서비스의
                유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계
                등을 목적으로 개인정보를 처리합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                5. 개인영상정보 범죄의 예방 및 수사 등을 목적으로 개인정보를
                처리합니다.
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제2조(개인정보의 처리 및 보유 기간)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ① ( BMM INC. )은(는) 법령에 따른 개인정보 보유·이용기간 또는
                정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보
                보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　1. [홈페이지 회원가입 및 관리]
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• [홈페이지 회원가입 및 관리]와 관련한 개인정보는
                수집.이용에 관한 동의일로부터(5년)까지 위 이용목적을 위하여
                보유.이용됩니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• 보유근거 : 중복 가입 및 원할 한 서비스 이행
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• 관련법령 : 1)계약 또는 청약철회 등에 관한 기록 : 5년
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　　　　　　　2) 대금결제 및 재화 등의 공급에 관한 기록 : 5년
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제3조(처리하는 개인정보의 항목)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ① ( BMM INC. )은(는) 다음의 개인정보 항목을 처리하고 있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                1. [ 홈페이지 회원가입 및 관리 ]
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　• 필수항목 : 이름, 생년월일, 성별, 로그인ID, 비밀번호,
                비밀번호 질문과 답, 자택전화번호, 자택주소, 휴대전화번호,
                이메일, 결제기록, 접속 IP 정보, 쿠키, 접속 로그, 서비스 이용
                기록
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제4조(개인정보의 제3자 제공에 관한 사항)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ① ( BMM INC. )은(는) 개인정보를 제1조(개인정보의 처리 목적)에서
                명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한
                규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만
                개인정보를 제3자에게 제공합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ② ( BMM INC. )은(는) 다음과 같이 개인정보를 제3자에게 제공하고
                있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　1. [개인정보 담당자]
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• 개인정보를 제공받는 자 : 개인정보 담당자
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• 제공받는 자의 개인정보 이용목적 : 이름, 자택주소,
                휴대전화번호, 이메일
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• 제공받는 자의 보유.이용기간: 1년
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제5조(개인정보처리의 위탁에 관한 사항)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ① ( BMM INC. )은(는) 원활한 개인정보 업무처리를 위하여 다음과
                같이 개인정보 처리업무를 위탁 할 수 있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ② ( BMM INC. )은(는) 위탁계약 체결 시 「개인정보 보호법」
                제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지,
                기술적․관리적 보호조치, 재 위탁 제한, 수탁자에 대한 관리․감독,
                손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고,
                수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본
                개인정보 처리방침을 통하여 공개하도록 하겠습니다.
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제6조(개인정보의 국외 이전에 관한 사항)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ① (본 사이트 )은(는) 품질향상을 위해 귀사의 개인정보를 외부에
                위탁하여 처리할 수 있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                1. 개인정보의 처리를 위탁하는 경우에는 미리 그 사실을 귀하에게
                고지하겠습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                2. 개인정보의 처리를 위탁하는 경우에는 위탁계약 등을 통하여
                서비스제공자의 개인정보호 관련 지시엄수, 개인정보에 관한
                비밀유지, 제3자 제공의 금지 및 사고시의 책임부담 등을 명확히
                규정하고 당해 계약내용을 서면 또는 전자적으로 보관하겠습니다.
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제7조(개인정보의 파기절차 및 파기방법)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ① ( BMM INC. ) 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등
                개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
                파기합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ② 정보주체로부터 동의 받은 개인정보 보유기간이 경과하거나
                처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를
                계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의
                데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　1. 법령 근거 : 전자상거래 등에서의 소비자보호에 관한 법률
                제6조 거래기록의 보존
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　2. 보존하는 개인정보 항목 : 회원 가입정보
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　1. 파기절차
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　(BMM INC.) 은(는) 파기 사유가 발생한 개인정보를 선정하고, (
                BMM INC. ) 의 개인정보 보호책임자의 승인을 받아 개인정보를
                파기합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　2. 파기방법
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여
                파기합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을
                사용합니다.
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제8조(미이용자의 개인정보 파기 등에 관한 조치)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ① (개인정보처리자명)은(는) 1년간 서비스를 이용하지 않은 이용자는
                휴면계정으로 전환하고, 개인정보를 별도로 분리하여 보관합니다.
                분리 보관된 개인정보는 1년간 보관 후 지체없이 파기합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ② (개인정보처리자명)은(는) 휴먼전환 30일 전까지 휴면예정
                회원에게 별도 분리 보관되는 사실 및 휴면 예정일, 별도 분리
                보관하는 개인정보 항목을 이메일, 문자 등 이용자에게 통지 가능한
                방법으로 알리고 있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ③ 휴면계정으로 전환을 원하지 않으시는 경우, 휴면계정 전환 전
                서비스 로그인을 하시면 됩니다. 또한, 휴면계정으로 전환되었더라도
                로그인을 하는 경우 이용자의 동의에 따라 휴면계정을 복원하여
                정상적인 서비스를 이용할 수 있습니다.
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제9조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한
                사항)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ① 정보주체는 BMM INC.에 대해 언제든지 개인정보
                열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ② 제1항에 따른 권리 행사는BMM INC.에 대해 「개인정보 보호법」
                시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을
                통하여 하실 수 있으며 BMM INC.은(는) 이에 대해 지체 없이
                조치하겠습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은
                자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리
                방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을
                제출하셔야 합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조
                제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수
                있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가
                수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수
                없습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ⑥ BMM INC.은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의
                요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나
                정당한 대리인인지를 확인합니다.
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제10조(개인정보의 안전성 확보조치에 관한 사항)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ( BMM INC. )은(는) 개인정보의 안전성 확보를 위해 다음과 같은
                조치를 취하고 있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　1. 개인정보 취급 직원의 최소화 및 교육
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화
                하여 개인정보를 관리하는 대책을 시행하고 있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　2. 정기적인 자체 감사 실시
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로
                자체 감사를 실시하고 있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　3. 개인정보에 대한 접근 제한
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의
                부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한
                조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단
                접근을 통제하고 있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　4. 해킹 등에 대비한 기술적 대책
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　[BMM INC.] ('buymemine')은 해킹이나 컴퓨터 바이러스 등에
                의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고
                주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에
                시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제11조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그
                거부에 관한 사항)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ① BMM INC. 은(는) 이용자에게 개별적인 맞춤서비스를 제공하기 위해
                이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의
                컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC
                컴퓨터내의 하드디스크에 저장되기도 합니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                　가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹
                사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부,
                등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                　나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구-인터넷
                옵션-개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수
                있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                　다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이
                발생할 수 있습니다.
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제12조(행태정보의 수집·이용·제공 및 거부 등에 관한 사항)
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                행태정보의 수집·이용·제공 및 거부등에 관한 사항
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                [개인정보처리자명]은(는) 온라인 맞춤형 광고 등을 위한 행태정보를
                수집·이용·제공하지 않습니다.
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제13조(추가적인 이용·제공 판단기준)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ( BMM INC. ) 은(는) ｢개인정보 보호법｣ 제15조제3항 및
                제17조제4항에 따라 ｢개인정보 보호법 시행령｣ 제14조의2에 따른
                사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로
                이용·제공할 수 있습니다. 이에 따라 ( BMM INC. ) 가(이)
                정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과
                같은 사항을 고려하였습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                ▶ 개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과
                관련성이 있는지 여부
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                ▶ 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인
                이용·제공에 대한 예측 가능성이 있는지 여부
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                ▶ 개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게
                침해하는지 여부
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                ▶ 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지
                여부
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                ※ 추가적인 이용·제공 시 고려사항에 대한 판단기준은 사업자/단체
                스스로 자율적으로 판단하여 작성·공개함
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제14조 (개인정보 보호책임자에 관한 사항)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ① BMM INC. 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을
                위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• ▶ 개인정보 보호책임자
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• 직책 :개인정보처리 담당
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• 연락처 :070-8989-7574, buymemine.info@gmail.com,
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                ※ 개인정보 보호 담당부서로 연결됩니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• ▶ 개인정보 보호 담당
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• 직책 :개인정보처리 담당
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• 연락처 :070-8989-7574, buymemine.info@gmail.com,
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ② 정보주체께서는 BMM INC. 의 서비스(또는 사업)을 이용하시면서
                발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에
                관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수
                있습니다. BMM INC. 은(는) 정보주체의 문의에 대해 지체 없이 답변
                및 처리해드릴 것입니다.
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제15조(개인정보의 열람청구를 접수·처리하는 부서)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람
                청구를 아래의 부서에 할 수 있습니다. ( BMM INC. )은(는)
                정보주체의 개인정보 열람청구가 신속하게 처리되도록
                노력하겠습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• ▶ 개인정보 열람청구 접수·처리 부서
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• 직책 :개인정보처리 담당
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                　　• 연락처 :070-8989-7574, buymemine.info@gmail.com,
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제16조(정보주체의 권익침해에 대한 구제방법)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람
                청구를 아래의 부서에 할 수 있습니다. ( BMM INC. )은(는)
                정보주체의 개인정보 열람청구가 신속하게 처리되도록
                노력하겠습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                정보주체는 개인정보침해로 인한 구제를 받기 위하여
                개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터
                등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타
                개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기
                바랍니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972
                (www.kopico.go.kr)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
                (www.kopico.go.kr)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr) (www.kopico.go.kr)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의
                정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에
                대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는
                이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을
                청구할 수 있습니다.
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 10px`}>
                ※ 행정심판에 대해 자세한 사항은
                중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기
                바랍니다.
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`30px 0 10px`}
                fontSize={`16px`}
                fontWeight={`600`}
              >
                제17조(개인정보 처리방침 변경)
              </Wrapper>
              <Wrapper al={`flex-start`} fontSize={`16px`} margin={`0 0 95px`}>
                ① 이 개인정보처리방침은 2023년 4월 1부터 적용됩니다.
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

export default Index;
