import React, { Component } from 'react';
import { Container } from 'native-base';
import { Alert, BackHandler, NetInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import MapView from 'react-native-maps';
import getDirections from "react-native-google-maps-directions";
import { connect } from "react-redux";
import HeaderForm from '../../../common/components/HeaderForm';
import images from '../constants/IconRequire';
import CheckInternet from '../../../common/components/CheckNET';
import SearchListMap from "./SearchListMapScreen";

class MapScreen extends Component {
    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate('Home'));     // เมื่อกดปุ่มย้อนกลับ (ของโทรศัพท์)
        setTimeout(() => {this.props.FetchDataMap()}, 1000);    // กำหนดระยะเวลา เริ่มทำงานเมื่อผ่านไป 1 วินาที
        navigator.geolocation.watchPosition(
            (position) => {
                let newLat = parseFloat(position.coords.latitude); //คำสั่งsetที่อยุ่ตามเครื่อง +แปรงค่าเป้นทศนิยม
                let newLong = parseFloat(position.coords.longitude);
                const initialRegion = {
                    latitude: newLat,
                    longitude: newLong,
                    latitudeDelta: 0,  //Zoom
                    longitudeDelta: 0, //Zoom
                };
                this.props.GetLocation(initialRegion);  // Set Value in Store
            },
            () => Alert.alert(
                null,
                'กรุณาเปิดใช้ GPS ก่อนการใช้งาน',
                [
                    {text: 'ปฏิเสธ', onPress: () => null},
                    {text: 'ตั้งค่า', onPress: () => null}
                ],
                { cancelable: false }
            ),
            {timeout: 0, distanceFilter: 50} //ระยะเวลา, ระยะทางที่จะเริ่มเก็บ lat/lng อีกครั้ง 50 เมตร
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
        navigator.geolocation.clearWatch(this.props.GetLocation(null)); // set value MyLocation = null in store
    }

    CheckInternetRender = () => {           // ทำงานเมื่อ MAP พร้อมใช้งาน (หลังปิด - เปิด Internet)
        setTimeout(() => {
            if(this.props.NET){                 // Internet เปิดใช้งาน
                this.props.FetchDataMap();      // เรียกฐานข้อมูลอีกครั้ง หลังจาก เปิด Internet
                switch (this.state.MapHeight) {     // Hack MAP เพื่อแสดงปุ่ม MyLocation
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

    constructor(props){
        super(props);
        this.state ={
            CameraInMap: {
                latitude: 13.8770500,
                longitude: 100.5901700,
                latitudeDelta: 0.000013,  // น้อย =  Zoom
                longitudeDelta: 0.000013, // น้อย =  Zoom
            },
            MapWidth: 1,        // Hack
            MapHeight: '100%',  // Hack
            SetLatitudeToNavigate: null,    // Latitude  ที่ปลายทาง
            SetLongitudeToNavigate: null,   // Longitude ที่ปลายทาง
            ShowBTNNavigate: false,     // แสดงปุ่ม นำเส้นทาง (เปิด Google MAP)
            HackRender: false,          // สำหรับเช็ค กัน Error (ให้ MAP พร้อม และ Hack เสร็จก่อนค่อย Get Mark)
        }
    }

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

    render() {
        if(this.props.NET == false){    // หากปิด Internet
            return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
        }

        SetLocationToNavigate = (lat, lng) => {
            this.setState({SetLatitudeToNavigate: lat, SetLongitudeToNavigate: lng, ShowBTNNavigate: true});
        };

        return (
            <Container>
                <View style={s.viewHeader}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('SearchListMap')}
                        style={s.btnSearch}
                    >
                        <Icon name={'md-search'} size={28} color={'white'} style={s.iconBtnSearch}/>
                        <Text style={s.labelBtnSearch}> {`ค้นหา`} </Text>
                    </TouchableOpacity>
                </View>
                <View style={s.container}>
                    <MapView style={[s.map,{width:this.state.MapWidth},{height:this.state.MapHeight}]}
                             initialRegion={this.state.CameraInMap}     // มุมกล้องเริ่มต้น
                             showsMyLocationButton={true}       // แสดงปุ่ม ตำแหน่งของผู้ใช้
                             showsUserLocation={true}           // แสดงตำแหน่งของผู้ใช้
                             onMapReady={() =>
                                 [this.setState({ MapWidth: - 1, HackRender: true }), this.CheckInternetRender()]}
                             loadingEnabled={true}              // เปิดใช้การรอโหลด
                             loadingIndicatorColor='yellow'     // Loading สีเหลือง
                             loadingBackgroundColor='green'     // พื้นหลังรอโหลด
                             onPress={() =>  this.setState({ShowBTNNavigate: false})}
                    >
                    {this.props.CheckFetchDataMap && this.state.HackRender ?
                        this.props.DataMarker.map(function (mark, index) {
                            return <MapView.Marker
                                        onPress={() =>
                                            this.SetLocationToNavigate(parseFloat(mark.ly), parseFloat(mark.lx))}
                                        coordinate={{latitude: parseFloat(mark.ly), longitude: parseFloat(mark.lx)}}
                                        title={mark.plantName}
                                        description={mark.locationName}
                                        image={images[mark.plantIcon]}
                                        key={index}>
                                    </MapView.Marker>
                        }) : null
                    }
                        {

                        }
                    </MapView>
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

MapScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'แผนที่พรรณไม้'} />
});

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    viewHeader: {
        marginBottom: 0,
        flexDirection: 'row',
        backgroundColor: '#196F3D',
        justifyContent: 'space-around'
    },
    btnResetCamera: {
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
    iconBtnResetCamera: {
        marginTop: 10,
    },
    labelBtnResetCamera: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 7,
        marginTop: 1,
        color: 'white',
    },
    btnSearch: {
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
    iconBtnSearch: {
        marginTop: 10,
    },
    labelBtnSearch: {
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
        NET : state.CheckNET.InternetIsConnect,         // ตรวจสอบ Internet
        MyPosition : state.DataMapScreen.MyLocation,    // ตำแหน่งผู้ใช้
        DataMarker : state.DataMapScreen.DataOnMap,     // ตำแหน่ง Mark ต้นไม้
        CheckFetchDataMap : state.DataMapScreen.CheckDataOnMap      // ตรวจสอบว่า โหลดข้อมูลเสร็จหรือไม่
    }),
    (dispatch) => ({
        GetLocation : (value) => {dispatch({type: "GET_POSITION", payload: value})},    // รับตำแหน่งผู้ใช้
        FetchDataMap : (value) => {dispatch({type: "CALL_DATA_MAIN_MAP", payload: value})}      // เรียกฐานข้อมูล
    })
)(MapScreen);