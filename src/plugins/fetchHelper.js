import GLOBALS, { DIRS } from '../plugins/globals';
import debug from '../plugins/debug';
import store from '../redux/store';

export default fetcher = {
    getResource: (resource) => {
        return new Promise((resolve, reject) => {
            debug.info(`Getting ${resource}: ${store.getState().api.url}/${resource}`);
            fetch(`${store.getState().api.url}/${resource}`, {
                method: 'GET',
                headers: GLOBALS.HEADERS
            }).then(res => res.json()).then(resp => {
                resolve(resp);
            }).catch(err => {
                reject(err);
            });
        })
    },
    switchLightState: (i, on, isGroup) => {
        return new Promise((resolve, reject) => {
            var stateString = "";
            var resource = "";
            if (isGroup) {
                stateString = "action";
                resource = "groups";
            } else {
                stateString = "state";
                resource = "lights";
            }

            debug.info(`Setting state ${i}: ${store.getState().api.url}/${resource}/${i}/${stateString}`);
            fetch(`${store.getState().api.url}/${resource}/${i}/${stateString}`, {
                method: 'PUT',
                headers: GLOBALS.HEADERS,
                body: JSON.stringify({ on: on })
            }).then(res => res.json()).then(resp => {
                console.log(resp, "resp");
                let successString = `/${resource}/${i}/${stateString}/on`;
                console.log(resp[0].success[successString]);
                resolve(resp[0].success[successString]);
            }).catch(err => {
                reject(err);
            });
        })
    },
    changeLightBrightness: (i, bri, isGroup) => {
        return new Promise((resolve, reject) => {
            bri = Math.round(bri * 1) / 1;
            let stateString = isGroup ? 'action' : 'state',
                resource = isGroup ? 'groups' : 'lights';
            debug.info(`Setting state ${i}: ${store.getState().api.url}/${resource}/${i}/${stateString}`);
            fetch(`${store.getState().api.url}/${resource}/${i}/${stateString}`, {
                method: 'PUT',
                headers: GLOBALS.HEADERS,
                body: JSON.stringify({ bri: bri })
            }).then(res => res.json()).then(resp => {
                console.log(resp, "resp");
                let successString = `/${resource}/${i}/${stateString}/bri`;
                console.log(resp[0].success[successString]);
                resolve(resp[0].success[successString]);
            }).catch(err => {
                reject(err);
            });
        })
    },
    getScenesLightStates: (resp) => {
        let getScenesLightStates_P = [];
        Object.keys(resp).map(sceneId => {
            debug.info(`Getting lightstates ${sceneId}: ${store.getState().api.url}/scenes/${sceneId}`);
            getScenesLightStates_P.push(fetch(`${store.getState().api.url}/scenes/${sceneId}`, {
                method: 'GET',
                headers: GLOBALS.HEADERS
            }).then(res => res.json()));
        });
        return Promise.all(getScenesLightStates_P.length === 0 ? Promise.resolve(true) : getScenesLightStates_P);
    },
    setLightStates: (resource, id, endPoint, states, name) => {
        return new Promise((resolve, reject) => {
            debug.info(`Setting ${resource} ${endPoint}; id: ${id}: ${store.getState().api.url}/${resource}/${id}/${endPoint}`);
            fetch(`${store.getState().api.url}/${resource}/${id}/${endPoint}`, {
                method: 'PUT',
                headers: GLOBALS.HEADERS,
                body: JSON.stringify({ scene: id })
            }).then(res => res.json()).then(resp => {
                console.log(resp, "resp");
                resolve(true);
            }).catch(err => {
                reject(err);
            });
        })
    }
}