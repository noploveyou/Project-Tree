import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Text } from 'native-base';
import { View } from 'react-native';

class Appearance  extends Component {
    render() {
        return (
            <Container>
                <View>
                    <Text>
                        {"Appearance"}
                    </Text>
                </View>
            </Container>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        FetchDataHomePage: (value) => {dispatch({type: "CALL_DATA_LIKE", payload: value})},
        SetValueSearchHomePage: (value) => {dispatch({type: "SET_VALUE_SEARCH", payload: value})}
    })
)(Appearance);
