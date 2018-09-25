import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet } from 'react-native';
import CommonText from "../../../common/components/CommonText";

const ShowLabelDetail = (props) => {
    return (
        <View style={[styles.container, props.newLine ? styles.multiLine : styles.singleLine]}>
            <CommonText text={props.title} style={styles.label} weight={"500"} />
            <CommonText
                text={props.result == null ? `      -` : `        `+props.result}
                style={styles.label}
                color={"#196F3D"}
            />
        </View>
    );
};

ShowLabelDetail.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    result: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.array
    ]),
    newLine: PropTypes.bool,
    style: Text.propTypes.style
};

ShowLabelDetail.defaultProps = {
    result: " any text ",
    newLine: false,
    style: null
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    icon: {
        marginTop: 5
    },
    label: {
        marginTop: 5,
        alignItems: "flex-start"
    },
    singleLine: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    multiLine: {
        flexDirection: "column",
        justifyContent: "flex-start"
    }
});

export default ShowLabelDetail;
