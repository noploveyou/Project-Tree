import React, { Component } from 'react';
import {ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import { List, ListItem, Icon, Left, Right } from 'native-base';
import {connect} from "react-redux";

class SideMenu extends Component {
    constructor() {
        super();
        this.state = {
            pressedBtn1: true,  /* ค่าแรกเริ่ม ให้กดปุ่ม ลากิจไว้*/
            pressedBtn2: false, /* ยังไม่กด*/
            pressedBtn3: false /* ยังไม่กด*/
        }
    }

    Btn1 =()=>{
            this.props.navigation.navigate('Home');
            this.setState({pressedBtn1: true,pressedBtn2: false,pressedBtn3: false});
    };

    Btn2 = ()=>{
            this.props.navigation.navigate('ListTree');
            this.setState({pressedBtn2: true,pressedBtn1: false,pressedBtn3: false});
    };

    Btn3 = ()=>{
            this.props.navigation.navigate('Map');
            this.setState({pressedBtn3: true,pressedBtn1: false,pressedBtn2: false});
    };

    render () {
        return (
            <View style={{flex:1,backgroundColor:'#FEF9E7'}}>
                <ScrollView>
                <View style={{height: 210,backgroundColor:'#1E8449',alignItems:'center'}}>
                    <Image source={{uri : 'http://www.pnru.ac.th/themes/responsive_2017_5/images/pnru_logo.png'}}
                           style={{height: 160, width: 130,marginTop:10}}/>
                    <Text style={{fontSize:18,color:'white'}}> มหาวิทยาลัยราชภัฏพระนคร </Text>
                </View >
                    <View >
                        <List>
                            <ListItem noIndent style={[styles.button, this.state.pressedBtn1 ? {backgroundColor:'#F1C40F'} : {}]}
                                      onPress={this.Btn1}>
                                <Left>
                                    <Text style={{fontWeight:'400',fontSize:18}}> หน้าหลัก </Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" style={{color:'black'}}/>
                                </Right>
                            </ListItem>
                            <ListItem noIndent style={[styles.button, this.state.pressedBtn2 ? {backgroundColor:'#F1C40F'} : {}]}
                                      onPress={this.Btn2}>
                                <Left>
                                    <Text style={{fontWeight:'400',fontSize:18}}> รายชื่อพรรณไม้ </Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" style={{color:'black'}}/>
                                </Right>
                            </ListItem>
                            <ListItem noIndent style={[styles.button, this.state.pressedBtn3 ? {backgroundColor:'#F1C40F'} : {}]}
                                      onPress={this.Btn3}>
                                <Left>
                                    <Text style={{fontWeight:'400',fontSize:18}}> แผนที่พรรณไม้ </Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" style={{color:'black'}}/>
                                </Right>
                            </ListItem>
                        </List>
                    </View>
                </ScrollView>
                <View style={{backgroundColor:'#FEF9E7',flexDirection:'row',justifyContent:'flex-start'}}>
                    <Text> ติดต่อ </Text>
                </View>
                <View style={{backgroundColor:'#FEF9E7',alignItems:'center',borderTopWidth:0.3}}>
                    <Text style={{fontWeight:'300',fontSize:20}}> This is my fixed footer </Text>
                </View>
            </View>
        );
    }
}

export default connect(
    null,null
)(SideMenu);


const styles = StyleSheet.create({
    button: {
        backgroundColor:'#FEF9E7',
        height: 40,
        alignItems: 'flex-start'
    },
    ColText : {
        fontWeight:'400',
        fontSize:18,
    },
});