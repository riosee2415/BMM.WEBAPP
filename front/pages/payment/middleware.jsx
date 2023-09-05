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
    // RESULTCODE
    // RESULTMSG
    // ORDERNO
    // AMOUNT
    // TID
    // ACCEPTDATE
    // ACCEPTNO
    // CASH_BILL_NO
    // CARDNAME
    // ACCOUNTNO
    // RECEIVERNAME
    // DEPOSITENDDATE
    // CARDCODE
    // QUOTA
    // ETC1
    // ETC2
    // ETC3
    // ETC4
    // ETC5
  }, []);

  useEffect(() => {
    if (router.query) {
      const bmmBoughtData = sessionStorage.getItem("bmm_boughtData")
        ? JSON.parse(sessionStorage.getItem("bmm_boughtData"))
        : null;

      console.log(bmmBoughtData);

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

  return (
    <>
      <form method="post">
        <input id="RESULTCODE" name="RESULTCODE" />
        <input id="RESULTMSG" name="RESULTMSG" />
        <input id="ORDERNO" name="ORDERNO" />
        <input id="AMOUNT" name="AMOUNT" />
        <input id="TID" name="TID" />
        <input id="ACCEPTDATE" name="ACCEPTDATE" />
        <input id="ACCEPTNO" name="ACCEPTNO" />
        <input id="CASH_BILL_NO" name="CASH_BILL_NO" />
        <input id="CARDNAME" name="CARDNAME" />
        <input id="ACCOUNTNO" name="ACCOUNTNO" />
        <input id="RECEIVERNAME" name="RECEIVERNAME" />
        <input id="DEPOSITENDDATE" name="DEPOSITENDDATE" />
        <input id="CARDCODE" name="CARDCODE" />
        <input id="QUOTA" name="QUOTA" />
        <input id="ETC1" name="ETC1" />
        <input id="ETC2" name="ETC2" />
        <input id="ETC3" name="ETC3" />
        <input id="ETC4" name="ETC4" />
        <input id="ETC5" name="ETC5" />
      </form>
    </>
  );
};

export default Middleware;
