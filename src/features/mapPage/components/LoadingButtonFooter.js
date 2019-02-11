import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

class LoadingButtonFooter extends Component{
    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" color="green" />
                <Text style={{fontSize: 25}}> กำลังโหลด กรุณารอสักครู่ </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#FEF9E7',
        width: '100%',
        height: '40%',
        alignItems: 'center'
    }
});

export default LoadingButtonFooter;
