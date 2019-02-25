import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import SideMenu from '../Project-Trees/src/common/SideMenu';
import HomeScreen from './src/features/homePage/screen/HomeScreen';
import ListTreeScreen from './src/features/listTreePage/screen/ListTreeScreen';
import MapScreen from './src/features/mapPage/screen/MapScreen-StepOne'
import DetailScreen from  './src/features/DetailPage/screen/DetailScreen';
import SearchListMap from "./src/features/mapPage/screen/ListMapScreen-StepTwo";
import SelectedMap from "./src/features/mapPage/screen/MapScreen-StepThree";
import QrCode from "./src/features/QrCodePage/screen/QrCode";
import GuideScreen from "./src/features/guideToUse/screen/GuideScreen";
import DetailZoneScreen from "./src/features/DetailZone/screen/DetailZoneScreen";
import DetailProjectScreen from "./src/features/DetailProject/screen/DetailProjectScreen";
import guideHome from "./src/features/guideToUse/screen/guidMenu/guideHome";
import guideListTree from "./src/features/guideToUse/screen/guidMenu/guideListTree";
import guideMAP from "./src/features/guideToUse/screen/guidMenu/guideMAP";
import guideQRCode from "./src/features/guideToUse/screen/guidMenu/guideQRCode";
import guideDetailZone from "./src/features/guideToUse/screen/guidMenu/guideDetailZone";
import guideAboutProject from "./src/features/guideToUse/screen/guidMenu/guideAboutProject";
import guideDetailTree from  "./src/features/guideToUse/screen/guidMenu/guideDetailTree"
import guideGuide from "./src/features/guideToUse/screen/guidMenu/guideGuide";

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
    },
    Guide: {
        screen: GuideScreen
    },
    Zone: {
        screen: DetailZoneScreen
    },
    DetailProject: {
        screen: DetailProjectScreen
    },
    guideHome: {
        screen: guideHome
    },
    guideListTree: {
        screen: guideListTree
    },
    guideMAP: {
        screen: guideMAP
    },
    guideQRCode: {
        screen: guideQRCode
    },
    guideDetailZone: {
        screen: guideDetailZone
    },
    guideAboutProject: {
        screen: guideAboutProject
    },
    guideDetailTree: {
        screen: guideDetailTree
    },
    guideGuide: {
        screen: guideGuide
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