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
  </template>
  
  <script setup>
  import axios from 'axios';
  import { reactive } from 'vue';
  
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
  </script>
  
  