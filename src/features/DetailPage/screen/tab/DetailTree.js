import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Text, Accordion, Icon } from 'native-base';
import { View } from 'react-native';

class DetailTree extends Component {
    render() {
        return (
            <Container style={{backgroundColor: "#FEF9E7"}}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        margin: 10
                    }}>
                    <View style={{flexDirection: "row"}}>
                        <Icon name={"menu"}/>
                        <Text style={{marginLeft: 10}}>{"รหัสพรรณไม้"}</Text>
                    </View>
                    <Text>{"111111"}</Text>
                </View>
                <View>
                    <Text>{"ชื่อพื้นเมือง"}</Text>
                </View>
                <View>
                    <Text>{"ชื่อวิทยาศาสตร์"}</Text>
                </View>
                <View>
                    <Text>{"ชื่อวงศ์"}</Text>
                </View>
                <View>
                    <Text>{"ชื่อสามัญ"}</Text>
                </View>
                <View>
                    <Text>{"ประเภทพรรณไม้"}</Text>
                </View>
                <View>
                    <Text>{"การกระจายพันธุ์"}</Text>
                </View>
                <View>
                    <Text>{"การขยายพรรณไม้"}</Text>
                </View>
                <View>
                    <Text>{"ประโยชน์ในการรักษา"}</Text>
                </View>
                <View>
                    <Text>{"ประโยชน์อื่น"}</Text>
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
)(DetailTree);
