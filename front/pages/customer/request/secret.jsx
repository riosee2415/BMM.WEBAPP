import React, { useState, useCallback, useEffect } from "react";
import ClientLayout from "../../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import CustomerLeft from "../../../components/CustomerLeft";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import useInput from "../../../hooks/useInput";
import { REQUEST_LIST_REQUEST } from "../../../reducers/request";

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
  const { requestData } = useSelector((state) => state.request);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const password = useInput("");

  const [requsetDatum, setRequesDatum] = useState(requestData);

  ////// REDUX //////
  ////// USEEFFECT //////
  // useEffect(() => {
  //   if (password.value) {
  //     if (password.value) {
  //       // router.push(`/customer/request/${data.id}`);
  //       return message.success({
  //         content: "비밀번호가 맞습니다.",
  //       });
  //     } else {
  //       return message.error({
  //         content: "비밀번호가 틀렸습니다.",
  //       });
  //     }
  //   }
  // }, [password.value]);

  ////// TOGGLE //////

  //// HANDLER /////
  const passwordHandler = useCallback(() => {
    if (!requsetDatum) {
      return router.push(`/customer/request`);

      // message.error("")
    }

    if (!password.value) {
      return message.error("비밀번호를 입력해주세요.");
    }

    if (requsetDatum.password === password.value) {
      router.push(`/customer/request/${requsetDatum.id}`);
      return message.success("비밀번호가 일치합니다.");
    } else {
      return message.error("비밀번호가 일치하지 않습니다.");
    }
  }, [password.value, requsetDatum]);

  const onSubmitHandler = useCallback(
    (e) => {
      if (e.key === "Enter") {
        passwordHandler();
      }
    },
    [password.value]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 상품 요청</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `70px 0 0` : `95px 0 0`}>
          <RsWrapper dr={`row`} al={`flex-start`} position={`relative`}>
            <CustomerLeft />
            <Wrapper
              width={
                width < 1100
                  ? width < 900
                    ? `100%`
                    : `calc(100% - 200px)`
                  : `calc(100% - 260px)`
              }
            >
              <Wrapper
                bgColor={Theme.lightGrey3_C}
                padding={width < 900 ? `20px 10px` : `40px`}
                dr={`row`}
              >
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/3D_product-request.png`}
                  width={width < 900 ? `90px` : `115px`}
                />
                <Wrapper
                  width={
                    width < 900 ? `calc(100% - 90px)` : `calc(100% - 115px)`
                  }
                  padding={width < 900 ? `0 0 0 10px` : `0 0 0 18px`}
                  al={`flex-start`}
                  ju={`space-between`}
                >
                  <Wrapper
                    al={`flex-start`}
                    fontSize={width < 900 ? `14px` : `24px`}
                  >
                    <Text>찾으시는 상품이 없으신가요?</Text>
                    <Text>
                      <SpanText fontWeight={`bold`}>상품 요청 서비스</SpanText>
                      를 이용해보세요!
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    al={`flex-end`}
                    fontSize={width < 900 ? `14px` : `18px`}
                  >
                    Buy ME MINE은 고객을 위해 맞춤 서비스를 제공합니다.
                    <CommonButton
                      width={`160px`}
                      height={width < 900 ? `40px` : `48px`}
                      fontSize={width < 900 ? `16px` : `18px`}
                      fontWeight={`600`}
                      kindOf={`white`}
                      onClick={() => router.push(`/customer/request/write`)}
                    >
                      상품 요청하기
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper al={`flex-start`}>
                <Text
                  margin={`45px 0 30px`}
                  fontSize={width < 900 ? `22px` : `28px`}
                  fontWeight={`bold`}
                >
                  비밀글 보기
                </Text>
                <Text fontSize={`18px`}>이 글은 비밀글입니다.</Text>
                <Text fontSize={`18px`}>비밀번호를 입력하여 주세요.</Text>
              </Wrapper>
              <Wrapper dr={`row`} ju={`flex-start`} margin={`40px 0 100px`}>
                <TextInput
                  placeholder="비밀번호를 입력해주세요."
                  width={width < 800 ? `200px` : `265px`}
                  height={`46px`}
                  type={`password`}
                  margin={`0 10px 0 0`}
                  onKeyUp={onSubmitHandler}
                  {...password}
                />
                <CommonButton
                  height={`46px`}
                  width={`110px`}
                  fontSize={`16px`}
                  fontWeight={`600`}
                  kindOf={`darkgrey`}
                  onClick={passwordHandler}
                >
                  확인
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </RsWrapper>
        </WholeWrapper>
      </ClientLayout>
    </>
  );
};

export default Index;
