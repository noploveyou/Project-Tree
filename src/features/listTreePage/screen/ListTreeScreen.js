import React, { Component } from 'react';
import { Container, Icon, Content, View, Input, Item } from 'native-base';
import { FlatList, BackHandler, NetInfo } from 'react-native';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import HeaderForm from '../../../common/components/HeaderForm';
import ListItem from '../components/ListItem';
import { connect } from "react-redux";
import CheckInternet from "../../../common/components/CheckNET";

class ListTreeScreen extends Component {
    componentDidMount(){
        this.props.FetchDataList();
        this.props.SetSearchList('');
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate('ListTree'));
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    _keyExtractor = (item) => item.plantID;

    _onPressItem = (value) => {
        this.props.navigation.navigate({
            routeName: 'Detail',
            params: { back: "ListTree", Three : value }
        });   // ไปยังหน้า รายละเอียด
        this.props.SetSearchList('');
    };

    _renderItem = ({item}) => {
        return (
            <ListItem
                //id={item.plantID}
                labelTreeNameTH={item.plantName}
                labelTreeNameEN={item.plantScience}
                onPressItem={() => this._onPressItem(item.plantName)}
                image={item.plantIcon}
            />
        );
    };

    Search(value){
        this.setState({text: value});
        this.props.SetSearchList(value);
        this.props.FetchDataList();
    }

    clearText(){
        this.setState({text:''});
        this.componentDidMount();
    }

    render() {
        if(this.props.NET == false){    // หากปิด Internet
            return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
        }
        //console.log(this.props.DataList);
        return (
            <Container>
                <Item>
                    <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center'}}>
                        <Input
                            placeholder= "Search In Here"
                            placeholderTextColor = '#D5D8DC'
                            returnKeyType={"done"}
                            onChangeText={(value) => {this.Search(value)}}
                            value={this.state.text}
                        />
                    </View>
                    <View>
                        <Icon name='close' style={{fontSize: 25, color: 'red',marginRight: 15}}
                              onPress={() => {this.clearText()}}
                        />
                    </View>
                </Item>
                <Content>
                    <FlatList
                        data={this.props.DataList}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </Content>
            </Container>
        );
    }
}

ListTreeScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'รายชื่อพรรณไม้'} />
});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,
        DataList : state.DataListTreeScreen.DataListTree
    }),
    (dispatch) => ({
        SetSearchList : (value) => {dispatch({type: "SET_VALUE_SEARCH_LIST_TREE", payload: value})},
        FetchDataList: (value) => {dispatch({type: "CALL_DATA_LIST_TREE", payload: value})}
    })
)(ListTreeScreen);