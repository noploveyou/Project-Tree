import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "native-base";
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
                    <CommonText
                        text={this.props.labelEN}
                        size={14}
                        weight={'400'}
                        color={'gray'}
                        style={{top: -5}}
                    />
                </TouchableOpacity>
            </View>

        );
    }
}

export default CommonList;
