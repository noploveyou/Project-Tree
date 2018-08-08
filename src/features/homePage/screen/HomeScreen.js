import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Thumbnail, Text, Content } from 'native-base';
import { View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Keyboard } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import CommonList from '../../../common/components/CommonList';
import HeaderForm from '../../../common/components/HeaderForm';
import Icon from "react-native-vector-icons/FontAwesome";

class HomeScreen extends Component {
    componentDidMount() {   // เริ่มต้นการทำงาน
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow); // เมื่อเปิด keyboard
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide); // เมื่อปิด keyboard
    }

    constructor(props) {
        super(props);
        this.state = {
            ValueInput: "", // ค่าในช่อง Input
            ListResults: true, // true = ปิด แถบรายชื่อ
            SetScrollView: false,  // การเลื่อนหน้าใน content /false = ปิด
            ShowLogoTitle: true,     // เปิด - ปิด Logo true = แสดง
            ShowButtonClear: false,     // แสดง - ซ่อน ปุ่ม x (ลบ) false = ซ่อน
            ValueInputEmpty: true,    // ค่าใน Input ว่าง  true = ว่าง
        };
    }

    _keyboardDidShow = () => {
        this.setState({ShowLogoTitle: false}); // เมื่อเปิด keyboard
        this.SearchDataSource(this.state.ValueInput); // ใช้ฟังก์ชัน เช็คค่าว่าง
    };

    _keyboardDidHide = () => {
        this.setState({ShowLogoTitle: true, ListResults: true}); // เมื่อปิด keyboard ปิด ListResults
    };

    SearchDataSource (value) {
        this.props.CheckValue(false);
        this.setState({ValueInput: value});
        if(value === "") {  // เช็คค่าใน Input เป็นว่างใช่หรือไม่
            this.setState({ListResults: true, ShowButtonClear: false});
            this.setState({ValueInputEmpty: true});

        }else{
            this.setState({ListResults: false, ShowButtonClear: true});
            this.setState({ValueInputEmpty: false});
            this.props.SetValueSearchAction(value);
            this.props.SearchLikeAction();  // where Like
            this.props.SearchIsAction();    // เช็คค่า true, false จาก ฐานข้อมูล

        }
    }

    NavToDetail (){ // ปุ่มค้นหา
                if((this.props.CheckData)){
                    this.props.navigation.navigate('Detail');

                }else {
                    /*this.props.CheckValue(false);*/
                }
                //console.log(" Object " + JSON.stringify(this.props.CheckData))

    }

    BtnClear(){ // ปุ่ม x (ลบ)
        this.props.CheckValue(false);
        this.setState({ValueInput: "", ListResults: true, ShowButtonClear: false, ValueInputEmpty: true});
    }

    render() {
        return (
            <Container style={s.container}>
                <Content scrollEnabled={false} /* ปิดการเลื่อนหน้า */>
                <KeyboardAvoidingView behavior="position" enabled={false}  /* คีย์บอร์ดไม่บังช่อง Input */>
                <View style={s.viewAll}>
                    {this.state.ShowLogoTitle ?
                        <View style={s.viewImage}>
                            <Thumbnail
                                style={s.thumbnail}
                                source={require('../../../../public/assets/images/Tree.jpg')}
                            />
                        </View> : null
                    }
                    <View style={this.state.ShowLogoTitle ? s.titlePageOn: s.titlePageOff}>
                        <Text style={s.labelTitlePage}>{'ค้นหาพรรณไม้'}</Text>
                    </View>
                    <View style={s.inputFormAll}>
                        <View style={this.state.ValueInputEmpty ? s.viewAutoCPHideBtnClr : s.viewAutoCPShowBtnClr}>
                            <Autocomplete underlineColorAndroid='transparent'
                                style={s.inputAutoCP}
                                autoCapitalize="none"
                                autoCorrect={true}
                                data={this.props.DataSource}

                                defaultValue={this.state.ValueInput}
                                onChangeText={(value) => this.SearchDataSource(value)}

                                onSubmitEditing={(value) => this.NavToDetail(value)}
                                placeholder="กรุณากรอกชื่อพรรณไม้"
                                placeholderTextColor='gray'
                                hideResults={this.state.ListResults}
                                listContainerStyle={s.CustomListSuggest}
                                inputContainerStyle={s.inputContainer}
                                renderItem={({plantName}) => (
                                    <CommonList
                                        onPress={() =>
                                            [this.setState({ValueInputEmpty: false,ListResults: true,ValueInput:plantName}),
                                                this.props.SetValueSearchAction(plantName),this.props.CheckValue(true)]}
                                        style={s.labelListSuggest}
                                        label={plantName}
                                    />
                                )}
                            />
                        </View>
                        {this.state.ValueInputEmpty ?
                            null : <TouchableOpacity
                                        onPress={() => this.BtnClear()}
                                        style={s.btnClear}>
                                        <Icon name={'close'} size={18}  />
                                   </TouchableOpacity>
                        }
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                                onPress={() => this.NavToDetail()}
                                style={s.btnSearch}>
                                <Icon name={'search'} size={22} />
                                <Text style={s.labelBtn}>{'ค้นหา'}</Text>
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

HomeScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm
        btn={() => navigation.openDrawer()}
        iconName={'bars'}
        titlePage={'หน้าหลัก'}
    />

});

const s = StyleSheet.create({
    container: {
        backgroundColor: '#FEF9E7'
    },
    viewAll: {
        flex: 1
    },
    viewImage: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30
    },
    thumbnail: {
        height: 300,
        width: 300,
        borderRadius: 100
    },
    titlePageOn: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 10
    },
    titlePageOff: {
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
    viewAutoCPHideBtnClr: {
        marginLeft: 15,
        width:'69.5%'
    },
    viewAutoCPShowBtnClr: {
        marginLeft: 15,
        width:'60%'
    },
    inputAutoCP: {
        borderRadius: 0,
        backgroundColor: 'white',
        fontSize: 18,
        paddingLeft: 10,
        borderWidth: 0
    },
    labelListSuggest: {
        marginLeft: 5,
        marginBottom: 5
    },
    btnSearch: {
        height: 50,
        width: 80,
        backgroundColor: '#F4D03F',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 0,
        borderWidth: 0,
        borderLeftWidth: 0
    },
    labelBtn: {
        fontSize: 18,
        fontWeight: '400',
        marginLeft: 2
    },
    CustomListSuggest: {
        height: 190,
        width: 260,
        paddingLeft: -10,
    },
    inputContainer: {
        borderWidth: 0
    },
    btnClear: {
        height:50,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10
    }

});

export default connect(
    (state) => ({
        DataSource : state.DataHomeScreen.DataSource,
        Search : state.DataHomeScreen.Search,
        CheckData : state.DataHomeScreen.CheckDataSource
    }),
    (dispatch) => ({
        SearchLikeAction: (value) => {dispatch({type: "CALL_DATA_LIKE", payload: value})},
        SearchIsAction: (value) => {dispatch({type: "CALL_DATA_IS", payload: value})},
        SetValueSearchAction: (value) => {dispatch({type: "SET_VALUE_SEARCH", payload: value})},
        CheckValue : (value) => {dispatch({type: "CHECK_DATA", payload: value})}
    })
)(HomeScreen);
