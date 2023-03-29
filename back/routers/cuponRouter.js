const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const fs = require("fs");
const models = require("../models");

const router = express.Router();

/**
 * SUBJECT : 쿠폰 조회하기
 * PARAMETERS : title, sortType
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/29
 *
 *
 * sortType = 0 = 할인금액 오름차순
 * sortType = 1 = 할인금액 내림차순
 * sortType = 2 = 최소금액 오름차순
 * sortType = 3 = 최소금액 내림차순
 * sortType = 4 = 사용마감일 오름차순
 * sortType = 5 = 사용마감일 내림차순
 * sortType = 6 = 생성일 오름차순
 * sortType = 7 = 생성일 내림차순  = 기본값
 */
router.post("/list", async (req, res, next) => {
  const { title, sortType } = req.body;

  const _title = title ? title : "";
  const _sortType = sortType ? sortType : 7;

  const selectQ = `
    SELECT	id,
            cuponNumber,
            title,
            description,
            limitDate,
            minimunPay,
            discountPay,
            createdAt,
            DATE_FORMAT(createdAt, '%Y년 %m월 %d일')			AS viewCreatedAt,
            updatedAt,
            DATE_FORMAT(updatedAt, '%Y년 %m월 %d일')			AS viewUpdatedAt
      FROM	cupon
     WHERE	isDelete = 0
       AND	title LIKE "%${_title}%"
    ${parseInt(_sortType) === 0 ? `ORDER 	BY	discountPay ASC` : ""}
    ${parseInt(_sortType) === 1 ? `ORDER 	BY	discountPay DESC` : ""}
    ${parseInt(_sortType) === 2 ? `ORDER 	BY	minimunPay ASC` : ""}
    ${parseInt(_sortType) === 3 ? `ORDER 	BY	minimunPay DESC` : ""}
    ${parseInt(_sortType) === 4 ? `ORDER 	BY	limitDate ASC` : ""}
    ${parseInt(_sortType) === 5 ? `ORDER 	BY	limitDate DESC` : ""}
    ${parseInt(_sortType) === 6 ? `ORDER 	BY	createdAt ASC` : ""}
    ${parseInt(_sortType) === 7 ? `ORDER 	BY	createdAt DESC` : ""}
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).json("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 쿠폰 신규 등록하기
 * PARAMETERS : title, description, limitDate, minimunPay, discountPay
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/29
 * limiteDate는 "YYYY-MM-DD" 형식으로 보내주세요
 */

router.post("/new", isAdminCheck, async (req, res, next) => {
  const { title, description, limitDate, minimunPay, discountPay } = req.body;

  const D = new Date();

  const y = String(D.getFullYear());
  const m = String(D.getMonth() + 1);
  const d = String(D.getDate());

  const h = String(D.getHours());
  const mm = String(D.getMinutes());
  const s = String(D.getSeconds());
  const ms = String(D.getMilliseconds());

  const numb = ms + m + d + h + y + mm + s;

  const insertQ = `
  INSERT INTO cupon (cuponNumber, title, description, limitDate, minimunPay, discountPay, createdAt, updatedAt) VALUES (
	"${numb}", "${title}", "${description}", "${limitDate}", ${minimunPay}, ${discountPay}, NOW(), NOW()
);
  `;
  try {
    await models.sequelize.query(insertQ);

    return res.status(200).send({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 쿠폰 삭제하기
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/29
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQ = `
    UPDATE 	cupon 
       SET	isDelete = 1,
            deletedAt = NOW()
     WHERE	id = ${id}
    `;
  try {
    await models.sequelize.query(updateQ);

    return res.status(200).send({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

module.exports = router;
