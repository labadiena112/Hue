import React from 'react';
import { View, Text, TextInput, Animated, SafeAreaView } from 'react-native';
import { PanGestureHandler, ScrollView, State } from 'react-native-gesture-handler';
import Draggable from '../components/Draggable';

class NewScenesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log('NewScenesScreen mounted');
    }

    render() {
        return (
            <SafeAreaView style={{ width: '100%', height: '100%' }}>
                <Draggable />
                <Text>NewScenesScreen</Text>
            </SafeAreaView>
        );
    }
}

export default NewScenesScreen;