export const getLifetimes = () => {
  return {
    lifetimes: {
      attached() {
        if (!this.data.watchId) {
          const watchId = getApp().globalData.watchLanguage((globalData) => {
            this.setData(globalData);
          });
          this.setData({ watchId });
        }
      },
      detached() {
        getApp().globalData.unWatchLanguage(this.data.watchId);
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
