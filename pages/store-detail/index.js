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

    // 套餐列表
    comboList: [
      {
        title: '团建5-7人套餐',
        price: '345',
        image: `https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png`,
      },
      {
        title: '团建5-8人套餐',
        price: '305',
        image: `https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png`,
      },
    ],
  },
});
