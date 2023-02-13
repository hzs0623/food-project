export const getLifetimes = () => {
  return {
    lifetimes: {
      attached() {
        console.log(111);
        const watchLangId = getApp().globalData.watchLang.watch(
          (globalData) => {
            this.setData(globalData);
            if (this._watchLanuage) {
              this._watchLanuage();
            }
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
