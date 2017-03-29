/*
 * react native 公共方法集合
 * 2016.11.24
 */
const commonMethod = {
    reg: /^1[1-9]\d{9}$/,
    md5seri: function(obj){
        var str = 'QSFETTUGBVNEREWR';
        for(var i in obj){
            str+= ';'+ i + ':' +obj[i];
        }
        return str;
    },
    checkEmail: function(str){//邮箱验证
        var re = /^\w+((-\w+)|(.\w+))\@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        if(re.test(str)) return true;
        return false;
    },
    checkTel: function(str){//检查固话
        var re = /^\d{2,5}-\d{7,8}$/;
        if(re.test(str)) return true;
        return false;
    },
    checkBankCard: function(str){//银行卡验证
        var re = /^\d{16,21}$/;
        if(re.test(str)) return true;
        return false;
    },
    checkCarNumber: function(str){//车牌号验证
        var reg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
        if(reg.test(str)){return true;}
        return false;
    },
    randomNum: function(num){//获取对应个数的随机数
        var str = "";
        for(var i = 0;i < num; i++){
            str += Math.floor(Math.random()*9);
        }
        return str;
    },
    checkPhone: function(usrMp){//手机号码格式验证
        if (usrMp == null || usrMp == ''){
            return '手机号码不能为空';
        }
        if (usrMp.length<11){
            return '请输入11位手机号码';
        }
        if(!this.reg.test(usrMp)){
            return '您所填写的手机号码有误';
        }
        return true;
    },
    //数字格式化方法;
    FormatMoney: function(s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        var t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    },
    checkIDCard: function(IDCardStr){
        if(!IDCardStr){
            return '身份证号不可为空';
        }
        if(!/^((\d{15})|(\d{18})|(\d{17}(\d|X)))$/.test(IDCardStr)){
            return '输入的身份证格式不正确';
        }
        return '';
    },
    IDCardEncryption(str){
        return str.substring(0, 6) + "********" + str.substring(str.length - 4);
    }
};
module.exports = commonMethod;
