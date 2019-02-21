import React, { Component } from 'react';
import { connect,  } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Content, View } from 'native-base';
import ShowLabelDetail from '../../components/ShowLabelDetail';
import CommonDeckSwiper from  '../../components/DeckSwiper';
import Loading from "../../../../common/components/Loading";
import CommonText from "../../../../common/components/CommonText";
import imagesRequire from "../../../../common/ImagesRequire";

class Appearance  extends Component {
    constructor (props) {
        super(props);
        this.state = {
            imgAll: []
        }
    }

    componentDidMount(){
        setTimeout(() => {this.get();}, 0);
    }

    get = () => {
        let getImgStem = null, getImgLeaf = null, getImgFlower = null, getImgRound = null, getImgSeed = null,
            getImgAll = null;

        try {
            this.props.DataSource.map(function (item){
                return [
                    getImgStem = item.imageFileStem,
                    getImgLeaf = item.imageFileLeaf,
                    getImgFlower = item.imageFileFlower,
                    getImgRound = item.imageFileRound,
                    getImgSeed = item.imageFileSeed,
                    getImgAll = item.imageFileAll
                ];
            });
        }catch (e) {
            setTimeout(() => {this.get();}, 50);
        }

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
        if(getImgAll != null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, imagesRequire[getImgAll]]
            }))
        }
        if(getImgStem == null && getImgLeaf == null && getImgFlower == null && getImgRound == null
            && getImgSeed == null && getImgAll == null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, imagesRequire["null"]]
            }))
        }
    };
    render() {
        if(this.state.imgAll == null){
            return  <Loading />
        }

        return (
            <Container >
                <Content style={styles.container}>
                    <View style={styles.viewPicture}>
                        <CommonText text={this.props.DataSource[0].plantName} size={25} textTitle={true} />
                    </View>
                    <CommonDeckSwiper dataSource={this.state.imgAll} />
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะลำต้น"} result={this.props.DataSource[0].plantStem} newLine={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะใบ"} result={this.props.DataSource[0].plantLeaf} newLine={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะดอก"} result={this.props.DataSource[0].plantFlower} newLine={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะผล"} result={this.props.DataSource[0].plantRound} newLine={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะเมล็ด"} result={this.props.DataSource[0].plantSeed} newLine={true} />
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F1C40F",
        flex: 1
    },
    background: {
        margin: 10,
        backgroundColor: "#FEF9E7",
        borderRadius: 10
    },
    viewPicture: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center'
    }
});

export default connect(
    (state) => ({
        DataSource: state.DataDetailScreen.DataSource,
        Search: state.DataDetailScreen.Search
    }), null
)(Appearance);
