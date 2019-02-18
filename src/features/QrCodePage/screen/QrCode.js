import React, { Component } from 'react';
import { Linking, View, StyleSheet, NetInfo, BackHandler, Alert, Dimensions } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Loading from '../../../common/components/Loading';
import HeaderForm from '../../../common/components/HeaderForm';
import CheckExitApp from '../../../common/components/CheckExitApp';
import CheckInternet from '../../../common/components/CheckNET';
import CommonText from '../../../common/components/CommonText';
import NoInternetScreen from '../../../common/components/NoInternetScreen';

class QrCode extends Component {
    constructor() {
        super();
        this.state = {
            value: null,    //ค่าที่สแกนได้จากบาร์โค้ด
            loading: false, //if true = loadingScreen
            screenHeight: Dimensions.get('screen').height,  //รับค่าขนาดหน้าจอเครื่อง
            screenWidth: Dimensions.get('screen').width,    //รับค่าขนาดหน้าจอเครื่อง
        }
    }

    componentDidMount() {   // เริ่มต้นการทำงาน
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => [this.props.navigation.navigate('QrCode'), CheckExitApp()]);
    }

    componentWillUnmount() {
        this.backHandler.remove();  //remove event
    }

    onSuccess = (data) => {     //get 2 Value : data.type & data.data
        this.setState({value: data, loading: true});    // set ค่า value ตัวแปรที่กำหนด
        this.props.SetValue(data.data);     //Set Value For Detail About Tree
        this.props.FetchData();     // เชื่อมต่อฐานข้อมูล
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
            .openURL(data.data) //ถ้าค่าที่ได้ เป็น Link จะเปิด URL ตาม ค่าที่ได้ใน data.data
            .catch(() => null); // catch error
    };

    render() {
            if(this.props.NET == false){    // หากปิด Internet
                CheckInternet();
                return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
            }else if(this.state.loading == true){
                return <Loading />
            }

        return (
            <QRCodeScanner
                onRead={this.onSuccess} //เมื่ออ่านค่าเสร็จ
                cameraStyle={{height: this.state.screenHeight, width: this.state.screenWidth}}
                showMarker={true} //ให้แสดงกรอบ4เหลี่ยม
                customMarker={
                    <View style={{height: this.state.screenHeight + 200, width: this.state.screenWidth}}>
                        <View style={{position: 'absolute', height: this.state.screenHeight, width: this.state.screenWidth, justifyContent: 'space-between', flexDirection: 'column'}}>
                            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)',height: '35%', width: this.state.screenWidth}} />
                            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)',height: '35%', width: this.state.screenWidth}} />
                        </View>
                        <View style={{position: 'absolute', height: this.state.screenHeight, width: this.state.screenWidth, justifyContent: 'space-between', flexDirection: 'row', alignItems:'center'}}>
                            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '30%', width: '20%'}} />
                            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '30%', width: '20%'}} />
                        </View>
                        <View style={{position: 'absolute', height: this.state.screenHeight, width: this.state.screenWidth, alignItems:'center', justifyContent: 'center'}}>
                            <View style={{height: '30%', width: '60%', borderWidth: 5, borderColor: '#F1C40F'}} />
                        </View>
                    </View>
                }
                bottomContent={
                    <CommonText
                        text={`ใช้กล้องสแกน QR Code ในช่องสี่เหลี่ยม`}
                        style={styles.viewBottomText}
                        color={'white'}
                        weight={'400'}
                        size={18}
                    />
                }
            />
        );
    }
}

QrCode.navigationOptions  = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'สแกน QR Code'} />
});

const styles = StyleSheet.create({
    viewBottomText: {
        bottom: 250
    }
});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,  // ตรวจสอบ Internet
        CheckData: state.DataDetailScreen.CheckData // ตรวจสอบว่า โหลดข้อมูลเสร็จหรือไม่
    }),
    (dispatch) => ({
        SetValue: (value) => {dispatch({type: "SET_VALUE_DETAIL", payload: value})}, //Set ค่าที่จะค้นหา
        FetchData: (value) => {dispatch({type: "CALL_DATA_DETAIL", payload: value})} //เชื่อมต่อฐานข้อมูล
    })
)(QrCode);
