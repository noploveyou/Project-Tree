import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Thumbnail } from  'native-base';
import CommonText from './CommonText';

const NoNET = require('../../../public/assets/otherImage/Trex.jpg');

NoInternetScreen = () =>{
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
                text={'ไม่พบสัญญาณอินเทอร์เน็ต กรุณาตรวจสอบสัญญาณ'}
                style={{textAlign: 'center', marginTop: 30}}
                size={25}
                weight={'bold'}
            />
            <TouchableOpacity
                onPress={() => null}
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
                <CommonText text={'ตั้งค่าสัญญาณอินเทอร์เน็ต'} color={'white'} weight={'500'}/>
            </TouchableOpacity>
        </View>
    );
};

export default NoInternetScreen;
