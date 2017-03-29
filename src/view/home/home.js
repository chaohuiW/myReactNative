import React from 'react';
import {
    View,
    Text,
} from 'react-native';

let HeadNav = require('../../components/headNav/headNav');//headNav
class Home extends React.Component {
    render () {
        return (
            <View>
                <HeadNav title={this.props.title} nav={this.props.nav}/>
                <Text>Hello, Navigation!</Text>
            </View>
        );
    }
}

module.exports = Home;
