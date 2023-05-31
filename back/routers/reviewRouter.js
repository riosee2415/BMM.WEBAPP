const express = require("express");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const fs = require("fs");
const multer = require("multer");

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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * SUBJECT : 리뷰 이미지
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/31
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
 * SUBJECT : 상품 별 리뷰 리스트
 * PARAMETERS : page, ProductId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/03
 */
router.post("/product/list", async (req, res, next) => {
  const { page, ProductId } = req.body;

  const LIMIT = 5;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 5;

  const lengthQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)  AS num,
            A.id,
            A.content,
            A.isImageReview,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d")         AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y.%m.%d")         AS viewUpdatedAt,
            A.ProductId,
            A.UserId,
            B.userId                                     AS userLoginId,
            B.username
    FROM    review          A
   INNER
    JOIN    users           B
      ON    A.UserId = B.id
   WHERE    A.isDelete = 0
     AND    A.ProductId = ${ProductId}
   ORDER    BY num DESC
  `;

  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)  AS num,
            A.id,
            A.content,
            A.isImageReview,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d")         AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y.%m.%d")         AS viewUpdatedAt,
            A.ProductId,
            A.UserId,
            B.userId                                     AS userLoginId,
            B.username
    FROM    review          A
   INNER
    JOIN    users           B
      ON    A.UserId = B.id
   WHERE    A.isDelete = 0
     AND    A.ProductId = ${ProductId}
   ORDER    BY num DESC
   LIMIT    ${LIMIT}
  OFFSET    ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const review = await models.sequelize.query(selectQuery);

    const reviewLen = lengths[0].length;

    const lastPage =
      reviewLen % LIMIT > 0 ? reviewLen / LIMIT + 1 : reviewLen / LIMIT;

    return res.status(200).json({
      reviews: review[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("리뷰 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 자신이 작성한 리뷰 리스트
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/03
 */
router.post("/my/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const lengthQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)  AS num,
            A.id,
            A.content,
            A.isImageReview,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d")         AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y.%m.%d")         AS viewUpdatedAt,
            A.ProductId,
            A.UserId,
            B.userId                                     AS userLoginId,
            B.username
    FROM    review          A
   INNER
    JOIN    users           B
      ON    A.UserId = B.id
   WHERE    A.isDelete = 0
     AND    A.UserId = ${req.user.id}
   ORDER    BY num DESC
  `;

  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)  AS num,
            A.id,
            A.content,
            A.isImageReview,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d")         AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y.%m.%d")         AS viewUpdatedAt,
            A.ProductId,
            A.UserId,
            B.userId                                     AS userLoginId,
            B.username
    FROM    review          A
   INNER
    JOIN    users           B
      ON    A.UserId = B.id
   WHERE    A.isDelete = 0
     AND    A.UserId = ${req.user.id}
   ORDER    BY num DESC
   LIMIT    ${LIMIT}
  OFFSET    ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const review = await models.sequelize.query(selectQuery);

    const reviewLen = lengths[0].length;

    const lastPage =
      reviewLen % LIMIT > 0 ? reviewLen / LIMIT + 1 : reviewLen / LIMIT;

    return res.status(200).json({
      reviews: review[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("리뷰 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 관리자 리뷰 리스트
 * PARAMETERS : ProductId, username
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/03
 */
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { ProductId, username } = req.body;

  const _ProductId = parseInt(ProductId) || false;
  const _username = username ? username : ``;

  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)  AS num,
            A.id,
            A.content,
            A.isImageReview,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")         AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")         AS viewUpdatedAt,
            A.ProductId,
            A.UserId,
            B.userId                                     AS userLoginId,
            B.username
    FROM    review          A
   INNER
    JOIN    users           B
      ON    A.UserId = B.id
   WHERE    A.isDelete = 0
            ${_ProductId ? `AND A.ProductId = ${_ProductId}` : ``}
            ${_username !== `` ? `AND B.username LIKE "%${_username}%"` : ``}
   ORDER    BY num DESC
  `;

  try {
    const review = await models.sequelize.query(selectQuery);

    return res.status(200).json(review[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("리뷰 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 리뷰 작성
 * PARAMETERS : content,
                isImageReview,
                imagePath1,
                imagePath2,
                imagePath3,
                imagePath4,
                ProductId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/03
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
  const {
    content,
    isImageReview,
    imagePath1,
    imagePath2,
    imagePath3,
    imagePath4,
    ProductId,
  } = req.body;

  const insertQuery = `
  INSERT    INTO    review
  (
    content,
    isImageReview,
    imagePath1,
    imagePath2,
    imagePath3,
    imagePath4,
    ProductId,
    UserId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "${content}",
    ${isImageReview},
    ${imagePath1 ? `"${imagePath1}"` : null},
    ${imagePath2 ? `"${imagePath2}"` : null},
    ${imagePath3 ? `"${imagePath3}"` : null},
    ${imagePath4 ? `"${imagePath4}"` : null},
    ${ProductId},
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);

    if (isImageReview) {
      // 사진 리뷰 일 때
      return res.status(201).json({ result: true });
    } else {
      // 글 리뷰 일 때
      return res.status(201).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("리뷰를 작성할 수 없습니다.");
  }
});

/**
 * SUBJECT : 리뷰 수정
 * PARAMETERS : id, 
                content,
                imagePath1,
                imagePath2,
                imagePath3,
                imagePath4
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/03
 */
router.post("/update", isLoggedIn, async (req, res, next) => {
  const { id, content, imagePath1, imagePath2, imagePath3, imagePath4 } =
    req.body;

  const selectQuery = `
  SELECT    UserId,
            isDelete
    FROM    review
   WHERE    id = ${id}
  `;

  const updateQuery = `
  UPDATE    review
     SET    "${content}",
            ${imagePath1 ? `"${imagePath1}"` : null},
            ${imagePath2 ? `"${imagePath2}"` : null},
            ${imagePath3 ? `"${imagePath3}"` : null},
            ${imagePath4 ? `"${imagePath4}"` : null},
            updatedAt = NOW()
   WHERE    id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(selectQuery);

    if (findResult[0].length === 0) {
      return res.status(401).send("존재하지 않는 리뷰 정보입니다.");
    }

    if (findResult[0][0].isDelete) {
      return res.status(401).send("이미 삭제된 리뷰입니다.");
    }

    if (findResult[0][0].UserId !== req.user.id) {
      return res.status(401).send("자신이 작성한 리뷰만 수정할 수 있습니다.");
    }

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("리뷰를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 리뷰 삭제
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/04/03
 */
router.post("/delete", isLoggedIn, async (req, res, next) => {
  const { id } = req.body;

  const selectQuery = `
  SELECT    UserId,
            isDelete
    FROM    review
   WHERE    id = ${id}
  `;

  const deleteQuery = `
  UPDATE    review
     SET    isDelete = 1,
            deletedAt = NOW()
   WHERE    id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(selectQuery);

    if (findResult[0].length === 0) {
      return res.status(401).send("존재하지 않는 리뷰 정보입니다.");
    }

    if (findResult[0][0].isDelete) {
      return res.status(401).send("이미 삭제된 리뷰입니다.");
    }

    if (findResult[0][0].UserId !== req.user.id) {
      return res.status(401).send("자신이 작성한 리뷰만 삭제할 수 있습니다.");
    }

    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("리뷰를 삭제할 수 없습니다.");
  }
});

module.exports = router;
