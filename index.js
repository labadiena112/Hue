import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from "react-native-navigation";
import { TestScreen, BridgeConnectionScreen, GroupsScreen, NewGroupScreen, ScenesScreen, NewSceneScreen, LightsScreen } from './src/screens/index';
import { Provider } from "react-redux";
import React from 'react';
import { goToBridgeConnectionNav, goToAppNav } from './src/navigation/navigation';
import store from "./src/redux/store";

Navigation.registerComponentWithRedux(`TestScreen`, () => gestureHandlerRootHOC(TestScreen), Provider, store);
Navigation.registerComponentWithRedux(`BridgeConnectionScreen`, () => gestureHandlerRootHOC(BridgeConnectionScreen), Provider, store);
Navigation.registerComponentWithRedux(`GroupsScreen`, () => gestureHandlerRootHOC(GroupsScreen), Provider, store);
Navigation.registerComponentWithRedux(`NewGroupScreen`, () => gestureHandlerRootHOC(NewGroupScreen), Provider, store);
Navigation.registerComponentWithRedux(`ScenesScreen`, () => gestureHandlerRootHOC(ScenesScreen), Provider, store);
Navigation.registerComponentWithRedux(`NewSceneScreen`, () => gestureHandlerRootHOC(NewSceneScreen), Provider, store);
Navigation.registerComponentWithRedux(`LightsScreen`, () => gestureHandlerRootHOC(LightsScreen), Provider, store);
Navigation.events().registerAppLaunchedListener(() => {
    goToBridgeConnectionNav();
    //goToAppNav();
});