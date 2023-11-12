### Live site[Vuex + Search]: https://vuex-app-counter.netlify.app/#/
### Basic pattern:
```
import { createStore } from 'vuex';
export default createStore({
  state: {},
  getters: {},
  mutations: {},     
  actions: {},
  modules: {}
});
```
1. State: state is for storing data.
```
  state: {
    counter: 0,
    colorCode: "red",
    showModal: false,
  },
```
```
 <p class="counter" :style="{color: store.state.colorCode}">Counter: {{ store.state.counter }}</p>
 ```
 ```
 <P>{{ store.state.counter }}<sup>2</sup>= {{ store.getters.counterSquared }}</P>
 ```
2. getters: getters is not needed when getting data from store. If state data is needed to chagne then getters is used.
```
  getters: {
    counterSquared: state => {
      return state.counter * state.counter;
  },
},
```
3. mutations: mutations is used for trigering a commit(mutations). It is a method.It works only synchronous that is why it is not used for API call.
  ```
    mutations: {
    DECREMENT_COUNTER(state, randomNumber){
      state.counter -= randomNumber;
    },
    setShowModal(state, value) {
      state.showModal = value;
    },
    
    //state is to get state data. randomNumber is called payload(value) returned from actions. Mutation and actions name would be same.
    
    INCREMENT_COUNTER(state, randomNumber) {
      state.counter += randomNumber;
     },
     SET_COLOR_CODE(state, newValue) {
      state.colorCode = newValue;
    },
  }, 
  ```
4. actions: actions is also method. It can't change data (response.data) in state but can access data from state. It is asynchronous and that is why it is used for API call. Here, we get data from api by using GET api and data is send naming payload(same as mutaitons)/ 'DECREMENT_COUNTER' -  name.
```
actions: {
    DECREMENT_COUNTER({commit}){
      axios("https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new")
      .then(response => commit('DECREMENT_COUNTER',response.data))
      
    },
    INCREMENT_COUNTER({commit}){
      axios("https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new")
      .then(response => commit('INCREMENT_COUNTER',response.data))
      
    },
    SET_COLOR_CODE({commit}, newValue){
      commit('SET_COLOR_CODE', newValue);
  },
  openModal({ commit }) {
    commit('setShowModal', true);
  },
  closeModal({ commit }) {
    commit('setShowModal', false);
  },
},
```
get to set the value from state:
set is for mutations.
```
  const colorCode = computed({
      get: () => store.state.colorCode,
      set: (newValue) => store.dispatch('SET_COLOR_CODE', newValue),
    });
 ```   
And Search:
```
<div>
 <input style="width:200px; height:40px; padding-left: 10px;font-size: 15px; font-weight: bold;" type="text" v-model="state.searchQuery" placeholder="Search by title" />
<ul>
      <p v-for="item in filteredItems" :key="item.id">
        {{ item.title }}
      </p>
</ul>
</div>
```
```
<script setup>
import { reactive } from 'vue';
import { computed } from 'vue';

const state = reactive({
  items: [
    { id: 1, title: 'Apple', subtitle: 'Red and delicious' },
    { id: 2, title: 'Banana', subtitle: 'Yellow and curved' },
    { id: 3, title: 'Orange', subtitle: 'Orange and juicy' },
    { id: 4, title: 'Grapes', subtitle: 'Small and sweet' },
    { id: 5, title: 'Mango', subtitle: 'Tropical and flavorful' },
    { id: 6, title: 'Pineapple', subtitle: 'Sweet and tangy' },
    { id: 7, title: 'Strawberry', subtitle: 'Red and juicy' },
    { id: 8, title: 'Watermelon', subtitle: 'Refreshing and summery' },
  ],
  searchQuery: '',
});
const filteredItems = computed(() => {
  const query = state.searchQuery.toLowerCase();
  return state.items.filter(item => item.title.toLowerCase().includes(query));
});
</script>


### for select data from table:

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
</template>
```
```
### Download xlxs:
  import { ref } from 'vue';
  import * as XLSX from 'xlsx';
    const downloadData = () => {
      const workbook = XLSX.utils.book_new();

      // Create the first sheet
      const sheet1 = XLSX.utils.json_to_sheet(dataDownload, {
        header: ['id', 'name', 'about', 'website']
      });
      XLSX.utils.book_append_sheet(workbook, sheet1, 'Sheet1');

      // Create the second sheet with watchlist data
      const watchlistData = dataDownload.map(item => item.watchlist);
      const sheet2 = XLSX.utils.json_to_sheet(watchlistData.flat(), {
        header: ['id', 'reviews', 'title', 'storyline', 'active', 'avg_rating', 'number_rating', 'created', 'platform']
      });
      XLSX.utils.book_append_sheet(workbook, sheet2, 'Sheet2');

      // Generate and download the Excel file
      XLSX.writeFile(workbook, 'dataDownload.xlsx');
    };
<hr />

  <div>
    <button @click="downloadData">Download Excel</button>
  </div>

<hr />
//download data in xlxs
  const dataDownload = [
      {
        id: 1,
        watchlist: [
          {
            id: 51,
            reviews: [],
            title: 'TItanic',
            storyline: 'Best movie',
            active: true,
            avg_rating: 4.7,
            number_rating: 60,
            created: '2023-06-25T11:08:10.444254Z',
            platform: 1
          },
          {
            id: 54,
            reviews: [],
            title: 'Show Off',
            storyline: 'watchlist2',
            active: true,
            avg_rating: 4.0,
            number_rating: 589,
            created: '2023-06-25T11:09:16.479751Z',
            platform: 1
          }
        ],
        name: 'Netflix',
        about: 'stream platform 1',
        website: 'https://github.com/pabelmahbub'
      },
      {
        id: 2,
        watchlist: [
          {
            id: 52,
            reviews: [],
            title: 'Ammajan',
            storyline: 'watchlist2',
            active: true,
            avg_rating: 3.0,
            number_rating: 89,
            created: '2023-06-25T11:08:28.693569Z',
            platform: 2
          },
          {
            id: 53,
            reviews: [],
            title: 'Avatar',
            storyline: 'watchlist',
            active: true,
            avg_rating: 4.9,
            number_rating: 9898,
            created: '2023-06-25T11:08:50.858426Z',
            platform: 2
          },
          {
            id: 55,
            reviews: [],
            title: 'New Movie',
            storyline: 'watchlistOne',
            active: false,
            avg_rating: 4.0,
            number_rating: 489,
            created: '2023-06-25T11:09:33.343842Z',
            platform: 2
          },
          {
            id: 56,
            reviews: [],
            title: 'srsr',
            storyline: 'ghgh',
            active: true,
            avg_rating: 4.0,
            number_rating: 10,
            created: '2023-06-28T13:13:13.841733Z',
            platform: 2
          }
        ],
        name: 'Amazon Prime',
        about: 'stream platform 2',
        website: 'https://github.com/pabelmahbub'
      }
    ]
```


