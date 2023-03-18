Component({
  data: {},
  properties: {
    item: {
      type: Object,
      value: {},
    },
  },
  methods: {
    onClick() {
      const { id, storeId } = this.properties.item;
      wx.navigateTo({
        url: `/pages/goods/details/index?id=${id}&storeId=${storeId}`,
      });
    },
  },
});
