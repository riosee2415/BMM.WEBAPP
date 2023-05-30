const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class WishItem extends Model {
  static init(sequelize) {
    return super.init(
      {
        ProductId: {
          type: DataTypes.INTEGER, // 상품 아이디
          allowNull: false,
        },
        productPrice: {
          type: DataTypes.INTEGER, // 상품 가격
          allowNull: false,
          defaultValue: 0,
        },
        productDiscount: {
          type: DataTypes.FLOAT, // 상품 할인가
          allowNull: true,
        },
        productTitle: {
          type: DataTypes.STRING(300), // 상품명
          allowNull: false,
        },
        productThumbnail: {
          type: DataTypes.STRING(600), // 상품 썸네일
          allowNull: false,
        },
        productWeight: {
          type: DataTypes.FLOAT, // 상품 무게
          allowNull: false,
        },
        optionName: {
          type: DataTypes.STRING(300), // 옵션명
          allowNull: true,
        },
        optionPrice: {
          type: DataTypes.INTEGER, // 옵션 가격
          allowNull: false,
          default: 0,
        },
        optionId: {
          type: DataTypes.INTEGER, // 옵션 아이디
          allowNull: true,
        },
        qun: {
          type: DataTypes.INTEGER, // 수량
          allowNull: false,
          defaultValue: 1,
        },
        BoughtHistoryId: {
          type: DataTypes.INTEGER, // 결제내역 아이디
          allowNull: true,
        },
        boughtDate: {
          type: DataTypes.DATE, // 주문일자
          allowNull: true,
        },
        isWrite: {
          type: DataTypes.BOOLEAN, // 리뷰 작성 여부
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "WishItem",
        tableName: "wishItem",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.WishItem.belongsTo(db.WishList);
  }
};
