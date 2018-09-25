import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Button, DeckSwiper, Card, CardItem, Icon, View  } from 'native-base';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import ShowLabelDetail from '../../components/ShowLabelDetail';
import Loading from '../../../../common/components/Loading';
import images from "../../../../common/Images";

class Appearance  extends Component {
    constructor (props) {
        super(props);
        this.state = {
            stem: null,
            leaf: null,
            flower: null,
            round: null,
            seed: null,
            imgAll: []
        }
    }

    componentDidMount(){
        setTimeout(() => {if(this.state.extraction == null){this.get();}}, 0);
    }

    get = () => {
        let getStem = "", getLeaf = "", getFlower = "", getRound = "", getSeed = "",
            getImgStem = null, getImgLeaf = null, getImgFlower = null, getImgRound = null, getImgSeed = null;
        this.props.DataSource.map(function (item){
            return [
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
            stem: getStem,
            leaf: getLeaf,
            flower: getFlower,
            round: getRound,
            seed: getSeed
        });

        if(getImgStem != null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, images[getImgStem]]
            }))
        }
        if(getImgLeaf != null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, images[getImgLeaf]]
            }))
        }
        if(getImgFlower != null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, images[getImgFlower]]
            }))
        }
        if(getImgRound != null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, images[getImgRound]]
            }))
        }
        if(getImgSeed != null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, images[getImgSeed]]
            }))
        }

        if(getImgStem == null && getImgLeaf == null && getImgFlower == null && getImgRound == null
            && getImgSeed == null){
            this.setState(prevState => ({
                imgAll: [...prevState.imgAll, images["null"]]
            }))
        }
    };

    render() {
        if(this.props.CheckData == false){
            return  <Loading />
        }else if(this.state.seed == null){
            return  <Loading />
        }
            //console.log(this.state.imgAll);
        return (
            <Container >
                <Content style={styles.container}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
                        <View style={{alignItems: "center",flexDirection: 'row',width: '12.5%',justifyContent: "center"}}>
                            <TouchableOpacity
                                onPress={() => this.deckSwiper._root.swipeLeft()}
                                style={{borderRadius: 5,backgroundColor: '#fffcb8', width: '100%',height: '50%' , alignItems: "center",flexDirection: 'row',justifyContent: "center"}}
                            >
                                <Icon name="arrow-back" />
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 250, width: '75%', backgroundColor: "#F1C40F"}}>
                            <DeckSwiper
                                ref={(c) => this.deckSwiper = c}
                                dataSource={this.state.imgAll}
                                renderEmpty={() =>
                                    <View style={{alignItems: "center"}}>
                                        <Card style={{ height: 240, width: 240, alignItems: "center"}}>
                                            <Loading />
                                        </Card>
                                    </View>
                                }
                                renderItem={item =>
                                    <View style={{alignItems: "center"}}>
                                        <Card style={{ height: 240, flex: 1, alignItems: "center"}}>
                                            <CardItem cardBody>
                                                <Image style={{ height: 240, width: 240 }} source={item} />
                                            </CardItem>
                                        </Card>
                                    </View>
                                }
                            />

                        </View>
                        <View style={{alignItems: "center",flexDirection: 'row',width: '12.5%',justifyContent: "center"}}>
                            <TouchableOpacity
                                onPress={() => this.deckSwiper._root.swipeRight()}
                                style={{borderRadius:5, backgroundColor: '#fffcb8', width: '100%', height: '50%', alignItems: "center",flexDirection: 'row',justifyContent: "center"}}
                            >
                                <Icon name="arrow-forward" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.zoneMultiLine}>
                        <ShowLabelDetail title={"ลักษณะลำต้น"} result={this.state.stem} newLine={true} />
                    </View>
                    <View style={styles.zoneMultiLine}>
                        <ShowLabelDetail title={"ลักษณะใบ"} result={this.state.leaf} newLine={true} />
                    </View>
                    <View style={styles.zoneMultiLine}>
                        <ShowLabelDetail title={"ลักษณะดอก"} result={this.state.flower} newLine={true} />
                    </View>
                    <View style={styles.zoneMultiLine}>
                        <ShowLabelDetail title={"ลักษณะผล"} result={this.state.round} newLine={true} />
                    </View>
                    <View style={styles.zoneMultiLine}>
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
)(Appearance);
