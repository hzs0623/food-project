const innerGlobals = {
  i18nInstance: null,
};

class I18nRuntimeBase {
  constructor({ locals = {}, strageKey = 'lang', defaultLang } = {}) {
    this.strageKey = strageKey;
    this.locals = locals;
    this.defaultLang = defaultLang || 'zh';
    this.lang = this.setLang(this.defaultLang);
  }

  //设置语言
  setLang(lang) {
    if (this.lang === lang) return;
    try {
      wx.setStorageSync(this.strageKey, lang);
      return lang;
    } catch (e) {}
  }

  //获取语言设置
  getLang() {
    try {
      if (!this.lang) {
        this.lang = wx.getStorageSync(this.strageKey);
      }
      return this.lang || this.defaultLang;
    } catch (e) {}
  }

  //获取当前语言下的资源文件
  getLanguage() {
    const lang = this.getLang();
    const languages = this.locals[lang] || {};
    return languages;
  }

  t(key) {
    const data = this.getLanguage();
    return data[key];
  }
}

// app.js 初始化方法
export function initI18n({ locals, lang }) {
  innerGlobals.i18nInstance = new I18nRuntimeBase({
    locals,
    defaultLang: lang,
  });
  return innerGlobals.i18nInstance;
}

export const I18n = Behavior(
  (() => {
    const behaviorHooks = {
      lifetimes: {
        attached() {
          if (!innerGlobals.i18nInstance) return;
          const language = innerGlobals.i18nInstance.getLanguage();
          this.setData({
            lang: language || {},
          });
        },
        detached() {},
      },
      methods: {
        t(key) {
          if (!innerGlobals.i18nInstance) return;
          return innerGlobals.i18nInstance.t(key);
        },
        setLocale(locale) {
          if (!innerGlobals.i18nInstance) return;
          innerGlobals.i18nInstance.setLang(locale);
        },
        getLocale() {
          if (!innerGlobals.i18nInstance) return;
          return innerGlobals.i18nInstance.getLang(locale);
        },
      },
    };
    return behaviorHooks;
  })(),
);

export const getI18nInstance = () => {
  return innerGlobals.i18nInstance;
};
