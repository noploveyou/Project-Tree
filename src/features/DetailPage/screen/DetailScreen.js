import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Text, Tab, Tabs, TabHeading, Icon } from 'native-base';
import {BackHandler, NetInfo, View} from 'react-native';
import HeaderForm from "../../../common/components/HeaderForm";
import CheckInternet from "../../../common/components/CheckNET";
import Detail from './tab/DetailTree';
import Appearance from './tab/Appearance';
import Location from './tab/Location';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';

class DetailScreen extends Component {
    componentDidMount(){
        const { back, Tree } = this.props.navigation.state.params;
        this.props.SetValue(Tree);
        this.props.FetchData();

        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate(back));
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        if(this.props.NET == false){    // หากปิด Internet
            return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
        }

        return (
            <Container>
                    <Tabs >
                        <Tab
                            heading={
                                <TabHeading
                                    style={{backgroundColor: "#196F3D"}}
                                >

                                        <Icon name="camera" style={{marginLeft: 10}}/>
                                        <Text style={{fontSize: 16}}>{"รายละเอียด"}</Text>

                                </TabHeading>}
                        >
                            <Detail />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={{backgroundColor: "#196F3D"}}>

                                        <Icon name="camera" />
                                        <Text style={{fontSize: 16}}>{"ลักษณะ"}</Text>

                                </TabHeading>
                            }
                        >
                            <Appearance />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={{backgroundColor: "#196F3D"}}>

                                        <Icon name="apps" />
                                        <Text style={{fontSize: 16}}>{"สถานที่พบ"}</Text>

                                </TabHeading>
                            }
                        >
                            <Location />
                        </Tab>
                    </Tabs>
            </Container>
        );
    }
}

DetailScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm
        btn={() => navigation.goBack()}
        iconName={'arrow-left'}
        titlePage={'รายละเอียดพรรณไม้'}
    />

});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,         // ตรวจสอบ Internet
        DataSource : state.DataDetailScreen.DataSource,
        Search : state.DataDetailScreen.Search
    }),
    (dispatch) => ({
        FetchData: (value) => {dispatch({type: "CALL_DATA_DETAIL", payload: value})},
        SetValue: (value) => {dispatch({type: "SET_VALUE_DETAIL", payload: value})}
    })
)(DetailScreen);
