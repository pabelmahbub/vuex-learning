<template>
    <div>
      <button @click="addRow">Create</button>
      <table>
        <thead>
          <tr>
            <th>Item 1</th>
            <th>Item 2</th>
            <th>Item 3</th>
            <th>Item 4</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td><input v-model="row.item1" /></td>
            <td><input v-model="row.item2" /></td>
            <td><input v-model="row.item3" /></td>
            <td><input v-model="row.item4" /></td>
            <td>
              <button @click="updateRow(index, 'item1', row.item1)">Edit</button>
              <button @click="deleteRow(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="PostRow">POST</button>
    </div>
    <div>

      <div style="background-color: rgb(210, 210, 201);padding-bottom:20px">
      <p>Display and delete data from API</p>
      <ul>
        <div v-for="item in items" :key="item.id">
          {{ item.title }} - {{ item.storyline }} - {{ item.number_rating }}
          <button style="background-color: rgb(241, 99, 99); width:100px; padding:5px; margin:2px" @click="deleteItem(item.id)">Delete</button>
        </div>
      </ul>
    </div>



<!-- Modal -->
<div v-if="showModal">
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


    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="data">
      <p>{{ data}}</p>
      <ul>
        <li v-for="item in data" :key="item.id">{{ item.title }}</li>
      </ul>
    </div>
  </div>
  <p> Post API for drf</p>
  <div>
    <label for="title">Title</label>
    <input type="text" id="title" v-model="watchList.title">
    <hr/>
    <label for="storyline">Storyline</label>
    <input type="text" id="storyline" v-model="watchList.storyline">
    <hr/>
    <label for="storyline">Platform</label>
    <input type="text" id="platform" v-model="watchList.platform">
    <hr/>
    <label for="active">Active</label>
    <input type="checkbox" id="active" v-model="watchList.active">
    <hr/>
    <label for="avg_rating">Average Rating</label>
    <input type="number" id="avg_rating" v-model="watchList.avg_rating">
    <hr/>
    <label for="number_rating">Number of Ratings</label>
    <input type="number" id="number_rating" v-model="watchList.number_rating">
    <hr/>
    <button @click="submitForm">Submit</button>
  </div>
  </template>
  
  <script setup>

  import axios from 'axios'; 
  import { reactive } from 'vue';
  import { ref } from 'vue';
  import { onMounted } from 'vue';

const watchList = ref({
      title: '',
      storyline: '',
      platform: null,
      active: false,
      avg_rating: 0,
      number_rating: 0,
      created: null
    });

//5 rows created when component is mounted:
    onMounted(() => {
      // Create initial rows with five columns
      for (let i = 0; i < 5; i++) {
        addRow();
      }
    });


  const loading = ref(false);
    const error = ref('');
    const data = ref(null);
    const tableData = reactive([]);
  
    // Function to add a new row to the table
    const addRow = () => {
      tableData.push({ item1: '', item2: '', item3: '', item4: '' });
    };
  
    // Function to delete a row from the table
    const deleteRow = (index) => {
      tableData.splice(index, 1);
    };
  
    // Function to update a row in the table
    const updateRow = (index, field, value) => {
      tableData[index][field] = value;
    };

    const PostRow = async () => {
  try {
    const response = await axios.post('http://example.com/api/data', tableData);
    // Handle the response as needed
    console.log(response.data);
  } catch (error) {
    // Handle any errors
    console.error('Error',error);
  }
};

  

       // Fetch platforms data from API endpoint
    // You can use `onMounted` or any other lifecycle hook to fetch the data
    
    const submitForm = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/watch/list/', watchList.value);
        console.log(response.data); // Handle the response as per your requirements
              // Reset the watchList object to clear the input fields
      watchList.value = {
        title: '',
        storyline: '',
        platform: null,
        active: false,
        avg_rating: 0,
        number_rating: 0,
        created: null
      };

      } catch (error) {
        alert(error);
      }
    };



//Get the POST data and delete from api:
const items = ref([]);
const showModal = ref(false);
const itemIdToDelete = ref(null);



 const fetchDataOne = () => {
  axios
    .get('http://127.0.0.1:8000/watch/list/')
    .then(response => {
      items.value = response.data;
      console.log(items.value);
    })
    .catch(error => {
      console.error(error);
    });
};


     const addNewItem = newItem => {
      axios
        .post('http://127.0.0.1:8000/watch/list/', newItem)
        .then(response => {
          // Successfully added the new item
          console.log(response.data);
          fetchDataOne(); // Trigger the GET request to fetch the updated data
        })
        .catch(error => {
          console.error(error);
        });
    };

    const deleteItem = itemId => {
    // Set the item ID to be deleted and show the modal
    itemIdToDelete.value = itemId;
    showModal.value = true;
  };


    const confirmDelete = () => {
    const itemId = itemIdToDelete.value;

    // Make the delete request to the API
    axios
      .delete(`http://127.0.0.1:8000/watch/list/${itemId}/`)
      .then(response => {
        // Remove the deleted item from the local items array
        items.value = items.value.filter(item => item.id !== itemId);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        // Reset the modal state and item ID
        showModal.value = false;
        itemIdToDelete.value = null;
      });
  };


  const cancelDelete = () => {
    // Reset the modal state and item ID
    showModal.value = false;
    itemIdToDelete.value = null;
  };


// lifecycle hook
onMounted(() => {
    fetchDataOne();

    // Call fetchDataOne every 5 seconds
    setInterval(fetchDataOne, 1000);
  });

  </script>
  
  