import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import SideMenu from '../Project-Tree/src/common/SideMenu';
import HomeScreen from './src/features/homePage/screen/HomeScreen';
import ListTreeScreen from './src/features/listTreePage/screen/ListTreeScreen';
import MapScreen from './src/features/mapPage/screen/MapScreen-StepOne'
import DetailScreen from  './src/features/DetailPage/screen/DetailScreen';
import SearchListMap from "./src/features/mapPage/screen/ListMapScreen-StepTwo";
import SelectedMap from "./src/features/mapPage/screen/MapScreen-StepThree";
import QrCode from "./src/features/QrCodePage/screen/QrCode";

export const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Detail: {
        screen: DetailScreen,
    },
    Map: {
        screen: MapScreen,
    },
    SearchListMap: {
        screen: SearchListMap
    },
    SelectedMap: {
        screen: SelectedMap
    },
    ListTree: {
        screen: ListTreeScreen
    },
    QrCode: {
        screen: QrCode
    }

},{
    navigationOptions: {
        header: null,
    }
});

export default createDrawerNavigator({
    'root': {
        screen: RootStack
    },
},{
    contentComponent: SideMenu,
    drawerWidth: 300,
});