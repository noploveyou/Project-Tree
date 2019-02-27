import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet } from 'react-native';
import CommonText from "../../../common/components/CommonText";

const ShowLabelDetail = (props) => {
    return (
        <View style={[styles.container, props.singleLine ? styles.singleLine : styles.multiLine ]}>
            <CommonText text={props.title} style={styles.label} weight={"500"} />
            {
                props.haveScienceName ?
                    <View style={props.singleLineScienceName ? styles.scienceSingleLine : styles.multiLine}>
                        <CommonText
                            text={props.result == null ? `      -` : `        `+props.result}
                            style={[styles.label, {fontStyle: 'italic'}]}
                            color={"#196F3D"}
                        />
                        <CommonText
                            text={props.scienceName == null ? `` : props.scienceName}
                            style={[styles.label]}
                            color={"#196F3D"}
                        />
                    </View>
                    :
                    <CommonText
                        text={props.result == null ? `      -` : `        `+props.result}
                        style={styles.label}
                        color={"#196F3D"}
                    />
            }

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
    singleLine: PropTypes.bool,
    style: Text.propTypes.style,
    haveScienceName: PropTypes.bool,
    scienceName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    singleLineScienceName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.bool
    ]),
};

ShowLabelDetail.defaultProps = {
    result: " any text ",
    singleLine: false,
    style: null,
    scienceName: null,
    haveScienceName: false,
    singleLineScienceName: true
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
        marginLeft: 10,
        alignItems: "flex-start"
    },
    singleLine: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    multiLine: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    scienceSingleLine: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
});

export default ShowLabelDetail;
