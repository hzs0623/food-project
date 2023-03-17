import { getGoodsList } from './goods';

export function getPromotion(baseID = 0, length = 10) {
  return {
    list: getGoodsList(baseID, length).map((item) => {
      return {
        spuId: item.spuId,
        thumb: item.fileUrl,
        title: item.title,
        price: item.actualCouponPrice,
        originPrice: item.costCouponPrice,
        tags: item.spuTagList.map((tag) => ({ title: tag.title })),
      };
    }),
    banner:
      'https://cdn-we-retail.ym.tencent.com/tsr/promotion/banner-promotion.png',
    time: 1000 * 60 * 60 * 20,
    showBannerDesc: true,
    statusTag: 'running',
  };
}
