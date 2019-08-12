import GLOBALS, { DEBUG } from './globals';
import debug from '../plugins/debug';
import { Dimensions } from 'react-native';

const helper = {
    toRadians: (coord) => {
        return coord * Math.PI / 180;
    },
    validate: (variable) => {
        if (variable != undefined && variable != null && variable != '') {
            return true;
        }
        else return false;
    },
    sortBy: (prop) => {
        return function (x, y) {
            return ((x[prop] === y[prop]) ? 0 : ((x[prop] > y[prop]) ? 1 : -1));
        };
    },
    clamp: (objToClamp, minValue) => {
        Object.keys(objToClamp).map((item, index) => {
            if (objToClamp[item] < minValue) {
                objToClamp[item] = minValue;
            }
        });
    }
}

export default helper;