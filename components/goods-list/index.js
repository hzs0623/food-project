import { I18n } from '../../i18n/core/index';

Component({
  behaviors: [I18n],
  externalClasses: ['wr-class'],

  properties: {
    goodsList: {
      type: Array,
      value: [],
    },
    id: {
      type: String,
      value: '',
      observer: (id) => {
        this.genIndependentID(id);
      },
    },
    thresholds: {
      type: Array,
      value: [],
    },
  },

  data: {
    independentID: '',
  },

  lifetimes: {
    ready() {
      this.init();
    },
  },

  methods: {
    onClickGoods(e) {
      const { index } = e.currentTarget.dataset;
      const { id, storeId } = this.properties.goodsList[index];
      wx.navigateTo({
        url: `/pages/goods/details/index?id=${id}&storeId=${storeId}`,
      });
      // this.triggerEvent('click', {
      //   ...e.detail,
      //   index,
      // });
    },

    init() {
      this.genIndependentID(this.id || '');
    },

    genIndependentID(id) {
      if (id) {
        this.setData({
          independentID: id,
        });
      } else {
        this.setData({
          independentID: `goods-list-${~~(Math.random() * 10 ** 8)}`,
        });
      }
    },
  },
});
