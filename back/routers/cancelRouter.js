const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

/**
 * SUBJECT : 취소 / 환불 신청 리스트
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/05
 */
// router.post("/list", isLoggedIn, async (req, res, next) => {
//   const {} = req.body;
//   try {
//   } catch (error) {
//     console.error(error);
//     return res.status(401).send("취소 / 환불 신청 목록을 불러올 수 없습니다.");
//   }
// });

module.exports = router;
