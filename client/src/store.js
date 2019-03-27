import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const baseURL = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false,
    token:null
  },
  mutations: {
    changelogin(state){
    islogin = true
    }
  },
  actions: {
    signup({commit, state }, payload){

      axios
        .post(`${baseURL}/users/signin`)
        .send({
          email: payload.email,
          password: payload.password
      })
        .then(data=>{
          
          commit('changelogin')
        })
    }
  }
})
