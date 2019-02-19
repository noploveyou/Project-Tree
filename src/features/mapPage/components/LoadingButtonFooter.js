import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import CommonText from "../../../common/components/CommonText";

class LoadingButtonFooter extends Component{
    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size={40} color="green" />
                <CommonText  text={"กำลังโหลด กรุณารอสักครู่"} size={25} weight={'400'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#FEF9E7',
        width: '100%',

        alignItems: 'center'
    }
});

export default LoadingButtonFooter;
