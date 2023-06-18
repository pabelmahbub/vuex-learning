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


    <button @click="fetchData">Fetch Data</button>
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

const watchList = ref({
      title: '',
      storyline: '',
      platform: null,
      active: false,
      avg_rating: 0,
      number_rating: 0,
      created: null
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


const fetchData = async () => {
      loading.value = true;
      try {
        const response = await axios.get('http://127.0.0.1:8000/watch/stream/review/5');
        data.value = response.data;
      } catch (error) {
        error.value = 'Error fetching data';
      } finally {
        loading.value = false;
      }
    };
  

       // Fetch platforms data from API endpoint
    // You can use `onMounted` or any other lifecycle hook to fetch the data
    
    const submitForm = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/watch/list/', watchList.value);
        console.log(response.data); // Handle the response as per your requirements
      } catch (error) {
        console.error(error);
      }
    };







  </script>
  
  