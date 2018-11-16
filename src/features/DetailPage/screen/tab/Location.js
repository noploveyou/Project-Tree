import React, { PureComponent } from 'react';
import { Container } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { connect } from "react-redux";
import getDirections from "react-native-google-maps-directions";
import geolib from 'geolib';
import AlertGPS from '../../../mapPage/components/AlertGPS';
import GoogleMAP from '../../../../common/components/GoogleMAP'
import ButtonFooterStepThree from  '../../../mapPage/components/ButtonFooterStepThree';
import LoadingButtonFooter from '../../../mapPage/components/LoadingButtonFooter';
import CommonText from "../../../../common/components/CommonText";

class Location  extends PureComponent {
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
            name: ""
        }
    }

    componentDidMount(){
        this.CheckGPS(false);    // ตรวจ GPS
        this.get();
    }

    componentWillUnmount() {
        this.props.ResetMark([]);
        this.setState({HackRender: false, isLoading: false});
        this.props.GetLocation(null); // set value UserLocation = null in store
    }

    get = () => {
        let getName = "";
        this.props.DataSource.map(function (item) {
            return getName = item.plantName;
        });
        this.setState({name: getName});
    };

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
        //console.log(this.props.DataMarker);
        //console.log();

        return (
            <Container>
                {this.props.CheckFetchDataMap == false ?
                    <View style={s.container}>
                        <CommonText text={"ไม่พบตำแหน่ง"}/>
                    </View>
                    :
                    <View style={s.container}>
                        <View style={{width: '100%', height: 30, marginTop: 20, alignItems: 'center'}}>
                            <CommonText text={this.state.name} size={25} textTitle={true} />
                        </View>
                        <View style={s.viewMap}>
                            <GoogleMAP
                                hackScale={{width:this.state.MapWidth, height:this.state.MapHeight}}
                                onMapReady={() =>
                                    [this.setState({ MapWidth: - 1, HackRender: true }), this.CheckInternetRender()]
                                }
                                onPress={() => this.setState({ShowBTNNavigate: false})}
                                check={this.props.CheckFetchDataMap && this.state.HackRender}
                                Data={this.props.DataMarker}
                                OnMarkPress={(ly, lx) => this.SetLocationToNavigate(parseFloat(ly), parseFloat(lx))}
                                //top={10}
                            />
                        </View>
                        {this.state.isLoading ?
                            <LoadingButtonFooter />
                            :
                            this.state.ShowBTNNavigate ?
                                <ButtonFooterStepThree
                                    DisableButtonDetail={true}
                                    buttonNavigate={() => this.handleGetDirections()}
                                    buttonNavigateNear={() => this.CheckGPS(true)}
                                />
                                :
                                <ButtonFooterStepThree
                                    ButtonFooter={false}
                                    DisableButtonDetail={true}
                                    buttonNearOutFooter={() => this.CheckGPS(true)}
                                />
                        }
                    </View>
                }
                    
            </Container>
        );
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEF9E7'
    },
    viewMap: {
        height: '78%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,         // ตรวจสอบ Internet
        LocationUser : state.CheckDevice.UserLocation,      // ตำแหน่งผู้ใช้
        GPSConnect : state.CheckDevice.GPSConnect,
        DataMarker : state.DataDetailScreen.DataLocationSource,     // ตำแหน่ง Mark ต้นไม้
        CheckFetchDataMap : state.DataDetailScreen.CheckLocationData,     // ตรวจสอบว่า โหลดข้อมูลเสร็จหรือไม่
        DataSource: state.DataDetailScreen.DataSource
    }),
    (dispatch) => ({
        GetLocation : (value) => {dispatch({type: "GET_USER_LOCATION", payload: value})},    // รับตำแหน่งผู้ใช้
        ResetMark : (value) => {dispatch({type: "ADD_LOCATION_DATA_DETAIL", payload: value})},  // ลบ Data Mark
        GPS : (value) => {dispatch({type: "USE_GPS", payload: value})},     // set GPS true/false
    })
)(Location);
