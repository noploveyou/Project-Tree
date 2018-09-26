import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, DeckSwiper, Card, CardItem, Icon, View } from 'native-base';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import ShowLabelDetail from '../../components/ShowLabelDetail';
import CommonDeckSwiper from  '../../components/DeckSwiper';

class Appearance  extends Component {
    render() {
        return (
            <Container >
                <Content style={styles.container}>
                    <CommonDeckSwiper dataSource={this.props.imgAll} />
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะลำต้น"} result={this.props.stem} newLine={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะใบ"} result={this.props.leaf} newLine={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะดอก"} result={this.props.flower} newLine={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะผล"} result={this.props.round} newLine={true} />
                    </View>
                    <View style={styles.background}>
                        <ShowLabelDetail title={"ลักษณะเมล็ด"} result={this.props.seed} newLine={true} />
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
)(Appearance);
