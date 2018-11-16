import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "native-base";

class CommonList extends React.PureComponent {
    render() {
        //const textColor = this.props.selected ? "red" : "black";

        return (
            <View>
                <TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
                    <Text style={{fontSize: 17, fontWeight: "500"}}>
                        {this.props.labelTH}
                    </Text>
                    <Text style={{fontSize: 16, top: -5}}>
                        {this.props.labelEN}
                    </Text>
                </TouchableOpacity>
            </View>

        );
    }
}

export default CommonList;
