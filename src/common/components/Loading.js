import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

class Loading extends Component{
    render(){
        return(
            <View style={styles.viewContainer}>
                    <ActivityIndicator size="large" color="green" />
                    <Text style={styles.labelLoading}>{"กำลังโหลด"}</Text>
                <Text style={styles.labelLoading}>{"กรุณารอสักครู่"}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   viewContainer: {
       flex: 1,
       alignItems: 'center',
       flexDirection: 'column',
       justifyContent: 'center'
   },
    labelLoading: {
       fontSize: 30
   }
});

export default Loading;
