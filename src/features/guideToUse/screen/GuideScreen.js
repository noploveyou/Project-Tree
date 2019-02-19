import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { StyleSheet, NetInfo, BackHandler, View } from 'react-native';
import HeaderForm from '../../../common/components/HeaderForm';
import CheckInternet from '../../../common/components/CheckNET';
import NoInternetScreen from '../../../common/components/NoInternetScreen';
import CheckExitApp from '../../../common/components/CheckExitApp';
import CommonText from '../../../common/components/CommonText'

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
                        <CommonText text={'เร็วๆนี้'} size={30}/>
                    </View>
                </Content>
            </Container>
        );
    }
}

GuideScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'แนะนำการใช้งาน'} />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1C40F'
    },
    viewAll: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF9E7',
        flex: 1
    }
});

export default GuideScreen;

