import React, { Component } from 'react';
import { Linking, View, TouchableOpacity, Text, StyleSheet, NetInfo, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from "react-redux";
import HeaderForm from '../../../common/components/HeaderForm';
import CheckExitApp from "../../../common/components/CheckExitApp";
import CheckInternet from "../../../common/components/CheckNET";
import {NavigationActions, StackActions} from "react-navigation";
import CommonText from '../../../common/components/CommonText';

class QrCode extends Component {
    componentDidMount() {   // เริ่มต้นการทำงาน
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => [this.props.navigation.navigate('QrCode'), CheckExitApp()]);
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

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

                customMarker={
                    <View style={{height: '100%', width: '100%'}}>
                        <View style={{position: 'absolute',height: '100%', width: '100%', justifyContent: 'space-between',flexDirection: 'column'}}>
                            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)',height: '27%', width: '100%'}}/>
                            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)',height: '33%', width: '100%'}}/>
                        </View>
                        <View style={{position: 'absolute',height: '100%', width: '100%', justifyContent: 'space-between',flexDirection: 'row',alignItems:'center'}}>
                            <View style={{bottom: 18.5,backgroundColor: 'rgba(52, 52, 52, 0.8)',height: '40%', width: '20%'}}/>
                            <View style={{bottom: 18.5,backgroundColor: 'rgba(52, 52, 52, 0.8)',height: '40%', width: '20%'}}/>
                        </View>
                        <View style={{position: 'absolute',height: '100%', width: '100%', alignItems:'center', justifyContent: 'center'}}>
                            <View style={{bottom: 18.5,height: '40%', width: '60%', borderWidth: 5, borderColor: '#196F3D'}}/>

                        </View>
                    </View>
                }
                bottomContent={
                    <CommonText text={`ใช้กล้องสแกน QR Code ในช่องสีเหลี่ยม`} style={styles.centerText} color={'white'} weight={'400'} size={20}/>
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

        bottom: 130,
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgba(52, 52, 52, 50)',
    },
    buttonTouchable: {
        backgroundColor: "black",
        bottom: 230,

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