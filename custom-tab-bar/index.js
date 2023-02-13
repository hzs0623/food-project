import { I18n } from '../i18n/core/index';

const listData = [
  {
    icon: 'home',
    // text: '首页',
    url: 'pages/home/home',
  },
  {
    icon: 'cart',
    // text: '购物车',
    url: 'pages/cart/index',
  },
  {
    icon: 'person',
    // text: '个人中心',
    url: 'pages/usercenter/index',
  },
];

Component({
  behaviors: [I18n],
  data: {
    active: 0,
    list: [],
  },

  attached() {
    this._watchLanuage();
  },

  methods: {
    onChange(event) {
      this.setData({ active: event.detail.value });
      wx.switchTab({
        url: this.data.list[event.detail.value].url.startsWith('/')
          ? this.data.list[event.detail.value].url
          : `/${this.data.list[event.detail.value].url}`,
      });
    },

    _watchLanuage() {
      const list = JSON.parse(JSON.stringify(listData));
      if (this.data.reverse) {
        this.setData({
          list: list.reverse(),
          active: list.length - 1,
        });
      } else {
        this.setData({
          list,
          active: 0,
        });
      }
    },

    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = this.data.list.findIndex(
        (item) =>
          (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
          `${route}`,
      );
      this.setData({ active });
    },
  },
});
