/**
 * PrefixTreeNode
 * @description building block of a Prefix Tree;
 *      stores map of child nodes and map of items
 */
export class PrefixTreeNode {
    // Declare private fields
    // #children;
    // #items;

    // // True if children and items are empty; false otherwise
    // #isEmpty;

    // Initialize fields when node is created
    constructor() {
        this.children = new Map();
        this.items = new Map();
        this.isEmpty = true;
    }

    // Return if node has no children and no items
    // get isEmpty() {
    //     return this.#isEmpty;
    // };


    // --- CHILDREN METHODS --------------------------------
    // Return a list of all children nodes
    getChildren() {
        return this.children.values().toArray();
    }

    getCharacters() {
        return this.children.keys().toArray();
    }

    // Return a specifc child node
    getChild(char) {
        return this.children.get(char);
    }

    // Insert a node at a specifc place in the children map
    addChild(char, node = new PrefixTreeNode()) {
        this.children.set(char, node);
        this.isEmpty = false;
        return node;
    }
    
    // Remove a specific child node
    removeChild(char) {
        this.children.delete(char);

        // Node is empty if children and items are empty
        this.isEmpty = this.children.size == 0 && this.items.size == 0;
    }
    // --- END CHILDREN METHODS ----------------------------
    

    // --- ITEMS METHODS -----------------------------------
    // Return a list of all items
    getItems() {
        return this.items.values().toArray();
    }

    getItemIDs() {
        return this.items.keys().toArray();
    }

    // Return a specific item
    getItem(item) {
        return this.items.get(item.id);
    }
    
    // Insert an item into the items map
    addItem(item) {
        this.items.set(item.id, item);
        this.isEmpty = false;
    }
    
    // Remove a specifc item
    removeItem(item) {
        this.items.delete(item.id);

        // Node is empty if children and items are empty
        this.isEmpty = this.children.size == 0 && this.items.size == 0;
    }
    // --- END ITEMS METHODS -------------------------------
}