import { I18nPage } from '../../i18n/core/index';
import { getCouponList } from '../../api/coupon';

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
      `https://p1.meituan.net/waimaipoi/c38342a5c665f1c6d9bd154d93d16d69690310.png`,
      `https://p0.meituan.net/waimaipoi/ffbb64e08ebdf619929504ce2b74e113695983.png`,
      `https://p1.meituan.net/waimaipoi/c38342a5c665f1c6d9bd154d93d16d69690310.png`,
      `https://p0.meituan.net/waimaipoi/ffbb64e08ebdf619929504ce2b74e113695983.png`,
      `https://p1.meituan.net/waimaipoi/c38342a5c665f1c6d9bd154d93d16d69690310.png`,
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
      const nextList = await getCouponList(pageIndex, pageSize);
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
      });
    } catch (err) {}
  },

  onTabsChange(e) {
    console.log(e.detail);

    wx.navigateTo({
      url: `/pages/store/index`,
    });
  },
});
