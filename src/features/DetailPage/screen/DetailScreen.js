import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Tab, Tabs, TabHeading } from 'native-base';
import {BackHandler, NetInfo, StyleSheet} from 'react-native';
import { NavigationActions, StackActions } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderForm from "../../../common/components/HeaderForm";
import CheckInternet from "../../../common/components/CheckNET";
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import Detail from './tab/DetailTree';
import Appearance from './tab/Appearance';
import Location from './tab/Location';
import Loading from '../../../common/components/Loading';
import CommonText from '../../../common/components/CommonText';

class DetailScreen extends Component {
    componentDidMount(){
        const { back, Tree } = this.props.navigation.state.params;
        this.props.SetValue(Tree);  //ค่าที่จะส่งไปหาในฐานข้อมูล
        this.props.FetchData();     //เชื่อมต่อฐานข้อมูล
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate(back));
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this.props.Reset(null);
    }

    render() {
        if(this.props.NET == false){    // หากปิด Internet
            CheckInternet();
            return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
        }else if(this.props.CheckData == false){
            return  <Loading />
        }
        const { back } = this.props.navigation.state.params;

        return (
            <Container>
                    <Tabs >
                        <Tab
                            heading={
                                <TabHeading style={styles.tab}>
                                        <Icon name="pagelines" style={styles.iconTab} size={20} color={'white'}/>
                                        <CommonText text={'รายละเอียด'} size={16} color={'white'}  />
                                </TabHeading>
                            }
                        >
                            <Detail />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={styles.tab}>
                                        <Icon name="envira" style={styles.iconTab} size={20} color={'white'}/>
                                    <CommonText text={'ลักษณะ'} size={16} color={'white'}  />
                                </TabHeading>
                            }
                        >
                            <Appearance />
                        </Tab>
                        {
                            back=="SelectedMap" ? null :
                                <Tab
                                    heading={
                                        <TabHeading style={styles.tab}>
                                            <Icon name="map-marker" style={styles.iconTab} size={20} color={'white'}/>
                                            <CommonText text={'สถานที่พบ'} size={16} color={'white'}  />
                                        </TabHeading>
                                    }
                                >
                                    <Location />
                                </Tab>
                        }
                    </Tabs>
            </Container>
        );
    }
}

DetailScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm
        btn={() => navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: navigation.getParam('back'),
                        params: { back: "SearchListMap"
                    }})
                ],
            })
        )}
        iconName={'arrow-left'}
        titlePage={'รายละเอียดพรรณไม้'}
    />
});

const styles = StyleSheet.create({
    iconTab: {
        marginRight: 5,
        marginTop: 3
    },
    tab: {
        backgroundColor: "#196F3D"
    }
});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,         // ตรวจสอบ Internet
        DataSource : state.DataDetailScreen.DataSource,
        Search : state.DataDetailScreen.Search,
        CheckData: state.DataDetailScreen.CheckData
    }),
    (dispatch) => ({
        FetchData: (value) => {dispatch({type: "CALL_DATA_DETAIL", payload: value})},
        SetValue: (value) => {dispatch({type: "SET_VALUE_DETAIL", payload: value})},
        Reset: (value) => {dispatch({type: "ADD_DATA_DETAIL", payload: value})}
    })
)(DetailScreen);
