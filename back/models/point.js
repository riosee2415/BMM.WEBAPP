const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Point extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.STRING(30), // 적립 | 사용
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(300),
          allowNull: false, // 필수
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
          defaultValue: 0,
        },
      },
      {
        modelName: "Point",
        tableName: "point",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Point.belongsTo(db.User);
  }
};
