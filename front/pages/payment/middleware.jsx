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
      const bmmBoughtData = sessionStorage.getItem("bmm_boughtData")
        ? JSON.parse(sessionStorage.getItem("bmm_boughtData"))
        : null;

      if (bmmBoughtData) {
        dispatch({
          type: BOUGHT_CREATE_REQUEST,
          data: bmmBoughtData,
        });
      }
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
      //   router.push("/");
      return message.error(st_boughtCreateError);
    }
  }, [st_boughtCreateDone, st_boughtCreateError]);

  return <></>;
};

export default Middleware;
