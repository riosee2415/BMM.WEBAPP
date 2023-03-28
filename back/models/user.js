const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: DataTypes.STRING(50), // 사용자 아이디
          allowNull: false,
          unique: true, // 고유한 값
        },
        password: {
          type: DataTypes.STRING(100), // 비밀번호
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(50), // 전화번호
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(60), // 이메일
          allowNull: false,
          unique: true, // 고유한 값
        },
        postCode: {
          type: DataTypes.STRING(10), // 우편번호
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(300), // 주소
          allowNull: true,
        },
        detailAddress: {
          type: DataTypes.STRING(500), // 상세주소
          allowNull: true,
        },
        point: {
          type: DataTypes.INTEGER, // 포인트
          allowNull: false,
          defaultValue: 0,
        },
        recommId: {
          type: DataTypes.STRING(50), // 추천인 아이디
          allowNull: true,
        },
        level: {
          // 사용자 권한 [1 : 일반회원, 2 : 비어있음, 3: 운영자, 4: 최고관리자, 5: 개발사]
          type: DataTypes.INTEGER,
          allowNull: false, //
          defaultValue: 1,
        },
        secret: {
          type: DataTypes.STRING(10),
          allowNull: true,
          defaultValue: null,
        },
        terms: {
          // 이용약관동의
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        // 관리자 메뉴 권환 제어
        menuRight1: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight2: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight3: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight4: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight5: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight6: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight7: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight8: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight9: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight10: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight11: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight12: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isExit: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        exitedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
