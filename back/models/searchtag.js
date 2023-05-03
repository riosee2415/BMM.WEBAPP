const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class SearchTag extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "SearchTag",
        tableName: "searchTag",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
