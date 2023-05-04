const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

/**
 * SUBJECT : 찜 목록
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/04
 */
router.post("/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 16;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 16;

  const lengthQuery = `
  SELECT	ROW_NUMBER()	OVER(ORDER	BY	A.createdAt)														    AS num,
            A.ProductId,
            A.UserId,
            B.thumbnail1,
            B.thumbnail2,
            B.thumbnail3,
            B.thumbnail4,
            B.title,
            B.description,
            B.marketPrice,
            FORMAT(B.marketPrice, 0)																			    AS formatMarketPrice,
            CONCAT(FORMAT(B.marketPrice, 0), "원")																    AS concatMarketPrice,
            B.memberPrice,
            FORMAT(B.memberPrice, 0)																			    AS formatMemberPrice,
            CONCAT(FORMAT(B.memberPrice, 0), "원")																    AS concatMemberPrice,
            B.weight,
            CONCAT(B.weight, "Kg")																				    AS concatWeight,
            B.buyMinLimitCount,
            B.buyMaxLimitCount,
            CONCAT("최소 ", B.buyMinLimitCount, "개 이상", " ~ ", "최대 ", B.buyMaxLimitCount, "개 이하 구매 가능")		    AS viewBuyLimitCount,
            B.discount,
            B.youtubeLink,
            B.detailImage,
            B.origin,
            B.madeCompany,
            B.location,
            B.howToUse,
            B.madeDate,
            B.howToKeep,
            B.tel,
            B.warning,
            B.canDeliveryArea,
            B.customInfo,
            B.refundInfo,
            B.isRecommend,
            B.createdAt,
            B.updatedAt,
            DATE_FORMAT(B.createdAt, "%Y년 %m월 %d일")															      AS viewCreatedAt,
            DATE_FORMAT(B.createdAt, "%Y.%m.%d")																    AS viewFrontCreatedAt,
            DATE_FORMAT(B.updatedAt, "%Y년 %m월 %d일")															      AS viewUpdatedAt,
            B.CateUpId,
            B.CateDownId,
            B.BrandId,
            C.username																							    AS updator,
            D.value 																							    AS upCategoryValue,
            E.value 																							    AS downCategoryValue,
            F.imagePath																							    AS brandImage,
            F.name 																								    AS brandName,
            F.subDesc 																							    AS brandSubDesc,
            ${
              req.user
                ? `
            CASE
                    WHEN (
                            SELECT  COUNT(id)
                              FROM  productLike
                             WHERE  ProductId = B.id
                               AND  UserId = ${req.user.id}
                        ) > 0 THEN       1
                              ELSE       0
            END                                                                                                     AS isLike
            `
                : `
            0                                                                                                       AS isLike    
              `
            }
    FROM	productLike A
   INNER
    JOIN    product		B
      ON    A.ProductId = B.id
    LEFT
   OUTER
    JOIN	users		C
      ON	B.updator = C.id
   INNER
    JOIN	cateUp 		D
      ON	B.CateUpId = D.id
   INNER
    JOIN	cateDown 	E
      ON	B.CateDownId = E.id
   INNER
    JOIN	brand 		F
      ON	B.BrandId = F.id
   WHERE	1 = 1
     AND	B.isDelete = 0
  `;

  const selectQuery = `
  SELECT	ROW_NUMBER()	OVER(ORDER	BY	A.createdAt)														    AS num,
            A.ProductId,
            A.UserId,
            B.thumbnail1,
            B.thumbnail2,
            B.thumbnail3,
            B.thumbnail4,
            B.title,
            B.description,
            B.marketPrice,
            FORMAT(B.marketPrice, 0)																			    AS formatMarketPrice,
            CONCAT(FORMAT(B.marketPrice, 0), "원")																    AS concatMarketPrice,
            B.memberPrice,
            FORMAT(B.memberPrice, 0)																			    AS formatMemberPrice,
            CONCAT(FORMAT(B.memberPrice, 0), "원")																    AS concatMemberPrice,
            B.weight,
            CONCAT(B.weight, "Kg")																				    AS concatWeight,
            B.buyMinLimitCount,
            B.buyMaxLimitCount,
            CONCAT("최소 ", B.buyMinLimitCount, "개 이상", " ~ ", "최대 ", B.buyMaxLimitCount, "개 이하 구매 가능")		    AS viewBuyLimitCount,
            B.discount,
            B.youtubeLink,
            B.detailImage,
            B.origin,
            B.madeCompany,
            B.location,
            B.howToUse,
            B.madeDate,
            B.howToKeep,
            B.tel,
            B.warning,
            B.canDeliveryArea,
            B.customInfo,
            B.refundInfo,
            B.isRecommend,
            B.createdAt,
            B.updatedAt,
            DATE_FORMAT(B.createdAt, "%Y년 %m월 %d일")															      AS viewCreatedAt,
            DATE_FORMAT(B.createdAt, "%Y.%m.%d")																    AS viewFrontCreatedAt,
            DATE_FORMAT(B.updatedAt, "%Y년 %m월 %d일")															      AS viewUpdatedAt,
            B.CateUpId,
            B.CateDownId,
            B.BrandId,
            C.username																							    AS updator,
            D.value 																							    AS upCategoryValue,
            E.value 																							    AS downCategoryValue,
            F.imagePath																							    AS brandImage,
            F.name 																								    AS brandName,
            F.subDesc 																							    AS brandSubDesc,
            ${
              req.user
                ? `
            CASE
                    WHEN (
                            SELECT  COUNT(id)
                              FROM  productLike
                             WHERE  ProductId = B.id
                               AND  UserId = ${req.user.id}
                        ) > 0 THEN       1
                              ELSE       0
            END                                                                                                     AS isLike
            `
                : `
            0                                                                                                       AS isLike    
              `
            }
    FROM	productLike A
   INNER
    JOIN    product		B
      ON    A.ProductId = B.id
    LEFT
   OUTER
    JOIN	users		C
      ON	B.updator = C.id
   INNER
    JOIN	cateUp 		D
      ON	B.CateUpId = D.id
   INNER
    JOIN	cateDown 	E
      ON	B.CateDownId = E.id
   INNER
    JOIN	brand 		F
      ON	B.BrandId = F.id
   WHERE	1 = 1
     AND	B.isDelete = 0
   ORDER    BY num DESC
   LIMIT    ${LIMIT}
  OFFSET    ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const product = await models.sequelize.query(selectQuery);

    const productLen = lengths[0].length;

    const lastPage =
      productLen % LIMIT > 0 ? productLen / LIMIT + 1 : productLen / LIMIT;

    return res.status(200).json({
      product: product[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("찜 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 찜 남기기
 * PARAMETERS : ProductId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/04
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
  const { ProductId } = req.body;

  const findLikeQuery = `
    SELECT    id
      FROM    productLike
     WHERE    UserId = ${req.user.id}
       AND    ProductId = ${ProductId}
    `;

  const insertQuery = `
    INSERT    INTO    productLike
    ( 
      UserId,
      ProductId,
      createdAt,
      updatedAt
    )
    VALUES
    (
      ${req.user.id},
      ${ProductId},
      NOW(),
      NOW()
    )
    `;

  try {
    const findResult = await models.sequelize.query(findLikeQuery);

    if (findResult[0].length === 0) {
      await models.sequelize.query(insertQuery);

      return res.status(201).json({ result: true });
    } else {
      const deleteQuery = `
          DELETE
            FROM  productLike
           WHERE  UserId = ${req.user.id}
             AND  ProductId = ${ProductId}
          `;
      await models.sequelize.query(deleteQuery);

      return res.status(200).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품을 찜할 수 없습니다.");
  }
});

module.exports = router;
