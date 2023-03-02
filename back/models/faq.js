const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Faq extends Model {
  static init(sequelize) {
    return super.init(
      {
        question: {
          type: DataTypes.STRING(500),
          allowNull: false, // 필수
        },

        answer: {
          type: DataTypes.TEXT,
          allowNull: false, // 필수
        },

        updator: {
          type: DataTypes.INTEGER,
          allowNull: true, // 필수
        },

        isDelete: {
          type: DataTypes.TINYINT,
          allowNull: false, // 필수
          defaultValue: false,
        },

        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true, // 필수
        },
      },
      {
        modelName: "Faq",
        tableName: "faq",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Faq.belongsTo(db.FaqType);
  }
};
