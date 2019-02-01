import React, { Component } from 'react';
import { Container, Icon, Content, View, Item } from 'native-base';
import { FlatList, BackHandler, NetInfo, Alert, Keyboard, TextInput } from 'react-native';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import HeaderForm from '../../../common/components/HeaderForm';
import ListItemListTree from '../components/ListItemListTree';
import { connect } from "react-redux";
import CheckInternet from "../../../common/components/CheckNET";
import Loading from '../../../common/components/Loading';
import CheckExitApp from '../../../common/components/CheckExitApp';
import { NavigationActions,StackActions } from 'react-navigation';

class ListTreeScreen extends Component {
    componentDidMount(){
        setTimeout(() => {this.props.FetchDataList();}, 0);   //เชื่อมต่อฐานข้อมูลใน 0.5 วินาที
        this.props.SetSearchList('');   //ค่าที่ใช้ค้นหาในฐานข้อมูล '' = ทั้งหมด
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => [this.props.navigation.navigate('ListTree'),CheckExitApp()]);    //เมื่อกดปุ่ม back บนแอนดรอยด์
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this._keyboardDidHide) // เมื่อปิด keyboard
    }

    componentWillUnmount() {
        this.backHandler.remove();  //ลบ Event ปุ่ม back
        this.props.SetSearchList('');   //ค่าที่ใช้ค้นหาในฐานข้อมูล '' = ทั้งหมด
        this.keyboardDidHideListener.remove();
    }

    constructor(props) {
        super(props);
        this.state = {
            valueInput: '' //ค่าในช่อง Input
        };
    }

    _keyExtractor = (item) => item.plantID; // Key Array ของ FlatList

    _onPressItem = (value) => {
        // เปิดหน้าใหม่พร้อมกับปิดหน้าที่เคยเปิดอยู่
        this.keyboardDidHideListener.remove();
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Detail',
                        params: { back: "ListTree", Tree : value  },
                    }),
                ],
            })
        );

        this.props.SetSearchList('');
        this.clearText();
    };

    _renderItem = ({item}) => {
        return (
            <ListItemListTree
                //id={item.plantID}
                labelTreeNameTH={item.plantName}    //ชื่อพรรณไม้
                labelTreeNameEN={item.plantScience} //ชื่อวิทยาศาสตร์พรรณไม้
                onPressItem={() => this._onPressItem(item.plantName)} //action เมื่อกดที่รายชื่อ
                image={item.imageFileAll} //imageFileAll ภาพพรรณไม้
            />
        );
    };

    Search(value){
        this.setState({valueInput: value});   // text มีค่าเท่ากับ ค่าในช่อง Input
        this.props.SetSearchList(value);    //Set ค่าที่เรียกไปยังฐานข้อมูล
        this.props.FetchDataList();     // เรียกฐานข้อมูล
    }

    clearText(){
        this.setState({valueInput:''});   //ค่าในช่อง Input
        this.componentDidMount();   //ออกจากฟังก์ชัน
    }



    _keyboardDidHide = () => {  //เมื่อปิด Keyboard ลง
        this.refs['ListInput'].blur();
    };

    render() {
        if(this.props.NET == false){    // หากปิด Internet
            return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
        }else if(this.props.DataList == null){    // หากปิด Internet
            return <Loading />     // แสดงหน้า Screen NoInternet
        }

        
        return (
            <Container>
                <Item>
                    <TextInput
                        style={{flex: 1,flexDirection: 'row',justifyContent: 'center', fontSize: 18, marginLeft: 5}}
                        ref="ListInput"
                        placeholder= "กรุณากรอกชื่อพรรณไม้"
                        placeholderTextColor = '#D5D8DC'
                        returnKeyType={"done"}
                        onChangeText={(value) => {this.Search(value)}}
                        value={this.state.valueInput}
                        onFocus={() => this._keyboardDidHide}
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
