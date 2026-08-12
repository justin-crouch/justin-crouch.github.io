import { describe, it, expect, beforeAll } from 'vitest';

// Library to mimic IndexedDB in-memory for testing
import 'fake-indexeddb/auto';

import { ItemHelper } from '@/store/inventory/itemHelper';
import { ItemModel } from '@/store/inventory/itemModel';

/**
 * ItemHelper.spec.js
 * @description unit tests for functionality of the 
 *      Item Helper
 */
describe('Item Helper', () => {
    // Initialize one item helper for all tests    
    let itemHelper;
    beforeAll(() => {
        itemHelper = new ItemHelper();
    });

    // Test for item insertion
    it('can insert an item into the DB', async () => {
        const newItem = new ItemModel();
        const currentCount = await itemHelper.count();

        const newCount = await itemHelper.insert(newItem);

        expect(newCount).toBe(currentCount + 1);
    });

    // Test for single item retrieval
    it('can get an item from the DB', async () => {
        const newItem = new ItemModel();

        await itemHelper.insert(newItem);
        const storedItem = await itemHelper.getOne(newItem.id);

        expect(storedItem.id).toBe(newItem.id);
        expect(storedItem.name).toBe(newItem.name);
        expect(storedItem.stock).toBe(newItem.stock);
        expect(storedItem.category).toBe(newItem.category);
        expect(storedItem.location).toBe(newItem.location);
    });

    // Test for retrieval of all items
    it('can get all items from the DB', async () => {
        const newItems = [new ItemModel(), new ItemModel(), new ItemModel()];
        for(const item of newItems) {
            await itemHelper.insert(item);
        }

        const storedItems = await itemHelper.getAll();
        const storedItemIDs = storedItems.map(item => item.id);
        for(const item of newItems) {
            expect(storedItemIDs).toContain(item.id);
        }
    });

    // Test for retrieval of all unique categories
    it('can get all categories from the DB', async () => {
        const item1 = new ItemModel();
        item1.category = 'fruit';

        const item2 = new ItemModel();
        item2.category = 'vegetables';

        const item3 = new ItemModel();
        item3.category = 'meat';

        await itemHelper.insert(item1);
        await itemHelper.insert(item2);
        await itemHelper.insert(item3);

        const categories = await itemHelper.getCategories();
        
        expect(categories).toContain(item1.category);
        expect(categories).toContain(item2.category);
        expect(categories).toContain(item3.category);
    });

    // Test for automatic update saves
    it('can update an item in the DB', async () => {
        const newItem = new ItemModel('name', 0);
        await itemHelper.insert(newItem);

        newItem.name = 'updated name';
        let storedItem = await itemHelper.getOne(newItem.id);
        expect(storedItem.name).toBe('updated name');

        newItem.stock = 23;
        storedItem = await itemHelper.getOne(newItem.id);
        expect(storedItem.stock).toBe(23);

        newItem.location = 'updated location';
        storedItem = await itemHelper.getOne(newItem.id);
        expect(storedItem.location).toBe('updated location');

        newItem.category = 'updated category';
        storedItem = await itemHelper.getOne(newItem.id);
        expect(storedItem.category).toBe('updated category');
    });

    // Test for deletion of an item
    it('can delete an item from the DB', async () => {
        const newItem = new ItemModel();
        
        const countAfterInsert = await itemHelper.insert(newItem);
        // const countAfterInsert = await itemHelper.count();

        const countAfterDelete = await itemHelper.delete(newItem);
        // const countAfterDelete = await itemHelper.count();

        expect(countAfterDelete).toBe(countAfterInsert - 1);
    });
});