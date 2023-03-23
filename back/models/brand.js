const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 메인 브랜드
module.exports = class Brand extends Model {
  static init(sequelize) {
    return super.init(
      {
        imagePath: {
          type: DataTypes.STRING(600), // 브랜드 이미지
          allowNull: false, // 필수
        },
        name: {
          type: DataTypes.STRING(100), // 브랜드명
          allowNull: true, // 필수
        },
        subDesc: {
          type: DataTypes.TEXT, // 서브 설명
          allowNull: true, // 필수
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "Brand",
        tableName: "brand",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
