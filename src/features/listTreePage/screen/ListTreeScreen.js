import React, { Component } from 'react';
import { Container, Icon, Content, View, Item } from 'native-base';
import { FlatList, BackHandler, NetInfo, Alert, Keyboard, TextInput } from 'react-native';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import HeaderForm from '../../../common/components/HeaderForm';
import ListItemListTree from '../components/ListItemListTree';
import { connect } from "react-redux";
import CheckInternet from "../../../common/components/CheckNET";
import Loading from '../../../common/components/Loading';
import { NavigationActions,StackActions } from 'react-navigation';

class ListTreeScreen extends Component {
    componentDidMount(){
        setTimeout(() => {this.props.FetchDataList();}, 500);
        this.props.SetSearchList('');
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => [this.props.navigation.navigate('ListTree'),this.checkExitApp()]);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this._keyboardDidHide); // เมื่อปิด keyboard
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this.keyboardDidHideListener.remove();
        this.props.SetSearchList('');
    }

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    _keyboardDidHide = () => {
        this.refs['SearchInput'].blur();
    };

    checkExitApp = () => {
        Alert.alert(
            null,
            'คุณต้องการออกจากแอพพลิเคชันหรือไม่ ?',
            [
                {text: 'ไม่ใช่', onPress: () => null},
                {text: 'ใช่', onPress: () => BackHandler.exitApp()},
            ],
            { cancelable: false }
        )
    };

    _keyExtractor = (item) => item.plantID;

    _onPressItem = (value) => {
        this.props
            .navigation
            .dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Detail',
                        params: { back: "ListTree", Tree : value  },
                    }),
                ],
            }));
        this.props.SetSearchList('');
        this.clearText();
    };

    _renderItem = ({item}) => {
        return (
            <ListItemListTree
                //id={item.plantID}
                labelTreeNameTH={item.plantName}
                labelTreeNameEN={item.plantScience}
                onPressItem={() => this._onPressItem(item.plantName)}
                image={item.imageFileAll} //imageFileAll
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
        }else if(this.props.DataList == null){    // หากปิด Internet
            return <Loading />     // แสดงหน้า Screen NoInternet
        }
        //console.log(this.props.DataList);
        return (
            <Container>
                <Item>
                    <TextInput
                        style={{flex: 1,flexDirection: 'row',justifyContent: 'center', fontSize: 18, marginLeft: 5}}
                        ref="SearchInput"
                        placeholder= "กรุณากรอกชื่อพรรณไม้"
                        placeholderTextColor = '#D5D8DC'
                        returnKeyType={"done"}
                        onChangeText={(value) => {this.Search(value)}}
                        value={this.state.text}
                    />
                    <View>
                        <Icon name='close' style={{fontSize: 25, color: 'red',marginRight: 15}}
                              onPress={() => {this.clearText()}}
                        />
                    </View>
                </Item>
                <Content style={{backgroundColor: '#F1C40F'}}>
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