import React, { Component } from 'react';
import { Container, Icon, Content, View, Input, Item } from 'native-base';
import { FlatList, BackHandler, NetInfo } from 'react-native';
import HeaderForm from '../../../common/components/HeaderForm';
import { connect } from "react-redux";
import ListItem from '../components/ListItem';
import Loading from '../../../common/components/Loading';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import CheckInternet from "../../../common/components/CheckNET";

class ListMapScreenStepTwo extends Component {
    componentDidMount(){
        this.props.FetchDataListMap();
        this.props.SetSearchListMap('');
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
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

     _onPressItem = (value) => {
         this.props.SetSearchListMap(value);
         this.props.navigation.navigate('SelectedMap');
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
        }

        if(this.state.isLoading){
            setTimeout(function(){
                return(
                    <Loading />
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

/*class MyListItem extends React.PureComponent {
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
}*/

ListMapScreenStepTwo.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm btn={() => navigation.goBack()} iconName={'arrow-left'} titlePage={'ค้นหาตำแหน่งพรรณไม้'} />
});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,
        DataList : state.DataMapScreen.DataListStepTwo      // ตรวจสอบว่า โหลดข้อมูลเสร็จหรือไม่
    }),
    (dispatch) => ({
        SetSearchListMap : (value) => {dispatch({type: "SET_VALUE_SEARCH_LIST_MAP", payload: value})},
        FetchDataListMap: (value) => {dispatch({type: "CALL_DATA_STEP_TWO", payload: value})}
    })
)(ListMapScreenStepTwo);