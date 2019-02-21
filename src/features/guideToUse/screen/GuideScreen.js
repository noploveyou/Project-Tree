import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { StyleSheet, NetInfo, BackHandler, View, TouchableOpacity } from 'react-native';
import HeaderForm from '../../../common/components/HeaderForm';
import CheckInternet from '../../../common/components/CheckNET';
import NoInternetScreen from '../../../common/components/NoInternetScreen';
import CheckExitApp from '../../../common/components/CheckExitApp';
import CommonText from '../../../common/components/CommonText'
import Icon from "react-native-vector-icons/FontAwesome";
import {NavigationActions, StackActions} from "react-navigation";
import guideQRCode from "./guidMenu/guideQRCode";
import guideDetailZone from "./guidMenu/guideDetailZone";
import guideAboutProject from "./guidMenu/guideAboutProject";

class GuideScreen extends Component {
    componentDidMount() {   // เริ่มต้นการทำงาน
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => [this.props.navigation.navigate('Guide'), CheckExitApp()]);
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        if(this.props.NET == false){
            CheckInternet();
            return <NoInternetScreen />
        }

        return (
            <Container style={styles.container}>
                <Content>
                    <View style={styles.viewAll}>
                        <View style={styles.viewTitle}>
                            <CommonText text={'เมนู'} size={20} weight={'bold'} style={styles.label} />
                        </View>
                        <View style={styles.viewZoneButton}>
                            <View style={styles.viewButton}>
                                <TouchableOpacity onPress={() =>
                                    this.props.navigation.dispatch(
                                        StackActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate({
                                                    routeName: 'guideHome'
                                                }),
                                            ],
                                        })
                                    )}
                                    style={styles.viewTouchable}
                                >
                                    <CommonText
                                        text={'หน้าแรก'}
                                        size={18}
                                        weight={'500'}
                                        color={'white'}
                                        style={styles.label}
                                    />
                                    <Icon name="home" style={styles.icon} size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.viewZoneButton}>
                            <View style={styles.viewButton}>
                                <TouchableOpacity onPress={() =>
                                    this.props.navigation.dispatch(
                                        StackActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate({
                                                    routeName: 'guideListTree'
                                                }),
                                            ],
                                        })
                                    )}
                                                  style={styles.viewTouchable}
                                >
                                    <CommonText
                                        text={'รายชื่อพรรณไม้'}
                                        size={18}
                                        weight={'500'}
                                        color={'white'}
                                        style={styles.label}
                                    />
                                    <Icon name="list-ul" style={styles.icon} size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.viewZoneButton}>
                            <View style={styles.viewButton}>
                                <TouchableOpacity onPress={() =>
                                    this.props.navigation.dispatch(
                                        StackActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate({
                                                    routeName: 'guideMAP'
                                                }),
                                            ],
                                        })
                                    )}
                                                  style={styles.viewTouchable}
                                >
                                    <CommonText
                                        text={'แผนที่พรรณไม้'}
                                        size={18}
                                        weight={'500'}
                                        color={'white'}
                                        style={styles.label}
                                    />
                                    <Icon name="map-marker" style={styles.icon} size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.viewZoneButton}>
                            <View style={styles.viewButton}>
                                <TouchableOpacity onPress={() =>
                                    this.props.navigation.dispatch(
                                        StackActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate({
                                                    routeName: 'guideQRCode'
                                                }),
                                            ],
                                        })
                                    )}
                                                  style={styles.viewTouchable}
                                >
                                    <CommonText
                                        text={'สแกน QR Code'}
                                        size={18}
                                        weight={'500'}
                                        color={'white'}
                                        style={styles.label}
                                    />
                                    <Icon name="qrcode" style={styles.icon} size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.viewZoneButton}>
                            <View style={styles.viewButton}>
                                <TouchableOpacity onPress={() =>
                                    this.props.navigation.dispatch(
                                        StackActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate({
                                                    routeName: 'guideGuide'
                                                }),
                                            ],
                                        })
                                    )}
                                                  style={styles.viewTouchable}
                                >
                                    <CommonText
                                        text={'วิธีการใช้งาน'}
                                        size={18}
                                        weight={'500'}
                                        color={'white'}
                                        style={styles.label}
                                    />
                                    <Icon name="book" style={styles.icon} size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.viewZoneButton}>
                            <View style={styles.viewButton}>
                                <TouchableOpacity onPress={() =>
                                    this.props.navigation.dispatch(
                                        StackActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate({
                                                    routeName: 'guideDetailZone'
                                                }),
                                            ],
                                        })
                                    )}
                                                  style={styles.viewTouchable}
                                >
                                    <CommonText
                                        text={'รายละเอียด Zone'}
                                        size={18}
                                        weight={'500'}
                                        color={'white'}
                                        style={styles.label}
                                    />
                                    <Icon name="flag" style={styles.icon} size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.viewZoneButton}>
                            <View style={styles.viewButton}>
                                <TouchableOpacity onPress={() =>
                                    this.props.navigation.dispatch(
                                        StackActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate({
                                                    routeName: 'guideAboutProject'
                                                }),
                                            ],
                                        })
                                    )}
                                                  style={styles.viewTouchable}
                                >
                                    <CommonText
                                        text={'เกี่ยวกับโครงการ'}
                                        size={18}
                                        weight={'500'}
                                        color={'white'}
                                        style={styles.label}
                                    />
                                    <Icon name="graduation-cap" style={styles.icon} size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.viewTitle}>
                            <CommonText text={'อื่นๆ'} size={20} weight={'bold'} style={styles.label} />
                        </View>
                        <View style={styles.viewZoneButton}>
                            <View style={styles.viewButton}>
                                <TouchableOpacity onPress={() =>
                                    this.props.navigation.dispatch(
                                        StackActions.reset({
                                            index: 0,
                                            actions: [
                                                NavigationActions.navigate({
                                                    routeName: 'guideDetailTree'
                                                }),
                                            ],
                                        })
                                    )}
                                                  style={styles.viewTouchable}
                                >
                                    <CommonText
                                        text={'รายละเอียดพรรณไม้'}
                                        size={18}
                                        weight={'500'}
                                        color={'white'}
                                        style={styles.label}
                                    />
                                    <Icon name="envira" style={styles.icon} size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <CommonText
                            text={'* กดปุ่มรายการที่ต้องการ เพื่อดูวิธีใช้งาน'}
                            size={16}
                            weight={'500'}
                            color={'gray'}
                            style={{width: '90%',marginVertical: 10, marginHorizontal: 10}}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

GuideScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'วิธีการใช้งาน'} />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1C40F'
    },
    viewAll: {
        backgroundColor: '#FEF9E7',
        margin: 10,
        borderRadius: 10
    },
    viewZoneButton: {
        backgroundColor: '#FEF9E7',
        flex: 1,
        alignItems: 'center',
        margin: 10
    },
    viewTitle: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    label: {
        textAlign: 'center',
        marginLeft: 10
    },
    viewButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '100%'
    },
    viewTouchable: {
        backgroundColor: '#196F3D',
        width: '100%',
        height: 50,
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 50,
        borderColor: '#F1C40F',
        borderWidth: 1
    },
    icon: {
        color: 'white',
        marginRight: 15
    }
});

export default GuideScreen;

