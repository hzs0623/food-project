import { I18nPage } from '../../i18n/core/index';
import { fetchGoodsList } from '../../services/good/fetchGoods';

I18nPage({
  data: {
    tabList: [
      { label: '久趣', value: '1234' },
      { label: '台球', value: '12334' },
      { label: '健身房', value: '12134' },
      { label: '旅游', value: '12324' },
      { label: '酒吧', value: '12324' },
      { label: 'KTV', value: '12324' },
      { label: '游泳', value: '12324' },
    ],
    images: [
      `https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png`,
      `https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png`,
      `https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png`,
      `https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png`,
      `https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png`,
    ],
    current: 0,
    duration: 500, // 切换速度ms
    interval: 5000,
    navigation: { type: 'fraction' },

    goodsList: [],
  },
  onShow() {},

  onLoad(query) {
    console.log(query, 'query');
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    const pageSize = 10;
    const pageIndex = 0;

    try {
      const nextList = await fetchGoodsList(pageIndex, pageSize);
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
      });
    } catch (err) {}
  },

  onTabsChange(e) {
    console.log(e.detail);
  },
});
