import { fetchGoodsList } from '../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';
import { I18nPage } from '../../i18n/core/index';

import { getCateList, getHomeSwipre } from '../../api/goods';
import { login } from '../../api/login/index';

I18nPage({
  data: {
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    navigation: {
      type: 'dots',
    },
  },

  goodListPagination: {
    index: 0,
    pageSize: 20,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.init();

    login();
  },

  // 请求下一页数据
  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      // 还有下一页数据
      this.loadGoodsList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },

  async loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });

    const [swiperList, catyList] = await Promise.all([
      getHomeSwipre(),
      getCateList({
        pageNum: 1,
        pageSize: 20,
      }),
    ]);

    this.setData({
      imgSrcs: swiperList,
      pageLoading: false,
      current: 1,
      catyList,
    });

    this.loadGoodsList(true);
  },

  // 重试
  onReTry() {
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    this.goodListPagination.pageIndex = fresh
      ? 0
      : this.goodListPagination.pageIndex + 1;
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({
      goodsListLoadStatus: 1, // 加载中
    });

    try {
      const nextList = await fetchGoodsList(
        this.goodListPagination.pageIndex,
        this.goodListPagination.pageSize,
      );
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: 0, // 请求完成
      });
    } catch (err) {
      this.setData({
        goodsListLoadStatus: 3,
      });
    }
  },

  goodListClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  goodListAddCartHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },

  navToSearchPage() {
    wx.navigateTo({
      url: '/pages/goods/search/index',
    });
  },

  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },

  // 切换多语言, 重新请求过数据
  moveClick() {
    this.setLocale(!this.data.reverse ? 'uly' : 'zh');
    this.clearData();
    this.init();
  },

  clearData() {
    this.setData({
      imgSrcs: [],
    });
  },

  selectCity(value) {
    console.log(value);
  },

  // 分类页
  skipCatePage(e) {
    console.log(e);
    const spuId = 1234;
    wx.navigateTo({
      url: `/pages/categories/index?spuId=${spuId}`,
    });
  },
});
