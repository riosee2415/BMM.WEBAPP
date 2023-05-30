const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
// WISH ITEM 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

/**
 * SUBJECT : 장바구니 상품 추가
 * PARAMETERS : ProductId,
                productPrice,
                productDiscount,
                productTitle,
                productThumbnail,
                productDelPrice,
                productWeight,
                optionName,
                optionPrice,
                optionId,
                qun,
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/10
 */
router.post("/item/create", isLoggedIn, async (req, res, next) => {
  const {
    ProductId,
    productPrice,
    productDiscount,
    productTitle,
    productThumbnail,
    productDelPrice,
    productWeight,
    optionName,
    optionPrice,
    optionId,
    qun,
  } = req.body;

  const findWishList = `
    SELECT  id
      FROM  wishList
     WHERE  UserId = ${req.user.id}
    `;

  try {
    const findResult = await models.sequelize.query(findWishList);

    let createResult = [];

    if (findResult[0].length === 0) {
      const createWishListQuery = `
          INSERT  INTO    wishList
          (
              createdAt,
              updatedAt,
              UserId
          )
          VALUES
          (   
              NOW(),
              NOW(),
              ${req.user.id}
          )
          `;

      createResult = await models.sequelize.query(createWishListQuery);
    }

    if (findResult[0].length !== 0) {
      const findWishItemQuery = `
        SELECT  id,
                qun
          FROM  wishItem
         WHERE  WishListId = ${findResult[0][0].id}
           AND  ProductId = ${ProductId}
           AND  BoughtHistoryId IS NULL
        `;

      const findItemResult = await models.sequelize.query(findWishItemQuery);

      if (findItemResult[0].length !== 0) {
        const updateWishQuery = `
          UPDATE  wishItem
             SET  qun = ${findItemResult[0][0].qun + 1}
           WHERE  id = ${findItemResult[0][0].id}
          `;

        await models.sequelize.query(updateWishQuery);

        return res.status(200).json({ result: true });
      }
    }

    const insertQuery = `
    INSERT    INTO    wishItem
    (
        ProductId,
        productPrice,
        productDiscount,
        productTitle,
        productThumbnail,
        productDelPrice,
        productWeight,
        optionName,
        optionPrice,
        optionId,
        qun,
        WishListId,
        createdAt,
        updatedAt
    )
    VALUES
    (
        ${ProductId},
        ${productPrice},
        ${productDiscount},
        "${productTitle}",
        "${productThumbnail}",
        ${productDelPrice},
        ${productWeight},
        "${optionName}",
        ${optionPrice},
        ${optionId},
        ${
          findResult[0].length !== 0
            ? findResult[0][0].id
            : createResult[0].insertId
        },
        ${qun},
        NOW(),
        NOW()
    )
    `;

    const itemInsertResult = await models.sequelize.query(insertQuery);

    return res
      .status(201)
      .json({ result: true, itemId: itemInsertResult[0].insertId });
  } catch (error) {
    console.error(error);
    return res.status(401).send("장바구니에 상품을 추가할 수 없습니다.");
  }
});

/**
 * SUBJECT : 장바구니 상품 수량 수정
 * PARAMETERS : id, qun
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/10
 */
router.post("/item/update", isLoggedIn, async (req, res, next) => {
  const { id, qun } = req.body;

  const updateQuery = `
    UPDATE    wishItem
       SET    qun = ${qun}
     WHERE    id = ${id}
    `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("장바구니 상품 수량을 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 장바구니 상품 삭제
 * PARAMETERS : itemId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/10
 */
router.post("/item/delete", isLoggedIn, async (req, res, next) => {
  const { itemId } = req.body;

  const deleteQuery = `
    DELETE
      FROM    wishItem
     WHERE    id = ${itemId}
    `;

  try {
    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("장바구니 상품을 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 장바구니 상품 전체 삭제
 * PARAMETERS : itemIds
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/10
 */
router.post("/item/deleteAll", isLoggedIn, async (req, res, next) => {
  const { itemIds } = req.body;
  // 배열로 받아주세요.

  if (!Array.isArray(itemIds)) {
    return res.status(400).send("잘못 된 요청입니다. 다시 시도해주세요.");
  }

  const deleteQuery = `
    DELETE
      FROM    wishItem
     WHERE    id IN (${itemIds})
    `;

  try {
    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("장바구니 상품을 삭제할 수 없습니다.");
  }
});

/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
// WISH LIST 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

/**
 * SUBJECT : 장바구니 리스트
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/10
 */
router.post("/list/view", isLoggedIn, async (req, res, next) => {
  const findWishList = `
    SELECT  id
      FROM  wishList
     WHERE  UserId = ${req.user.id}
    `;

  try {
    const findResult = await models.sequelize.query(findWishList);

    if (findResult[0].length === 0) {
      return res.status(200).json([]);
    }

    const selectQuery = `
        SELECT  A.id,
                A.ProductId,
                A.productPrice,
                CONCAT(FORMAT(A.productPrice, 0), "원")								                                                                                  AS viewProductPrice,
                A.productDiscount,
                CONCAT(A.productDiscount, "%")                                                                                                          AS viewProductDiscount,
                A.productDelPrice,
                CONCAT(FORMAT(A.productDelPrice, 0), "원")                                                                                               AS viewProdDelPrice,
                A.productWeight,
                CONCAT(A.productWeight, "KG")                                                                                                           AS concatProductWeight,
                A.productTitle,
                A.productThumbnail,
                A.qun,
                (A.productPrice * (A.productDiscount / 100) * A.qun)					                                                                          AS originCalDiscount,
                FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0)					                                                                AS formatCalDiscount,
                CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")		                                                        AS viewCalDiscount,
                CASE
                    WHEN	A.productDiscount = 0 THEN	(A.productPrice * A.qun + A.optionPrice) + A.productDelPrice
                    ELSE	A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice + A.productDelPrice
                END														                                          	                                                              AS originRealPrice,
                CASE
                    WHEN	A.productDiscount = 0 THEN	CONCAT(FORMAT(A.productPrice * A.qun + A.optionPrice + A.productDelPrice , 0), "원")
                    ELSE	CONCAT(FORMAT(A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice + A.productDelPrice, 0), "원")
                END														                                          	                                                              AS realPrice,
                A.optionName,
                A.optionPrice,
                FORMAT(A.optionPrice, 0)                                                                                                                AS formatOptionPrice,
                CONCAT(FORMAT(A.optionPrice, 0), "원")                                                                                                   AS viewOptionPrice,
                A.isWrite,
                A.optionId
          FROM  wishItem			     A
         INNER
          JOIN  wishList           B
            ON  A.WishListId = B.id
         WHERE  A.BoughtHistoryId IS NULL
           AND  A.WishListId = ${findResult[0][0].id}
            `;

    const myLists = await models.sequelize.query(selectQuery);

    return res.status(200).json(myLists[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("장바구니 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 관리자 특정 사용자 장바구니 조회
 * PARAMETERS : UserId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/10
 */
router.post("/admin/list/view", isLoggedIn, async (req, res, next) => {
  const { UserId } = req.body;

  const findWishList = `
    SELECT  id
      FROM  wishList
     WHERE  UserId = ${UserId}
    `;

  try {
    const findResult = await models.sequelize.query(findWishList);

    if (findResult[0].length === 0) {
      return res.status(200).json([]);
    }

    const selectQuery = `
        SELECT  A.id,
                A.ProductId,
                A.productPrice,
                CONCAT(FORMAT(A.productPrice, 0), "원")								                                                                                  AS viewProductPrice,
                A.productDiscount,
                CONCAT(A.productDiscount, "%")                                                                                                          AS viewProductDiscount,
                A.productDelPrice,
                CONCAT(FORMAT(A.productDelPrice, 0), "원")                                                                                               AS viewProdDelPrice,
                A.productWeight,
                CONCAT(A.productWeight, "KG")                                                                                                           AS concatProductWeight,
                A.productTitle,
                A.productThumbnail,
                A.qun,
                (A.productPrice * (A.productDiscount / 100) * A.qun)					                                                                          AS originCalDiscount,
                FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0)					                                                                AS formatCalDiscount,
                CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")		                                                        AS viewCalDiscount,
                CASE
                    WHEN	A.productDiscount = 0 THEN	(A.productPrice * A.qun + A.optionPrice) + A.productDelPrice
                    ELSE	A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice + A.productDelPrice
                END														                                          	                                                              AS originRealPrice,
                CASE
                    WHEN	A.productDiscount = 0 THEN	CONCAT(FORMAT(A.productPrice * A.qun + A.optionPrice + A.productDelPrice , 0), "원")
                    ELSE	CONCAT(FORMAT(A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice + A.productDelPrice, 0), "원")
                END														                                          	                                                              AS realPrice,
                A.optionName,
                A.optionPrice,
                FORMAT(A.optionPrice, 0)                                                                                                                AS formatOptionPrice,
                CONCAT(FORMAT(A.optionPrice, 0), "원")                                                                                                   AS viewOptionPrice,
                A.isWrite,
                A.optionId
          FROM  wishItem			     A
         INNER
          JOIN  wishList           B
            ON  A.WishListId = B.id
         WHERE  A.BoughtHistoryId IS NULL
           AND  A.WishListId = ${findResult[0][0].id}
            `;

    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("장바구니 목록을 불러올 수 없습니다.");
  }
});

/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
//  BOUGHT   🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

/**
 * SUBJECT : 결제내역 목록
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/12
 */
router.post("/bought/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const lengthQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)           AS num,
          A.id,
          A.price,
          FORMAT(A.price, 0)                                  AS formatPrice,
          CONCAT(FORMAT(A.price, 0), "원")                     AS concatPrice,
          A.totalPrice,
          FORMAT(A.totalPrice, 0)                             AS formatTotalPrice,
          CONCAT(FORMAT(A.totalPrice, 0), "원")                AS concatTotalPrice,
          A.totalWeight,
          CONCAT(A.totalWeight, "KG")                         AS formatTotalWeight,
          A.totalDeliveryPrice,
          FORMAT(A.totalDeliveryPrice, 0)                     AS formatTotalDeliveryPrice,
          CONCAT(FORMAT(A.totalDeliveryPrice, 0), "원")        AS concatTotalDeliveryPrice,
          A.name,
          A.englishName,
          A.clearanceNum,
          A.email,
          A.tel,
          A.postCode,
          A.address,
          A.detailAddress,
          A.deliveryMessage,
          A.useCoupon,
          A.couponPrice,
          FORMAT(A.couponPrice, 0)                             AS formatCouponPrice,
          CONCAT(FORMAT(A.couponPrice, 0), "원")                AS concatCouponPrice,
          A.CouponId,
          A.usePoint,
          A.pointPrice,
          FORMAT(A.pointPrice, 0)                             AS formatPointPrice,
          CONCAT(FORMAT(A.pointPrice, 0), "원")                AS concatPointPrice,
          A.payWay,
          A.cardBankInfo,
          A.cardInstallment,
          A.userDiscountPrice,
          A.deliveryCom,
          A.deliveryNum,
          A.isComplete,
          A.completedAt,
          A.isCancel,
          A.cancelAt,
          DATE_FORMAT(A.cancelAt, "%Y년 %m월 %d일")             AS viewCancelAt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")            AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")            AS viewUpdatedAt,
          A.UserId
    FROM  boughtHistory           A
   WHERE  A.UserId = ${req.user.id}
  `;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)           AS num,
          A.id,
          A.price,
          FORMAT(A.price, 0)                                  AS formatPrice,
          CONCAT(FORMAT(A.price, 0), "원")                     AS concatPrice,
          A.totalPrice,
          FORMAT(A.totalPrice, 0)                             AS formatTotalPrice,
          CONCAT(FORMAT(A.totalPrice, 0), "원")                AS concatTotalPrice,
          A.totalWeight,
          CONCAT(A.totalWeight, "KG")                         AS formatTotalWeight,
          A.totalDeliveryPrice,
          FORMAT(A.totalDeliveryPrice, 0)                     AS formatTotalDeliveryPrice,
          CONCAT(FORMAT(A.totalDeliveryPrice, 0), "원")        AS concatTotalDeliveryPrice,
          A.name,
          A.englishName,
          A.clearanceNum,
          A.email,
          A.tel,
          A.postCode,
          A.address,
          A.detailAddress,
          A.deliveryMessage,
          A.useCoupon,
          A.couponPrice,
          FORMAT(A.couponPrice, 0)                             AS formatCouponPrice,
          CONCAT(FORMAT(A.couponPrice, 0), "원")                AS concatCouponPrice,
          A.CouponId,
          A.usePoint,
          A.pointPrice,
          FORMAT(A.pointPrice, 0)                             AS formatPointPrice,
          CONCAT(FORMAT(A.pointPrice, 0), "원")                AS concatPointPrice,
          A.payWay,
          A.cardBankInfo,
          A.cardInstallment,
          A.userDiscountPrice,
          A.deliveryCom,
          A.deliveryNum,
          A.isComplete,
          A.completedAt,
          A.isCancel,
          A.cancelAt,
          DATE_FORMAT(A.cancelAt, "%Y년 %m월 %d일")             AS viewCancelAt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")            AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")            AS viewUpdatedAt,
          A.UserId
    FROM  boughtHistory           A
   WHERE  A.UserId = ${req.user.id}
   ORDER  BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  const itemQuery = `
  SELECT  A.id,
          A.ProductId,
          A.productPrice,
          CONCAT(FORMAT(A.productPrice, 0), "원")								                                                                                  AS viewProductPrice,
          A.productDiscount,
          CONCAT(A.productDiscount, "%")                                                                                                          AS viewProductDiscount,
          A.productDelPrice,
          CONCAT(FORMAT(A.productDelPrice, 0), "원")                                                                                               AS viewProdDelPrice,
          A.productWeight,
          CONCAT(A.productWeight, "KG")                                                                                                           AS concatProductWeight,
          A.productTitle,
          A.productThumbnail,
          A.qun,
          (A.productPrice * (A.productDiscount / 100) * A.qun)					                                                                          AS originCalDiscount,
          FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0)					                                                                AS formatCalDiscount,
          CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")		                                                        AS viewCalDiscount,
          CASE
              WHEN	A.productDiscount = 0 THEN	(A.productPrice * A.qun + A.optionPrice) + A.productDelPrice
              ELSE	A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice + A.productDelPrice
          END														                                          	                                                              AS originRealPrice,
          CASE
              WHEN	A.productDiscount = 0 THEN	CONCAT(FORMAT(A.productPrice * A.qun + A.optionPrice + A.productDelPrice , 0), "원")
              ELSE	CONCAT(FORMAT(A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice + A.productDelPrice, 0), "원")
          END														                                          	                                                              AS realPrice,
          A.optionName,
          A.optionPrice,
          FORMAT(A.optionPrice, 0)                                                                                                                AS formatOptionPrice,
          CONCAT(FORMAT(A.optionPrice, 0), "원")                                                                                                   AS viewOptionPrice,
          A.isWrite,
          A.optionId,
          A.BoughtHistoryId
    FROM  wishItem			     A
   WHERE  A.BoughtHistoryId IS NOT NULL
      `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const boughtHistory = await models.sequelize.query(selectQuery);

    const products = await models.sequelize.query(itemQuery);

    boughtHistory[0].map((item) => {
      item["products"] = [];

      products[0].map((innerItem) => {
        if (parseInt(item.id) === parseInt(innerItem.BoughtHistoryId)) {
          item.products.push(innerItem);
        }
      });
    });

    const boughtHistoryLen = lengths[0].length;

    const lastPage =
      boughtHistoryLen % LIMIT > 0
        ? boughtHistoryLen / LIMIT + 1
        : boughtHistoryLen / LIMIT;

    return res.status(200).json({
      boughtHistorys: boughtHistory[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("결제내역을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 결제내역 목록
 * PARAMETERS : isCanBoughtCancel, ProductId, userId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/16
 */
router.post("/bought/admin/list", isAdminCheck, async (req, res, next) => {
  const { isCanBoughtCancel, ProductId, userId, searchUserLoginId } = req.body;

  //isCanBoughtCancel === 1 이라면 취소 가능
  //isCanBoughtCancel === 2 이라면 취소 불가능
  //isCanBoughtCancel === 3 전체

  const _isCanBoughtCancel = parseInt(isCanBoughtCancel) || 3;
  const _ProductId = ProductId ? ProductId : false;
  const _userId = userId ? userId : false;

  const _searchUserLoginId = searchUserLoginId ? searchUserLoginId : ``;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)           AS num,
          A.id,
          A.price,
          FORMAT(A.price, 0)                                  AS formatPrice,
          CONCAT(FORMAT(A.price, 0), "원")                     AS concatPrice,
          A.totalPrice,
          FORMAT(A.totalPrice, 0)                             AS formatTotalPrice,
          CONCAT(FORMAT(A.totalPrice, 0), "원")                AS concatTotalPrice,
          A.totalWeight,
          CONCAT(A.totalWeight, "KG")                         AS formatTotalWeight,
          A.totalDeliveryPrice,
          FORMAT(A.totalDeliveryPrice, 0)                     AS formatTotalDeliveryPrice,
          CONCAT(FORMAT(A.totalDeliveryPrice, 0), "원")        AS concatTotalDeliveryPrice,
          A.name,
          A.englishName,
          A.clearanceNum,
          A.email,
          A.tel,
          A.postCode,
          A.address,
          A.detailAddress,
          A.deliveryMessage,
          A.useCoupon,
          A.couponPrice,
          FORMAT(A.couponPrice, 0)                             AS formatCouponPrice,
          CONCAT(FORMAT(A.couponPrice, 0), "원")                AS concatCouponPrice,
          A.CouponId,
          A.usePoint,
          A.pointPrice,
          FORMAT(A.pointPrice, 0)                             AS formatPointPrice,
          CONCAT(FORMAT(A.pointPrice, 0), "원")                AS concatPointPrice,
          A.payWay,
          A.cardBankInfo,
          A.cardInstallment,
          A.userDiscountPrice,
          A.deliveryCom,
          A.deliveryNum,
          A.isComplete,
          A.completedAt,
          A.isCancel,
          A.cancelAt,
          DATE_FORMAT(A.cancelAt, "%Y년 %m월 %d일")             AS viewCancelAt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")            AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")            AS viewUpdatedAt,
          A.UserId,
          A.isCanBoughtCancel
    FROM  boughtHistory           A
   INNER
    JOIN  users                   B
      ON  A.UserId = B.id
   WHERE  1 = 1
          ${
            _isCanBoughtCancel === 1
              ? `A.isCanBoughtCancel = 0`
              : _isCanBoughtCancel === 2
              ? `A.isCanBoughtCancel = 1`
              : _isCanBoughtCancel === 3
              ? ``
              : ``
          }
          ${_userId ? `AND A.UserId = ${_userId}` : ``}
     AND  B.username LIKE "%${_searchUserLoginId}%"
          ${
            _ProductId
              ? `
     AND  0 < (
                  SELECT  COUNT(id)
                    FROM  wishItem
                   WHERE  BoughtHistoryId = A.id
                     AND  ProductId = ${_ProductId}
              )
          `
              : ``
          }
   ORDER  BY num DESC
  `;

  const itemQuery = `
        SELECT  A.id,
                A.ProductId,
                A.productPrice,
                CONCAT(FORMAT(A.productPrice, 0), "원")								                                                                                  AS viewProductPrice,
                A.productDiscount,
                CONCAT(A.productDiscount, "%")                                                                                                          AS viewProductDiscount,
                A.productDelPrice,
                CONCAT(FORMAT(A.productDelPrice, 0), "원")                                                                                               AS viewProdDelPrice,
                A.productWeight,
                CONCAT(A.productWeight, "KG")                                                                                                           AS concatProductWeight,
                A.productTitle,
                A.productThumbnail,
                A.qun,
                (A.productPrice * (A.productDiscount / 100) * A.qun)					                                                                          AS originCalDiscount,
                FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0)					                                                                AS formatCalDiscount,
                CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")		                                                        AS viewCalDiscount,
                CASE
                    WHEN	A.productDiscount = 0 THEN	(A.productPrice * A.qun + A.optionPrice) + A.productDelPrice
                    ELSE	A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice + A.productDelPrice
                END														                                          	                                                              AS originRealPrice,
                CASE
                    WHEN	A.productDiscount = 0 THEN	CONCAT(FORMAT(A.productPrice * A.qun + A.optionPrice + A.productDelPrice , 0), "원")
                    ELSE	CONCAT(FORMAT(A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice + A.productDelPrice, 0), "원")
                END														                                          	                                                              AS realPrice,
                A.optionName,
                A.optionPrice,
                FORMAT(A.optionPrice, 0)                                                                                                                AS formatOptionPrice,
                CONCAT(FORMAT(A.optionPrice, 0), "원")                                                                                                   AS viewOptionPrice,
                A.isWrite,
                A.optionId,
                A.BoughtHistoryId
          FROM  wishItem			     A
         WHERE  A.BoughtHistoryId IS NOT NULL
            `;

  try {
    const boughtList = await models.sequelize.query(selectQuery);

    const products = await models.sequelize.query(itemQuery);

    boughtList[0].map((item) => {
      item["products"] = [];

      products[0].map((innerItem) => {
        if (parseInt(item.id) === parseInt(innerItem.BoughtHistoryId)) {
          item.products.push(innerItem);
        }
      });
    });

    return res.status(200).json(boughtList[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("결제내역을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 구매하기
 * PARAMETERS : price,
                totalPrice,
                totalWeight,
                totalDeliveryPrice,
                name,
                englishName,
                clearanceNum,
                email,
                tel,
                postCode,
                address,
                detailAddress,
                deliveryMessage,
                useCoupon,
                couponPrice,
                CouponId,
                usePoint,
                pointPrice,
                payWay,
                cardBankInfo,
                cardInstallment,
                userDiscountPrice,
                wishItemIds,
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/12
 */
router.post("/bought/create", isLoggedIn, async (req, res, next) => {
  const {
    price,
    totalPrice,
    totalWeight,
    totalDeliveryPrice,
    name,
    englishName,
    clearanceNum,
    email,
    tel,
    postCode,
    address,
    detailAddress,
    deliveryMessage,
    useCoupon,
    couponPrice,
    CouponId,
    usePoint,
    pointPrice,
    payWay,
    cardBankInfo,
    cardInstallment,
    userDiscountPrice,
    wishItemIds,
  } = req.body;

  if (!Array.isArray(wishItemIds)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const insertQuery = `
  INSERT  INTO  boughtHistory
  (
    price,
    totalPrice,
    totalWeight,
    totalDeliveryPrice,
    name,
    englishName,
    clearanceNum,
    email,
    tel,
    postCode,
    address,
    detailAddress,
    deliveryMessage,
    useCoupon,
    couponPrice,
    CouponId,
    usePoint,
    pointPrice,
    payWay,
    cardBankInfo,
    cardInstallment,
    userDiscountPrice,
    UserId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    ${price},
    ${totalPrice},
    ${totalWeight},
    ${totalDeliveryPrice},
    "${name}",
    "${englishName}",
    "${clearanceNum}",
    "${email}",
    "${tel}",
    "${postCode}",
    "${address}",
    "${detailAddress}",
    "${deliveryMessage}",
    ${useCoupon},
    ${couponPrice},
    ${CouponId},
    ${usePoint},
    ${pointPrice},
    "${payWay}",
    ${cardBankInfo ? `"${cardBankInfo}"` : null},
    ${cardInstallment ? `"${cardInstallment}"` : null},
    ${userDiscountPrice},
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    const insertResult = await models.sequelize.query(insertQuery);

    await Promise.all(
      wishItemIds.map(async (data) => {
        const updateQuery = `
        UPDATE  wishItem
           SET  BoughtHistoryId = ${insertResult[0].insertId},
                boughtDate = NOW()
         WHERE  id = ${data}
        `;

        await models.sequelize.query(updateQuery);
      })
    );

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품을 구매할 수 없습니다.");
  }
});

module.exports = router;
