<template>
  <div>
    <input v-model="searchPrice" placeholder="Enter Price">

    <hr />
    <label for="locationSelect">Select Location:</label>
  
    <select v-model="selectedLocation" id="locationSelect">
      <option value="">-- All Locations --</option>
      <option v-for="location in uniqueLocations" :key="location" :value="location">{{ location }}</option>
    </select>
    <hr />
    
    <ul>
      <li v-for="(item, index) in filteredItems" :key="index" @click="copyToClipboard(item.location)">
        <strong>{{ item.itemName }}</strong>
        <p>Price Range: {{ item.priceRange }}</p>
        <p>Location: {{ item.location }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const items = ref([
  { itemName: 'Product A', priceRange: '$20 - $30', location: 'City A' },
  { itemName: 'Product B', priceRange: '$31 - $35', location: 'City B' },
  { itemName: 'Product C', priceRange: '$36 - $95', location: 'City C' },
  // Add more items as needed
]);

const selectedLocation = ref('');
const searchPrice = ref('');
const uniqueLocations = computed(() => [...new Set(items.value.map(item => item.location))]);

const filteredItems = computed(() => {
  let filteredByLocation = items.value;
  if (selectedLocation.value) {
    filteredByLocation = items.value.filter(item => item.location === selectedLocation.value);
  }

  if (searchPrice.value) {
    const searchValue = parseFloat(searchPrice.value);
    return filteredByLocation.filter(item => {
      const [minPrice, maxPrice] = item.priceRange.split(' - ').map(price => parseFloat(price.substring(1)));
      return searchValue >= minPrice && searchValue <= maxPrice;
    });
  }

  return filteredByLocation;
});

const copyToClipboard = (text) => {
  console.log('Attempting to copy:', text);
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard:', text);
        alert('Text copied to clipboard: ' + text);
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  } else {
    console.warn('Clipboard API not supported in this browser');
  }
};
</script>

  
  
