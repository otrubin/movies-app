<template>
  <div class="loader" v-if="isShowLoader">
    <b-spinner type="grow" variant="ligth" label="Loading..."></b-spinner>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Loader',
  computed: {
    ...mapGetters(['isShowLoader']),
  },
};
</script>

<style scoped>
  .loader{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
