const express = require("express");
const models = require("../models");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const isAdminCheck = require("../middlewares/isAdminCheck");

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
 * SUBJECT : 메인 이미지 이미지등록
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/27
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
 * SUBJECT : 메인 이미지 목록
 * PARAMETERS :
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/27
 */
router.post("/list", async (req, res, next) => {
  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)     AS num,
            A.id,
            A.imagePath,
            A.link,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
            B.username                                      AS updator
    FROM    mainImage               A
    LEFT
   OUTER
    JOIN    users                   B
      ON    A.updator = B.id
   WHERE    1 = 1
   ORDER    BY num DESC 
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("메인 이미지 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 메인 이미지 등록
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/27
 */
router.post("/create", isAdminCheck, async (req, res, next) => {
  const insertQuery = `
    INSERT  INTO   mainImage
    (
        imagePath,
        link,
        updator,
        createdAt,
        updatedAt
    ) 
    VALUES
    (
        "http://via.placeholder.com/620x260",
        "/",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  const historyInsertQuery = `
    INSERT  INTO    mainImageHistory
    (
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "데이터 생성",
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
    return res.status(401).send("메인 이미지를 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 메인 이미지 수정
 * PARAMETERS : id,
                imagePath,
                link
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/27
 */
router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, imagePath, link } = req.body;

  const updateQuery = `
  UPDATE    mainImage
     SET    imagePath = "${imagePath}",
            link = "${link}",
            updator = ${req.user.id},
            updatedAt = NOW()
   WHERE    id = ${id}
  `;

  const historyInsertQuery = `
    INSERT  INTO    mainImageHistory
    (
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "데이터 수정",
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
    return res.status(401).send("메인 이미지를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 메인 이미지 삭제
 * PARAMETERS : id,
                name
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/27
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const deleteQuery = `
  DELETE
    FROM    mainImage
   WHERE    id = ${id}
  `;

  const historyInsertQuery = `
    INSERT  INTO    mainImageHistory
    (
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "데이터 삭제",
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
    return res.status(401).send("메인 이미지를 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 메인 이미지 관리 이력
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
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	mainImageHistory		A
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
