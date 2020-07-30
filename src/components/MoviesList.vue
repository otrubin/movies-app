<template>
  <div id="movies-list">
    <BContainer>
      <h3 class="list-title">{{ listTitle }}</h3>
      <BRow>
        <template v-if="isExists">
          <BCol cols="3" v-for="(movie, key) in list" :key="key">
            <MovieItem
            :movie="movie"
            @mouseover.native="onMouseItemOver(movie.Poster)"
            @onRemoveItem="onRemoveItem"
            />
          </BCol>
        </template>
        <template v-else>
          <div>Empty list</div>
        </template>
      </BRow>
    </BContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MovieItem from './MovieItem.vue';

export default {
  name: 'MoviesList',
  components: {
    MovieItem,
  },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters('movies', ['isSearch']),
    isExists() {
      return Boolean(Object.keys(this.list).length);
    },
    listTitle() {
      return this.isSearch ? 'Search result' : 'IMDB Top 250';
    },
  },
  methods: {
    ...mapActions('movies', ['removeMovie']),
    ...mapActions(['showNotify']),
    onMouseItemOver(poster) {
      this.$emit('onChangePoster', poster);
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure delete "${title}"`);
      if (isConfirmed) {
        this.removeMovie(id);
        this.showNotify({
          msg: 'Movie deleted successful',
          variant: 'success',
          title: 'Success',
        });
      }
    },
  },
};
</script>

<style scoped>
.list-title{
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}

</style>
