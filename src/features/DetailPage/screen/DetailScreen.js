import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Text } from 'native-base';
import {BackHandler, NetInfo, View} from 'react-native';
import HeaderForm from "../../../common/components/HeaderForm";
import CheckInternet from "../../../common/components/CheckNET";



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
        const { back, Three } = this.props.navigation.state.params;
        return (
            <Container>
                <View>
                    <Text>
                        {Three}
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
