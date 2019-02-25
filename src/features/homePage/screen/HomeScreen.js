import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Thumbnail, Text, Content } from 'native-base';
import { View, TouchableOpacity, StyleSheet, Keyboard, Alert, NetInfo, BackHandler } from 'react-native';
import { NavigationActions, StackActions } from "react-navigation";
import Autocomplete from 'react-native-autocomplete-input';
import CommonList from '../components/CommonList';
import HeaderForm from '../../../common/components/HeaderForm';
import Icon from "react-native-vector-icons/FontAwesome";
import CheckInternet from '../../../common/components/CheckNET';
import NoInternetScreen from '../../../common/components/NoInternetScreen';
import CheckExitApp from '../../../common/components/CheckExitApp';
import CommonText from "../../../common/components/CommonText";
import SplashScreen from 'react-native-splash-screen';

const LogoPage = require('../../../../public/assets/plantImages/LogoTree.png');

class HomeScreen extends Component {
    componentDidMount() {   // เริ่มต้นการทำงาน
        SplashScreen.hide();
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => [this.props.navigation.navigate('Home'), CheckExitApp()]);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
            this._keyboardDidShow); // เมื่อเปิด keyboard
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this._keyboardDidHide) // เมื่อปิด keyboard
    }

    componentWillUnmount() {
        this.props.SetValueSearchHomePage('');
        this.backHandler.remove();
        this.setState({ValueInput: ""});
        this.keyboardDidHideListener.remove();
        this.keyboardDidShowListener.remove();
    }

    constructor(props) {
        super(props);
        this.state = {
            ValueInput: "", // ค่าในช่อง Input
            DisableListResults: true, // true = ปิด แถบรายชื่อ
            SetScrollView: false,  // การเลื่อนหน้าใน content /false = ปิด
            ShowLogoTitle: true,     // เปิด - ปิด Logo true = แสดง
            ShowButtonClear: false,     // แสดง - ซ่อน ปุ่ม x (ลบ) false = ซ่อน
            InputIsEmpty: true,    // ค่าใน Input ว่าง  true = ว่าง
        }
    };

    _keyboardDidShow = () => {
        this.setState({ShowLogoTitle: false}); // เมื่อเปิด keyboard ซ่อน Logo
        this.SearchDataSource(this.state.ValueInput); // ใช้ฟังก์ชัน เช็คค่าว่าง
    };

    _keyboardDidHide = () => {
        this.setState({ShowLogoTitle: true, DisableListResults: true}); // เมื่อปิด keyboard ปิด DisableListResults แสดง Logo
        this.refs['input'].blur();
    };

    SearchDataSource (value) {
        this.props.SetValueCheckInDatabaseHomePage(false);   // ค่า CheckData ว่าค่าตรงหรือไม่ false = หาค่าใน Data ไม่เจอ
        this.setState({ValueInput: value});     // set ค่าที่แสดงในช่อง Input
        if(value === "") {  // เช็คค่าใน Input เป็นว่างใช่หรือไม่
            this.setState({DisableListResults: true, ShowButtonClear: false});     // ปิด ListSuggest, ปุ่ม x
            this.setState({InputIsEmpty: true});     // set Input = true --> ว่าง
        }else{
            this.setState({DisableListResults: false, ShowButtonClear: true});     //// เปิด ListSuggest, ปุ่ม x
            this.setState({InputIsEmpty: false});    // set Input = false --> ไม่ว่าง
            // Action
            this.props.SetValueSearchHomePage(value);   // Action -> set Search in Store
            this.props.FetchDataHomePage();         // where Like
            this.props.FetchCheckDataHomePage();    // เช็คค่า true, false จาก ฐานข้อมูล (เช็คค่าว่ามีในฐานข้อมูลหรือไม่)
        }
    }

    ToDetail = (value) => {
        this.props.navigation.navigate({
                        routeName: 'Detail',
                        params: { back: "Home", Tree : value },
                    })
    };

    NavToDetail = () =>{     // ปุ่มค้นหา
        if((this.props.CheckData)){
            // เปิดหน้าใหม่พร้อมกับปิดหน้าที่เคยเปิดอยู่
            this.props.navigation.navigate({
                            routeName: 'Detail',
                            params: { back: "Home", Tree : this.state.ValueInput },
                        })
        }else {
            if (this.state.InputIsEmpty){    // เช็คค่า Input ว่างหรือไม่
                Alert.alert(
                    null,
                    'กรุณากรอกชื่อพรรณไม้',
                    [
                        {text: 'ตกลง', onPress: () => null},
                    ],
                    { cancelable: false }
                )
            }else {           
                Alert.alert(
                    null,
                    `ไม่พบพรรณไม้\nกรุณาตรวจสอบอีกครั้ง`,
                    [
                        {text: 'ตกลง', onPress: () => null},
                    ],
                    { cancelable: false }
                )
            }
        }
    };

    BtnClear(){ // ปุ่ม x (ลบ)
        this.props.SetValueCheckInDatabaseHomePage(false);  // ค่า CheckData ว่าค่าตรงหรือไม่ false = หาค่าใน Data ไม่เจอ
        this.setState({ValueInput: "", DisableListResults: true, ShowButtonClear: false, InputIsEmpty: true});
    }

    render() {
        if(this.props.NET == false){
            CheckInternet();
            return <NoInternetScreen />
        }else if(this.props.NET == true) {
            CheckInternet();
        }

        return (
            <Container style={s.container}>
                <Content scrollEnabled={false} /* ปิดการเลื่อนหน้า */>
                <View>
                    {
                        this.state.ShowLogoTitle ?  // เช็คว่าแสดง Logo หรือไม่
                        <View style={s.viewImage}>
                            <Thumbnail style={s.thumbnail} source={LogoPage} />
                            <CommonText
                                text={'ปีบหรือกาซะลอง เป็นพรรณไม้\n'+'ประจำมหาวิทยาลัยราชภัฏพระนคร'}
                                size={16}
                                weight={"500"}
                                style={{textAlign: 'center', marginTop: 10}}
                            />
                        </View> : null
                    }
                    <View style={[s.titlePage,this.state.ShowLogoTitle ? {marginTop: 30} : null]} /*เช็คว่าแสดง Logo หรือไม่*/>
                        <CommonText text={'ค้นหาพรรณไม้'} size={25} weight={"bold"}/>
                    </View>
                    <View style={s.inputFormAll}>
                        <View style={this.state.InputIsEmpty ?   //เช็คว่า Input ว่างหรือไม่
                            [s.SizeInputIncrease, this.state.ShowLogoTitle ? null : s.SizeInputMaximum] :
                            [s.SizeInputDecrease, this.state.ShowLogoTitle ? null : s.SizeInputMinimum]}
                        >
                            <Autocomplete underlineColorAndroid='transparent'
                                style={s.inputAutoCP}
                                onFocus={() => [this._keyboardDidShow, this._keyboardDidHide]}
                                onBlur={() => [
                                    // เมื่อปิด keyboard ปิด DisableListResults แสดง Logo
                                    this.setState({ShowLogoTitle: true, DisableListResults: true}),
                                ]}
                                ref="input"
                                data={this.props.DataSource}                        
                                defaultValue={this.state.ValueInput}
                                onChangeText={(value) => this.SearchDataSource(value)}
                                onSubmitEditing={() => [
                                    // เมื่อปิด keyboard ปิด DisableListResults แสดง Logo
                                    this.setState({ShowLogoTitle: true, DisableListResults: true}),this.NavToDetail()
                                ]}
                                placeholder="กรุณากรอกชื่อพรรณไม้"
                                placeholderTextColor='gray'
                                hideResults={this.state.DisableListResults}     // true = ปิด - false = เปิด List
                                listContainerStyle={s.CustomListSuggest}        // Custom List
                                inputContainerStyle={s.inputContainer}          //Custom Input
                                renderItem={({plantName, plantScience}) => (
                                    <CommonList
                                        onPress={() => this.ToDetail(plantName)}
                                        style={s.labelListSuggest}
                                        labelTH={plantName}
                                        labelEN={plantScience}
                                    />
                                )}
                            />
                        </View>
                        {this.state.InputIsEmpty ?
                            null : <TouchableOpacity onPress={() => this.BtnClear()} style={s.btnClear}>
                                        <Icon name={'close'} size={22} style={{color: 'red'}}/>
                                   </TouchableOpacity>
                        }
                        {this.state.ShowLogoTitle ?
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => this.NavToDetail()} style={s.buttonSearch}>
                                    <Icon name={'search'} size={22} />
                                    <Text style={s.labelBtn}>{'ค้นหา'}</Text>
                                </TouchableOpacity>
                            </View> : null
                        }
                    </View>
                </View>
                </Content>
            </Container>
        );
    }
}

HomeScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.openDrawer()} iconName={'bars'} titlePage={'หน้าหลัก'} />
});

const s = StyleSheet.create({
    container: {
        backgroundColor: '#FEF9E7'
    },
    viewImage: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 30
    },
    thumbnail: {
        height: 300,
        width: 300,
        borderRadius: 100
    },
    titlePage: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    labelTitlePage: {
        fontSize: 25,
        fontWeight: '400'
    },
    inputFormAll: {
        flexDirection: 'row'
    },
    SizeInputIncrease: {
        marginLeft: 15,
        width: '69.5%'
    },
    SizeInputDecrease: {
        marginLeft: 15,
        width: '60%'
    },
    SizeInputMinimum : {
        marginLeft: 15,
        width: '80%'
    },
    SizeInputMaximum : {
        marginLeft: 15,
        width: '90%'
    },
    inputAutoCP: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: 'white',
        fontSize: 18,
        paddingLeft: 10,
        borderWidth: 0
    },
    labelListSuggest: {
        marginLeft: 10,
        marginBottom: 5,
        width: 300
    },
    buttonSearch: {
        height: 50,
        width: 85,
        backgroundColor: '#F4D03F',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 0,
        borderLeftWidth: 0
    },
    labelBtn: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 2
    },
    CustomListSuggest: {
        height: 190,
        width: 320,
        paddingLeft: -10,
    },
    inputContainer: {
        borderWidth: 0
    },
    btnClear: {
        height:50,
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
        NET : state.CheckDevice.InternetIsConnect,         // ตรวจสอบ Internet
        DataSource : state.DataHomeScreen.DataSource,
        Search : state.DataHomeScreen.Search,
        CheckData : state.DataHomeScreen.CheckDataSource
    }),
    (dispatch) => ({
        FetchDataHomePage: (value) => {dispatch({type: "CALL_DATA_HOMEPAGE_LIKE", payload: value})},
        FetchCheckDataHomePage: (value) => {dispatch({type: "CALL_DATA_HOMEPAGE_IS", payload: value})},
        SetValueSearchHomePage: (value) => {dispatch({type: "SET_VALUE_HOME_SEARCH", payload: value})},
        SetValueCheckInDatabaseHomePage : (value) => {dispatch({type: "CHECK_DATA_LIST_HOMEPAGE", payload: value})}
    })
)(HomeScreen);
