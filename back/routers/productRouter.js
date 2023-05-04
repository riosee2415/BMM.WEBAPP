const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");
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
 * SUBJECT : 상품 이미지
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

/**
 * SUBJECT : 상품 리스트
 * PARAMETERS : page, orderType, searchTitle, CateUpId, CateDownId, BrandId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/list", async (req, res, next) => {
  const { page, orderType, searchTitle, CateUpId, CateDownId, BrandId } =
    req.body;

  const LIMIT = 20;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 20;

  const _searchTitle = searchTitle ? searchTitle : ``;

  const _CateUpId = CateUpId ? CateUpId : false;
  const _CateDownId = CateDownId ? CateDownId : false;
  const _BrandId = BrandId ? BrandId : false;

  // orderType이 1이라면 오래된순
  // orderType이 2라면 최신순
  // detault = 2

  const _orderType = parseInt(orderType) || 2;

  const lengthQuery = `
  SELECT	ROW_NUMBER()	OVER(ORDER	BY	A.createdAt)														AS num,
          A.id,
          A.thumbnail1,
          A.thumbnail2,
          A.thumbnail3,
          A.thumbnail4,
          A.title,
          A.description,
          A.marketPrice,
          FORMAT(A.marketPrice, 0)																			AS formatMarketPrice,
          CONCAT(FORMAT(A.marketPrice, 0), "원")																AS concatMarketPrice,
          A.memberPrice,
          FORMAT(A.memberPrice, 0)																			AS formatMemberPrice,
          CONCAT(FORMAT(A.memberPrice, 0), "원")																AS concatMemberPrice,
          A.weight,
          CONCAT(A.weight, "Kg")																				AS concatWeight,
          A.buyMinLimitCount,
          A.buyMaxLimitCount,
          CONCAT("최소 ", A.buyMinLimitCount, "개 이상", " ~ ", "최대 ", A.buyMaxLimitCount, "개 이하 구매 가능")		AS viewBuyLimitCount,
          A.discount,
          CONCAT(A.discount, "%")																				AS viewDiscount,
          A.youtubeLink,
          A.detailImage,
          A.origin,
          A.madeCompany,
          A.location,
          A.howToUse,
          A.madeDate,
          A.howToKeep,
          A.tel,
          A.warning,
          A.canDeliveryArea,
          A.customInfo,
          A.refundInfo,
          A.isRecommend,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")															  AS viewCreatedAt,
          DATE_FORMAT(A.createdAt, "%Y.%m.%d")																AS viewFrontCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")															  AS viewUpdatedAt,
          A.CateUpId,
          A.CateDownId,
          A.BrandId,
          B.username																							AS updator,
          C.value 																							AS upCategoryValue,
          D.value 																							AS downCategoryValue,
          E.imagePath																							AS brandImage,
          E.name 																								AS brandName,
          E.subDesc 																							AS brandSubDesc
    FROM	product		A
    LEFT
   OUTER
    JOIN	users		B
      ON	A.updator = B.id
   INNER
    JOIN	cateUp 		C
      ON	A.CateUpId = C.id
   INNER
    JOIN	cateDown 	D
      ON	A.CateDownId = D.id
   INNER
    JOIN	brand 		E
      ON	A.BrandId = E.id
   WHERE	1 = 1
     AND	A.isDelete = 0
     AND    A.title LIKE "%${_searchTitle}%"
            ${_CateUpId ? `AND A.CateUpId = ${_CateUpId}` : ``}
            ${_CateDownId ? `AND A.CateDownId = ${_CateDownId}` : ``}
            ${_BrandId ? `AND A.BrandId = ${_BrandId}` : ``}
    `;

  const selectQuery = `
  SELECT	ROW_NUMBER()	OVER(ORDER	BY	A.createdAt)														AS num,
          A.id,
          A.thumbnail1,
          A.thumbnail2,
          A.thumbnail3,
          A.thumbnail4,
          A.title,
          A.description,
          A.marketPrice,
          FORMAT(A.marketPrice, 0)																			AS formatMarketPrice,
          CONCAT(FORMAT(A.marketPrice, 0), "원")																AS concatMarketPrice,
          A.memberPrice,
          FORMAT(A.memberPrice, 0)																			AS formatMemberPrice,
          CONCAT(FORMAT(A.memberPrice, 0), "원")																AS concatMemberPrice,
          A.weight,
          CONCAT(A.weight, "Kg")																				AS concatWeight,
          A.buyMinLimitCount,
          A.buyMaxLimitCount,
          CONCAT("최소 ", A.buyMinLimitCount, "개 이상", " ~ ", "최대 ", A.buyMaxLimitCount, "개 이하 구매 가능")		AS viewBuyLimitCount,
          A.discount,
          CONCAT(A.discount, "%")																				AS viewDiscount,
          A.youtubeLink,
          A.detailImage,
          A.origin,
          A.madeCompany,
          A.location,
          A.howToUse,
          A.madeDate,
          A.howToKeep,
          A.tel,
          A.warning,
          A.canDeliveryArea,
          A.customInfo,
          A.refundInfo,
          A.isRecommend,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")															  AS viewCreatedAt,
          DATE_FORMAT(A.createdAt, "%Y.%m.%d")																AS viewFrontCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")															  AS viewUpdatedAt,
          A.CateUpId,
          A.CateDownId,
          A.BrandId,
          B.username																							AS updator,
          C.value 																							AS upCategoryValue,
          D.value 																							AS downCategoryValue,
          E.imagePath																							AS brandImage,
          E.name 																								AS brandName,
          E.subDesc 																							AS brandSubDesc
    FROM	product		A
    LEFT
   OUTER
    JOIN	users		B
      ON	A.updator = B.id
   INNER
    JOIN	cateUp 		C
      ON	A.CateUpId = C.id
   INNER
    JOIN	cateDown 	D
      ON	A.CateDownId = D.id
   INNER
    JOIN	brand 		E
      ON	A.BrandId = E.id
   WHERE	1 = 1
     AND	A.isDelete = 0
     AND  A.title LIKE "%${_searchTitle}%"
          ${_CateUpId ? `AND A.CateUpId = ${_CateUpId}` : ``}
          ${_CateDownId ? `AND A.CateDownId = ${_CateDownId}` : ``}
          ${_BrandId ? `AND A.BrandId = ${_BrandId}` : ``}
   ORDER  BY num ${_orderType === 1 ? `ASC` : `DESC`}
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
    `;

  const optionQuery = `
 SELECT ROW_NUMBER()    OVER(ORDER  BY A.createdAt)     AS num,
        A.id,
        A.value,
        A.price,
        FORMAT(A.price, 0)                              AS formatPrice,
        CONCAT(FORMAT(A.price, 0), "원")                 AS concatPrice,
        A.ProductId,
        A.createdAt,
        A.updatedAt,
        DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,                
        DATE_FORMAT(A.createdAt, "%Y.%m.%d")            AS viewFrontCreatedAt,                
        DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
        B.username                                      AS updator           
   FROM productOption       A
   LEFT
  OUTER
   JOIN users               B
     ON A.updator = B.id
  WHERE A.isDelete = 0
  ORDER BY num DESC
 `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const product = await models.sequelize.query(selectQuery);

    const options = await models.sequelize.query(optionQuery);

    product[0].map((ele) => {
      ele["options"] = [];

      options[0].map((innerItem) => {
        if (parseInt(ele.id) === parseInt(innerItem.ProductId)) {
          ele.options.push(innerItem);
        }
      });
    });

    const productLen = lengths[0].length;

    const lastPage =
      productLen % LIMIT > 0 ? productLen / LIMIT + 1 : productLen / LIMIT;

    return res.status(200).json({
      product: product[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 추천 상품 리스트
 * PARAMETERS :  -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/recommend/list", async (req, res, next) => {
  const selectQuery = `
SELECT	ROW_NUMBER()	OVER(ORDER	BY	A.createdAt)														AS num,
        A.id,
        A.thumbnail1,
        A.thumbnail2,
        A.thumbnail3,
        A.thumbnail4,
        A.title,
        A.description,
        A.marketPrice,
        FORMAT(A.marketPrice, 0)																			AS formatMarketPrice,
        CONCAT(FORMAT(A.marketPrice, 0), "원")																AS concatMarketPrice,
        A.memberPrice,
        FORMAT(A.memberPrice, 0)																			AS formatMemberPrice,
        CONCAT(FORMAT(A.memberPrice, 0), "원")																AS concatMemberPrice,
        A.weight,
        CONCAT(A.weight, "Kg")																				AS concatWeight,
        A.buyMinLimitCount,
        A.buyMaxLimitCount,
        CONCAT("최소 ", A.buyMinLimitCount, "개 이상", " ~ ", "최대 ", A.buyMaxLimitCount, "개 이하 구매 가능")		AS viewBuyLimitCount,
        A.discount,
        CONCAT(A.discount, "%")																				AS viewDiscount,
        A.youtubeLink,
        A.detailImage,
        A.origin,
        A.madeCompany,
        A.location,
        A.howToUse,
        A.madeDate,
        A.howToKeep,
        A.tel,
        A.warning,
        A.canDeliveryArea,
        A.customInfo,
        A.refundInfo,
        A.isRecommend,
        A.createdAt,
        A.updatedAt,
        DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")															  AS viewCreatedAt,
        DATE_FORMAT(A.createdAt, "%Y.%m.%d")																AS viewFrontCreatedAt,
        DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")															  AS viewUpdatedAt,
        A.CateUpId,
        A.CateDownId,
        A.BrandId,
        B.username																							AS updator,
        C.value 																							AS upCategoryValue,
        D.value 																							AS downCategoryValue,
        E.imagePath																							AS brandImage,
        E.name 																								AS brandName,
        E.subDesc 																							AS brandSubDesc
  FROM	product		A
  LEFT
 OUTER
  JOIN	users		B
    ON	A.updator = B.id
 INNER
  JOIN	cateUp 		C
    ON	A.CateUpId = C.id
 INNER
  JOIN	cateDown 	D
    ON	A.CateDownId = D.id
 INNER
  JOIN	brand 		E
    ON	A.BrandId = E.id
 WHERE	1 = 1
   AND	A.isDelete = 0
   AND  A.isRecommend = 1
 ORDER  BY num DESC
  `;

  const optionQuery = `
 SELECT ROW_NUMBER()    OVER(ORDER  BY A.createdAt)     AS num,
        A.id,
        A.value,
        A.price,
        FORMAT(A.price, 0)                              AS formatPrice,
        CONCAT(FORMAT(A.price, 0), "원")                 AS concatPrice,
        A.ProductId,
        A.createdAt,
        A.updatedAt,
        DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,                
        DATE_FORMAT(A.createdAt, "%Y.%m.%d")            AS viewFrontCreatedAt,                
        DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
        B.username                                      AS updator           
   FROM productOption       A
   LEFT
  OUTER
   JOIN users               B
     ON A.updator = B.id
  WHERE A.isDelete = 0
  ORDER BY num DESC
 `;

  try {
    const product = await models.sequelize.query(selectQuery);
    const options = await models.sequelize.query(optionQuery);

    product[0].map((ele) => {
      ele["options"] = [];

      options[0].map((innerItem) => {
        if (parseInt(ele.id) === parseInt(innerItem.ProductId)) {
          ele.options.push(innerItem);
        }
      });
    });

    return res.status(200).json(product[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 관리자 상품 리스트
 * PARAMETERS :  searchTitle, CateUpId, CateDownId, BrandId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { searchTitle, CateUpId, CateDownId, BrandId } = req.body;

  const _searchTitle = searchTitle ? searchTitle : ``;

  const _CateUpId = CateUpId ? CateUpId : false;
  const _CateDownId = CateDownId ? CateDownId : false;
  const _BrandId = BrandId ? BrandId : false;

  const selectQuery = `
SELECT	ROW_NUMBER()	OVER(ORDER	BY	A.createdAt)														AS num,
        A.id,
        A.thumbnail1,
        A.thumbnail2,
        A.thumbnail3,
        A.thumbnail4,
        A.title,
        A.description,
        A.marketPrice,
        FORMAT(A.marketPrice, 0)																			AS formatMarketPrice,
        CONCAT(FORMAT(A.marketPrice, 0), "원")																AS concatMarketPrice,
        A.memberPrice,
        FORMAT(A.memberPrice, 0)																			AS formatMemberPrice,
        CONCAT(FORMAT(A.memberPrice, 0), "원")																AS concatMemberPrice,
        A.weight,
        CONCAT(A.weight, "Kg")																				AS concatWeight,
        A.buyMinLimitCount,
        A.buyMaxLimitCount,
        CONCAT("최소 ", A.buyMinLimitCount, "개 이상", " ~ ", "최대 ", A.buyMaxLimitCount, "개 이하 구매 가능")		AS viewBuyLimitCount,
        A.discount,
        CONCAT(A.discount, "%")																				AS viewDiscount,
        A.youtubeLink,
        A.detailImage,
        A.origin,
        A.madeCompany,
        A.location,
        A.howToUse,
        A.madeDate,
        A.howToKeep,
        A.tel,
        A.warning,
        A.canDeliveryArea,
        A.customInfo,
        A.refundInfo,
        A.isRecommend,
        A.createdAt,
        A.updatedAt,
        DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")															  AS viewCreatedAt,
        DATE_FORMAT(A.createdAt, "%Y.%m.%d")																AS viewFrontCreatedAt,
        DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")															  AS viewUpdatedAt,
        A.CateUpId,
        A.CateDownId,
        A.BrandId,
        B.username																							AS updator,
        C.value 																							AS upCategoryValue,
        D.value 																							AS downCategoryValue,
        E.imagePath																							AS brandImage,
        E.name 																								AS brandName,
        E.subDesc 																							AS brandSubDesc
  FROM	product		A
  LEFT
 OUTER
  JOIN	users		B
    ON	A.updator = B.id
 INNER
  JOIN	cateUp 		C
    ON	A.CateUpId = C.id
 INNER
  JOIN	cateDown 	D
    ON	A.CateDownId = D.id
 INNER
  JOIN	brand 		E
    ON	A.BrandId = E.id
 WHERE	1 = 1
   AND	A.isDelete = 0
   AND  A.title LIKE "%${_searchTitle}%"
        ${_CateUpId ? `AND A.CateUpId = ${_CateUpId}` : ``}
        ${_CateDownId ? `AND A.CateDownId = ${_CateDownId}` : ``}
        ${_BrandId ? `AND A.BrandId = ${_BrandId}` : ``}
 ORDER  BY num DESC
  `;

  const optionQuery = `
 SELECT ROW_NUMBER()    OVER(ORDER  BY A.createdAt)     AS num,
        A.id,
        A.value,
        A.price,
        FORMAT(A.price, 0)                              AS formatPrice,
        CONCAT(FORMAT(A.price, 0), "원")                 AS concatPrice,
        A.ProductId,
        A.createdAt,
        A.updatedAt,
        DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,                
        DATE_FORMAT(A.createdAt, "%Y.%m.%d")            AS viewFrontCreatedAt,                
        DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
        B.username                                      AS updator           
   FROM productOption       A
   LEFT
  OUTER
   JOIN users               B
     ON A.updator = B.id
  WHERE A.isDelete = 0
  ORDER BY num DESC
 `;

  try {
    const product = await models.sequelize.query(selectQuery);
    const options = await models.sequelize.query(optionQuery);

    product[0].map((ele) => {
      ele["options"] = [];

      options[0].map((innerItem) => {
        if (parseInt(ele.id) === parseInt(innerItem.ProductId)) {
          ele.options.push(innerItem);
        }
      });
    });

    return res.status(200).json(product[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 상세정보
 * PARAMETERS :  ProductId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/detail", async (req, res, next) => {
  const { ProductId } = req.body;

  const deleteQuery = `
SELECT	A.id,
        A.thumbnail1,
        A.thumbnail2,
        A.thumbnail3,
        A.thumbnail4,
        A.title,
        A.description,
        A.marketPrice,
        FORMAT(A.marketPrice, 0)																			AS formatMarketPrice,
        CONCAT(FORMAT(A.marketPrice, 0), "원")																AS concatMarketPrice,
        A.memberPrice,
        FORMAT(A.memberPrice, 0)																			AS formatMemberPrice,
        CONCAT(FORMAT(A.memberPrice, 0), "원")																AS concatMemberPrice,
        A.weight,
        CONCAT(A.weight, "Kg")																				AS concatWeight,
        A.buyMinLimitCount,
        A.buyMaxLimitCount,
        CONCAT("최소 ", A.buyMinLimitCount, "개 이상", " ~ ", "최대 ", A.buyMaxLimitCount, "개 이하 구매 가능")		AS viewBuyLimitCount,
        A.discount,
        CONCAT(A.discount, "%")																				AS viewDiscount,
        A.youtubeLink,
        A.detailImage,
        A.origin,
        A.madeCompany,
        A.location,
        A.howToUse,
        A.madeDate,
        A.howToKeep,
        A.tel,
        A.warning,
        A.canDeliveryArea,
        A.customInfo,
        A.refundInfo,
        A.isRecommend,
        A.createdAt,
        A.updatedAt,
        DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")															  AS viewCreatedAt,
        DATE_FORMAT(A.createdAt, "%Y.%m.%d")																AS viewFrontCreatedAt,
        DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")															  AS viewUpdatedAt,
        A.CateUpId,
        A.CateDownId,
        A.BrandId,
        B.username																							AS updator,
        C.value 																							AS upCategoryValue,
        D.value 																							AS downCategoryValue,
        E.imagePath																							AS brandImage,
        E.name 																								AS brandName,
        E.subDesc 																							AS brandSubDesc
  FROM	product		A
  LEFT
 OUTER
  JOIN	users		B
    ON	A.updator = B.id
 INNER
  JOIN	cateUp 		C
    ON	A.CateUpId = C.id
 INNER
  JOIN	cateDown 	D
    ON	A.CateDownId = D.id
 INNER
  JOIN	brand 		E
    ON	A.BrandId = E.id
 WHERE	1 = 1
   AND	A.isDelete = 0
   AND  A.id = ${ProductId}
  `;

  const optionQuery = `
 SELECT ROW_NUMBER()    OVER(ORDER  BY A.createdAt)     AS num,
        A.id,
        A.value,
        A.price,
        FORMAT(A.price, 0)                              AS formatPrice,
        CONCAT(FORMAT(A.price, 0), "원")                 AS concatPrice,
        A.ProductId,
        A.createdAt,
        A.updatedAt,
        DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,                
        DATE_FORMAT(A.createdAt, "%Y.%m.%d")            AS viewFrontCreatedAt,                
        DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
        B.username                                      AS updator           
   FROM productOption       A
   LEFT
  OUTER
   JOIN users               B
     ON A.updator = B.id
  WHERE A.ProductId = ${ProductId}  
    AND A.isDelete = 0
  ORDER BY num DESC
 `;

  const searchTagQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)     AS  num,
            A.id,
            B.value,
            A.ProductId,
            A.SearchTagId
    FROM    productSearchTag                A
   INNER
    JOIN    searchTag                       B
      ON    A.SearchTagId = B.id
   WHERE    A.ProductId = ${ProductId}
  `;

  try {
    const detailData = await models.sequelize.query(deleteQuery);

    if (detailData[0].length === 0) {
      return res.status(401).send("존재하지 않는 상품 정보입니다.");
    }

    const optionList = await models.sequelize.query(optionQuery);
    const searchTagList = await models.sequelize.query(searchTagQuery);

    const relateProductQuery = `
    SELECT  ROW_NUMBER()  OVER(ORDER  BY createdAt)   AS num,
            id
            title,
            thumbnail1
      FROM  product
     WHERE  CateUpId = ${detailData[0][0].CateUpId}
       AND  CateDownId = ${detailData[0][0].CateDownId}
       AND  id != ${ProductId}
     ORDER  BY RAND()
     LIMIT  5
    `;

    const relateProductList = await models.sequelize.query(relateProductQuery);

    return res.status(200).json({
      detailData: detailData[0][0], // 상품 상세정보
      optionList: optionList[0], // 상품 옵션 리스트
      searchTagList: searchTagList[0], // 검색 태그 리스트
      relateProductList: relateProductList[0], // 관련 상품 리스트
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 등록
 * PARAMETERS : CateUpId, CateDownId, BrandId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/create", isAdminCheck, async (req, res, next) => {
  const { CateUpId, CateDownId, BrandId } = req.body;

  const insertQuery = `
  INSERT    INTO    product
  (
    thumbnail1,
    thumbnail2,
    thumbnail3,
    thumbnail4,
    title,
    description,
    marketPrice,
    memberPrice,
    weight,
    buyMinLimitCount,
    buyMaxLimitCount,
    discount,
    youtubeLink,
    detailImage,
    origin,
    madeCompany,
    location,
    howToUse,
    madeDate,
    howToKeep,
    tel,
    warning,
    canDeliveryArea,
    customInfo,
    refundInfo,
    createdAt,
    updatedAt,
    CateUpId,
    CateDownId,
    BrandId,
    updator
  )
  VALUES
  (
    "http://via.placeholder.com/562",
    null,
    null,
    null,
    "임시 상품명",
    "임시 설명",
    0,
    0,
    0.0,
    0,
    0,
    0.0,
    "/",
    "http://via.placeholder.com/840x700",
    "임시 원산지",
    "임시 제조사",
    "임시 소재지",
    "임시 사용방법",
    "임시 제조년월일 및 사용기한",
    "임시 보관방법 / 취급방법",
    "XX-XXX-XXXX",
    "임시 주의사항",
    "임시 배송가능지역",
    "임시 관부가세 안내",
    "임시 환불안내",
    NOW(),
    NOW(),
    ${CateUpId},
    ${CateDownId},
    ${BrandId},
    ${req.user.id}
  )
  `;

  const insertHistoryQuery = `
  INSERT  INTO    productHistory
  (
      title,
      content,
      updator,
      createdAt,
      updatedAt
  )
  VALUES
  (
      "상품 데이터 생성",
      "임시 상품명",
      ${req.user.id},
      NOW(),
      NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품을 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 수정
 * PARAMETERS : id,
                thumbnail1,
                thumbnail2,
                thumbnail3,
                thumbnail4,
                title,
                description,
                marketPrice,
                memberPrice,
                weight,
                buyMinLimitCount,
                buyMaxLimitCount,
                discount,
                youtubeLink,
                detailImage,
                origin,
                madeCompany,
                location,
                howToUse,
                madeDate,
                howToKeep,
                tel,
                warning,
                canDeliveryArea,
                customInfo,
                refundInfo,
                CateUpId,
                CateDownId,
                BrandId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/update", isAdminCheck, async (req, res, next) => {
  const {
    id,
    thumbnail1,
    thumbnail2,
    thumbnail3,
    thumbnail4,
    title,
    description,
    marketPrice,
    memberPrice,
    weight,
    buyMinLimitCount,
    buyMaxLimitCount,
    discount,
    youtubeLink,
    detailImage,
    origin,
    madeCompany,
    location,
    howToUse,
    madeDate,
    howToKeep,
    tel,
    warning,
    canDeliveryArea,
    customInfo,
    refundInfo,
    CateUpId,
    CateDownId,
    BrandId,
  } = req.body;

  const updateQuery = `
  UPDATE    product
     SET    thumbnail1 = "${thumbnail1}",
            thumbnail2 = ${thumbnail2 ? `"${thumbnail2}"` : null},
            thumbnail3 = ${thumbnail3 ? `"${thumbnail3}"` : null},
            thumbnail4 = ${thumbnail4 ? `"${thumbnail4}"` : null},
            title = "${title}",
            description = "${description}",
            marketPrice = ${marketPrice},
            memberPrice = ${memberPrice},
            weight = ${weight},
            buyMinLimitCount = ${buyMinLimitCount},
            buyMaxLimitCount = ${buyMaxLimitCount},
            discount = ${discount},
            youtubeLink = "${youtubeLink}",
            detailImage = "${detailImage}",
            origin = "${origin}",
            madeCompany = "${madeCompany}",
            location = "${location}",
            howToUse = "${howToUse}",
            madeDate = "${madeDate}",
            howToKeep = "${howToKeep}",
            tel = "${tel}",
            warning = "${warning}",
            canDeliveryArea = "${canDeliveryArea}",
            customInfo = "${customInfo}",
            refundInfo = "${refundInfo}",
            CateUpId = ${CateUpId},
            CateDownId = ${CateDownId},
            BrandId = ${BrandId},
            updator = ${req.user.id},
            updatedAt = NOW()
   WHERE    id = ${id}
  `;

  const insertHistoryQuery = `
    INSERT  INTO    productHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "상품 데이터 수정",
        "${title}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품을 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 추천상품 여부 변경
 * PARAMETERS : id, title, isRecommend
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/recommend/update", isAdminCheck, async (req, res, next) => {
  const { id, title, isRecommend } = req.body;

  const updateQuery = `
  UPDATE    product
     SET    isRecommend = ${isRecommend},
            updatedAt = NOW(),
            updator = ${req.user.id}
   WHERE    id = ${id}
  `;

  const insertHistoryQuery = `
    INSERT  INTO    productHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "추천상품 여부 변경",
        "${title}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("추천 상품 여부를 변경할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 삭제
 * PARAMETERS : id, title
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, title } = req.body;

  const updateQuery = `
  UPDATE    product
     SET    isDelete = 1,
            deletedAt = NOW(),
            updator = ${req.user.id}
   WHERE    id = ${id}
  `;

  const insertHistoryQuery = `
    INSERT  INTO    productHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "상품 데이터 삭제",
        "${title}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품을 삭제할 수 없습니다.");
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
        FROM 	productHistory		A
       INNER
        JOIN	users 			    B
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

/**
 * SUBJECT : 상품 옵션 목록
 * PARAMETERS : ProductId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/option/list", async (req, res, next) => {
  const { ProductId } = req.body;

  const selectQuery = `
 SELECT ROW_NUMBER()    OVER(ORDER  BY A.createdAt)     AS num,
        A.id,
        A.value,
        A.price,
        FORMAT(A.price, 0)                              AS formatPrice,
        CONCAT(FORMAT(A.price, 0), "원")                 AS concatPrice,
        A.ProductId,
        A.createdAt,
        A.updatedAt,
        DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")        AS viewCreatedAt,                
        DATE_FORMAT(A.createdAt, "%Y.%m.%d")            AS viewFrontCreatedAt,                
        DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")        AS viewUpdatedAt,
        B.username                                      AS updator           
   FROM productOption       A
   LEFT
  OUTER
   JOIN users               B
     ON A.updator = B.id
  WHERE A.ProductId = ${ProductId}  
    AND A.isDelete = 0
  ORDER BY num DESC
 `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(201).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 옵션을 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 옵션 등록
 * PARAMETERS : ProductId, productTitle
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/option/create", isAdminCheck, async (req, res, next) => {
  const { ProductId, productTitle } = req.body;

  const insertQuery = `
  INSERT    INTO    productOption
  (
    value,
    price,
    updator,
    ProductId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "임시 옵션",
    0,
    ${req.user.id},
    ${ProductId},
    NOW(),
    NOW()
  )
  `;

  const insertHistoryQuery = `
    INSERT  INTO    productHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "상품 옵션 등록",
        "${productTitle} | 임시 옵션",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 옵션을 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 옵션 수정
 * PARAMETERS : id, value, price, productTitle
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/option/update", isAdminCheck, async (req, res, next) => {
  const { id, value, price, productTitle } = req.body;

  const updateQuery = `
  UPDATE    productOption
     SET    value = "${value}",
            price = ${price},
            updatedAt = NOW(),
            updator = ${req.user.id}
   WHERE    id = ${id}
  `;

  const insertHistoryQuery = `
  INSERT  INTO    productHistory
  (
      title,
      content,
      updator,
      createdAt,
      updatedAt
  )
  VALUES
  (
      "상품 옵션 수정",
      "${productTitle} | ${value}",
      ${req.user.id},
      NOW(),
      NOW()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 옵션을 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 옵션 삭제
 * PARAMETERS : id, value, price, productTitle
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/option/delete", isAdminCheck, async (req, res, next) => {
  const { id, value, productTitle } = req.body;

  const deleteQuery = `
  UPDATE    productOption
     SET    isDelete = 1,
            deletedAt = NOW(),
            updator = ${req.user.id}
   WHERE    id = ${id}
  `;

  const insertHistoryQuery = `
  INSERT  INTO    productHistory
  (
      title,
      content,
      updator,
      createdAt,
      updatedAt
  )
  VALUES
  (
      "상품 옵션 삭제",
      "${productTitle} | ${value}",
      ${req.user.id},
      NOW(),
      NOW()
  )
  `;

  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 옵션을 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 검색 태그 목록
 * PARAMETERS : ProductId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/03
 */
router.post("/tag/list", async (req, res, next) => {
  const { ProductId } = req.body;

  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)     AS  num,
            A.id,
            B.value,
            A.ProductId,
            A.SearchTagId
    FROM    productSearchTag                A
   INNER
    JOIN    searchTag                       B
      ON    A.SearchTagId = B.id
   WHERE    A.ProductId = ${ProductId}
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 검색 태그 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 검색 태그 수정 (등록도 이 API를 사용하시면 됩니다.)
 * PARAMETERS : ProductId, searchTagIds, productTitle
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/04
 */
router.post("/tag/modify", isAdminCheck, async (req, res, next) => {
  const { ProductId, searchTagIds, productTitle } = req.body;

  if (!Array.isArray(searchTagIds)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const deleteQuery = `
  DELETE
    FROM    productSearchTag
   WHERE    ProductId = ${ProductId}
  `;

  try {
    await models.sequelize.query(deleteQuery);

    await Promise.all(
      searchTagIds.map(async (data) => {
        const insertQuery = `
            INSERT  INTO    productSearchTag
            (
                ProductId,
                SearchTagId,
                createdAt,
                updatedAt
            )
            VALUES
            (
                ${ProductId},
                ${data},
                NOW(),
                NOW()
            )
            `;

        await models.sequelize.query(insertQuery);
      })
    );

    const historyInsertQuery = `
    INSERT  INTO   productHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    ) 
    VALUES
    (
        "상품 검색 태그 수정",
        "${productTitle}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 검색 태그 목록을 불러올 수 없습니다.");
  }
});

module.exports = router;
