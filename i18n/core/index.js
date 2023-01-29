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

const commonSetLang = (that) => {
  const app = getApp();
  if (!app.globalData.watchLanguage) {
    return console.warn('依赖watch没有添加');
  }
  app.globalData.watchLanguage((globalData) => {
    that.setData(globalData);
  });
};

// Compoent多语言
export const I18n = Behavior(
  (() => {
    const behaviorHooks = {
      lifetimes: {
        attached() {
          commonSetLang(this);
        },
        // 销毁
        detached() {},
      },
      methods: {
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
  const behaviors = [
    Behavior({
      // 基础库 2.9.2 开始支持
      lifetimes: {
        attached: function () {
          commonSetLang(this);
        },
        detached: function () {},
      },
    }),
  ];
  if (pageObject.behaviors) {
    behaviors.push(...pageObject.behaviors);
  }
  const hooks = {
    behaviors,
    setLocale(locale) {
      innerGlobals.i18nInstance.setLang(locale);
    },
    getLocale() {
      return innerGlobals.i18nInstance.getLang(locale);
    },
  };
  return Page(Object.assign({}, pageObject, hooks));
};

// js多语言
export const getI18nInstance = () => {
  return innerGlobals.i18nInstance;
};
