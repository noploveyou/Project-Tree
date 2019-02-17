import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Tab, Tabs, TabHeading } from 'native-base';
import { BackHandler, NetInfo} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderForm from "../../../common/components/HeaderForm";
import CheckInternet from "../../../common/components/CheckNET";
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import Detail from './tab/DetailTree';
import Appearance from './tab/Appearance';
import Location from './tab/Location';
import Loading from '../../../common/components/Loading';
import CommonText from '../../../common/components/CommonText';
import { NavigationActions, StackActions } from "react-navigation";

class DetailScreen extends Component {
    componentDidMount(){
        const { back, Tree } = this.props.navigation.state.params;
        this.props.SetValue(Tree);
        setTimeout(() => {this.props.FetchData();}, 200);
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate(back));
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this.props.Reset([]);
    }

    render() {
        if(this.props.NET == false){    // หากปิด Internet
            return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
        }else if(this.props.CheckData == false){
            return  <Loading />
        }
        const { back } = this.props.navigation.state.params;

        return (
            <Container>
                    <Tabs >
                        <Tab
                            heading={
                                <TabHeading style={{backgroundColor: "#196F3D"}}>
                                        <Icon name="pagelines" style={{marginRight: 5, marginTop: 3}} size={20} color={'white'}/>
                                        <CommonText text={'รายละเอียด'} size={16} color={'white'}  />
                                </TabHeading>
                            }
                        >
                            <Detail />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={{backgroundColor: "#196F3D"}}>
                                        <Icon name="envira" style={{marginRight: 5, marginTop: 3}} size={20} color={'white'}/>
                                    <CommonText text={'ลักษณะ'} size={16} color={'white'}  />
                                </TabHeading>
                            }
                        >
                            <Appearance />
                        </Tab>
                        {
                            back=="SelectedMap" ? null :
                                <Tab
                                    heading={
                                        <TabHeading style={{backgroundColor: "#196F3D"}}>
                                            <Icon name="map-marker" style={{marginRight: 5, marginTop: 3}} size={20} color={'white'}/>
                                            <CommonText text={'สถานที่พบ'} size={16} color={'white'}  />
                                        </TabHeading>
                                    }
                                >
                                    <Location />
                                </Tab>
                        }
                    </Tabs>
            </Container>
        );
    }
}

DetailScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm
        btn={() => navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: navigation.getParam('back'), params: { back: "SearchListMap" }})
                ],
            })
        )}
        iconName={'arrow-left'}
        titlePage={'รายละเอียดพรรณไม้'}
    />
});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,         // ตรวจสอบ Internet
        DataSource : state.DataDetailScreen.DataSource,
        Search : state.DataDetailScreen.Search,
        CheckData: state.DataDetailScreen.CheckData
    }),
    (dispatch) => ({
        FetchData: (value) => {dispatch({type: "CALL_DATA_DETAIL", payload: value})},
        SetValue: (value) => {dispatch({type: "SET_VALUE_DETAIL", payload: value})},
        Reset: (value) => {dispatch({type: "ADD_DATA_DETAIL", payload: value})}
    })
)(DetailScreen);
