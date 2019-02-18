import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Text, Content } from 'native-base';
import { StyleSheet, NetInfo, BackHandler, View } from 'react-native';
import HeaderForm from '../../../common/components/HeaderForm';
import CheckInternet from '../../../common/components/CheckNET';
import NoInternetScreen from '../../../common/components/NoInternetScreen';
import CheckExitApp from '../../../common/components/CheckExitApp';
import CommonText from '../../../common/components/CommonText';
import DetailProject from  '../components/DetailProject';

class DetailProjectScreen extends Component {
    componentDidMount() {   // เริ่มต้นการทำงาน
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => [this.props.navigation.navigate('DetailProject'), CheckExitApp()]);
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
                           text={DetailProject['Title']}
                           size={18} weight={'bold'}
                           style={styles.title}
                       />
                       <CommonText
                           text={DetailProject['TitleDetail']}
                           size={17} weight={'600'}
                           style={styles.titleDetail}
                       />
                       <CommonText
                           text={DetailProject['DetailAboutProject']}
                           size={16} style={styles.detailAboutProject}
                       />
                       <CommonText
                           text={DetailProject['TitleProvider']}
                           size={17}
                           weight={'600'}
                           style={styles.titleProvider}
                       />
                       <CommonText
                           text={DetailProject['Provider']}
                           size={16}
                           style={styles.provider}
                       />
                   </View>
                </Content>
            </Container>
        );
    }
}

DetailProjectScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'รายละเอียดโครงการ'} />
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1C40F'
    },
    viewAll: {
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#FEF9E7'
    },
    title: {
        textAlign: 'center',
        margin: 3,
        marginTop: 10
    },
    titleDetail: {
        textAlign: 'center',
        marginHorizontal: 3
    },
    detailAboutProject: {
        margin: 15
    },
    titleProvider: {
        textAlign: 'center',
        margin: 15
    },
    provider: {
        textAlign: 'center',
        marginHorizontal: 15,
        marginBottom: 10
    }
});

export default DetailProjectScreen;

