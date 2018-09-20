import React from "react";
import { TouchableOpacity, View, Text } from 'react-native';
import { Thumbnail } from 'native-base';
import PropTypes from 'prop-types';
import images from "../../../common/IconRequire";

class ListItem extends React.PureComponent {
    _onPress = () => {
        // Do someting
        this.props.onPressItem(this.props.labelTreeNameTH);
        //alert(this.props.TreeName);
    };

    render() {
        return (
            <TouchableOpacity
                onPress={this._onPress}
                style={
                    {
                        width: '100%',
                        height: 70,
                        backgroundColor: 'yellow',
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: 'gray'
                    }
                }>
                <View
                    style={
                        {
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: 10
                        }
                    }>
                    <View>
                        <Thumbnail square source={images[this.props.image]} />
                    </View>
                    <View
                        style={
                            {
                                marginLeft: 10
                            }
                        }>
                        <Text style={{ color: 'black' }}>
                            {this.props.labelTreeNameTH}
                        </Text>
                        <Text style={{ color: 'black' }}>
                            {this.props.labelTreeNameEN}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

ListItem.propTypes = {
    labelTreeNameTH: PropTypes.string,
    labelTreeNameEN: PropTypes.string,
    onPressItem: PropTypes.func,
    image: PropTypes.string
};

ListItem.defaultProps = {
    labelTreeNameTH: "",
    labelTreeNameEN: "",
    onPressItem: null,
    image: ""
};

export default ListItem;
