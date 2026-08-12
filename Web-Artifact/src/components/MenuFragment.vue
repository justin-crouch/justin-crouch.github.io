<!-- MenuFragment
 -
 - description: partial component for displaying a menu with options
 - 
-->

<script setup>
  import { ref } from 'vue';
  import { useInventoryStore } from '@/store/inventory/inventoryStore';


  // --- STATES ----------------------------
  const inventory = useInventoryStore();

  // Booleans for showing or collapsing categories and the stock filter
  const showCategories = ref(false);
  const showStockFilter = ref(false);
  // --- END STATES ------------------------


  // --- ACTIONS ---------------------------
  // Toggle the categories and stock filter groups
  function toggleCategories() {
    showCategories.value = !showCategories.value;
  }
  function toggleStockFilter() {
    showStockFilter.value = !showStockFilter.value;
  }
  // --- END ACTIONS -----------------------
</script>


<!-- --- VIEW -------------------------- -->
<template>
  <div class="group">
    <button class="group__header" @click="toggleCategories">
      <h4 class="group__name">Categories</h4>
      <p class="group__collapse" >
        <span v-if="showCategories">-</span>
        <span v-else>+</span>
      </p>
    </button>
    <ul class="checklist" v-show="showCategories">
      <li v-for="category in inventory.categories">
        <input type="checkbox" name="categories" :id="category" class="checklist__box" :value="category" v-model="inventory.filterForCategories">
        <label :for="category" class="checklist__label"><p>{{ category }}</p></label>
        <button class="checklist__remove" @click="inventory.removeCategory(category)">&#x1F5D1;</button>
      </li>
    </ul>
  </div>

  <div class="group">
    <button class="group__header" @click="toggleStockFilter">
        <h4 class="group__name">Stock Level</h4>
        <p class="group__collapse" >
          <span v-if="showStockFilter">-</span>
          <span v-else>+</span>
        </p>
    </button>
    <div class="range" v-show="showStockFilter">
      <div class="range__slider">
        <input type="range" name="" id="stock-range" class="range__display-slider" :value="inventory.STOCK_MAXIMUM" :min="inventory.STOCK_MINIMUM" :max="inventory.STOCK_MAXIMUM" disabled :style="{ left: (inventory.stockMinimumValue * 100 / inventory.STOCK_MAXIMUM) + '%', width: ((inventory.stockMaximumValue - inventory.stockMinimumValue) * 100 / inventory.STOCK_MAXIMUM) + '%' }">
        <input type="range" name="stock-range" id="stock-range" class="range__min-slider" :min="inventory.STOCK_MINIMUM" :max="inventory.STOCK_MAXIMUM" :value="inventory.stockMinimumValue" @input="inventory.updateStockMinRange">
        <input type="range" name="stock-range" id="stock-range" class="range__max-slider" :min="inventory.STOCK_MINIMUM" :max="inventory.STOCK_MAXIMUM" :value="inventory.stockMaximumValue" @input="inventory.updateStockMaxRange">
      </div>

      <div class="range__controls">
        <label for="range__min-input" class="range__label">Minimum</label>
        <input id="range__min-input" type="number" class="range__input" :value="inventory.stockMinimumValue" @input="inventory.updateStockMinRange">

        <label for="range__max-input" class="range__label">Maximum</label>
        <input id="range__max-input" type="number" class="range__input" :value="inventory.stockMaximumValue" @input="inventory.updateStockMaxRange">
      </div>
    </div>
  </div>
</template>

<style scoped>
  .group {
    display: grid;
    grid-template-areas: 
      "header"
      "content";
    grid-template-columns: 1fr;

    margin: 0.5rem 0;
  }
  .group__header {
    grid-area: header;

    display: grid;
    grid-template-areas: 
      "name collapse"
      "content content";
    grid-template-columns: 1fr 60px;

    background: none;
    border: none;
  }
  .group__header:hover {
    background: var(--primary-color-100);
  }
  .group__name {
    grid-area: name;
    margin-bottom: 0.25rem;

    font-size: large;
    text-align: left;
  }
  .group__collapse {
    grid-area: collapse;

    background: none;
    border: none;
    font-size: large;
    text-align: center;
  }

  .checklist {
    grid-area: content;
    margin: 0 0 0 0.75rem;
    padding: 0;

    list-style: none;
  }
  .checklist > * {
    margin: 0.5rem;

    display: grid;
    grid-template-areas: 
      "box label remove";
    grid-template-columns: 52px 1fr 52px;

    align-items: center;
  }
  .checklist__box {
    grid-area: box;
    height: 30px;

    background: none;
  }
  .checklist__label {
    grid-area: label;
    font-size: large;

    display: grid;
    align-items: center;
  }
  .checklist__remove {
    grid-area: remove;
    font-size: x-large;

    background: none;
    border: none;
    color: var(--text-danger-on-light);
  }
  .checklist__remove:hover {
    background: var(--primary-color-100);
  }

  .range {
    grid-area: content;

    display: grid;
    grid-template-areas: 
      "slider"
      "controls";
    grid-template-rows: 1fr 1fr;
    gap: 0.75rem;
  }
  .range__slider {
    grid-area: slider;
    position: relative;
    margin: 0.75rem;
  }
  .range__min-slider,
  .range__max-slider {
    position: absolute;
    width: 100%;
    height: 5px;
    top: 0.5rem;
    
    background: none;
    outline: none;
    -webkit-appearance: none;
  }
  .range__min-slider {
    background: var(--primary-color-400);
  }
  .range__display-slider {
    position: absolute;
    width: 100%;
    height: 5px;
    top: 8px;
    z-index: 1;
    
    background: var(--secondary-color-300);
    outline: none;
    -webkit-appearance: none;
    pointer-events: none;
  }
  .range__min-slider::-webkit-slider-thumb,
  .range__min-slider::-moz-range-thumb,
  .range__max-slider::-webkit-slider-thumb,
  .range__max-slider::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    background: var(--secondary-color-300);
    border-radius: 50%;
    cursor: pointer;
    z-index: 2;
  }
  .range__min-slider:focus::-webkit-slider-thumb,
  .range__min-slider:focus::-moz-range-thumb,
  .range__max-slider:focus::-webkit-slider-thumb,
  .range__max-slider:focus::-moz-range-thumb {
    border: 2px var(--primary-color-100) solid;
  }
  .range__display-slider::-webkit-slider-thumb,
  .range__display-slider::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: none;
  }
  .range__controls {
    grid-area: controls;

    display: grid;
    grid-template-columns: 1fr 100px;
    gap: 0.5rem;

    margin: 0 2rem;
    font-size: large;
  }
  .range__input {
    height: 30px;
    text-align: center;
    border-radius: var(--text-box-radius);
  }
  .range__label {
    align-self: center;
  }

  @media (min-width: 768px) {
    .checklist__box {
        height: 20px;
    }

    .range__min-slider::-webkit-slider-thumb,
    .range__min-slider::-moz-range-thumb,
    .range__max-slider::-webkit-slider-thumb,
    .range__max-slider::-moz-range-thumb {
        width: 20px;
        height: 20px
    }
  }

  @media (min-width: 1200px) {
  }
</style>
<!-- --- END VIEW ---------------------- -->