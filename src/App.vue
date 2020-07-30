<template>
  <div id="app">
    <Loader />
    <PosterBg :poster="pagePoster"  />
    <Header />
    <MoviesList :list="moviesList" @onChangePoster="onChangePoster" />
    <MoviesPagination
      :current-page="currentPage"
      :per-page="moviesPerPage"
      :total="moviesLength"
      @changedPage="onChangePage"
    />
    <Notification />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MoviesList from '@/components/MoviesList.vue';
import PosterBg from '@/components/PosterBg.vue';
import MoviesPagination from '@/components/MoviesPagination.vue';
import Loader from '@/components/Loader.vue';
import Header from '@/components/Header.vue';
import Notification from '@/components/Notification.vue';

export default {
  name: 'App',
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination,
    Loader,
    Header,
    Notification,
  },
  data: () => ({
    pagePoster: '',
  }),
  computed: {
    ...mapGetters('movies', ['moviesList', 'currentPage', 'moviesPerPage', 'moviesLength']),
  },
  methods: {
    ...mapActions('movies', ['changeCurrentPage']),
    onChangePoster(poster) {
      this.pagePoster = poster;
    },
    onChangePage(page) {
      this.$router.push({ query: { page } });
      this.changeCurrentPage(page);
    },
  },
  created() {
    if (this.$route.query.page) {
      this.changeCurrentPage(Number(this.$route.query.page));
    }
  },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;}
</style>
