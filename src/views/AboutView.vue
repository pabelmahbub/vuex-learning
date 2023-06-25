<template>
    <div style="background-color: rgb(210, 210, 201);padding-bottom:20px">
      <p>Display and delete data from API</p>
      <ul>
        <div v-for="item in items" :key="item.id">
          {{ item.name }} - {{ item.about }} - {{ item.website }}
          <button style="background-color: rgb(241, 99, 99); width:100px; padding:5px; margin:2px" @click="deleteItem(item.id)">Delete</button>
        </div>
      </ul>
    </div>



<!-- Modal -->
<div v-if="showModalDelete">
      <div style="background-color: rgba(0, 0, 0, 0.5); position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
        <div style="background-color: white; padding: 20px;">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this item?</p>
          <div style="display: flex; justify-content: center;">
            <button style="margin-right: 10px;" @click="confirmDelete">Confirm</button>
            <button @click="cancelDelete">Cancel</button>
          </div>
        </div>
      </div>
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


//Get the POST data and delete from api:
const items = ref([]);
const showModalDelete = ref(false);
const itemIdToDelete = ref(null);

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
    // Set the item ID to be deleted and show the modal
    itemIdToDelete.value = itemId;
    showModalDelete.value = true;
  };


    const confirmDelete = () => {
    const itemId = itemIdToDelete.value;

    // Make the delete request to the API
    axios
      .delete(`http://127.0.0.1:8000/user/movie/${itemId}`)
      .then(response => {
        // Remove the deleted item from the local items array
        items.value = items.value.filter(item => item.id !== itemId);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        // Reset the modal state and item ID
        showModalDelete.value = false;
        itemIdToDelete.value = null;
      });
  };


  const cancelDelete = () => {
    // Reset the modal state and item ID
    showModalDelete.value = false;
    itemIdToDelete.value = null;
  };




</script>


