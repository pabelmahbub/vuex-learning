import { createStore } from 'vuex';
import  axios from 'axios';

export default createStore({
  state: {
    counter: 0,
    colorCode: "red"
  },
  getters: {
    counterSquared: state => {
      return state.counter * state.counter;
  },
},
  mutations: {
    DECREMENT_COUNTER(state, randomNumber){
      state.counter -= randomNumber;
    },
    INCREMENT_COUNTER(state, randomNumber) {
      state.counter += randomNumber;
     },
     SET_COLOR_CODE(state, newValue) {
      state.colorCode = newValue;
    },
  },     
  actions: {
    DECREMENT_COUNTER({commit}){
      axios("https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new").then(response => commit('DECREMENT_COUNTER',response.data))
      
    },
    INCREMENT_COUNTER({commit}){
      axios("https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new").then(response => commit('INCREMENT_COUNTER',response.data))
      
    },
    SET_COLOR_CODE({commit}, newValue){
      commit('SET_COLOR_CODE', newValue);
  }
},
  modules: {
  }

});
