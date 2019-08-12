import { DEBUG } from './globals';
import helper from './helper';

const debug = {
    promiseFailureTrace: (key, err) => {
        if (DEBUG.DEBUG) {
            let promiseFailure = `[PROMISE] failed: ${key} error: ${JSON.stringify(err)}`;
            console.trace(`%c${promiseFailure}`, 'background: #ffe5e5; color: #FF0000');
            return promiseFailure;
        }
        else {
            return false;
        }
    },
    promiseFailure: (key, err) => {
        if (DEBUG.DEBUG) {
            let promiseFailure = `[PROMISE] failed: ${key} error: ${JSON.stringify(err)}`;
            console.trace(`%c${promiseFailure}`, 'background: #ffe5e5; color: #FF0000');
            return promiseFailure;
        }
        else {
            return false;
        }
    },
    promiseSuccessful: (key, info = null) => {
        if (DEBUG.SUCCESS) {
            let promiseSuccessful = `[PROMISE] answer: ${key} ${info != null ? `| info: ${info}` : ``}`;
            console.log(`%c${promiseSuccessful}`, 'background: #eaffea');
            return promiseSuccessful;
        }
        else {
            return true;
        }
    },
    databasePromiseSuccessful: (key, query = null, extras = null) => {
        if (DEBUG.DATABASE) {
            let databasePromiseSuccessful = `[DATABASE] answer: ${key} ${helper.validate(query) && DEBUG.DATABASE_QUERY ? `query: ${query}` : ''} ${helper.validate(extras) ? `extras: ${extras}` : ''}`;
            console.log(`%c${databasePromiseSuccessful}`, 'background: #eaffea');
            return databasePromiseSuccessful;
        }
        else {
            return true;
        }
    },
    databasePromiseFailure: (key, err, query = null, extras = null) => {
        if (DEBUG.DATABASE) {
            let databasePromiseFailure = `[DATABASE ERROR] failed: ${key} error: ${JSON.stringify(err)} ${helper.validate(query) && DEBUG.DATABASE_QUERY ? `query: ${query}` : ''} ${helper.validate(extras) ? `extras: ${extras}` : ''}`;
            console.trace(`%c${databasePromiseFailure}`, 'background: #ffe5e5; color: #FF0000');
            return databasePromiseFailure;
        }
        else {
            return false;
        }
    },
    error: (key, err) => {
        if (DEBUG.DEBUG) {
            let error = `[ERROR] failed: ${key} error: ${JSON.stringify(err)}`;
            console.trace(`%c${error}`, 'background: #ffe5e5; color: #FF0000');
            return error;
        }
        else {
            return false;
        }
    },
    success: (key) => {
        if (DEBUG.SUCCESS) {
            let success = `SUCCESS: ${key}`;
            console.log(`%c${success}`, 'background: #eaffea');
            return success;
        }
        else {
            return true;
        }
    },
    info: (key) => {
        if (DEBUG.INFO) {
            let info = `INFO: ${key}`;
            console.log(`%c${info}`, 'background: rgb(255, 250, 227)');
            return info;
        }
        else {
            return true;
        }
    }
}

export default debug;