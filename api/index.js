export const goodsDetails = () => {
  return {
    images: [
      'https://p1.meituan.net/waimaipoi/c38342a5c665f1c6d9bd154d93d16d69690310.png',
      'https://p0.meituan.net/waimaipoi/ffbb64e08ebdf619929504ce2b74e113695983.png',
    ],
    id: 1,
    actualCouponPrice: 11.1, //	实际价格
    costCouponPrice: 12.1, //	原价		true
    couponCategory: 2, //	劵分类：1.单劵，2.套餐劵		false
    couponName: '沪上阿姨鲜果茶(田寮店)', //	劵名称		true
    couponType: 1, //	劵类型：1.平台 2.店铺		true
    couponValidEnd: '', //	优惠劵有效期结束日期		true
    couponValidStart: '', //	优惠劵有效期开始日期		true
    couponVoucher: '', //	套餐劵包含内容		false
    lableList: [], //标签ID列表		false
    notUseEnd: '', //	不可用结束时间		true
    notUseExplain: '', //	不可用信息说明		false
    notUseStart: '', //	不可用开始时间		true
    sendNum: '', //	劵数量,如果为null表示不限量发放		true
    storeId: '2', //	店铺ID		false
    useDate: '', //	使用时间		true
    useRange: '', //	使用范围		true
    useRule: '', //	使用规则		false
    useRuleExplain: '', //	使用规则说明		false
    fileUrl:
      'https://p1.meituan.net/waimaipoi/c38342a5c665f1c6d9bd154d93d16d69690310.png',
  };
};
