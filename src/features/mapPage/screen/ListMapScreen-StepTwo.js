import React, { Component } from 'react';
import { Container, Icon, Content, View, Item } from 'native-base';
import { FlatList, BackHandler, NetInfo, Keyboard, TextInput } from 'react-native';
import HeaderForm from '../../../common/components/HeaderForm';
import { connect } from "react-redux";
import ListItem from '../components/ListItem';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import CheckInternet from "../../../common/components/CheckNET";
import Loading from '../../../common/components/Loading';
import {NavigationActions, StackActions} from "react-navigation";

class ListMapScreenStepTwo extends Component {
    componentDidMount(){
        this.props.FetchDataListMap();
        this.props.SetSearchListMap('');
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate('Map'));     // เมื่อกดปุ่มย้อนกลับ (ของโทรศัพท์)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this._keyboardDidHide) // เมื่อปิด keyboard
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this.props.SetSearchListMap('');
        this.keyboardDidHideListener.remove();
    }

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            selected: (new Map()),
            isLoading: true,
        };
    }

    _keyboardDidHide = () => {
        this.refs['SearchInput'].blur();
    };

    _keyExtractor = (item ) => item.areaID;

     _onPressItem = (value) => {
         this.props.SetSearchListMap("");
         this.props.SetKeySearch(value);
         this.setState({text: ""});
         this.keyboardDidHideListener.remove();
         // เปิดหน้าใหม่พร้อมกับปิดหน้าที่เคยเปิดอยู่
         this.props.navigation.dispatch(
             StackActions.reset({
                 index: 0,
                 actions: [
                     NavigationActions.navigate({
                         routeName: 'SelectedMap',
                         params: { back: "SearchListMap" },
                     }),
                 ],
             })
         );
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
        this.props.SetSearchListMap(value);
        this.props.FetchDataListMap();
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

        //console.warn(this.props.navigation.getParam('back'));

        return (
            <Container>
                <Item>
                    <TextInput
                        style={{flex: 1,flexDirection: 'row',justifyContent: 'center', fontSize: 18}}
                        ref="SearchInput"
                        placeholder= "Search In Here"
                        placeholderTextColor = '#D5D8DC'
                        returnKeyType={"done"}
                        onChangeText={(value) => {this.Search(value)}}
                        value={this.state.text}
                        onBlur={() => this._keyboardDidHide}
                    />
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

ListMapScreenStepTwo.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm
        btn={() =>
            navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: navigation.getParam('back')})
                    ],
                })
            )
        }
        iconName={'arrow-left'}
        titlePage={'ค้นหาตำแหน่งพรรณไม้'} />
});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,
        DataList : state.DataMapScreen.DataListStepTwo      // ตรวจสอบว่า โหลดข้อมูลเสร็จหรือไม่
    }),
    (dispatch) => ({
        SetSearchListMap : (value) => {dispatch({type: "SET_VALUE_SEARCH_LIST_MAP", payload: value})},
        SetKeySearch : (value) => {dispatch({type: "KEY_VALUE_SEARCH_DATA_MARK_STEP_THREE", payload: value})},
        FetchDataListMap: (value) => {dispatch({type: "CALL_DATA_STEP_TWO", payload: value})}
    })
)(ListMapScreenStepTwo);