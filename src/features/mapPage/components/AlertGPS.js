import React from 'react';
import { Alert } from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';

const AlertGPS = () => {
    return(
        Alert.alert(
            'ลองใหม่อีกครั้ง',
            'กรุณาตรวจสอบสัญญาณ GPS\n\n'+
            '* หมายเหตุ\n'+
            'เปิดใช้ GPS ความถูกต้องสูงเท่านั้น\n\n\n'+
            'หากเปิดใช้ GPS แล้ว กรุณารอสักครู่'+'เพื่อค้นหาตำแหน่งของท่าน\n\n',
            [
                {text: 'ตกลง', onPress: () => null},
                {text: 'ตั้งค่า', onPress: () => AndroidOpenSettings.locationSourceSettings()}
            ],
            { cancelable: false }
        )
    )
};

export default AlertGPS;
