const jsonData = {
  list: ['列表', 'جەدۋەل'],
  categories: ['分类', 'تۈرگە ئايرىش'],
};

function getLocals() {
  const locals = {
    zh: {},
    uly: {}, // 维吾尔语
  };
  Object.keys(jsonData).forEach((k) => {
    const [zhItem, ulyItem] = jsonData[k];
    locals.zh[k] = zhItem;
    locals.uly[k] = ulyItem;
  });
  return locals;
}

export const locals = getLocals();

export const langKeys = Object.keys(locals);
