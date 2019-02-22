import React, { Component } from 'react';
import { Container, Content, Thumbnail } from 'native-base';
import { StyleSheet, NetInfo, BackHandler, View } from 'react-native';
import HeaderForm from '../../../../common/components/HeaderForm';
import CheckInternet from '../../../../common/components/CheckNET';
import NoInternetScreen from '../../../../common/components/NoInternetScreen';
import CommonText from '../../../../common/components/CommonText';
import { NavigationActions, StackActions } from "react-navigation";

const Image1 = require('../../../../../public/assets/ImageGuide/guideMAP1.jpg');
const Image2 = require('../../../../../public/assets/ImageGuide/guideMAP2.jpg');
const Image3 = require('../../../../../public/assets/ImageGuide/guideMAP3.jpg');
const Image4 = require('../../../../../public/assets/ImageGuide/guideMAP4.jpg');
const Image5 = require('../../../../../public/assets/ImageGuide/guideMAP5.jpg');
const Image6 = require('../../../../../public/assets/ImageGuide/guideMAP6.jpg');

class guideMAP extends Component {
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
                            text={'     เมนูนี้จะแสดงตำแหน่งทั้งหมดของพรรณไม้\n' +
                            'ผู้ใช้สามารถย่อ ขยายแผนที่โดยใช้สองนิ้วบริเวณแผนที่ และใช้หนึ่งนิ้วเพื่อเลื่อนแผนที่\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'1. เลือกตำแหน่งพรรณไม้ที่ต้องการ\nโดยการกดที่ต้นไม้ในแผนที่ ดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail square style={[styles.image,{height: 350}]} source={Image1} />
                        <CommonText
                            text={'     เมื่อกดเลือกพรรณไม้ในแผนที่ จะแสดงชื่อและโซนของพรรณไม้\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'* สามารถดูรายละเอียดเกี่ยวกับโซนได้ในเมนู "รายละเอียด Zone"\n\n'}
                            size={16}
                            weight={'400'}
                            color={'red'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'2. ใช้ระบบนำทางไปยังตำแหน่งของพรรณไม้ที่เลือก\nโดยกดปุ่ม "เส้นทาง"\n\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'     เมื่อกดปุ่ม "เส้นทาง"\nจะเปิดแอปพลิเคชันสำหรับนำทางบนแผนที่(Google Map)\n\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'     ผู้ใช้สามารถค้นหาตำแหน่งพรรณไม้\nโดยกดปุ่ม "ค้นหา" ดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail square style={[styles.image,{height: 110}]} source={Image2} />
                    </View>


                    <View style={styles.viewAll}>
                        <CommonText
                            text={'ค้นหาตำแหน่งพรรณไม้'}
                            size={20}
                            weight={'bold'}
                            style={styles.title}
                        />
                        <CommonText
                            text={'     เมื่อกดปุ่ม "ค้นหา"\nจะแสดงรายชื่อพรรณไม้ทั้งหมด\n\n'}
                            size={18}
                            weight={'400'}
                            style={[styles.label,{marginTop: 10}]}
                        />
                        <CommonText
                            text={'1. เลือกพรรณไม้ที่ต้องการ\nโดยกดเลือกพรรณไม้ในรายชื่อ\nดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail square style={[styles.image,{height: 250}]} source={Image3} />
                        <CommonText
                            text={'     หรือค้นหารายชื่อพรรณไม้ โดยกรอกชื่อพรรณไม้ในช่องค้นหา\nดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail square style={[styles.image,{height: 210}]} source={Image4} />

                        <CommonText
                            text={'     หากต้องการลบรายชื่อพรรณไม้ที่กรอกในช่องค้นหาทั้งหมด\nกดปุ่ม x(กากบาท) ในช่องค้นหา\n\n'}
                            size={16}
                            weight={'400'}
                            color={'gray'}
                            style={styles.label}
                        />
                    </View>


                    <View style={styles.viewAll}>
                        <CommonText
                            text={'แผนที่พรรณไม้'}
                            size={20}
                            weight={'bold'}
                            style={styles.title}
                        />
                        <CommonText
                            text={'     เมื่อกดเลือกพรรณไม้ที่ต้องการ\n จะแสดงตำแหน่งพรรณไม้ที่เลือกทั้งหมดในแผนที่\n'}
                            size={18}
                            weight={'400'}
                            style={[styles.label,{marginTop: 10}]}
                        />
                        <CommonText
                            text={'เมื่อกดปุ่มเส้นทางใกล้ที่สุด ดังภาพ\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail square style={[styles.image,{height: 180}]} source={Image5} />
                        <CommonText
                            text={'     ระบบจะคำนวณเส้นทางที่ใกล้กับผู้ใช้มากที่สุดและจะเปิดแอปพลิเคชันนำทางให้กับผู้ใช้ (Google Map)\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'* ผู้ใช้จะต้องเปิดใช้งานแสดงตำแหน่งของผู้ใช้ จึงจะสามารถใช้งานฟังก์ชันเส้นทางใกล้ที่สุดได้\n\n'}
                            size={16}
                            weight={'400'}
                            color={'red'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'     หรือผู้ใช้สามารถเลือกตำแหน่งพรรณไม้ที่ต้องการ\n' +
                            'โดยการกดที่ต้นไม้ในแผนที่ ดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail square style={[styles.image,{height: 180}]} source={Image6} />
                        <CommonText
                            text={'     เมื่อกดเลือกพรรณไม้ในแผนที่จะแสดงชื่อและโซนของพรรณไม้\n' +
                            'และแถบปุ่มด้านล่าง\nประกอบด้วยปุ่ม\n\n' +
                            '       ● รายละเอียด\n' +
                            '   เมื่อกดปุ่ม "รายละเอียด" จะแสดงข้อมูลพรรณไม้ที่เลือก\n\n' +
                            '       ● เส้นทาง\n'+
                            '   เมื่อกดปุ่ม "เส้นทาง" จะนำเปิดแอปพลิเคชันนำทาง(Google Map) ไปยังตำแหน่งพรรณไม้ที่เลือกในแผนที่\n\n'+
                            '       ● เส้นทางใกล้ที่สุด\n'+
                            '   เมื่อกดปุ่ม "เส้นทางใกล้ที่สุด" จะนำเปิดแอปพลิเคชันนำทาง(Google Map) ไปยังตำแหน่งพรรณไม้ที่ใกล้กับตำแหน่งของผู้ใช้มากที่สุด\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'* ผู้ใช้จะต้องเปิดใช้งานแสดงตำแหน่งของผู้ใช้ จึงจะสามารถใช้งานฟังก์ชันเส้นทางใกล้ที่สุดได้\n\n'}
                            size={16}
                            weight={'400'}
                            color={'red'}
                            style={styles.label}
                        />
                    </View>

                </Content>
            </Container>
        );
    }
}

guideMAP.navigationOptions = ({ navigation }) => ({
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

export default guideMAP;
