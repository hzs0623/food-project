Component({
  options: {
    multipleSlots: true,
  },

  properties: {},

  data: {},

  methods: {
    onClick() {
      this.triggerEvent('onClick');
    },

    vtouchmove(e = {}) {
      console.log(e);
    },
  },
});
