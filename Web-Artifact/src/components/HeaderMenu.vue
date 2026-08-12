<!-- HeaderMenu
 -
 - description: component for displaying the header on top of the screen and a menu
 - 
-->

<script setup>
  import { useInventoryStore } from '@/store/inventory/inventoryStore';
  import MenuFragment from "@/components/MenuFragment.vue";


  // --- STATES ----------------------------
  // Either display or hide the menu
  const showMenu = defineModel();

  const inventory = useInventoryStore();
  // --- END STATES ------------------------


  // --- ACTIONS ---------------------------
  // Toggle the menu being displayed or hidden
  function toggleMenu() {
    showMenu.value = !showMenu.value;
  }
  // --- END ACTIONS -----------------------
</script>


<!-- --- VIEW -------------------------- -->
<template>
  <div class="header header--normal">
    <h1 class="header__title">Inventory</h1>
    <button class="header__action header__action--show-menu" @click="toggleMenu">
      &#x2630;
    </button>
    <button class="header__action header__action--add-item" @click="inventory.addItem()">
      Add Item
    </button>
  </div>
  <div class="header header--mobile">
    <h1 class="header__title">
      <span v-if="!inventory.isEditing">Inventory</span>
      <span v-else>Edit Item</span>
    </h1>
    <button class="header__action header__action--show-menu" v-if="!inventory.isEditing" @click="toggleMenu">
      &#x2630;
    </button>
    <button class="header__action header__action--add-item" v-if="!inventory.isEditing" @click="inventory.addItem()">
      Add Item
    </button>
    <button class="header__action header__action--close" v-else @click="inventory.stopEditing()">
      X
    </button>
  </div>

  <div class="menu menu--mobile" v-show="showMenu">
    <MenuFragment />
  </div>
  <div class="menu menu--normal">
    <input type="text" class="text-input" v-model="inventory.searchFor">
    <MenuFragment />
  </div>
</template>

<style scoped>
  .header {
    grid-area: header;
    background: var(--primary-color-400);
    padding: 0.5rem;

    display: grid;
    grid-template-areas: "title menu";
    grid-template-columns: 1fr auto;

    align-items: center;
  }
  .header--normal {
    display: none;
  }
  .header__title,
  .header__title * {
    color: var(--text-on-dark);
  }
  .header__action {
    height: 100%;
    width: 100%;
    padding: 0 0.5rem;

    border: none;
    border-radius: var(--button-radius);

    font-size: medium;
    font-weight: bold;

    cursor: pointer;
  }
  .header__action--show-menu {
    font-size: x-large;
    padding: 0 1.25rem;
    background: none;
    color: var(--text-on-dark);
  }
  .header__action--add-item {
    display: none;
    background: var(--secondary-color-100);
    padding: 0 0.75rem;
  }
  .header__action--close {
    min-width: 52px;

    border: none;
    background: none;
    font-size: x-large;
    color: var(--text-danger-on-dark);
    cursor: pointer;
  }

  .menu {
    background: var(--primary-color-300);
    padding: 0.75rem;
    overflow-y: scroll;
  }
  .menu--mobile {
    position: absolute;
    top: 60px;
    right: 0;
    width: 80vw;
    height: calc(100vh - 60px);
  }
  .menu--normal {
    display: none;
  }

  @media (min-width: 768px) {
    .header--normal {
      display: grid;
    }
    .header--mobile {
      display: none;
    }
    .header__action--show-menu {
      display: none;
    }
    .header__action--add-item {
      display: block;
    }

    .menu--mobile {
      display: none;
    }
    .menu--normal {
      grid-area: menu;
      display: block;
    }
  }

  @media (min-width: 1200px) {
  }
</style>
<!-- --- END VIEW ---------------------- -->