import React, { Component } from 'react';
import { Container } from 'native-base';
import { Alert, BackHandler, NetInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import getDirections from "react-native-google-maps-directions";
import { connect } from "react-redux";
import HeaderForm from '../../../common/components/HeaderForm';
import CheckInternet from '../../../common/components/CheckNET';
import SearchListMap from "./ListMapScreen-StepTwo";
import GoogleMAP from '../../../common/components/GoogleMAP'
import Loading from '../../../common/components/Loading';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';

class MapScreenStepOne extends Component {
    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => [this.props.navigation.navigate('Map'), this.checkExitApp()]);     // เมื่อกดปุ่มย้อนกลับ (ของโทรศัพท์)
        setTimeout(() => this.props.FetchDataMap(), 0);    // กำหนดระยะเวลา เริ่มทำงานเมื่อผ่านไป 0 วินาที
        this.CheckGPS();
    }

    componentWillUnmount() {
        this.backHandler.remove();
        navigator.geolocation.clearWatch(this.watchID); // set value UserLocation = null in store
    }

    constructor(props){
        super(props);
        this.state ={
            MapWidth: 1,        // Hack
            MapHeight: '100%',  // Hack
            SetLatitudeToNavigate: null,    // Latitude  ที่ปลายทาง
            SetLongitudeToNavigate: null,   // Longitude ที่ปลายทาง
            ShowBTNNavigate: false,     // แสดงปุ่ม นำเส้นทาง (เปิด Google MAP)
            HackRender: false,          // สำหรับเช็ค กัน Error (ให้ MAP พร้อม และ Hack เสร็จก่อนค่อย Get Mark)
        }
    }

    checkExitApp = () => {
        Alert.alert(
            null,
            'คุณต้องการออกจากแอพพลิเคชันหรือไม่ ?',
            [
                {text: 'ไม่ใช่', onPress: () => null},
                {text: 'ใช่', onPress: () => BackHandler.exitApp()},
            ],
            { cancelable: false }
        )
    };

    CheckInternetRender = () => {           // ทำงานเมื่อ MAP พร้อมใช้งาน (หลังปิด - เปิด Internet)
        setTimeout(() => {
            if(this.props.NET){                 // Internet เปิดใช้งาน
                //this.props.FetchDataMap();      // เรียกฐานข้อมูลอีกครั้ง หลังจาก เปิด Internet
                switch (this.state.MapHeight) {     // Hack MAP เพื่อแสดงปุ่ม UserLocation
                    case '100%':
                        this.setState({MapHeight: '101%', ShowBTNNavigate: false});
                        break;

                    case '101%':
                        this.setState({MapHeight: '100%', ShowBTNNavigate: false});
                        break;

                    default:
                }
            }
        }, 5000)    // เริ่มทำงานหลังจาก 5 วินาที
    };

    CheckGPS = () => {
        this.watchID = navigator.geolocation.watchPosition(
            (position) => {
                let newLat = parseFloat(position.coords.latitude); //คำสั่งsetที่อยุ่ตามเครื่อง +แปรงค่าเป้นทศนิยม
                let newLong = parseFloat(position.coords.longitude);
                const initialRegion = {
                    latitude: newLat,
                    longitude: newLong
                };
                this.props.GetLocation(initialRegion);  // Set Value in Store
            },
            () => [Alert.alert(
                null,
                'กรุณาเปิดใช้ GPS ก่อนการใช้งาน',
                [
                    {text: 'ปฏิเสธ', onPress: () => null},
                    {text: 'ตั้งค่า', onPress: () => null}
                ],
                { cancelable: false }
            ),navigator.geolocation.clearWatch(this.watchID)],
            {timeout: 0, distanceFilter: 50} //ระยะเวลา, ระยะทางที่จะเริ่มเก็บ lat/lng อีกครั้ง 50 เมตร
        );
    };

    handleGetDirections = () => { //ฟังก์ชัน นำทาง (เปิด Google MAP)
        try {   // เปิด GPS
            const data = {
                source: {      //จุดเริ่มต้น ตำแหน่งผู้ใช้
                    latitude:  this.props.MyPosition.latitude,
                    longitude: this.props.MyPosition.longitude
                },
                destination: {  //ปลายทาง
                    latitude: this.state.SetLatitudeToNavigate,
                    longitude: this.state.SetLongitudeToNavigate,
                }
            };
            getDirections(data)
        }catch (positionNull) {     // ปิด GPS
            const data = {
                destination: {      // ปลายทาง
                    latitude: this.state.SetLatitudeToNavigate,
                    longitude: this.state.SetLongitudeToNavigate,
                }
            };
            getDirections(data)
        }
    };

    SetLocationToNavigate = (lat, lng) => {
        this.setState({SetLatitudeToNavigate: lat, SetLongitudeToNavigate: lng, ShowBTNNavigate: true});
    };

    render() {
        if(this.props.NET == false){    // หากปิด Internet
            return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
        }

        if(this.props.CheckFetchDataMap == false){
            if(this.props.NET == true){
                this.props.FetchDataMap();
            }
            return(
                <Loading />
            )
        }

        return (
            <Container>
                <View style={s.viewHeader}>
                    <TouchableOpacity
                        onPress={() => [this.props.navigation.navigate({routeName: 'SearchListMap',}),
                            navigator.geolocation.clearWatch(this.watchID)]} style={s.buttonNear}
                    >
                        <Icon name={'md-search'} size={28} color={'white'} style={s.iconButtonNear}/>
                        <Text style={s.labelButtonNear}> {`ค้นหา`} </Text>
                    </TouchableOpacity>
                </View>
                    <View style={s.container}>
                        <GoogleMAP
                            hackScale={{width:this.state.MapWidth, height:this.state.MapHeight}}
                            onMapReady={() =>
                            [this.setState({ MapWidth: - 1, HackRender: true }), this.CheckInternetRender()]
                            }
                            onPress={() => this.setState({ShowBTNNavigate: false})}

                            check={this.props.CheckFetchDataMap && this.state.HackRender}
                            Data={this.props.DataMarker}
                            OnMarkPress={(ly,lx) => this.SetLocationToNavigate(parseFloat(ly), parseFloat(lx))}
                        />
                        {this.state.ShowBTNNavigate ?
                            <View style={{marginBottom: 15}}>
                                <TouchableOpacity onPress={() => this.handleGetDirections()} style={s.btnNavigate}>
                                    <Icon name={'md-navigate'} size={28} style={s.iconBtnNavigate}/>
                                    <Text style={s.labelBtnNavigate}> เส้นทาง </Text>
                                </TouchableOpacity>
                            </View> : null
                        }
                    </View>
            </Container>
        );
    }
}

MapScreenStepOne.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'แผนที่พรรณไม้'} />
});

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    viewHeader: {
        marginBottom: 0,
        flexDirection: 'row',
        backgroundColor: '#196F3D',
        justifyContent: 'space-around'
    },
    ButtonsGroup: {
        width: 190,
        height: 45,
        borderRadius: 5,
        borderColor: '#F1C40F',
        borderWidth: 1,
        backgroundColor: '#196F3D',
        flexDirection: 'row',
        marginBottom: 5,
        marginLeft: 5,
        flex: 2,
        justifyContent: 'center'
    },
    iconButtonsGroup: {
        marginTop: 10,
    },
    labelButtonGroup: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 7,
        marginTop: 1,
        color: 'white',
    },
    buttonNear: {
        width: 150,
        height: 45,
        borderRadius: 5,
        borderColor: '#F1C40F',
        borderWidth: 1,
        backgroundColor: '#196F3D',
        flexDirection: 'row',
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        flex: 1,
        justifyContent: 'center'
    },
    iconButtonNear: {
        marginTop: 10,
    },
    labelButtonNear: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 7,
        marginTop: 10,
        color: 'white'
    },
    btnNavigate: {
        width: 140,
        height: 50,
        borderRadius: 50,
        backgroundColor:'yellow',
        flexDirection: 'row'
    },
    iconBtnNavigate: {
        marginTop: 10,
        marginLeft: 18
    },
    labelBtnNavigate: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10
    }
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
        GPS : (value) => {dispatch({type: "USE_GPS", payload: value})}
    })
)(MapScreenStepOne);
