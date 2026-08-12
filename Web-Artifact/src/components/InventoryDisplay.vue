<!-- InventoryDisplay
-
- description: component for displaying all items in the inventory
- 
-->

<script setup>
  import { useInventoryStore } from '@/store/inventory/inventoryStore';
  import InventoryDisplayItem from './InventoryDisplayItem.vue';


  // --- STATES ----------------------------
  // Get reference to inventory store
  const inventory = useInventoryStore();
  // --- END STATES ------------------------


  // --- ACTIONS ---------------------------
  // --- END ACTIONS -----------------------
</script>


<!-- --- VIEW -------------------------- -->
<template>
  <div class="inventory-view">
    <div class="inventory">
      <InventoryDisplayItem v-for="item in inventory.itemsSorted" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<style scoped>
  .inventory-view {
    grid-area: inventory;
    overflow-y: scroll;
  }

  .inventory {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  @media (min-width: 768px) {
    .inventory-view {
      margin-top: 0.75rem;
    }

    .inventory {
      padding: 0 0.5rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1200px) {
    .inventory {
      grid-template-columns: repeat(4, 1fr);
    }

    .responsive-layout--edit-item .inventory {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
<!-- --- END VIEW ---------------------- -->