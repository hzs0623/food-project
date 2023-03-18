import Toast from 'tdesign-miniprogram/toast/index';

const shortageImg =
  'https://cdn-we-retail.ym.tencent.com/miniapp/cart/shortage.png';

Component({
  isSpecsTap: false, // 标记本次点击事件是否因为点击specs触发（由于底层goods-card组件没有catch specs点击事件，只能在此处加状态来避免点击specs时触发跳转商品详情）
  externalClasses: ['wr-class'],
  properties: {
    storeGoods: {
      type: Array,
      observer(storeGoods) {
        this.setData({ _storeGoods: storeGoods });
      },
    },
    invalidGoodItems: {
      type: Array,
      observer(invalidGoodItems) {
        invalidGoodItems.forEach((goods) => {
          goods.specs = goods.specInfo.map((item) => item.specValue); // 目前仅展示商品已选规格的值
        });
        this.setData({ _invalidGoodItems: invalidGoodItems });
      },
    },
    thumbWidth: { type: null },
    thumbHeight: { type: null },
  },

  data: {
    shortageImg,
    currentGoods: {},
    isShowToggle: false,
    _storeGoods: [],
    _invalidGoodItems: [],
  },

  methods: {
    // 删除商品
    deleteGoods(e) {
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('delete', { goods });
    },

    // 清空失效商品
    clearInvalidGoods() {
      this.triggerEvent('clearinvalidgoods');
    },

    // 选中商品
    selectGoods(e) {
      const { goods, index } = e.currentTarget.dataset;
      const isSelected = !goods.isSelected;
      this.triggerEvent('selectgoods', {
        goods,
        index,
        isSelected,
      });
    },

    changeQuantity(num, goods) {
      this.triggerEvent('changequantity', {
        goods,
        quantity: num,
      });
    },
    changeStepper(e) {
      const { value } = e.detail;
      const { goods } = e.currentTarget.dataset;
      let num = value;
      if (value > goods.stack) {
        num = goods.stack;
      }
      this.changeQuantity(num, goods);
    },

    input(e) {
      const { value } = e.detail;
      const { goods } = e.currentTarget.dataset;
      const num = value;
      this.changeQuantity(num, goods);
    },

    overlimit(e) {
      const text =
        e.detail.type === 'minus'
          ? '该商品数量不能减少了哦'
          : '同一商品最多购买999件';
      Toast({
        context: this,
        selector: '#t-toast',
        message: text,
      });
    },

    // 展开/收起切换
    showToggle() {
      this.setData({
        isShowToggle: !this.data.isShowToggle,
      });
    },

    // 展示规格popup
    specsTap(e) {
      this.isSpecsTap = true;
      const { goods } = e.currentTarget.dataset;
      this.setData({
        currentGoods: goods,
      });
    },

    goGoodsDetail(e) {
      if (this.isSpecsTap) {
        this.isSpecsTap = false;
        return;
      }
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('goodsclick', { goods });
    },

    gotoCoupons() {
      wx.navigateTo({ url: '/pages/coupon/coupon-list/index' });
    },
  },
});
