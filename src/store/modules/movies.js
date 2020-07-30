import IDs from '@/store/mock/imdb_top250';
import axios from '@/plugins/axios';
import mutations from '@/store/mutations';

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const {
  MOVIES, CURRENT_PAGE, REMOVE_MOVIE, TOGGLE_SEARCH,
} = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs, // массив
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
    isSearch: false,
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [REMOVE_MOVIE](state, index) {
      state.top250IDs.splice(index, 1);
    },
    [TOGGLE_SEARCH](state, bool) {
      state.isSearch = bool;
    },
  },
  getters: {
    moviesList: ({ movies }) => movies,
    slicedIDs: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    moviesLength: ({ top250IDs }) => Object.keys(top250IDs).length,
    isSearch: ({ isSearch }) => isSearch,
  },
  actions: {
    initMoviesStore: {
      root: true,
      handler({ dispatch }) {
        dispatch('fetchMovies');
      },
    },
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const { currentPage, moviesPerPage, slicedIDs } = getters;
        const from = moviesPerPage * (currentPage - 1);
        const to = moviesPerPage * currentPage;
        const moviesForFetch = slicedIDs(from, to);
        const requests = moviesForFetch.map((id) => axios.get(`/?i=${id}`)); // Массив промисов
        // tt3896198
        const response = await Promise.all(requests);
        const movies = serializeResponse(response);
        commit('MOVIES', movies);
        // console.log(movies);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    changeCurrentPage({ dispatch, commit }, page) {
      commit('CURRENT_PAGE', page);
      dispatch('fetchMovies');
    },
    removeMovie({ dispatch, commit, state }, id) {
      const index = state.top250IDs.findIndex((item) => item === id);
      if (index !== -1) {
        commit('REMOVE_MOVIE', index);
        dispatch('fetchMovies');
      }
    },
    async searchMovies({ commit, dispatch }, query) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const response = await axios.get(`/?s=${query}`);
        if (response.Error) {
          throw new Error(response.Error);
        }
        const movies = serializeResponse(response.Search);
        commit('MOVIES', movies);
      } catch (err) {
        console.log(err);
        dispatch('showNotify', {
          msg: err.message,
          title: 'Error',
          variant: 'danger',
        },
        { root: true });
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    toggleSearchState({ commit }, bool) {
      commit('TOGGLE_SEARCH', bool);
    },
  },
};

export default moviesStore;
