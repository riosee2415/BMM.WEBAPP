const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductQuestion extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(200),
          allowNull: false, // 필수
        },
        mobile: {
          type: DataTypes.STRING(200),
          allowNull: false, // 필수
        },
        email: {
          type: DataTypes.STRING(200),
          allowNull: false, // 필수
        },
        productName: {
          type: DataTypes.STRING(200),
          allowNull: false, // 필수
        },
        productUrl: {
          type: DataTypes.STRING(200),
          allowNull: false, // 필수
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        answerdAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "ProductQuestion",
        tableName: "productQuestions",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductQuestion.belongsTo(db.User);
  }
};
