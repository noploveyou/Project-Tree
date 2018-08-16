import React, { Component } from 'react';
import { Container } from 'native-base';
import { StyleSheet, View, Alert, TouchableOpacity, Text, BackHandler } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import MapView, { AnimatedRegion } from 'react-native-maps';
import getDirections from "react-native-google-maps-directions";
import { connect } from "react-redux";
import HeaderForm from '../../../common/components/HeaderForm';

class MapScreen extends Component {
    componentDidMount(){
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate('Home'));

        this.SearchDataSource();
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
        navigator.geolocation.clearWatch(this.props.GetLocation(null));
    }

    componentDidCatch(){{}} ; // err,info

    //watchID: ? number = null;

    constructor(props){
        super(props);
        this.state ={
            coordinate: new AnimatedRegion({
                latitude: 1000,
                longitude: 1000,
            }),
            MapWidth: 1,
            GetData: false,
            AllMarkData: [],
            SetLatitudeToNavigate: null,
            SetLongitudeToNavigate: null,
            ShowBTNNavigate: false,
            HackRender: false,
            GetPlantIcon: ''
        }
    }

    SearchDataSource () {
        fetch('http://192.168.1.22/DBCheck.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plantName: "",
                    check: "Map"
                })
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson
                }, function(){
                    this.setState({
                        GetData: true
                    });
                    console.log(this.state.dataSource);
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                this.setState({
                    GetData: false
                })
            });
    }

    handleGetDirections = () => { //ฟังก์ชันแสดงตำแหน่งในแผนที่อยู่ 2 ตำแหน่ง
        try {
            const data = {
                source: {      //จุดที่ 1
                    latitude:  this.props.MyPosition.latitude,
                    longitude: this.props.MyPosition.longitude
                },
                destination: {  //จุดที่ 2
                    latitude: this.state.SetLatitudeToNavigate,
                    longitude: this.state.SetLongitudeToNavigate,
                }
            };
            getDirections(data)
        }catch (positionNull) {
            const data = {
                destination: {
                    latitude: this.state.SetLatitudeToNavigate,
                    longitude: this.state.SetLongitudeToNavigate,
                }
            };
            getDirections(data)
        }
    };



    render() {

        SetLocationToNavigate = (lat,lng) => {
            this.setState({SetLatitudeToNavigate: lat, SetLongitudeToNavigate: lng, ShowBTNNavigate: true});

        };

        return (
            <Container>
                <View style={styles.container}>
                    <MapView style={[styles.map,{width:this.state.MapWidth}]}
                             initialRegion={
                                 //Camera Positions Start
                                 {
                                     latitude: 13.8771890,
                                     longitude: 100.5901700,
                                     latitudeDelta: 0.0000140,  // น้อย =  Zoom
                                     longitudeDelta: 0.0000140, // น้อย =  Zoom
                                 }
                             }
                             provider="google"
                            showsMyLocationButton={true}
                            showsUserLocation={true}
                            onMapReady={() => this.setState({ MapWidth: - 1,HackRender: true })}
                             loadingEnabled={true}
                             loadingIndicatorColor='yellow'
                             loadingBackgroundColor='green'
                             onPress={() =>  this.setState({ShowBTNNavigate: false})}

                    >
                    {this.state.GetData && this.state.HackRender ?
                            this.state.dataSource.map(function (mark, index) {

                                //const ss = `../../../../public/assets/iconsMark/${mark.plantIcon}`;
                                return <MapView.Marker
                                    onPress={() => this.SetLocationToNavigate(parseFloat(mark.ly),parseFloat(mark.lx))}
                                    coordinate={{ latitude: parseFloat(mark.ly) , longitude: parseFloat(mark.lx) }}
                                    title={mark.plantName}
                                    description={mark.locationName}
                                    //image={require(mark.plantIcon)}
                                    key={index}>
                                </MapView.Marker>
                            }) : null
                    }
                    </MapView>
                    {this.state.ShowBTNNavigate ?
                        <View style={{marginBottom: 15}}>
                            <TouchableOpacity
                                onPress={() => this.handleGetDirections()}
                                style={{width:140, height:50, borderRadius: 50, backgroundColor:'yellow', flexDirection: 'row'}}
                            >
                                <Icon name={'md-navigate'} size={28} style={{marginTop: 10,marginLeft: 18}}/>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    marginLeft: 10,
                                    marginTop: 10
                                }}> เส้นทาง </Text>
                            </TouchableOpacity>
                        </View> : null
                    }
                </View>
            </Container>
        );
    }
}

MapScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm
        btn={() => navigation.openDrawer()}
        iconName={'bars'}
        titlePage={'แผนที่พรรณไม้'}
    />

});

const styles = StyleSheet.create({
    container: {

        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {

        position: 'absolute',
        top: 0,
        left:0,
        bottom:0,
        right:0,
    },
});

export default connect(
    (state) => ({
        DataSource : state.DataHomeScreen.DataSource,
        Search : state.DataHomeScreen.Search,
        CheckData : state.DataHomeScreen.CheckDataSource,
        MyPosition : state.DataMapScreen.MyLocation,
    }),
    (dispatch) => ({
        FetchData: (value) => {dispatch({type: "CALL_DATA_LIKE", payload: value})},
        FetchCheckData: (value) => {dispatch({type: "CALL_DATA_IS", payload: value})},
        SetValueSearch: (value) => {dispatch({type: "SET_VALUE_SEARCH", payload: value})},
        SetValueCheckInDatabase : (value) => {dispatch({type: "CHECK_DATA", payload: value})},
        GetLocation : (value) => {dispatch({type: "GET_POSITION", payload: value})}
    })
)(MapScreen);