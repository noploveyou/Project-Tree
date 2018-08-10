import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import SideMenu from '../ProjectTrees/src/common/SideMenu';
import HomeScreen from './src/features/homePage/screen/HomeScreen';
import ListTreeScreen from './src/features/listTreePage/screen/ListTreeScreen';
import MapScreen from './src/features/mapPage/screen/MapScreen'
import DetailScreen from  './src/features/DetailPage/screen/DetailScreen';

export const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Detail: {
        screen: DetailScreen,
    },
},{
    navigationOptions: {
        header: null
    }
});

export default createDrawerNavigator({
    'root': {
        screen: RootStack
    },
    Map: {
        screen: MapScreen
    },
    ListTree: {
        screen: ListTreeScreen
    },

},{
    contentComponent: SideMenu,
    drawerWidth: 300
});