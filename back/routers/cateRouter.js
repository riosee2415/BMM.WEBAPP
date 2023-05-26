const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const fs = require("fs");
const models = require("../models");

const router = express.Router();

/**
 * SUBJECT : 1-2뎁스 카테고리 한번에 가져오기
 * PARAMETERS :
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/30
 * 꼭 SSR에서만 사용해주세요. CSR 사용 금지!
 *
 */
router.post("/all", async (req, res, next) => {
  const selectQ1 = `
  SELECT	id,
            value
    FROM	cateUp
   WHERE	isDelete = 0
   ORDER	BY	value ASC`;

  const selectQ2 = `
  SELECT    id,
            value,
            CateUpId
    FROM	cateDown
   WHERE    isDelete = 0
   ORDER    BY	value ASC
  `;

  try {
    const upList = await models.sequelize.query(selectQ1);
    const downList = await models.sequelize.query(selectQ2);

    upList[0].map((item) => {
      item["sub"] = [];

      downList[0].map((inItem) => {
        if (parseInt(item.id) === parseInt(inItem.CateUpId)) {
          item["sub"].push({
            id: inItem.id,
            value: inItem.value,
          });
        }
      });
    });

    return res.status(200).json(upList[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 1뎁스 카테고리 등록하기
 * PARAMETERS : value
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/30
 *
 */
router.post("/up/new", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;

  const insertQ = `
        INSERT INTO cateUp (value, createdAt, updatedAt) VALUES (
            "${value}", NOW(), NOW()
        )
    `;

  try {
    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);

    if (error.errors[0].type === "unique violation") {
      return res.status(400).send("이미 존재하는 카테고리 입니다.");
    } else {
      return res.status(400).send("잠시 후 다시 시도해주세요.");
    }
  }
});

/**
 * SUBJECT : 1뎁스 카테고리 데이터 가져오기
 * PARAMETERS : value
 * ORDER BY : 이름 순 오름차순 정렬
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/30
 *
 */
router.post("/up/list", async (req, res, next) => {
  const { value } = req.body;

  const _value = value ? value : "";

  const selectQ = `
    SELECT	ROW_NUMBER() OVER(ORDER BY value ASC)	AS num,
            id,
            value,
            createdAt,
            updatedAt,
            DATE_FORMAT(createdAt, '%Y년 %m월 %d일')			AS viewCreatedAt,
            DATE_FORMAT(updatedAt , '%Y년 %m월 %d일')			AS viewUpdatedAt
     FROM	cateUp
    WHERE	value LIKE "%${_value}%"
      AND   isDelete = 0
    ORDER	BY	value ASC
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 1뎁스 카테고리 수정하기
 * PARAMETERS : id, value
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/30
 *
 */
router.post("/up/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const updateQ = `
         UPDATE cateUp
            SET value = "${value}",
                updatedAt = NOW()
          WHERE id = ${id}
      `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 1뎁스 카테고리 삭제하기
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/30
 *
 */
router.post("/up/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQ = `
           UPDATE cateUp
              SET isDelete = 1,
                  deletedAt = NOW()
            WHERE id = ${id}
        `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 2뎁스 카테고리 등록하기
 * PARAMETERS :
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/30
 *
 */
router.post("/down/new", isAdminCheck, async (req, res, next) => {
  const { value, CateUpId } = req.body;

  const exQ = `
    SELECT  id
      FROM  cateUp
     WHERE  id = ${CateUpId}
  `;

  const insertQ = `
          INSERT INTO cateDown (value, CateUpId, createdAt, updatedAt) VALUES (
              "${value}", ${CateUpId}, NOW(), NOW()
          )
      `;

  try {
    const list = await models.sequelize.query(exQ);

    if (list[0].length < 1) {
      return res.status(400).send("존재하지 않는 상위 카테고리 입니다.");
    }

    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 2뎁스 카테고리 데이터 가져오기
 * PARAMETERS : value, CateUpId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/30
 *
 */
router.post("/down/list", async (req, res, next) => {
  const { value, CateUpId } = req.body;

  const _value = value ? value : "";

  const selectQ = `
      SELECT  ROW_NUMBER() OVER(ORDER BY value ASC)	AS num,
              id,
              value,
              createdAt,
              updatedAt,
              DATE_FORMAT(createdAt, '%Y년 %m월 %d일')			AS viewCreatedAt,
              DATE_FORMAT(updatedAt , '%Y년 %m월 %d일')			AS viewUpdatedAt
       FROM	  cateDown
      WHERE	  value LIKE "%${_value}%"
        AND   isDelete = 0
        AND   CateUpId = ${CateUpId}
      ORDER	BY	value ASC
      `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 2뎁스 카테고리 수정하기
 * PARAMETERS :
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/30
 *
 */
router.post("/down/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const updateQ = `
           UPDATE cateDown
              SET value = "${value}",
                  updatedAt = NOW()
            WHERE id = ${id}
        `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 2뎁스 카테고리 삭제하기
 * PARAMETERS :
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 윤상호
 * DEV DATE : 2023/03/30
 *
 */
router.post("/down/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQ = `
             UPDATE cateDown
                SET isDelete = 1,
                    deletedAt = NOW()
              WHERE id = ${id}
          `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

module.exports = router;
