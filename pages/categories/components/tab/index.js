import { I18n } from '../../../../i18n/core/index';

Component({
  behaviors: [I18n],

  properties: {
    list: {
      type: Array,
      value: [],
    },
  },

  lifetimes: {
    attached() {},
  },

  data: {},

  methods: {
    clickTab(e) {
      this.triggerEvent('click', e);
    },
  },
});
