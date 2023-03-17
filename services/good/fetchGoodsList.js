/* eslint-disable no-param-reassign */
import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodsList(params) {
  const { delay } = require('../_utils/delay');
  const { getSearchResult } = require('../../model/search');

  const data = getSearchResult(params);

  if (data.spuList.length) {
    data.spuList.forEach((item) => {
      item.spuId = item.spuId;
      item.thumb = item.fileUrl;
      item.title = item.title;
      item.price = item.actualCouponPrice;
      item.originPrice = item.costCouponPrice;
      item.desc = '';
      if (item.spuTagList) {
        item.tags = item.spuTagList.map((tag) => tag.title);
      } else {
        item.tags = [];
      }
    });
  }
  return delay().then(() => {
    return data;
  });
}

/** 获取商品列表 */
export function fetchGoodsList(params) {
  if (config.useMock) {
    return mockFetchGoodsList(params);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
