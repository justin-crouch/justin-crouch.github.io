import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { ItemHelper } from './itemHelper';
import { ItemModel } from "@/store/inventory/itemModel";
import { PrefixTree } from '@/modules/prefixTree';


// Setup database item helper
// Retrieve all items from database
// Retrieve all categories from database
const itemHelper = new ItemHelper();
let dbItems = await itemHelper.getAll();
let dbCategories = await itemHelper.getCategories();


/**
 * useInventoryStore
 * @description manages state for the inventory screen;
 *      interacts with database to sync persistent and in-memory items
 */
export const useInventoryStore = defineStore('inventory', () => {
    // --- STATE -----------------------------
    // Store list of all items in inventory for easier management
    const items = ref(dbItems);

    // Create new prefix tree and its search query
    const prefixTree = ref(new PrefixTree());
    items.value.forEach(item => prefixTree.value.add(item.name.toLowerCase(), item));
    const searchFor = ref('');

    // Store list of all categories and categories to filter for
    const categories = ref([...dbCategories]);
    const filterForCategories = ref([]);

    // Store minimum and maximum stock levels 
    const STOCK_MINIMUM = 0;
    const STOCK_MAXIMUM = 999;
    const stockMinimumValue = ref(STOCK_MINIMUM);
    const stockMaximumValue = ref(STOCK_MAXIMUM);

    // Cache items with prefix
    const itemsWithPrefix = computed(() => prefixTree.value.searchWithPrefix(searchFor.value.toLowerCase()));
    
    // Cache items with selected categories
    const itemsWithCategory = computed(() => {
        if(filterForCategories.value.length > 0) {
            return itemsWithPrefix.value.filter(item => filterForCategories.value.includes(item.category));
        } else {
            return itemsWithPrefix.value;
        }
    });

    // Cache items within stock levels
    const itemsWithinStockLevel = computed(() => {
        if(stockMinimumValue.value > STOCK_MINIMUM && stockMaximumValue.value < STOCK_MAXIMUM) {
            return itemsWithCategory.value.filter(item => item.stock >= stockMinimumValue.value && item.stock <= stockMaximumValue.value);
        } else if(stockMinimumValue.value == STOCK_MINIMUM && stockMaximumValue.value < STOCK_MAXIMUM) {
            return itemsWithCategory.value.filter(item => item.stock <= stockMaximumValue.value);
        } else if(stockMinimumValue.value > STOCK_MINIMUM && stockMaximumValue.value == STOCK_MAXIMUM) {
            return itemsWithCategory.value.filter(item => item.stock >= stockMinimumValue.value);
        } else if(stockMinimumValue.value == STOCK_MINIMUM && stockMaximumValue.value == STOCK_MAXIMUM) {
            return itemsWithCategory.value;
        }
    });

    // Get list of items that fit filters and sorted by name
    const itemsSorted = computed(() => {
        return itemsWithinStockLevel.value.sort((itemA, itemB) => itemA.name.toLowerCase() > itemB.name.toLowerCase());
    });

    // Store reference to item currently being edited
    const itemToEdit = ref();
    const isEditing = computed(() => {
        return itemToEdit.value != null;
    });

    // Store references to items currently selected
    const selectedItems = computed(() => items.value.filter(item => item.selected));
    const selectedItemsCount = computed(() => {
        return selectedItems.value.length;
    });
    const hasSelectedItems = computed(() => {
        return selectedItemsCount.value > 0;
    });
    // --- END STATE -------------------------
    

    // --- ACTION ----------------------------
    // Insert a new item into the inventory
    function addItem() {
        // Create item with default name and stock value
        const newItem = new ItemModel('New Item', 0);

        // Add item to list, prefix tree, and database
        items.value.push(newItem);
        prefixTree.value.add(newItem.name.toLowerCase(), newItem);
        itemHelper.insert(newItem);

        // Edit new item
        itemToEdit.value = newItem;
    }

    // Track an item in the inventory to edit
    function editItem(id) {
        itemToEdit.value = items.value.find(item => item.id == id);
    }

    // Handle when an item's name is edited
    function editItemName(e) {
        // Ensure an item is being edited
        if(!itemToEdit.value) {
            return;
        }

        // Remove edited item before its name changes, change its name, then reinsert item 
        // into prefix tree
        prefixTree.value.remove(itemToEdit.value.name.toLowerCase(), itemToEdit.value);
        itemToEdit.value.name = e.target.value;
        prefixTree.value.add(itemToEdit.value.name.toLowerCase(), itemToEdit.value);
    }

    // Untrack an item in the inventory to edit
    function stopEditing() {
        itemToEdit.value = null;
    }

    // Handle when a new category is added on an item
    function addItemCategory(e) {
        // Ensure an item is being edited
        if(!itemToEdit.value) {
            return;
        }

        // Add new category to list, and save to database, if it does not exist yet
        if(!categories.value.includes(e.target.value) && e.target.value.trim() !== '') {
            categories.value.push(e.target.value);
            itemToEdit.value.category = e.target.value;
            itemHelper.addCategory(e.target.value);
        }

        // Clear new category field
        e.target.value = "";
    }

    // Remove a category from the list and database
    function removeCategory(category) {
        categories.value = categories.value.filter(cat => cat != category);
        filterForCategories.value = filterForCategories.value.filter(cat => cat != category);
        itemHelper.deleteCategory(category);
    }
    
    // Update the minimum stock level filter
    function updateStockMinRange(event) {
        // Ensure new level is a number
        const newLevel = parseInt(event.target.value);
        if(isNaN(newLevel)) {
            return;
        }
        stockMinimumValue.value = newLevel;

        // Ensure mininum value is not lower than STOCK_MINIMUM and higher than STOCK_MAXIMUM
        stockMinimumValue.value = Math.min(Math.max(stockMinimumValue.value, STOCK_MINIMUM), STOCK_MAXIMUM);

        // Ensure maximum value is not less than minimum
        if(stockMaximumValue.value < stockMinimumValue.value) {
            stockMaximumValue.value = stockMinimumValue.value;
        }
    }

    // Update the maximum stock level filter
    function updateStockMaxRange(event) {
        // Ensure new level is a number
        const newLevel = parseInt(event.target.value);
        if(isNaN(newLevel)) {
            return;
        }
        stockMaximumValue.value = newLevel;

        // Ensure maximum value is not lower than STOCK_MINIMUM and higher than STOCK_MAXIMUM
        stockMaximumValue.value = Math.min(Math.max(stockMaximumValue.value, STOCK_MINIMUM), STOCK_MAXIMUM);

        // Ensure minimum value is not greater than maximum
        if(stockMinimumValue.value > stockMaximumValue.value) {
            stockMinimumValue.value = stockMaximumValue.value;
        }
    }

    // Select an item
    function addToSelection(id) {
        items.value.find(item => item.id == id).selected = true;
    }

    // Unselect an item
    function removeFromSelection(id) {
        items.value.find(item => item.id == id).selected = false;
    }

    // Unselect all items
    function clearSelection() {
        selectedItems.value.forEach(item => item.selected = false);
    }

    // Remove an item from the inventory
    function deleteItem(id) {
        // Stop editing an item if it is being deleted
        if(itemToEdit.value && itemToEdit.value.id === id) {
            itemToEdit.value = null;
        }
        
        // Remove the item from prefix tree, list, and database if it exists
        const itemToDelete = items.value.find(item => item.id === id);
        if(itemToDelete) {
            prefixTree.value.remove(itemToDelete.name.toLowerCase(), itemToDelete);
            items.value = items.value.filter(item => item.id !== id);
            itemHelper.delete(itemToDelete);
        }
    }

    // Remove all selected items
    function deleteSelection() {
        for(const item of selectedItems.value) {
            deleteItem(item.id)
        }
    }
    // --- END ACTION ------------------------

    // Expose store API
    return {
        items,
        categories,
        filterForCategories,
        STOCK_MINIMUM,
        STOCK_MAXIMUM,
        stockMinimumValue,
        stockMaximumValue,
        searchFor,
        itemsSorted,
        itemToEdit,
        isEditing,
        selectedItems, 
        selectedItemsCount, 
        hasSelectedItems,
        
        addItem, 
        editItem, 
        editItemName,
        addItemCategory,
        removeCategory,
        stopEditing,
        updateStockMinRange,
        updateStockMaxRange,
        addToSelection, 
        removeFromSelection,
        clearSelection,
        deleteItem,
        deleteSelection
    };
});