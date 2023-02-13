import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodCategory() {
  const { delay } = require('../_utils/delay');
  const { getCategoryList } = require('../../model/category');
  return delay().then(() => getCategoryList());
}

/** 获取商品列表 */
export function getCategoryList() {
  if (config.useMock) {
    return mockFetchGoodCategory();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}

export function getCategoryListData() {
  if (config.useMock) {
    const { getCategoryListData } = require('../../model/category');
    return getCategoryListData();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
