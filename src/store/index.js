import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: null,
    zip: null,
    city: null,
  },
  getters: {
    getEmail: (state) => {
      return state.email;
    },
    getZip: (state) => {
      return state.zip;
    },
    getCity: (state) => {
      return state.city;
    },
  },
  mutations: {
    setEmail(state, payload) {
      state.email = payload.email;
    },
    setZip(state, payload) {
      state.zip = payload.zip;
    },
    setCity(state, payload) {
      state.city = payload.city;
    },
  },
  actions: {
    updateEmail(context, email) {
      context.commit({
        type: "setEmail",
        email,
      });
    },
    updateZip(context, zip) {
      context.commit({
        type: "setZip",
        zip,
      });
    },
    updateCity(context, city) {
      context.commit({
        type: "setCity",
        city,
      });
    },
  },
});
