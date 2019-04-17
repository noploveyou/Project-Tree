import React from "react";
import { TouchableOpacity, View, Text } from 'react-native';
import { Thumbnail } from 'native-base';
import PropTypes from 'prop-types';
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
                        <Thumbnail
                            source={{uri: 'http://www.bellcenter-pnru.com/admin10/project/buildForMobile/iconsMark/'
                                +this.props.icons}}
                        />
                    </View>
                    <View style={{marginLeft: 10, marginTop: 5, width: '70%'}}>
                        <CommonText text={this.props.labelTreeNameTH} size={18} weight={'600'} />
                        <View style={{flexDirection: 'row'}}>
                            <CommonText
                                text={this.props.labelTreeNameEN}
                                size={16}
                                lines={1}
                                style={{fontStyle: 'italic'}}
                                color={'gray'}
                            />
                            <CommonText
                                lines={1}
                                text={this.props.plantDiscoverer == null ? '':' '+this.props.plantDiscoverer}
                                size={16}
                                color={'gray'}
                                style={{width: '30%'}}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

ListItem.propTypes = {
    labelTreeNameTH: PropTypes.string,
    labelTreeNameEN: PropTypes.string,
    plantDiscoverer: PropTypes.string,
    onPressItem: PropTypes.func,
    icons: PropTypes.string
};

ListItem.defaultProps = {
    labelTreeNameTH: "",
    labelTreeNameEN: "",
    onPressItem: null,
    icons: "otherImage/NoImage.png",
    plantDiscoverer: ''
};

export default ListItem;
