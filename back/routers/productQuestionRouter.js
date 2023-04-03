const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const models = require("../models");

const router = express.Router();

/**
 * SUBJECT : 나의 상품문의 목록
 * PARAMETERS : page, searchProductName, listType
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/27
 */
router.post("/list", async (req, res, next) => {
  const { page, searchProductName, listType } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const _searchProductName = searchProductName ? searchProductName : ``;
  const _listType = parseInt(listType) || 3;

  try {
    const lengthQuery = `
    SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
            A.id,
            A.name,
            A.mobile,
            A.email,
            A.productName,
            A.productUrl,
            A.content,
            A.password,
            A.isCompleted,
            A.answer,
            A.answerdAt,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
            A.UserId
      FROM  productQuestions       A
     WHERE  1 = 1
       AND  A.productName LIKE "%${_searchProductName}%"
            ${
              _listType === 1
                ? `AND A.isCompleted = 1`
                : _listType === 2
                ? `AND A.isCompleted = 0`
                : _listType === 3
                ? ``
                : ``
            }
    `;

    const selectQuery = `
    SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
            A.id,
            A.name,
            A.mobile,
            A.email,
            A.productName,
            A.productUrl,
            A.content,
            A.password,
            A.isCompleted,
            A.answer,
            A.answerdAt,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
            A.UserId
      FROM  productQuestions       A
     WHERE  1 = 1
       AND  A.productName LIKE "%${_searchProductName}%"
            ${
              _listType === 1
                ? `AND A.isCompleted = 1`
                : _listType === 2
                ? `AND A.isCompleted = 0`
                : _listType === 3
                ? ``
                : ``
            }
     ORDER  BY num DESC
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
    `;

    const length = await models.sequelize.query(lengthQuery);
    const prodQue = await models.sequelize.query(selectQuery);

    const prodQueLen = length[0].length;

    const lastPage =
      prodQueLen % LIMIT > 0 ? prodQueLen / LIMIT + 1 : prodQueLen / LIMIT;

    return res.status(200).json({
      list: prodQue[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 나의 상품문의 목록
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/27
 */
router.post("/my/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const lengthQuery = `
      SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
              A.id,
              A.name,
              A.mobile,
              A.email,
              A.productName,
              A.productUrl,
              A.content,
              A.password,
              A.isCompleted,
              A.answer,
              A.answerdAt,
              A.createdAt,
              A.updatedAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
              A.UserId
        FROM  productQuestions       A
       WHERE  1 = 1
         AND  A.UserId = ${req.user.id}
    `;

    const selectQuery = `
    SELECT	ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
            A.id,
            A.name,
            A.mobile,
            A.email,
            A.productName,
            A.productUrl,
            A.content,
            A.password,
            A.isCompleted,
            A.answer,
            A.answerdAt,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
            A.UserId
      FROM	productQuestions       A
     WHERE  1 = 1
       AND  A.UserId = ${req.user.id}
     ORDER  BY num DESC
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
    `;

    const length = await models.sequelize.query(lengthQuery);
    const prodQue = await models.sequelize.query(selectQuery);

    const prodQueLen = length[0].length;

    const lastPage =
      prodQueLen % LIMIT > 0 ? prodQueLen / LIMIT + 1 : prodQueLen / LIMIT;

    return res.status(200).json({
      list: prodQue[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("목록을 불러올 수 없습니다.");
  }
});

// 상품문의 관리자 목록
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { listType, searchProductName, searchUserName } = req.body;

  const _listType = parseInt(listType) || 3;
  const _searchProductName = searchProductName ? searchProductName : ``;
  const _searchUserName = searchUserName ? searchUserName : ``;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
          A.id,
          A.name,
          A.mobile,
          A.email,
          A.productName,
          A.productUrl,
          A.content,
          A.password,
          A.isCompleted,
          A.answer,
          A.answerdAt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
          A.UserId,
          CASE
              WHEN  A.UserId IS NOT NULL THEN "회원 작성"
              ELSE  "비회원 작성"
          END                    AS questionType
    FROM  productQuestions       A
   WHERE  1 = 1
     AND  A.productName LIKE "%${_searchProductName}%"
     AND  A.name LIKE "%${_searchUserName}%"
          ${
            _listType === 1
              ? `AND A.isCompleted = 1`
              : _listType === 2
              ? `AND A.isCompleted = 0`
              : _listType === 3
              ? ``
              : ``
          }
   ORDER  BY num DESC
  `;

  try {
    const productQuestions = await models.sequelize.query(selectQuery);

    return res.status(200).json(productQuestions[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품문의 데이터를 가져올 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품문의 상세
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/28
 */
router.post("/detail", async (req, res, next) => {
  const { id } = req.body;

  const detailQuery = `
  SELECT  A.id,
          A.name,
          A.mobile,
          A.email,
          A.productName,
          A.productUrl,
          A.content,
          A.password,
          A.isCompleted,
          A.answer,
          A.answerdAt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
          A.UserId,
          CASE
              WHEN  A.UserId IS NOT NULL THEN "회원 작성"
              ELSE  "비회원 작성"
          END                    AS questionType
    FROM  productQuestions       A
   WHERE  1 = 1
     AND  A.id = ${id}
  `;

  try {
    const detailData = await models.sequelize.query(detailQuery);

    if (detailData[0].length === 0) {
      return res.status(401).send("존재하지 않는 게시글 정보입니다.");
    }

    return res.status(200).json(detailData[0][0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품문의 데이터를 가져올 수 없습니다.");
  }
});

// CREATE

router.post("/create", async (req, res, next) => {
  const { name, mobile, email, productName, productUrl, content, password } =
    req.body;

  try {
    if (req.user) {
      const insertQuery = `
  INSERT    INTO    productQuestions
  (
    name,
    mobile,
    email,
    productName,
    productUrl,
    content,
    password,
    UserId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "${name}",
    "${mobile}",
    "${email}",
    "${productName}",
    "${productUrl}",
    "${content}",
    "${password}",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

      await models.sequelize.query(insertQuery);

      return res.status(201).json({ result: true });
    }

    const insertQuery = `
 INSERT    INTO    productQuestions
 (
   name,
   mobile,
   email,
   productName,
   productUrl,
   content,
   password,
   UserId,
   createdAt,
   updatedAt
 )
 VALUES
 (
   "${name}",
   "${mobile}",
   "${email}",
   "${productName}",
   "${productUrl}",
   "${content}",
   "${password}",
   NULL,
   NOW(),
   NOW()
 )
 `;

    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 문의글을 작성할 수 없습니다.");
  }
});

//UPDATE

router.post("/answer/update", isAdminCheck, async (req, res, next) => {
  const { id, answer } = req.body;

  const selectQuery = `
    SELECT    id,
              answer
      FROM    productQuestions
     WHERE    id = ${id}
    `;

  const updateQuery = `
  UPDATE    productQuestions
     SET    isCompleted = 1,
            answer = "${answer}",
            answerdAt = NOW()
   WHERE    id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(selectQuery);

    if (findResult[0].length === 0) {
      return res.status(401).send("존재하지 않는 상품문의 정보입니다.");
    }

    if (findResult[0][0].isCompleted) {
      return res.status(401).send("이미 답변된 상품문의입니다.");
    }

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품문의에 답변할 수 없습니다.");
  }
});

module.exports = router;
