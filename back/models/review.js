const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Review extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT, // 내용
          allowNull: false,
        },
        isImageReview: {
          type: DataTypes.BOOLEAN, // 사진 리뷰 여부 (true이면 사진 여부 false라면 글 리뷰)
          allowNull: false, // 사진 리뷰 라면 사진리뷰 포인트 1번만 받을 수 있도록 (즉, 사진 리뷰-> 글 리뷰로 변경할 수 없게 하도록 하기 위해 존재하는 컬럼)
          defaultValue: false,
        },
        imagePath1: {
          type: DataTypes.STRING(600), // 이미지1
          allowNull: true,
        },
        imagePath2: {
          type: DataTypes.STRING(600), // 이미지2
          allowNull: true,
        },
        imagePath3: {
          type: DataTypes.STRING(600), // 이미지3
          allowNull: true,
        },
        imagePath4: {
          type: DataTypes.STRING(600), // 이미지4
          allowNull: true,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "Review",
        tableName: "review",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Review.belongsTo(db.Product);
    db.Review.belongsTo(db.User);
  }
};
