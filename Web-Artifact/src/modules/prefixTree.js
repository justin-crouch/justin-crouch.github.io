import { PrefixTreeNode } from "./prefixTreeNode";

/**
 * PrefixTree
 * @description class to store items and allow for
 *      efficient searches via a string
 */
export class PrefixTree {
    // // Declare private fields
    // #root;

    // // Number of nodes in the tree
    // #size;

    // Initialize fields when tree is created
    constructor() {
        this.root = new PrefixTreeNode();
        this.size = 1;
    }

    
    // --- PUBLIC METHODS --------------------------------------
    // Return the size of the tree
    // get size() {
    //     return this.size;
    // }

    // Insert an item at a specific word
    add(word, item) {
        let curr_node = this.root;

        // Loop through each character in word
        for(const character of word) {
            // Create a new child node if current node does not have the current character
            let next_node = curr_node.getChild(character);
            if(next_node === undefined) {
                next_node = curr_node.addChild(character);
                this.size++;
            }

            // Use the next node
            curr_node = next_node;
        }

        // Insert item into the final child node
        curr_node.addItem(item);
    }

    // Return all items at a specific query
    search(query) {
        let curr_node = this.root;

        // Loop through each character in word
        for(const character of query) {
            // Return empty list if current node does not have the next character
            const next_node = curr_node.getChild(character);
            if(next_node === undefined) {
                return [];
            }

            // Use the next node
            curr_node = next_node;
        }

        // Return list of the final child node
        return curr_node.getItems();
    }
    
    // Return all items starting with a query
    searchWithPrefix(query) {
        const found_items = [];
        let curr_node = this.root;

        // Loop through each character in word
        for(const character of query) {
            // Return empty list if current node does not have the next character
            const next_node = curr_node.getChild(character);
            if(next_node === undefined) {
                return [];
            }

            // Use the next node
            curr_node = next_node;
        }

        // Append all items of all child nodes
        this.getSubtreeItems(curr_node, found_items);

        return found_items;
    }
    
    // Remove an item at a specific query
    remove(query, item) {
        this.removeSubtree(this.root, query, item, 0);
    }

    // Represent tree as a string
    toString() {
        const node_connections = [];
        this.stringifySelf(this.root, node_connections);

        return node_connections.join('\n');
    }
    // --- END PUBLIC METHODS -----------------------------------
    

    // --- PRIVATE METHODS --------------------------------------
    // Append items of all nodes in a subtree using DFS
    getSubtreeItems(node, items) {
        // Append items of current node to list of items
        for(const item of node.getItems()) {
            items.push(item);
        }

        // Recursively append items of children
        for(const child of node.getChildren()) {
            this.getSubtreeItems(child, items);
        }
    }
    
    // Remove an item and empty nodes from subtree using DFS
    removeSubtree(node, query, item, depth) {
        // When end of query is reached...
        if(depth == query.length) {
            // Remove item if current node contains item
            if(node.getItem(item)) {
                node.removeItem(item);
            }

            // Mark current node for deletion if empty
            return node.isEmpty;
        }

        // When end of query is not reached, get the next character and next node
        const next_character = query[depth];
        const next_node = node.getChild(next_character);

        // Stop recursive branch if current node does not contain next character
        if(next_node === undefined) {
            return false;
        }

        // Recursively traverse through next node to remove item
        const remove_next_node = this.removeSubtree(next_node, query, item, depth + 1);

        // Remove next node from current node if next node is marked for deletion
        if(remove_next_node) {
            node.removeChild(next_character);
            return node.isEmpty;
        }

        return false;
    }

    // Perform depth-first traversal to obtain array of all nodes and their connections
    stringifySelf(node, node_connections) {
        // Append root connection string
        if(node === this.root) {
            node_connections.push('* => ');
        }
        
        // Get last connection added to list
        const last_level = node_connections.length - 1;

        // For each child character connected to the node...
        for(const character of node.getCharacters()) {
            // Append character to node connection
            node_connections[last_level] += character + ' : ';

            // Add new level for the next node
            const next_node = node.getChild(character);
            node_connections.push(character + ' => ');

            // Traverse through next node
            this.stringifySelf(next_node, node_connections);
        }
    }
    // --- END PRIVATE METHODS ----------------------------------
}