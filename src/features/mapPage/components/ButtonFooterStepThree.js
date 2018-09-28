import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ButtonFooterStepThree = (props) => {
    return (
        props.ButtonFooter ?
            <View style={styles.viewContainer}>
                {props.DisableButtonDetail ?
                    null :
                <TouchableOpacity
                    onPress={props.buttonDetail}
                    style={styles.ButtonsGroup}
                >
                    <Icon name={'md-paper'} size={28} color={'#196F3D'} style={styles.iconButtonsGroup}/>
                    <Text style={styles.labelButtonGroup}> {`รายละเอียด`} </Text>
                </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={props.buttonNavigate}
                    style={styles.ButtonsGroup}
                >
                    <Icon name={'md-navigate'} size={28} color={'#196F3D'} style={styles.iconButtonsGroup}/>
                    <Text style={styles.labelButtonGroup}> {`เส้นทาง`} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.buttonNavigateNear}
                    style={styles.ButtonsGroup}
                >
                    <MaterialIcons name={'near-me'} size={28} color={'#196F3D'} style={styles.iconButtonsGroup}/>
                    <Text style={styles.labelButtonGroup}> {`เส้นทางใกล้ที่สุด`} </Text>
                </TouchableOpacity>
            </View> :
            <View>
                <TouchableOpacity
                    onPress={props.buttonNearOutFooter}
                    style={styles.buttonNear}
                >
                    <MaterialIcons name={'near-me'} size={28} color={'#FEF9E7'} style={styles.iconButtonNear}/>
                    <Text style={styles.labelButtonNear}> {`เส้นทางใกล้ที่สุด`} </Text>
                </TouchableOpacity>
            </View>
    );

};

ButtonFooterStepThree.propTypes = {
    ButtonFooter: PropTypes.bool,
    DisableButtonDetail: PropTypes.bool,
    buttonDetail: PropTypes.func,
    buttonNavigate: PropTypes.func,
    buttonNavigateNear: PropTypes.func,
    buttonNearOutFooter: PropTypes.func
};

ButtonFooterStepThree.defaultProps = {
    DisableButtonDetail: false,
    buttonDetail: null,
    buttonNavigate: null,
    buttonNavigateNear: null,
    buttonNearOutFooter: null,
    ButtonFooter: true
};

const styles = StyleSheet.create({
    viewContainer: {
        flexDirection: 'row',
        backgroundColor: '#196F3D',
        justifyContent: 'space-around'
    },
    ButtonsGroup: {
        width: 90,
        height: 60,
        borderRadius: 5,
        borderColor: '#FEF9E7',
        borderWidth: 1,
        backgroundColor: '#FEF9E7',
        flexDirection: 'column',
        marginBottom: 10,
        marginLeft: 5,
        marginTop: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    iconButtonsGroup: {
        marginTop: 10,
    },
    labelButtonGroup: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 0,
        marginBottom: 7,
        marginTop: 0,
        color: '#196F3D',
    },
    buttonNear: {
        width: '65%',
        height: 60,
        borderRadius: 5,
        borderColor: '#F1C40F',
        borderWidth: 1,
        backgroundColor: '#196F3D',
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems:'center'
    },
    iconButtonNear: {
        marginTop: 5,
    },
    labelButtonNear: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 7,
        marginTop: 8,
        color: '#FEF9E7'
    }
});

export default ButtonFooterStepThree;
