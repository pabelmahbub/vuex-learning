
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
          
              <input type="checkbox" v-model="selectedRows" :value="row" class="checkbox_sso"/>
            

        </tr>
      </tbody>
    </table>
    <div>
      Selected Rows: {{ selectedRows }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const tableData = ref([
      ['Row 1, Column 1', 'Row 1, Column 2', 'Row 1, Column 3', 'Row 1, Column 4', 'Row 1, Column 5'],
      ['Row 2, Column 1', 'Row 2, Column 2', 'Row 2, Column 3', 'Row 2, Column 4', 'Row 2, Column 5'],
      ['Row 3, Column 1', 'Row 3, Column 2', 'Row 3, Column 3', 'Row 3, Column 4', 'Row 3, Column 5'],
      ['Row 4, Column 1', 'Row 4, Column 2', 'Row 4, Column 3', 'Row 4, Column 4', 'Row 4, Column 5'],
      ['Row 5, Column 1', 'Row 5, Column 2', 'Row 5, Column 3', 'Row 5, Column 4', 'Row 5, Column 5'],
    ]);

    const selectedRows = ref([]);

    return {
      tableData,
      selectedRows,
    };
  },
};
</script>
<style scoped>
</style>




