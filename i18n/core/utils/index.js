export const getLifetimes = () => {
  return {
    lifetimes: {
      attached() {
        const app = getApp();
        if (!app.globalData.watchLanguage) {
          return console.warn('依赖watch没有添加');
        }
        app.globalData.watchLanguage((globalData) => {
          this.setData(globalData);
        });
      },
    },
  };
};

export const getLanguageMehods = (innerGlobals) => {
  return {
    setLocale(locale) {
      if (!innerGlobals.i18nInstance) return;
      innerGlobals.i18nInstance.setLang(locale);
    },
    getLocale() {
      if (!innerGlobals.i18nInstance) return;
      return innerGlobals.i18nInstance.getLang(locale);
    },
  };
};
