// https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html 文档

const BASE_URL = `http://47.115.53.1:8090`;
// const TOKEN_KEY = `wx-token`;

function request(option = {}) {
  return new Promise((resolve, reject) => {
    if (!option.url) {
      reject('没有请求url地址');
      return;
    }

    const config = Object.assign(
      {
        timeout: 2000, // 超时时间 2000ms
        method: 'GET', // 请求方式 默认get
        data: {}, // 请求参数
        header: {
          'content-type': 'application/json',
          // token: wx.getStorageSync(TOKEN_KEY),
        },
        success(res) {
          resolve(res.data);
        },
        fail(err) {
          console.log(err);
          resolve({});
        },
        complete(v) {},
      },
      option,
    );

    config.url = BASE_URL + config.url;
    config.method = config.method.toUpperCase();

    wx.request(config);
  });
}

export default request;
