import React, { Component } from 'react';
import { Linking, View, TouchableOpacity, Text, StyleSheet, NetInfo, BackHandler, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from "react-redux";
import HeaderForm from '../../../common/components/HeaderForm';
import CheckExitApp from "../../../common/components/CheckExitApp";
import CheckInternet from "../../../common/components/CheckNET";
import { NavigationActions, StackActions } from "react-navigation";
import CommonText from '../../../common/components/CommonText';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import Loading from '../../../common/components/Loading';

class QrCode extends Component {
    constructor() {
        super();
        this.state = {
            value: null,
            loading: false
        }
    }

    componentDidMount() {   // เริ่มต้นการทำงาน
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => [this.props.navigation.navigate('QrCode'), CheckExitApp()]);
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    onSuccess = (data) => {//รับค่า e มาทั้งหมด แล้วเช็ดค่า ในe จะมี ค่าไรไม่รุ้มาเต้มเลย เช่นe.data e.type
        //console.warn('Type: ' + e.type + '\nData: ' + e.data) //โชว์ค่า 2 ค่า type และ data
        this.setState({value: data, loading: true});
        this.props.SetValue(data.data);
        this.props.FetchData();
        setTimeout(() => {
            if (this.props.CheckData == true) {

                setTimeout(() => {
                    this.props.navigation.dispatch(
                        StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: 'Detail', params: { back: 'QrCode', Tree: data.data }
                                }),
                            ],
                        })
                    );
                },this.setState({loading: false}), 200);
            } else {
                Alert.alert(
                    null,
                    'ไม่พบพรรณไม้ กรุณาลองใหม่อีกครั้ง',
                    [
                        {text: 'ตกลง', onPress: () => this.props.navigation.dispatch(
                                StackActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({
                                            routeName: 'QrCode'
                                        }),
                                    ],
                                })
                            )
                        }
                    ],
                    { cancelable: false }
                )
            }
        }, 500);

        Linking
            .openURL(data.data) //ถ้าค่าที่ได้ เป็นลิงค์ จะเปิด URL ตาม ค่าที่ได้ใน e.data
            .catch(() => null);
    };

    render() {
            if(this.props.NET == false){    // หากปิด Internet
                return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
            }else if(this.state.loading == true){
                return <Loading />
            }

        return (
            <QRCodeScanner
                onRead={this.onSuccess}//คำสั่งเมื่ออ่านแล้วให้ทำงานอะไร ในนี้คือการส่งค่าไปในฟังก์ชั่น
                cameraStyle={{height: '100%'}}
                showMarker={true} //ให้แสดงกรอบ4เหลี่ยม
                customMarker={
                    <View style={{height: '100%', width: '100%'}}>
                        <View style={{position: 'absolute',height: '100%', width: '100%', justifyContent: 'space-between',flexDirection: 'column'}}>
                            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)',height: '25%', width: '100%'}}/>
                            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)',height: '40%', width: '100%'}}/>
                        </View>
                        <View style={{position: 'absolute',height: '100%', width: '100%', justifyContent: 'space-between',flexDirection: 'row',alignItems:'center'}}>
                            <View style={{bottom: 45.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',height: '35%', width: '20%'}}/>
                            <View style={{bottom: 45.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',height: '35%', width: '20%'}}/>
                        </View>
                        <View style={{position: 'absolute',height: '100%', width: '100%', alignItems:'center', justifyContent: 'center'}}>
                            <View style={{bottom: 45.8,height: '35%', width: '60%', borderWidth: 5, borderColor: '#F1C40F'}}/>

                        </View>
                    </View>
                }
                bottomContent={
                    <CommonText text={`ใช้กล้องสแกน QR Code ในช่องสี่เหลี่ยม`} style={styles.centerText} color={'white'} weight={'400'} />
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
        CheckData: state.DataDetailScreen.CheckData      // ตรวจสอบว่า โหลดข้อมูลเสร็จหรือไม่
    }),
    (dispatch) => ({
        SetValue: (value) => {dispatch({type: "SET_VALUE_DETAIL", payload: value})},
        FetchData: (value) => {dispatch({type: "CALL_DATA_DETAIL", payload: value})},
    })
)(QrCode);