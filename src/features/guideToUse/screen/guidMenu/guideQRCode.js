import React, { Component } from 'react';
import { Container, Content, Thumbnail } from 'native-base';
import { StyleSheet, NetInfo, BackHandler, View } from 'react-native';
import HeaderForm from '../../../../common/components/HeaderForm';
import CheckInternet from '../../../../common/components/CheckNET';
import NoInternetScreen from '../../../../common/components/NoInternetScreen';
import CommonText from '../../../../common/components/CommonText';
import { NavigationActions, StackActions } from "react-navigation";

const Image1 = require('../../../../../public/assets/ImageGuide/guideQRCode.jpg');

class guideQRCode extends Component {
    componentDidMount() {   // เริ่มต้นการทำงาน
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate('Guide'));
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
                        <CommonText
                            text={'วิธีการใช้งาน'}
                            size={20}
                            weight={'bold'}
                            style={styles.title}
                        />
                        <CommonText
                            text={'ใช้สำหรับสแกน QR Code ของพรรณไม้\nดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail square style={[styles.image,{height: 320}]} source={Image1} />
                        <CommonText
                            text={'     เมื่อสแกน QR Code พรรณไม้\nระบบจะแสดงรายละเอียดพรรณไม้ที่สแกน\n\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'* สามารถเปิดลิงค์ URL เว็บไซต์ได้ แต่หากไม่ใช่ QR Code พรรณไม้หรือลิงค์ จะแจ้งเตือนไม่พบพรรณไม้\n\n'}
                            size={16}
                            weight={'400'}
                            color={'gray'}
                            style={{width: '90%',marginTop: -10, marginBottom: 10}}
                        />
                        <CommonText
                            text={'* หมายเหตุ\n\n'}
                            size={16}
                            weight={'bold'}
                            color={'red'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'     ผู้ใช้จะต้องยินยอม อนุญาตให้เปิดใช้งานกล้อง จึงจะสามารถใช้งานเมนูนี้ได้'}
                            size={16}
                            weight={'400'}
                            color={'red'}
                            style={{width: '90%',marginTop: -10, marginBottom: 10}}
                        />
                    </View>

                </Content>
            </Container>
        );
    }
}

guideQRCode.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm
        btn={() => navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Guide',
                    })
                ],
            })
        )}
        iconName={'arrow-left'}
        titlePage={'วิธีการใช้งาน'}
    />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1C40F'
    },
    viewAll: {
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: "#FEF9E7",
        margin: 10
    },
    title: {
        margin: 10,
        textAlign: 'left',
        width: '90%'
    },
    label: {
        marginLeft: 10,
        width: '95%'
    },
    image: {
        width: '90%',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
        margin: 20,
        paddingTop: -100
    }
});

export default guideQRCode;
