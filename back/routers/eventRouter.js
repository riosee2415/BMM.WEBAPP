const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log(
    "uploads 폴더가 존재하지 않습니다. 새로 uploads 폴더를 생성합니다."
  );
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/**
 * SUBJECT : 이벤트 이미지
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/02
 */
router.post("/image", isAdminCheck, async (req, res, next) => {
  const uploadImage = upload.single("image");

  await uploadImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(401).send("첨부 가능한 용량을 초과했습니다.");
    } else if (err) {
      return res.status(401).send("업로드 중 문제가 발생했습니다.");
    }

    return res.json({
      path: req.file.location,
    });
  });
});

/**
 * SUBJECT : 이벤트 게시글 목록
 * PARAMETERS : page, searchTitle
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/02
 */
router.post("/list", async (req, res, next) => {
  const { page, searchTitle } = req.body;

  const LIMIT = 8;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 8;

  const _searchTitle = searchTitle ? searchTitle : ``;

  const lengthQuery = `
  SELECT    ROW_NUMBER()   OVER(ORDER  BY A.createdAt) AS num,
            A.id,
            A.thumbnail,
            A.title,
            A.content,
            A.imagePath,
            A.hit,
            A.startDate,
            A.endDate,
            DATE_FORMAT(A.startDate, "%Y년 %m월 %d일")    AS viewStartDate,
            DATE_FORMAT(A.endDate, "%Y년 %m월 %d일")      AS viewEndDate,
            CONCAT(DATE_FORMAT(A.startDate, "%Y.%m.%d"), " ~ ", DATE_FORMAT(A.endDate, "%Y.%m.%d")) viewEventDate,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")   AS viewCreatedAt,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d")       AS viewFrontCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")   AS viewUpdatedAt,
            B.username                                  AS updator
    FROM    event       A
    LEFT
   OUTER
    JOIN    users       B
      ON    A.updator = B.id
   WHERE    A.isDelete = 0
     AND    A.title LIKE "%${_searchTitle}%"
  `;

  const selectQuery = `
  SELECT    ROW_NUMBER()   OVER(ORDER  BY A.createdAt) AS num,
            A.id,
            A.thumbnail,
            A.title,
            A.content,
            A.imagePath,
            A.hit,
            A.startDate,
            A.endDate,
            DATE_FORMAT(A.startDate, "%Y년 %m월 %d일")    AS viewStartDate,
            DATE_FORMAT(A.endDate, "%Y년 %m월 %d일")      AS viewEndDate,
            CONCAT(DATE_FORMAT(A.startDate, "%Y.%m.%d"), " ~ ", DATE_FORMAT(A.endDate, "%Y.%m.%d")) viewEventDate,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")   AS viewCreatedAt,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d")       AS viewFrontCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")   AS viewUpdatedAt,
            B.username                                  AS updator
    FROM    event       A
    LEFT
   OUTER
    JOIN    users       B
      ON    A.updator = B.id
   WHERE    A.isDelete = 0
     AND    A.title LIKE "%${_searchTitle}%"
   ORDER    BY num DESC
   LIMIT    ${LIMIT}
  OFFSET    ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const event = await models.sequelize.query(selectQuery);

    const eventLen = lengths[0].length;

    const lastPage =
      eventLen % LIMIT > 0 ? eventLen / LIMIT + 1 : eventLen / LIMIT;

    return res.status(200).json({
      events: event[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("이벤트 게시글 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 이벤트 게시글 목록 (관리자)
 * PARAMETERS : searchTitle
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/02
 */
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { searchTitle } = req.body;

  const _searchTitle = searchTitle ? searchTitle : ``;

  const selectQuery = `
  SELECT    ROW_NUMBER()   OVER(ORDER  BY A.createdAt) AS num,
            A.id,
            A.thumbnail,
            A.title,
            A.content,
            A.imagePath,
            A.hit,
            A.startDate,
            A.endDate,
            DATE_FORMAT(A.startDate, "%Y년 %m월 %d일")    AS viewStartDate,
            DATE_FORMAT(A.endDate, "%Y년 %m월 %d일")      AS viewEndDate,
            CONCAT(DATE_FORMAT(A.startDate, "%Y.%m.%d"), " ~ ", DATE_FORMAT(A.endDate, "%Y.%m.%d")) viewEventDate,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")   AS viewCreatedAt,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d")       AS viewFrontCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")   AS viewUpdatedAt,
            B.username                                  AS updator
    FROM    event       A
    LEFT
   OUTER
    JOIN    users       B
      ON    A.updator = B.id
   WHERE    A.isDelete = 0
     AND    A.title LIKE "%${_searchTitle}%"
   ORDER    BY num DESC
  `;

  try {
    const events = await models.sequelize.query(selectQuery);

    return res.status(200).json(events[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("이벤트 게시글 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 이벤트 게시글 상세
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/02
 */
router.post("/detail", async (req, res, next) => {
  const { id } = req.body;

  const detailQuery = `
  SELECT    A.id,
            A.thumbnail,
            A.title,
            A.content,
            A.imagePath,
            A.hit,
            A.startDate,
            A.endDate,
            DATE_FORMAT(A.startDate, "%Y년 %m월 %d일")    AS viewStartDate,
            DATE_FORMAT(A.endDate, "%Y년 %m월 %d일")      AS viewEndDate,
            CONCAT(DATE_FORMAT(A.startDate, "%Y.%m.%d"), " ~ ", DATE_FORMAT(A.endDate, "%Y.%m.%d")) viewEventDate,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")   AS viewCreatedAt,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d")       AS viewFrontCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")   AS viewUpdatedAt,
            B.username                                  AS updator
    FROM    event       A
    LEFT
   OUTER
    JOIN    users       B
      ON    A.updator = B.id
   WHERE    A.isDelete = 0
     AND    A.id = ${id}
  `;

  try {
    const detailData = await models.sequelize.query(detailQuery);

    if (detailData[0].length === 0) {
      return res.status(401).send("존재하지 않는 이벤트 게시글입니다.");
    }

    const updateQuery = `
    UPDATE  event
       SET  hit = ${detailData[0][0].hit + 1}
     WHERE  id = ${id}
    `;

    await models.sequelize.query(updateQuery);

    return res.status(200).json(detailData[0][0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("이벤트 게시글 정보를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 이벤트 게시글 등록
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/02
 */
router.post("/create", isAdminCheck, async (req, res, next) => {
  const insertQuery = `
    INSERT  INTO    event
    (
        thumbnail,
        title,
        content,
        imagePath,
        startDate,
        endDate,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "http://via.placeholder.com/630x260",
        "임시 이벤트",
        "임시 이벤트입니다. 내용을 작성해주세요.",
        "http://via.placeholder.com/840x980",
        NOW(),
        DATE_ADD(NOW(), INTERVAL 7 DAY),
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  const historyInsertQuery = `
    INSERT  INTO    eventHistory
    (
        value,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "데이터 생성",
        "임시 이벤트",
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
    return res.status(401).send("이벤트 게시글을 생성할 수 없습니다.");
  }
});

/**
 * SUBJECT : 이벤트 게시글 수정
 * PARAMETERS : id, thumbnail, title, content, imagePath, startDate, endDate, updator
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/02
 */
router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, thumbnail, title, content, imagePath, startDate, endDate } =
    req.body;

  const updateQuery = `
    UPDATE  event
       SET  thumbnail = "${thumbnail}",
            title = "${title}",
            content = "${content}",
            imagePath = "${imagePath}",
            startDate = "${startDate}",
            endDate = "${endDate}",
            updator = ${req.user.id},
            updatedAt = NOW()
     WHERE  id = ${id}
    `;

  const historyInsertQuery = `
    INSERT  INTO    eventHistory
    (
        value,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "데이터 수정",
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
    return res.status(401).send("이벤트 게시글을 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 이벤트 게시글 삭제
 * PARAMETERS : id, title
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/02
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, title } = req.body;

  const deleteQuery = `
    UPDATE  event
       SET  isDelete = 1,
            deletedAt = NOW(),
            updator = ${req.user.id}
     WHERE  id = ${id}
    `;

  const historyInsertQuery = `
    INSERT  INTO    eventHistory
    (
        value,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "데이터 삭제",
        "${title}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;
  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("이벤트 게시글을 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 이벤트 이력 리스트
 * PARAMETERS : datePick
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/02/28
 */
router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
      SELECT 	A.id,
                A.value,
                A.content,
                B.username,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
        FROM 	eventHistory		A
       INNER
        JOIN	users 			    B
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
