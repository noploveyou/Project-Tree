import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Text } from 'native-base';
import { View } from 'react-native';
import HeaderForm from "../../../common/components/HeaderForm";


class DetailScreen extends Component {
    render() {
        return (
            <Container>
                <View>
                    <Text>
                        {this.props.Search}
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
    (state) => ({
        DataSource : state.DataHomeScreen.DataSource,
        Search : state.DataHomeScreen.Search
    }),
    (dispatch) => ({
        FetchDataHomePage: (value) => {dispatch({type: "CALL_DATA_LIKE", payload: value})},
        SetValueSearchHomePage: (value) => {dispatch({type: "SET_VALUE_SEARCH", payload: value})}
    })
)(DetailScreen);
