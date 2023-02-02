import I18nRuntimeBase from './I18n';

const innerGlobals = {
  i18nInstance: null,
};

// app.js 初始化方法
export function initI18n({ locals, lang }) {
  innerGlobals.i18nInstance = new I18nRuntimeBase({
    locals,
    defaultLang: lang,
  });
  return innerGlobals.i18nInstance;
}

// Compoent多语言
export const I18n = Behavior(
  (() => {
    const behaviorHooks = {
      lifetimes: {
        attached() {
          if (!innerGlobals.i18nInstance) return;

          const getLang = () => {
            this.setData({
              // 设置到全局值， 直接获取lang即可
              lang: innerGlobals.i18nInstance.getLanguage(),
            });
          };

          const langId = innerGlobals.i18nInstance.updateLang(() => {
            getLang();
          });
          this.setData({ langId });
          getLang();
        },
        // 销毁
        detached() {
          innerGlobals.i18nInstance.detached(this.data.langId);
        },
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

// Page多语言
export const I18nPage = (pageObject = {}) => {
  const hooks = {
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
    _getLang() {
      if (!innerGlobals.i18nInstance) return;
      return innerGlobals.i18nInstance.getLanguage();
    },
  };
  return Page(Object.assign({}, pageObject, hooks));
};

// js多语言
export const getI18nInstance = () => {
  return innerGlobals.i18nInstance;
};
