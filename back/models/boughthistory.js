const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BoughtHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        price: {
          type: DataTypes.INTEGER, // 할인이 들어가지 않은 원래 가격
          allowNull: false,
          defaultValue: 0,
        },
        totalPrice: {
          type: DataTypes.INTEGER, // 할인 및 금액계산이 모두 포함된 가격
          allowNull: false,
          defaultValue: 0,
        },
        totalWeight: {
          type: DataTypes.FLOAT, // 총 무게 (19.5) KG 단위 (각각 무게는 wishItem에 있음)
          allowNull: false,
        },
        totalDeliveryPrice: {
          type: DataTypes.INTEGER, // 총 배송비
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(50), // 수령인 이름
          allowNull: false,
        },
        englishName: {
          type: DataTypes.STRING(50), // 수령인 영문이름
          allowNull: false,
        },
        clearanceNum: {
          type: DataTypes.STRING(50), // 개인통관고유부호
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100), // 이메일
          allowNull: false,
        },
        tel: {
          type: DataTypes.STRING(50), // 연락처
          allowNull: false,
        },
        postCode: {
          type: DataTypes.STRING(10), // 우편번호
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(300), // 주소
          allowNull: false,
        },
        detailAddress: {
          type: DataTypes.STRING(500), // 상세 주소
          allowNull: false,
        },
        deliveryMessage: {
          type: DataTypes.STRING(1000), // 배송 메시지
          allowNull: false,
        },
        useCoupon: {
          type: DataTypes.BOOLEAN, // 쿠폰 사용 여부
          allowNull: false,
          defaultValue: false,
        },
        couponPrice: {
          type: DataTypes.INTEGER, // 쿠폰 사용 금액
          allowNull: false,
          defaultValue: 0,
        },
        CouponId: {
          type: DataTypes.INTEGER, // 사용한 쿠폰 id값
          allowNull: true,
        },
        usePoint: {
          type: DataTypes.BOOLEAN, // 포인트 사용 여부
          allowNull: false,
          defaultValue: false,
        },
        pointPrice: {
          type: DataTypes.INTEGER, // 포인트 사용 금액
          allowNull: false,
          defaultValue: 0,
        },
        payWay: {
          type: DataTypes.STRING(50), // 결제 방식
          allowNull: false,
        },
        cardBankInfo: {
          type: DataTypes.STRING(50), // 카드 은행사 정보
          allowNull: true,
        },
        cardInstallment: {
          type: DataTypes.STRING(100), // 카드결제 할부정보 (일시불, 2개월 ....)
          allowNull: true,
        },
        userDiscountPrice: {
          type: DataTypes.INTEGER, // 회원 할인 금액
          allowNull: false,
          defaultValue: 0,
        },
        deliveryCom: {
          type: DataTypes.STRING(100), // 배송사
          allowNull: true,
        },
        deliveryNum: {
          type: DataTypes.STRING(100), // 송장번호
          allowNull: true,
        },
        isComplete: {
          type: DataTypes.BOOLEAN, // 처리 완료 여부
          allowNull: false,
          defaultValue: false,
        },
        completedAt: {
          type: DataTypes.DATE, // 처리 완료일
          allowNull: true,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        isCanBoughtCancel: {
          type: DataTypes.BOOLEAN, // 결제 취소 가능 여부 (배송 전 / 후)
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "BoughtHistory",
        tableName: "boughtHistory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BoughtHistory.belongsTo(db.User);
  }
};
