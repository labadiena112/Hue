import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, Slider, ScrollView } from 'react-native';
import { Navigation } from "react-native-navigation";
import debug from '../plugins/debug';
import store from '../redux/store';
import fetcher from '../plugins/fetchHelper';
import { Switch } from 'native-base';
import { switchLightState_RP, changeLightBrightness_RP } from '../redux/actions/hueApi';
import update from 'immutability-helper';


class LightsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lights: store.getState().api.lights,
            groups: store.getState().api.groups
        }
    }

    componentDidMount() {
        console.log('LightsScreen mounted', this.props.componentId);
        console.log(this.state);
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center' }}>{store.getState().lang.lang.bulbs}</Text>
                {Object.keys(this.state.lights).map((i) => {
                    return (
                        <View style={{ padding: 5, margin: 5, flexDirection: 'row' }} key={`Light${i}`}>
                            <Text>{`${store.getState().lang.lang.bulb} ${i}`}</Text>
                            <Slider style={{ flex: 1 }}
                                disabled={!this.state.lights[i].state.reachable}
                                maximumValue={255}
                                value={this.state.lights[i].state.bri}
                                onValueChange={(value) => {
                                    store.dispatch(changeLightBrightness_RP(i, value, false)).then(successes => {
                                        this.setState({ lights: update(this.state.lights, { [i]: { state: { bri: { $set: value } } } }) });
                                    }).catch(err => {
                                        debug.promiseFailure(err);
                                    });
                                }}
                            ></Slider>
                            <Switch
                                disabled={!this.state.lights[i].state.reachable}
                                value={this.state.lights[i].state.on}
                                onValueChange={(value) => {
                                    store.dispatch(switchLightState_RP(i, value, false)).then(successes => {
                                        this.setState({ lights: update(this.state.lights, { [i]: { state: { on: { $set: value } } } }) });
                                    }).catch(err => {
                                        debug.promiseFailure(err);
                                    });
                                }}
                            ></Switch>
                        </View >
                    )
                })}

                <Text style={{ textAlign: 'center' }}>{store.getState().lang.lang.groups}</Text>
                {Object.keys(this.state.groups).map((i) => {
                    return (
                        <View style={{ padding: 5, margin: 5, flexDirection: 'row' }} key={`Group${i}`}>
                            <Text>{`${store.getState().lang.lang.group} ${i}`}</Text>
                            <Slider style={{ flex: 1 }}
                                disabled={this.state.groups[i].action.reachable}
                                maximumValue={255}
                                value={this.state.groups[i].action.bri}
                                onValueChange={(value) => {
                                    store.dispatch(changeLightBrightness_RP(i, value, true)).then(successes => {
                                        this.setState({ groups: update(this.state.groups, { [i]: { action: { bri: { $set: value } } } }) });
                                    }).catch(err => {
                                        debug.promiseFailure(err);
                                    });
                                }}
                            ></Slider>

                            <Switch
                                disabled={this.state.groups[i].action.reachable}
                                value={this.state.groups[i].action.on}
                                onValueChange={(value) => {
                                    store.dispatch(switchLightState_RP(i, value, true)).then(successes => {
                                        this.setState({ groups: update(this.state.groups, { [i]: { action: { on: { $set: value } } } }) });
                                    }).catch(err => {
                                        debug.promiseFailure(err);
                                    });
                                }}
                            ></Switch>
                        </View >
                    )
                })
                }
            </ScrollView >
        );
    }
}

export default LightsScreen;