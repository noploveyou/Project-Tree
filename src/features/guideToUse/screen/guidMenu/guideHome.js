import React, { Component } from 'react';
import { Container, Content, Thumbnail } from 'native-base';
import { StyleSheet, NetInfo, BackHandler, View } from 'react-native';
import HeaderForm from '../../../../common/components/HeaderForm';
import CheckInternet from '../../../../common/components/CheckNET';
import NoInternetScreen from '../../../../common/components/NoInternetScreen';
import CommonText from '../../../../common/components/CommonText';
import { NavigationActions, StackActions } from "react-navigation";

const Image1 = require('../../../../../public/assets/ImageGuide/guideHome1.jpg');
const Image2 = require('../../../../../public/assets/ImageGuide/guideHome2.jpg');

class guideHome extends Component {
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
                            text={'1. กรอกชื่อพรรณไม้ที่ต้องการค้นหาในช่องค้นหา\nดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail square style={[styles.image,{height: 110}]} source={Image1} />
                        <CommonText
                            text={'     ขณะกรอกชื่อพรรณไม้ ระบบจะแสดงรายชื่อพรรณไม้ที่มีชื่อใกล้เคียงกับคำในช่องค้นหา\nดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail square style={[styles.image,{height: 250}]} source={Image2} />
                        <CommonText
                            text={'     หากต้องการลบรายชื่อพรรณไม้ที่กรอกในช่องค้นหาทั้งหมด\nกดปุ่ม x(กากบาท) ในช่องค้นหา\n\n'}
                            size={16}
                            weight={'400'}
                            color={'gray'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'2. เลือกพรรณไม้ในรายการที่ระบบแนะนำ\nโดยกดเลือกที่ชื่อพรรณไม้ที่ต้องการ\n\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'     เมื่อกดเลือกพรรณไม้ที่ต้องการ\nระบบจะแสดงรายละเอียดพรรณไม้ที่เลือก\n\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'* หมายเหตุ\n\n'}
                            size={16}
                            weight={'bold'}
                            color={'red'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'     หากกรอกชื่อพรรณไม้ด้วยตนเองจะต้องพิมพ์คำค้นหาให้ตรงกับชื่อพรรณไม้ในรายการที่แนะนำ'}
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

guideHome.navigationOptions = ({ navigation }) => ({
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

export default guideHome;
