import { OPEN_DATABASE } from '../actionTypes';
import { initDatabase } from '../../database/database';

export function openDatabase_R() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            initDatabase().then(_ => {
                dispatch({ type: OPEN_DATABASE, databaseLoaded: true });
                resolve(true);
            }).catch(err => {
                dispatch({ type: OPEN_DATABASE, databaseLoaded: false });
                reject(false);
            });
        });
    };
}