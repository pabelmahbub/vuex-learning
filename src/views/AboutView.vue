<template>
   <div style="background-color: rgb(248, 248, 171);padding-bottom:100px">
    <p>Display and delete data from api</p>
    <ul>
      <div v-for="item in items" :key="item.id">
        {{ item.name }}- {{ item.about }}- {{ item.website }}
        <button style="background-color: rgb(241, 99, 99); width:100px; padding:5px; margin:2px" @click="deleteItem(item.id)">Delete</button>
      </div>
    </ul>
  </div>

  <div style="background-color:grey;">

   


    <p>Search in Vue</p>
    <input style="width:200px; height:40px; padding-left: 10px;font-size: 15px; font-weight: bold;" type="text" v-model="state.searchQuery" placeholder="Search by title" />

    <ul>
      <p v-for="item in filteredItems" :key="item.id">
        {{ item.title }}
      </p>
    </ul>
  </div>

  <div style="width:200px;height:200px; background-color:pink"> 
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
import { ref, onMounted } from 'vue';
import axios from 'axios';

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


//Get from api:
const items = ref([]);

    onMounted(() => {
      fetchData();
    });

    const fetchData = () => {
      axios
        .get('http://127.0.0.1:8000/user/movie/')
        .then(response => {
          items.value = response.data;
          console.log(items.value);
        })
        .catch(error => {
          console.error(error);
        });
    };

    const deleteItem = itemId => {
      axios
        .delete(`http://127.0.0.1:8000/user/movie/${itemId}`)
        .then(response => {
          // Remove the deleted item from the local items array
          items.value = items.value.filter(item => item.id !== itemId);
        })
        .catch(error => {
          console.error(error);
        });
    };


</script>


