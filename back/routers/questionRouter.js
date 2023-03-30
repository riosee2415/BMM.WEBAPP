const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const models = require("../models");

const router = express.Router();

/**
 * SUBJECT : 1대1문의 목록
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/30
 */
router.post("/list", async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const lengthQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
          A.id,
          A.userLoginId,
          A.username,
          A.title,
          A.content,
          A.isCompleted,
          A.completedAt,
          DATE_FORMAT(A.completedAt, "%Y년 %m월 %d일")    AS viewCompletedAt,
          A.answer,
          A.answerdAt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")      AS viewAnswerdAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")      AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")       AS viewUpdatedAt
    FROM  questions   A
   WHERE  1 = 1
  `;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
          A.id,
          A.userLoginId,
          A.username,
          A.title,
          A.content,
          A.isCompleted,
          A.completedAt,
          DATE_FORMAT(A.completedAt, "%Y년 %m월 %d일")    AS viewCompletedAt,
          A.answer,
          A.answerdAt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")      AS viewAnswerdAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")      AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")       AS viewUpdatedAt
    FROM  questions   A
   WHERE  1 = 1
   ORDER  BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const questions = await models.sequelize.query(selectQuery);

    const questionsLen = lengths[0].length;

    const lastPage =
      questionsLen % LIMIT > 0
        ? questionsLen / LIMIT + 1
        : questionsLen / LIMIT;

    return res.status(200).json({
      questions: questions[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 나의 1대1문의 목록
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/27
 */
router.post("/my/list", async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const lengthQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
          A.id,
          A.userLoginId,
          A.username,
          A.title,
          A.content,
          A.isCompleted,
          A.completedAt,
          DATE_FORMAT(A.completedAt, "%Y년 %m월 %d일")    AS viewCompletedAt,
          A.answer,
          A.answerdAt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")      AS viewAnswerdAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")      AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")       AS viewUpdatedAt
    FROM  questions   A
   WHERE  1 = 1
     AND  A.UserId = ${req.user.id}
  `;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
          A.id,
          A.userLoginId,
          A.username,
          A.title,
          A.content,
          A.isCompleted,
          A.completedAt,
          DATE_FORMAT(A.completedAt, "%Y년 %m월 %d일")    AS viewCompletedAt,
          A.answer,
          A.answerdAt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")      AS viewAnswerdAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")      AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")       AS viewUpdatedAt
    FROM  questions   A
   WHERE  1 = 1
     AND  A.UserId = ${req.user.id}
   ORDER  BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const questions = await models.sequelize.query(selectQuery);

    const questionsLen = lengths[0].length;

    const lastPage =
      questionsLen % LIMIT > 0
        ? questionsLen / LIMIT + 1
        : questionsLen / LIMIT;

    return res.status(200).json({
      questions: questions[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 1대1문의 목록
 * PARAMETERS : userLoginId, username, title, findType
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/27
 */
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { userLoginId, username, title, findType } = req.body;

  const _userLoginId = userLoginId ? userLoginId : ``;
  const _username = username ? username : ``;
  const _title = title ? title : ``;

  const _findType = parseInt(findType) || 3;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
          A.id,
          A.userLoginId,
          A.username,
          A.title,
          A.content,
          A.isCompleted,
          A.completedAt,
          DATE_FORMAT(A.completedAt, "%Y년 %m월 %d일")    AS viewCompletedAt,
          A.answer,
          A.answerdAt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")      AS viewAnswerdAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")      AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")       AS viewUpdatedAt
    FROM  questions   A
   WHERE  1 = 1
     AND  A.userLoginId LIKE "%${_userLoginId}%"
     AND  A.username LIKE "%${_username}%"
     AND  A.title LIKE "%${_title}%"
          ${
            _findType === 1
              ? `AND A.isCompleted = 0`
              : _findType === 2
              ? `AND A.isCompleted = 1`
              : _findType === 3
              ? ``
              : ``
          }
   ORDER  BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 1대1문의 상세조회
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/30
 */
router.post("/detail", async (req, res, next) => {
  const { id } = req.body;

  const selectQuery = `
  SELECT  A.id,
          A.userLoginId,
          A.username,
          A.title,
          A.content,
          A.isCompleted,
          A.completedAt,
          DATE_FORMAT(A.completedAt, "%Y년 %m월 %d일")    AS viewCompletedAt,
          A.answer,
          A.answerdAt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")      AS viewAnswerdAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")      AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")       AS viewUpdatedAt
    FROM  questions   A
   WHERE  1 = 1
     AND  A.id = ${id}
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    if (list[0].length === 0) {
      return res.status(401).send("존재하지 않는 1대1문의 정보입니다.");
    }

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 1대1문의 등록
 * PARAMETERS : userLoginId, username, title, content
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/27
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
  const { userLoginId, username, title, content } = req.body;

  const insertQuery = `
  INSERT  INTO  questions
  (
    userLoginId,
    username,
    title,
    content,
    UserId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "${userLoginId}",
    "${username}",
    "${title}",
    "${content}",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의를 작성할 수 없습니다.");
  }
});

/**
 * SUBJECT : 1대1문의 등록
 * PARAMETERS : id, answer
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/27
 */
router.post("/answer", isAdminCheck, async (req, res, next) => {
  const { id, title, answer } = req.body;

  const updateQuery = `
  UPDATE  questions
     SET  isCompleted = 1,
          completedAt = NOW(),
          answer = "${answer}",
          answerdAt = NOW()
   WHERE  id = ${id}
  `;

  const historyInsertQuery = `
    INSERT  INTO    questionHistory
    (
        content,
        value,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "답변 작성",
        "${title}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 답변을 작성/수정 할 수 없습니다.");
  }
});

/**
 * SUBJECT : 문의 관리 이력
 * PARAMETERS : datePick
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/27
 */
router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.content,
            A.value,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	questionHistory		A
     INNER
      JOIN	users 			      B
        ON	A.updator = B.id  
     WHERE  1=1
      ${
        _datePick
          ? `AND  DATE_FORMAT(A.createdAt, "%Y%m%d") = DATE_FORMAT("${datePick}", "%Y%m%d")`
          : ""
      }
     ORDER  BY  A.createdAt  DESC
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
