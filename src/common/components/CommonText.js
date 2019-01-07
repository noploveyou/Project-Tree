import React from "react";
import { Text } from 'react-native';
import PropTypes from "prop-types";

const CommonText = (props) => {
    return (
        <Text
            style={props.textTitle ?
                [{fontSize: 20, color: props.color, fontWeight: "bold"}, props.style]
                :
                [{fontSize: props.size, color: props.color, fontWeight: props.weight}, props.style]
            }
            >
            {props.text}
        </Text>
    );
};

CommonText.propTypes = {
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    weight: PropTypes.string,
    style: Text.propTypes.style,
    textTitle: PropTypes.bool
};

CommonText.defaultProps = {
    weight: 'normal',
    size: 16,
    color: "black",
    style: null,
    textTitle: false
};

export default CommonText;
