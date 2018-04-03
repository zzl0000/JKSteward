<template>

  <div class="wrapper">
    <!-- 顶部导航栏 -->
    <div class="top-nav b-white mb box-shadow" >
        <div class="back" @click="back"><img src="/static/img/back-icon.png" height="36" width="20"></div>
        <div class="top-title"><span>注册</span></div>
    </div>
    <div class="">
      <!-- 注册 -->
      <div class="login-lump b-white">
         <div class="form-group boder-bottom">
            <label>手机号码</label>
            <input type="text" class="" name="" v-model="loginAcct" placeholder="请输入你的手机号码">
         </div>
         <div class="form-group boder-bottom">
             <label>密码</label>
            <input type="text" class="" name="" v-model="password" placeholder="请输入密码">
         </div>
         <div class="form-group boder-bottom">
             <label>确认密码</label>
            <input type="text" class="" name="" v-model="qzPassword"  placeholder="确认密码">
         </div>
         <div class="form-group boder-bottom">
             <label>姓名</label>
            <input type="text" class="" name="" v-model="nickName" placeholder="请输入你的姓名">
         </div>
         <div class="form-group boder-bottom" @click="jump('selectItem')">
             <label>所属项目</label>
             <input type="text" readonly="readonly" v-model="organId" class="" name="" placeholder="请选择">
         </div>
         <div class="form-group boder-bottom" @click="jump('selectSector')">
             <label>所属部门</label>
             <input type="text" readonly="readonly" v-model="scenesID" class="" name="" placeholder="请选择">
         </div>
         <div class="form-group boder-bottom">
             <label>岗位</label>
            <input type="text" class="" name="" v-model="fax" placeholder="请输入你的岗位">
         </div>

      </div> 
      <div class="register-operation mb-model">
            <button class="btn btn-blue " @click="getRegister"> 立即注册 </button>
       </div> 
    </div>
  </div>
</template>
<script>

  export default {
    name: 'register',
    data () {
      return {
        msg: 'test message',
        loginAcct: '',
        password: '',
        qzPassword:'',
        nickName: '',
        organId: '',
        scenesID: '',
        fax:''
      }
    },
    created: function () {
        let _self = this;
        console.log(this.$storage.getItem('organId'));
        _self.scenesID = this.$storage.getItem('organId');
        _self.organId =  this.$storage.getItem('scenesID');
    },
    methods: {
      back () {
          this.$router.push('/')
      },
      getRegister (){
              const modal = weex.requireModule('modal');
              /*if(this.loginAcct.length < 13){ 
                  // this.$refs.toast.$emit('toast','请输入手机号');  
                  return;  
              }else if(this.userPassword.length < 1){  
                  // this.$refs.toast.$emit('toast','请输入密码');  
                  return;  
              }*/
              let params = {
                  loginAcct:this.loginAcct,
                  password:this.password,
                  nickName:this.nickName,
                  organId:this.organId,
                  scenesID:this.scenesID,
                  fax:this.fax,
                  thirdParty:1
                };

            /*请求数据*/
              this.$api.post('/Appinterface/register?',params,function(res) {
                console.log(res);
                if(res.errcode == 1){
                    //保存userID
                   _self.$storage.setItem('userId',res.userId);
                    //保存sessionId
                   _self.$storage.setItem('sessionId',res.sessionId);
                   modal.toast({
                        message: res.msg,
                        duration: 2
                    },function(){
                        this.$router.push('/');
                    })
                }else{
                  _self.$api.toast(res.errmsg); 
                }
              })
      },
      jump  (url) {
          this.$router.push(url)
      }
    }
  }

</script>

<style scoped>

  .form-group{
    padding:.25rem;
    display: flex;
    flex-flow: initial;
  }
  .form-group label{
      width: 25%;
      padding: 0.15rem;
      text-align: left;
      color: #333333;
  }
  .form-group input{
      width: 75%;
      text-align: right;
      align-self: flex-end;
      font-size: .40rem;
  }

  .register-operation{
    top: 3rem;
  }

</style>
