import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import images from "../IconRequire";

const GoogleMAP = (props) => {
    return(
        <MapView style={[s.map, props.hackScale]}
                    initialRegion={{
                        latitude: 13.8770500,
                        longitude: 100.5901700,
                        latitudeDelta: 0.000013,  // น้อย =  Zoom
                        longitudeDelta: 0.000013, // น้อย =  Zoom
                    }}     // มุมกล้องเริ่มต้น
                    showsMyLocationButton={true}       // แสดงปุ่ม ตำแหน่งของผู้ใช้
                    showsUserLocation={true}           // แสดงตำแหน่งของผู้ใช้
                    onMapReady={props.onMapReady}
                    onPress={props.onPress}
                    toolbarEnabled={false}
        >
            {props.check ?
                props.Data.map(function (mark, index) {
                    return <MapView.Marker
                        onPress={() => props.OnMarkPress(mark.ly, mark.lx)}
                        coordinate={{latitude: parseFloat(mark.ly), longitude: parseFloat(mark.lx)}}
                        title={mark.plantName}
                        description={mark.locationName}
                        image={images[mark.plantIcon]}
                        key={index}>
                    </MapView.Marker>
                }) : null
            }
        </MapView>
    )
};

GoogleMAP.propTypes = {
    hackScale: PropTypes.object,
    onMapReady: PropTypes.func,
    onPress: PropTypes.func,
    check: PropTypes.bool,
    Data: PropTypes.array,
    OnMarkPress: PropTypes.func,
};

const s = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 10,
        left: 10,
        bottom: 10,
        right: 10,
    }
});

export default GoogleMAP;
