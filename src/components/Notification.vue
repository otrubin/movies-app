<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Notification',
  methods: {
    showNotification({ variant, title, msg }) {
      this.$bvToast.toast(msg, {
        title,
        variant,
        solid: true,
      });
    },
  },
  computed: {
    ...mapGetters(['messagePool']),
  },
  watch: {
    messagePool: 'showNotification',
  },
};
</script>
