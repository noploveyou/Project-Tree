import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {
    StyleSheet,
    View} from 'react-native';

import MapView, { PROVIDER_GOOGLE,Marker  } from 'react-native-maps';
import getDirections from "react-native-google-maps-directions";

export default class MapScreen extends Component {
    constructor(props){
        super(props);
        this.state ={
            inittialPosition:{
                latitude:0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,

            },
            markePosition:{
                latitude: 0,
                longitude: 0,
            }
        }
    }
    watchID: ?number = null;

    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude) //คำสั่งsetที่อยุ่ตามเครื่อง +แปรงค่าเป้นทศนิยม
            var long = parseFloat(position.coords.longitude)
            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,  //Zoom
                longitudeDelta: 0.0921, //Zoom
            }
            this.setState({inittialPosition : initialRegion })  //คำสั่งsetตัวแปรโลเคชัน ใน this.state
            this.setState({markePosition : initialRegion })//คำสั่งsetตัวแปร marke ใน this.state
        })
    }
    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID)
    }
    handleGetDirections = () => { //ฟังชั่นแสดงที่อยู่ 2จุด
        const data = {
            source: {      //จุดที่ 1
                latitude:  this.state.lat,
                longitude: this.state.long ,
            },
            destination: { //จุดที่ 2
                latitude: 13.7859,
                longitude: 100.6976,
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
        }

        getDirections(data)
    }


    render() {
        return (
            <Container>
                <Header style={{backgroundColor:'#196F3D'}}>
                    <Left>
                        <Button transparent  onPress={()=>this.props.navigation.openDrawer()}>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title> แผนที่พรรณไม้ </Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <View style={styles.container}>
                  <View style={{height:20,backgroundColor:'red'}}>

                  </View>

                        <MapView
                            style={styles.map}
                            region={
                                this.state.inittialPosition
                                /*latitude: 13.7859,
                                longitude: 100.6976,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0921,*/
                            }>

                            <Marker  onPress={this.handleGetDirections}
                                     coordinate={
                                         this.state.markePosition
                                     }
                                     title={"intbizth"}
                                     description={"จะเอ๋"}
                            />
                            <Marker
                                coordinate={{
                                    latitude: 13.7859,
                                    longitude: 100.6976,
                                }}
                                title={"intbizthxd"}
                                description={"จะเอ๋zxc"}
                            />
                        </MapView>

                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,

    },map: {
        position: 'absolute',
        top: 40,
        left:0,
        bottom:0,
        right:0,
        margin:5
    },

});