import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { View, StyleSheet } from 'react-native';
import TextShowDetail from '../../components/TextShowDetail';
import Loading from '../../../../common/components/Loading';

class DetailTree extends Component {
    componentDidMount(){
        setTimeout(() =>
        {if(this.state.extraction == null){
            this.get();
        }}
        , 500);

    }

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

    get = () => {
        let getId = "",
            getName= "",
            getScience= "",
            getFamilyName= "",
            getCommonName= "",
            getSpecies= "",
            getDistribution= "",
            getExtraction= [],
            getBenefit= "",
            getBenefity= "";
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
        //console.log(getData);
    };

    render() {
        if(this.props.CheckData == false){
            return(
                <Loading />
            )
        }else if(this.state.extraction == null){
            return(
                <Loading />
            )
        }

        return (
            <Container style={{backgroundColor: "#F1C40F"}}>
                <Content>
                        <View style={styles.zone}>
                            <TextShowDetail title={"รหัสพรรณไม้"} result={this.state.id} newLine={true}/>
                        </View>

                        <View style={styles.zoneMultiLine}>
                            <TextShowDetail title={"ชื่อพื้นเมือง"} result={this.state.name} newLine={true}/>
                            <TextShowDetail title={"ชื่อวิทยาศาสตร์"} result={this.state.science} newLine={true}
                                            style={{backgroundColor: "red"}}/>
                            <TextShowDetail title={"ชื่อวงศ์"} result={this.state.familyName} newLine={true}/>
                            <TextShowDetail title={"ชื่อสามัญ"} result={this.state.commonName} newLine={true}/>
                        </View>

                        <View style={styles.zoneMultiLine}>
                            <TextShowDetail title={"ประเภทพรรณไม้"} result={this.state.species} newLine={true}/>
                        </View>
                        <View style={styles.zoneMultiLine}>
                            <TextShowDetail title={"การกระจายพันธุ์"} result={this.state.distribution} newLine={true}/>
                        </View>
                        <View style={styles.zoneMultiLine}>
                            <TextShowDetail title={"การขยายพรรณไม้"} result={this.state.extraction} newLine={true}/>
                        </View>

                        <View style={styles.zoneMultiLine}>
                            <TextShowDetail title={"ประโยชน์ในการรักษา"} result={this.state.benefit} newLine={true}/>
                            <TextShowDetail title={"ประโยชน์อื่น"} result={this.state.benefity} newLine={true}/>
                        </View>
                    </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    zoneMultiLine: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10
    },
   zone: {
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
    }),null
)(DetailTree);
