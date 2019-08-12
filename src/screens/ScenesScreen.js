import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Navigation } from "react-native-navigation";
import { newSceneScreen } from '../navigation/navigation';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'native-base';
import store from '../redux/store';
import fetcher from '../plugins/fetchHelper';
import { kelvin, hue, xyz } from '../plugins/colorConvert';

class ScenesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scenes: store.getState().api.scenes
        }
    }

    componentDidMount() {
        console.log('ScenesScreen mounted');
    }

    render() { //xy beats ct beats hue, sat
        return (
            <View style={{ flex: 1 }}>
                <Text>{store.getState().lang.lang.scenes}</Text>
                <TouchableOpacity onPress={() => { Navigation.push(this.props.componentId, newSceneScreen()); }}>
                    <Text>CLICK ME</Text>
                </TouchableOpacity>
                <ScrollView>
                    {Object.keys(this.state.scenes).map((i) => {
                        console.log(this.state.scenes[i], "scenes");
                        let colors = [];
                        Object.keys(this.state.scenes[i].lightstates).map(lightId => {
                            if (this.state.scenes[i].lightstates[lightId].hue) {
                                colors.push(hue.hsl(this.state.scenes[i].lightstates[lightId].hue, this.state.scenes[i].lightstates[lightId].sat, this.state.scenes[i].lightstates[lightId].bri));
                            }
                            else if (this.state.scenes[i].lightstates[lightId].xy && this.state.scenes[i].lightstates[lightId].xy.length > 0) {
                                console.log(this.state.scenes[i].lightstates[lightId]);
                                colors.push(xyz.rgb(this.state.scenes[i].lightstates[lightId].xy[0], this.state.scenes[i].lightstates[lightId].xy[1], this.state.scenes[i].lightstates[lightId].bri));
                            }
                            else {
                                colors.push(kelvin.rgb(this.state.scenes[i].lightstates[lightId].ct))
                            }
                        });
                        if (colors.length === 1) colors.push(colors[0]);
                        return (
                            <LinearGradient styles={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }} key={`SceneL${i}`} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors}>
                                <TouchableOpacity key={`SceneBtn${i}`}
                                    onPress={() => {
                                        fetcher.setLightStates('groups', this.state.scenes[i].id, 'action', this.state.scenes[i].lightstates, this.state.scenes[i].name);
                                    }}
                                >
                                    <View style={{ padding: 4, margin: 12 }} key={`SceneV${i}`}>
                                        <Text style={{ fontSize: 22 }}>{`${this.state.scenes[i].name}`}</Text>
                                    </View>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={{ padding: 4, margin: 12 }} key={`SceneIco${i}`}>
                                    <Icon type={'FontAwesome'} name={'trash'} style={{ fontSize: 32 }}></Icon>
                                </TouchableOpacity> */}
                            </LinearGradient>
                        )
                    })}
                </ScrollView>
            </View >
        );
    }
}

export default ScenesScreen;
