# 接口文档

### 初始化 I18n 运行时

在 `app.js` 调用 initI18n 来加载 i18n 文本并指定默认语言。若未进行指定，i18n 运行时将默认从 `/i18n/locales.js` 中读取文本及配置。

```js
// src/app.js
import { initI18n } from './i18n/core/index';
import locals from './i18n/language/index';
initI18n({ locals, lang: 'zh' }); // 初始化多语言
```

### 获取 I18n 运行时

#### getI18nInstance(): I18n

该接口会返回 I18n 运行时实例。

```js
import { getI18nInstance } from './i18n/core/index';

const i18n = getI18nInstance();
```

### I18n 接口

以下五个接口用来获取或操作 I18n，均可在 I18n 实例或 拥有 I18n Behavior 的组件或 I18nPage 上进行调用。
通过组件直接访问成员函数：

```js
import { I18n } from './i18n/core/index'';
Component({
  behaviors: [I18n],

  attached() {
    this.getLocale();
    this.setLocale('zh-CN');
  },
});
```

```html
<view>{{ lang.key }}</view>
```

其他：

```js
/**
 * 1.设置导航标题wx.setNavigationBarTitle
 * 2.设置tabBar使用 wx.setTabBarItem
 */
```
