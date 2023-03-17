import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
  const { delay } = require('../_utils/delay');
  const { getGoodsList } = require('../../model/goods');
  return delay().then(() =>
    getGoodsList(pageIndex, pageSize).map((item) => {
      return {
        spuId: item.spuId,
        thumb: item.fileUrl,
        title: item.title,
        price: item.actualCouponPrice,
        originPrice: item.costCouponPrice,
        tags: item.spuTagList.map((tag) => tag.title),
      };
    }),
  );
}

/** 获取商品列表 */
export function fetchGoodsList(pageIndex = 1, pageSize = 20) {
  if (config.useMock) {
    return mockFetchGoodsList(pageIndex, pageSize);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
