import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { View, StyleSheet } from 'react-native';
import ShowLabelDetail from '../../components/ShowLabelDetail';
import Loading from "../../../../common/components/Loading";
import CommonText from "../../../../common/components/CommonText";

class DetailTree extends Component {
    constructor (props) {
        super(props);
        this.state = {
            extraction: null
        }
    }

    componentDidMount(){
        if(this.props.DataSource == null){
            setTimeout(() => {this.get();}, 50);
        }else {
            this.get()
        }
    }

    get = () => {
        let getExtraction = [];

        try {
            this.props.DataSource.map(function (item) {
                return getExtraction.push(' '+item.extractionName);
            });
        }catch (e) {
            alert("พบความผิดพลาด กรุณาลองใหม่อีกครั้ง")
        }
        this.setState({extraction: getExtraction});
    };

    render() {
        if(this.props.DataSource == null){
            return  <Loading />
        }

        return (
            <Container style={styles.container}>
                <Content>
                    <View style={styles.titleNamePlant}>
                        <CommonText text={this.props.DataSource[0].plantName} size={25} textTitle={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"รหัสพรรณไม้"} result={this.props.DataSource[0].plantID} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ชื่อพื้นเมือง"} result={this.props.DataSource[0].plantName} />
                        <ShowLabelDetail title={"ชื่อวิทยาศาสตร์"} result={this.props.DataSource[0].plantScience} />
                        <ShowLabelDetail title={"ชื่อวงศ์"} result={this.props.DataSource[0].plantFamilyName} />
                        <ShowLabelDetail title={"ชื่อสามัญ"} result={this.props.DataSource[0].plantCommonname} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ประเภทพรรณไม้"} result={this.props.DataSource[0].plantSpecies} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"การกระจายพันธุ์"} result={this.props.DataSource[0].plantDistribution} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"การขยายพรรณไม้"} result={this.state.extraction} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ประโยชน์ในการรักษา"} result={this.props.DataSource[0].plantbenefit} />
                        <ShowLabelDetail title={"ประโยชน์อื่น"} result={this.props.DataSource[0].plantbenefity} />
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
    },
    titleNamePlant: {
        width: '100%',
        height: 30,
        marginTop: 20,
        alignItems: 'center'
    }
});

export default connect(
    (state) => ({
        DataSource: state.DataDetailScreen.DataSource
    }), null
)(DetailTree);
