import updateManager from './common/updateManager';

// 初始化多语言
import { initI18n } from './i18n/core/index';
import { locals } from './i18n/language/index';
const i18n = initI18n({ locals, lang: 'uly' });

App({
  globalData: {
    reverse: false,
  },
  onLaunch: function () {
    i18n.updateLang((lang) => {
      this.globalData.reverse = lang === 'uly';
    });
    this.globalData.reverse = i18n.getLang() === 'uly';
  },
  onShow: function () {
    updateManager();
  },
});
