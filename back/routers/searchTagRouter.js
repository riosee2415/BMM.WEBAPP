const express = require("express");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

/**
 * SUBJECT : 검색태그 목록
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/list", async (req, res, next) => {
  const selectQuery = `
    SELECT  ROW_NUMBER()    OVER(ORDER  BY A.createdAt)     AS num,
            A.id,
            A.value,
            A.updator,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d")            AS viewFrontCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
            B.username                                      AS updator
      FROM  searchTag       A
      LEFT
     OUTER
      JOIN  users           B
        ON  A.updator = B.id
     WHERE  A.isDelete = 0
     ORDER  BY num DESC
    `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("검색 태그 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 검색태그 등록
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/create", isAdminCheck, async (req, res, next) => {
  const insertQuery = `
  INSERT    INTO    searchTag
  (
    value,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "임시 태그",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  const historyInsertQuery = `
  INSERT    INTO    searchTagHistory
  (
    title,
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "태그 데이터 생성",
    "임시 태그",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("검색 태그를 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 검색태그 수정
 * PARAMETERS : id, value
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const updateQuery = `
  UPDATE    searchTag
     SET    value = "${value}",
            updatedAt = NOW(),
            updator = ${req.user.id}
   WHERE    id = ${id}
  `;

  const historyInsertQuery = `
  INSERT    INTO    searchTagHistory
  (
    title,
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "태그 데이터 수정",
    "${value}",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("검색 태그를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 검색태그 삭제
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const deleteQuery = `
  UPDATE    searchTag
     SET    isDelete = 1,
            deletedAt = NOW(),
            updator = ${req.user.id}
   WHERE    id = ${id}
  `;

  const historyInsertQuery = `
  INSERT    INTO    searchTagHistory
  (
    title,
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "태그 데이터 삭제",
    "${value}",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("검색 태그를 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 관리 이력
 * PARAMETERS : datePick
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/02
 */
router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
        SELECT 	A.id,
                A.title,
                A.content,
                B.username,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
          FROM 	searchTagHistory		A
         INNER
          JOIN	users 			        B
            ON	A.updator = B.id
         WHERE    1 = 1
                  ${
                    _datePick
                      ? `AND  DATE_FORMAT(A.createdAt, "%Y%m%d") = DATE_FORMAT("${datePick}", "%Y%m%d")`
                      : ""
                  }
         ORDER    BY  A.createdAt  DESC
        `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 불러올 수 없습니다.");
  }
});
module.exports = router;
