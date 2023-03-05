import http from '../http';

export const login = () => {
  wx.login({
    success(res) {
      if (!res.code) {
        console.log('登录失败！' + res.errMsg);
        return;
      }

      http({
        url: '/user/wx-login',
        method: 'post',
        data: {
          code: res.code,
        },
      }).then((data) => {
        // console.log(data);
        // wx.setStorageSync('login_key', res.data.data.login_key);
      });
    },
  });
};
