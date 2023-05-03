const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 상품
module.exports = class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        thumbnail1: {
          type: DataTypes.STRING(600), // 썸네일 1 (필수)
          allowNull: false,
        },
        thumbnail2: {
          type: DataTypes.STRING(600), // 썸네일 2 (필수 X)
          allowNull: true,
        },
        thumbnail3: {
          type: DataTypes.STRING(600), // 썸네일 3 (필수 X)
          allowNull: true,
        },
        thumbnail4: {
          type: DataTypes.STRING(600), // 썸네일 4 (필수 X)
          allowNull: true,
        },
        title: {
          type: DataTypes.STRING(300), // 이름
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(500), // 설명
          allowNull: false,
        },
        marketPrice: {
          type: DataTypes.INTEGER, // 시중가
          allowNull: false,
        },
        memberPrice: {
          type: DataTypes.INTEGER, // 시중가
          allowNull: false,
        },
        weight: {
          type: DataTypes.FLOAT, // 무게 (19.5) KG 단위
          allowNull: false,
        },
        buyMinLimitCount: {
          type: DataTypes.INTEGER, // 최소 구매제한 갯수
          allowNull: false,
        },
        buyMaxLimitCount: {
          type: DataTypes.INTEGER, // 최대 구매제한 갯수
          allowNull: false,
        },
        discount: {
          type: DataTypes.FLOAT, // 할인율
          allowNull: false,
        },
        youtubeLink: {
          type: DataTypes.STRING(600), // 유튜브링크
          allowNull: false,
        },
        detailImage: {
          type: DataTypes.STRING(600), // 상품 상세이미지
          allowNull: false,
        },
        origin: {
          type: DataTypes.STRING(100), // 원산지
          allowNull: false,
        },
        madeCompany: {
          type: DataTypes.STRING(100), // 제조사
          allowNull: false,
        },
        location: {
          type: DataTypes.STRING(300), // 소재지
          allowNull: false,
        },
        howToUse: {
          type: DataTypes.STRING(300), // 사용방법
          allowNull: false,
        },
        madeDate: {
          type: DataTypes.STRING(100), // 제조년월일 및 사용기한
          allowNull: false,
        },
        howToKeep: {
          type: DataTypes.STRING(100), // 보관방법 / 취급방법
          allowNull: false,
        },
        tel: {
          type: DataTypes.STRING(50), // 고객센터 전화번호
          allowNull: false,
        },
        warning: {
          type: DataTypes.STRING(100), // 주의사항
          allowNull: false,
        },
        canDeliveryArea: {
          type: DataTypes.TEXT, // 배송가능지역
          allowNull: false,
        },
        customInfo: {
          type: DataTypes.TEXT, // 관부가세 안내
          allowNull: false,
        },
        refundInfo: {
          type: DataTypes.TEXT, // 환불안내
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN, // 삭제 여부
          allowNull: false,
          defaultValue: false,
        },
        deletedAt: {
          type: DataTypes.DATE, // 삭제일
          allowNull: true,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        isRecommend: {
          type: DataTypes.BOOLEAN, // 추천상품 여부
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Product",
        tableName: "product",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Product.belongsTo(db.CateUp);
    db.Product.belongsTo(db.CateDown);
    db.Product.belongsTo(db.Brand);
  }
};
