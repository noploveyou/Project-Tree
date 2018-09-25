import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { View, StyleSheet } from 'react-native';
import ShowLabelDetail from '../../components/ShowLabelDetail';
import Loading from '../../../../common/components/Loading';

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
            benefity: null
        }
    }

    componentDidMount(){
        setTimeout(() => {if(this.state.extraction == null){this.get();}}, 1000);
    }

    get = () => {
        let getId = "", getName= "", getScience= "", getFamilyName= "", getCommonName= "", getSpecies= "",
            getDistribution= "", getExtraction= [], getBenefit= "", getBenefity= "";
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
                getBenefity = item.plantbenefity
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
            benefity: getBenefity
            });
    };

    render() {
        if(this.props.CheckData == false){
            return  <Loading />
        }else if(this.state.extraction == null){
            return  <Loading />
        }

        return (
            <Container style={styles.container}>
                <Content>
                        <View style={styles.zoneSingleLine}>
                            <ShowLabelDetail title={"รหัสพรรณไม้"} result={this.state.id} newLine={true} />
                        </View>
                        <View style={styles.zoneMultiLine}>
                            <ShowLabelDetail title={"ชื่อพื้นเมือง"} result={this.state.name} newLine={true} />
                            <ShowLabelDetail title={"ชื่อวิทยาศาสตร์"} result={this.state.science} newLine={true} />
                            <ShowLabelDetail title={"ชื่อวงศ์"} result={this.state.familyName} newLine={true} />
                            <ShowLabelDetail title={"ชื่อสามัญ"} result={this.state.commonName} newLine={true} />
                        </View>
                        <View style={styles.zoneMultiLine}>
                            <ShowLabelDetail title={"ประเภทพรรณไม้"} result={this.state.species} newLine={true} />
                        </View>
                        <View style={styles.zoneMultiLine}>
                            <ShowLabelDetail title={"การกระจายพันธุ์"} result={this.state.distribution} newLine={true} />
                        </View>
                        <View style={styles.zoneMultiLine}>
                            <ShowLabelDetail title={"การขยายพรรณไม้"} result={this.state.extraction} newLine={true} />
                        </View>
                        <View style={styles.zoneMultiLine}>
                            <ShowLabelDetail title={"ประโยชน์ในการรักษา"} result={this.state.benefit} newLine={true} />
                            <ShowLabelDetail title={"ประโยชน์อื่น"} result={this.state.benefity} newLine={true} />
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
    zoneMultiLine: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10
    },
    zoneSingleLine: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10
    }
});

export default connect(
    (state) => ({
        DataSource: state.DataDetailScreen.DataSource,
        Search: state.DataDetailScreen.Search,
        CheckData: state.DataDetailScreen.CheckData
    }), null
)(DetailTree);
