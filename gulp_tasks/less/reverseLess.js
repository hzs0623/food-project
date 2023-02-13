function createArSrc(str = '', suffix = '-ar') {
  const insertStr = (soure, start, newStr) =>
    soure.slice(0, start) + newStr + soure.slice(start);

  // function allClassName() {
  //   function findClassNames(str) {
  //     const classNames = [];
  //     let startIndex;
  //     for (let i = 0; i < str.length; i++) {
  //       const item = str[i];
  //       if (!startIndex && item === '.') {
  //         startIndex = i;
  //       }
  //       if (typeof startIndex !== 'undefined' && item === '{') {
  //         classNames.push(str.substring(startIndex, i));
  //         startIndex = undefined;
  //       }
  //     }
  //     return classNames;
  //   }

  //   const classNames = findClassNames(str);
  //   classNames.forEach((name) => {
  //     str = str.replace(name, `${name.trim()}${suffix}`);
  //   });
  //   return str;
  // }

  function pageSignClassName() {
    let startIndex;
    let endIndex;
    for (let i = 0; i < str.length; i++) {
      const item = str[i];
      if (!startIndex && item === '.') {
        startIndex = i;
      }
      if (!endIndex && item === '{') {
        endIndex = i;
        break;
      }
    }
    const className = str.substring(startIndex, endIndex);

    str = insertStr(str, endIndex + 1, `  \n  direction: rtl;`);
    return str.replace(className, `${className.trim()}${suffix}`);
  }

  return pageSignClassName();
}

module.exports = (contents) => {
  let str = createArSrc(contents);

  str = str.replaceAll('right', 'right-test');
  str = str.replaceAll('left', 'left-test');

  str = str.replaceAll('left-test', 'right');
  str = str.replaceAll('right-test', 'left');
  return str;
};
