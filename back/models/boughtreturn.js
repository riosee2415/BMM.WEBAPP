const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 환불 신청
module.exports = class BoughtReturn extends Model {
  static init(sequelize) {
    return super.init(
      {
        receiverName: {
          type: DataTypes.STRING(50), // 수령인 이름
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50), // 이메일
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(50), // 연락처
          allowNull: false,
        },
        postCode: {
          type: DataTypes.STRING(10), // 주소 (우편번호)
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(300), // 주소 (주소)
          allowNull: false,
        },
        detailAddress: {
          type: DataTypes.STRING(500), // 주소 (상세 주소)
          allowNull: false,
        },
        imagePath1: {
          type: DataTypes.STRING(600), // 상품 이미지 1
          allowNull: false,
        },
        imagePath2: {
          type: DataTypes.STRING(600), // 상품 이미지 2
          allowNull: true,
        },
        imagePath3: {
          type: DataTypes.STRING(600), // 상품 이미지 3
          allowNull: true,
        },
        imagePath4: {
          type: DataTypes.STRING(600), // 상품 이미지 4
          allowNull: true,
        },
        reason: {
          type: DataTypes.STRING(1000), // 환불 사유 (시안상에 셀렉트 박스로 되어있음.)
          allowNull: false,
        },
        status: {
          type: DataTypes.INTEGER, // 상태 : [1. 대기중 | 2. 승인완료 | 3. 반려]
          allowNull: false,
          defaultValue: 1,
        },
        completedAt: {
          type: DataTypes.DATE, // 처리일
          allowNull: true,
        },
        rejectReason: {
          type: DataTypes.TEXT, // 반려 사유
          allowNull: true,
        },
      },
      {
        modelName: "BoughtReturn",
        tableName: "boughtReturn",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BoughtReturn.belongsTo(db.BoughtHistory);
  }
};
