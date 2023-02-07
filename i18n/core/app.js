const watchs = [];

/* 监听全局变量变化 */
class appLang {
  constructor(app, i18n) {
    this.app = app;
    this.i18n = i18n;
    const { reverse, lang, language } = app.globalData;
    this.reverse = reverse;
    this.lang = lang; // 站点
    this.language = language; // 多语言数据

    this.init();
  }

  init() {
    const { i18n } = this;
    i18n.watchLang(() => {
      this.updateGlobalData();
    });

    // 添加全局多语言update
    this.app.globalData.watchLanguage = async (fn) => {
      const id = watchs.push(fn);
      if (watchs.length === 1) {
        // 初始化，异步等所有组件方法推入队列中
        await Promise.resolve();
        this.updateGlobalData();
      }
      return id - 1;
    };

    // 卸载监听
    this.app.globalData.unWatchLanguage = (id) => {
      id && watchs.splice(id, 1);
    };

    // 监听lang的改变触发
    this.watch('lang', () => {
      watchs.forEach((f) => f(this.app.globalData));
    });
  }

  updateGlobalData() {
    this.app.globalData.reverse = i18n.getLang() === 'uly';
    this.app.globalData.language = i18n.getLanguage(); //根据当前系统语言获取对应文本
    this.app.globalData.lang = i18n.getLang();
  }

  watch(key, method) {
    const obj = this.app.globalData;
    let val = obj[key];
    Object.defineProperty(obj, key, {
      configurable: false,
      enumerable: true,
      set: function (value) {
        if (value === val) return;
        method(value, val);
        val = value;
      },
      get: function () {
        return val;
      },
    });
  }
}

export default appLang;
