import { SET_USERNAME_AND_URL, GET_LIGHTS, GET_GROUPS, GET_SCENES } from '../actionTypes';
import { DIRS } from '../../plugins/globals';
import fetcher from "../../plugins/fetchHelper";
import hueHelper from '../../plugins/hueHelper';

export function setUsernameAndUrl_RP(username) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({ type: SET_USERNAME_AND_URL, username: username, url: `${DIRS.IP}/api/${username}` });
            resolve(true);
        });
    };
}

export function getLights_RP() {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            fetcher.getResource('lights').then(resp => {
                dispatch({ type: GET_LIGHTS, lights: resp });
                resolve(true);
            }).catch(err => {
                dispatch({ type: GET_LIGHTS, lights: getState().api.lights });
                reject(err);
            });
        })
    };
}

export function getGroups_RP() {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            fetcher.getResource('groups').then(groups => {
                Object.keys(groups).map(lightId => {
                    groups[lightId].action = hueHelper.setHue(groups[lightId].action);
                });
                dispatch({ type: GET_GROUPS, groups: groups });
                resolve(true);
            }).catch(err => {
                dispatch({ type: GET_GROUPS, groups: getState().api.groups });
                reject(err);
            });
        })
    };
}

export function getScenes_RP() {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            fetcher.getResource('scenes').then(resp => { //scenes with no lightstates
                fetcher.getScenesLightStates(resp).then(scenes => { //scenes with lightstates
                    Object.keys(resp).map((id, i) => {
                        scenes[i].id = id;
                        Object.keys(scenes[i].lightstates).map(lightId => {
                            scenes[i].lightstates[lightId] = hueHelper.setHue(scenes[i].lightstates[lightId]);
                        });
                    })
                    console.log(scenes, "light states")
                    dispatch({ type: GET_SCENES, scenes: scenes });
                    resolve(true)
                }).catch(err => {
                    dispatch({ type: GET_SCENES, scenes: getState().api.scenes });
                    reject(err);
                });
            }).catch(err => {
                dispatch({ type: GET_SCENES, scenes: getState().api.scenes });
                reject(err);
            });
        })
    };
}

export function switchLightState_RP(i, on, isGroup) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            if (isGroup) {
                fetcher.switchLightState(i, on, true).then(newState => {
                    let groups = getState().api.groups;
                    groups[i].action.on = newState;
                    dispatch({ type: GET_GROUPS, groups: groups });
                    resolve(true)
                }).catch(err => {
                    dispatch({ type: GET_GROUPS, groups: getState().api.groups })
                    reject(err);
                });
            } else {
                fetcher.switchLightState(i, on, false).then(newState => {
                    let lights = getState().api.lights;
                    lights[i].state.on = newState;
                    dispatch({ type: GET_LIGHTS, lights: lights });
                    resolve(true)
                }).catch(err => {
                    dispatch({ type: GET_LIGHTS, lights: getState().api.lights })
                    reject(err);
                });
            }
        })
    }
}

export function changeLightBrightness_RP(i, bri, isGroup) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            if (isGroup) {
                fetcher.changeLightBrightness(i, bri, true).then(newState => {
                    let groups = getState().api.groups;
                    groups[i].bri = newState;
                    dispatch({ type: GET_GROUPS, groups: groups });
                    resolve(true)
                }).catch(err => {
                    dispatch({ type: GET_GROUPS, groups: getState().api.groups })
                    return Promise.reject(err);
                });
            } else {
                fetcher.changeLightBrightness(i, bri, false).then(newState => {
                    let lights = getState().api.lights;
                    lights[i].bri = newState;
                    dispatch({ type: GET_LIGHTS, lights: lights });
                    resolve(true)
                }).catch(err => {
                    dispatch({ type: GET_LIGHTS, lights: getState().api.lights })
                    return Promise.reject(err);
                });
            }
        })
    }
}