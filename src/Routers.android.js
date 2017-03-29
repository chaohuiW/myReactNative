'use strict';
import React, { Component } from 'react';
import { BackAndroid, Navigator } from 'react-native';

var Home = require('./view/home/home');//首页

var _navigator = null;

BackAndroid.addEventListener('hardwareBackPress', function() {
    if(_navigator == null){
    return false;
    }
    if(_navigator.getCurrentRoutes().length === 1){
    return false;
    }
    _navigator.pop();
    return true;
});

var Routers = React.createClass({
    renderScene: function(route, navigator) {
        //console.info("当前路由：", navigator.getCurrentRoutes());
        _navigator = navigator;
        switch(route.id){
            case 'JumpToHomePage':{
                return (
                    <Home nav={navigator} title={'首页'}/>
                );
            }
            // case 'BananasJumpToPage':{
            //     return (
            //         <BananasJumpToPage parms={route.params} nav={navigator} />
            //     );
            // }
        }
    },
    render: function() {
        return (
            <Navigator
                initialRoute = {{id: 'JumpToHomePage'}}
                configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                renderScene={this.renderScene}
                />
        );
    },
});

module.exports = Routers;
