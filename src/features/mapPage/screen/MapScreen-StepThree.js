import React, { Component } from 'react';
import { Container } from 'native-base';
import { Alert, BackHandler, NetInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import getDirections from "react-native-google-maps-directions";
import { connect } from "react-redux";
import HeaderForm from '../../../common/components/HeaderForm';
import CheckInternet from '../../../common/components/CheckNET';
import GoogleMAP from '../../../common/components/GoogleMAP'
import geolib from 'geolib'

class MapScreenStepThree extends Component {
    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate('SearchListMap'));     // เมื่อกดปุ่มย้อนกลับ (ของโทรศัพท์)
        setTimeout(() => {this.props.FetchDataMap()}, 0);    // กำหนดระยะเวลา เริ่มทำงานเมื่อผ่านไป 0 วินาที
        this.CheckGPS();
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
            MyLat: 0,
            MyLng: 0
        }
    }

    CheckInternetRender = () => {           // ทำงานเมื่อ MAP พร้อมใช้งาน (หลังปิด - เปิด Internet)
        setTimeout(() => {
            if(this.props.NET){                 // Internet เปิดใช้งาน
                this.props.FetchDataMap();      // เรียกฐานข้อมูลอีกครั้ง หลังจาก เปิด Internet
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
                    longitude: newLong,
                    latitudeDelta: 0,  //Zoom
                    longitudeDelta: 0, //Zoom
                };
                this.props.GetLocation(initialRegion);  // Set Value in Store
                this.setState({MyLat: newLat, MyLng: newLong});

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

    GetNear = () => {
        let sum = [];
        //console.log(this.props.LocationUser);
        for(let i = 0;i < this.props.DataMarker.length; i++){
            //const MyLocation = this.props.LocationUser
            //const getMarklat = this.props.DataMarker[i].ly;
            //const getMarklng = this.props.DataMarker[i].lx;
            const distance = geolib.getDistance(
                {latitude: this.props.LocationUser.latitude, longitude: this.props.LocationUser.longitude},
                {latitude: this.props.DataMarker[i].ly, longitude: this.props.DataMarker[i].lx}
                );
            sum.push({
                [i]: {
                    lat: this.props.DataMarker[i].ly,
                    lng: this.props.DataMarker[i].lx,
                    dit: distance
                }
            });
            console.log(sum);
        }


            /*navigator.geolocation.getCurrentPosition(
                function(position) {
                    /!*alert('You are ' + geolib.getDistance(position.coords, {
                        latitude: getMarklat,
                        longitude: getMarklng
                    }) + '  จากพรรณไม้' );//' meters away from 51.525, 7.4575'*!/
                    const distance = geolib.getDistance(position.coords, {latitude: getMarklat, longitude: getMarklng});
                    console.log(distance);

                },
                function() {
                    alert('Position could not be determined.')
                }
            );*/

    };

    render() {
        if(this.props.NET == false){    // หากปิด Internet
            return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
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
                    {this.state.ShowBTNNavigate ?
                        <View style={s.viewHeader}>
                            <TouchableOpacity
                                onPress={() => this.onPress}
                                style={s.btnResetCamera}
                            >
                                <Icon name={'md-refresh'} size={28} color={'#196F3D'} style={s.iconBtnResetCamera}/>
                                <Text style={s.labelBtnResetCamera}> {`รายละเอียด`} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.handleGetDirections()}
                                style={s.btnResetCamera}
                            >
                                <Icon name={'md-refresh'} size={28} color={'#196F3D'} style={s.iconBtnResetCamera}/>
                                <Text style={s.labelBtnResetCamera}> {`เส้นทาง`} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.GetNear()}
                                style={s.btnSearch}
                            >
                                <Icon name={'md-search'} size={28} color={'#196F3D'} style={s.iconBtnSearch}/>
                                <Text style={s.labelBtnSearch}> {`ใกล้ที่สุด`} </Text>
                            </TouchableOpacity>
                        </View> : null
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
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    viewHeader: {
        flexDirection: 'row',
        backgroundColor: '#196F3D',
        justifyContent: 'space-around'
    },
    btnResetCamera: {
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
    iconBtnResetCamera: {
        marginTop: 10,
    },
    labelBtnResetCamera: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 0,
        marginBottom: 7,
        marginTop: 0,
        color: '#196F3D',
    },
    btnSearch: {
        width: 90,
        height: 60,
        borderRadius: 5,
        borderColor: '#FEF9E7',
        borderWidth: 1,
        backgroundColor: '#FEF9E7',
        flexDirection: 'column',
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    iconBtnSearch: {
        marginTop: 10,
    },
    labelBtnSearch: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 0,
        marginBottom: 7,
        marginTop: 0,
        color: '#196F3D'
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
        LocationUser : state.CheckDevice.UserLocation,      // ตำแหน่งผู้ใช้
        DataMarker : state.DataMapScreen.DataMarkStepThree,     // ตำแหน่ง Mark ต้นไม้
        CheckFetchDataMap : state.DataMapScreen.CheckDataMarkStepThree,     // ตรวจสอบว่า โหลดข้อมูลเสร็จหรือไม่

    }),
    (dispatch) => ({
        GetLocation : (value) => {dispatch({type: "GET_USER_LOCATION", payload: value})},    // รับตำแหน่งผู้ใช้
        FetchDataMap : (value) => {dispatch({type: "CALL_DATA_STEP_THREE", payload: value})},      // เรียกฐานข้อมูล
        ResetMark : (value) => {dispatch({type: "ADD_DATA_MARK_STEP_THREE", payload: value})}
    })
)(MapScreenStepThree);