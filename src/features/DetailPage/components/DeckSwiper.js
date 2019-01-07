import React from "react";
import PropTypes from "prop-types";
import { DeckSwiper, Card, CardItem, Icon, View } from 'native-base';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import Loading from '../../../common/components/Loading';

const CommonDeckSwiper = (props) =>{
    return (
        <View style={styles.container}>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => this.deckSwiper._root.swipeLeft()} style={styles.button}>
                    <Icon name="arrow-back" />
                </TouchableOpacity>
            </View>
            <View style={styles.viewDeckSwiper}>
                <DeckSwiper
                    ref={(c) => this.deckSwiper = c}
                    dataSource={props.dataSource}
                    renderEmpty={() => renderEmpty()}
                    renderItem={(item) => renderItem(item)}
                />
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => this.deckSwiper._root.swipeRight()} style={styles.button}>
                    <Icon name="arrow-forward" />
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
                    <Image style={styles.image} source={item} />
                </CardItem>
            </Card>
        </View>
    )
};

CommonDeckSwiper.propTypes = {
    dataSource: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10
    },
    viewButton: {
        alignItems: "center",
        flexDirection: 'row',
        width: '12.5%',
        justifyContent: "center"
    },
    button: {
        borderRadius: 5,
        backgroundColor: '#fffcb8',
        width: '100%',
        height: '50%' ,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "center"
    },
    viewDeckSwiper: {
        height: 250,
        width: '75%',
        backgroundColor: "#F1C40F"
    },
    viewRenderCard: {
        alignItems: "center"
    },
    renderCardEmpty: {
        height: 240,
        width: 240,
        alignItems: "center"
    },
    renderCard: {
        height: 240,
        flex: 1,
        alignItems: "center"
    },
    image: {
        height: 240,
        width: 240
    }
});

export default CommonDeckSwiper;
