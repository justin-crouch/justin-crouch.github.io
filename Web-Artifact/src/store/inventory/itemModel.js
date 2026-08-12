/**
 * ItemModel
 * 
 * @description represents an item in the inventory
 */
export class ItemModel {

    // Construct new item from scratch or from serialized data
    constructor(name = '', stock = 0, fromSerialized = null) {
        // Flag if the item is selected via the UI
        this.selected = false;

        // Fire update callback when the name, stock, location, or category changes
        this.onUpdate = async (self) => {};

        // Construct item from serialized data
        if(fromSerialized !== null) {
            this.id = fromSerialized.id;
            
            this._name = fromSerialized.name;
            this._stock = fromSerialized.stock;
            this._location = fromSerialized.location;
            this._category = fromSerialized.category;
    
            return this;
        }

        // Construct item from scratch
        this.id = self.crypto.randomUUID();
        
        this._name = name;
        this._stock = stock;
        this._location = '';
        this._category = '';
    }


    // --- GETTERS ---------------------------------------
    get name() {
        return this._name;
    }

    get stock() {
        return this._stock;
    }

    get location() {
        return this._location;
    }

    get category() {
        return this._category;
    }
    // --- END GETTERS -----------------------------------


    // --- SETTERS ---------------------------------------
    set name(newName) {
        this._name = newName;

        this.onUpdate(this);
    }

    // Ensure new stock level is non-negative
    set stock(newStock) {
        if(newStock >= 0) {
            this._stock = newStock;
        }

        this.onUpdate(this);
    }

    set location(newLocation) {
        this._location = newLocation;

        this.onUpdate(this);
    }

    set category(newCategory) {
        this._category = newCategory;

        this.onUpdate(this);
    }
    // --- END SETTERS -----------------------------------

    // Return object without methods for saving to database
    serialize() {
        return {
            id: this.id,
            name: this._name,
            stock: this._stock,
            location: this._location,
            category: this._category
        };
    }
}
