const BaseEntity  = require('./BaseEntity');

class Warehouse extends BaseEntity {
    static tableName = 'warehouse';
    static fields = [
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'parent_warehouse', type: 'TEXT' },
        { name: 'warehouse_name', type: 'TEXT' },
    ];

    constructor(db, entityData) {
        super(db);
        this.id = entityData.id;
        this.name = entityData.name;
        this.parent_warehouse = entityData.parent_warehouse;
        this.warehouse_name = entityData.warehouse_name;
    }

    get tableName() {
        return Warehouse.tableName;
    }
}

module.exports = { Warehouse };