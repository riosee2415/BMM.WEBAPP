const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class AdvertiseBanner extends Model {
  static init(sequelize) {
    return super.init(
      {
        imagePath: {
          type: DataTypes.STRING(600),
          allowNull: false, // 필수
        },
        link: {
          type: DataTypes.STRING(600),
          allowNull: true, // 필수
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "AdvertiseBanner",
        tableName: "advertiseBanner",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
