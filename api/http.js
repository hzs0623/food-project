// https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html 文档

const BASE_URL = `https://test.com/`;
const TOKEN_KEY = `wx-token`;

function request(option = {}) {
  return new Promise((resolve, reject) => {
    if (!option.url) {
      reject('没有请求url地址');
      return;
    }
    const config = Object.assign(
      {
        timeout: 20000, // 超时时间 20000ms
        method: 'GET', // 请求方式 默认get
        data: {}, // 请求参数
        header: {
          'content-type': 'application/json',
          token: wx.getStorageSync(TOKEN_KEY),
        },
        success(res) {
          console.log(res); // res.cookies
          resolve(res.data);
        },
        fail(err) {
          reject(err);
        },
        complete(v) {
          console.log('都会触发', v);
        },
      },
      option,
    );

    config.url = BASE_URL + config.url;
    config.method = config.method.toUpperCase();

    wx.request(config);
  });
}

export default request;
