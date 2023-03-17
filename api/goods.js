import http from './http';

const cateListMock = [
  'https://p0.meituan.net/wmbanner/c6213db2a0bbc6b7342074e9eb51ca4a12844.png',
  'https://p0.meituan.net/wmbanner/8934983cf94fee9b898ffb66316d312d6588.png',
  'https://p0.meituan.net/wmbanner/931b4bfa92a37d0f8c42b846f7d7c3b310738.png',
  'https://p0.meituan.net/wmbanner/84154e5477cc35b12d0e31d55924edb916525.png',
  'https://p1.meituan.net/wmbanner/f00b85ea857955357718c0120e39eda613072.png',
  'https://p0.meituan.net/wmbanner/a21e2929ba2fa539323ef830260e9fd214345.png',
  'https://p1.meituan.net/wmbanner/fee33972115b6dbc8f0450c9c015712b16444.png',
  'https://p1.meituan.net/wmbanner/f00b85ea857955357718c0120e39eda613072.png',
];

const isReverse = () => getApp().globalData.reverse;

export const getCateList = async (data = {}) => {
  const { data: list } = await http({
    url: '/category/list',
    method: 'post',
    data,
  });
  const curlist = list.map((item, index) => {
    return {
      ...item,
      name: item.categoryName || item.wcategoryName,
      img: cateListMock[index] || '',
    };
  });

  return isReverse ? curlist.reverse() : curlist;
};

export const getHomeSwipre = async ({ type = 1 } = {}) => {
  const { data: list = [] } = await http({
    url: '/slideshow/list',
    method: 'post',
    data: { type },
  });

  const listImg = [
    `https://p1.meituan.net/wmbanner/2700e2ab1b3f298046dc16718ade6ec3128659.gif@602w`,
    `https://p0.meituan.net/wmbanner/0acea4ba5704d56f13d78ad175b2cc5538158.png@602w`,
  ];

  list.forEach((item, i) => {
    item.fileUrl = (listImg[i] && listImg[i]) || listImg[0];
  });

  return isReverse ? list.reverse() : list;
};
