<template>

  <div class="wrapper b-white login_item">
    <div class="login-model">
       <div class="login-top">
          <div class="log"><img src="../../../static/img/log-icon.png" height="168" width="197"></div>
          <span>大管家巡航系统 </span>
      </div>
      <!-- 登录模块 -->
      <div class="login-lump mb-model">
        <div class="login-form">
         <div class="mb form-group">
            <img src="../../../static/img/user-icon.png"  height="52" width="52">
            <input type="text" class="bule-boder-bottom" v-model="userNumber" name="" placeholder="请输入用户名">
         </div>
         <div class="form-group mt">
             <img src="../../../static/img/pasword-icon.png"   height="52" width="53">
             <input type="password" class="bule-boder-bottom"  v-model="userPassword" name="" placeholder="请输入密码">
         </div>
      </div>
      <div class="login-operation">
            <button class="btn btn-blue mb" @click="login" :disabled="isDisable" > 登录 </button>
            <button class="btn td-color" @click="jump" style="display: none"> 注册账号 </button>
        </div>
      </div>
    </div>
    <div :ref="'toast'" id="toast"></div>
     <!-- 版权 -->
     <p class="Copyright">Copyright © 2016金科物业服务集团有限公司</p>
  </div>
</template>
<script>


  export default {
    name: 'login',
    data (){
      return{
            isDisable:false,
            userNumber:this.$storage.getItem('userName') || '',
            userPassword:this.$storage.getItem('passWord') || ''
      }
    },
    methods:{

          login() {
              var _self = this;
              _self.isDisable = true;
               const modal = weex.requireModule('modal');
              if(this.userNumber.length < 1){
                   _self.$api.toast('请输入手机号');
                  _self.isDisable = false
                  return;
              }else if(this.userPassword.length < 1){
                  _self.$api.toast('请输入密码');
                  _self.isDisable = false
                  return;
              }
              // 缓存登录账号和密码
              _self.$storage.setItem('userName',this.userNumber);
              _self.$storage.setItem('passWord',this.userPassword);

              let params = {
                  userName:this.userNumber,
                  passWord:this.userPassword,
                  thirdParty:1
                };

            /*请求数据*/
              this.$api.post('/Appinterface/userLogin',params,'',function(res) {
                if(res.errcode == 1){

                    //保存userID
                   _self.$storage.setItem('userId',res.userId);
                    //保存sessionId
                   _self.$storage.setItem('sessionId',res.sessionId);
                    //保存
                   _self.$storage.setItem('projectId',res.data.organization2.orgCode);
                    _self.$storage.setItem('orgName',res.data.organization2.orgName);
                    _self.$storage.setItem('signature',_self.getmd5(_self.userNumber,_self.userPassword));
                    _self.$storage.setItem('signId', 'undefined');
                   modal.toast({
                        message: '登录成功',
                        duration: 1
                    });
                  setTimeout(function(){
                    _self.$router.push('home');
                  },2000)
                }else{
                    _self.isDisable = false;
                      modal.toast({
                        message: res.errmsg,
                        duration: 2
                    })
                }

              })
          },
          jump (){
            this.$router.push('register')
          },
          getmd5(key,pass){
                let _self = this;
                var a;
                let b = function(){
                    var c;
                    var md5 = _self.$crypto.createHash("md5"); // 密码加密
                    md5.update(pass);
                    var c = md5.digest('hex');
                    return c;
                }

               var md5 = _self.$crypto.createHash("md5");
               md5.update(key + b() +'jkwycruise'); //生成Key
               var a = md5.digest('hex');
               console.log(a);
               return a;

            }
      }
    }
</script>

<style scoped>
  .login_item{
        height: calc(100vh - .4rem);
      min-height: 15rem;
   }

  .login-model{
      top: 2.5rem;
      background: white;
  }
  .login-top{
     justify-content:center;
     align-items:center;
  }

  .log{
    width: 1.97rem;
    height: 1.68rem;

  }
  .log figure{
    width: 100%;
    height: 100%;
  }

  .login-top span{
    margin-top: 0.65rem;
  }
  .login-lump{
    top: 1rem;
  }

  .login-form{
    padding: 0.9rem 0.6rem;
    border: 1px solid #36a9fc;
    border-radius: 0.25rem;
  }

  .login-operation{
    top: 1rem;
  }
  .form-group{
    flex-flow: initial;
    overflow: hidden;
    justify-content: space-between;
  }
  .form-group figure{
     width: .52rem;
     height:.52rem;
     top: 0.12rem;
     align-self: flex-start;
  }
  .form-group input{
    align-self: flex-end;
    width: 90%;
    font-size: .36rem;
    letter-spacing:0.02rem;
    color: #454545;
  }

  input::-webkit-input-placeholder{
    color: #36a9fc;
  }


  /* Copyright */
  .Copyright{
    text-align: center !important;
    display: block;
    position: absolute;
    bottom: 0.8rem;
    width: 100%;
    font-size: 0.12rem;
    color: #888887;

  }
</style>