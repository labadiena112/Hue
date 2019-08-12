import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Navigation } from "react-native-navigation";
import { newGroupScreen } from '../navigation/navigation';
import LinearGradient from 'react-native-linear-gradient';
import store from '../redux/store';

class GroupsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: store.getState().api.groups
        }
    }

    componentDidMount() {
        console.log('GroupsScreen mounted', this.props.componentId);
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Text>{store.getState().lang.lang.groups}</Text>
                {Object.keys(this.state.groups).map((i) => {
                    return (
                        <LinearGradient key={`GroupL${i}`} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[`hsl(60, 100%, 50%)`, 'hsl(60, 100%, 55%)', 'hsl(60, 100%, 50%)']}>
                            <TouchableOpacity key={`Group${i}`}>
                                <View style={{ padding: 4, margin: 12, flexDirection: 'row', justifyContent: 'space-between' }} key={`GroupV${i}`}>
                                    <Text style={{ fontSize: 22 }}>{`${this.state.groups[i].name}`}</Text>
                                    <Icon type={'FontAwesome'} name={'trash'} style={{ fontSize: 32 }}></Icon>
                                </View>
                            </TouchableOpacity>
                        </LinearGradient>
                    )
                })}
            </View >
        );
    }
}

export default GroupsScreen;