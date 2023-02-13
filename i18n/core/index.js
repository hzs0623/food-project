import I18nRuntimeBase from './I18n';
import { getLifetimes, getLanguageMehods } from './utils/index';

const innerGlobals = {
  i18nInstance: null,
};

// app.js 初始化方法
export function initI18n({ locals, lang }) {
  innerGlobals.i18nInstance = new I18nRuntimeBase({
    locals,
    defaultLang: lang,
  });
  return innerGlobals.i18nInstance;
}

// Compoent多语言
export const I18n = Behavior({
  ...getLifetimes(),
  methods: getLanguageMehods(innerGlobals),
});

/* Page多语言 */
export const I18nPage = (pageObject = {}) => {
  const behaviors = [Behavior(getLifetimes())]; //基础库 2.9.2 开始支持
  if (pageObject.behaviors) {
    behaviors.push(...pageObject.behaviors);
  }
  const hooks = {
    behaviors,
    ...getLanguageMehods(innerGlobals),
  };
  return Page(Object.assign({}, pageObject, hooks));
};

// js多语言
export const getI18nInstance = () => {
  return innerGlobals.i18nInstance;
};
