<template>

  <div class="wrapper">
    <div class="">
      <!-- 注册 -->
      <div class="b-white">
         <div class="form-group boder-bottom">
            <label>原密码</label>
            <input type="password" class="" v-model="params.lastpwd" name="" placeholder="原密码">
         </div>
         <div class="form-group boder-bottom">
             <label>新密码</label>
            <input type="password" class="" v-model="params.newpwd" name="" placeholder="新密码">
         </div>
         <div class="form-group boder-bottom">
             <label>确认密码</label>
            <input type="password" class="" v-model="params.confpwd" name="" placeholder="确认密码">
         </div>
      </div> 
      <div class="register-operation mb-model">
            <button class="btn btn-blue " @click="getRegister"> 确认修改 </button>
       </div> 
    </div>
  </div>
</template>
<script>
  export default {
      name:'changePassword',
      data (){
          let params ={
              confpwd:'',
              lastpwd:'',
              newpwd:'',
              sessionId: this.$storage.getItem('sessionId'),
              thirdParty:1,
              userId: this.$storage.getItem('userId')
          }
        return{
            params : params,
        }
      },
      created: function () {
          this.$setTitle('修改密码');
          let _self = this;
      },
      methods: {
      
        back () {
            this.$router.go(-1);
        },
        getRegister (){
              var _self = this;
              if(_self.params.lastpwd.length < 1 || _self.params.newpwd.length < 1){
                   _self.$api.toast('密码不能为空')
                  return;  
              }else if(_self.params.newpwd != _self.params.confpwd){
                  _self.$api.toast('两次密码输入不一致')  
                  return;  
              }
              else if(_self.params.newpwd.length < 6 || _self.params.confpwd.length < 6){
                  _self.$api.toast('密码长度不够,最少6位')
                  return;
              };

                _self.headersData = {
                    signature:_self.setmd5(_self.$storage.getItem('signature')),
                    uid:_self.$storage.getItem('userId'),
                }
              /*请求数据*/
              this.$api.post('/cruise/Appinterface/updatePwd',_self.params, _self.headersData,function(rs) {
                  _self.$toast(rs.errmsg);
                  if(rs.errcode == 1){
                      setTimeout(function () {
                          _self.$router.push('/');
                      },3000)
                  }

              })
        },
          setmd5(key){
              var _self = this;
              var md5 = _self.$crypto.createHash("md5");
              md5.update(_self.$urlEncode(_self.params).substring(1) + '&key='+ key +''); //这个是 排序加密
              var d= md5.digest('hex').toUpperCase();
              console.log(d);
              return d;
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
