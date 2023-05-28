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
</template>

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

