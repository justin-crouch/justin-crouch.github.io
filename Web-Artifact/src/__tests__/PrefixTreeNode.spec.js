import { describe, it, expect, beforeEach } from 'vitest';

import { PrefixTreeNode } from '@/modules/prefixTreeNode';
import { ItemModel } from '@/store/inventory/itemModel';

/**
 * PrefixTreeNode.spec.js
 * @description unit tests for functionality of the 
 *      Prefix Tree Node
 */
describe('Prefix Tree Node', () => {
    // Group of tests for adding and removing other nodes
    describe('Children Tests', () => {
        // Test the initial state of a node's children
        it('should init with empty children list', () => {
            const node = new PrefixTreeNode();
    
            expect(node.getChildren()).toHaveLength(0);
            expect(node.isEmpty).toBe(true);
        });
    
        // Test the insertion of one character into a node
        it('can add character to children list', () => {
            const node = new PrefixTreeNode();
    
            node.addChild('a');
    
            expect(node.getChildren()).toHaveLength(1);
            expect(node.isEmpty).toBe(false);
        });
    
        // Test the insertion of multiple characters into a node
        it('can add multiple characters to children list', () => {
            const node = new PrefixTreeNode();
    
            const characters = ['a', 'b', 'c', 'd'];
            for(const char of characters) {
                node.addChild(char);
            }
    
            expect(node.getChildren()).toHaveLength(characters.length);
        });
    
        // Test the multiple insertions of one character into a node
        it('can not add same character twice to children list', () => {
            const node = new PrefixTreeNode();
    
            node.addChild('a');
            node.addChild('a');
    
            expect(node.getChildren()).toHaveLength(1);
        });
    
        // Test the insertion of a character and node into another node
        it('can add character and node to children list', () => {
            const node1 = new PrefixTreeNode();
            const node2 = new PrefixTreeNode();
    
            const addedNode = node1.addChild('a', node2);
    
            expect(node1.getChild('a')).toBe(node2);
            expect(addedNode).toBe(node2);
        });
    
        // Test the removal of a character from a node
        it('can remove child from children list', () => {
            const node = new PrefixTreeNode();
    
            node.addChild('a');
            node.removeChild('a');
    
            expect(node.getChildren()).toHaveLength(0);
            expect(node.isEmpty).toBe(true);
        });
    });

    // Group of tests for adding and removing items 
    describe('Items Tests', () => {
        // Test the initial state of a node's items
        it('should init with empty item list', () => {
            const node = new PrefixTreeNode();
    
            expect(node.getItems()).toHaveLength(0);
            expect(node.isEmpty).toBe(true);
        });
    
        // Test the insertion of an item into a node
        it('can add item to item list', () => {
            const node = new PrefixTreeNode();
    
            node.addItem(new ItemModel());
    
            expect(node.getItems()).toHaveLength(1);
            expect(node.isEmpty).toBe(false);
        });
    
        // Test the insertion of multible items into a node
        it('can add multiple items to item list', () => {
            const node = new PrefixTreeNode();
            const items = [new ItemModel(), new ItemModel(), new ItemModel()];

            for (const item of items) {
                node.addItem(item);
            }
            
            expect(node.getItems()).toHaveLength(3);
        });
    
        // Test the retrieval of all items in a node
        it('can get items from item list', () => {
            const node = new PrefixTreeNode();
            const items = [new ItemModel(), new ItemModel(), new ItemModel()];
    
            for (const item of items) {
                node.addItem(item);
            }
    
            const storedItems = node.getItems();
            for (const item of items) {
                expect(storedItems).toContain(item);
            }
        });
    
        // Test the removal of an item from a node
        it('can remove item from item list', () => {
            const node = new PrefixTreeNode();
            const item = new ItemModel();

            node.addItem(item);
            node.removeItem(item);
    
            expect(node.getItems()).toHaveLength(0);
            expect(node.isEmpty).toBe(true);
        });
    });
});