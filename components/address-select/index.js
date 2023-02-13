import { I18n } from '../../i18n/core/index';
import QQMapWX from '../../libs/addressSdk/sdk';

var qqmapsdk = new QQMapWX({
  key: 'I4YBZ-TJDLX-HG64K-TEY46-I5UXS-7WFBZ',
});

const addMapKey = `ad_info`;

Component({
  behaviors: [I18n],

  properties: {},

  lifetimes: {
    attached() {
      this.getLocations();
    },
  },

  data: {
    currentAdInfo: {
      // adcode: '440305',
      city: '无法获取地区',
      // district: '南山区',
      // location: { lat: 22.533191, lng: 113.930478 },
      // name: '中国,广东省,深圳市,南山区',
      // nation: '中国',
      // province: '广东省',
    },
    cityVisible: false,
  },

  methods: {
    //获取位置
    getLocations() {
      const addMapData = wx.getStorageSync(addMapKey);
      if (addMapData) {
        this.setData(addMapData);
        return;
      }
      console.log(this.data);

      wx.getLocation({
        success: (res) => {
          this.getMapData(res);
        },
      });
    },

    getMapData({ latitude, longitude } = {}) {
      qqmapsdk.reverseGeocoder({
        // eslint-disable-next-line camelcase
        get_poi: 1,
        sig: 'rBL3l5OUIY7FPRCGeIfnsPiI6BtDKZCN',
        location: {
          latitude,
          longitude,
        },

        success: (res) => {
          const { ad_info: currentAdInfo, pois } = res.result || {};
          const dataMap = {
            currentAdInfo,
            citys: [
              {
                label: '北京市',
                value: '北京市',
              },
              {
                label: '上海市',
                value: '上海市',
              },
              {
                label: '维吾尔语',
                value: '维吾尔语',
              },
              {
                label: '深圳市',
                value: '深圳市',
              },
            ],
          };
          this.setData(dataMap);
          wx.setStorageSync(dataMap);
        },
      });
    },

    onCityPicker() {
      this.setData({
        cityVisible: true,
      });
    },

    onPickerChange(e) {
      const { value } = e.detail;

      const currentAdInfo = Object.assign(this.data.currentAdInfo, {
        city: value,
      });

      this.setData({
        cityVisible: false,
        currentAdInfo,
      });

      this.triggerEvent('change', this.data.currentAdInfo);
    },

    onPickerCancel() {
      this.setData({
        cityVisible: false,
      });
    },
  },
});
