import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import EDAMAM_KEY from '../store/keys.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    deleted: false,
    loginOrRegister: -1,
    foodProducts: [],
    foodAPIUrl: 'https://api.edamam.com/api/food-database/parser',
  },
  mutations: {
    // food products mutations
    setFoodProducts(state, payload) {
      state.foodProducts = payload;
    },
    // user mutations
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
    // food products actions
    async getFoodProducts( {state, commit}, plan) {
      try {
        let response = await axios.get( `${state.foodAPIUrl} `, {
          params: {
            app_id: EDAMAM_KEY.app_id,
            app_key: EDAMAM_KEY.app_key,
            ingr: plan,
            upc: '051000012517',
          }
        });
        commit('setFoodProducts', response.data.hits);
      }catch (err) {
        commit('setFoodProducts',[] )
      }
    },
    // user actions
    toggleLoginRegister (context) {
      try {
        context.commit('setLoginOrRegister');
      } catch (error) {
        console.log(error);
      }
    },

    async register (context, data) {
      try {
        let response = await axios.post('/api/users', data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login (context, data)  {
      try {
        let response = await axios.post('/api/users/login', data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
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
        context.commit('setuser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    }
  },
  modules: {
  }
})
