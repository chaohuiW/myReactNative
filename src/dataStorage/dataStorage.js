import {AsyncStorage} from 'react-native';
var dataStorage = {
    setItem: function(keyName,keyValue,callback){
        //AsyncStorage 存储
        AsyncStorage.setItem(keyName,keyValue,function(err){
            //错误处理
            if (!err) {
                //存储完成
                callback&&callback(true);
            }
            if (err) {
                //存储出错
                callback&&callback(false);
            }
        });
    },
    getItem: function(keyName,callback){
        AsyncStorage.getItem(keyName,function(err,result){
            //错误处理
            if (!err) {
                //数据读取成功
                callback&&callback(result);
            }
            if (err) {
                //数据读取失败
                callback&&callback(false);
            }
        });
    },
    removeItem: function(keyName,callback){
        var res = null;
        AsyncStorage.removeItem(keyName,function(err) {
            if (!err) {
                //数据移除成功
                callback&&callback(true);
            }
            if(err){
                //数据移除失败
                callback&&callback(false);
            }
        });
        return res;
    },
    clear: function(callback){
        AsyncStorage.clear(function(err) {
            if (!err) {
                //数据清除成功
                callback&&callback(true);
            }
            if(err){
                //数据清除失败
                callback&&callback(false);
            }
        });
    },
    getAllKeys: function(callback){
        AsyncStorage.getAllKeys(function(err,keys){
            //存储的keys
            if(!err){
                callback&&callback(keys);
            }
            if (err) {
                //存储取数据出错 ，给用户提示错误信息。
                callback&&callback(false);
            }
        });
    },
    saveCurrentTime: function(timer,callback){
        var saveValidTime = new Date().getTime() + timer*24*60*60*1000;//存储的有效时间
        var thisKeyValue = saveValidTime.toString();
        this.setItem('currentTime',thisKeyValue,callback);
    },
    checkIsInvalid: function(callback){
        var currentTime = new Date().getTime() - 1*60*60*1000;//失效时间向前推1个小时
        this.getItem('currentTime',function(res){
            if(!res){//读取不到currentTime 数据
                callback&&callback(false);
                return;
            }
            if(res&&(currentTime >= res)){//已失效删除所有数据
                this.clear(callback(false));
            }else{
                callback&&callback(true);
            }
        }.bind(this));
    },
    setMoreItems: function(keyValueObj,callback){//输入多个键值对对象 存入
        var saveItemsSum = 0;
        var itemsInex = 0;
        function successFn(res){
            if(res){
                saveItemsSum ++;
                if(saveItemsSum == itemsInex){//说明存储完毕
                    callback&&callback(true);
                }
            }
        }
        for(var pre in keyValueObj){
            itemsInex++;
            this.setItem(pre, keyValueObj[pre], successFn);
        }
    }
}
module.exports = dataStorage;
