class Watch {
  constructor() {
    this.watchs = [];
  }

  async watch(fn) {
    const id = this.watchs.push(fn);
    return id - 1;
  }

  unload(id) {
    id && this.watchs.splice(id, 1);
  }

  forEach(callback) {
    this.watchs.forEach((fn) => {
      callback(fn);
    });
  }
}

/* 监听全局变量变化 */
class appLang {
  constructor(app, i18n) {
    this.app = app;
    this.i18n = i18n;
    this.init();
  }

  init() {
    this.app.globalData.watchLang = new Watch();
    this.i18n.watch(() => {
      this.updateGlobalData();
    });

    // 初始化让其他回调都推入队列中
    setTimeout(() => {
      this.updateGlobalData();
    }, 200);
  }

  updateGlobalData() {
    const { i18n } = this;
    this.app.globalData.reverse = i18n.getLang() === 'uly';
    this.app.globalData.language = i18n.getLanguage();
    this.app.globalData.lang = i18n.getLang();
    this.app.globalData.watchLang.forEach((fn) => {
      fn(this.app.globalData);
    });
  }
}

export default appLang;
