import React, { Component } from 'react';
import { Container, Content, View, Item } from 'native-base';
import { connect } from "react-redux";
import { FlatList, BackHandler, NetInfo, Keyboard, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationActions,StackActions } from 'react-navigation';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import HeaderForm from '../../../common/components/HeaderForm';
import ListItemListTree from '../components/ListItemListTree';
import CheckInternet from "../../../common/components/CheckNET";
import Loading from '../../../common/components/Loading';
import CheckExitApp from '../../../common/components/CheckExitApp';
import Icon from "react-native-vector-icons/FontAwesome";

class ListTreeScreen extends Component {
    componentDidMount(){

        this.props.SetSearchList('');   //ค่าที่ใช้ค้นหาในฐานข้อมูล '' = ทั้งหมด
        setTimeout(()=> {this.props.FetchDataList();}, 0);
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => [this.props.navigation.navigate('ListTree'),CheckExitApp()]);    //เมื่อกดปุ่ม back บนแอนดรอยด์
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this._keyboardDidHideList) // เมื่อปิด keyboard
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
        this.props.navigation.navigate({
                        routeName: 'Detail',
                        params: { back: "ListTree", Tree : value },
                    });
    };

    _renderItem = ({item}) => {
        return (
            <ListItemListTree
                id={item.plantID}
                labelTreeNameTH={item.plantName}    //ชื่อพรรณไม้
                labelTreeNameEN={item.plantScience} //ชื่อวิทยาศาสตร์พรรณไม้
                plantDiscoverer={item.plantDiscoverer}
                onPressItem={() => this._onPressItem(item.plantName)} //action เมื่อกดที่รายชื่อ
                image={item.pathIMG+item.imageFileAll} //imageFileAll ภาพพรรณไม้
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
        this.Search('');
    }

    _keyboardDidHideList = () => {  //เมื่อปิด Keyboard ลง
        this.refs['ListInput'].blur();
    };

    render() {
        if(this.props.NET == false){    // หากปิด Internet
            CheckInternet();
            return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
        }else if(this.props.DataList == null){    // หากปิด Internet
            return <Loading />     // แสดงหน้า Screen NoInternet
        }
        
        return (
            <Container>
                <Item>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        ref="ListInput"
                        placeholder= "กรุณากรอกชื่อพรรณไม้"
                        placeholderTextColor = '#D5D8DC'
                        returnKeyType={"done"}
                        onChangeText={(value) => {this.Search(value)}}
                        value={this.state.valueInput}
                        onFocus={() => this._keyboardDidHideList}
                    />
                    <TouchableOpacity onPress={() => this.clearText()} style={styles.btnClear}>
                        <Icon name={'close'} size={22} style={{color: 'red'}}/>
                    </TouchableOpacity>
                </Item>
                <Content style={styles.container}>
                    <FlatList
                        data={this.props.DataList}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                    />
                </Content>
            </Container>
        );
    }
}

ListTreeScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'รายชื่อพรรณไม้'} />
});

const styles = StyleSheet.create({
    input: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 18,
        marginLeft: 5
    },
    buttonClear: {
        fontSize: 25,
        color: 'red',
        marginRight: 15
    },
    container: {
        backgroundColor: '#ffdf66'
    },
    btnClear: {
        height:50,
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: 'white'
    }
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
