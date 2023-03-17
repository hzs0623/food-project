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
  let { data: list = [] } = await http({
    url: '/category/list',
    method: 'post',
    data,
  });
  if (list.length === 0) {
    list = [
      {
        id: 1,
        categoryName: '美容',
        categoryCode: 'Leval1',
        type: 1,
        crateDate: '2023-02-11 16:31:24',
        createUser: '张胜男',
        children: [
          {
            id: 2,
            categoryName: '测试修改',
            categoryCode: 'Leavl2',
            type: 1,
            parentId: 1,
            crateDate: '2023-02-11 16:32:18',
            createUser: '张胜男',
            children: [],
            wcategoryName: '测试修改',
          },
        ],
        wcategoryName: '美容',
        name: '美容',
        img: 'https://p0.meituan.net/wmbanner/c6213db2a0bbc6b7342074e9eb51ca4a12844.png',
      },
      {
        id: 3,
        categoryName: '一级分类',
        categoryCode: 'l',
        type: 1,
        crateDate: '2023-02-24 23:14:06',
        children: [
          {
            id: 4,
            categoryName: '二级分类',
            categoryCode: '2',
            type: 1,
            parentId: 3,
            crateDate: '2023-02-24 23:14:28',
            children: [
              {
                id: 5,
                categoryName: '三级分类',
                categoryCode: '3',
                type: 1,
                parentId: 4,
                crateDate: '2023-02-24 23:14:53',
                children: [],
                wcategoryName: '三级分类',
              },
            ],
            wcategoryName: '二级分类',
          },
        ],
        wcategoryName: '一级分类蒙语',
        name: '一级分类',
        img: 'https://p0.meituan.net/wmbanner/8934983cf94fee9b898ffb66316d312d6588.png',
      },
      {
        id: 6,
        categoryName: 'test',
        categoryImg: '',
        type: 1,
        crateDate: '2023-02-26 23:54:12',
        createUser: '张胜男',
        children: [
          {
            id: 12,
            categoryName: '444',
            categoryImg: '',
            type: 1,
            parentId: 6,
            crateDate: '2023-02-27 00:38:06',
            createUser: '张胜男',
            children: [],
            wcategoryName: '444',
          },
          {
            id: 13,
            categoryName: '444232',
            categoryImg: '',
            type: 1,
            parentId: 6,
            crateDate: '2023-02-27 00:39:22',
            createUser: '张胜男',
            children: [],
            wcategoryName: '444232',
          },
          {
            id: 14,
            categoryName: '44423299',
            categoryImg: '',
            type: 1,
            parentId: 6,
            crateDate: '2023-02-27 00:41:15',
            createUser: '张胜男',
            children: [],
            wcategoryName: '44423299',
          },
        ],
        wcategoryName: 'test',
        name: 'test',
        img: 'https://p0.meituan.net/wmbanner/931b4bfa92a37d0f8c42b846f7d7c3b310738.png',
      },
      {
        id: 7,
        categoryName: 'test111',
        categoryImg: '',
        type: 1,
        crateDate: '2023-02-27 00:14:47',
        createUser: '张胜男',
        children: [
          {
            id: 17,
            categoryName: '4554',
            categoryImg: 'Snipaste_2023-02-26_23-16-03_20232327232327.png',
            type: 1,
            parentId: 7,
            crateDate: '2023-02-27 23:23:27',
            createUser: '张胜男',
            children: [],
            wcategoryName: '4554',
          },
        ],
        wcategoryName: 'test111',
        name: 'test111',
        img: 'https://p0.meituan.net/wmbanner/84154e5477cc35b12d0e31d55924edb916525.png',
      },
      {
        id: 8,
        categoryName: 'tttt',
        categoryImg: '',
        type: 1,
        crateDate: '2023-02-27 00:23:53',
        createUser: '张胜男',
        children: [],
        wcategoryName: 'tttt',
        name: 'tttt',
        img: 'https://p1.meituan.net/wmbanner/f00b85ea857955357718c0120e39eda613072.png',
      },
      {
        id: 9,
        categoryName: 'tttt333',
        categoryImg: '',
        type: 2,
        crateDate: '2023-02-27 00:24:34',
        createUser: '张胜男',
        children: [
          {
            id: 10,
            categoryName: 'ttttt',
            categoryImg: '',
            type: 1,
            parentId: 9,
            crateDate: '2023-02-27 00:25:58',
            createUser: '张胜男',
            children: [],
            wcategoryName: 'ttttt',
          },
          {
            id: 11,
            categoryName: 'ttttt77',
            categoryImg: '',
            type: 2,
            parentId: 9,
            crateDate: '2023-02-27 00:26:12',
            createUser: '张胜男',
            children: [],
            wcategoryName: 'ttttt77',
          },
        ],
        wcategoryName: 'tttt333',
        name: 'tttt333',
        img: 'https://p0.meituan.net/wmbanner/a21e2929ba2fa539323ef830260e9fd214345.png',
      },
      {
        id: 15,
        categoryName: '4442329966',
        categoryImg: '',
        type: 1,
        crateDate: '2023-02-27 00:42:08',
        createUser: '张胜男',
        children: [
          {
            id: 16,
            categoryName: '3424',
            categoryImg: '',
            type: 1,
            parentId: 15,
            crateDate: '2023-02-27 23:19:59',
            createUser: '张胜男',
            children: [],
            wcategoryName: '3424',
          },
        ],
        wcategoryName: '4442329966',
        name: '4442329966',
        img: 'https://p1.meituan.net/wmbanner/fee33972115b6dbc8f0450c9c015712b16444.png',
      },
      {
        id: 18,
        categoryName: 'tetse',
        categoryImg: '',
        type: 2,
        storeId: 1,
        crateDate: '2023-02-27 23:24:16',
        createUser: '张胜男',
        children: [],
        wcategoryName: 'tetse',
        name: 'tetse',
        img: 'https://p1.meituan.net/wmbanner/f00b85ea857955357718c0120e39eda613072.png',
      },
    ];
  }
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

  if (!list.length) {
    return [
      {
        id: 12,
        createDate: '2023-03-12 13:03:14',
        updateDate: '2023-03-12 13:03:14',
        type: 1,
        fileUrl:
          'https://p1.meituan.net/wmbanner/2700e2ab1b3f298046dc16718ade6ec3128659.gif@602w',
        status: 1,
      },
      {
        id: 13,
        createDate: '2023-03-17 21:37:59',
        updateDate: '2023-03-17 21:37:59',
        type: 1,
        fileUrl:
          'https://p0.meituan.net/wmbanner/0acea4ba5704d56f13d78ad175b2cc5538158.png@602w',
        status: 1,
      },
      {
        id: 14,
        createDate: '2023-03-17 21:38:06',
        updateDate: '2023-03-17 21:38:06',
        type: 1,
        fileUrl:
          'https://p1.meituan.net/wmbanner/2700e2ab1b3f298046dc16718ade6ec3128659.gif@602w',
        status: 1,
      },
      {
        id: 15,
        createDate: '2023-03-17 21:38:11',
        updateDate: '2023-03-17 21:38:11',
        type: 1,
        fileUrl:
          'https://p1.meituan.net/wmbanner/2700e2ab1b3f298046dc16718ade6ec3128659.gif@602w',
        status: 1,
      },
    ];
  }
  return isReverse ? list.reverse() : list;
};
