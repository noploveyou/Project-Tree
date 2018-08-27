import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Platform, Alert,
} from 'react-native';

import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import {connect} from "react-redux";

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0200;
const LONGITUDE_DELTA = 0.0200;



class AnimatedMarkers extends React.Component {
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
                this.animate();
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
            { timeout: 0, distanceFilter: 100}
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            coordinate: new AnimatedRegion({
                latitude: 0,
                longitude: 0,
            }),
        };
    }

    animate() {
        const newCoordinate = {
            latitude: this.props.MyPosition.latitude,
            longitude: this.props.MyPosition.longitude,
        };

        if (Platform.OS === 'android') {
            if (this.marker) {
                this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
                this.setState({
                    coordinate: new AnimatedRegion({
                        latitude: this.props.MyPosition.latitude,
                        longitude: this.props.MyPosition.longitude
                    })
                });
            }
        } else {
            this.state.coordinate.timing(newCoordinate).start();
            this.setState({
                coordinate: new AnimatedRegion({
                    latitude: this.props.MyPosition.latitude,
                    longitude: this.props.MyPosition.longitude
                })
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <Marker.Animated
                        ref={marker => { this.marker = marker; }}
                        coordinate={this.state.coordinate}
                    />
                </MapView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => this.animate()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text>Animate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});

export default connect(
    (state) => ({
        DataSource : state.DataHomeScreen.DataSource,
        Search : state.DataHomeScreen.Search,
        CheckData : state.DataHomeScreen.CheckDataSource,
        MyPosition : state.DataMapScreen.UserLocation
    }),
    (dispatch) => ({
        FetchDataHomePage: (value) => {dispatch({type: "CALL_DATA_LIKE", payload: value})},
        FetchCheckDataHomePage: (value) => {dispatch({type: "CALL_DATA_IS", payload: value})},
        SetValueSearchHomePage: (value) => {dispatch({type: "SET_VALUE_SEARCH", payload: value})},
        SetValueCheckInDatabaseHomePage : (value) => {dispatch({type: "CHECK_DATA", payload: value})},
        GetLocation : (value) => {dispatch({type: "GET_POSITION", payload: value})}
    })
)(AnimatedMarkers);