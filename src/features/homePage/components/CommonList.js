import React from "react";
import {Text, TouchableOpacity} from "react-native";
import { View } from "native-base";
import PropTypes from "prop-types";
import CommonText from "../../../common/components/CommonText";

class CommonList extends React.PureComponent {
    render() {
        //const textColor = this.props.selected ? "red" : "black";

        return (
            <View>
                <TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
                    <CommonText
                        text={this.props.labelTH}
                        size={17}
                        weight={'500'}
                    />
                    <View style={{flexDirection: 'row', top: -5}}>
                        <CommonText
                            text={this.props.labelEN}
                            lines={1}
                            size={14}
                            weight={'400'}
                            color={'gray'}
                            style={{fontStyle: 'italic'}}
                        />
                        <CommonText
                            text={this.props.labelDs == null ? "": ' '+this.props.labelDs}
                            lines={1}
                            size={14}
                            weight={'400'}
                            color={'gray'}
                            style={{width: '35%'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}

CommonList.propTypes = {
    labelTH: PropTypes.string,
    labelEN: PropTypes.string,
    labelDs: PropTypes.string,
};

CommonList.defaultProps = {
    labelDs: '',
};

export default CommonList;
