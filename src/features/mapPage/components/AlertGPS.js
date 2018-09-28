import React from 'react';
import { Alert } from 'react-native';

const AlertGPS = () => {
    return(
        Alert.alert(
            'ลองใหม่อีกครั้ง',
            `กรุณาตรวจสอบสัญญาณ GPS\n** แนะนำ GPS ความแม่นยำสูง **`,
            [
                {text: 'ไว้ก่อน', onPress: () => null},
                {text: 'ตั้งค่า', onPress: () => null}
            ],
            { cancelable: false }
        )
    )
};

export default AlertGPS;
