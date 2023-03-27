const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Question extends Model {
  static init(sequelize) {
    return super.init(
      {
        userLoginId: {
          type: DataTypes.STRING(50), // 아이디
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(50), // 이름
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(200), // 제목
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT, // 내용
          allowNull: false,
        },
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        completedAt: {
          type: DataTypes.DATE,
          allowNull: true,
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
        modelName: "Question",
        tableName: "questions",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Question.belongsTo(db.User);
  }
};
