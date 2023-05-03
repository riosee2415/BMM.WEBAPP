const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductSearchTag extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        modelName: "ProductSearchTag",
        tableName: "productSearchTag",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductSearchTag.belongsTo(db.Product);
    db.ProductSearchTag.belongsTo(db.SearchTag);
  }
};
