import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, View } from 'native-base';
import { StyleSheet } from 'react-native';
import ShowLabelDetail from '../../components/ShowLabelDetail';
import CommonDeckSwiper from  '../../components/DeckSwiper';
import Loading from "../../../../common/components/Loading";
import CommonText from "../../../../common/components/CommonText";
import imagesRequire from "../../../../common/ImagesRequire";

class Appearance  extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: null,
            stem: null,
            leaf: null,
            flower: null,
            round: null,
            seed: null,
            imgAll: []
        }
    }

    componentDidMount(){
        setTimeout(() => {this.get();}, 500);
    }

    get = () => {
        let getName = "", getStem = "", getLeaf = "", getFlower = "", getRound = "", getSeed = "", getImgStem = null,
            getImgLeaf = null, getImgFlower = null, getImgRound = null, getImgSeed = null;

        this.props.DataSource.map(function (item){
            return [
                getName = item.plantName,
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
            name: getName,
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
        if(this.state.seed == null){
            return  <Loading />
        }

        return (
            <Container >
                <Content style={styles.container}>
                    <View style={{width: '100%', height: 30, marginTop: 20, alignItems: 'center'}}>
                        <CommonText text={this.state.name} size={25} textTitle={true} />
                    </View>
                    <CommonDeckSwiper dataSource={this.state.imgAll} />
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะลำต้น"} result={this.state.stem} newLine={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะใบ"} result={this.state.leaf} newLine={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะดอก"} result={this.state.flower} newLine={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะผล"} result={this.state.round} newLine={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะเมล็ด"} result={this.state.seed} newLine={true} />
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
)(Appearance);
