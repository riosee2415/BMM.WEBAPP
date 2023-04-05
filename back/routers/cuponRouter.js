const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const fs = require("fs");
const models = require("../models");

// 쿠폰은 이미 지급되었거나 사용되었을 수 있기 때문에
// 정보를 수정하는 것은 불가능합니다.

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
            DATE_FORMAT(limitDate, '%Y년 %m월 %d일')			AS viewLimitDate,
            minimunPay,
            CONCAT(FORMAT(minimunPay, 0), "원")		       AS concatMinimunPay,
            discountPay,
            CONCAT(FORMAT(discountPay, 0), "원")		     AS concatDiscountPay,
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

/**
 * SUBJECT : 사용자에게 쿠폰 부여하기
 * PARAMETERS : UserId, CuponId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/29
 */
router.post("/grant", isAdminCheck, async (req, res, next) => {
  const { UserId, CuponId } = req.body;

  // 이미 부여받아 사용한 쿠폰은 다시 부여할 수 없다 -> false
  // 이미 부여받아 사용한 쿠폰은 다시 부여할 수 있다 -> true
  let reFlag = false;

  let exQ = `
        SELECT	id
          FROM	cuponuser
         WHERE	UserId = ${UserId}
           AND	CuponId = ${CuponId}
    `;

  if (reFlag) {
    exQ += `AND  isUse = 0`;
  }

  try {
    const ex = await models.sequelize.query(exQ);

    if (ex[0].length > 0) {
      return res.status(400).send("이미 등록된 쿠폰 입니다.");
    }

    const insertQ = `
        INSERT INTO cuponuser (createdAt, updatedAt, UserId, CuponId) VALUES (
            NOW(), NOW(), ${UserId}, ${CuponId}
        )
    `;

    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 타겟 쿠폰 조회하기 (default 내 쿠폰 조회)
 * PARAMETERS : UserId || null, type
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/29
 *
 * type = 0 = 전체
 * type = 1 = 사용 가능
 * type = 2 = 이미 사용함
 */
router.post("/search", async (req, res, next) => {
  const { UserId, type } = req.body;

  const _UserId = UserId ? UserId : req.user.id;
  const _type = type ? type : 0;

  let selectQ = `
  SELECT	A.id,
            A.isUse,
            A.createdAt,
            DATE_FORMAT(A.createdAt, '%Y년 %m월 %d일')			AS viewCreatedAt,
            A.CuponId,
            A.usedAt,
            DATE_FORMAT(A.usedAt, '%Y년 %m월 %d일')			AS viewUsedAt,
            B.title,
            B.cuponNumber,
            B.limitDate,
            B.minimunPay,
            B.discountPay
    FROM	cuponuser 	A
   INNER
    JOIN	cupon 		B
      ON	A.CuponId = B.id
   WHERE	A.UserId = ${_UserId}
  `;

  if (parseInt(_type) === 0) {
  }

  if (parseInt(_type) === 1) {
    selectQ += `AND  A.isUse = 0`;
  }

  if (parseInt(_type) === 2) {
    selectQ += `AND  A.isUse = 1`;
  }

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 쿠폰 사용하기
 * PARAMETERS : CuponId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/29
 *
 */
router.post("/use", async (req, res, next) => {
  const { CuponId } = req.body;

  let exQ = `
    SELECT	id
      FROM	cuponuser
     WHERE	UserId = ${req.user.id}
       AND	CuponId = ${CuponId}
`;

  try {
    const ex = await models.sequelize.query(exQ);

    if (ex[0].length < 1) {
      return res.status(400).send("쿠폰을 조회할 수 없습니다.");
    }

    if (ex[0][0].isUse !== 0) {
      return res.status(400).send("이미 사용한 쿠폰 입니다.");
    }

    const updateQ = `
    UPDATE	cuponuser
       SET	isUse = 1,
            usedAt = NOW()
     WHERE	UserId = ${req.user.id}
       AND	CuponId = ${CuponId}
    `;

    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 쿠폰 번호로 쿠폰 등록하기
 * PARAMETERS : cuponNumber
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/29
 *
 */
router.post("/regist", async (req, res, next) => {
  const { cuponNumber } = req.body;

  const exQ = `
  SELECT	id,
            title
    FROM	cupon
   WHERE	cuponNumber = "${cuponNumber}";
  `;

  try {
    const ex = await models.sequelize.query(exQ);

    if (ex[0].length < 1) {
      return res.status(400).send("존재하지 않는 쿠폰번호 입니다.");
    }

    const cId = ex[0][0].id;

    const exQ2 = `
    SELECT	id
      FROM	cuponuser
     WHERE	UserId = ${req.user.id}
       AND	CuponId = ${cId}
`;

    const ex2 = await models.sequelize.query(exQ2);

    if (ex2[0].length > 0) {
      return res.status(400).send("이미 등록된 쿠폰 입니다.");
    }

    const insertQ = `
    INSERT INTO cuponuser (createdAt, updatedAt, UserId, CuponId) VALUES (
        NOW(), NOW(), ${req.user.id}, ${cId}
    )
`;

    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

module.exports = router;
