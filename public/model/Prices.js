const BaseEntity  = require('./BaseEntity');

class Prices extends BaseEntity {
    static tableName = 'prices';
    static fields = [
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'item_code', type: 'TEXT' },
        { name: 'packing_unit', type: 'INTEGER' },
        { name: 'item_name', type: 'TEXT' },
        { name: 'item_description', type: 'TEXT' },
        { name: 'price_list', type: 'TEXT' },
        { name: 'customer', type: 'TEXT' },
        { name: 'price_list_rate', type: 'TEXT' },
    ];

    constructor(db, entityData) {
        super(db);
        this.id = entityData.id;
        this.name = entityData.name;
        this.item_code = entityData.item_code;
        this.packing_unit = entityData.packing_unit;
        this.item_name = entityData.item_name;
        this.item_description = entityData.item_description;
        this.price_list = entityData.price_list;
        this.customer = entityData.customer;
        this.price_list_rate = entityData.price_list_rate;
    }

    get tableName() {
        return Prices.tableName;
    }
}

module.exports = { Prices };