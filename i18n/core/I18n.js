class I18nRuntimeBase {
  constructor({ locals = {}, strageKey = 'lang', defaultLang } = {}) {
    this.strageKey = strageKey;
    this.locals = locals;
    this.defaultLang = defaultLang || 'zh';
    this.lang = this.setLang(this.defaultLang);

    this.updateCallback = [];
  }

  //设置语言
  setLang(lang) {
    if (this.lang === lang) return;
    this.lang = lang;
    try {
      wx.setStorageSync(this.strageKey, lang);
      this.updateCallback.forEach((fn) => fn(lang));
      return lang;
    } catch (e) {}
  }

  updateLang(fn) {
    this.updateCallback.push(fn);
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

export default I18nRuntimeBase;
