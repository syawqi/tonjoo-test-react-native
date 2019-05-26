import React, {Component} from 'react';
import {View} from 'react-native';
import {Spinner} from 'native-base';
import {main} from "../assets/styles/main";

class loading extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ main.toMiddleCenter }>
                <Spinner/>
            </View>
        )
    }
}

export default loading
