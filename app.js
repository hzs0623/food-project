import updateManager from './common/updateManager';

// 初始化多语言
import { initI18n } from './i18n/core/index';
import { locals } from './i18n/language/index';
initI18n({ locals, lang: 'zh' });

App({
  globalData: {
    reverse: false,
  },
  onLaunch: function () {},
  onShow: function () {
    updateManager();
  },
});
