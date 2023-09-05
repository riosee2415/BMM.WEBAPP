const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

/**
 * SUBJECT : 포인트 이력
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/13
 */
router.post("/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const lengthQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt) AS num,
          A.id,
          A.type,
          A.content,
          A.price,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(A.createdAt, "%Y.%m.%d")      AS viewFrontCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt
    FROM  point   A
   WHERE  A.UserId = ${req.user.id}
  `;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt) AS num,
          A.id,
          A.type,
          A.content,
          A.price,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(A.createdAt, "%Y.%m.%d")      AS viewFrontCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt
    FROM  point   A
   WHERE  A.UserId = ${req.user.id}
   ORDER  BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const point = await models.sequelize.query(selectQuery);

    const pointLen = lengths[0].length;

    const lastPage =
      pointLen % LIMIT > 0 ? pointLen / LIMIT + 1 : pointLen / LIMIT;

    return res.status(200).json({
      point: point[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("포인트 이력을 조회할 수 없습니다.");
  }
});

module.exports = router;
