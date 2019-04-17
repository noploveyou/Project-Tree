import React from "react";
import PropTypes from "prop-types";
import { DeckSwiper, Card, CardItem, View } from 'native-base';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import Loading from '../../../common/components/Loading';
import CommonText from "../../../common/components/CommonText";
import Icon from "react-native-vector-icons/FontAwesome";

const CommonDeckSwiper = (props) =>{
    return (
        <View style={styles.container}>
            <View style={styles.viewDeckSwiper}>
                <DeckSwiper
                    ref={(c) => this.deckSwiper = c}
                    dataSource={props.LocalImageSource}
                    renderEmpty={() => renderEmpty()}
                    renderItem={(item) => renderItem(item)}
                />
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => this.deckSwiper._root.swipeRight()} style={styles.button}>
                    <CommonText text={'ภาพถัดไป'} size={20} weight={'bold'} color={'white'} style={{marginRight: 10}}/>
                    <Icon name="caret-right" size={30} color={'white'}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const renderEmpty = () => {
    return(
        <View style={styles.viewRenderCard}>
            <Card style={styles.renderCardEmpty}>
                <Loading />
            </Card>
        </View>
    )
};

const renderItem = (item) => {
    return(
        <View style={styles.viewRenderCard}>
            <Card style={styles.renderCard}>
                <CardItem cardBody>
                    <Image
                        style={styles.image}
                        source={{uri: 'http://www.bellcenter-pnru.com/admin10/project/buildForMobile/'+item}}
                    />
                </CardItem>
            </Card>
        </View>
    )
};

CommonDeckSwiper.propTypes = {
    LocalImageSource: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        marginVertical: 80
    },
    viewButton: {
        alignItems: "center",
        flexDirection: 'row',
        width: 200,
        height: 50,
        justifyContent: "center"
    },
    button: {
        borderRadius: 50,
        backgroundColor: '#196F3D',
        width: 250,
        height: 50,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "center",
        marginTop: 10
    },
    viewDeckSwiper: {
        height: 300,
        width: 250,
        backgroundColor: "#F1C40F"
    },
    viewRenderCard: {
        alignItems: "center"
    },
    renderCardEmpty: {
        height: 300,
        width: 250,
        alignItems: "center"
    },
    renderCard: {
        height: 300,
        width: 250,
        alignItems: "center"
    },
    image: {
        height: 300,
        width: 250,
    }
});

export default CommonDeckSwiper;
