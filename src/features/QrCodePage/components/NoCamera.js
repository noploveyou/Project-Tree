import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Thumbnail } from  'native-base';
import CommonText from '../../../common/components/CommonText';
import AndroidOpenSettings from 'react-native-android-open-settings';

const NoNET = require('../../../../public/assets/otherImage/NoCamera.jpg');

NoCamera = () =>{
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#FEF9E7'
        }}>
            <Thumbnail source={NoNET} style={{height: 250, width: 250, borderRadius:125}}/>
            <CommonText
                text={'กรุณาตรวจอนุมัติการใช้งานกล้อง'}
                style={{textAlign: 'center', marginTop: 30}}
                size={25}
                weight={'bold'}
            />
            <TouchableOpacity
                onPress={() => AndroidOpenSettings.wirelessSettings()}
                style={{
                    backgroundColor: '#F1C40F',
                    height: 50,
                    width: '70%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                    borderColor: 'black',
                    borderWidth: 0.5
                }}
            >
                <CommonText text={'ตั้งค่าการอนุมัติ'} color={'white'} weight={'500'}/>
            </TouchableOpacity>
        </View>
    );
};

export default NoCamera;
