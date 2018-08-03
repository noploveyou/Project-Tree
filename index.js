import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import Provider from "react-redux/es/components/Provider";
import store from "./src/common/initialStore";

const initialApp = () =>
    <Provider store={store}>
        <App />
    </Provider>;

AppRegistry.registerComponent('ProjectTrees', () => initialApp);
