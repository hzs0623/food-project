import Toast from 'tdesign-miniprogram/toast/index';
import { goodsDetails } from '../../../api/index';
import { I18nPage } from '../../../i18n/core/index';
import { obj2Params } from '../../../utils/util';

I18nPage({
  data: {
    activityList: [], // 标签
    details: {},
    jumpArray: [
      // 底部icon
      {
        title: '首页',
        url: '/pages/home/home',
        iconName: 'home',
      },
      {
        title: '购物车',
        url: '/pages/cart/index',
        iconName: 'cart',
        showCartNum: true,
      },
    ],
    isStock: true, // 还在售
    soldout: false, // 下架状态
    cartNum: 10,
    buttonType: 1, // 加入购物车类型
    buyNum: 1, // 购买数量
    fileUrl: '', // 快加车图片
    isSpuSelectPopupShow: false, // 控制快加车弹框标识
    buyType: 0,
    outOperateStatus: false, // 是否外层加入购物车

    costCouponPrice: 0,
    actualCouponPrice: 0,
    id: '',
    soldNum: 0, // 已售数量

    navigation: { type: 'fraction' },
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,
  },

  handlePopupHide() {
    this.setData({ isSpuSelectPopupShow: false });
  },

  showSkuSelectPopup(type) {
    this.setData({
      buyType: type || 0,
      outOperateStatus: type >= 1,
      isSpuSelectPopupShow: true,
    });
  },

  buyItNow() {
    this.showSkuSelectPopup(1);
  },

  toAddCart() {
    this.showSkuSelectPopup(2);
  },

  toNav(e) {
    const { url } = e.detail;
    wx.switchTab({
      url: url,
    });
  },

  // 快加车选择
  chooseSpecItem(e) {
    console.log(e);
  },

  addCart() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
      icon: '',
      duration: 1000,
    });
  },

  gotoBuy(type) {
    const { buyNum } = this.data;

    this.handlePopupHide();
    const query = {
      quantity: buyNum,
      storeId: this.data.details.storeId,
      title: this.data.details.couponName,
      price: this.data.details.actualCouponPrice,
      fileUrl: this.data.details.fileUrl,
      id: this.data.details.id,
    };
    const urlQueryStr = obj2Params({
      selectList: JSON.stringify([query]),
    });
    const url = `/pages/order/order-confirm/index${
      urlQueryStr ? `?${urlQueryStr}` : ''
    }`;
    wx.navigateTo({ url });
  },

  specsConfirm() {
    const { buyType } = this.data;
    if (buyType === 1) {
      this.gotoBuy();
    } else {
      this.addCart();
    }
    // this.handlePopupHide();
  },

  changeNum(e) {
    this.setData({
      buyNum: e.detail.buyNum,
    });
  },

  async getDetail(id) {
    const activityList = [
      { tag: '满减', id: 1 },
      { tag: '优惠', id: 2 },
    ];

    const details = await goodsDetails(id);

    const {
      fileUrl,
      isPutOnSale,
      actualCouponPrice,
      costCouponPrice,
      soldNum,
    } = details;

    this.setData({
      details,
      activityList,
      costCouponPrice: costCouponPrice ? parseInt(costCouponPrice) : 0,
      actualCouponPrice: actualCouponPrice ? parseInt(actualCouponPrice) : 0,
      fileUrl,
      isStock: true, //是否还在售
      soldout: false,
      soldNum, // 已售数量
    });
  },

  onLoad(query) {
    const { id } = query;
    this.setData({ id: id });
    this.getDetail(id);
  },
});
