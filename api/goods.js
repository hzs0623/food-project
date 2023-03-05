import http from './http';

const cateListMock = [
  {
    groupId: '249480',
    name: '卫衣',
    thumbnail: 'https://cdn-we-retail.ym.tencent.com/tsr/classify/img-1.png',
  },
  {
    groupId: '249480',
    name: '毛呢外套',
    thumbnail: 'https://cdn-we-retail.ym.tencent.com/tsr/classify/img-2.png',
  },
  {
    groupId: '249480',
    name: '雪纺衫',
    thumbnail: 'https://cdn-we-retail.ym.tencent.com/tsr/classify/img-3.png',
  },
  {
    groupId: '249480',
    name: '羽绒服',
    thumbnail: 'https://cdn-we-retail.ym.tencent.com/tsr/classify/img-4.png',
  },
  {
    groupId: '249480',
    name: '毛衣',
    thumbnail: 'https://cdn-we-retail.ym.tencent.com/tsr/classify/img-5.png',
  },
  {
    groupId: '249480',
    name: '棉衣',
    thumbnail: 'https://cdn-we-retail.ym.tencent.com/tsr/classify/img-6.png',
  },
  {
    groupId: '249480',
    name: '西装',
    thumbnail: 'https://cdn-we-retail.ym.tencent.com/tsr/classify/img-7.png',
  },
  {
    groupId: '249480',
    name: '马甲',
    thumbnail: 'https://cdn-we-retail.ym.tencent.com/tsr/classify/img-8.png',
  },
  {
    groupId: '249480',
    name: '连衣裙',
    thumbnail: 'https://cdn-we-retail.ym.tencent.com/tsr/classify/img-9.png',
  },
  {
    groupId: '249480',
    name: '半身裙',
    thumbnail: 'https://cdn-we-retail.ym.tencent.com/tsr/classify/img-10.png',
  },
  {
    groupId: '249480',
    name: '裤子',
    thumbnail: 'https://cdn-we-retail.ym.tencent.com/tsr/classify/img-11.png',
  },
];

const swipreMock = [
  {
    fileUrl: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner2.png',
    text: '2',
  },
  {
    fileUrl: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner3.png',
    text: '3',
  },
  {
    fileUrl: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner4.png',
    text: '4',
  },
  {
    fileUrl: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner5.png',
    text: '5',
  },
  {
    fileUrl: 'https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner6.png',
    text: '6',
  },
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
      img: cateListMock[index].thumbnail,
    };
  });

  return isReverse ? curlist.reverse() : curlist;
};

export const getHomeSwipre = async ({ type = 1 } = {}) => {
  return swipreMock;
  const { data: list = [] } = await http({
    url: '/slideshow/list',
    method: 'post',
    data: { type },
  });

  return isReverse ? list.reverse() : list;
};
