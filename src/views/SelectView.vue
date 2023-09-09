
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
          <th>Column 5</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <td v-for="(item, colIndex) in row" :key="colIndex">
            {{ item }}
          </td>
          <td>
            <label >
              <input type="checkbox" @change="toggleRow(row)" />
              <span class="checkmark"></span>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      Selected Rows: {{ selectedRows }}
    </div>
  </div>

  <div class="fixed-table-container">
    <div class="scrollable-content">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
              <div style="right: 70%; position: absolute; z-index: 99999;">
                <th style="background-color:aqua; margin: 40px;">HJH</th>
              </div>
              <th>HJH</th>
              <th>HJH</th>
              <th>HJH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <div style="margin-right: 70%; position: absolute;z-index: 9999;">
                <td style="background-color:aqua;">KKKKK</td>
              </div>
              <td>KKKKK</td>
              <td>KKKKK</td>
              <td>KKKKK</td>
            </tr>
            <!-- Add more rows here -->
          </tbody>
        </table>
      </div>
    </div>
  </div>


  <div>
    <table>
      <tr v-for="(item, index) in items" :key="index">
        <td>
          <input v-model="item.value" @input="updateTotal" />
        </td>
      </tr>
    </table>
    <p>Total: {{ total }}</p>
  </div>

</template>

<script setup>
import { ref } from 'vue';


    const tableData = ref([
      ['Row 1, Column 1', 'Row 1, Column 2', 'Row 1, Column 3', 'Row 1, Column 4', 'Row 1, Column 5'],
      ['Row 2, Column 1', 'Row 2, Column 2', 'Row 2, Column 3', 'Row 2, Column 4', 'Row 2, Column 5'],
      ['Row 3, Column 1', 'Row 3, Column 2', 'Row 3, Column 3', 'Row 3, Column 4', 'Row 3, Column 5'],
      ['Row 4, Column 1', 'Row 4, Column 2', 'Row 4, Column 3', 'Row 4, Column 4', 'Row 4, Column 5'],
      ['Row 5, Column 1', 'Row 5, Column 2', 'Row 5, Column 3', 'Row 5, Column 4', 'Row 5, Column 5'],
    ]);

    const selectedRows = ref([]);

    const toggleRow = (row) => {
      if (selectedRows.value.includes(row)) {
        selectedRows.value = selectedRows.value.filter((selectedRow) => selectedRow !== row);
      } else {
        selectedRows.value.push(row);
      }
    };

    


    
    const dataArray = ref([
  // Array of objects, each containing 20 items
  // Example:
  { items: ["item1", "item2","item3", "item4","item5", "item6","item7", "item8","item9", "item10","item11", "item12","item13", "item2","item1", "item2","item1", "item2"] },
  { items: ["item1", "item2","item3", "item4","item5", "item6","item7", "item8","item9", "item10","item11", "item12","item13", "item2","item1", "item2","item1", "item2"] },
  { items: ["item1", "item2","item3", "item4","item5", "item6","item7", "item8","item9", "item10","item11", "item12","item13", "item2","item1", "item2","item1", "item2"] },
  // ... and so on
]);
  


//add the value:
const items = ref([
      { value: 0 },
      { value: 0 },
      // Add more items as needed
    ]);

    const total = ref(0);

    // Function to update the total
    const updateTotal = () => {
      total.value = items.value.reduce((sum, item) => sum + parseFloat(item.value || 0), 0);
    };

    // Initial calculation
    updateTotal();

</script>

<style scoped>
.fixed-table-container {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.scrollable-content {
  flex: 1 1 auto;
  overflow-x: auto;
  position: relative;
}

.table-wrapper {
  width: fit-content; /* Adjust this to your preference */
  overflow: hidden;
}

table {
  table-layout: fixed;
  border-collapse: collapse;
  white-space: nowrap; /* Prevent text wrapping in cells */
}

/* Style the individual cells in the table */
td, th {
  padding: 10px;
  border: 1px solid #ddd;
}

/* Style the fixed column and cell */
td[style*="background-color: aqua"], th[style*="background-color: aqua"] {
  position: sticky;
  right: 0;
  z-index: 2;
}
</style>