const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 회원 등급
module.exports = class UserGrade extends Model {
  static init(sequelize) {
    return super.init(
      {
        gradeName: {
          type: DataTypes.STRING(50), // 회원 등급 [ 1. 실버 | 2. 골드 | 3. 플레티넘 | 4. 다이아몬드 ]
          allowNull: false,
        },
        condition: {
          type: DataTypes.INTEGER, // 조건 Ex) 0, 5, 10 등
          allowNull: false,
        },
        benefit: {
          type: DataTypes.INTEGER, // 혜택 Ex) 3, 5, 10 (퍼센트 입니다.)
          allowNull: false,
        },
      },
      {
        modelName: "UserGrade",
        tableName: "userGrade",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
