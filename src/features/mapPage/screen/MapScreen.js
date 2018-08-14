import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { StyleSheet, View, Alert, Platform, TouchableOpacity, Text} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker, AnimatedRegion} from 'react-native-maps';
import getDirections from "react-native-google-maps-directions";
import {connect} from "react-redux";

class MapScreen extends Component {
    componentDidMount(){
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
            {timeout: 0, distanceFilter: 0}
        );
    }

    componentWillMount() {
        navigator.geolocation.clearWatch(this.watchID)
    }

    watchID: ? number = null;

    constructor(props){
        super(props);
        this.state ={
            coordinate: new AnimatedRegion({
                latitude: 1000,
                longitude: 1000,
            }),
            MapWidth: 1
        }
    }



    render() {
        const fakeData = [{
            title: 'Sweet Maple',
            id: 1,
            description: 'Sweet Maple is a laid-back and unpretentious neighborhood restaurant, coffeehouse and meeting place located in the Lower Pacific Heights neighborhood of San Francisco.',
            image: require('../../../../public/assets/iconsMark/tree.png'),
            latlng: {
                latitude: 13.7880,
                longitude: 100.6976,
                latitudeDelta: 0,
                longitudeDelta: 0
            }
        },
        {
            title: 'Sweet Lime Thai Cuisine',
            id: 2,
            description: 'Thai Food has a lot of peanuts!',
            image: require('../../../../public/assets/iconsMark/tree.png'),
            latlng: {
                latitude: 13.7810,
                longitude: 100.6976,
                latitudeDelta: 0,
                longitudeDelta: 0
            }
        }
        ];

        handleGetDirections = (lat,lng) => { //ฟังก์ชันแสดงตำแหน่งในแผนที่อยู่ 2 ตำแหน่ง
            try {
                const data = {
                    source: {      //จุดที่ 1
                        latitude:  this.props.MyPosition.latitude,
                        longitude: this.props.MyPosition.longitude
                    },
                    destination: { //จุดที่ 2
                        latitude: lat,
                        longitude: lng,
                    },
                    params: [
                        {
                            key: "travelmode",
                            value: "driving"        // may be "walking", "bicycling" or "transit" as well
                        },
                        {
                            key: "dir_action",
                            value: "navigate"       // this instantly initializes navigation using the given travel mode
                        }
                    ]
                };
                getDirections(data)
            }catch (positionNull) {
                const data = {
                    destination: {
                        latitude: lat,
                        longitude: lng,
                    },
                    params: [
                        {
                            key: "travelmode",
                            value: "driving"        // may be "walking", "bicycling" or "transit" as well
                        },
                        {
                            key: "dir_action",
                            value: "navigate"       // this instantly initializes navigation using the given travel mode
                        }
                    ]
                };
                getDirections(data)
            }
        };

        return (
            <Container>
                <Header style={{backgroundColor:'#196F3D'}}>
                    <Left>
                        <Button transparent  onPress={()=>this.props.navigation.openDrawer()}>
                            <Icon name={'menu'} />
                        </Button>
                    </Left>
                    <Body>
                        <Title> {'แผนที่พรรณไม้'} </Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>


                <View style={styles.container}>
                    <MapView style={[styles.map,{width:this.state.MapWidth}]}
                             initialRegion={
                                 //Camera Positions Start
                                 {
                                     latitude: 13.7859,
                                     longitude: 100.6976,
                                     latitudeDelta: 0.0020,  // น้อย =  Zoom
                                     longitudeDelta: 0.0020, // น้อย =  Zoom
                                 }
                             }
                             provider="google"
                            showsMyLocationButton={true}
                            showsUserLocation={true}
                            onMapReady={() => this.setState({ MapWidth: - 1 })}
                             loadingEnabled={true}
                             loadingIndicatorColor='yellow'
                             loadingBackgroundColor='green'


                    >
                        {
                            fakeData.map(function (marker) {
                                return <MapView.Marker  onPress={() => handleGetDirections(marker.latlng.latitude,marker.latlng.longitude)}
                                    coordinate={{ latitude: marker.latlng.latitude, longitude: marker.latlng.longitude }}
                                    title={marker.title}
                                    description={marker.description}
                                    image={marker.image}
                                    key={marker.id}
                                />
                            })
                        }
                    </MapView>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    map: {
        position: 'absolute',
        top: 0,
        left:0,
        bottom:0,
        right:0
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