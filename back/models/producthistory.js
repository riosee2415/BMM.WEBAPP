const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 상품 이력
module.exports = class ProductHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "ProductHistory",
        tableName: "productHistory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
