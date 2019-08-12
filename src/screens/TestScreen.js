/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Spinner, TouchableOpacity } from 'react-native';
import store from '../redux/store';
import { getLang_RP } from '../redux/actions/lang';
import debug from '../plugins/debug';
import GLOBALS, { DIRS } from '../plugins/globals';
import { Button } from 'native-base';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class TestScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            screenLocale: 'en'
        }
        this.screenLocale = 'en';
    }

    componentDidMount() {
        console.log('mounted');
    }

    changeLanguage() {

        store.dispatch(getLang_RP(this.state.screenLocale)).catch(err => {
            debug.promiseFailure('componentWillMount', err)
        })
    }

    componentWillMount() {
        this.changeLanguage();
        console.log('will mount');
    }

    shouldComponentUpdate() {
        console.log("should i update render?")
        return true;
    }

    componentDidUpdate() {
        console.log('updated/rendered');
    }

    componentWillUnmount() {
        console.log('unmounting...');
    }

    render() {
        console.log('rendering...');
        if (this.state.loading) {
            return <Spinner />
        }
        return (
            <View style={styles.container}>
                <Button onPress={() => {
                    if (this.state.screenLocale === 'lt') {
                        this.setState({ screenLocale: 'en' });
                    }
                    else {
                        this.setState({ screenLocale: 'lt' });
                    }

                }}>
                    <Text>HELLO</Text>
                </Button>
                <Text style={styles.welcome}>{store.getState().lang.lang.ok}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
