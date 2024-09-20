// main.ts
const {ipcMain} = require('electron');
const sqlite3 = require('sqlite3');  // or import Database from 'better-sqlite3';
const fs = require('fs');

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
                db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");
            
                const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
                for (let i = 0; i < 10; i++) {
                    stmt.run("Ipsum " + i);
                }
                stmt.finalize();
            
                db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
                    console.log(row.id + ": " + row.info);
                });
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
    ipcMain.handle('create-test', async () => {
        return new Promise((resolve, reject) => {
            try{
                db.serialize(() => {
                    db.run("CREATE TABLE IF NOT EXISTS lorem11 (info TEXT)");
                });
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
