import { describe, it, expect } from 'vitest';

import { ItemModel } from '@/store/inventory/itemModel';

/**
 * ItemModel.spec.js
 * @description unit tests for functionality of the 
 *      Item Model
 */
describe('Item Model', () => {
    // Test for object instantiation
    it('should init with default values', () => {
        const item = new ItemModel();

        expect(item.name).toBe('');
        expect(item.stock).toBe(0);
        expect(item.location).toBe('');
        expect(item.category).toBe('');
    });

    // Test for ID uniqueness
    it('generates unique ID for every item', () => {
        const item1 = new ItemModel();
        const item2 = new ItemModel();
        const item3 = new ItemModel();

        expect([item2.id, item3.id]).not.toContain(item1.id);
        expect([item1.id, item3.id]).not.toContain(item2.id);
        expect([item1.id, item2.id]).not.toContain(item3.id);
    });

    // Test for event-based updates when modifying an item's name
    it('calls onUpdate event after editing name', () => {
        const item = new ItemModel();
        let updatedName = '';

        item.onUpdate = (self) => {
            updatedName = self.name;
        };

        item.name = 'test';

        expect(updatedName).toBe('test');
        expect(updatedName).toBe(item.name);
    });

    // Test for event-based updates when modifying an item's stock
    it('calls onUpdate event after editing stock', () => {
        const item = new ItemModel();
        let updatedStock = 0;

        item.onUpdate = (self) => {
            updatedStock = self.stock;
        };

        item.stock = 23;

        expect(updatedStock).toBe(23);
        expect(updatedStock).toBe(item.stock);
    });

    // Test for event-based updates when modifying an item's location
    it('calls onUpdate event after editing location', () => {
        const item = new ItemModel();
        let updatedLocation = '';

        item.onUpdate = (self) => {
            updatedLocation = self.location;
        };

        item.location = 'test';

        expect(updatedLocation).toBe('test');
        expect(updatedLocation).toBe(item.location);
    });

    // Test for event-based updates when modifying an item's category
    it('calls onUpdate event after editing category', () => {
        const item = new ItemModel();
        let updatedCategory = '';

        item.onUpdate = (self) => {
            updatedCategory = self.category;
        };

        item.category = 'test';

        expect(updatedCategory).toBe('test');
        expect(updatedCategory).toBe(item.category);
    });

    // Test that an item can be serialized (i.e contain only properties, strip away methods)
    it('can serialize', () => {
        const item = new ItemModel();
        item.name = 'newname';
        item.stock = 25;
        item.category = 'newcategory';
        item.location = 'newlocation';

        const serializedItem = item.serialize();

        expect(serializedItem.id).toBe(item.id);
        expect(serializedItem.name).toBe(item.name);
        expect(serializedItem.stock).toBe(item.stock);
        expect(serializedItem.category).toBe(item.category);
        expect(serializedItem.location).toBe(item.location);
    });
});