import React from "react";
import { TouchableOpacity, View, Text } from 'react-native';
import { Thumbnail } from 'native-base';
import PropTypes from 'prop-types';
import icons from "../../../common/IconRequire";
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
                        <Thumbnail source={icons[this.props.icons]} />
                    </View>
                    <View
                        style={
                            {
                                marginLeft: 10, marginTop: 5, borderLeftWidth: 0.5, borderLeftColor: 'gray', paddingLeft: 10
                            }
                        }>
                        <CommonText text={this.props.labelTreeNameTH} size={16} weight={'600'} style={{marginLeft: 5}}  />
                        <CommonText text={this.props.labelTreeNameEN} size={16} style={{marginLeft: 5, width: '80%'}} lines={1}/>
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
    icons: PropTypes.string
};

ListItem.defaultProps = {
    labelTreeNameTH: "",
    labelTreeNameEN: "",
    onPressItem: null,
    icons: ""
};

export default ListItem;
