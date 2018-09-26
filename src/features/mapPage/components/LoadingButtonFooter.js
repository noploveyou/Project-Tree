import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

class LoadingButtonFooter extends Component{
    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" color="green" />
                <Text style={{fontSize:30}}> กำลังโหลด กรุณารอสักครู่ </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#FEF9E7',
    }
});

export default LoadingButtonFooter;
