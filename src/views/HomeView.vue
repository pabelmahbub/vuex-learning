<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p class="counter">VUEX LEARNING</p>
    <p class="counter" :style="{color: store.state.colorCode}">Counter: {{ store.state.counter }}</p>
    <P>{{ store.state.counter }}<sup>2</sup>= {{ store.getters.counterSquared }}</P>

    <div class="buttons">
      <button @click="store.dispatch('DECREMENT_COUNTER')">-</button>
      <button @click="store.dispatch('INCREMENT_COUNTER')">+</button>
   </div>

   <div>
    <input type="text" v-model="store.state.colorCode"  placeholder="Enter your color code"/>
   </div>

  </div>
</template>

<script setup>
import store from '../store';
import { ref, computed} from 'vue';

  const count = ref(0); // Define a reactive variable using ref()

  const colorCode = computed({
      get: () => store.state.colorCode,
      set: (newValue) => store.dispatch('SET_COLOR_CODE', newValue),
    });
    
  
</script>


<style scoped>
.counter{
  font-size: 40px;
  font-weight: 700;
}
.buttons button {
  width:120px;
  margin:30px 10px;
  font-size:40px
  }

</style>
