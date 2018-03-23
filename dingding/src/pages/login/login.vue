<template>

  <div class="wrapper b-white">
    <div class="login-model">
       <div class="login-top">
          <div class="log"><img src="/static/img/log-icon.png" height="168" width="197"></div>
          <span>大管家循环系统 </span>
      </div>
      <!-- 登录模块 -->
      <div class="login-lump mb-model">
        <div class="login-form">
         <div class="mb form-group">
            <img src="/static/img/user-icon.png" height="52" width="52">
            <input type="text" class="bule-boder-bottom" name="" placeholder="请输入用户名">
         </div>
         <div class="form-group">
             <img src="/static/img/pasword-icon.png" height="52" width="53">
            <input type="text" class="bule-boder-bottom" name="" placeholder="请输入密码">
         </div>
      </div>
      <div class="login-operation">
            <button class="btn btn-blue mb" @click="login" > 登录 </button>
            <button class="btn" @click="jump"> 注册账号 </button>
        </div>
      </div>  
    </div>

     <!-- 版权 -->
     <p class="Copyright">Copyright © 2016金科物业服务集团有限公司</p>
  </div>
</template>
<script>
  export default {
    name: 'login',
    methods:{
      login(){
         this.$router.push('home')
      },
      jump (){
        this.$router.push('register')
      }
    }
  }
</script>

<style scoped>
 
  .login-model{
      top: 2.5rem;
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
    padding: 0.8rem;
    border: 0.02rem solid #36a9fc;
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
