Component({
  properties: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    onClick() {
      this.triggerEvent('click', this.properties);
    },
  },
});
