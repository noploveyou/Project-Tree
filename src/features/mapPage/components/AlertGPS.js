import React from 'react';
import { Alert } from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';

const AlertGPS = () => {
    return(
        Alert.alert(
            '           ลองใหม่อีกครั้ง',
            '       กรุณาเปิดใช้งานแสดงตำแหน่งของผู้ใช้ จึงจะสามารถใช้งานฟังก์ชันเส้นทางใกล้ที่สุดได้\n\n'+
            '       หากเปิดใช้งานแสดงตำแหน่งของผู้ใช้แล้ว กรุณารอสักครู่\n'+'เพื่อค้นหาตำแหน่งของท่าน\n\n',
            [
                {text: 'ตกลง', onPress: () => null},
                {text: 'ตั้งค่า', onPress: () => AndroidOpenSettings.locationSourceSettings()}
            ],
            { cancelable: false }
        )
    )
};

export default AlertGPS;
