<template>

  <div class="wrapper">
    <div class="">
      <!-- 注册 -->
      <div class="b-white">
         <div class="form-group boder-bottom">
            <label>原密码</label>
            <input type="text" class="" v-model="lastpwd" name="" placeholder="原密码">
         </div>
         <div class="form-group boder-bottom">
             <label>新密码</label>
            <input type="text" class="" v-model="newpwd" name="" placeholder="新密码">
         </div>
         <div class="form-group boder-bottom">
             <label>确认密码</label>
            <input type="text" class="" v-model="confpwd" name="" placeholder="确认密码">
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
       
        return{
            lastpwd:'',
            newpwd:'',
            confpwd:''
        }
      },
      created: function () {
          this.$setTitle('修改密码');
          let _self = this;
          /*请求数据*/
          // this.$api.post('/Appinterface/userInfo?',_self.params,function(data) {
          //    	console.log(data);
          //  })

      },
      methods: {
      
        back () {
            this.$router.go(-1);
        },
        getRegister (){
              var _self = this;
              const modal = weex.requireModule('modal');  
              if(_self.lastpwd.length < 1 || _self.newpwd.length < 1){  
                   _self.$api.toast('密码不能为空')
                  return;  
              }else if(_self.newpwd != _self.confpwd){  
                  _self.$api.toast('两次密码输入不一致')  
                  return;  
              };
              let params ={
                  userId: this.$storage.getItem('userId'),
                  sessionId: this.$storage.getItem('sessionId'),
                  lastpwd:_self.lastpwd,
                  newpwd:_self.newpwd
              }
              /*请求数据*/
              this.$api.post('/Appinterface/userLogin',params,function(data) {
                console.log(JSON.stringify(data));
              })
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
