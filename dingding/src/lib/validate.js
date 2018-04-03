/**
 * validate.js 1.0
 * type  需要验证的类型
 * value 需要验证的参数
 *	
 **/

function validate(type, value) {
    let errmsg;
    let isValidate = true;
    let rexPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
        //rexPassword = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
        rexEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (type == mobile) {
        if (value == '') {
            errmsg = '请输入手机号';
            isValidate = false;
        } else if (!rexPhone.test(value)){
        	errmsg = '手机号码格式错误';
        	isValidate = false;
        }
    };

    if (type == password) {
    	if (value == '') {
            errmsg = '密码不能为空';
            isValidate = false;
        } else if (value.length < 6){
        	errmsg = '密码长度不够,最少6位';
        	isValidate = false;
        }
    };

    if (type == Email) {

    };

    if(isValidate == false){
    	return errmsg;
    }else{
    	return isValidate;
    }    
}




export default {
    isValidate: function(type, value) {
        return validate(type, value);
    }
}