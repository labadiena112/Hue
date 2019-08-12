import { LOAD_DATA } from '../actionTypes';
import { setUsernameAndUrl_RP, getLights_RP, getGroups_RP, getScenes_RP } from './hueApi';
import { getLang_RP } from './lang';

export function loadAppData_RP(username) {
    return (dispatch) => {
        let getLang_P = dispatch(getLang_RP('lt'));
        let setUsernameAndUrl_P = dispatch(setUsernameAndUrl_RP(username)).then(usernameSuccess => {
            let getLights_P = dispatch(getLights_RP());
            let getGroups_P = dispatch(getGroups_RP());
            //let getScenes_P = dispatch(getScenes_RP());
            return Promise.all([usernameSuccess, getLights_P, getGroups_P]);
        }).catch(err => {
            return Promise.reject(err);
        });
        return Promise.all([getLang_P, setUsernameAndUrl_P]);
        dispatch({ type: LOAD_DATA, dataLoaded: true });
    };
}