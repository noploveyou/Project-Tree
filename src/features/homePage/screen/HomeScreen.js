import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Thumbnail, Text, Content } from 'native-base';
import { View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import  CallData from '../../../../src/common/connectDatabase';

class HomeScreen extends Component {
/*    componentDidMount(){
        CallData.Test();

    }*/

    constructor(props) {
        super(props);
        this.state = {
            text: null,
            autoText: true
        };
    }

    SearchDataSource (value) {
        // ปิด - เปิด List in Input
        value === "" ? this.setState({autoText: true}) : [this.setState({autoText: false}),
            CallData.Test(value)
            ];
        this.setState({text: value});
    }

    render() {

          /*  console.log([this.props.DataSource]);*/
        return (

            <Container style={{backgroundColor:'#FEF9E7'}}>
                <Header style={{backgroundColor:'#196F3D'}}>
                    <Left>
                        <Button transparent
                        onPress={()=>this.props.navigation.openDrawer()}
                        >
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title> หน้าหลัก </Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>

                <Content>
                    <KeyboardAvoidingView behavior="position" enabled={true} keyboardVerticalOffset={95}>
                <View style={{flex:1}}>
                    <View style={{justifyContent:'center',flexDirection:'row',marginTop:30}}>
                        <Thumbnail
                            style={{height:300,width:300,borderRadius:100}}
                            source={{ uri: 'http://www.avocat-sabrina-rouzes.fr/wp-content/uploads/2017/02/arbre.jpg' }} />
                    </View>
                    <View style={{justifyContent:'center',flexDirection:'row',marginTop:30,marginBottom:10}}>
                        <Text style={{fontSize:25,fontWeight:'400'}}> ค้นหาพรรณไม้ </Text>
                    </View>
                    <View style={{flexDirection:'row' }}>
                        <View style={{marginTop:5, marginLeft: 15, marginRight: 10,width:'70%'}}>
                        <Autocomplete
                            autoCapitalize="none"
                            autoCorrect={false}
                            /*containerStyle={styles.autocompleteContainer}*/
                            data={this.props.DataSource.DataSource}
                            defaultValue={this.state.text}
                            onChangeText={(value) => this.SearchDataSource(value)}
                            placeholder=" Enter Plant Name "
                            hideResults={this.state.autoText}
                            inputContainerStyle={{borderColor:'white'}}
                            renderItem={({ plantName }) => (
                                <TouchableOpacity onPress={() =>
                                    [this.setState({ text: plantName }),this.setState({autoText: true})]}>
                                    <Text>
                                        {plantName}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        </View>
                        <View >
                            <TouchableOpacity
                                onPress={() => this.props.setTextSearch(this.state.text)}
                                style={{height:50,width:80,backgroundColor:'#F4D03F',
                                    justifyContent:'center',flexDirection:'row',
                                    alignItems:'center',borderRadius:25}}>
                                <Text style={{fontSize:25,fontWeight:'500'}}>ค้นหา</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                    </KeyboardAvoidingView>
                </Content>

            </Container>

        );
    }
}

export default connect(
    (state) => ({
        Search: state.Search,
        DataSource: state.DataSource
    }),
    (dispatch) => ({
        setTextSearch: (value) => {dispatch({type: "setTextSearch", payload: value})},
        Add: (value) => {dispatch({type: "AddDataSource", payload: value})}
    })
)(HomeScreen);
