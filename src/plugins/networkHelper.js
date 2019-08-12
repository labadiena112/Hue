import { NetInfo } from 'react-native';
import Toast from 'react-native-simple-toast';
import store from '../redux/store';

const networkHelper = {
    getNetworkStatus: () => {
        return new Promise((resolve, reject) => {
            NetInfo.getConnectionInfo().then((connectionInfo) => {
                if (connectionInfo.type != 'none' || connectionInfo.type != 'unknown') {
                    if (connectionInfo.type == 'wifi' || connectionInfo.type == 'cellular') {
                        resolve(true);
                    }
                    else {
                        debug.error("getConnectionInfo", 'Valid connection type was not detected');
                        reject(false);
                    }
                }
                else {
                    debug.error("getConnectionInfo", 'Connection type unknown or offline');
                    reject(false);
                }
            }).catch(err => {
                debug.promiseFailure("getConnectionInfo", JSON.stringify(err));
                reject(false);
            });
        })
    },
    offlineMessage: (message = null) => {
        Toast.showWithGravity(message || store.getState().lang.lang.offlineMessage, Toast.LONG, Toast.CENTER);
    }
}

export default networkHelper;
