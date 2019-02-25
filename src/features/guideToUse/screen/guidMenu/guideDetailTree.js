import React, { Component } from 'react';
import { Container, Content, Thumbnail } from 'native-base';
import { StyleSheet, NetInfo, BackHandler, View } from 'react-native';
import HeaderForm from '../../../../common/components/HeaderForm';
import CheckInternet from '../../../../common/components/CheckNET';
import NoInternetScreen from '../../../../common/components/NoInternetScreen';
import CommonText from '../../../../common/components/CommonText';
import { NavigationActions, StackActions } from "react-navigation";

const Image1 = require('../../../../../public/assets/ImageGuide/guideDetailTree1.jpg');
const Image2 = require('../../../../../public/assets/ImageGuide/guideDetailTree2.jpg');
const Image3 = require('../../../../../public/assets/ImageGuide/guideDetailTree3.jpg');
const Image4 = require('../../../../../public/assets/ImageGuide/guideDetailTree4.jpg');
const Image5 = require('../../../../../public/assets/ImageGuide/guideDetailTree5.jpg');
const Image6 = require('../../../../../public/assets/ImageGuide/guideDetailTree6.jpg');

class guideDetailTree extends Component {
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
                            text={'1.เลือกแถบข้อมูลที่ต้องการ ดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail square style={[styles.image,{height: 100}]} source={Image1} />

                    </View>
                    <View style={[styles.viewAll, {marginTop: -25}]}>
                        <CommonText
                            text={'แถบข้อมูลประกอบด้วย\n' +
                            '   ● รายละเอียด'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail square style={[styles.image,{height: 300}]} source={Image2} />
                        <CommonText
                            text={'แสดงข้อมูลดังนี้\n' +
                            '   - รหัสพรรณไม้\n'+
                            '   - ชื่อพื้นเมือง\n'+
                            '   - ชื่อวิทยาศาสตร์\n'+
                            '   - ชื่อวงศ์\n'+
                            '   - ชื่อสามัญ\n'+
                            '   - ประเภทพรรณไม้\n'+
                            '   - การกระจายพันธุ์\n'+
                            '   - การขยายพันธุ์\n'+
                            '   - ประโยชน์ในการรักษา\n'+
                            '   - ประโยชน์อื่น\n'}
                            size={18}
                            weight={'400'}
                            style={[styles.label, {marginBottom: 10}]}
                        />
                    </View>

                    <View style={styles.viewAll}>
                        <CommonText
                            text={'   ● ลักษณะ'}
                            size={18}
                            weight={'400'}
                            style={[styles.label, {marginTop: 10}]}
                        />
                        <Thumbnail square style={[styles.image,{height: 400}]} source={Image3} />
                        <CommonText
                            text={'แสดงข้อมูลดังนี้\n' +
                            '   - รูปภาพพรรณไม้\n'+
                            '   - ลักษณะลำต้น\n'+
                            '   - ลักษณะใบ\n'+
                            '   - ลักษณะดอก\n'+
                            '   - ลักษณะผล\n'+
                            '   - ลักษณะเมล็ด\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'     สามารถเลื่อนรูปภาพถัดไป โดยกดปุ่ม "ภาพถัดไป ►"\n'}
                            size={16}
                            color={'gray'}
                            weight={'400'}
                            style={[styles.label, {marginBottom: 10}]}
                        />
                    </View>

                    <View style={styles.viewAll}>
                        <CommonText
                            text={'   ● สถานที่'}
                            size={18}
                            weight={'400'}
                            style={[styles.label, {marginTop: 10}]}
                        />
                        <Thumbnail square style={[styles.image,{height: 540}]} source={Image4} />
                        <CommonText
                            text={'แสดงข้อมูลดังนี้\n' +
                            '   - จำนวนพรรณไม้ที่พบ\n'+
                            '   - ตำแหน่งพรรณไม้\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'     เมื่อกดปุ่มเส้นทางใกล้ที่สุด\n' +
                            'ระบบจะคำนวณเส้นทางที่ใกล้กับผู้ใช้มากที่สุดและจะเปิดแอปพลิเคชันนำทางให้กับผู้ใช้ (Google Map)\n'}
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
                            text={'     ผู้ใช้สามารถเลือกตำแหน่งพรรณไม้ที่ต้องการ\n' +
                            'โดยการกดที่ต้นไม้ในแผนที่ ดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail square style={[styles.image,{height: 180}]} source={Image6} />
                        <CommonText
                            text={'     เมื่อกดเลือกพรรณไม้ในแผนที่จะแสดงชื่อและโซนของพรรณไม้\n'+
                            'และแถบปุ่มด้านล่าง\nประกอบด้วยปุ่ม\n\n' +
                            '       ● เส้นทาง\n'+
                            '   เมื่อกดปุ่ม "เส้นทาง" จะนำเปิดแอปพลิเคชันนำทาง(Google Map) ไปยังตำแหน่งพรรณไม้ที่เลือกในแผนที่\n\n'+
                            '       ● เส้นทางใกล้ที่สุด\n'+
                            '   เมื่อกดปุ่ม "เส้นทางใกล้ที่สุด" จะนำเปิดแอปพลิเคชันนำทาง(Google Map) ไปยังตำแหน่งพรรณไม้ที่ใกล้กับตำแหน่งของผู้ใช้มากที่สุด\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'* สามารถดูรายละเอียดเกี่ยวกับโซนได้ในเมนู "รายละเอียด Zone"\n\n'+
                            '* ผู้ใช้จะต้องเปิดใช้งานแสดงตำแหน่งของผู้ใช้ จึงจะสามารถใช้งานฟังก์ชันเส้นทางใกล้ที่สุดได้\n\n'}
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

guideDetailTree.navigationOptions = ({ navigation }) => ({
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

export default guideDetailTree;
