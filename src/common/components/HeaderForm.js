import React from "react";
import { Body, Button, Header, Left, Title } from "native-base";
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from "react-native";

const HeaderForm = (props) => {
        return (
            <Header style={{backgroundColor:'#196F3D'}}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#196F3D"
                />
                <Left>
                    <Button transparent onPress={props.btn}>
                        <Icon name={props.iconName} size={30} color={'white'} />
                    </Button>
                </Left>
                <Body >
                    <Title style={{fontSize:20, fontWeight:'400', left: -10}}> {props.titlePage} </Title>
                </Body>

            </Header>
        );
};

HeaderForm.propTypes = {
    btn: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
    titlePage: PropTypes.string.isRequired
};

export default HeaderForm;
