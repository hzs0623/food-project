import { I18n } from '../../i18n/core/index';

Component({
  behaviors: [I18n],

  properties: {
    goodsList: {
      type: Array,
      value: [],
    },
  },

  lifetimes: {
    attached() {},
  },

  data: {},

  methods: {},
});
