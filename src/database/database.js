import SQLite, { SQLiteDatabase } from "react-native-sqlite-storage";
import GLOBALS from "../plugins/globals";
import debug from '../plugins/debug';
import { AsyncStorage } from 'react-native';

export var master_db: SQLiteDatabase;
export var settings_db: SQLiteDatabase;
export var db: SQLiteDatabase;

export function initDatabase() {
    SQLite.enablePromise(true);
    return new Promise((resolve, reject) => {
        let delete_db = [];
        AsyncStorage.getItem("master_database_name", (err, master_result) => {
            AsyncStorage.getItem("settings_database_name", (err, settings_result) => {
                if (master_result !== GLOBALS.MASTER_DB.NAME) {
                    delete_db.push(SQLite.deleteDatabase(GLOBALS.MASTER_DB.NAME));
                    AsyncStorage.setItem("master_database_name", GLOBALS.MASTER_DB.NAME);
                }
                if (settings_result !== GLOBALS.SETTINGS_DB.NAME) {
                    delete_db.push(SQLite.deleteDatabase(GLOBALS.SETTINGS_DB.NAME));
                    AsyncStorage.setItem("settings_database_name", GLOBALS.SETTINGS_DB.NAME);
                }
                delete_db.push(Promise.resolve(true));
                Promise.all(delete_db).then(successes => {
                    debug.promiseSuccessful('initDatabase->delete_db', `Cached database deletion was successful ${successes}`);
                    openDatabase().then(dbOpened => {
                        resolve(dbOpened);
                    }).catch(err => {
                        reject(err);
                    });
                }).catch(err => { //nieko tokio, jeigu ir nepavyksta. reikalinga tik istrinti senai db, ir atnaujinti
                    debug.promiseFailureTrace('initDatabase->delete_db', err);
                    openDatabase().then(dbOpened => {
                        resolve(dbOpened);
                    }).catch(err => {
                        reject(err);
                    });
                });
            })
        });
    });
}

export function openDatabase() {
    return new Promise((resolve, reject) => {
        settings_db = SQLite.openDatabase({ name: GLOBALS.SETTINGS_DB.NAME, location: GLOBALS.SETTINGS_DB.LOCATION, createFromLocation: `/${GLOBALS.SETTINGS_DB.FILE_NAME}` }).then(DB => {
            master_db = SQLite.openDatabase({ name: GLOBALS.MASTER_DB.NAME, location: GLOBALS.MASTER_DB.LOCATION, createFromLocation: `/${GLOBALS.MASTER_DB.FILE_NAME}` }).then(DB => {
                DB.attach(GLOBALS.SETTINGS_DB.NAME, GLOBALS.SETTINGS_DB.NAME, () => {
                    debug.success("initDatabase");
                    db = DB;
                    resolve(true);
                }, err => {
                    debug.info("===================WHAT TO DO HERE?===================");
                    resolve(true);
                });
            }).catch(err => {
                reject(debug.promiseFailureTrace("openDatabase->settings_db->master_db", err));
            });
        }).catch(err => {
            reject(debug.promiseFailureTrace("openDatabase->settings_db", err));
        });
    });
}

export function test() {
    console.log("testing...");
    db.transaction(tx => {
        tx.executeSql(`SELECT * from settings`, [], (data, results) => {
            let len = results.rows.length;
            console.log(len + " db ro  ws");
        });
    });
}
