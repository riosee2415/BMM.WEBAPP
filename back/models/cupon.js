const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Cupon extends Model {
  static init(sequelize) {
    return super.init(
      {
        cuponNumber: {
          // 10자리 임의
          type: DataTypes.STRING(50),
          allowNull: false, // 필수
          unique: true,
        },
        title: {
          type: DataTypes.STRING(300),
          allowNull: false, // 필수
        },
        description: {
          type: DataTypes.STRING(1000),
          allowNull: false, // 필수
        },
        limitDate: {
          type: DataTypes.DATE,
          allowNull: false, // 필수
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true, // 필수
        },
        minimunPay: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
          defaultValue: 0,
        },
        discountPay: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
          defaultValue: 0,
        },
      },
      {
        modelName: "Cupon",
        tableName: "cupon",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
