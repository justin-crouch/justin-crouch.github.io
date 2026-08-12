// Library to turn IndexedDB API from event-based to promise-based
import { openDB } from "idb";
import { ItemModel } from "./itemModel";

/**
 * ItemHelper
 * @description singleton to perform CRUD operations on the database
 *      to manage item persistence
 */
export class ItemHelper {
    // Variable to store single instance of class
    static _instance;

    // Variables to setup and access database and object stores
    static DB_VERSION = 1;
    static DB_NAME = 'InventoryDB';
    static ITEM_STORE_NAME = 'item';
    static CATEGORY_STORE_NAME = 'category';

    // Set up database connection on object initialization
    constructor() {
        // Ensure only one instance of this class can exists
        if(ItemHelper._instance) {
            return ItemHelper._instance;
        }
        ItemHelper._instance = this;

        // Connect to database
        this._dbPromise = openDB(ItemHelper.DB_NAME, ItemHelper.DB_VERSION, {
            // Setup object stores if client's database is outdated
            upgrade(db, oldVersion, newVersion, transaction, event) {
                db.createObjectStore(ItemHelper.ITEM_STORE_NAME, {keyPath: 'id'});
                db.createObjectStore(ItemHelper.CATEGORY_STORE_NAME, {keyPath: 'name'});
            },
            blocked(currentVersion, blockedVersion, event) {
            },
            blocking(currentVersion, blockedVersion, event) {
            },
            terminated() {
            },
        });

        // Cache number of items in inventory
        this._count = null;

        // Cache list of unique categories in inventory
        this._categories = null;
    }

    // Get number of items in inventory
    async count() {
        // Retrieve count from database on first call
        if(this._count === null) {
            this._count = await (await this._dbPromise).count(ItemHelper.ITEM_STORE_NAME);
        }
        return this._count;
    }

    // Get list of unique categories in inventory
    async getCategories() {
        // Retrieve list from database on first call
        if(this._categories === null) {
            this._categories = await (await this._dbPromise).getAllKeys(ItemHelper.CATEGORY_STORE_NAME);
        }
        return this._categories;
    }

    // Add a new category to the database
    async addCategory(category) {
        // Get current list of unique categories
        const categories = await this.getCategories();

        // Add category if it is unique
        if(!categories.includes(category) && category.trim() !== '') {
            (await this._dbPromise).add(ItemHelper.CATEGORY_STORE_NAME, {name: category});
            this._categories.push(category);
        }
    }

    // Remove category from the database
    async deleteCategory(category) {
        (await this._dbPromise).delete(ItemHelper.CATEGORY_STORE_NAME, category);
        this._categories.filter(cat => cat != category);
    }

    // Add an item to the database
    async insert(item) {
        // Return a promise to add the item
        return (await this._dbPromise).add(ItemHelper.ITEM_STORE_NAME, item.serialize())
        .then(async () => {
                // Setup update callback if item was successfully added
                item.onUpdate = async (self) => {
                    (await this._dbPromise).put(ItemHelper.ITEM_STORE_NAME, self.serialize());
                };

                // Add item's category to database if it is unique
                await this.addCategory(item.category);

                // Increase and return item count
                this._count++;
                return this._count;
            });
    }

    // Retrieve one item based on an ID
    async getOne(id) {
        const serializedItem = await (await this._dbPromise).get(ItemHelper.ITEM_STORE_NAME, id);

        // Initialize new item object from serialized data
        return new ItemModel(null, null, serializedItem);
    }

    // Retrieve all items from database
    async getAll() {
        // Get list of all serialized data
        const serializedItems = await (await this._dbPromise).getAll(ItemHelper.ITEM_STORE_NAME);
        const items = [];

        // Initialize new item objects from serialized data
        // Set up update callbacks on new item objects
        for(const serializedItem of serializedItems) {
            const newItem = new ItemModel(null, null, serializedItem);
            newItem.onUpdate = async (self) => {
                (await this._dbPromise).put(ItemHelper.ITEM_STORE_NAME, self.serialize());
            };
            items.push(newItem);
        }

        return items;
    }

    // Remove an item from the database
    async delete(item) {
        return (await this._dbPromise).delete(ItemHelper.ITEM_STORE_NAME, item.id)
            .then(() => {
                // If deletion is successful, remove one from item count
                this._count--;
                return this._count;
            });
    }
}
