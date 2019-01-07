import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Text, Content } from 'native-base';
import { StyleSheet, NetInfo, BackHandler } from 'react-native';
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
            return <NoInternetScreen />
        }

        return (
            <Container style={s.container}>
                <CommonText text={'วิธีการใช้งาน'} size={30}/>
            </Container>
        );
    }
}

GuideScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'แนะนำการใช้งาน'} />
});

const s = StyleSheet.create({
});

export default GuideScreen;

