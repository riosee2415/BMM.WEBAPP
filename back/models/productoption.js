const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 상품옵션
module.exports = class ProductOption extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(300), // 옵션명
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER, // 옵션가격
          allowNull: false,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        isDelete: {
          type: DataTypes.BOOLEAN, // 삭제 여부
          allowNull: false,
          defaultValue: false,
        },
        deletedAt: {
          type: DataTypes.DATE, // 삭제일
          allowNull: true,
        },
      },
      {
        modelName: "ProductOption",
        tableName: "productOption",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductOption.belongsTo(db.Product);
  }
};
