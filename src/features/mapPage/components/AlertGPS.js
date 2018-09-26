import React from 'react';
import { Alert } from 'react-native';

const AlertGPS = () => {
    return(
        Alert.alert(
            null,
            'กรุณาเปิดใช้ GPS ก่อนการใช้งาน',
            [
                {text: 'ปฏิเสธ', onPress: () => null},
                {text: 'ตั้งค่า', onPress: () => null}
            ],
            { cancelable: false }
        )
    )
};

export default AlertGPS;
