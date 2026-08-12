<!-- App
 -
 - description: entry component of the application
 - 
-->

<script setup>
  import { ref } from "vue";

  import InventoryDisplay from "./components/InventoryDisplay.vue";
  import { useInventoryStore } from "@/store/inventory/inventoryStore";
  import ActionBar from "./components/ActionBar.vue";
  import HeaderMenu from "./components/HeaderMenu.vue";
  import EditItem from "./components/EditItem.vue";


  // --- STATES ----------------------------
  // Get reference to the inventory store
  const inventory = useInventoryStore();

  // Either display or hide the menu
  const showMenu = ref(false);
  // --- END STATES ------------------------


  // --- ACTIONS ---------------------------
  // --- END ACTIONS -----------------------
</script>


<!-- --- VIEW -------------------------- -->
<template>
  <div class="responsive-layout" :class="{ 'responsive-layout--edit-item': inventory.isEditing }">
    <HeaderMenu v-model="showMenu" />

    <ActionBar />

    <EditItem />

    <InventoryDisplay />
  </div>

  <button class="button button--fob" v-if="!showMenu && !inventory.isEditing" @click="inventory.addItem()">+</button>
</template>

<style>
  :root {
    --text-box-radius: 8px;
    --button-radius: 32px;
    --neutral-radius: 8px;

    --primary-color-50: #F9E8D9;
    --primary-color-100: #ebd8c7;
    --primary-color-200: #dbbea5;
    --primary-color-300: #a0856d;
    --primary-color-400: #78614d;
    --primary-color-500: #413225;

    --secondary-color-100: #83af84;
    --secondary-color-200: #58a05b;
    --secondary-color-300: #418a43;
    --secondary-color-400: #1f5720;

    --danger-color-400: rgba(130, 10, 10, 0.916);

    --text-on-dark: #fffefee7;
    --text-on-light-200: #00000033;
    --text-on-light-300: #0000006a;
    --text-on-light-400: #0000009c;
    --text-on-light-500: #000000c8;
    --text-on-light: #000000ef;
    --text-danger-on-dark: rgba(255, 80, 80, 0.899);
    --text-danger-on-light: rgba(112, 8, 8, 0.908);
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: var(--text-on-light);
  }

  body {
    background: var(--primary-color-50);
  }

  .responsive-layout {
    display: grid;
    grid-template-areas:
      "header"
      "action-bar"
      "inventory"
      ".";
    grid-template-columns: 1fr;
    grid-template-rows: 60px auto 1fr 60px;
    height: 100vh;
    gap: 0.75rem;
  }
  .responsive-layout--edit-item {
    grid-template-areas:
      "header"
      "edit-item";
  }
  .responsive-layout--edit-item .inventory-view,
  .responsive-layout--edit-item .action-bar {
    display: none;
  }

  .text-input {
    grid-area: search;
    width: 100%;
    border-radius: var(--text-box-radius);
    padding: 0.5rem;
    font-size: large;
  }

  .button {
    min-width: 52px;
    min-height: 48px;

    border: none;
    border-radius: var(--button-radius);

    cursor: pointer;
  }

  .button--fob {
    position: absolute;
    bottom: 40px;
    right: 20px;
    width: 52px;
    height: 52px;

    background: var(--secondary-color-400);
    color: var(--text-on-dark);
    font-size: xx-large;
    border: none;
    border-radius: 30px;
  }

  .button--danger {
    background: var(--danger-color-400);
  }

  @media (min-width: 768px) {
    .responsive-layout {
      grid-template-areas:
        "menu header"
        "menu action-bar"
        "menu inventory"
        "menu .";
      grid-template-columns: 40vw 1fr;
      grid-template-rows: 60px auto 1fr 20px;
      gap: 0;
    }
    .responsive-layout--edit-item {
      grid-template-areas:
        "menu header"
        "menu action-bar"
        "menu inventory"
        "edit-item inventory";
      grid-template-rows: 60px auto 1fr auto;
    }
    .responsive-layout--edit-item .action-bar {
      display: grid;
    }
    .responsive-layout--edit-item .inventory-view {
      display: block;
    }

    .text-input {
      padding: 0.5rem;
      font-size: medium;
    }

    .text-input--mobile {
      display: none;
    }

    .button--fob {
      display: none;
    }
    .button--mobile {
      display: none;
    }
  }

  @media (min-width: 1200px) {
    .responsive-layout {
      grid-template-areas:
        "menu header header"
        "menu edit-item action-bar"
        "menu edit-item inventory"
        "menu edit-item .";
      grid-template-columns: 20vw auto 2fr;
      grid-template-rows: 60px auto 1fr 20px;
    }
    .responsive-layout--edit-item .action-bar {
      display: grid;
    }
    .responsive-layout--edit-item .inventory-view {
      display: block;
    }
  }
</style>
<!-- --- END VIEW ---------------------- -->
