import React from 'react';
import { NetInfo } from 'react-native';
import CheckInternet from "../../../common/components/CheckNET";

const FuncCheckNet = () => {
    return NetInfo.isConnected.addEventListener('connectionChange', CheckInternet);
};

export default FuncCheckNet;
