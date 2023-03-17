/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import Toast from 'tdesign-miniprogram/toast/index';

Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },

  properties: {
    src: {
      type: String,
    },
    title: String,
    show: {
      type: Boolean,
      value: false,
    },
    limitBuyInfo: {
      type: String,
      value: '',
    },
    isStock: {
      type: Boolean,
      value: true,
    },
    limitMaxCount: {
      type: Number,
      value: 999,
    },
    limitMinCount: {
      type: Number,
      value: 1,
    },
    skuList: {
      type: Array,
      value: [],
      observer(skuList) {
        if (skuList && skuList.length > 0) {
          if (this.initStatus) {
            this.initData();
          }
        }
      },
    },
    outOperateStatus: {
      type: Boolean,
      value: false,
    },
    hasAuth: {
      type: Boolean,
      value: false,
    },
    count: {
      type: Number,
      value: 1,
      observer(count) {
        this.setData({
          buyNum: count,
        });
      },
    },
  },

  initStatus: false,
  selectedSku: {},
  selectSpecObj: {},

  data: {
    buyNum: 1,
  },

  methods: {
    initData() {
      this.selectSpecObj = {};
      this.selectedSku = {};
      this.initStatus = true;
    },

    checkSkuStockQuantity(specValueId, skuList) {
      let hasStock = false;
      const array = [];
      skuList.forEach((item) => {
        (item.specInfo || []).forEach((subItem) => {
          if (subItem.specValueId === specValueId && item.quantity > 0) {
            const subArray = [];
            (item.specInfo || []).forEach((specItem) => {
              subArray.push(specItem.specValueId);
            });
            array.push(subArray);
            hasStock = true;
          }
        });
      });
      return {
        hasStock,
        specsArray: array,
      };
    },

    chooseSpecValueId(specValueId, specId) {},

    flatten(input) {
      const stack = [...input];
      const res = [];
      while (stack.length) {
        const next = stack.pop();
        if (Array.isArray(next)) {
          stack.push(...next);
        } else {
          res.push(next);
        }
      }
      return res.reverse();
    },

    getIntersection(array, nextArray) {
      return array.filter((item) => nextArray.includes(item));
    },

    toChooseItem(e) {
      const { isStock } = this.properties;
      if (!isStock) return;
      const { id } = e.currentTarget.dataset;
      const specId = e.currentTarget.dataset.specid;
      const hasStock = e.currentTarget.dataset.hasstock;
      if (!hasStock) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '该规格已售罄',
          icon: '',
          duration: 1000,
        });
        return;
      }

      let { selectedSku } = this;
      selectedSku =
        selectedSku[specId] === id
          ? { ...this.selectedSku, [specId]: '' }
          : { ...this.selectedSku, [specId]: id };

      this.chooseSpecValueId(id, specId);

      this.selectedSku = selectedSku;
      this.triggerEvent('change', { selectedSku });
    },

    // 判断是否所有的sku都已经选中
    isAllSelected(skuTree, selectedSku) {
      const selected = Object.keys(selectedSku).filter(
        (skuKeyStr) => selectedSku[skuKeyStr] !== '',
      );
      return skuTree.length === selected.length;
    },

    handlePopupHide() {
      this.triggerEvent('closeSpecsPopup', {
        show: false,
      });
    },

    specsConfirm() {
      const { isStock } = this.properties;
      if (!isStock) return;
      this.triggerEvent('specsConfirm');
    },

    addCart() {
      const { isStock } = this.properties;
      if (!isStock) return;
      this.triggerEvent('addCart');
    },

    buyNow() {},

    // 加
    handleBuyNumPlus() {
      const { buyNum } = this.data;
      const { isStock } = this.properties;
      if (!isStock) return;
      const nextBuyNum = Number(buyNum) + 1;
      this.setBuyNum(nextBuyNum > 999 ? buyNum : nextBuyNum);
    },

    // 减
    handleBuyNumMinus() {
      const { buyNum } = this.data;
      const { limitMinCount } = this.properties;
      const { isStock } = this.properties;
      if (!isStock || buyNum < limitMinCount + 1) return;
      const nextBuyNum = Number(buyNum) - 1;
      this.setBuyNum(nextBuyNum < 1 ? buyNum : nextBuyNum);
    },

    // 总处理
    setBuyNum(buyNum) {
      this.setData({
        buyNum,
      });
      this.triggerEvent('changeNum', {
        buyNum,
      });
    },

    // 输入框
    handleBuyNumChange(e) {
      const {
        detail: { value },
      } = e;
      const valInNum = Number(value);
      const { limitMaxCount, limitMinCount } = this.properties;
      const nextData = {
        buyNum:
          valInNum < limitMinCount
            ? limitMinCount
            : valInNum > limitMaxCount
            ? limitMaxCount
            : valInNum,
      };
      this.setData(nextData);
    },
  },
});
