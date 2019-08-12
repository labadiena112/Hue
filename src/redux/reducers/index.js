import databaseInit from './databaseInit';
import langReducer from './lang';
import hueApiReducer from './hueApi';
import multiLoadsReducer from './multiLoads';
import { combineReducers } from "redux";

export default combineReducers({
    databaseInit: databaseInit,
    lang: langReducer,
    api: hueApiReducer,
    multiLoads: multiLoadsReducer
}); 