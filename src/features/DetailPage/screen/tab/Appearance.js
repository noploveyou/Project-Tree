import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import {StyleSheet, View} from 'react-native';
import TextShowDetail from '../../components/TextShowDetail';
import Loading from '../../../../common/components/Loading';

class Appearance  extends Component {
    render() {
        if(this.props.CheckData == false){
            return(
                <Loading />
            )
        }

        return (
            <Container style={{backgroundColor: "#F1C40F"}}>
                {
                    this.props.DataSource.map(function (item,index) {
                        return  <Content key={index}>
                            <View style={styles.zone}>
                                <TextShowDetail title={"ลักษณะลำต้น"} result={item.plantID} newLine={false} />
                            </View>
                            <View style={styles.zoneMultiLine}>
                                <TextShowDetail title={"ลักษณะใบไม้"} result={item.plantSpecies} newLine={true} />
                            </View>
                            <View style={styles.zoneMultiLine}>
                                <TextShowDetail title={"ลักษณะดอก"} result={item.plantDistribution} newLine={true} />
                            </View>
                            <View style={styles.zoneMultiLine}>
                                <TextShowDetail title={"ลักษณะผล"} result={item.extractionName} newLine={true} />
                            </View>
                            <View style={styles.zoneMultiLine}>
                                <TextShowDetail title={"ลักษณะเมล็ด"} result={item.plantbenefit} newLine={true} />
                            </View>
                        </Content>
                    })
                }
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
)(Appearance);