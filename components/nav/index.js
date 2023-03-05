Component({
  properties: {
    title: {
      type: String,
      value: '',
    },
    showBack: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    top: 0,
    left: 0,
    height: 0,
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      wx.getSystemInfo({
        success: (res) => {
          const ratio = 750 / res.windowWidth;
          const menuInfo = wx.getMenuButtonBoundingClientRect();
          this.setData({
            top: menuInfo.top * ratio,
            left: menuInfo.left * ratio,
            height: menuInfo.height * ratio,
          });
        },
      });
    },
  },
  methods: {
    goBack() {
      if (this.properties.showBack) {
        wx.navigateBack();
      }
    },
  },
});
