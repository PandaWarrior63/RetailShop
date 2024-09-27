// main.ts
const {ipcMain} = require('electron');
const sqlite3 = require('sqlite3');  // or import Database from 'better-sqlite3';
const fs = require('fs');
const { Warehouse } = require('./model/Warehouse');
const { Items } = require('./model/Items');
const { Prices } = require('./model/Prices');
const BaseEntity = require('./model/BaseEntity');

let db;

function setupDatabase(){
    const path = './database';

    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
    db = new sqlite3.Database('database/mydatabase.db', (err) => {
        if (err) {
          console.error('Error opening database', err.message);
        } else {
            console.log('Connected to SQLite database');
            db.serialize(() => {
                
                db.run(Warehouse.createSQLCreateTable(Warehouse.tableName, Warehouse.fields));
                db.run(Items.createSQLCreateTable(Items.tableName, Items.fields));
                db.run(Prices.createSQLCreateTable(Prices.tableName, Prices.fields));
                // const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
                // for (let i = 0; i < 10; i++) {
                //     stmt.run("Ipsum " + i);
                // }
                // stmt.finalize();
            
                // db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
                //     console.log(row.id + ": " + row.info);
                // });
            });
        }
    });


    // Expose functions via ipcMain for React to interact with SQLite
    ipcMain.handle('get-users', async () => {
        return new Promise((resolve, reject) => {
            try{
                db.all('SELECT * FROM users', [], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            }catch(e)
            {
                reject(e);
            }
        });
    });
    ipcMain.handle('get-warehouses', async () => {
        return new Promise((resolve, reject) => {
            try{
                db.all("SELECT * FROM warehouse where parent_warehouse!=''", [], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            }catch(e)
            {
                reject(e);
            }
        });
    });
    ipcMain.handle('save-init-data', async (event,data) => {
        return new Promise((resolve, reject) => {
            try{
                
                db.serialize(async () => {
                    const uptimeSeconds = process.uptime(); // Get uptime in seconds
                    await Warehouse.myclear(db);
                    await Items.clear(db);
                    await Prices.clear(db);
                    console.log("Run time:",process.uptime()-uptimeSeconds);
                    // data.warehouses.forEach(async (element, index) => {
                    //     const wareHouse = new Warehouse(db, {
                    //         id: index + 1,
                    //         name: element.name,
                    //         parent: element.parent_warehouse,
                    //         warehouse_name: element.warehouse_name
                    //     });
                    //     await wareHouse.save();
                    // });
                    
                    let sql = Warehouse.createSQLInsertMass(Warehouse.tableName,Warehouse.fields,data.warehouses);
                    await db.run(sql);
                    console.log("Run time:",process.uptime()-uptimeSeconds);

                    sql = Items.createSQLInsertMass(Items.tableName,Items.fields,data.items);
                    await db.run(sql);
                    console.log("Run time:",process.uptime()-uptimeSeconds);
                    
                    sql = Prices.createSQLInsertMass(Prices.tableName,Prices.fields,data.prices);
                    await db.run(sql);
                    console.log("Run time:",process.uptime()-uptimeSeconds);
                    // const batchSize = 20; // Adjust this based on your performance needs
                    // let batch = [];
                    // data.items.forEach((element, index) => {
                    //     const item = new Items(db, {
                    //         id: index + 1,
                    //         name: element.name,
                    //         item_code: element.item_code,
                    //         item_name: element.item_name,
                    //         item_group: element.item_group,
                    //         image: element.image,
                    //         description: element.description
                    //     });
                
                    //     batch.push(item);
                    //     console.log("Batch Size",batch.length);
                    //     // Insert items in batches of 'batchSize'
                    //     if (batch.length === batchSize) {
                    //         try {
                    //             console.log("Batch Size1",batch.length);
                    //             Promise.all(batch.map(item => item.save()));
                    //             console.log("Batch Size2",batch.length);
                    //             batch = []; // Reset the batch
                    //             console.log("Batch Size3",batch.length);
                    //         } catch (error) {
                    //             console.log("Batch Size4",batch.length);
                    //             console.error('Error in batch insert:', error);
                    //         }
                    //     }
                    // });

                    //  batch = [];
                    // data.prices.forEach(async (element, index) => {
                    //     const items = new Prices(db, {
                    //         id: index + 1,
                    //         name: element.name,
                    //         item_code: element.item_code,
                    //         packing_unit: element.packing_unit,
                    //         item_name: element.item_name,
                    //         item_description: element.item_description,
                    //         price_list: element.price_list,
                    //         customer: element.customer,
                    //         price_list_rate: element.price_list_rate,
                    //     });
                    //     batch.push(items);
                
                    //     // Insert items in batches of 'batchSize'
                    //     if (batch.length === batchSize) {
                    //         try {
                    //             await Promise.all(batch.map(items => items.save()));
                    //             batch = []; // Reset the batch
                    //         } catch (error) {
                    //             console.error('Error in batch insert:', error);
                    //         }
                    //     }
                    // });
                });
                // db.serialize(() => {
                //     db.run("CREATE TABLE IF NOT EXISTS lorem11 (info TEXT)");
                // });
                
                resolve("ok");
            }catch(e)
            {
                reject(e);
            }
        });
    });
}
module.exports = {
    setupDatabase
};
