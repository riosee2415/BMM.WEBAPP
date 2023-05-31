import React, { useCallback, useEffect, useState } from "react";
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
  CommonButton,
  SpanText,
  TextInput,
  CustomSelect,
  ATag,
} from "../../components/commonComponents";
import styled from "styled-components";
import { Checkbox, Form, Radio, Select, Modal, message } from "antd";
import DaumPostcode from "react-daum-postcode";
import { useSelector } from "react-redux";
import { COUPON_SEARCH_REQUEST } from "../../reducers/coupon";
import { numberWithCommas } from "../../components/commonUtils";
import { useRouter } from "next/router";

const List = styled(Wrapper)`
  height: 100px;
  flex-direction: row;
  border-bottom: 1px solid ${Theme.lightGrey2_C};
  font-size: 16px;
`;

const MobileList = styled(Wrapper)`
  margin: 0 0 30px;
  border: 1px solid ${Theme.lightGrey2_C};
  padding: 15px;
`;

const BoxText = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  font-size: 18px;
  margin: ${(props) => props.margin || `0 0 15px`};
`;

const SubText = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  color: ${Theme.lightGrey_C};
  margin: ${(props) => props.margin || `0 0 8px`};
`;

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////

  const { couponSearchList } = useSelector((state) => state.coupon);
  const { me } = useSelector((state) => state.user);

  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();

  const [form] = Form.useForm();

  const [value, setValue] = useState(1);
  const [payvalue, setPayValue] = useState(1);
  const [orderData, setOrderData] = useState(null);
  const [pModal, setPModal] = useState(false);

  const [allAgree, setAllAgree] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

  // 쿠폰 선택
  const [selectCoupon, setSelectCoupon] = useState(null);

  // 포인트 사용
  const [usePoint, setUsePoint] = useState(null);

  // 총 상품금액
  const [totalPrice, setTotalPrice] = useState(0);
  // 총 무게
  const [totalWeight, setTotalWeight] = useState(0);
  // 총 배송비
  const [totalDelPrice, setTotalDelPrice] = useState(0);
  // 총 할인 금액
  const [totalDiscountPrice, setTotalDiscountPrice] = useState({
    delDiscountPrice: 0,
    userDiscountPrice: 0,
    couponDiscountPrice: 0,
    pointDiscountPrice: 0,
  });
  // 총 결제 금액
  const [totalBuyPrice, setTotalBuyPrice] = useState(0);
  ////// REDUX //////

  // 배송비 계산
  const weightDeliveryPrice = (weight) => {
    let price = 0;

    if (weight === 0.5) {
      price = 9900;
    } else if (weight > 0.5 && weight < 15.5) {
      price = 10000 + ((weight - 0.5) / 0.5) * 2000;
    } else {
      price = 70000 + ((weight - 15.5) / 0.5) * 1500;
    }

    return price;
  };

  ////// USEEFFECT //////

  useEffect(() => {
    const orderSession = sessionStorage.getItem("BMM_ORDER")
      ? JSON.parse(sessionStorage.getItem("BMM_ORDER"))
      : [];

    setOrderData(orderSession);
  }, [router.query]);

  useEffect(() => {
    if (!me) {
      router.push("/user/login");
      return message.error("로그인 후 이용해주세요.");
    }
  }, [me]);

  useEffect(() => {
    if (value === 1) {
      form.setFieldsValue({
        name: me.username,
        email: me.email,
        tel: me.mobile,
        postCode: me.postCode,
        address: me.address,
        detailAddress: me.detailAddress,
      });
    } else {
      form.resetFields();
    }
  }, [value]);

  // 금액 측정
  useEffect(() => {
    if (orderData && me) {
      const wieghtDelPrice = weightDeliveryPrice(
        orderData.map((data) => data.productWeight).reduce((a, b) => a + b)
      );

      // 총 상품긍맥
      setTotalPrice(
        orderData.map((data) => data.originRealPrice).reduce((a, b) => a + b)
      );

      // 총 무게
      setTotalWeight(
        orderData.map((data) => data.productWeight).reduce((a, b) => a + b)
      );

      // 총 배송비
      setTotalDelPrice(wieghtDelPrice - wieghtDelPrice * (me.benefit / 100));

      // 총 할인 금액
      setTotalDiscountPrice({
        // 배송 할인금액
        delDiscountPrice: wieghtDelPrice * (me.benefit / 100),

        // 회원 할인 금액
        userDiscountPrice: 0,

        // 쿠폰 사용
        couponDiscountPrice: selectCoupon
          ? couponSearchList.find((data) => data.id === selectCoupon)
              .discountPay
          : 0,

        // 포인트 사용
        pointDiscountPrice: usePoint ? usePoint : 0,
      });
    }
  }, [orderData, selectCoupon, usePoint, me]);

  // 총 결제 금액
  useEffect(() => {
    setTotalBuyPrice(
      totalPrice +
        totalDelPrice -
        (totalDiscountPrice.delDiscountPrice +
          totalDiscountPrice.userDiscountPrice +
          totalDiscountPrice.couponDiscountPrice +
          totalDiscountPrice.pointDiscountPrice)
    );
  }, [totalPrice, totalDelPrice, totalDiscountPrice]);

  ////// TOGGLE //////

  // 우편 번호 검색 모달
  const pModalToggle = useCallback(() => {
    setPModal((prev) => !prev);
  }, [pModal]);

  // 주문내용을 확인하였으며, 모두 동의합니다.
  const allAgreeToggle = useCallback(() => {
    if (!allAgree) {
      setAgree1(true);
      setAgree2(true);
      setAgree3(true);
    } else {
      setAgree1(false);
      setAgree2(false);
      setAgree3(false);
    }
    setAllAgree((prev) => !prev);
  }, [agree1, agree2, agree3, allAgree]);

  // 개인정보 수집/이용 동의 보기
  const agree1Toggle = useCallback(() => {
    if (!agree1 && agree2 && agree3) {
      setAllAgree(true);
    } else {
      setAllAgree(false);
    }

    setAgree1((prev) => !prev);
  }, [agree1, agree2, agree3, allAgree]);

  // 개인정보 제3자 제공 동의 보기
  const agree2Toggle = useCallback(() => {
    if (agree1 && !agree2 && agree3) {
      setAllAgree(true);
    } else {
      setAllAgree(false);
    }

    setAgree2((prev) => !prev);
  }, [agree1, agree2, agree3, allAgree]);

  // 결제대행 서비스 약관 동의
  const agree3Toggle = useCallback(() => {
    if (agree1 && agree2 && !agree3) {
      setAllAgree(true);
    } else {
      setAllAgree(false);
    }

    setAgree3((prev) => !prev);
  }, [agree1, agree2, agree3, allAgree]);

  ////// HANDLER //////

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onChangePay = (e) => {
    setPayValue(e.target.payvalue);
  };

  // 쿠폰 사용
  const selectCouponChangeHandler = useCallback(
    (data) => {
      const getCoupon = couponSearchList.find((value) => value.id === data);

      if (totalBuyPrice < getCoupon.minimunPay) {
        return message.error("쿠폰 최소 사용금액에 맞지 않습니다.");
      }

      setSelectCoupon(data);
    },
    [selectCoupon, couponSearchList, totalBuyPrice]
  );

  // 포인트 사용
  const usePointHandler = useCallback(() => {
    const getFormData = form.getFieldsValue();

    if (me.point < getFormData.point) {
      return message.error("포인트가 없습니다.");
    }

    setUsePoint(getFormData.point);
  }, [usePoint, me]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>BUY ME MINE | 결제하기</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `40px 0 80px` : `95px 0`}>
          <RsWrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 30px`}>
              <Text
                fontSize={width < 900 ? `22px` : `34px`}
                fontWeight={`bold`}
              >
                결제하기
              </Text>
              <Wrapper dr={`row`} width={`auto`}>
                <Text color={Theme.lightGrey_C} margin={`0 6px`}>
                  장바구니
                </Text>
                <Image
                  alt="next icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/next_breadcrambs.png`}
                  width={`5px`}
                />
                <Text color={Theme.black_C} margin={`0 6px`}>
                  주문서작성/결제
                </Text>
                <Image
                  alt="next icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/bmm/assets/images/icon/next_breadcrambs.png`}
                  width={`5px`}
                />
                <Text color={Theme.lightGrey_C} margin={`0 0 0 6px`}>
                  주문완료
                </Text>
              </Wrapper>
            </Wrapper>
            <CustomForm layout="inline" form={form}>
              <Wrapper dr={`row`} ju={`space-between`} al={`flex-start`}>
                <Wrapper width={width < 900 ? `100%` : `65%`}>
                  <Wrapper
                    height={`54px`}
                    dr={`row`}
                    color={Theme.grey_C}
                    bgColor={Theme.lightGrey3_C}
                    borderTop={`1px solid ${Theme.basicTheme_C}`}
                    borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                    fontSize={width < 800 ? `14px` : `16px`}
                    fontWeight={`600`}
                    display={width < 1100 ? `none` : `flex`}
                  >
                    <Wrapper width={`55%`}>상품정보</Wrapper>
                    <Wrapper width={`15%`}>주문수량</Wrapper>
                    <Wrapper width={`15%`}>상품금액</Wrapper>
                    <Wrapper width={`15%`}>무게</Wrapper>
                  </Wrapper>
                  {orderData &&
                    orderData.map((data, idx) => {
                      return width < 1100 ? (
                        <Wrapper key={idx}>
                          <MobileList>
                            <Wrapper
                              al={`flex-start`}
                              fontSize={width < 800 ? `14px` : `16px`}
                              fontWeight={`600`}
                              margin={`0 0 13px`}
                            >
                              {data.productTitle}
                            </Wrapper>
                            <Wrapper
                              dr={`row`}
                              ju={`flex-start`}
                              color={Theme.darkGrey_C}
                              fontSize={`14px`}
                              margin={`0 0 10px`}
                            >
                              <Image
                                alt="thumbnail"
                                src={data.productThumbnail}
                                width={`70px`}
                                height={`70px`}
                              />
                              <Wrapper
                                width={`auto`}
                                al={`flex-start`}
                                padding={`0 0 0 20px`}
                              >
                                <Text>주문수량 : {data.qun}</Text>
                                <Text>무게: {data.concatProductWeight}</Text>
                                <Text>상품금액: {data.realPrice}</Text>
                              </Wrapper>
                            </Wrapper>
                          </MobileList>
                        </Wrapper>
                      ) : (
                        <>
                          <List key={idx}>
                            <Wrapper
                              width={`55%`}
                              dr={`row`}
                              ju={`flex-start`}
                              fontSize={`18px`}
                              fontWeight={`600`}
                              padding={`0 0 0 14px`}
                            >
                              <Image
                                alt="thumbnail"
                                src={data.productThumbnail}
                                width={`64px`}
                                height={`64px`}
                              />
                              <Text padding={`0 0 0 14px`}>
                                {data.productTitle}
                              </Text>
                            </Wrapper>
                            <Wrapper width={`15%`}>{data.qun}</Wrapper>
                            <Wrapper color={Theme.darkGrey_C} width={`15%`}>
                              {data.realPrice}
                            </Wrapper>
                            <Wrapper color={Theme.darkGrey_C} width={`15%`}>
                              {data.concatProductWeight}
                            </Wrapper>
                          </List>
                        </>
                      );
                    })}

                  <Wrapper
                    al={`flex-start`}
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    bgColor={Theme.lightGrey3_C}
                    padding={`20px 20px`}
                    margin={`24px 0 60px`}
                    fontSize={width < 800 ? `14px` : `16px`}
                  >
                    <Text
                      fontSize={`18px`}
                      fontWeight={`600`}
                      color={Theme.red_C}
                      margin={`0 0 18px`}
                    >
                      ※주의사항
                    </Text>
                    <Text margin={`0 0 15px`}>
                      · 배송비를 제외한 상품금액이
                      <SpanText
                        fontWeight={`600`}
                        color={Theme.red_C}
                        margin={`0 0 0 4px`}
                      >
                        150$를 초과하면 관부가세가 발생
                      </SpanText>
                      할 수 있습니다.
                    </Text>
                    <Text margin={`0 0 15px`}>
                      ·
                      <SpanText
                        margin={`0 0 0 4px`}
                        fontWeight={`600`}
                        color={Theme.red_C}
                      >
                        의약품, 건강기능식품은 한 번 주문시에 합하여 6개까지만
                        가능
                      </SpanText>
                      합니다. 초과시에는 세관에서 폐기 또는 반품처리되며, 이에
                      따르는 비용은 본인 부담으로 발생됩니다.
                    </Text>
                    <Text>· 주의사항이 들어오는 곳입니다.</Text>
                  </Wrapper>
                  <Wrapper al={`flesx-start`} margin={`0 0 20px`}>
                    <Text
                      fontSize={width < 800 ? `20px` : `24px`}
                      fontWeight={`600`}
                    >
                      수령인 정보입력
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    borderTop={`1px solid ${Theme.basicTheme_C}`}
                    borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                    padding={`16px 0`}
                  >
                    <Text
                      width={width < 800 ? `100%` : `20%`}
                      lineHeight={`46px`}
                      fontSize={width < 800 ? `14px` : `16px`}
                    >
                      배송지 선택
                    </Text>
                    <Wrapper
                      width={width < 800 ? `100%` : `45%`}
                      height={`46px`}
                      al={`flex-start`}
                    >
                      <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>
                          <Text fontSize={width < 800 ? `14px` : `16px`}>
                            주문자 정보와 동일
                          </Text>
                        </Radio>
                        <Radio value={2}>
                          <Text fontSize={width < 800 ? `14px` : `16px`}>
                            신규 배송지
                          </Text>
                        </Radio>
                      </Radio.Group>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    width={`100%`}
                    dr={`row`}
                    ju={`flex-start`}
                    borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                    padding={`16px 0`}
                  >
                    <Wrapper
                      width={width < 800 ? `100%` : `20%`}
                      al={`flex-start`}
                    >
                      <Text
                        lineHeight={`46px`}
                        fontSize={width < 800 ? `14px` : `16px`}
                      >
                        수령인 이름 <SpanText color={Theme.red_C}>*</SpanText>
                      </Text>
                    </Wrapper>
                    <Wrapper
                      width={width < 1100 ? `100%` : `80%`}
                      al={`flex-start`}
                    >
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: (
                              <Text fontSize={width < 800 ? `14px` : `16px`}>
                                * 수령인 이름을 입력해주세요.
                              </Text>
                            ),
                          },
                        ]}
                      >
                        <TextInput
                          width={width < 1100 ? `100%` : `385px`}
                          height={`46px`}
                          padding={`0 10px`}
                          margin={`0 0 12px`}
                          placeholder={`이름을 입력해주세요.`}
                        />
                      </Form.Item>
                      <Wrapper al={`flex-start`} color={Theme.red_C}>
                        <Text fontSize={width < 800 ? `14px` : `16px`}>
                          * 수령인 이름(영문이름 포함)은 개인통관고유번호에
                          등록된 이름과 동일해야 합니다.
                        </Text>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                    padding={`16px 0`}
                  >
                    <Text
                      width={width < 800 ? `100%` : `20%`}
                      lineHeight={`46px`}
                      fontSize={width < 800 ? `14px` : `16px`}
                    >
                      수령인 영어이름<SpanText color={Theme.red_C}>*</SpanText>
                    </Text>
                    <Wrapper
                      width={width < 1100 ? `100%` : `80%`}
                      al={`flex-start`}
                    >
                      <Form.Item
                        name="englishName"
                        rules={[
                          {
                            required: true,
                            message: (
                              <Text fontSize={width < 800 ? `14px` : `16px`}>
                                * 수령인 영문이름을 입력해주세요.
                              </Text>
                            ),
                          },
                        ]}
                      >
                        <TextInput
                          width={width < 1100 ? `100%` : `385px`}
                          height={`46px`}
                          placeholder={`영문이름을 입력해주세요.`}
                        />
                      </Form.Item>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                    padding={`16px 0`}
                  >
                    <Wrapper
                      width={width < 800 ? `100%` : `20%`}
                      al={`flex-start`}
                    >
                      <Text
                        lineHeight={`46px`}
                        fontSize={width < 800 ? `14px` : `16px`}
                      >
                        개인통관고유부호
                        <SpanText color={Theme.red_C}>*</SpanText>
                      </Text>
                    </Wrapper>
                    <Wrapper
                      width={width < 1100 ? `100%` : `80%`}
                      al={`flex-start`}
                    >
                      <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 10px`}>
                        <TextInput
                          width={width < 1100 ? `calc(100% - 120px)` : `265px`}
                          height={`46px`}
                          border={`1px solid ${Theme.lightGrey2_C}`}
                          al={`flex-start`}
                          margin={`0 10px 0 0`}
                          placeholder="개인통관고유부호를 입력해주세요."
                        />
                        <CommonButton
                          width={`110px`}
                          height={`46px`}
                          fontSize={width < 800 ? `14px` : `16px`}
                          fontWeight={`600`}
                          kindOf={`grey2`}
                          padding={`0`}
                        >
                          번호 확인하기
                        </CommonButton>
                      </Wrapper>
                      <ATag
                        width={width < 1100 ? `100%` : `385px`}
                        href={`https://unipass.customs.go.kr/csp/persIndex.do`}
                        target={`_blank`}
                      >
                        <CommonButton
                          width={`100%`}
                          height={`46px`}
                          fontSize={width < 800 ? `14px` : `16px`}
                          fontWeight={`600`}
                          margin={`0 0 12px`}
                        >
                          개인통관고유부호 발급 받기
                        </CommonButton>
                      </ATag>
                      <Wrapper
                        al={`flex-start`}
                        color={Theme.red_C}
                        fontSize={width < 800 ? `13px` : `16px`}
                      >
                        <Text>
                          * 반드시
                          <SpanText fontWeight={`600`} margin={`0 0 0 4px`}>
                            수령인의 '개인통관고유부호'
                          </SpanText>
                          를 입력해주세요.
                        </Text>
                        <Text>
                          * 개인통관고유부호가 불일치할 경우, 통관이 진행되지
                          않습니다.
                        </Text>
                        <Text>
                          * 개인통관고유부호는 관세청사이트에서 발급받을 수
                          있습니다.
                        </Text>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                    padding={`16px 0`}
                  >
                    <Text
                      width={width < 800 ? `100%` : `20%`}
                      lineHeight={`46px`}
                      fontSize={width < 800 ? `14px` : `16px`}
                    >
                      이메일<SpanText color={Theme.red_C}>*</SpanText>
                    </Text>
                    <Wrapper
                      width={width < 1100 ? `100%` : `80%`}
                      al={`flex-start`}
                    >
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: (
                              <Text fontSize={width < 800 ? `14px` : `16px`}>
                                * 이메일을 입력해주세요.
                              </Text>
                            ),
                          },
                        ]}
                      >
                        <TextInput
                          width={width < 1100 ? `100%` : `385px`}
                          height={`46px`}
                          placeholder={`이메일을 입력해주세요.`}
                        />
                      </Form.Item>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                    padding={`16px 0`}
                  >
                    <Text
                      width={width < 800 ? `100%` : `20%`}
                      lineHeight={`46px`}
                      fontSize={width < 800 ? `14px` : `16px`}
                    >
                      연락처<SpanText color={Theme.red_C}>*</SpanText>
                    </Text>
                    <Wrapper
                      width={width < 1100 ? `100%` : `80%`}
                      al={`flex-start`}
                    >
                      <Form.Item
                        name="tel"
                        rules={[
                          {
                            required: true,
                            message: (
                              <Text fontSize={width < 800 ? `14px` : `16px`}>
                                * 연락처를 입력해주세요.
                              </Text>
                            ),
                          },
                        ]}
                      >
                        <TextInput
                          width={width < 1100 ? `100%` : `385px`}
                          height={`46px`}
                          placeholder={`'-' 제외 연락처를 입력해주세요.`}
                        />
                      </Form.Item>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                    padding={`16px 0`}
                  >
                    <Wrapper
                      width={width < 1100 ? `100%` : `20%`}
                      al={`flex-start`}
                      lineHeight={`46px`}
                      fontSize={width < 800 ? `14px` : `16px`}
                    >
                      <Text>
                        주소<SpanText color={Theme.red_C}>*</SpanText>
                      </Text>
                    </Wrapper>

                    <Wrapper
                      width={width < 1100 ? `100%` : `80%`}
                      al={`flex-start`}
                    >
                      <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 10px`}>
                        <Wrapper
                          width={width < 1100 ? `calc(100% - 120px)` : `265px`}
                        >
                          <Form.Item name="postCode">
                            <TextInput
                              width={`100%`}
                              height={`46px`}
                              border={`1px solid ${Theme.lightGrey2_C}`}
                              al={`flex-start`}
                              placeholder="우편번호"
                              readOnly
                            />
                          </Form.Item>
                        </Wrapper>
                        <CommonButton
                          width={`110px`}
                          height={`46px`}
                          fontSize={width < 800 ? `14px` : `16px`}
                          fontWeight={`600`}
                          kindOf={`grey2`}
                          margin={`0 0 0 10px`}
                          onClick={pModalToggle}
                        >
                          우편번호
                        </CommonButton>
                      </Wrapper>

                      <Wrapper width={width < 1100 ? `100%` : `385px`}>
                        <Form.Item
                          name="address"
                          rules={[
                            {
                              required: true,
                              message: (
                                <Text fontSize={width < 800 ? `14px` : `16px`}>
                                  * 주소를 선택해주세요.
                                </Text>
                              ),
                            },
                          ]}
                        >
                          <TextInput
                            width={`100%`}
                            height={`46px`}
                            border={`1px solid ${Theme.lightGrey2_C}`}
                            al={`flex-start`}
                            margin={`0 0 10px`}
                            placeholder="기본주소"
                            readOnly
                          />
                        </Form.Item>
                      </Wrapper>

                      <Wrapper width={width < 1100 ? `100%` : `385px`}>
                        <Form.Item
                          name="detailAddress"
                          rules={[
                            {
                              required: true,
                              message: (
                                <Text fontSize={width < 800 ? `14px` : `16px`}>
                                  * 상세주소를 입력해주세요.
                                </Text>
                              ),
                            },
                          ]}
                        >
                          <TextInput
                            width={`100%`}
                            height={`46px`}
                            border={`1px solid ${Theme.lightGrey2_C}`}
                            al={`flex-start`}
                            placeholder="상세주소를 입력해주세요."
                          />
                        </Form.Item>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                    padding={`16px 0`}
                  >
                    <Wrapper
                      width={width < 800 ? `100%` : `20%`}
                      al={`flex-start`}
                    >
                      <Text
                        lineHeight={`46px`}
                        fontSize={width < 800 ? `14px` : `16px`}
                      >
                        배송 메시지
                      </Text>
                    </Wrapper>

                    <Wrapper
                      width={width < 800 ? `100%` : `80%`}
                      al={`flex-start`}
                    >
                      <CustomSelect
                        width={width < 1100 ? `100%` : `385px`}
                        height={`46px`}
                        margin={`0 10px 0 0`}
                        radius={`0`}
                      >
                        <Form.Item name="deliveryMessage">
                          <Select placeholder={`배송 메시지를 입력해주세요.`}>
                            <Select.Option value="배송전에 연락부탁드립니다.">
                              배송전에 연락부탁드립니다.
                            </Select.Option>
                            <Select.Option value="경비실에 맡겨주세요.">
                              경비실에 맡겨주세요.
                            </Select.Option>
                            <Select.Option value="뭍앞에 두고 가주세요.">
                              뭍앞에 두고 가주세요.
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </CustomSelect>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    fontSize={width < 800 ? `20px` : `24px`}
                    fontWeight={`600`}
                    al={`flex-start`}
                    margin={`60px 0 20px`}
                  >
                    쿠폰 및 포인트
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    borderTop={`1px solid ${Theme.basicTheme_C}`}
                    borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                    padding={`16px 0`}
                  >
                    <Text
                      width={width < 1100 ? `100%` : `20%`}
                      lineHeight={`46px`}
                      fontSize={width < 800 ? `14px` : `16px`}
                    >
                      쿠폰
                    </Text>
                    <Wrapper
                      width={width < 800 ? `100%` : `80%`}
                      al={`flex-start`}
                    >
                      <CustomSelect
                        width={width < 1100 ? `100%` : `385px`}
                        height={`46px`}
                        margin={`0 10px 0 0`}
                        radius={`0`}
                      >
                        <Select
                          placeholder={`사용하실 쿠폰을 선택해주세요.`}
                          value={selectCoupon}
                          onChange={selectCouponChangeHandler}
                        >
                          {couponSearchList &&
                            couponSearchList.map((data, idx) => {
                              return (
                                <Select.Option value={data.id} key={idx}>
                                  {data.title}
                                </Select.Option>
                              );
                            })}
                        </Select>
                      </CustomSelect>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    borderBottom={`1px solid ${Theme.lightGrey5_C}`}
                    padding={`16px 0`}
                  >
                    <Text
                      width={width < 1100 ? `100%` : `20%`}
                      lineHeight={`46px`}
                      fontSize={width < 800 ? `14px` : `16px`}
                    >
                      포인트
                    </Text>
                    <Wrapper
                      width={width < 800 ? `100%` : `80%`}
                      al={`flex-start`}
                    >
                      <Text
                        fontSize={width < 800 ? `14px` : `16px`}
                        fontWeight={`600`}
                        margin={`0 0 16px`}
                      >
                        보유 포인트 : {me && me.formatPoint}
                      </Text>
                      <Wrapper dr={`row`} ju={`flex-start`}>
                        {me && (
                          <Wrapper
                            width={
                              width < 1100 ? `calc(100% - 120px)` : `265px`
                            }
                            margin={`0 10px 0 0`}
                          >
                            <Form.Item name="point">
                              <TextInput
                                width={`100%`}
                                height={`46px`}
                                border={`1px solid ${Theme.lightGrey2_C}`}
                                al={`flex-start`}
                                placeholder="사용하실 포인트를 입력해주세요."
                                type="number"
                                max={me.point}
                              />
                            </Form.Item>
                          </Wrapper>
                        )}
                        <CommonButton
                          width={`110px`}
                          height={`46px`}
                          fontSize={width < 800 ? `14px` : `16px`}
                          fontWeight={`600`}
                          onClick={usePointHandler}
                        >
                          모두 사용
                        </CommonButton>
                        {/* <CommonButton
                        width={`110px`}
                        height={`46px`}
                        fontSize={width < 800 ? `14px`:`16px`}
                        fontWeight={`600`}
                        kindOf={`grey2`}
                      >
                        사용 취소
                      </CommonButton> */}
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    fontSize={width < 800 ? `20px` : `24px`}
                    fontWeight={`600`}
                    al={`flex-start`}
                    margin={`60px 0 20px`}
                  >
                    결제 수단
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    borderTop={`1px solid ${Theme.basicTheme_C}`}
                    padding={`30px 0 16px`}
                    margin={width < 1100 ? `0 0 30px` : `0`}
                  >
                    <Wrapper
                      width={width < 1100 ? `100%` : `20%`}
                      al={`flex-start`}
                      lineHeight={`46px`}
                      fontSize={width < 800 ? `14px` : `16px`}
                    >
                      <Text>결제 수단</Text>
                    </Wrapper>

                    <Wrapper
                      width={width < 1100 ? `100%` : `80%`}
                      al={`flex-start`}
                    >
                      <Wrapper al={`flex-start`}>
                        <Radio.Group onChange={onChangePay} payvalue={value}>
                          <Radio value={1}>
                            <Text fontSize={width < 800 ? `14px` : `16px`}>
                              신용카드
                            </Text>
                          </Radio>
                          <Radio value={2}>
                            <Text fontSize={width < 800 ? `14px` : `16px`}>
                              가상계좌
                            </Text>
                          </Radio>
                          <Radio value={3}>
                            <Text fontSize={width < 800 ? `14px` : `16px`}>
                              쿠키페이
                            </Text>
                          </Radio>
                        </Radio.Group>

                        <CustomSelect
                          width={width < 1100 ? `100%` : `385px`}
                          height={`46px`}
                          margin={`16px 0 10px`}
                          radius={`0`}
                        >
                          <Select placeholder={`선택`}>
                            <Select.Option>KB 국민</Select.Option>
                            <Select.Option>2</Select.Option>
                            <Select.Option>3</Select.Option>
                          </Select>
                        </CustomSelect>

                        <CustomSelect
                          width={width < 1100 ? `100%` : `385px`}
                          height={`46px`}
                          margin={`0 10px 0 0`}
                          radius={`0`}
                        >
                          <Select placeholder={`선택`}>
                            <Select.Option>일시불</Select.Option>
                            <Select.Option>2</Select.Option>
                            <Select.Option>3</Select.Option>
                          </Select>
                        </CustomSelect>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>

                {/* ///////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////// */}
                {/* ////////////////////////////////// 오른쪽 영역 ///////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////// */}
                {/* ///////////////////////////////////////////////////////////////////////////// */}

                <Wrapper width={width < 900 ? `100%` : `30%`}>
                  <Wrapper
                    border={`1px solid ${Theme.lightGrey2_C}`}
                    bgColor={Theme.lightGrey3_C}
                    padding={`30px 20px`}
                    margin={`0 0 26px`}
                  >
                    <Wrapper
                      al={`flex-start`}
                      fontSize={`20px`}
                      fontWeight={`600`}
                      borderBottom={`1px solid ${Theme.basicTheme_C}`}
                      margin={`0 0 16px`}
                      padding={`0 0 16px`}
                    >
                      총 {orderData && orderData.length}개의 상품
                    </Wrapper>
                    <BoxText>
                      <Text>총 상품금액</Text>
                      <Text fontWeight={`600`}>
                        {numberWithCommas(totalPrice)}원
                      </Text>
                    </BoxText>

                    <BoxText>
                      <Text>총 무게</Text>
                      <Text fontWeight={`600`}>
                        {totalWeight}
                        kg
                      </Text>
                    </BoxText>
                    <BoxText>
                      <Text>총 배송비</Text>
                      <Text fontWeight={`600`}>
                        {numberWithCommas(totalDelPrice)}원
                      </Text>
                    </BoxText>
                    <BoxText margin={`0 0 13px`}>
                      <Text>총 할인금액</Text>
                      <Text fontWeight={`600`}>
                        {totalDiscountPrice.delDiscountPrice +
                          totalDiscountPrice.userDiscountPrice +
                          totalDiscountPrice.couponDiscountPrice +
                          totalDiscountPrice.pointDiscountPrice}
                        원
                      </Text>
                    </BoxText>
                    <SubText>
                      <Text>ㄴ배송 할인금액</Text>
                      <Text>-{totalDiscountPrice.delDiscountPrice}원</Text>
                    </SubText>
                    <SubText>
                      <Text>ㄴ회원 할인금액(00%)</Text>
                      <Text>-{totalDiscountPrice.userDiscountPrice}원</Text>
                    </SubText>
                    <SubText>
                      <Text>ㄴ쿠폰 사용</Text>
                      <Text>-{totalDiscountPrice.couponDiscountPrice}원</Text>
                    </SubText>
                    <SubText margin={`0 0 30px`}>
                      <Text>ㄴ포인트 사용</Text>
                      <Text>-{totalDiscountPrice.pointDiscountPrice}원</Text>
                    </SubText>
                    <Wrapper
                      dr={`row`}
                      ju={`space-between`}
                      borderTop={`1px solid ${Theme.lightGrey2_C}`}
                      padding={`26px 0 0`}
                    >
                      <Text fontSize={`18px`}>총 결제금액</Text>
                      <Text fontSize={`24px`} fontWeight={`bold`}>
                        {numberWithCommas(totalBuyPrice)}원
                      </Text>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper al={`flex-start`} margin={`0 0 30px`}>
                    <Checkbox onChange={allAgreeToggle} checked={allAgree}>
                      <Text
                        fontSize={`18px`}
                        fontWeight={`600`}
                        margin={`0 0 12px`}
                      >
                        주문내용을 확인하였으며, 모두 동의합니다.
                      </Text>
                    </Checkbox>
                    <Checkbox onChange={agree1Toggle} checked={agree1}>
                      <Text
                        fontSize={width < 800 ? `14px` : `16px`}
                        margin={`0 0 12px`}
                      >
                        (필수) 개인정보 수집/이용 동의 보기
                      </Text>
                    </Checkbox>
                    <Checkbox onChange={agree2Toggle} checked={agree2}>
                      <Text
                        fontSize={width < 800 ? `14px` : `16px`}
                        margin={`0 0 12px`}
                      >
                        (필수) 개인정보 제3자 제공 동의 보기
                      </Text>
                    </Checkbox>
                    <Checkbox onChange={agree3Toggle} checked={agree3}>
                      <Text fontSize={width < 800 ? `14px` : `16px`}>
                        (필수) 결제대행 서비스 약관 동의
                      </Text>
                    </Checkbox>
                  </Wrapper>

                  <CommonButton
                    fontSize={width < 500 ? `16px` : `18px`}
                    fontWeight={`600`}
                    kindOf={`white`}
                    width={`100%`}
                    height={`54px`}
                    htmlType="submit"
                  >
                    결제하기
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </CustomForm>
          </RsWrapper>

          {/* // 주소 모달 */}
          <Modal visible={pModal} footer={null} onCancel={pModalToggle}>
            <DaumPostcode
              onComplete={(data) => {
                form.setFieldsValue({
                  postCode: data.zonecode,
                  address: data.address,
                });
                pModalToggle();
              }}
              width={width < 600 ? `100%` : `600px`}
              height={`500px`}
              autoClose={false}
              animation
            />
          </Modal>
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

    context.store.dispatch({
      type: COUPON_SEARCH_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
