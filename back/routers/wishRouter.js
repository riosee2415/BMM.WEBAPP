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
                productWeight,
                optionList: [
                  {
                    optionName,
                    optionPrice,
                    optionId,
                    qun,
                  },
                ]
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
    productWeight,
    optionList,
  } = req.body;

  const findWishList = `
  SELECT  id
    FROM  wishList
   WHERE  UserId = ${req.user.id}
  `;

  if (!Array.isArray(optionList)) {
    return res.status(400).send("잘못 된 요청입니다. 다시 시도해주세요.");
  }

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

        const selectItemQuery = `
        SELECT  A.id,
                A.ProductId,
                A.productPrice,
                CONCAT(FORMAT(A.productPrice, 0), "원")								                                                                                  AS viewProductPrice,
                A.productDiscount,
                CONCAT(A.productDiscount, "%")                                                                                                          AS viewProductDiscount,
                A.productWeight,
                CONCAT(A.productWeight, "KG")                                                                                                           AS concatProductWeight,
                A.productTitle,
                A.productThumbnail,
                A.qun,
                (A.productPrice * (A.productDiscount / 100) * A.qun)					                                                                          AS originCalDiscount,
                FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0)					                                                                AS formatCalDiscount,
                CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")		                                                        AS viewCalDiscount,
                CASE
                    WHEN	A.productDiscount = 0 THEN	(A.productPrice * A.qun + A.optionPrice)
                    ELSE	A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice
                END														                                          	                                                              AS originRealPrice,
                CASE
                    WHEN	A.productDiscount = 0 THEN	CONCAT(FORMAT(A.productPrice * A.qun + A.optionPrice , 0), "원")
                    ELSE	CONCAT(FORMAT(A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice, 0), "원")
                END														                                          	                                                              AS realPrice,
                A.optionName,
                A.optionPrice,
                FORMAT(A.optionPrice, 0)                                                                                                                AS formatOptionPrice,
                CONCAT(FORMAT(A.optionPrice, 0), "원")                                                                                                   AS viewOptionPrice,
                A.isWrite,
                A.isExist,
                A.optionId
          FROM  wishItem           A
         INNER
          JOIN  wishList           B
            ON  A.WishListId = B.id
         WHERE  A.BoughtHistoryId IS NULL
           AND  A.id = ${findItemResult[0][0].id}
        `;

        const selectItemResult = await models.sequelize.query(selectItemQuery);

        return res
          .status(201)
          .json({ result: true, items: selectItemResult[0] });
      }
    }

    let insertItems = [];

    await Promise.all(
      optionList.map(async (data) => {
        const insertQuery = `
        INSERT    INTO    wishItem
        (
            ProductId,
            productPrice,
            productDiscount,
            productTitle,
            productThumbnail,
            productWeight,
            optionName,
            optionPrice,
            optionId,
            qun,
            WishListId,
            isExist,
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
            ${productWeight},
            "${data.optionName}",
            ${data.optionPrice},
            ${data.optionId},
            ${data.qun},
            ${
              findResult[0].length !== 0
                ? findResult[0][0].id
                : createResult[0].insertId
            },
            1,
            NOW(),
            NOW()
        )
        `;

        const itemInsertResult = await models.sequelize.query(insertQuery);

        insertItems.push(itemInsertResult[0].insertId);
      })
    );

    const selectItemQuery = `
    SELECT  A.id,
            A.ProductId,
            A.productPrice,
            CONCAT(FORMAT(A.productPrice, 0), "원")								                                                                                  AS viewProductPrice,
            A.productDiscount,
            CONCAT(A.productDiscount, "%")                                                                                                          AS viewProductDiscount,
            A.productWeight,
            CONCAT(A.productWeight, "KG")                                                                                                           AS concatProductWeight,
            A.productTitle,
            A.productThumbnail,
            A.qun,
            (A.productPrice * (A.productDiscount / 100) * A.qun)					                                                                          AS originCalDiscount,
            FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0)					                                                                AS formatCalDiscount,
            CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")		                                                        AS viewCalDiscount,
            CASE
                WHEN	A.productDiscount = 0 THEN	(A.productPrice * A.qun + A.optionPrice)
                ELSE	A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice
            END														                                          	                                                              AS originRealPrice,
            CASE
                WHEN	A.productDiscount = 0 THEN	CONCAT(FORMAT(A.productPrice * A.qun + A.optionPrice , 0), "원")
                ELSE	CONCAT(FORMAT(A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice, 0), "원")
            END														                                          	                                                              AS realPrice,
            A.optionName,
            A.optionPrice,
            FORMAT(A.optionPrice, 0)                                                                                                                AS formatOptionPrice,
            CONCAT(FORMAT(A.optionPrice, 0), "원")                                                                                                   AS viewOptionPrice,
            A.isWrite,
            A.isExist,
            A.optionId
      FROM  wishItem           A
     INNER
      JOIN  wishList           B
        ON  A.WishListId = B.id
     WHERE  A.BoughtHistoryId IS NULL
       AND  A.id IN (${insertItems.map((data) => data)})
    `;

    const selectItemResult = await models.sequelize.query(selectItemQuery);

    return res.status(201).json({ result: true, items: selectItemResult[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("장바구니에 상품을 추가할 수 없습니다.");
  }
});

/**
 * SUBJECT : 관리자 장바구니 상품 추가 (사이트 내에 존재하지 않는 상품)
 * PARAMETERS : UserId,
                productPrice,
                productDiscount,
                productTitle,
                productThumbnail,
                productWeight,
                optionName,
                optionPrice,
                optionId,
                qun,
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/31
 */
router.post("/item/admin/create", isAdminCheck, async (req, res, next) => {
  const {
    UserId,
    productPrice,
    productDiscount,
    productTitle,
    productThumbnail,
    productWeight,
    qun,
  } = req.body;

  const findUserQuery = `
  SELECT  id
    FROM  users
   WHERE  id = ${UserId}
     AND  isExit = 0
  `;

  const findWishList = `
      SELECT  id
        FROM  wishList
       WHERE  UserId = ${UserId}
      `;

  try {
    const findUserResult = await models.sequelize.query(findUserQuery);

    if (findUserResult[0].length === 0) {
      return res.status(401).send("존재하지 않는 사용자 정보입니다.");
    }

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
          ${UserId}
      )
      `;

      createResult = await models.sequelize.query(createWishListQuery);
    }

    const insertQuery = `
    INSERT    INTO    wishItem
    (
        ProductId,
        productPrice,
        productDiscount,
        productTitle,
        productThumbnail,
        productWeight,
        optionName,
        optionPrice,
        optionId,
        qun,
        isWrite,
        isExist,
        createdAt,
        updatedAt,
        WishListId
    )
    VALUES
    (
        NULL,
        ${productPrice},
        ${productDiscount},
        "${productTitle}",
        "${productThumbnail}",
        ${productWeight},
        NULL,
        0,
        NULL,
        ${qun},
        0,
        0,
        NOW(),
        NOW(),
        ${
          findResult[0].length !== 0
            ? findResult[0][0].id
            : createResult[0].insertId
        }
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
                A.productWeight,
                CONCAT(A.productWeight, "KG")                                                                                                           AS concatProductWeight,
                A.productTitle,
                A.productThumbnail,
                A.qun,
                (A.productPrice * (A.productDiscount / 100) * A.qun)					                                                                          AS originCalDiscount,
                FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0)					                                                                AS formatCalDiscount,
                CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")		                                                        AS viewCalDiscount,
                CASE
                    WHEN	A.productDiscount = 0 THEN	(A.productPrice * A.qun + A.optionPrice)
                    ELSE	A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice
                END														                                          	                                                              AS originRealPrice,
                CASE
                    WHEN	A.productDiscount = 0 THEN	CONCAT(FORMAT(A.productPrice * A.qun + A.optionPrice , 0), "원")
                    ELSE	CONCAT(FORMAT(A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice, 0), "원")
                END														                                          	                                                              AS realPrice,
                A.optionName,
                A.optionPrice,
                FORMAT(A.optionPrice, 0)                                                                                                                AS formatOptionPrice,
                CONCAT(FORMAT(A.optionPrice, 0), "원")                                                                                                   AS viewOptionPrice,
                A.isWrite,
                A.isExist,
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
                A.productWeight,
                CONCAT(A.productWeight, "KG")                                                                                                           AS concatProductWeight,
                A.productTitle,
                A.productThumbnail,
                A.qun,
                (A.productPrice * (A.productDiscount / 100) * A.qun)					                                                                          AS originCalDiscount,
                FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0)					                                                                AS formatCalDiscount,
                CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")		                                                        AS viewCalDiscount,
                CASE
                    WHEN	A.productDiscount = 0 THEN	(A.productPrice * A.qun + A.optionPrice)
                    ELSE	A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice
                END														                                          	                                                              AS originRealPrice,
                CASE
                    WHEN	A.productDiscount = 0 THEN	CONCAT(FORMAT(A.productPrice * A.qun + A.optionPrice , 0), "원")
                    ELSE	CONCAT(FORMAT(A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice, 0), "원")
                END														                                          	                                                              AS realPrice,
                A.optionName,
                A.optionPrice,
                FORMAT(A.optionPrice, 0)                                                                                                                AS formatOptionPrice,
                CONCAT(FORMAT(A.optionPrice, 0), "원")                                                                                                   AS viewOptionPrice,
                A.isWrite,
                A.isExist,
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
          DATE_FORMAT(A.completedAt, "%Y년 %m월 %d일")             AS viewCompletedAt,
          A.status,
          CASE
              WHEN  A.status = 1  THEN "입금대기"
              WHEN  A.status = 2  THEN "결제완료"
              WHEN  A.status = 3  THEN "배송 준비중"
              WHEN  A.status = 4  THEN "배송중"
              WHEN  A.status = 5  THEN "배송완료"
              WHEN  A.status = 6  THEN "취소완료"
              WHEN  A.status = 7  THEN "환불 신청완료"
              WHEN  A.status = 8  THEN "환불완료"
              WHEN  A.status = 9  THEN "환불 신청 반려"
          END                                                   AS viewStatus,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")            AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")            AS viewUpdatedAt,
          A.UserId
    FROM  boughtHistory           A
   WHERE  A.UserId = ${req.user.id}
     AND  A.status NOT IN (6, 7, 8, 9)
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
          DATE_FORMAT(A.completedAt, "%Y년 %m월 %d일")             AS viewCompletedAt,
          A.status,
          CASE
              WHEN  A.status = 1  THEN "입금대기"
              WHEN  A.status = 2  THEN "결제완료"
              WHEN  A.status = 3  THEN "배송 준비중"
              WHEN  A.status = 4  THEN "배송중"
              WHEN  A.status = 5  THEN "배송완료"
              WHEN  A.status = 6  THEN "취소완료"
              WHEN  A.status = 7  THEN "환불 신청완료"
              WHEN  A.status = 8  THEN "환불완료"
              WHEN  A.status = 9  THEN "환불 신청 반려"
          END                                                   AS viewStatus,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")            AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")            AS viewUpdatedAt,
          A.UserId
    FROM  boughtHistory           A
   WHERE  A.UserId = ${req.user.id}
     AND  A.status NOT IN (6, 7, 8, 9)
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
          A.productWeight,
          CONCAT(A.productWeight, "KG")                                                                                                           AS concatProductWeight,
          A.productTitle,
          A.productThumbnail,
          A.qun,
          (A.productPrice * (A.productDiscount / 100) * A.qun)					                                                                          AS originCalDiscount,
          FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0)					                                                                AS formatCalDiscount,
          CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")		                                                        AS viewCalDiscount,
          CASE
              WHEN	A.productDiscount = 0 THEN	(A.productPrice * A.qun + A.optionPrice)
              ELSE	A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice
          END														                                          	                                                              AS originRealPrice,
          CASE
              WHEN	A.productDiscount = 0 THEN	CONCAT(FORMAT(A.productPrice * A.qun + A.optionPrice , 0), "원")
              ELSE	CONCAT(FORMAT(A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice, 0), "원")
          END														                                          	                                                              AS realPrice,
          A.optionName,
          A.optionPrice,
          FORMAT(A.optionPrice, 0)                                                                                                                AS formatOptionPrice,
          CONCAT(FORMAT(A.optionPrice, 0), "원")                                                                                                   AS viewOptionPrice,
          A.isWrite,
          A.isExist,
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
 * PARAMETERS : isCanBoughtCancel, ProductId, userId, searchUserLoginId, status
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/16
 */
router.post("/bought/admin/list", isAdminCheck, async (req, res, next) => {
  const { isCanBoughtCancel, ProductId, userId, searchUserLoginId, status } =
    req.body;

  //isCanBoughtCancel === 1 이라면 취소 가능
  //isCanBoughtCancel === 2 이라면 취소 불가능
  //isCanBoughtCancel === 3 전체

  const _isCanBoughtCancel = parseInt(isCanBoughtCancel) || 3;
  const _ProductId = ProductId ? ProductId : false;
  const _userId = userId ? userId : false;

  const _searchUserLoginId = searchUserLoginId ? searchUserLoginId : ``;

  const _status = parseInt(status) || 10;

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
          DATE_FORMAT(A.completedAt, "%Y년 %m월 %d일")             AS viewCompletedAt,
          A.status,
          CASE
              WHEN  A.status = 1  THEN "입금대기"
              WHEN  A.status = 2  THEN "결제완료"
              WHEN  A.status = 3  THEN "배송 준비중"
              WHEN  A.status = 4  THEN "배송중"
              WHEN  A.status = 5  THEN "배송완료"
              WHEN  A.status = 6  THEN "취소완료"
              WHEN  A.status = 7  THEN "환불 신청완료"
              WHEN  A.status = 8  THEN "환불완료"
              WHEN  A.status = 9  THEN "환불 신청 반려"
          END                                                   AS viewStatus,
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
            _status === 1
              ? `AND A.status = 1`
              : _status === 2
              ? `AND A.status = 2`
              : _status === 3
              ? `AND A.status = 3`
              : _status === 4
              ? `AND A.status = 4`
              : _status === 5
              ? `AND A.status = 5`
              : _status === 6
              ? `AND A.status = 6`
              : _status === 7
              ? `AND A.status = 7`
              : _status === 8
              ? `AND A.status = 8`
              : _status === 9
              ? `AND A.status = 9`
              : _status === 10
              ? ``
              : ``
          }
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
                A.productWeight,
                CONCAT(A.productWeight, "KG")                                                                                                           AS concatProductWeight,
                A.productTitle,
                A.productThumbnail,
                A.qun,
                (A.productPrice * (A.productDiscount / 100) * A.qun)					                                                                          AS originCalDiscount,
                FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0)					                                                                AS formatCalDiscount,
                CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")		                                                        AS viewCalDiscount,
                CASE
                    WHEN	A.productDiscount = 0 THEN	(A.productPrice * A.qun + A.optionPrice)
                    ELSE	A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice
                END														                                          	                                                              AS originRealPrice,
                CASE
                    WHEN	A.productDiscount = 0 THEN	CONCAT(FORMAT(A.productPrice * A.qun + A.optionPrice , 0), "원")
                    ELSE	CONCAT(FORMAT(A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice, 0), "원")
                END														                                          	                                                              AS realPrice,
                A.optionName,
                A.optionPrice,
                FORMAT(A.optionPrice, 0)                                                                                                                AS formatOptionPrice,
                CONCAT(FORMAT(A.optionPrice, 0), "원")                                                                                                   AS viewOptionPrice,
                A.isWrite,
                A.isExist,
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
 * SUBJECT : 결제내역 상세정보
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/05
 */
router.post("/bought/detail", async (req, res, next) => {
  const { id } = req.body;

  const selectQuery = `
  SELECT  A.id,
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
          DATE_FORMAT(A.completedAt, "%Y년 %m월 %d일")             AS viewCompletedAt,
          A.status,
          CASE
              WHEN  A.status = 1  THEN "입금대기"
              WHEN  A.status = 2  THEN "결제완료"
              WHEN  A.status = 3  THEN "배송 준비중"
              WHEN  A.status = 4  THEN "배송중"
              WHEN  A.status = 5  THEN "배송완료"
              WHEN  A.status = 6  THEN "취소완료"
              WHEN  A.status = 7  THEN "환불 신청완료"
              WHEN  A.status = 8  THEN "환불완료"
              WHEN  A.status = 9  THEN "환불 신청 반려"
          END                                                   AS viewStatus,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")            AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")            AS viewUpdatedAt,
          A.UserId
    FROM  boughtHistory           A
   WHERE  A.id = ${id}
  `;

  const itemQuery = `
  SELECT  A.id,
          A.ProductId,
          A.productPrice,
          CONCAT(FORMAT(A.productPrice, 0), "원")								                                                                                  AS viewProductPrice,
          A.productDiscount,
          CONCAT(A.productDiscount, "%")                                                                                                          AS viewProductDiscount,
          A.productWeight,
          CONCAT(A.productWeight, "KG")                                                                                                           AS concatProductWeight,
          A.productTitle,
          A.productThumbnail,
          A.qun,
          (A.productPrice * (A.productDiscount / 100) * A.qun)					                                                                          AS originCalDiscount,
          FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0)					                                                                AS formatCalDiscount,
          CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")		                                                        AS viewCalDiscount,
          CASE
              WHEN	A.productDiscount = 0 THEN	(A.productPrice * A.qun + A.optionPrice)
              ELSE	A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice
          END														                                          	                                                              AS originRealPrice,
          CASE
              WHEN	A.productDiscount = 0 THEN	CONCAT(FORMAT(A.productPrice * A.qun + A.optionPrice , 0), "원")
              ELSE	CONCAT(FORMAT(A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun) + A.optionPrice, 0), "원")
          END														                                          	                                                              AS realPrice,
          A.optionName,
          A.optionPrice,
          FORMAT(A.optionPrice, 0)                                                                                                                AS formatOptionPrice,
          CONCAT(FORMAT(A.optionPrice, 0), "원")                                                                                                   AS viewOptionPrice,
          A.isWrite,
          A.isExist,
          A.optionId,
          A.BoughtHistoryId
    FROM  wishItem			     A
   WHERE  A.BoughtHistoryId = ${id}
      `;

  try {
    const boughtHistoryData = await models.sequelize.query(selectQuery);
    const products = await models.sequelize.query(itemQuery);

    if (boughtHistoryData[0].length === 0) {
      return res.status(401).send("존재하지 않는 결제내역 정보입니다.");
    }

    return res.status(200).json({
      boughtHistoryData: boughtHistoryData[0][0],
      products: products[0],
    });
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
    status,
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
    ${payWay === "nobank" ? `1` : `2`},
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    if (useCoupon) {
      const findCouponQuery = `
      SELECT  isUse
        FROM  cuponuser
       WHERE  UserId = ${req.user.id}
         AND  CuponId = ${CouponId}
      `;

      const findCouponData = await models.sequelize.query(findCouponQuery);

      if (findCouponData[0].length === 0) {
        return res.status(401).send("존재하지 않는 쿠폰 정보입니다.");
      }

      if (findCouponData[0][0].isUse) {
        return res.status(401).send("이미 사용된 쿠폰입니다.");
      }

      const updateQuery = `
      UPDATE  cuponuser
         SET  isUse = 1,
              usedAt = NOW()
       WHERE  id = ${findCouponData[0][0].id}
      `;

      await models.sequelize.query(updateQuery);
    }

    if (usePoint) {
      const updateQuery = `
      UPDATE  users
         SET  point = ${parseInt(req.user.point) - parseInt(pointPrice)}
       WHERE  id = ${req.user.id}
      `;

      const insertPointQuery = `
      INSERT  INTO  point
      (
        type,
        content,
        price,
        createdAt,
        updatedAt,
        UserId
      )
      VALUES
      (
        "사용",
        "상품 구매 - 포인트 사용",
        ${parseInt(pointPrice)},
        NOW(),
        NOW(),
        ${req.user.id}
      )
      `;

      await models.sequelize.query(updateQuery);
      await models.sequelize.query(insertPointQuery);
    }

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

    if (req.user.recommId) {
      const findRecommUserQuery = `
      SELECT  point,
              id
        FROM  users
       WHERE  userId = "${req.user.recommId}"
         AND  isExit = 0
      `;

      const findRecommUserData = await models.sequelize.query(
        findRecommUserQuery
      );

      if (findRecommUserData[0].length === 0) {
        return res.status(401).send("존재하지 않는 추천인 정보입니다.");
      }

      const userMileagePoint = parseInt(totalPrice) * (parseFloat(0.5) / 100);

      const updateQuery = `
      UPDATE  users
         SET  point = ${
           parseInt(findRecommUserData[0][0].point) + userMileagePoint
         }
       WHERE  userId = "${req.user.recommId}"
      `;

      const insertPointQuery = `
      INSERT  INTO  point
      (
        type,
        content,
        price,
        createdAt,
        updatedAt,
        UserId
      )
      VALUES
      (
        "적립",
        "추천인 - 포인트 적립",
        ${userMileagePoint},
        NOW(),
        NOW(),
        ${findRecommUserData[0][0].id}
      )
      `;

      await models.sequelize.query(updateQuery);
      await models.sequelize.query(insertPointQuery);
    }

    const selectQuery = `
    SELECT  id
      FROM  boughtHistory
     WHERE  UserId = ${req.user.id}
       AND  status NOT IN (6, 7, 8, 9)
    `;

    const findResult = await models.sequelize.query(selectQuery);

    if (findResult[0].length === 5 && req.user.UserGradeId === 1) {
      const updateQuery = `
      UPDATE  users
         SET  UserGradeId = 2
       WHERE  id = ${req.user.id}
      `;

      await models.sequelize.queyr(updateQuery);
    }

    if (findResult[0].length === 10 && req.user.UserGradeId === 2) {
      const updateQuery = `
      UPDATE  users
         SET  UserGradeId = 3
       WHERE  id = ${req.user.id}
      `;

      await models.sequelize.queyr(updateQuery);
    }

    if (findResult[0].length === 20 && req.user.UserGradeId === 3) {
      const updateQuery = `
      UPDATE  users
         SET  UserGradeId = 3
       WHERE  id = ${req.user.id}
      `;

      await models.sequelize.queyr(updateQuery);
    }

    return res
      .status(201)
      .json({ result: true, historyId: insertResult[0].insertId });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품을 구매할 수 없습니다.");
  }
});

/**
 * SUBJECT : 결제 취소하기
 * PARAMETERS : BoughtHistoryId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/13
 */
router.post("/bought/cancel", isLoggedIn, async (req, res, next) => {
  const { BoughtHistoryId } = req.body;

  const findQuery = `
  SELECT  id
    FROM  boughtReturn
   WHERE  BoughtHistoryId = ${BoughtHistoryId}
  `;

  const findQuery2 = `
  SELECT  status,
          isCanBoughtCancel,
          useCoupon,
          usePoint,
          pointPrice,
          CouponId
    FROM  boughtHistory
   WHERE  id = ${BoughtHistoryId}
  `;

  const updateQuery = `
  UPDATE  boughHistory
     SET  status = 6,
          updatedAt = NOW()
   WHERE  id = ${BoughtHistoryId}
  `;

  try {
    const findResult = await models.sequelize.query(findQuery);
    const findResult2 = await models.sequelize.query(findQuery2);

    if (findResult[0].length !== 0) {
      return res
        .status(401)
        .send("해당 구매내역의 환불 신청 이력이 존재합니다.");
    }

    if (findResult2[0].length === 0) {
      return res.status(401).send("존재하지 않는 구매 내역입니다.");
    }

    if (!findResult2[0][0].isCanBoughtCancel) {
      return res.status(401).send("해당 구매내역은 취소할 수 없는 상태입니다.");
    }

    if (
      findResult2[0][0].status === 6 ||
      findResult2[0][0].status === 7 ||
      findResult2[0][0].status === 8 ||
      findResult2[0][0].status === 9
    ) {
      return res
        .status(401)
        .send("취소 신청을 진행할 수 있는 상태가 아닙니다.");
    }

    await models.sequelize.query(updateQuery);

    if (findResult2[0][0].useCoupon) {
      const findCouponQuery = `
      SELECT  isUse
        FROM  cuponuser
       WHERE  UserId = ${req.user.id}
         AND  CuponId = ${findResult2[0][0].CouponId}
      `;

      const findCouponData = await models.sequelize.query(findCouponQuery);

      const updateQuery = `
      UPDATE  cuponuser
         SET  isUse = 0,
              usedAt = NULL
       WHERE  id = ${findCouponData[0][0].id}
      `;

      await models.sequelize.query(updateQuery);
    }

    if (findResult2[0][0].usePoint) {
      const updateQuery = `
      UPDATE  users
         SET  point = ${
           parseInt(req.user.point) + parseInt(findResult2[0][0].pointPrice)
         }
       WHERE  id = ${req.user.id}
      `;

      const insertPointQuery = `
      INSERT  INTO  point
      (
        type,
        content,
        price,
        createdAt,
        updatedAt,
        UserId
      )
      VALUES
      (
        "적립",
        "상품 구매 취소 - 포인트 환원",
        ${parseInt(findResult2[0][0].pointPrice)},
        NOW(),
        NOW(),
        ${req.user.id}
      )
      `;

      await models.sequelize.query(updateQuery);
      await models.sequelize.query(insertPointQuery);
    }

    if (req.user.recommId) {
      const findRecommUserQuery = `
      SELECT  point,
              id
        FROM  users
       WHERE  userId = "${req.user.recommId}"
         AND  isExit = 0
      `;

      const findRecommUserData = await models.sequelize.query(
        findRecommUserQuery
      );

      if (findRecommUserData[0].length === 0) {
        return res.status(401).send("존재하지 않는 추천인 정보입니다.");
      }

      const userMileagePoint =
        parseInt(findResult2[0][0].totalPrice) * (parseFloat(0.5) / 100);

      const updateQuery = `
      UPDATE  users
         SET  point = ${
           parseInt(findRecommUserData[0][0].point) - userMileagePoint
         }
       WHERE  userId = "${req.user.recommId}"
      `;

      const insertPointQuery = `
      INSERT  INTO  point
      (
        type,
        content,
        price,
        createdAt,
        updatedAt,
        UserId
      )
      VALUES
      (
        "사용",
        "추천인 - 결제 취소",
        ${userMileagePoint},
        NOW(),
        NOW(),
        ${findRecommUserData[0][0].id}
      )
      `;

      await models.sequelize.query(updateQuery);
      await models.sequelize.query(insertPointQuery);
    }

    const selectHistoryQuery = `
    SELECT  id
      FROM  boughtHistory
     WHERE  UserId = ${req.user.id}
       AND  status NOT IN (6, 7, 8, 9)
    `;

    const findHistoryResult = await models.sequelize.query(selectHistoryQuery);

    if (findHistoryResult[0].length < 5 && req.user.UserGradeId === 2) {
      const updateQuery = `
      UPDATE  users
         SET  UserGradeId = 1
       WHERE  id = ${req.user.id}
      `;

      await models.sequelize.queyr(updateQuery);
    }

    if (
      findHistoryResult[0].length >= 5 &&
      findHistoryResult[0].length < 10 &&
      req.user.UserGradeId === 3
    ) {
      const updateQuery = `
      UPDATE  users
         SET  UserGradeId = 2
       WHERE  id = ${req.user.id}
      `;

      await models.sequelize.queyr(updateQuery);
    }

    if (
      findHistoryResult[0].length >= 10 &&
      findHistoryResult[0].length < 20 &&
      req.user.UserGradeId === 4
    ) {
      const updateQuery = `
      UPDATE  users
         SET  UserGradeId = 3
       WHERE  id = ${req.user.id}
      `;

      await models.sequelize.queyr(updateQuery);
    }

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("결제 취소를 진행할 수 없습니다.");
  }
});

module.exports = router;
