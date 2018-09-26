import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { View, StyleSheet } from 'react-native';
import ShowLabelDetail from '../../components/ShowLabelDetail';
import Loading from "../../../../common/components/Loading";

class DetailTree extends Component {
    render() {
        if(this.props.id == null){
            <Loading />
        }

        return (
            <Container style={styles.container}>
                <Content>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"รหัสพรรณไม้"} result={this.props.id} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ชื่อพื้นเมือง"} result={this.props.name} />
                        <ShowLabelDetail title={"ชื่อวิทยาศาสตร์"} result={this.props.science} />
                        <ShowLabelDetail title={"ชื่อวงศ์"} result={this.props.familyName} />
                        <ShowLabelDetail title={"ชื่อสามัญ"} result={this.props.commonName} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ประเภทพรรณไม้"} result={this.props.species} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"การกระจายพันธุ์"} result={this.props.distribution} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"การขยายพรรณไม้"} result={this.props.extraction} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ประโยชน์ในการรักษา"} result={this.props.benefit} />
                        <ShowLabelDetail title={"ประโยชน์อื่น"} result={this.props.benefity} />
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
        Search: state.DataDetailScreen.Search,
        CheckData: state.DataDetailScreen.CheckData
    }), null
)(DetailTree);
