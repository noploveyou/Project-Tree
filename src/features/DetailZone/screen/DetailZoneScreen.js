import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { StyleSheet, NetInfo, BackHandler, View } from 'react-native';
import HeaderForm from '../../../common/components/HeaderForm';
import CheckInternet from '../../../common/components/CheckNET';
import NoInternetScreen from '../../../common/components/NoInternetScreen';
import CheckExitApp from '../../../common/components/CheckExitApp';
import CommonText from '../../../common/components/CommonText';
import Detail from '../components/DetailZone';

class DetailZoneScreen extends Component {
    componentDidMount() {   // เริ่มต้นการทำงาน
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => [this.props.navigation.navigate('Zone'), CheckExitApp()]);
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
                    <View style={styles.headerTable}>
                        <View style={styles.viewZone}>
                            <CommonText
                                text={'รหัส'}
                                size={18}
                                weight={'500'}
                                color={'white'}
                            />
                        </View>
                        <View style={[styles.viewDetail,{}]}>
                            <CommonText
                                text={'รายละเอียด'}
                                size={18} weight={'500'}
                                color={'white'}
                            />
                        </View>
                    </View>
                    <View style={styles.viewContainerTable}>
                        <View style={styles.viewZone}>
                            <CommonText text={'CB01'} size={18} weight={'bold'}/>
                        </View>
                        <View style={styles.viewDetail}>
                            <CommonText text={Detail['CB01']} size={16} />
                        </View>
                    </View>
                    <View style={styles.viewContainerTable}>
                        <View style={styles.viewZone}>
                            <CommonText text={'CB02'} size={18} weight={'bold'}/>
                        </View>
                        <View style={styles.viewDetail}>
                            <CommonText text={Detail['CB02']} size={16} />
                        </View>
                    </View>
                    <View style={styles.viewContainerTable}>
                        <View style={styles.viewZone}>
                            <CommonText text={'CB03'} size={18} weight={'bold'}/>
                        </View>
                        <View style={styles.viewDetail}>
                            <CommonText text={Detail['CB03']} size={16} />
                        </View>
                    </View>
                    <View style={styles.viewContainerTable}>
                        <View style={styles.viewZone}>
                            <CommonText text={'CB04'} size={18} weight={'bold'}/>
                        </View>
                        <View style={styles.viewDetail}>
                            <CommonText text={Detail['CB04']} size={16} />
                        </View>
                    </View>
                    <View style={styles.viewContainerTable}>
                        <View style={styles.viewZone}>
                            <CommonText text={'CB05'} size={18} weight={'bold'}/>
                        </View>
                        <View style={styles.viewDetail}>
                            <CommonText text={Detail['CB05']} size={16} />
                        </View>
                    </View>
                    <View style={styles.viewContainerTable}>
                        <View style={styles.viewZone}>
                            <CommonText text={'CB06'} size={18} weight={'bold'}/>
                        </View>
                        <View style={styles.viewDetail}>
                            <CommonText text={Detail['CB06']} size={16} />
                        </View>
                    </View>
                    <View style={styles.viewContainerTable}>
                        <View style={styles.viewZone}>
                            <CommonText text={'CB07'} size={18} weight={'bold'}/>
                        </View>
                        <View style={styles.viewDetail}>
                            <CommonText text={Detail['CB07']} size={16} />
                        </View>
                    </View>
                    <View style={styles.viewContainerTable}>
                        <View style={styles.viewZone}>
                            <CommonText text={'CB08'} size={18} weight={'bold'}/>
                        </View>
                        <View style={styles.viewDetail}>
                            <CommonText text={Detail['CB08']} size={16} />
                        </View>
                    </View>
                    <View style={styles.viewContainerTable}>
                        <View style={styles.viewZone}>
                            <CommonText text={'CB09'} size={18} weight={'bold'}/>
                        </View>
                        <View style={styles.viewDetail}>
                            <CommonText text={Detail['CB09']} size={16} />
                        </View>
                    </View>
                    <View style={styles.viewContainerTable}>
                        <View style={styles.viewZone}>
                            <CommonText text={'CB10'} size={18} weight={'bold'}/>
                        </View>
                        <View style={styles.viewDetail}>
                            <CommonText text={Detail['CB10']} size={16} />
                        </View>
                    </View>
                    <View style={styles.viewContainerTable}>
                        <View style={styles.viewZone}>
                            <CommonText text={'CB11'} size={18} weight={'bold'}/>
                        </View>
                        <View style={styles.viewDetail}>
                            <CommonText text={Detail['CB11']} size={16} />
                        </View>
                    </View>
                    <View style={styles.viewContainerTable}>
                        <View style={styles.viewZone}>
                            <CommonText text={'CB12'} size={18} weight={'bold'}/>
                        </View>
                        <View style={styles.viewDetail}>
                            <CommonText text={Detail['CB12']} size={16} />
                        </View>
                    </View>
                </View>
                </Content>
            </Container>
        );
    }
}

DetailZoneScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'รายละเอียด Zone'} />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1C40F'
    },
    viewAll: {
        margin: 10
    },
    headerTable: {
        backgroundColor:'#196F3D',
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 5,
        borderColor: 'white',
        borderWidth: 0.5
    },
    viewZone: {
        width:'20%',
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10
    },
    viewDetail: {
        width:'80%',
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginVertical: 10,
        borderLeftWidth: 0.3,
        borderLeftColor: 'gray',
        paddingLeft: 10
    },
    viewDetailHeader: {
        alignItems: 'center',
        borderLeftColor: 'white'
    },
    viewContainerTable: {
        backgroundColor:'#FEF9E7',
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: 10,
        borderRadius: 10
    }
});

export default DetailZoneScreen;

