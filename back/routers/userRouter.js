const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const generateUUID = require("../utils/generateUUID");
const sendSecretMail = require("../utils/mailSender");

const router = express.Router();

/**
 * SUBJECT : 사용자 목록
 * PARAMETERS : searchData, searchLevel, searchExit
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/29
 */
router.post("/list", isAdminCheck, async (req, res, next) => {
  const { searchData, searchLevel, searchExit } = req.body;

  const _searchData = searchData ? searchData : ``;

  const _searchLevel = parseInt(searchLevel) === 0 ? 0 : parseInt(searchLevel);

  const _searchExit = searchExit ? searchExit : false;

  const selectQuery = `
SELECT	ROW_NUMBER()	OVER(ORDER	BY createdAt)	    AS num,
		    id,
        userId,
        username,
        mobile,
        email,
        postCode,
        address,
        detailAddress,
        point,
        FORMAT(point, 0)							              AS formatPoint,
        recommId,
        level,
        terms,
        menuRight1,
        menuRight2,
        menuRight3,
        menuRight4,
        menuRight5,
        menuRight6,
        menuRight7,
        menuRight8,
        menuRight9,
        menuRight10,
        menuRight11,
        menuRight12,
        createdAt,
        updatedAt,
        DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
        DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt
  FROM	users
 WHERE	CONCAT(username, email) LIKE '%${_searchData}%'
        ${
          _searchLevel === parseInt(0)
            ? ``
            : _searchLevel === 1
            ? `AND level = 1`
            : _searchLevel === 3
            ? `AND level = 3`
            : _searchLevel === 4
            ? `AND level = 4`
            : _searchLevel === 5
            ? `AND level = 5`
            : ``
        } 
        AND	isExit = ${_searchExit}
  ORDER	BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 권한메뉴 관리자 리스트
 * PARAMETERS : username
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/29
 */
router.post("/adminList", async (req, res, next) => {
  const { username, type } = req.body;

  // Validate
  const _username = username ? username : "";

  const selectQuery = `
  SELECT	ROW_NUMBER()	OVER(ORDER	BY createdAt)	    AS num,
          id,
          userId,
          username,
          mobile,
          email,
          postCode,
          address,
          detailAddress,
          point,
          FORMAT(point, 0)							              AS formatPoint,
          recommId,
          level,
          terms,
          menuRight1,
          menuRight2,
          menuRight3,
          menuRight4,
          menuRight5,
          menuRight6,
          menuRight7,
          menuRight8,
          menuRight9,
          menuRight10,
          menuRight11,
          menuRight12,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt
    FROM	users
   WHERE  1 = 1
     AND  username LIKE "${_username}%"
     AND  level LIKE 5
   ORDER  BY createdAt DESC
  `;

  try {
    const result = await models.sequelize.query(selectQuery);

    console.log(result[0]);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("관리자 정보를 불러올 수 없습니다.");
  }
});

// 관리자 메뉴 권한 제어
router.post("/update/menuRight", async (req, res, next) => {
  const { userId, type, status } = req.body;

  let inQuery = "";

  switch (parseInt(type)) {
    case 1:
      inQuery = `SET  menuRight1 =  ${status}`;
      break;

    case 2:
      inQuery = `SET  menuRight2 =  ${status}`;
      break;

    case 3:
      inQuery = `SET  menuRight3 =  ${status}`;
      break;

    case 4:
      inQuery = `SET  menuRight4 =  ${status}`;
      break;

    case 5:
      inQuery = `SET  menuRight5 =  ${status}`;
      break;

    case 6:
      inQuery = `SET  menuRight6 =  ${status}`;
      break;

    case 7:
      inQuery = `SET  menuRight7 =  ${status}`;
      break;

    case 8:
      inQuery = `SET  menuRight8 =  ${status}`;
      break;

    case 9:
      inQuery = `SET  menuRight9 =  ${status}`;
      break;

    case 10:
      inQuery = `SET  menuRight10 =  ${status}`;
      break;

    case 11:
      inQuery = `SET  menuRight11 =  ${status}`;
      break;

    case 12:
      inQuery = `SET  menuRight12 =  ${status}`;
      break;

    default:
      break;
  }

  const updateQuery = `
    UPDATE  users
       ${inQuery}
     WHERE  id = ${userId}
  `;

  const insertQuery2 = `
  INSERT INTO adminUserRightHistorys (returnId, memo, createdAt, updatedAt) VALUES 
  (
    "${userId}",
    "${
      type === 1
        ? `통계관리`
        : type === 2
        ? `기초정보관리`
        : type === 3
        ? `배너관리`
        : type === 4
        ? `게시판관리`
        : type === 5
        ? `회원관리`
        : type === 6
        ? `고객지원관리`
        : type === 7
        ? `기록관리`
        : type === 8
        ? `DIY관리`
        : type === 9
        ? `ERROR`
        : type === 10
        ? `ERROR`
        : type === 11
        ? `ERROR`
        : type === 12
        ? `ERROR`
        : `ERROR`
    } ${status === 1 ? `ON` : status === 0 ? `OFF` : `ERROR`}",
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send("관리자 권한을 제어할 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.content,
            A.value,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	userHistory		A
     INNER
      JOIN	users 			  B
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

router.post(
  "/adminUserRight/history/list",
  isAdminCheck,
  async (req, res, next) => {
    const { datePick } = req.body;

    const _datePick = datePick ? datePick : null;

    const selectQuery = `
    SELECT 	A.id,
            A.returnId,
            A.memo,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	adminUserRightHistorys		A

     INNER
      JOIN	users 			B
        ON	A.returnId = B.id
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
  }
);

/**
 * SUBJECT : GET SIGNIN (me)
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/29
 */
router.get("/signin", async (req, res, next) => {
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  console.log(req.user);
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  try {
    if (req.user) {
      const selectQuery = `
      SELECT	ROW_NUMBER()	OVER(ORDER	BY createdAt)	    AS num,
              id,
              userId,
              username,
              mobile,
              email,
              postCode,
              address,
              detailAddress,
              point,
              FORMAT(point, 0)							              AS formatPoint,
              recommId,
              level,
              terms,
              menuRight1,
              menuRight2,
              menuRight3,
              menuRight4,
              menuRight5,
              menuRight6,
              menuRight7,
              menuRight8,
              menuRight9,
              menuRight10,
              menuRight11,
              menuRight12,
              createdAt,
              updatedAt,
              DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
              DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt
        FROM	users
       WHERE  id = ${req.user.id}
      `;

      const fullUserWithoutPassword = await models.sequelize.query(selectQuery);

      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      console.log(fullUserWithoutPassword[0][0]);
      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      return res.status(200).json(fullUserWithoutPassword[0][0]);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * SUBJECT : 로그인
 * PARAMETERS : userId, password
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/29
 */
router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const selectQuery = `
      SELECT	ROW_NUMBER()	OVER(ORDER	BY createdAt)	    AS num,
              id,
              userId,
              username,
              mobile,
              email,
              postCode,
              address,
              detailAddress,
              point,
              FORMAT(point, 0)							              AS formatPoint,
              recommId,
              level,
              terms,
              menuRight1,
              menuRight2,
              menuRight3,
              menuRight4,
              menuRight5,
              menuRight6,
              menuRight7,
              menuRight8,
              menuRight9,
              menuRight10,
              menuRight11,
              menuRight12,
              createdAt,
              updatedAt,
              DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
              DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt
        FROM	users
       WHERE  id = ${user.id}
      `;

      const fullUserWithoutPassword = await models.sequelize.query(selectQuery);

      return res.status(200).json(fullUserWithoutPassword[0][0]);
    });
  })(req, res, next);
});

/**
 * SUBJECT : 관리자 로그인
 * PARAMETERS : userId, password
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/29
 */
router.post("/signin/admin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (user.level < 3) {
      console.log(`❌ LOGIN FAILED : 관리자 접속 권한이 없습니다.`);
      return res.status(403).send({ reason: "관리자 접속 권한이 없습니다." }); // Forbbiden 권한 없음
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const selectQuery = `
      SELECT	ROW_NUMBER()	OVER(ORDER	BY createdAt)	    AS num,
              id,
              userId,
              username,
              mobile,
              email,
              postCode,
              address,
              detailAddress,
              point,
              FORMAT(point, 0)							              AS formatPoint,
              recommId,
              level,
              terms,
              menuRight1,
              menuRight2,
              menuRight3,
              menuRight4,
              menuRight5,
              menuRight6,
              menuRight7,
              menuRight8,
              menuRight9,
              menuRight10,
              menuRight11,
              menuRight12,
              createdAt,
              updatedAt,
              DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
              DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt
        FROM	users
       WHERE  id = ${user.id}
      `;

      const fullUserWithoutPassword = await models.sequelize.query(selectQuery);

      return res.status(200).json(fullUserWithoutPassword[0][0]);
    });
  })(req, res, next);
});

/**
 * SUBJECT : 회원가입
 * PARAMETERS :  userId,
                 username,
                 password,
                 mobile,
                 email,
                 postCode,
                 address,
                 detailAddress,
                 recommId,
                 terms
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/29
 */
router.post("/signup", async (req, res, next) => {
  const {
    userId,
    username,
    password,
    mobile,
    email,
    postCode,
    address,
    detailAddress,
    recommId,
    terms,
  } = req.body;

  if (!terms) {
    return res.status(401).send("이용약관에 동의해주세요.");
  }

  const findUserIdQuery = `
  SELECT  id
    FROM  users
   WHERE  userId = "${userId}"
  `;

  const findEmailQuery = `
  SELECT  id
    FROM  users
   WHERE  email = "${email}"
  `;

  try {
    const findResult = await models.sequelize.query(findUserIdQuery);

    if (findResult[0].length !== 0) {
      return res.status(401).send("이미 사용중인 아이디 입니다.");
    }

    const findEmailResult = await models.sequelize.query(findEmailQuery);

    if (findEmailResult[0].length !== 0) {
      return res.status(401).send("이미 사용중인 이메일 입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const insertQuery = `
    INSERT  INTO  users
    (
      userId,
      username,
      password,
      mobile,
      email,
      postCode,
      address,
      detailAddress,
      recommId,
      terms,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "${userId}",
      "${username}",
      "${hashedPassword}",
      "${mobile}",
      "${email}",
      ${postCode ? `"${postCode}"` : null},
      ${address ? `"${address}"` : null},
      ${detailAddress ? `"${detailAddress}"` : null},
      ${recommId ? `"${recommId}"` : null},
      ${terms},
      NOW(),
      NOW()
    )
    `;

    await models.sequelize.query(insertQuery);

    res.status(201).send("SUCCESS");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * SUBJECT : SNS 로그인
 * PARAMETERS :
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/30
 */
router.post("/snsLogin", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    const { userId, password, username } = req.body;
    if (user) {
      if (err) {
        console.error(err);
        return next(err);
      }

      if (info) {
        console.log(`❌ LOGIN FAILED : ${info.reason}`);
        return res.status(401).send(info.reason);
      }

      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }

        const selectQuery = `
      SELECT	ROW_NUMBER()	OVER(ORDER	BY createdAt)	    AS num,
              id,
              userId,
              username,
              mobile,
              email,
              postCode,
              address,
              detailAddress,
              point,
              FORMAT(point, 0)							              AS formatPoint,
              recommId,
              level,
              terms,
              menuRight1,
              menuRight2,
              menuRight3,
              menuRight4,
              menuRight5,
              menuRight6,
              menuRight7,
              menuRight8,
              menuRight9,
              menuRight10,
              menuRight11,
              menuRight12,
              createdAt,
              updatedAt,
              DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
              DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt
        FROM	users
       WHERE  id = ${user.id}
      `;

        const fullUserWithoutPassword = await models.sequelize.query(
          selectQuery
        );

        return res.status(200).json(fullUserWithoutPassword[0][0]);
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);

      const insertQuery = `
    INSERT INTO users
    (
      userId,
      username,
      password,
      email,
      terms,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "${userId}",
      "${username}",
      "${hashedPassword}",
      "${userId}",
      1,
      NOW(),
      NOW()
    )
    `;

      const insertResult = await models.sequelize.query(insertQuery);

      const findUserQuery = `
      SELECT	ROW_NUMBER()	OVER(ORDER	BY createdAt)	    AS num,
              id,
              userId,
              username,
              mobile,
              email,
              postCode,
              address,
              detailAddress,
              point,
              FORMAT(point, 0)							              AS formatPoint,
              recommId,
              level,
              terms,
              menuRight1,
              menuRight2,
              menuRight3,
              menuRight4,
              menuRight5,
              menuRight6,
              menuRight7,
              menuRight8,
              menuRight9,
              menuRight10,
              menuRight11,
              menuRight12,
              createdAt,
              updatedAt,
              DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
              DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt
        FROM	users
       WHERE  id = ${insertResult[0]}
      `;

      const findUser = await models.sequelize.query(findUserQuery);

      return req.login(findUser[0][0], async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }

        return res.status(200).json(findUser[0][0]);
      });
    }
  })(req, res, next);
});

router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 정보를 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 회원 정보 수정
 * PARAMETERS : password, mobile, email, postCode, address, detailAddress
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/29
 */
router.post("/me/update", isLoggedIn, async (req, res, next) => {
  const { password, mobile, email, postCode, address, detailAddress } =
    req.body;

  const findUserQuery = `
    SELECT  password
      FROM  users
     WHERE  id = ${req.user.id}
    `;

  const findEmailQuery = `
  SELECT  id
    FROM  users
   WHERE  email = "${email}"
     AND  id != ${req.user.id}
  `;

  try {
    const findEmailResult = await models.sequelize.query(findEmailQuery);

    if (findEmailResult[0].length !== 0) {
      return res.status(401).send("이미 사용중인 이메일 입니다.");
    }

    const findResult = await models.sequelize.query(findUserQuery);

    const result = await bcrypt.compare(password, findResult[0][0].password);

    if (!result) {
      return res.status(401).send("기존 비밀번호가 일치하지 않습니다.");
    }

    const updateQuery = `
    UPDATE  users
       SET  mobile = "${mobile}",
            email = "${email}",
            postCode = "${postCode}",
            address = "${address}",
            detailAddress = "${detailAddress}",
            updatedAt = NOW()
     WHERE  id = ${req.user.id}
    `;

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("정보를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 아이디 찾기 (이메일 발송)
 * PARAMETERS : username, email
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/29
 */
router.post("/findUserId", async (req, res, next) => {
  const { username, email } = req.body;

  const findUserQuery = `
    SELECT  id
      FROM  users
     WHERE  username = "${username}"
       AND  email = "${email}"
    `;

  try {
    const findUserData = await models.sequelize.query(findUserQuery);

    if (findUserData[0].length === 0) {
      return res.status(401).send("일치하는 사용자 정보가 존재하지 않습니다.");
    }

    const UUID = generateUUID();

    const userUpdateQuery = `
    UPDATE  users
       SET  secret = "${UUID}"
     WHERE  email = "${email}"
       AND  username = "${username}"
    `;

    await models.sequelize.query(userUpdateQuery);

    await sendSecretMail(
      email,
      `🔐 [보안 인증코드 입니다.] BMM 에서 아이디 찾기을 위한 보안인증 코드를 발송했습니다.`,
      `
    <div>
      <h3>BMM</h3>
      <hr />
      <p>보안 인증코드를 발송해드립니다. BMM 홈페이지의 인증코드 입력란에 정확히 입력해주시기 바랍니다.</p>
      <p>인증코드는 [<strong>${UUID}</strong>] 입니다. </p>

      <br /><hr />
      <article>
        발송해드린 인증코드는 외부로 유출하시거나, 유출 될 경우 개인정보 침해의 위험이 있으니, 필히 본인만 사용하며 타인에게 양도하거나 알려주지 마십시오.
      </article>
    </div>
    `
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("아이디를 찾을 수 없습니다.");
  }
});

/**
 * SUBJECT : 인증번호 확인하기 (아이디)
 * PARAMETERS : secret
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/29
 */
router.post("/findId/secretCheck", async (req, res, next) => {
  const { secret } = req.body;

  const findUser = `
  SELECT  id,
          userId
    FROM  users
   WHERE  secret = "${secret}"
  `;

  try {
    const userData = await models.sequelize.query(findUser);

    if (userData[0].length === 0) {
      return res.status(401).send("인증코드를 잘못 입력하셨습니다.");
    }

    const updateQuery = `
    UPDATE  users
       SET  secret = NULL
     WHERE  secret = "${secret}"
    `;

    await models.sequelize.query(updateQuery);

    return res.status(200).json(userData[0][0].userId);
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

/**
 * SUBJECT : 비밀번호 찾기 (이메일 발송)
 * PARAMETERS : userId, username, email
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/29
 */
router.post("/modifypass", async (req, res, next) => {
  const { userId, username, email } = req.body;

  const findUserQuery = `
  SELECT  id,
          email
    FROM  users
   WHERE  userId = "${userId}"
     AND  email = "${email}"
     AND  username = "${username}"
  `;

  try {
    const findUserData = await models.sequelize.query(findUserQuery);

    if (findUserData[0].length === 0) {
      return res.status(401).send("일치하는 정보가 없습니다.");
    }

    const UUID = generateUUID();

    const userUpdateQuery = `
    UPDATE  users
       SET  secret = "${UUID}"
     WHERE  userId = "${userId}"
    `;

    await models.sequelize.query(userUpdateQuery);

    await sendSecretMail(
      email,
      `🔐 [보안 인증코드 입니다.] BMM에서 비밀번호 변경을 위한 보안인증 코드를 발송했습니다.`,
      `
          <div>
            <h3>BMM</h3>
            <hr />
            <p>보안 인증코드를 발송해드립니다. BMM 홈페이지의 인증코드 입력란에 정확히 입력해주시기 바랍니다.</p>
            <p>인증코드는 [<strong>${UUID}</strong>] 입니다. </p>

            <br /><hr />
            <article>
              발송해드린 인증코드는 외부로 유출하시거나, 유출 될 경우 개인정보 침해의 위험이 있으니, 필히 본인만 사용하며 타인에게 양도하거나 알려주지 마십시오.
            </article>
          </div>
          `
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. [CODE097]");
  }
});

/**
 * SUBJECT : 인증번호 확인하기 (비밀번호)
 * PARAMETERS : secret
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/29
 */
router.post("/checkSecret", async (req, res, next) => {
  const { secret } = req.body;

  const findUser = `
  SELECT  id
    FROM  users
   WHERE  secret = "${secret}"
  `;

  try {
    const userData = await models.sequelize.query(findUser);

    if (userData[0].length === 0) {
      return res.status(401).send("인증코드를 잘못 입력하셨습니다.");
    }

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

/**
 * SUBJECT : 비밀번호 찾기 (비밀번호 변경)
 * PARAMETERS : userId, password
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/03/29
 */
router.post("/modifypass/update", async (req, res, next) => {
  const { userId, password } = req.body;

  const findUser = `
  SELECT  id
    FROM  users
   WHERE  userId = "${userId}"
  `;

  try {
    const userData = await models.sequelize.query(findUser);

    if (userData[0].length === 0) {
      return res.status(401).send("잠시 후 다시 시도하여 주십시오.");
    }

    const hashPassord = await bcrypt.hash(password, 12);

    const userUpdateQuery = `
    UPDATE  users
       SET  password = "${hashPassord}",
            updatedAt = NOW(),
            secret = NULL
     WHERE  userId = "${userId}"
    `;

    await models.sequelize.query(userUpdateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

router.patch("/level/update", isAdminCheck, async (req, res, next) => {
  const { selectUserId, changeLevel } = req.body;

  const findUserQuery = `
  SELECT  level
    FROM  users
   WHERE  id = ${selectUserId}
  `;

  try {
    const userData = await models.sequelize.query(findUserQuery);

    if (userData[0].length === 0) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const currentLevel = parseInt(userData[0][0].level);

    if (parseInt(currentLevel) === 5) {
      return res.status(403).send("개발사의 권한을 수정할 수 없습니다.");
    }

    if (parseInt(currentLevel) === parseInt(changeLevel)) {
      return res
        .status(401)
        .send(
          "변경하려는 사용자 권한이 동일합니다. 다시 확인 후 시도해주세요."
        );
    }

    const updateQuery = `
    UPDATE  users
       SET  level = ${changeLevel},
            updatedAt = NOW()
     WHERE  id = ${selectUserId}
    `;

    const insertQuery = `
    INSERT  INTO  userHistory
    (
      value,
      content,
      updator,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "권한 수정",
      "${
        changeLevel === 1
          ? `일반회원`
          : changeLevel === 2
          ? `비어있음`
          : changeLevel === 3
          ? `운영자`
          : changeLevel === 4
          ? `최고관리자`
          : `일반회원`
      }",
      ${req.user.id},
      NOW(),
      NOW()
    )
    `;

    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. 개발사에 문의해주세요.");
  }
});

router.get(
  "/kakaoLogin",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    res.redirect("/");
  }
);

router.get(
  "/kakao/oauth",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    return res.redirect("/");
  }
);

/**
 * SUBJECT : 로그아웃
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/01/25
 */
router.get("/logout", function (req, res) {
  req.logout();
  req.session.save(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

router.post("/exit/update/true", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQuery = `
      UPDATE users
         SET isExit = TRUE
           exitedAt = NOW()
       WHERE id = ${id}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send("요청을 처리할 수 없습니다.");
  }
});

router.post("/exit/update/false", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQuery = `
    UPDATE  users
       SET  isExit = FALSE
     WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("요청을 처리할 수 없습니다.");
  }
});

module.exports = router;
