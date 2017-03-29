import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//var httpMethod = require('../../network/dataServer');//网络层
//var dataStorage = require('../../dataStorage/dataStorage');//数据存储
var styles = StyleSheet.create({
    headNav: {
        height: 44,
        justifyContent: 'center',
        borderBottomColor: '#eaeaea',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    arrow: {
        fontSize: 25,
        color: '#31b1ff',
        marginLeft: 15
    },
    text: {
        color: '#31b1ff',
        fontSize: 17,
        position: 'absolute',
        left: 40,
        right: 40,
        top: 10,
        textAlign: 'center'
    }
})
class HeadNav extends React.Component {
    constructor(props){
        super();
        this.state = {

        }
        this._onReturnClick = this._onReturnClick.bind(this);
    }
    componentDidMount(){
        /*if(this.props.isAtProductList){
            function aSuccessFunc(responses){
                if(responses.state == 'S'){
                    this.isReceiveMenuData = true;//正确接收到了菜单数据
                    this.receiveMenuData = responses.data;//正确接收到菜单数据
                }else if(responses.state == 'F'){
                    alert('出错了');
                }
            }
            //获取数据列表;
            httpMethod.httpRequest("GET", "prod/screen", null ,aSuccessFunc.bind(this));
        }*/
    }
    _onReturnClick(){//返回点击
        this.props.nav.pop();
    }
    //shouldComponentUpdate(){return false}
  render() {
    return (
        <View style={styles.headNav}>
            <Ionicons name='ios-arrow-back' style={styles.arrow} onPress={()=>{this._onReturnClick()}}/>
            <Text style={styles.text}>{decodeURI(this.props.title)}</Text>
        </View>
    )
  }
}
module.exports = HeadNav;
