import React, { Component } from 'react';
import { Container } from 'native-base';
import { Alert, BackHandler, NetInfo, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import getDirections from "react-native-google-maps-directions";
import { connect } from "react-redux";
import HeaderForm from '../../../common/components/HeaderForm';
import CheckInternet from '../../../common/components/CheckNET';
import GoogleMAP from '../../../common/components/GoogleMAP'
import geolib from 'geolib';
import Loading from '../../../common/components/Loading';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';

class MapScreenStepThree extends Component {
    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate('SearchListMap'));     // เมื่อกดปุ่มย้อนกลับ (ของโทรศัพท์)
        setTimeout(() => {this.props.FetchDataMap()}, 0);    // กำหนดระยะเวลา เริ่มทำงานเมื่อผ่านไป 0 วินาที
        this.CheckGPS();    // ตรวจ GPS
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this.props.ResetMark([]);
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
            isLoading: false,
        }
    }

    CheckInternetRender = () => {           // ทำงานเมื่อ MAP พร้อมใช้งาน (หลังปิด - เปิด Internet)
        setTimeout(() => {
            if(this.props.NET){                 // Internet เปิดใช้งาน
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
                let newLat = parseFloat(position.coords.latitude); //คำสั่ง set ที่อยู่ผู้ใช้ แปลงค่าเป็นทศนิยม
                let newLong = parseFloat(position.coords.longitude); //คำสั่ง set ที่อยู่ผู้ใช้ แปลงค่าเป็นทศนิยม
                const initialRegion = {latitude: newLat, longitude: newLong};
                this.props.GetLocation(initialRegion);  // Set Value in Store
                this.props.GPS(true);       // set GPS true = Enable GPS
                if(this.state.OnPressNear){     // ทำงานหลังกดปุ่ม
                    this.GetNear();
                }
                this.setState({isLoading: false});  // ปิดการโหลด
            },
            () => [Alert.alert(
                null,
                'กรุณาเปิดใช้ GPS ก่อนการใช้งาน',
                [
                    {text: 'ปฏิเสธ', onPress: () => null},
                    {text: 'ตั้งค่า', onPress: () => null}
                ],
                { cancelable: false }
            ),navigator.geolocation.clearWatch(this.watchID),this.setState({isLoading: false}),this.props.GPS(false)],
            {timeout: 0, distanceFilter: 50} //ระยะเวลา, ระยะทางที่จะเริ่มเก็บ lat/lng อีกครั้ง 50 เมตร
        );
    };

    GetNear = () => {
        this.CheckGPS();
        if(this.props.GPSConnect) {
            this.setState({isLoading: true});   // เปิดการโหลด
            try {
                let Locations = [];   // เก็บค่า lat, lng และ distance
                let Distance = [];
                for (let i = 0; i < this.props.DataMarker.length; i++) {   // Loop ตามจำนวนค่าที่มี length
                    let distance = geolib.getDistance(
                        // ตำแหน่งผู้ใช้
                        {latitude: this.props.LocationUser.latitude, longitude: this.props.LocationUser.longitude},
                        // ตำแหน่ง Mark
                        {latitude: this.props.DataMarker[i].ly, longitude: this.props.DataMarker[i].lx}
                    );
                    Locations.push(  // Add Value in Array {}, +{}
                        {
                            lat: this.props.DataMarker[i].ly,   // latitude Mark
                            lng: this.props.DataMarker[i].lx,   // longitude Mark
                        }
                    );
                    Distance.push(  // Add Value in Array {}, +{}
                        distance // distance User - Mark : Meter เมตร
                    );
                }
                let IndexLocations = Distance.indexOf(Math.min(...Distance));   //คำนวนค่าน้อยที่สุด และบอกตำแหน่งใน array
                this.NavigateNear(parseFloat(Locations[IndexLocations].lat), parseFloat(Locations[IndexLocations].lng));
                this.setState({OnPressNear: false});    // Reset การกดปุ่ม
                this.setState({isLoading: false});      // ปิดการโหลด
                navigator.geolocation.clearWatch(this.watchID);
            } catch (e) {

            }
        }else if(this.props.GPSConnect == false){
            this.setState({isLoading: true});       // ปิดการโหลด
        }
    };

    NavigateNear = ( lat,lng) => {
       try{
           let ss = {
               destination: {  //ปลายทาง
                   latitude: lat,
                   longitude: lng
               }
           };
           getDirections(ss)
       }catch (e) {
       }
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
                    {this.state.isLoading ?
                        <View style={{
                            flexDirection: 'column',
                            backgroundColor: '#FEF9E7',
                        }}>
                            <ActivityIndicator size="large" color="green"/>
                            <Text style={{fontSize:30}}> กำลังโหลด กรุณารอสักครู่ </Text>
                        </View>
                        :
                        this.state.ShowBTNNavigate ?
                            <View style={s.viewHeader}>
                                <TouchableOpacity
                                    onPress={() => this.onPress}
                                    style={s.ButtonsGroup}
                                >
                                    <Icon name={'md-refresh'} size={28} color={'#196F3D'} style={s.iconButtonsGroup}/>
                                    <Text style={s.labelButtonGroup}> {`รายละเอียด`} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.handleGetDirections()}
                                    style={s.ButtonsGroup}
                                >
                                    <Icon name={'md-refresh'} size={28} color={'#196F3D'} style={s.iconButtonsGroup}/>
                                    <Text style={s.labelButtonGroup}> {`เส้นทาง`} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => [this.setState({OnPressNear: true}),this.GetNear()]}
                                    style={[s.ButtonsGroup]}
                                >
                                    <Icon name={'md-search'} size={28} color={'#196F3D'} style={s.iconButtonsGroup}/>
                                    <Text style={s.labelButtonGroup}> {`ใกล้ที่สุด`} </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity
                                onPress={() => [this.setState({OnPressNear: true}),this.GetNear()]}
                                style={s.buttonNear}
                            >
                                <Icon name={'md-search'} size={28} color={'#FEF9E7'} style={s.iconButtonNear}/>
                                <Text style={s.labelButtonNear}> {`ใกล้ที่สุด`} </Text>
                            </TouchableOpacity>
                    }
                </View>
            </Container>
        );
    }
}

MapScreenStepThree.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.goBack()} iconName={'arrow-left'}  titlePage={'แผนที่พรรณไม้'} />
});

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    viewHeader: {
        flexDirection: 'row',
        backgroundColor: '#196F3D',
        justifyContent: 'space-around'
    },
    ButtonsGroup: {
        width: 90,
        height: 60,
        borderRadius: 5,
        borderColor: '#FEF9E7',
        borderWidth: 1,
        backgroundColor: '#FEF9E7',
        flexDirection: 'column',
        marginBottom: 10,
        marginLeft: 5,
        marginTop: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    iconButtonsGroup: {
        marginTop: 10,
    },
    labelButtonGroup: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 0,
        marginBottom: 7,
        marginTop: 0,
        color: '#196F3D',
    },
    buttonNear: {
        width: '40%',
        height: 60,
        borderRadius: 5,
        borderColor: '#F1C40F',
        borderWidth: 1,
        backgroundColor: '#196F3D',
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems:'center'
    },
    iconButtonNear: {
        marginTop: 5,
    },
    labelButtonNear: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 7,
        marginTop: 8,
        color: '#FEF9E7'
    }
});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,         // ตรวจสอบ Internet
        LocationUser : state.CheckDevice.UserLocation,      // ตำแหน่งผู้ใช้
        GPSConnect : state.CheckDevice.GPSConnect,
        DataMarker : state.DataMapScreen.DataMarkStepThree,     // ตำแหน่ง Mark ต้นไม้
        CheckFetchDataMap : state.DataMapScreen.CheckDataMarkStepThree,     // ตรวจสอบว่า โหลดข้อมูลเสร็จหรือไม่
    }),
    (dispatch) => ({
        GetLocation : (value) => {dispatch({type: "GET_USER_LOCATION", payload: value})},    // รับตำแหน่งผู้ใช้
        FetchDataMap : (value) => {dispatch({type: "CALL_DATA_STEP_THREE", payload: value})},      // เรียกฐานข้อมูล
        ResetMark : (value) => {dispatch({type: "ADD_DATA_MARK_STEP_THREE", payload: value})},  // ลบ Data Mark
        GPS : (value) => {dispatch({type: "USE_GPS", payload: value})},     // set GPS true/false
    })
)(MapScreenStepThree);