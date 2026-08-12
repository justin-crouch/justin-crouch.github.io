<!-- ActionBar
 -
 - description: component for displaying the action bar
 - 
-->

<script setup>
  import { useInventoryStore } from "@/store/inventory/inventoryStore";


  // --- STATES ----------------------------
  const inventory = useInventoryStore();
  // --- END STATES ------------------------


  // --- ACTIONS ---------------------------
  // --- END ACTIONS -----------------------
</script>

<!-- --- VIEW -------------------------- -->
<template>
  <div class="action-bar" :class="{ 'action-bar--with-selection': inventory.hasSelectedItems }">
    <button class="action-bar__button action-bar--remove action-bar--danger" v-if="inventory.selectedItemsCount > 0" @click="inventory.deleteSelection()">
      Remove {{ inventory.selectedItemsCount }}
      <span v-if="inventory.selectedItemsCount == 1">Item</span>
      <span v-else>Items</span>
    </button>

    <input type="text" class="text-input text-input--mobile" v-model="inventory.searchFor">

    <button class="action-bar__button action-bar--deselect" v-if="inventory.selectedItemsCount > 0" @click="inventory.clearSelection()">
      Deselect All
    </button>
  </div>
</template>

<style scoped>
  .action-bar {
    grid-area: action-bar;

    display: grid;
    grid-template-areas: "search";
    grid-template-rows: 48px;
    column-gap: 0.5rem;
    row-gap: 0.25rem;
    padding: 0 0.5rem;
  }
  .action-bar--with-selection {
    display: grid;
    grid-template-areas:
      "remove search"
      "deselect .";
    grid-template-rows: 48px 24px;
  }
  .action-bar__button {
    background: var(--secondary-color-400);
    border: none;
    border-radius: var(--button-radius);
    font-size: medium;
    padding: 0.5rem;

    cursor: pointer;
  }
  .action-bar--remove {
    grid-area: remove;
    color: var(--text-on-dark);
  }
  .action-bar--remove * {
    color: var(--text-on-dark);
  }
  .action-bar--deselect {
    grid-area: deselect;
    background: none;
  }
  .action-bar--danger {
    background: var(--danger-color-400);
  }

  @media (min-width: 768px) {
    .action-bar {
      display: none;
      padding: 0 0.5rem;
      margin-top: 0.75rem;
      grid-template-rows: auto;
    }
    .action-bar--with-selection {
      display: grid;
      grid-template-areas: "remove deselect .";
      grid-template-columns: auto auto 1fr;
    }
  }

  @media (min-width: 1200px) {
  }
</style>
<!-- --- END VIEW ---------------------- -->