import React from 'react';
import { View, Text } from 'react-native';

class NewScenesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log('NewGroupScreen mounted');
    }

    render() {
        return (
            <View>
                <Text>NewGroupScreen</Text>
            </View>
        );
    }
}

export default NewScenesScreen;