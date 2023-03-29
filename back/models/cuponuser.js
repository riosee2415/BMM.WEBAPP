const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class CuponUser extends Model {
  static init(sequelize) {
    return super.init(
      {
        isUse: {
          type: DataTypes.BOOLEAN,
          allowNull: false, // 필수
          defaultValue: false,
        },

        usedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "CuponUser",
        tableName: "cuponuser",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.CuponUser.belongsTo(db.User);
    db.CuponUser.belongsTo(db.Cupon);
  }
};
