const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class CateDown extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          // 10자리 임의
          type: DataTypes.STRING(50),
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
      },
      {
        modelName: "CateDown",
        tableName: "cateDown",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.CateDown.belongsTo(db.CateUp);
  }
};
