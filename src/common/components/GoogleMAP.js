import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';

const GoogleMAP = (props) => {
    return(
        <MapView style={[s.map, props.hackScale,
            {top: props.top, bottom: props.bottom,left: props.left, right: props.right}]}
                    initialRegion={props.initMAP}     // มุมกล้องเริ่มต้น
                 /*{
                     latitude: 13.8770500,
                     longitude: 100.5901700,
                     latitudeDelta: 0.000005,  // น้อย =  Zoom
                     longitudeDelta: 0.000005, // น้อย =  Zoom
                 }*/
                    showsMyLocationButton={true}       // แสดงปุ่ม ตำแหน่งของผู้ใช้
                    showsUserLocation={props.LocationUser}           // แสดงตำแหน่งของผู้ใช้
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
                        description={"โซน : "+mark.locationName}
                        image={'http://www.bellcenter-pnru.com/admin10/project/buildForMobile/iconsMark/'+mark.plantIcon}
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
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
    LocationUser: PropTypes.bool,
    initMAP: PropTypes.object,
};

GoogleMAP.defaultProps = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
    LocationUser: true,
    initMAP: {
        latitude: 13.8770500,
        longitude: 100.5901700,
        latitudeDelta: 0.000015,  // น้อย =  Zoom
        longitudeDelta: 0.000015, // น้อย =  Zoom
    }
};

const s = StyleSheet.create({
    map: {
        position: 'absolute',
    }
});

export default GoogleMAP;
