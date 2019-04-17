import React, { Component } from 'react';
import { Container, Content, Thumbnail } from 'native-base';
import { StyleSheet, NetInfo, BackHandler, View } from 'react-native';
import HeaderForm from '../../../../common/components/HeaderForm';
import CheckInternet from '../../../../common/components/CheckNET';
import NoInternetScreen from '../../../../common/components/NoInternetScreen';
import CommonText from '../../../../common/components/CommonText';
import { NavigationActions, StackActions } from "react-navigation";

class guideListTree extends Component {
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
                            text={'1. เลือกพรรณไม้ที่ต้องการ\nโดยกดเลือกพรรณไม้ในรายชื่อ\nดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail
                            square
                            style={[styles.image,{height: 250}]}
                            source={{uri: 'http://www.bellcenter-pnru.com/admin10/project/buildForMobile/ImageGuide/guideListTree1.jpg'}}
                        />
                        <CommonText
                            text={'     หรือค้นหารายชื่อพรรณไม้ โดยกรอกชื่อพรรณไม้ในช่องค้นหา\nดังภาพ'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <Thumbnail
                            square
                            style={[styles.image,{height: 200}]}
                            source={{uri: 'http://www.bellcenter-pnru.com/admin10/project/buildForMobile/ImageGuide/guideListTree2.jpg'}}
                        />
                        <CommonText
                            text={'2. เมื่อเลือกพรรณไม้ที่ต้องการ\nระบบจะแสดงรายละเอียดพรรณไม้ที่เลือก\n\n'}
                            size={18}
                            weight={'400'}
                            style={styles.label}
                        />
                        <CommonText
                            text={'     หากต้องการลบรายชื่อพรรณไม้ที่กรอกในช่องค้นหาทั้งหมด\nกดปุ่ม x(กากบาท) ในช่องค้นหา\n\n'}
                            size={16}
                            weight={'400'}
                            color={'gray'}
                            style={styles.label}
                        />
                    </View>

                </Content>
            </Container>
        );
    }
}

guideListTree.navigationOptions = ({ navigation }) => ({
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

export default guideListTree;
