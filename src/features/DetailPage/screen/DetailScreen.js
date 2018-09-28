import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Text, Tab, Tabs, TabHeading, Icon } from 'native-base';
import {BackHandler, NetInfo } from 'react-native';
import HeaderForm from "../../../common/components/HeaderForm";
import CheckInternet from "../../../common/components/CheckNET";
import Detail from './tab/DetailTree';
import Appearance from './tab/Appearance';
import Location from './tab/Location';
import NoInternetScreen from  '../../../common/components/NoInternetScreen';
import Loading from '../../../common/components/Loading';
import imagesRequire from "../../../common/ImagesRequire";

class DetailScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: null,
            name: null,
            science: null,
            familyName: null,
            commonName: null,
            species: null,
            distribution: null,
            extraction: null,
            benefit: null,
            benefity: null,
            stem: null,
            leaf: null,
            flower: null,
            round: null,
            seed: null,
            imgAll: []
        }
    }

    componentDidMount(){
        const { back, Tree } = this.props.navigation.state.params;
        console.log(back);
        this.props.SetValue(Tree);
        this.props.FetchData();
        setTimeout(() => {if(this.state.seed == null){this.get();}}, 1000);
        NetInfo.isConnected.addEventListener('connectionChange', CheckInternet); // ตรวจสอบ internet
        this.backHandler = BackHandler.addEventListener('hardwareBackPress',
            () => this.props.navigation.navigate(back));
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    get = () => {
        let getId = "", getName= "", getScience= "", getFamilyName= "", getCommonName= "", getSpecies= "",
            getDistribution= "", getExtraction= [], getBenefit= "", getBenefity= "", getStem = "", getLeaf = "",
            getFlower = "", getRound = "", getSeed = "", getImgStem = null, getImgLeaf = null, getImgFlower = null,
            getImgRound = null, getImgSeed = null;

        this.props.DataSource.map(function (item){
            return [
                getId = item.plantID,
                getName = item.plantName,
                getScience = item.plantScience,
                getFamilyName = item.plantFamilyName,
                getCommonName = item.plantCommonname,
                getSpecies = item.plantSpecies,
                getDistribution = item.plantDistribution,
                getExtraction.push(item.extractionName),
                getBenefit = item.plantbenefit,
                getBenefity = item.plantbenefity,
                getStem = item.plantStem,
                getLeaf = item.plantLeaf,
                getFlower = item.plantFlower,
                getRound = item.plantRound,
                getSeed = item.plantSeed,
                getImgStem = item.imageFileStem,
                getImgLeaf = item.imageFileLeaf,
                getImgFlower = item.imageFileFlower,
                getImgRound = item.imageFileRound,
                getImgSeed = item.imageFileSeed
            ];
        });
        this.setState({
            id: getId,
            name: getName,
            science: getScience,
            familyName: getFamilyName,
            commonName: getCommonName,
            species: getSpecies,
            distribution: getDistribution,
            extraction: getExtraction,
            benefit: getBenefit,
            benefity: getBenefity,
            stem: getStem,
            leaf: getLeaf,
            flower: getFlower,
            round: getRound,
            seed: getSeed
        });

        if(getImgStem != null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, imagesRequire[getImgStem]]
            }))
        }
        if(getImgLeaf != null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, imagesRequire[getImgLeaf]]
            }))
        }
        if(getImgFlower != null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, imagesRequire[getImgFlower]]
            }))
        }
        if(getImgRound != null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, imagesRequire[getImgRound]]
            }))
        }
        if(getImgSeed != null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, imagesRequire[getImgSeed]]
            }))
        }
        if(getImgStem == null && getImgLeaf == null && getImgFlower == null && getImgRound == null
            && getImgSeed == null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, imagesRequire["null"]]
            }))
        }
    };

    render() {
        if(this.props.NET == false){    // หากปิด Internet
            return <NoInternetScreen />     // แสดงหน้า Screen NoInternet
        }else if(this.props.CheckData == false){
            return  <Loading />
        }else if(this.state.seed == null){
            return  <Loading />
        }

        return (
            <Container>
                    <Tabs >
                        <Tab
                            heading={
                                <TabHeading style={{backgroundColor: "#196F3D"}}>
                                        <Icon name="camera" style={{marginLeft: 10}}/>
                                        <Text style={{fontSize: 16}}>{"รายละเอียด"}</Text>
                                </TabHeading>
                            }
                        >
                            <Detail
                                id={this.state.id}
                                name={this.state.name}
                                science={this.state.science}
                                familyName={this.state.familyName}
                                commonName={this.state.commonName}
                                species={this.state.species}
                                distribution={this.state.distribution}
                                extraction={this.state.extraction}
                                benefit={this.state.benefit}
                                benefity={this.state.benefity}
                            />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={{backgroundColor: "#196F3D"}}>
                                        <Icon name="camera" />
                                        <Text style={{fontSize: 16}}>{"ลักษณะ"}</Text>
                                </TabHeading>
                            }
                        >
                            <Appearance
                                stem={this.state.stem}
                                leaf={this.state.leaf}
                                flower={this.state.flower}
                                round={this.state.round}
                                seed={this.state.seed}
                                imgAll={this.state.imgAll}
                            />
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={{backgroundColor: "#196F3D"}}>
                                        <Icon name="apps" />
                                        <Text style={{fontSize: 16}}>{"สถานที่พบ"}</Text>
                                </TabHeading>
                            }
                        >
                            <Location
                                data={this.state.tabLocation}
                            />
                        </Tab>
                    </Tabs>
            </Container>
        );
    }
}

DetailScreen.navigationOptions = ({ navigation }) => ({
    header: <HeaderForm
        btn={() => navigation.goBack()}
        iconName={'arrow-left'}
        titlePage={'รายละเอียดพรรณไม้'}
    />

});

export default connect(
    (state) => ({
        NET : state.CheckDevice.InternetIsConnect,         // ตรวจสอบ Internet
        DataSource : state.DataDetailScreen.DataSource,
        Search : state.DataDetailScreen.Search
    }),
    (dispatch) => ({
        FetchData: (value) => {dispatch({type: "CALL_DATA_DETAIL", payload: value})},
        SetValue: (value) => {dispatch({type: "SET_VALUE_DETAIL", payload: value})}
    })
)(DetailScreen);
