const sqlite3 = require('sqlite3');

class BaseEntity {
    constructor(db) {
        this.db = db;
    }

    get tableName() {
        throw new Error('You have to implement the method "tableName"!');
    }

    async save() {
        const { db, ...entityData } = this;
        const columns = Object.keys(entityData).join(', ');
        const values = Object.values(entityData).map(value => {
            if (typeof value === 'string') {
                // Remove single quotes from the string
                value = value.replace(/'/g, '');
                return `'${value}'`;
            } else {
                return value === null || value === undefined || value === '' ? 'NULL' : value;
            }
        }).join(', ');
        
        if (await this.exists(this['id'])) {
            await this.update();
        } else {
            const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values})`;
            await this.run(sql);
        }
        
    }
    
    async exists(id) {
        if (!id) return false;
        const sql = `SELECT 1 FROM ${this.tableName} WHERE id = ${id} LIMIT 1`;
        const result = await BaseEntity.get(this.db, sql);
        return result !== undefined;
    }

    async update() {
        const { db, ...entityData } = this;
        const columns = Object.keys(entityData).map(key => `${key} = ?`).join(', ');
        const values = Object.values(entityData).map(value => {
            if (typeof value === 'string') {
                return `${value}`;
            } else {
                return value === null || value === undefined || value === '' ? 'NULL' : value;
            }
        });

        const sql = `UPDATE ${this.tableName} SET ${columns} WHERE id = ?`;
        values.push(this['id']);
        await this.run(sql, values);
    }
    
    async delete() {
        console.log('Deleted entity:', this);
        const id = this['id'];
        if (!id) {
            throw new Error('Cannot delete entity without id.');
        }
        const sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
        await this.run(sql);
    }

    async deleteById(id) {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
        await this.run(sql);
    }

    static async findById(db, id) {
        const tableName = this.prototype.tableName;
        const sql = `SELECT * FROM ${tableName} WHERE id = ${id}`;
        const row = await BaseEntity.get(db, sql);
        if (row) {
            return new this(db, row);
        }
        return undefined;
    }

    static async findBy(db, filters) {
        const tableName = this.prototype.tableName;
        let whereClause = '';
        filters.forEach((filter, index) => {
            const [column, operator, value] = filter;
            if (index > 0) {
                whereClause += ' AND ';
            }
            whereClause += `${column} ${operator} '${value}'`;
        });

        const sql = `SELECT * FROM ${tableName} WHERE ${whereClause}`;
        const rows = await BaseEntity.all(db, sql);
        return rows.map(row => new this(db, row));
    }

    static async findAll(db) {
        const tableName = this.prototype.tableName;
        const sql = `SELECT * FROM ${tableName}`;
        const rows = await BaseEntity.all(db, sql);
        return rows.map(row => new this(db, row));
    }

    static async findFirst(db) {
        const tableName = this.prototype.tableName;
        const sql = `SELECT * FROM ${tableName} LIMIT 1`;
        const rows = await BaseEntity.all(db, sql);
        if (rows.length > 0) {
            return new this(db, rows[0]);
        }
        return undefined;
    }

    static async clear(db) {
        const tableName = this.prototype.tableName;
        const sql = `DELETE FROM ${tableName}`;
        await new Promise((resolve, reject) => {
            db.run(sql, function (err) {
                if (err) {
                    console.error('Error clearing table:', sql, err);
                    reject(err);
                } else {
                    resolve('11');
                }
            });
        });
    }

    static  myclear(db) {
        const tableName = this.prototype.tableName;
        const sql = `DELETE FROM ${tableName}`;

        db.run(sql, function (err) {
            if (err) {
                console.error('Error clearing table:', sql, err);
                return "error";
            } else {
                return "ok"
            }
        });
    }

    static async get(db, sql) {
        return new Promise((resolve, reject) => {
            db.get(sql, (err, row) => {
                if (err) {
                    console.error('Error fetching entity:', sql, err);
                    reject(err);
                } else {
                    resolve(BaseEntity.removeQuotes(row));
                }
            });
        });
    }

    async run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.error('Error running query:', sql, err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static async all(db, sql) {
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    console.error('Error fetching entities:', sql, err);
                    reject(err);
                } else {
                    resolve(rows.map(row => BaseEntity.removeQuotes(row)));
                }
            });
        });
    }

    static removeQuotes(row) {
        if (!row) {
            return row;
        }

        const result = {};
        for (const key in row) {
            if (typeof row[key] === 'string' && row[key].startsWith("'") && row[key].endsWith("'")) {
                result[key] = row[key].slice(1, -1);
            } else {
                result[key] = row[key];
            }
        }
        return result;
    }

    static createSQLCreateTable(tableName, fields) {
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS ${tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ${fields.map(field => `${field.name} ${field.type}`).join(', ')}
            )
        `;
        return createTableSQL;
    }
    static createSQLInsertMass(tableName,fields, rows){
        let sql = `insert into ${tableName} (id,${fields.map(field => `${field.name}`).join(', ')}) values `;
        rows.forEach((item,index)=>{
            if (index!=0)    
                sql+=",";
            sql+=`(${index+1},${fields.map(field=>{
                if (item[field.name]==null)
                    return `''`;
                else if(typeof item[field.name]=='number')
                {
                    return item[field.name];
                }
                else
                    return `'${(item[field.name]).replace(/'/g, "&#39;")}'`
            })})`;
        })
        return sql;
    }
}

module.exports = BaseEntity;