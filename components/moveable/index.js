import { I18n } from '../../i18n/core/index';

Component({
  behaviors: [I18n],
  options: {
    multipleSlots: true,
  },

  properties: {},

  data: {},

  methods: {
    onClick() {
      this.triggerEvent('onClick');
    },

    vtouchmove() {},
  },
});
