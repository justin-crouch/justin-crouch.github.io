<!-- EditItem
 -
 - description: component for editing an item
 - 
-->

<script setup>
  import { ref } from 'vue';
  import { useInventoryStore } from '@/store/inventory/inventoryStore';


  // --- STATES ----------------------------
  const inventory = useInventoryStore();

  const showAddCategory = ref(false);
  // --- END STATES ------------------------

  // --- ACTIONS ---------------------------
  function toggleAddCategory() {
    showAddCategory.value = !showAddCategory.value;
  }

  // Handle the deletion of the currently edited item
  function removeEditedItem() {
    inventory.deleteItem(inventory.itemToEdit.id);
    inventory.stopEditing();
  }

  function stopEditing() {
    inventory.stopEditing();
    showAddCategory.value = false;
  }
  // --- END ACTIONS -----------------------
</script>


<!-- --- VIEW -------------------------- -->
<template>
  <div class="edit-item" v-if="inventory.isEditing">
    <input type="text" class="text-input" :value="inventory.itemToEdit.name" @input="inventory.editItemName($event)">
    <div class="edit-item__field">
      <label for="edit-item__stock" class="edit-item__label">In-Stock</label>
      <input id="edit-item__stock" type="number" class="text-input" v-model="inventory.itemToEdit.stock">
    </div>
    <div class="edit-item__field">
      <label for="edit-item__category" class="edit-item__label">Category</label>
      <select name="edit-item__category" id="edit-item__category" class="edit-item__category" v-model="inventory.itemToEdit.category">
        <option v-for="category in inventory.categories" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
    <div class="edit-item__field">
      <button v-if="!showAddCategory" class="add-item__category add-item__category--button" @click="toggleAddCategory">
        New Category
      </button>
      <input v-else type="text" class="add-item__category" value="" @change="inventory.addItemCategory($event)" @focusout="toggleAddCategory">
    </div>
    <div class="edit-item__field">
      <label for="edit-item__location" class="edit-item__label">Location</label>
      <input id="edit-item__location" type="text" class="text-input" v-model="inventory.itemToEdit.location">
    </div>
    <button class="edit-item__close" @click="stopEditing">X</button>
    <button class="button button--fob button--mobile button--danger" @click="removeEditedItem()">
      &#x1F5D1;
    </button>
  </div>
</template>

<style scoped>
  .edit-item {
    grid-area: edit-item;
    padding: 4rem 4rem;
  }
  .edit-item > .text-input {
    margin-bottom: 1rem;
  }
  .edit-item__close {
    display: none;
    cursor: pointer;
  }
  .edit-item__field {
    display: grid;
    grid-template-areas: "label input";
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    margin-bottom: 1rem;
    align-items: center;
  }
  .edit-item__label {
    grid-area: label;
    font-size: large;
  }
  .edit-item__field .text-input {
    grid-area: input;
  }
  .edit-item__category,
  .add-item__category {
    grid-area: input;
    width: 100%;
    border-radius: 8px;
    padding: 0.5rem;
    font-size: large;
    background: white;
  }
  .add-item__category--button {
    border-radius: var(--button-radius);
    background: var(--secondary-color-200);
    color: var(--text-on-dark);
    border: none;
  }
  .add-item__category--button:focus {
    background: var(--secondary-color-100);
  }

  @media (min-width: 768px) {
    .edit-item {
      position: relative;
      padding: 4rem 2rem;
      background: var(--primary-color-200);
    }
    .edit-item__close {
      display: block;
      position: absolute;
      top: 0px;
      right: 0px;
      width: 52px;
      height: 52px;

      border: none;
      background: none;
      font-size: x-large;
      font-weight: bold;
      color: red;
      cursor: pointer;
    }
    .edit-item__label {
      font-size: large;
    }
  }

  @media (min-width: 1200px) {
    .edit-item {
      padding: 4rem 1rem;
    }
  }
</style>
<!-- --- END VIEW ---------------------- -->