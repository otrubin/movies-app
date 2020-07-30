<template>
  <div class="movies-pagination d-flex justify-content-center">
    <BPagination
      v-model="currentPageModel"
      :total-rows="total"
      :per-page="perPage"
      prev-text="Prev"
      next-text="Next"
    />
    {{ currentPageModel }}
  </div>
</template>

<script>
export default {
  name: 'MoviesPagination',
  // data: () => ({
  //   currentPage: 1,
  //   total: 100,
  //   perPage: 12,
  // }),
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.$emit('changedPage', value);
      },
    },
  },
};
</script>

<style scoped>
  .movies-pagination{
    margin-top: 30px;
  }
  .movies-pagination >>> .pagination .page-item .page-link{
    background-color: transparent;
    color: #fff;
    font-size: 14px;
    box-shadow: none;
  }
  .movies-pagination >>> .pagination .page-item.active .page-link{
    background-color: #fff;
    border-color: #fff;
    color: #000;
  }
  .movies-pagination >>> .pagination .page-item.disabled .page-link{
    color: lightgray;
  }
</style>
