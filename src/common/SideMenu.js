import React, { Component } from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import { List, ListItem, Left, Right } from 'native-base';
import  { NavigationActions, StackActions } from 'react-navigation';
import CommonText from '../common/components/CommonText';
import Icon from "react-native-vector-icons/FontAwesome";

const titleLogoImage = require('../../public/assets/palntImages/pnru_logo.png');

export default class SideMenu extends Component {
    constructor() {
        super();
        this.state = {
            pressedBtn1: true,  /* ค่าแรกเริ่ม ให้กดปุ่ม ลากิจไว้ */
            pressedBtn2: false, /* ยังไม่กด */
            pressedBtn3: false  /* ยังไม่กด */
        }
    }

    Btn1 = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Home'
                    }),
                ],
            })
        );
        this.setState({pressedBtn1: true, pressedBtn2: false, pressedBtn3: false});
    };

    Btn2 = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'ListTree'
                    }),
                ],
            })
        );
        this.setState({pressedBtn2: true, pressedBtn1: false, pressedBtn3: false});
    };

    Btn3 = () => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Map'
                    }),
                ],
            })
        );
        this.setState({pressedBtn3: true, pressedBtn1: false, pressedBtn2: false});
    };

    render () {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.viewImageTitle}>
                        <Image source={titleLogoImage} style={styles.titleImage} />
                        <CommonText text={'มหาวิทยาลัยราชภัฏพระนคร'} color={'white'} size={18} weight={'400'}/>
                    </View >
                        <View >
                            <List>
                                <ListItem
                                    noIndent
                                    style={[styles.button, this.state.pressedBtn1 ? [styles.buttonSelected] : null]}
                                    onPress={this.Btn1}
                                >
                                    <Left>
                                        <CommonText
                                            text={'หน้าหลัก'}
                                            size={18}
                                            weight={this.state.pressedBtn1 ? '500': '400'}
                                        />
                                    </Left>
                                    <Right style={styles.viewIcon}>
                                        <Icon name="home" style={styles.iconColor} size={24} />
                                    </Right>
                                </ListItem>
                                <ListItem
                                    noIndent
                                    style={[styles.button, this.state.pressedBtn2 ? [styles.buttonSelected] : null]}
                                    onPress={this.Btn2}
                                >
                                    <Left>
                                        <CommonText
                                            text={'รายชื่อพรรณไม้'}
                                            size={18}
                                            weight={this.state.pressedBtn2 ? '500': '400'}
                                        />
                                    </Left>
                                    <Right style={styles.viewIcon}>
                                        <Icon name="list-ul" style={styles.iconColor} size={24} />
                                    </Right>
                                </ListItem>
                                <ListItem
                                    noIndent
                                    style={[styles.button, this.state.pressedBtn3 ? [styles.buttonSelected] : {}]}
                                    onPress={this.Btn3}
                                >
                                    <Left>
                                        <CommonText
                                            text={'แผนที่พรรณไม้'}
                                            size={18}
                                            weight={this.state.pressedBtn3 ? '500': '400'}
                                        />
                                    </Left>
                                    <Right style={styles.viewIcon}>
                                        <Icon name="map-marker" style={styles.iconColor} size={24} />
                                    </Right>
                                </ListItem>
                            </List>
                        </View>
                </ScrollView>
                    <View style={styles.viewContact}>
                        <CommonText text={'ติดต่อ'} size={18} weight={'400'}/>
                    </View>
                    <View style={styles.viewFooter}>
                        <CommonText text={'Footer'} size={20} weight={'400'}/>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF9E7'
    },
    viewImageTitle: {
        height: 210,
        backgroundColor: '#196F3D',
        alignItems: 'center'
    },
    titleImage: {
        height: 160,
        width: 130,
        marginTop: 10
    },
    button: {
        backgroundColor:'#FEF9E7',
        height: 40,
        alignItems: 'flex-start'
    },
    buttonSelected: {
        backgroundColor: '#F1C40F'
    },
    ColText : {
        fontWeight: '400',
        fontSize: 18,
    },
    iconColor: {
        color: 'black'
    },
    viewContact: {
        backgroundColor: '#FEF9E7',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    viewFooter: {
        backgroundColor: '#FEF9E7',
        alignItems: 'center',
        borderTopWidth: 0.3
    },
    viewIcon: {
        alignItems: 'center',
        marginLeft: 20
    }
});
