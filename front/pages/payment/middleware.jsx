import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BOUGHT_CREATE_REQUEST } from "../../reducers/wish";
import { message } from "antd";

const Middleware = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    st_boughtCreateLoading,
    st_boughtCreateDone,
    st_boughtCreateError,
    boughtId,
  } = useSelector((state) => state.wish);

  useEffect(() => {
    if (router.query) {
      dispatch({
        type: BOUGHT_CREATE_REQUEST,
        data: {
          price: router.query.price,
          totalPrice: router.query.totalPrice,
          totalWeight: router.query.totalWeight,
          totalDeliveryPrice: router.query.totalDeliveryPrice,
          name: router.query.name,
          englishName: router.query.englishName,
          clearanceNum: router.query.clearanceNum,
          email: router.query.email,
          tel: router.query.tel,
          postCode: router.query.postCode,
          address: router.query.address,
          detailAddress: router.query.detailAddress,
          deliveryMessage: router.query.deliveryMessage,
          useCoupon: router.query.useCoupon === "true" ? true : false,
          couponPrice: router.query.couponPrice,
          CouponId: router.query.CouponId,
          usePoint: router.query.usePoint === "true" ? true : false,
          pointPrice: router.query.pointPrice,
          payWay: router.query.payWay,
          cardBankInfo: router.query.cardBankInfo,
          cardInstallment: router.query.cardInstallment,
          userDiscountPrice: router.query.userDiscountPrice,
          wishItemIds: router.query.wishItemIds,
        },
      });
    }
  }, [router.query]);

  useEffect(async () => {
    if (st_boughtCreateDone) {
      const response = await fetch("https://buymemine.com/payment/middleware", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { a: "react", b: 200 },
      });
      const body = response;
      console.log(body);

      //   router.push("/payment/orderresult");
      return message.success(st_boughtCreateDone);
    }

    if (st_boughtCreateError) {
      router.push("/");
      return message.error(st_boughtCreateError);
    }
  }, [st_boughtCreateDone, st_boughtCreateError]);

  return <></>;
};

export default Middleware;
