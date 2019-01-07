import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Text, Content } from 'native-base';
import { StyleSheet, NetInfo, BackHandler } from 'react-native';
import HeaderForm from '../../../common/components/HeaderForm';
import CheckInternet from '../../../common/components/CheckNET';
import NoInternetScreen from '../../../common/components/NoInternetScreen';
import CheckExitApp from '../../../common/components/CheckExitApp';
import CommonText from '../../../common/components/CommonText'

class DetailProjectScreen extends Component {
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
            return <NoInternetScreen />
        }

        return (
            <Container style={s.container}>
                <CommonText text={'รายละเอียด Zone'} size={30}/>
            </Container>
        );
    }
}

DetailProjectScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'รายละเอียดโครงการ'} />
});

const s = StyleSheet.create({
});

export default DetailProjectScreen;

