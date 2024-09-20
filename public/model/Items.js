const BaseEntity  = require('./BaseEntity');

class Items extends BaseEntity {
    static tableName = 'items';
    static fields = [
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'item_code', type: 'TEXT' },
        { name: 'item_name', type: 'TEXT' },
        { name: 'item_group', type: 'TEXT' },
        { name: 'image', type: 'TEXT' },
        { name: 'description', type: 'TEXT' },
    ];

    constructor(db, entityData) {
        super(db);
        this.id = entityData.id;
        this.name = entityData.name;
        this.item_code = entityData.item_code;
        this.item_name = entityData.item_name;
        this.item_group = entityData.item_group;
        this.image = entityData.image;
        this.description = entityData.description;
    }

    get tableName() {
        return Items.tableName;
    }
}

module.exports = { Items };