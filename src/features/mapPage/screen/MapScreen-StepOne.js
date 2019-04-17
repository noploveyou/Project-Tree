import React, { Component } from 'react';
import { Container } from 'native-base';
import { BackHandler, NetInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import getDirections from "react-native-google-maps-directions";
import HeaderForm from '../../../common/components/HeaderForm';
import CheckInternet from '../../../common/components/CheckNET';
import SearchListMap from "./ListMapScreen-StepTwo";
import GoogleMAP from '../../../common/components/GoogleMAP'
import Loading from '../../../common/components/Loading';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import CheckExitApp from '../../../common/components/CheckExitApp';
import CommonText from "../../../common/components/CommonText";

class MapScreenStepOne extends Component {
    componentDidMount(){    //เริ่มการทำงานของ class นี้
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => [this.props.navigation.navigate('Map'), CheckExitApp()]);     // เมื่อกดปุ่มย้อนกลับ (ของโทรศัพท์)
        this.props.FetchDataMap();  //เชื่อมต่อฐานข้อมูล
    }

    componentWillUnmount() {
        this.backHandler.remove(); //ลบ Event ปุ่ม back ของ Android
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

    CheckInternetRender = () => {           // ทำงานเมื่อ MAP พร้อมใช้งาน (หลังปิด - เปิด Internet)
        setTimeout(() => {
            if(this.props.NET){                 // Internet เปิดใช้งาน
                switch (this.state.MapHeight) {     // Hack MAP เพื่อแสดงปุ่ม UserLocation
                    case '100%':
                        this.setState({MapHeight: '101%'});
                        break;

                    case '101%':
                        this.setState({MapHeight: '100%'});
                        break;

                    default:
                }
            }
        }, 0)
    };

    handleGetDirections = () => { //ฟังก์ชัน นำทาง (เปิด Google MAP)
        const data = {
            destination: {      // ปลายทาง
                latitude: this.state.SetLatitudeToNavigate,
                longitude: this.state.SetLongitudeToNavigate,
            }
        };
        getDirections(data);
    };

    SetLocationToNavigate = (lat, lng) => {
        this.setState({SetLatitudeToNavigate: lat, SetLongitudeToNavigate: lng, ShowBTNNavigate: true});
    };

    render() {
        if(this.props.NET == false){    // หากปิด Internet
            CheckInternet();
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
            <Container style={s.containerAll}>
                <View style={s.viewHeader}>
                    <TouchableOpacity
                        onPress={() => // เปิดหน้าใหม่พร้อมกับปิดหน้าที่เคยเปิดอยู่
                            this.props.navigation.navigate({
                                            routeName: 'SearchListMap',
                                            params: { back: "Map" },
                                        })
                        }
                        style={s.buttonSearch}
                    >
                        <Icon name={'md-search'} size={28} color={'white'} style={s.iconButtonSearch}/>
                        <CommonText text={`ค้นหา`} weight={'bold'} size={17} color={'white'} style={s.labelButtonSearch}/>
                    </TouchableOpacity>
                </View>
                    <View style={s.container}>
                        {
                            this.state.HackRender ?
                                <View style={s.titlePlantName}>
                                    <CommonText
                                        text={`พรรณไม้ทั้งหมดที่พบจำนวน  `+this.props.DataMarker.length+`  ต้น`}
                                        size={18}
                                        weight={'500'}
                                    />
                                </View> : null
                        }
                        <View style={s.viewMap}>
                            {
                                this.state.HackRender ? null : <Loading />
                            }
                            <GoogleMAP
                                hackScale={{width:this.state.MapWidth, height:this.state.MapHeight}}
                                onMapReady={() =>
                                [this.setState({ MapWidth: - 1, HackRender: true }), this.CheckInternetRender()]
                                }
                                onPress={() => this.setState({ShowBTNNavigate: false})}
                                check={this.props.CheckFetchDataMap && this.state.HackRender}
                                Data={this.props.DataMarker}
                                OnMarkPress={(ly, lx) => this.SetLocationToNavigate(parseFloat(ly), parseFloat(lx))}
                                LocationUser={true}
                                initMAP={{
                                    latitude: 13.8770500,
                                    longitude: 100.5901700,
                                    latitudeDelta: 0.000005,  // น้อย =  Zoom
                                    longitudeDelta: 0.000005, // น้อย =  Zoom
                                }}
                            />
                            <View style={s.footerButton}>
                                {this.state.ShowBTNNavigate ?
                                    <View>
                                        <TouchableOpacity onPress={() => this.handleGetDirections()} style={s.btnNavigate}>
                                            <Icon name={'md-navigate'} size={28} color={'#FEF9E7'} style={s.iconBtnNavigate}/>
                                            <Text style={s.labelBtnNavigate}> เส้นทาง </Text>
                                        </TouchableOpacity>
                                    </View>
                                    : null
                                }
                            </View>
                        </View>
                    </View>

            </Container>
        );
    }
}

MapScreenStepOne.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'แผนที่พรรณไม้'} />
});

const s = StyleSheet.create({
    containerAll: {
        backgroundColor:"#FEF9E7"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEF9E7'
    },
    viewHeader: {
        width: '100%',
        backgroundColor: '#196F3D',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonSearch: {
        width: '50%',
        borderRadius: 20,
        borderColor: '#ffdf66',
        borderWidth: 2,
        backgroundColor: '#196F3D',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    iconButtonSearch: {
        marginTop: 10,
    },
    labelButtonSearch: {
        marginLeft: 10,
        marginBottom: 7,
        marginTop: 10,
    },
    btnNavigate: {
        width: '100%',
        height: 60,
        borderRadius: 5,
        borderColor: '#ffdf66',
        borderWidth: 1,
        backgroundColor: '#196F3D',
        flexDirection: 'row',
        marginBottom: 100,
        alignItems:'center'
    },
    iconBtnNavigate: {
        marginTop: 5,
        marginLeft: 20,
    },
    labelBtnNavigate: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 20,
        marginBottom: 7,
        marginTop: 8,
        color: '#FEF9E7'
    },
    viewMap: {
        height: '85%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20
    },
    titlePlantName: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 10
    },
    footerButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        top: '20%'
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
        GPS : (value) => {dispatch({type: "USE_GPS", payload: value})}  //ตรวจสอบการเปิดใช้งาน GPS
    })
)(MapScreenStepOne);
