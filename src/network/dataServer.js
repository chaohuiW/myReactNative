'use strict';
const apiVersion = "v2.5";
const devName = "webApp";
const api_key = "-htSTbM3vcT1LNwyB2ksi7hizEK1ZHZw";
const api_secret = "yvV8OUJ7wDp9iComvfmwrjPHpT4ZrS7M";
/*
后端接口环境切换
  1 ---- 开发环境
  2 ---- 测试环境
  3 ---- 预生产环境
  4 ---- 生产环境
 */
const SERVER_FLAG = 4;


const CONST_SERVER_DOMAIN = '';//后端接口路径
const Base_WebUrl = '';//appH5访问路径
switch(SERVER_FLAG){
    case 1:{
        CONST_SERVER_DOMAIN = 'http://192.168.0.200:8085/site-admin-' + apiVersion + '/site/';
        Base_WebUrl = 'http://192.168.0.200/appH5/view/';
        break;
    }
    case 2:{
        CONST_SERVER_DOMAIN = 'https://testapp.huanlvjinfu.cn/site-admin-' + apiVersion + '/site/';
        Base_WebUrl = 'https://testwebchat.huanlvjinfu.cn/appH5/view/';
        break;
    }
    case 3:{
        CONST_SERVER_DOMAIN = 'https://preapp.huanlvjinfu.cn/site-admin-' + apiVersion + '/site/';
        Base_WebUrl = 'https://prewebchat.huanlvjinfu.cn/appH5/view/';
        break;
    }
    case 4:{
        CONST_SERVER_DOMAIN = 'https://app.huanlvjinfu.cn/site-admin-' + apiVersion + '/site/';
        Base_WebUrl = 'https://webchat.huanlvjinfu.cn/appH5-' + apiVersion + '/view/';
        break;
    }
}
//const CONST_SERVER_DOMAIN = 'http://192.168.0.80:8080/site/';//本地联调使用

function http(ajaxType, aPostPath, aRequestData, aSuccessFunc, maskLoadingObj, aErrorFunc, aTimeOut){
    var url = CONST_SERVER_DOMAIN + aPostPath;
    var fetchOptions = null;
    if(ajaxType.toUpperCase() == 'POST'){
        var form = new FormData();
        for(var i in aRequestData){
            form.append(i, aRequestData[i]);
        }
        fetchOptions = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              //表单
              'Content-Type': 'multipart/form-data'
            },
            body: form
        };
    }else{
        if (aRequestData) {
            let paramsArray = [];
            //拼接参数
            Object.keys(aRequestData).forEach(key => paramsArray.push(key + '=' + aRequestData[key]));
            if(url.search(/\?/) === -1){
                url += '?' + paramsArray.join('&');
            }else{
                url += '&' + paramsArray.join('&');
            }
        }
        fetchOptions = {
            method: 'GET'
        };
    }
    fetch(url, fetchOptions)
        .then((response) => response.json()) //把response转为json
        .then((responseData) => { // 上面的转好的json
            //alert('请求成功');
            console.log(responseData);
            aSuccessFunc(responseData);
        })
        .catch((error)=> {
            maskLoadingObj&&maskLoadingObj.setState({isShow: false});
            aErrorFunc&&aErrorFunc();
            console.log(error);
            alert(error);
        })
}
function httpSession(ajaxType, aPostPath, aRequestData, aSuccessFunc, hl_validate_session, maskLoadingObj, aErrorFunc, aTimeOut){
    var url = CONST_SERVER_DOMAIN + aPostPath;
    var fetchOptions = null;

    if(ajaxType.toUpperCase() == 'POST'){
        var form = new FormData();
        for(var i in aRequestData){
            form.append(i, aRequestData[i]);
        }
        fetchOptions = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              //表单
              'Content-Type': 'multipart/form-data',
              'hl_validate_session': hl_validate_session
            },
            body: form
        };
    }else{
        if (aRequestData) {
            let paramsArray = [];
            //拼接参数
            Object.keys(aRequestData).forEach(key => paramsArray.push(key + '=' + aRequestData[key]));
            if(url.search(/\?/) === -1){
                url += '?' + paramsArray.join('&');
            }else{
                url += '&' + paramsArray.join('&');
            }
        }
        fetchOptions = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              //表单
              'Content-Type': 'application/x-www-form-urlencoded',
              'hl_validate_session': hl_validate_session
            },
        };
    }
    fetch(url, fetchOptions)
        .then((response) => response.json()) //把response转为json
        .then((responseData) => { // 上面的转好的json
            console.log(responseData);
            aSuccessFunc&&aSuccessFunc(responseData);
        })
        .catch((error)=> {
            maskLoadingObj&&maskLoadingObj.setState({isShow: false});
            aErrorFunc&&aErrorFunc();
            console.log(error);
            alert(error);
        })
}
//function getCookie(key) {
//  var arr1 = document.cookie.split('; ');
//  for (var i=0; i<arr1.length; i++) {
//      var arr2 = arr1[i].split('=');
//      if ( arr2[0] == key ) {
//          return decodeURI(arr2[1]);
//      }
//  }
//}
var httpMethod = {
    "apiVersion": apiVersion,
    "devName": devName,
    "api_key": api_key,
    "api_secret": api_secret,
    "CONST_SERVER_DOMAIN": CONST_SERVER_DOMAIN,
    "Base_WebUrl": Base_WebUrl,
    "httpRequest" : http,
    "httpSessionRequest" : httpSession
}
module.exports = httpMethod;
