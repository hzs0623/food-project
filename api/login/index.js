import http from '../http';

const loginFetch = async ({ code, rawData, signature }) => {
  const res = await http({
    url: '/user/wx-login',
    method: 'post',
    data: { code, rawData, signature },
  });
  console.log(res);
  // wx.setStorageSync('login_key', res.data);
};

export const login = () => {
  return new Promise((resolve, reject) => {
    //调用微信小程序的登录接口
    wx.login({
      success(e) {
        if (!e.code) {
          reject('失败');
          return;
        }

        const code = e.code;
        wx.showModal({
          title: '温馨提示',
          content: '微信授权登陆后才能正常使用小程序功能',
          canceltext: '拒绝',
          confirmText: '同意',
          success() {
            //调用微信小程序的获取用户信息的接口
            wx.getUserProfile({
              desc: '用于完善会员资料', //声明获取用户个人信息后的用途
              lang: 'zh_CN',
              success(info) {
                loginFetch({
                  code,
                  ...info,
                })
                  .then(resolve)
                  .catch(reject);
              },
              fail(e) {
                console.log('获取用户信息失败', e);
                reject(e);
              },
            });
          },
          fail() {
            reject('拒绝');
          },
        });
      },
      fail(e) {
        reject('fail', e);
        wx.showToast({
          title: '网络异常',
          duration: 2000,
        });
      },
    });
  });
};
