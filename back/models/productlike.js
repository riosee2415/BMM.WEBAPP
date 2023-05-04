const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 상품 좋아요
module.exports = class ProductLike extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "ProductLike",
        tableName: "productLike",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductLike.belongsTo(db.User);
    db.ProductLike.belongsTo(db.Product);
  }
};
