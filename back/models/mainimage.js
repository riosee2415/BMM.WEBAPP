const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 메인 이미지
module.exports = class MainImage extends Model {
  static init(sequelize) {
    return super.init(
      {
        imagePath: {
          type: DataTypes.STRING(600), //  이미지
          allowNull: false, // 필수
        },
        link: {
          type: DataTypes.STRING(600), // 링크
          allowNull: false,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "MainImage",
        tableName: "mainImage",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
