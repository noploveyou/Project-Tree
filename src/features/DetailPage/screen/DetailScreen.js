import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Text, Tab, Tabs, TabHeading, Icon } from 'native-base';
import {BackHandler, NetInfo, View} from 'react-native';
import HeaderForm from "../../../common/components/HeaderForm";
import CheckInternet from "../../../common/components/CheckNET";
import Detail from './tab/DetailTree';
import Appearance from './tab/Appearance';
import Location from './tab/Location';

class DetailScreen extends Component {
    componentDidMount(){
        const { back } = this.props.navigation.state.params;
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate(back));
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        const { back, Tree } = this.props.navigation.state.params;
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
                <View>
                    <Text>
                        {Tree}
                    </Text>
                    <Text>
                        {back}
                    </Text>
                </View>
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
    null,
    (dispatch) => ({
        FetchDataHomePage: (value) => {dispatch({type: "CALL_DATA_LIKE", payload: value})},
        SetValueSearchHomePage: (value) => {dispatch({type: "SET_VALUE_SEARCH", payload: value})}
    })
)(DetailScreen);
