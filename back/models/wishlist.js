const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class WishList extends Model {
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
        modelName: "WishList",
        tableName: "wishList",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.WishList.belongsTo(db.User);
  }
};
