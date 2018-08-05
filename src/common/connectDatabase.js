import React, { Component } from 'react';
import store from './initialStore';

    let CallData = {
        Test: function (value){
            fetch('http://192.168.1.193/DBCheck.php', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        plantName: value
                    })
                }
            )
                .then((response) => response.json())
                .then((responseJson) => {
                    store.dispatch({
                        type: 'AddDataSource',
                        payload : responseJson
                    })

                })
                .catch(function (error) {
                    // handle error
                    /*console.log(error);*/
                });

        }
    };

module.exports = CallData;

/*
export default connect(
    (state) => ({
        Search: state.Search,
        DataSource: state.DataSource
    }),
    (dispatch) => ({
        Add: (value) => {dispatch({type: "AddDataSource", payload: value})}
    })
);*/
