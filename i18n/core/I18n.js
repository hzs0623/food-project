class I18nRuntimeBase {
  constructor({ locals = {}, strageKey = 'lang', defaultLang } = {}) {
    this.strageKey = strageKey;
    this.locals = locals;
    this.lang = '';
    this.updateCallback = [];
    this.setLang(defaultLang);
  }

  //设置语言
  setLang(lang) {
    if (!lang || this.lang === lang) return;
    this.lang = lang;
    wx.setStorageSync(this.strageKey, lang);
    this.updateCallback.forEach((fn) => fn(lang));
    return lang;
  }

  //获取语言设置
  getLang() {
    try {
      if (!this.lang) {
        this.lang = wx.getStorageSync(this.strageKey);
      }
      return this.lang;
    } catch (e) {}
  }

  //获取当前语言下的资源文件
  getLanguage() {
    const languages = this.locals[this.getLang()] || {};
    return languages;
  }

  /**
   * 监听多语言改变
   * @param fn[function]: 触发回调方法
   */
  watch(fn) {
    const id = this.updateCallback.push(fn);
    return id - 1;
  }

  // 卸载
  unWatch(id) {
    id && this.updateCallback.splice(id, 1);
  }
}

export default I18nRuntimeBase;
