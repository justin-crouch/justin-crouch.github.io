import { describe, it, expect } from 'vitest';

import { PrefixTree } from '@/modules/prefixTree';
import { ItemModel } from '@/store/inventory/itemModel';

/**
 * PrefixTree.spec.js
 * @description unit tests for functionality of the 
 *      Prefix Tree
 */
describe('Prefix Tree', () => {
    // Test the initial state of the tree
    it('should init with single root node', () => {
        const tree = new PrefixTree();

        expect(tree.size).toBe(1);
    });

    // Test insertion of an item at a word in the tree
    it('can add item to tree', () => {
        const tree = new PrefixTree();
        const word = 'word';

        tree.add(word, new ItemModel());

        expect(tree.size).toBe(word.length + 1);
    });

    // Test insertion of multiple items at multiple words in the tree
    it('can add multiple items to tree at unique words', () => {
        const tree = new PrefixTree();
        const word = 'word';

        const itemCount = 4;
        for (let i=0; i<itemCount; i++) {
            tree.add(`${word}${i}`, new ItemModel());
        }

        expect(tree.size).toBe(word.length + 1 + itemCount);
    });

    // Test insertion of multiple items at the same word in the tree
    it('can add multiple items to tree at same word', () => {
        const tree = new PrefixTree();
        const word = 'word';
        const items = [new ItemModel(word, 0), new ItemModel(word, 1), new ItemModel(word, 2)];
        
        for (const item of items) {
            tree.add(word, item);
        }

        expect(tree.size).toBe(word.length + 1);
        
        const retrievedItems = tree.search(word);
        for (const item of items) {
            expect(retrievedItems).toContain(item);
        }
    });

    // Test the specific search functionality of the tree
    it('can find items with specifc name in tree', () => {
        const tree = new PrefixTree();
        const item = new ItemModel();
        const word = 'word';
        
        tree.add(word, item);

        expect(tree.search(word)).toContain(item);
    });

    // Test the prefix search functionality of the tree
    it('can find items starting with string in tree', () => {
        const tree = new PrefixTree();
        const item1 = new ItemModel('word1');
        const item2 = new ItemModel('word2');
        
        tree.add('word1', item1);
        tree.add('word2', item2);

        expect(tree.searchWithPrefix('wo')).toContain(item1);
        expect(tree.searchWithPrefix('wo')).toContain(item2);
    });

    // Test the removal of an item at a word in the tree
    it('can remove item from tree', () => {
        const tree = new PrefixTree();
        const item = new ItemModel();
        const word = 'word';
        
        tree.add(word, item);
        tree.remove(word, item);

        expect(tree.search(word)).toHaveLength(0);
    });

    // Test the removal of an item in the tree containing multiple items
    it('can remove item from tree with multiple words', () => {
        const tree = new PrefixTree();
        const word = 'word';
        const word2 = `${word}2`;
        const item1 = new ItemModel(word);
        const item2 = new ItemModel(word2);
        const item3 = new ItemModel(word);
        
        tree.add(word, item1);
        tree.add(word2, item2);
        tree.add(word, item3);
        
        tree.remove(word, item1);

        expect(tree.search(word)).toHaveLength(1);
        expect(tree.size).toBe(word.length + 2);
    });
});