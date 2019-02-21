import React, { Component } from 'react';
import { Container, Content, View, Item } from 'native-base';
import { connect } from "react-redux";
import { FlatList, BackHandler, NetInfo, Keyboard, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderForm from '../../../common/components/HeaderForm';
import {NavigationActions, StackActions} from "react-navigation";
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import CheckInternet from "../../../common/components/CheckNET";
import Loading from '../../../common/components/Loading';
import ListItem from '../components/ListItem';
import Icon from "react-native-vector-icons/FontAwesome";

class ListMapScreenStepTwo extends Component {
    componentDidMount(){
        this.props.SetSearchListMap('');
        this.props.FetchDataListMap();
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
            valueInput: '',
            isLoading: true,
        };
    }

    _keyboardDidHide = () => {
        this.refs['SearchInput'].blur();
    };

    _keyExtractor = (item ) => item.plantID;

     _onPressItem = (value) => {
         this.props.SetSearchListMap("");
         this.props.SetKeySearch(value);
         this.setState({valueInput: ""});
         this.keyboardDidHideListener.remove();
         // เปิดหน้าใหม่พร้อมกับปิดหน้าที่เคยเปิดอยู่
         this.props.navigation.dispatch(
             StackActions.reset({
                 index: 0,
                 actions: [
                     NavigationActions.navigate({
                         routeName: 'SelectedMap'
                     }),
                 ],
             })
         );
    };

    _renderItem = ({item}) => {
        return (
            <ListItem
                labelTreeNameTH={item.plantName}
                labelTreeNameEN={item.plantScience}
                onPressItem={() => this._onPressItem(item.plantName)}
                icons={item.plantIcon}
            />
        );
    };

    Search(value){
        this.setState({valueInput: value});
        this.props.SetSearchListMap(value);
        this.props.FetchDataListMap();
    }

    clearText(){
        this.setState({valueInput:''});
        this.componentDidMount();
        this.Search('');
    }

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
                        ref="SearchInput"
                        placeholder= "กรุณากรอกชื่อพรรณไม้"
                        placeholderTextColor = '#D5D8DC'
                        returnKeyType={"done"}
                        onChangeText={(value) => {this.Search(value)}}
                        value={this.state.valueInput}
                        onBlur={() => this._keyboardDidHide}
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

const styles = StyleSheet.create({
    input: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 18,
        marginLeft: 5
    },
    btnClear: {
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: '#F1C40F'
    }
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
