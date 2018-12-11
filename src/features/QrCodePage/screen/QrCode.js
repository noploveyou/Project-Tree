import React, { Component } from 'react';
import { Linking, View, TouchableOpacity, Text, StyleSheet }  from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {connect} from "react-redux";
import HeaderForm from '../../../common/components/HeaderForm';

class QrCode extends Component {

    onSuccess(e) {//รับค่า e มาทั้งหมด แล้วเช็ดค่า ในe จะมี ค่าไรไม่รุ้มาเต้มเลย เช่นe.data e.type
        console.warn('Type: ' + e.type + '\nData: ' + e.data) //โชว์ค่า 2 ค่า type และ data
        /*Linking
            .openURL(e.data) //ถ้าค่าที่ได้ เป็นลิงค์ จะเปิดURL ตาม ค่าที่ได้ใน e.data
            .catch(// ถ้าไม่ใช่ลิงค์ จะทำงานอันนี้แทน
                console.warn('Type: ' + e.type + '\nData: ' + e.data) //โชว์ค่า 2 ค่า type และ data
                //ส่วนนี้จะเป็นส่วนที่เองจะสามารถเอาไปทำเงื่อนไขต่อได้จะให้ทำไร
            );*/
    }

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess}//คำสั่งเมื่ออ่านแล้วให้ทำงานอะไร ในนี้คือการส่งค่าไปในฟังก์ชั่น
                cameraStyle={{height: '100%'}}
                showMarker={true} //ให้แสดงกรอบ4เหลี่ยม
                markerStyle={{borderColor:'red',top: -20, borderRadius: 10}}
                bottomContent={
                    <View style={{flexDirection: "column", justifyContent: 'space-between'}}>
                        <Text style={styles.centerText}>{'scan the QR Code.'}</Text>
                        <View style={{height: 50}}>
                            <TouchableOpacity style={styles.buttonTouchable}>
                                <Text style={styles.buttonText}> OK. Got it! </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
        );
    }
}

QrCode.navigationOptions  = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'สแกน QR Code'} />
});

const styles = StyleSheet.create({
    centerText: {
        fontSize: 30,
        color: 'red',
        bottom: 130,
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        backgroundColor: "black",
        bottom: 130,

    },
});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,         // ตรวจสอบ Internet
        MyPosition : state.CheckDevice.UserLocation,    // ตำแหน่งผู้ใช้
        DataMarker : state.DataMapScreen.DataMarkStepOne,     // ตำแหน่ง Mark ต้นไม้
        CheckFetchDataMap : state.DataMapScreen.CheckDataMarkStepOne      // ตรวจสอบว่า โหลดข้อมูลเสร็จหรือไม่
    }),
    (dispatch) => ({
        GetLocation : (value) => {dispatch({type: "GET_USER_LOCATION", payload: value})},    // รับตำแหน่งผู้ใช้
        FetchDataMap : (value) => {dispatch({type: "CALL_DATA_STEP_ONE", payload: value})},      // เรียกฐานข้อมูล
        GPS : (value) => {dispatch({type: "USE_GPS", payload: value})}  //ตรวจสอบการเปิดใช้งาน GPS
    })
)(QrCode);