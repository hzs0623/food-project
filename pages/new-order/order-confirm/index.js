import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    totalSalePrice: 0, // 总价格
    selectList: [], // 列表数据
    dialogShow: false,
    loading: false,
    totalGoodsCount: 0, // 数量
    totalPayAmount: 0, // 最终购买价格
    settleType: 0, // 状态
    textareaContent: '',
  },

  onLoad(options) {
    this.handleOptionsParams(options);
  },
  onShow() {},

  handleOptionsParams(options) {
    let selectList = [],
      totalSalePrice = 0,
      totalGoodsCount = 0;

    if (options.type === 'cart') {
      // 从购物车跳转过来时，获取传入的商品列表数据
      const goodsRequestListJson = wx.getStorageSync('order.selectList');
      selectList = JSON.parse(goodsRequestListJson);
    } else if (typeof options.selectList === 'string') {
      selectList = JSON.parse(options.selectList);
    }

    selectList.forEach((item) => {
      const { quantity = 1 } = item;
      totalGoodsCount += quantity;
      totalSalePrice += item.actualCouponPrice * quantity; // 总价格
    });

    this.setData({
      selectList,
      totalSalePrice,
      totalGoodsCount,
      totalPayAmount: totalSalePrice,
      settleType: 1,
    });
  },

  onNotes() {
    // 添加备注信息
    this.setData({
      dialogShow: true,
    });
  },

  onNoteCancel() {
    this.setData({
      dialogShow: false,
    });
  },
  onNoteConfirm(e) {
    this.setData({
      dialogShow: false,
    });
  },

  submitOrder() {
    // 调用支付接口
    console.log(this.data.selectList);

    Toast({
      context: this,
      selector: '#t-toast',
      message: '支付失败，返回',
      duration: 2000,
      icon: '',
    });
    setTimeout(() => {
      // 提交支付失败  返回上一个页面
      wx.navigateBack();
    }, 2000);
  },
});
