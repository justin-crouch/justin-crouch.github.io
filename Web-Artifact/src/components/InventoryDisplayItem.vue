<!-- InventoryDisplayItem
 -
 - description: component for displaying an item in the inventory
 - 
-->

<script setup>
  import { useInventoryStore } from '@/store/inventory/inventoryStore';
  
  
  // --- STATES ----------------------------
  // Request parent to supply an item object
  defineProps(['item']);

  // Get reference to inventory store
  const inventory = useInventoryStore();
  // --- END STATES ------------------------


  // --- ACTIONS ---------------------------
  // Handle item selection events
  function onSelectItem(id, event) {
    if(event.target.checked) {
      inventory.addToSelection(id);
    } else {
      inventory.removeFromSelection(id);
    }
  }
  // --- END ACTIONS -----------------------
</script>

<!-- --- VIEW -------------------------- -->
<template>
  <button class="item" :class="{ 'item--selected' : item == inventory.itemToEdit}" @click.self="inventory.editItem(item.id)">
    <div class="item__header" @click.self="inventory.editItem(item.id)">
      <h4 class="item__name">{{ item.name }}</h4>
      <input type="checkbox" name="selected" id="" class="item__checkbox" :checked="item.selected" @change="onSelectItem(item.id, $event)">
    </div>
    <div class="item__content" @click="inventory.editItem(item.id)">
      <p><b>In Stock</b></p>
      <p>{{ item.stock }}</p>
      <p></p>
      
      <p><b>Category</b></p>
      <p>{{ item.category }}</p>
      <p></p>
      
      <p><b>Location</b></p>
      <p>{{ item.location }}</p>
      <p></p>
    </div>
  </button>
</template>

<style scoped>
  .item {
    padding: 0.5rem;
    background-color: var(--primary-color-100);
    border: none;
    border-radius: var(--neutral-radius);
    font-size: medium;
    cursor: pointer;
    text-align: left;
  }

  .item__content {
    display: grid;
    grid-template-columns: 2fr auto 3fr;
    column-gap: 1rem;
    row-gap: 0.5rem;

    margin-top: 0.5rem;
    color: var(--text-on-light-400);
  }

  .item:focus,
  .item:hover {
    outline: none;
    background-color: var(--primary-color-200);
  }

  .item--selected,
  .item--selected:focus,
  .item--selected:hover {
    background-color: var(--secondary-color-200);
  }

  .item__header {
    display: grid;
    grid-template-columns: 1fr auto;

    font-size: large;
  }
  .item__name {
    color: var(--text-on-light);
  }
  .item__checkbox {
    width: 48px;
  }


  @media (min-width: 768px) {
    .item {
      font-size: small;
    }

    .item__header {
      font-size: medium;
    }
  }

  @media (min-width: 1200px) {
  }
</style>
<!-- --- END VIEW ---------------------- -->