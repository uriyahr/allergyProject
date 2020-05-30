import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    deleted: false,
    loginOrRegister: -1,
    product: null,
    products: [],
    DP_Filters: [],
    R_Filters: []
  },
  mutations: {
    // food products mutations
    setProduct(state,product){
      state.product = product;
    },
    setProducts(state,products){
      state.products = products;
    },
    setDP_Filters(state,DP_Filters){
      state.DP_Filters = DP_Filters;
    },
    setR_Filters(state,R_Filters){
      state.R_Filters = R_Filters;
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
    async getProducts(context){
      try {
        console.log('getting products from store');
        let response = await axios.get("/api/product");
        context.commit('setProducts', response.data);
      } catch (error) {
        console.log('breaking here');
        console.log(error);
      }
    },

    async getProduct(context, payload) {
      try {
        let response = await axios.get("/api/product/" + payload._id);
        context.commit('setProduct', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    // product filter actions
    // async filterByDP(context, payload) {
    //   try {

    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getDPProducts(context, payload) {
      try {
        let response = await axios.get("/api/product/DPfilter/" + payload._id);
        context.commit('setDP_Filters', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getRProducts(context, payload) {
      try {
        let response = await axios.get('/api/product/RFilter/' + payload._id);
        context.commit('setR_Filters', response.data);
      } catch (error) {
        console.log(error);
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
    },

  },
  modules: {
  }
})
