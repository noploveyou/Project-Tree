import React from "react";
import { TouchableOpacity, View, Text } from 'react-native';
import { Thumbnail } from 'native-base';
import PropTypes from 'prop-types';
import images from "../../../common/ImagesRequire";
import CommonText from "../../../common/components/CommonText";

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
                        width: '97%',
                        height: 80,
                        borderRadius: 10,
                        backgroundColor: 'white',
                        marginBottom: 8,
                        left: 5,
                        right: 5,
                        top: 5
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
                    <View style={{marginLeft: 10, marginBottom: 10}}>
                        <Thumbnail source={images[this.props.image]} />
                    </View>
                    <View
                        style={
                            {
                                marginLeft: 10, marginTop: 5
                            }
                        }>
                        <CommonText text={this.props.labelTreeNameTH} size={16} weight={'600'} />
                        <CommonText text={this.props.labelTreeNameEN} size={16} />
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
