import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';
import debug from '../plugins/debug';
import { goToAppNav } from '../navigation/navigation';
import GLOBALS, { DIRS } from '../plugins/globals';
import store from '../redux/store';
import { loadAppData_RP } from '../redux/actions/multiLoads';
import helper from '../plugins/helper';

export default class BridgeConnectionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            loading: true
        }
    }

    connectToBridge() {
        fetch(`${DIRS.IP}/api`, {
            method: 'POST',
            headers: GLOBALS.HEADERS,
            body: JSON.stringify({ "devicetype": "palmil_hue_9002" }),
        }).then(res => res.json()).then(resp => {
            resp = resp[0];
            debug.promiseSuccessful('Bridge Connected', JSON.stringify(resp));
            if (resp.error) {
                if (resp.error.type === 101) this.setState({ text: "Link button is not pressed. Please press bridge link button." });
            }
            else if (resp.success && resp.success.username) {
                AsyncStorage.setItem('username', resp.success.username, (err, result) => {
                    if (!err) {
                        this.saveUsernameAndNavigate(resp.success.username);
                    }
                    else {
                        this.setState({ text: "Error occured saving username." });
                    }
                })
            }
            else {
                this.setState({ text: "Unknown error occured. Please try again later." });
            }
        }).catch(err => {
            debug.promiseFailureTrace('NewBridgeConnection', err);
        })
    }

    saveUsernameAndNavigate = (username) => {
        store.dispatch(loadAppData_RP(username)).then(successes => {
            debug.promiseSuccessful('loadAppData_RP', `success: ${successes}`);
            goToAppNav();
        }).catch(err => {
            debug.promiseFailureTrace('loadAppData_RP', err);
        });
    }

    componentDidMount() {
        //AsyncStorage.clear();
        console.log('BridgeConnectionScreen mounted');
        AsyncStorage.getItem('username', (err, result) => {
            if (result !== null) {
                this.saveUsernameAndNavigate(result);
            }
            else {
                this.setState({ text: "Please press link button" });
                this.connectToBridge(); //optional, galima leisti jam paciam paspausti
            }
        })

    }

    render() {
        return (
            <View>
                {this.state.loading ? <Spinner /> : null}
                <Text>{this.state.text}</Text>
                <TouchableOpacity onPress={this.connectToBridge}>
                    <Text style={{ fontSize: 20 }}>Connect</Text>
                </TouchableOpacity>
            </View>
        );
    }
}