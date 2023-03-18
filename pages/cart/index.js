import Dialog from 'tdesign-miniprogram/dialog/index';
import Toast from 'tdesign-miniprogram/toast/index';
// import { fetchCartGroupData } from '../../services/cart/cart';
import { getCouponList } from '../../api/coupon';

Page({
  data: {
    storeGoods: [],
    isAllSelected: false, // 全选状态
    totalAmount: 0, // 选择的总价格
    totalGoodsNum: 0, // 选择的总数量
    selectList: [], // 选择的商品
  },

  // 调用自定义tabbar的init函数，使页面与tabbar激活状态保持一致
  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.refreshData();
  },

  async refreshData() {
    const storeGoods = await getCouponList();
    this.setData({ storeGoods });
  },

  // 删除加购商品
  // 注：实际场景时应该调用接口
  deleteGoodsService({ spuId, skuId }) {
    function deleteGoods(group) {
      for (const gindex in group) {
        const goods = group[gindex];
        if (goods.spuId === spuId && goods.skuId === skuId) {
          group.splice(gindex, 1);
          return gindex;
        }
      }
      return -1;
    }
    const storeGoods = this.data.storeGoods;
    for (const store of storeGoods) {
      for (const activity of store.promotionGoodsList) {
        if (deleteGoods(activity.goodsPromotionList) > -1) {
          return Promise.resolve();
        }
      }
      if (deleteGoods(store.shortageGoodsList) > -1) {
        return Promise.resolve();
      }
    }
    return Promise.reject();
  },

  goGoodsDetail(e) {
    const { id, storeId } = e.detail.goods;
    wx.navigateTo({
      url: `/pages/goods/details/index?id=${id}&storeId=${storeId}`,
    });
  },

  onGoodsDelete(e) {
    const { goods } = e.detail;
    console.log(goods);
    Dialog.confirm({
      content: '确认删除吗?',
      confirmBtn: '确定',
      cancelBtn: '取消',
    }).then(() => {
      Toast({ context: this, selector: '#t-toast', message: '删除成功' });
      this.refreshData();
    });
  },

  onGoodsSelect(e) {
    const { goods, isSelected } = e.detail;
    const currentList = this.data.storeGoods.map((item) => {
      if (item.id === goods.id) {
        item.isSelected = isSelected;
      }
      return item;
    });
    const isAllSelected = this.data.storeGoods.every(
      (item) => item.isSelected === true,
    );
    this.setData({ storeGoods: currentList, isAllSelected });
    this.selectItems();
  },

  /* 全选 */
  onSelectAll(event) {
    const { isAllSelected } = event?.detail ?? {};
    this.setData({
      storeGoods: this.data.storeGoods.map((item) => {
        item.isSelected = !isAllSelected;
        return item;
      }),
    });
    this.selectItems();
  },

  // 计算金额
  selectItems() {
    let totalAmount = 0;
    let totalGoodsNum = 0;
    let selectList = [];
    this.data.storeGoods.forEach((item) => {
      if (item.isSelected) {
        totalAmount += item.actualCouponPrice;
        totalGoodsNum += 1;
        selectList.push(item);
      }
    });

    this.setData({ totalAmount, totalGoodsNum, selectList });
  },

  // 点击结算按钮
  onToSettle() {
    wx.setStorageSync('order.selectList', JSON.stringify(this.data.selectList));
    wx.navigateTo({ url: '/pages/new-order/order-confirm/index?type=cart' });
  },
});
