export const getLifetimes = () => {
  return {
    lifetimes: {
      attached() {
        const watchLangId = getApp().globalData.watchLang.watch(
          (globalData) => {
            this.setData(globalData);
          },
        );
        this.setData({ watchLangId });
      },
      detached() {
        getApp().globalData.watchLang.unload(this.data.watchLangId);
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
