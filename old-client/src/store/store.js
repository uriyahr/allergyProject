import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.validateStatus = () => {
  return true;
};
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    deleted: false,
    loginOrRegister: -1,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setLoginOrRegister (state) {
      if (state.loginOrRegister == -1) {
        state.loginOrRegister = 1;
      } else if (state.loginOrRegister == 1) {
        state.loginOrRegister = 0;
      } else {
        state.loginOrRegister = 1;
      }
    }
  },

  actions: {
     toggleLoginRegister (context) {
      try {
        context.commit('setLoginOrRegister');
      } catch (error) {
        console.log(error);
      }
    },
    async register (context, data) {
      try {
        let response = await axios.post('/api/users',data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login (context, data) {
      try {
        console.log('$store.login data: ', data);
        console.log('TRYING")');
        let response = await axios.post("/api/users/login", data);

        console.log(response);
        context.commit('setUser', response.data);
        console.log('error $store.login');
        return "";
      } catch (error) {
        console.trace(error);
        return error.response.data.message;
      }
    },
    async logout (context) {
      try {
        await axios.delete('/api/users');
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser (context) {
      try {
        let response = await axios.get('/api/users');
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
  }
})