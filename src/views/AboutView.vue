<template>
  <div>
    <p>Search in Vue</p>
    <input style="width:200px; height:40px; padding-left: 10px;font-size: 15px; font-weight: bold;" type="text" v-model="state.searchQuery" placeholder="Search by title" />

    <ul>
      <p v-for="item in filteredItems" :key="item.id">
        {{ item.title }}
      </p>
    </ul>
  </div>

  <div style="width:500px;height:400px; background-color:pink"> 
    <button @click="openModal">Open Modal</button>

    <div v-if="showModal" class="modal">
      <!-- Modal content goes here -->
      <h2>Modal Title</h2>
      <p>Modal content...</p>

      <button @click="closeModal">Close Modal</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { reactive, computed } from 'vue';

const store = useStore();

const state = reactive({
  items: [
    { id: 1, title: 'Apple', subtitle: 'Red and delicious' },
    { id: 2, title: 'Banana', subtitle: 'Yellow and curved' },
    { id: 3, title: 'Orange', subtitle: 'Orange and juicy' },
    { id: 4, title: 'Grapes', subtitle: 'Small and sweet' },
    
  ],
  searchQuery: '',
});

const filteredItems = computed(() => {
  const query = state.searchQuery.toLowerCase();
  return state.items.filter(item => item.title.toLowerCase().includes(query));
});

const openModal = () => {
  store.commit('setShowModal', true);
};

const closeModal = () => {
  store.commit('setShowModal', false);
};

const showModal = computed(() => store.state.showModal);

</script>


