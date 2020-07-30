<template>
  <div class="header">
    <BNavbar type="dark" class="navbar" variant="dark">
      <b-container>
        <b-navbar-brand href="#">MovueDB</b-navbar-brand>
        <b-nav-form>
          <b-form-input
            class="mr-sm-2 search-input"
             placeholder="Search"
             v-model="searchValue"
             debounce="500"
          ></b-form-input>
        </b-nav-form>
      </b-container>
    </BNavbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  data: () => ({
    searchValue: '',
  }),
  methods: {
    ...mapActions('movies', ['searchMovies', 'fetchMovies', 'toggleSearchState']),
    onSearchValueChanged(value) {
      if (value) {
        this.searchMovies(value);
        this.toggleSearchState(true);
      } else {
        this.fetchMovies();
        this.toggleSearchState(false);
      }
    },
  },
  watch: {
    searchValue: 'onSearchValueChanged',
  },
};
</script>

<style scoped>
  .header{
    margin-bottom: 30px;
  }
  .header .navbar{
    background-color: rgba(0, 0, 0, 0.7) !important;
  }
  .header .search-input{
    color: #fff;
    background-color: rgba(0, 0, 0, 0.1) !important;
    border-color: rgba(0, 0, 0, 0.6) !important;
  }
</style>
