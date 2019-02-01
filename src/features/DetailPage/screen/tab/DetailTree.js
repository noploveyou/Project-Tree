import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import {View, StyleSheet, BackHandler} from 'react-native';
import ShowLabelDetail from '../../components/ShowLabelDetail';
import Loading from "../../../../common/components/Loading";
import CommonText from "../../../../common/components/CommonText";

class DetailTree extends Component {
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
            finished: false
        }
    }

    componentDidMount(){
        setTimeout(() => {this.get();}, 1200);
    }

    get = () => {
        let getId = "", getName = "", getScience = "", getFamilyName = "", getCommonName = "", getSpecies = "",
            getDistribution = "", getExtraction = [], getBenefit = "", getBenefity = "";

        this.props.DataSource.map(function (item) {
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
        });

        if (getId || getName || getScience || getFamilyName || getCommonName || getSpecies || getDistribution ||
            getExtraction != "") {
            this.setState({finished: true});
        }else {
            alert("กรุณาลองใหม่อีกครั้ง")
        }
    };

    render() {
        if(this.state.finished == false){
            return  <Loading />
        }

        return (
            <Container style={styles.container}>
                <Content>
                    <View style={{width: '100%', height: 30, marginTop: 20, alignItems: 'center'}}>
                        <CommonText text={this.state.name} size={25} textTitle={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"รหัสพรรณไม้"} result={this.state.id} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ชื่อพื้นเมือง"} result={this.state.name} />
                        <ShowLabelDetail title={"ชื่อวิทยาศาสตร์"} result={this.state.science} />
                        <ShowLabelDetail title={"ชื่อวงศ์"} result={this.state.familyName} />
                        <ShowLabelDetail title={"ชื่อสามัญ"} result={this.state.commonName} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ประเภทพรรณไม้"} result={this.state.species} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"การกระจายพันธุ์"} result={this.state.distribution} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"การขยายพรรณไม้"} result={this.state.extraction} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ประโยชน์ในการรักษา"} result={this.state.benefit} />
                        <ShowLabelDetail title={"ประโยชน์อื่น"} result={this.state.benefity} />
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F1C40F"
    },
    background: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10
    }
});

export default connect(
    (state) => ({
        DataSource: state.DataDetailScreen.DataSource,
        Search: state.DataDetailScreen.Search
    }), null
)(DetailTree);
