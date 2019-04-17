import React, { Component } from 'react';
import { Container, Content, Thumbnail } from 'native-base';
import { StyleSheet, NetInfo, BackHandler, View } from 'react-native';
import HeaderForm from '../../../../common/components/HeaderForm';
import CheckInternet from '../../../../common/components/CheckNET';
import NoInternetScreen from '../../../../common/components/NoInternetScreen';
import CommonText from '../../../../common/components/CommonText';
import { NavigationActions, StackActions } from "react-navigation";

class guideDetailZone extends Component {
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
                            text={'ใช้สำหรับดูรายละเอียดโซนของพรรณไม้\nดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail
                            square
                            style={[styles.image,{height: 320}]}
                            source={{uri: 'http://www.bellcenter-pnru.com/admin10/project/buildForMobile/ImageGuide/guideDetailZone.jpg'}}
                        />
                        <CommonText
                            text={'ประกอบไปด้วย\n' +
                            '   ● รหัส\n' +
                            '   แสดงรหัสของโซน ตั้งแต่ CB01 - CB12\n\n' +
                            '   ● รายละเอียด\n'+
                            '   แสดงรายชื่ออาคารที่อยู่ในโซนดังกล่าว'}
                            size={18}
                            weight={'400'}
                            style={[styles.label, {marginBottom: 10}]}
                        />

                    </View>

                </Content>
            </Container>
        );
    }
}

guideDetailZone.navigationOptions = ({ navigation }) => ({
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
        backgroundColor: '#ffdf66'
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

export default guideDetailZone;
