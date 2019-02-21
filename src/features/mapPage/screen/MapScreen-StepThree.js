import React, { PureComponent } from 'react';
import { Container } from 'native-base';
import { BackHandler, StyleSheet, View } from 'react-native';
import { connect } from "react-redux";
import getDirections from "react-native-google-maps-directions";
import geolib from 'geolib';
import AlertGPS from '../components/AlertGPS';
import HeaderForm from '../../../common/components/HeaderForm';
import FuncCheckNet from '../components/FuncCheckNet';
import GoogleMAP from '../../../common/components/GoogleMAP';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import ButtonFooterStepThree from  '../components/ButtonFooterStepThree';
import LoadingButtonFooter from '../components/LoadingButtonFooter';
import { NavigationActions, StackActions } from "react-navigation";
import CommonText from "../../../common/components/CommonText";
import CheckInternet from "../../../common/components/CheckNET";

class MapScreenStepThree extends PureComponent {
    componentDidMount(){
        this.props.CheckFetchDataMap != false ? this.CheckGPS(false): null;    // ตรวจ GPS
        FuncCheckNet(); // ตรวจสอบ internet
        this.props.FetchDataMap();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate("SearchListMap"));     // เมื่อกดปุ่มย้อนกลับ (ของโทรศัพท์)
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this.props.ResetMark([]);
        this.setState({HackRender: false, isLoading: false});
        this.props.GetLocation(null); // set value UserLocation = null in store
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
            isLoading: false
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
        }, 0)
    };

    CheckGPS = (OnPressNear) => {
        this.setState({isLoading: true});   // เปิดการโหลด
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let newLat = parseFloat(position.coords.latitude), newLong = parseFloat(position.coords.longitude);
                this.props.GetLocation({latitude: newLat, longitude: newLong});  // Set Value in Store
                this.props.GPS(true);       // set GPS true = Enable GPS
                if(OnPressNear == true){     // ทำงานหลังกดปุ่ม
                    this.GetNear();
                }
                this.setState({isLoading: false});  // ปิดการโหลด
            }, () => [AlertGPS(), this.setState({isLoading: false}), this.props.GPS(false)],
                {timeout: 0, distanceFilter: 50} //ระยะเวลา, ระยะทางที่จะเริ่มเก็บ lat/lng อีกครั้ง 50 เมตร
        );
    };

    GetNear = () => {
        if (this.props.GPSConnect) {
            if(this.props.LocationUser !== null) {
                try {
                    let Locations = [], Distance = [];   // เก็บค่า lat, lng และ distance
                    for (let i = 0; i < this.props.DataMarker.length; i++) {   // Loop ตามจำนวนค่าที่มี length
                        let distance = geolib.getDistance(
                            // ตำแหน่งผู้ใช้
                            {latitude: this.props.LocationUser.latitude, longitude: this.props.LocationUser.longitude},
                            {latitude: this.props.DataMarker[i].ly, longitude: this.props.DataMarker[i].lx} // ตำแหน่ง Mark
                        );
                        // Add Value in Array {}, +{}  // locations Mark
                        Locations.push({lat: this.props.DataMarker[i].ly, lng: this.props.DataMarker[i].lx});
                        Distance.push(distance); // Add Value in Array {}, +{} // distance User - Mark : Meter เมตร
                    }
                    let IndexLocations = Distance.indexOf(Math.min(...Distance));   //คำนวนค่าน้อยที่สุด และบอกตำแหน่งใน array
                    this.NavigateNear(parseFloat(Locations[IndexLocations].lat),
                        parseFloat(Locations[IndexLocations].lng));
                    this.setState({isLoading: false});    // Reset การกดปุ่ม // ปิดการโหลด
                    this.props.GetLocation(null);
                } catch (error) {
                    alert("ล้มเหลว กรุณาลองใหม่อีกครั้ง")
                }
            }
        } else if (this.props.GPSConnect == false) {
            this.setState({isLoading: true});
        }

    };

    NavigateNear = (lat, lng) => {
       try{
           let ss = {
               destination: {  //ปลายทาง
                   latitude: lat,
                   longitude: lng
               }
           };
           getDirections(ss);
       }catch (error) {}
    };

    handleGetDirections = () => { //ฟังก์ชัน นำทาง (เปิด Google MAP)
        const data = {
            destination: {      // ปลายทาง
                latitude: this.state.SetLatitudeToNavigate,
                longitude: this.state.SetLongitudeToNavigate,
            }
        };
        getDirections(data)
    };

    SetLocationToNavigate = (lat, lng) => {
        this.setState({SetLatitudeToNavigate: lat, SetLongitudeToNavigate: lng, ShowBTNNavigate: true});
    };

    render() {
        if(this.props.NET == false){    // หากปิด Internet
            CheckInternet();
            return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
        }

        return (
            <Container>
                {this.props.CheckFetchDataMap == false ?
                    <View style={s.noLocation}>
                        <CommonText text={"ไม่พบตำแหน่งพรรณไม้"} size={20} weight={'500'}/>
                    </View>
                    :
                    <View style={s.container}>
                        <View style={s.viewMap}>
                            <GoogleMAP
                                hackScale={{width: this.state.MapWidth, height: this.state.MapHeight}}
                                onMapReady={() =>
                                    [this.setState({MapWidth: -1, HackRender: true}), this.CheckInternetRender()]
                                }
                                onPress={() => this.setState({ShowBTNNavigate: false})}
                                check={this.props.CheckFetchDataMap && this.state.HackRender}
                                Data={this.props.DataMarker}
                                OnMarkPress={(ly, lx) => this.SetLocationToNavigate(parseFloat(ly), parseFloat(lx))}
                            />
                        </View>
                        {this.state.isLoading ?
                            <View style={{width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                                <LoadingButtonFooter/>
                            </View>
                            :
                            this.state.ShowBTNNavigate ?
                                <View
                                    style={{width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                                    <ButtonFooterStepThree
                                        buttonDetail={() =>
                                            this.props.navigation.dispatch(
                                                StackActions.reset({
                                                    index: 0,
                                                    actions: [
                                                        NavigationActions.navigate({
                                                            routeName: 'Detail',
                                                            params: {back: "SelectedMap", Tree: this.props.GetTree},
                                                        }),
                                                    ],
                                                })
                                            )
                                        }
                                        buttonNavigate={() => this.handleGetDirections()}
                                        buttonNavigateNear={() => this.CheckGPS(true)}
                                    />
                                </View>
                                :
                                <View
                                    style={{width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                                    <ButtonFooterStepThree
                                        ButtonFooter={false}
                                        DisableButtonDetail={true}
                                        buttonNearOutFooter={() => this.CheckGPS(true)}
                                    />
                                </View>
                        }
                    </View>
                }
            </Container>
        );
    }
}

MapScreenStepThree.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm
        btn={() =>
            navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'SearchListMap',
                            params: { back: "Map" }})
                    ],
                })
            )
        }
        iconName={'arrow-left'}
        titlePage={'แผนที่พรรณไม้'}
    />
});

const s = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    noLocation: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEF9E7'
    },
    viewMap: {
        height: '95%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        top: 50
    }
});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,         // ตรวจสอบ Internet
        LocationUser : state.CheckDevice.UserLocation,      // ตำแหน่งผู้ใช้
        GPSConnect : state.CheckDevice.GPSConnect,
        DataMarker : state.DataMapScreen.DataMarkStepThree,     // ตำแหน่ง Mark ต้นไม้
        CheckFetchDataMap : state.DataMapScreen.CheckDataMarkStepThree,     // ตรวจสอบว่า โหลดข้อมูลเสร็จหรือไม่
        GetTree: state.DataMapScreen.KeyValue
    }),
    (dispatch) => ({
        GetLocation : (value) => {dispatch({type: "GET_USER_LOCATION", payload: value})},    // รับตำแหน่งผู้ใช้
        FetchDataMap : (value) => {dispatch({type: "CALL_DATA_STEP_THREE", payload: value})},      // เรียกฐานข้อมูล
        ResetMark : (value) => {dispatch({type: "ADD_DATA_MARK_STEP_THREE", payload: value})},  // ลบ Data Mark
        GPS : (value) => {dispatch({type: "USE_GPS", payload: value})},     // set GPS true/false
    })
)(MapScreenStepThree);
