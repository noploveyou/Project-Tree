import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

class Loading extends Component{
    render(){
        return(
            <View style={styles.viewContainer}>
                <View>
                    <ActivityIndicator size="large" color="green" />
                    <Text style={styles.labelLoading}>{"กำลังโหลด กรุณารอสักครู่"}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   viewContainer: {
       flex: 1,
       alignItems: 'center',
       flexDirection: 'row',
       justifyContent: 'center'
   },
    labelLoading: {
       fontSize: 30
   }
});

export default Loading;
