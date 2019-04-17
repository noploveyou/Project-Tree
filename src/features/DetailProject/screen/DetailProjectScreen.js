import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { StyleSheet, NetInfo, BackHandler, View } from 'react-native';
import HeaderForm from '../../../common/components/HeaderForm';
import CheckInternet from '../../../common/components/CheckNET';
import NoInternetScreen from '../../../common/components/NoInternetScreen';
import CheckExitApp from '../../../common/components/CheckExitApp';
import CommonText from '../../../common/components/CommonText';
import DetailProject from  '../components/DetailProject';
import { connect } from "react-redux";

class DetailProjectScreen extends Component {
    componentDidMount() {   // เริ่มต้นการทำงาน
        this.props.FetchDataMap();
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
                       <View style={styles.label}>
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
                       </View>
                       <View style={[styles.label, {top: -40}]}>
                           <CommonText
                               text={DetailProject['TitleDetailAbout']}
                               size={17} weight={'600'}
                               style={styles.titleDetailAbout}
                           />
                           <CommonText
                               text={DetailProject['DetailAboutProject']+
                               this.props.DataMarker.length + DetailProject['countTrees']}
                               size={16} style={styles.detailAboutProject}
                           />
                       </View>
                       <View style={[styles.label, {top: -30}]}>
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
        backgroundColor: '#ffdf66'
    },
    viewAll: {
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        height: '100%',
        justifyContent: 'center'
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
    titleDetailAbout: {
        textAlign: 'center',
        marginHorizontal: 3,
        marginTop: 10
    },
    detailAboutProject: {
        marginHorizontal: 20
    },
    titleProvider: {
        textAlign: 'center',
        marginTop: 10
    },
    provider: {
        textAlign: 'center',
        marginHorizontal: 15,
        marginBottom: 10
    },
    label: {
        backgroundColor: "#FEF9E7",
        borderRadius: 10,
        margin: 10
    }
});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,  // ตรวจสอบ Internet
        DataMarker : state.DataMapScreen.DataMarkStepOne,
        CheckData: state.DataMapScreen.CheckDataMarkStepOne
    }),
    (dispatch) => ({
        FetchDataMap : (value) => {dispatch({type: "CALL_DATA_STEP_ONE", payload: value})}
    })
)(DetailProjectScreen);
