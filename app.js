import updateManager from './common/updateManager';

// 初始化多语言
import { initI18n } from './i18n/core/index';
import { locals } from './i18n/language/index';
const i18n = initI18n({ locals, lang: 'uly' });

App({
  globalData: {
    reverse: false,
    lang: {}, // 多语言信息
  },
  onLaunch: function () {
    i18n.updateLang(() => {
      this.updateLanguage();
    });
    this.updateLanguage();
  },
  updateLanguage() {
    this.globalData.reverse = i18n.getLang() === 'uly';
    this.globalData.lang = i18n.getLanguage(); //根据当前系统语言获取对应文本
  },

  onShow: function () {
    updateManager();
  },
});
