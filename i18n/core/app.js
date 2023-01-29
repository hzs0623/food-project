const watchs = new Map();

// 监听全局变量变化

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
      this.app.globalData.reverse = i18n.getLang() === 'uly';
      this.app.globalData.language = i18n.getLanguage(); //根据当前系统语言获取对应文本
      this.app.globalData.lang = i18n.getLang();
    });

    // 全局更新多语言触发方法
    this.app.globalData.watchLanguage = (fn) => {
      this.watch(
        'lang',
        () => {
          fn(this.app.globalData);
        },
        { immediate: true },
      );
    };
  }

  watch(key, method, { immediate = false } = {}) {
    const obj = this.app.globalData;
    let val = obj[key]; // 单独变量来存储原来的值

    if (immediate) {
      method(val);
    }

    const fns = watchs.get(key) || [];
    fns.push(method);
    watchs.set(key, fns);

    // 每个key只依赖加载一次，防止重复监听
    if (fns.length === 1) {
      Object.defineProperty(obj, key, {
        configurable: false,
        enumerable: true,
        set: function (value) {
          if (value === val) return;
          Promise.resolve().then(function () {
            fns.forEach((f) => f(value, val));
            val = value; // 重新赋值
          });
        },
        get: function () {
          return val;
        },
      });
    }
  }
}

export default appLang;
