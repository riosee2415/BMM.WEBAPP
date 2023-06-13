const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

/**
 * SUBJECT : 취소 / 환불 신청 리스트
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/05
 */
router.post("/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 5;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 5;

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
     AND  B.status IN (6,7,8,9)
     AND  A.UserId = ${req.user.id}
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
     AND  B.status IN (6,7,8,9)
     AND  A.UserId = ${req.user.id}
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
    const cancels = await models.sequelize.query(selectQuery);

    const products = await models.sequelize.query(itemQuery);

    cancels[0].map((item) => {
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
      cancels: cancels[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("환불 신청 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 환불 신청
 * PARAMETERS : receiverName,
                email,
                mobile,
                postCode,
                address,
                detailAddress,
                imagePath1,
                imagePath2,
                imagePath3,
                imagePath4,
                reason,
                BoughtHistoryId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/13
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
  const {
    receiverName,
    email,
    mobile,
    postCode,
    address,
    detailAddress,
    imagePath1,
    imagePath2,
    imagePath3,
    imagePath4,
    reason,
    BoughtHistoryId,
  } = req.body;

  const findHistoryQuery = `
  SELECT  status
    FROM  boughtHistory
   WHERE  id = ${BoughtHistoryId}
  `;

  const findReturnQuery = `
  SELECT  id
    FROM  boughtReturn
   WHERE  BoughtHistoryId = BoughtHistoryId
  `;

  try {
    const findHistoryResult = await models.sequelize.query(findHistoryQuery);

    if (findHistoryResult[0].length === 0) {
      return res.status(401).send("존재하지 않는 구매내역 정보입니다.");
    }

    if (
      findHistoryResult[0][0].status === 6 ||
      findHistoryResult[0][0].status === 7 ||
      findHistoryResult[0][0].status === 8 ||
      findHistoryResult[0][0].status === 9
    ) {
      return res
        .status(401)
        .send("환불 신청을 진행할 수 있는 상태가 아닙니다.");
    }

    const findReturnResult = await models.sequelize.query(findReturnQuery);

    if (findReturnResult[0].length === 0) {
      return res.status(401).send("이미 신청한 내역이 존재합니다.");
    }

    const insertQuery = `
    INSERT  INTO  boughtReturn
    (
      receiverName,
      email,
      mobile,
      postCode,
      address,
      detailAddress,
      imagePath1,
      imagePath2,
      imagePath3,
      imagePath4,
      reason,
      BoughtHistoryId,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "${receiverName}",
      "${email}",
      "${mobile}",
      "${postCode}",
      "${address}",
      "${detailAddress}",
      "${imagePath1}",
      ${imagePath2 ? `"${imagePath2}"` : null},
      ${imagePath3 ? `"${imagePath3}"` : null},
      ${imagePath4 ? `"${imagePath4}"` : null},
      "${reason}",
      ${BoughtHistoryId},
      NOW(),
      NOW()
    )
    `;

    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("환불 신청을 진행할 수 없습니다.");
  }
});

/**
 * SUBJECT : 환불 신청 승인 / 반려 처리
 * PARAMETERS : id, status, rejectReason
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/13
 */
router.post("/permit", isAdminCheck, async (req, res, next) => {
  const { id, status, rejectReason } = req.body;

  // status 2 = 승인
  // status 3 = 반려

  const findQuery = `
  SELECT  CASE
            WHEN  completedAt IS NULL      THEN 1
            WHEN  completedAt IS NOT NULL  THEN 0
          END                              AS isComlete
    FROM  boughtReturn
   WHERE  id = ${id}
  `;

  const updateQuery = `
  UPDATE  boughtReturn
     SET  status = ${status},
          completedAt = NOW(),
          rejectReason = ${rejectReason ? `"${rejectReason}"` : null}
   WHERE  id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(findQuery);

    await models.sequelize.query(updateQuery);
  } catch (error) {
    console.error(error);
    return res.status(401).send("환불 신청을 처리할 수 없습니다.");
  }
});
module.exports = router;
