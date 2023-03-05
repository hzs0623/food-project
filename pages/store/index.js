Page({
  data: {
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
    themeColor: '#ff5d0c',

    list: [
      {
        title: 'test1',
        desc: '一些内容',
        image: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png',
      },
      {
        title: 'test2',
        desc: '一些内容',
        image: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png',
      },
    ],
  },

  onLoad() {},

  onShow() {},

  handleSkip() {
    // console.log(data);
    wx.navigateTo({
      url: `/pages/store-detail/index`,
    });
  },
});
