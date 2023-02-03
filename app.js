import updateManager from './common/updateManager';
import checkVersion from './common/checkVersion';

// 初始化多语言
import {
  initI18n
} from './i18n/core/index';
import {
  locals
} from './i18n/language/index';
import WatchLang from './i18n/core/app';
const i18n = initI18n({
  locals,
  lang: 'zh'
});

App({
  globalData: {},
  onLaunch: function () {
    new WatchLang(this, i18n);
  },

  onShow: function () {
    checkVersion();
    updateManager();
  },
});