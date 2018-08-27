import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

NoInternetScreen = () =>{
    return (
        <View style={{height: 20, flexDirection: 'column'}}>
            <Text> No Internet !!! </Text>
            <TouchableOpacity onPress={() => alert('Go to Setting')}>
                <Text>{'ตั้งค่า'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NoInternetScreen;
