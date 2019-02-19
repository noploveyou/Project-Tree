import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import CommonText from "./CommonText";

class Loading extends Component{
    render(){
        return(
            <View style={styles.viewContainer}>
                <ActivityIndicator size={80} color="green" />
                <CommonText size={30} weight={'400'} text={"กำลังโหลด"} style={{marginTop: 20}}/>
                <CommonText size={30} weight={'400'} text={"กรุณารอสักครู่"}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   viewContainer: {
       flex: 1,
       alignItems: 'center',
       flexDirection: 'column',
       justifyContent: 'center',
       backgroundColor: "#FEF9E7"
   },
    labelLoading: {
       fontSize: 30
   }
});

export default Loading;
