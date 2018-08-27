import React, { Component } from 'react';
import { Container, Icon, Content, Text, View, Input, Item } from 'native-base';
import { FlatList, ActivityIndicator, TouchableOpacity, BackHandler } from 'react-native';
import HeaderForm from '../../../common/components/HeaderForm';
import { connect } from "react-redux";

class ListMapScreenStepTwo extends Component {
    componentDidMount(){
        this.props.FetchDataListMap();
        this.props.SetSearchListMap('');
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate('Map'));     // เมื่อกดปุ่มย้อนกลับ (ของโทรศัพท์)
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this.props.SetSearchListMap('');
    }

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            selected: (new Map()),
            isLoading: true,
        };
    }

    _keyExtractor = (item) => item.plantID;

     _onPressItem = (TreeName) => {
         this.props.SetSearchListMap(TreeName);
         this.props.navigation.navigate('SelectedMap');
    };

    _renderItem = ({item}) => {
        return (
            <MyListItem
                id={item.plantID}
                selected={!!this.state.selected.get(item.plantID)}
                TreeName={item.plantName}
                TreeNameEN={item.plantScience}
                onPressItem={this._onPressItem}
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
        if(this.state.isLoading){
            setTimeout(function(){
                return(
                    <View style={{flex: 1, alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                        <View>
                            <ActivityIndicator size="large" color="green"/>
                            <Text style={{fontSize:30}}> กำลังโหลด กรุณารอสักครู่ </Text>
                        </View>
                    </View>
                )
            }, 3000);
        }
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

class MyListItem extends React.PureComponent {
    _onPress = () => {
        // Do someting
        this.props.onPressItem(this.props.TreeName);
        //alert(this.props.TreeName);

    };

    render() {
        const textColor = this.props.selected ? "red" : "black";
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={{borderBottomWidth:1}}>
                    <Text style={{ color: 'black' }}>
                        {this.props.TreeName}
                    </Text>
                    <Text style={{ color: 'black' }}>
                        {this.props.TreeNameEN}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

ListMapScreenStepTwo.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.goBack()} iconName={'arrow-left'} titlePage={'ค้นหาตำแหน่งพรรณไม้'} />
});

export default connect(
    (state) => ({
        DataList : state.DataMapScreen.DataListStepTwo      // ตรวจสอบว่า โหลดข้อมูลเสร็จหรือไม่
    }),
    (dispatch) => ({
        SetSearchListMap : (value) => {dispatch({type: "SET_VALUE_SEARCH_LIST_MAP", payload: value})},
        FetchDataListMap: (value) => {dispatch({type: "CALL_DATA_STEP_TWO", payload: value})},
    })
)(ListMapScreenStepTwo);