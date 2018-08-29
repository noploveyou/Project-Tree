import React from 'react';
import { AppRegistry, NetInfo } from 'react-native';
import App from './App';
import Provider from "react-redux/es/components/Provider";
import store from "./src/common/initialStore";
import CheckInternet from './src/common/components/CheckNET';

NetInfo.isConnected.fetch().then(isConnected => {
    console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
    if(isConnected == false){
        store.dispatch({     // action
            type: 'CHECK_INTERNET',
            payload : false
        });
    }else {
        store.dispatch({     // action
            type: 'CHECK_INTERNET',
            payload : true
        });
    }
});

const initialApp = () =>
    <Provider store={store}>
        <App />
    </Provider>;

AppRegistry.registerComponent('ProjectTrees', () => initialApp);
