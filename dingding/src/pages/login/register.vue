<template>

  <div class="wrapper">

    <div class="" v-if="isComplete == 0">
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
         <div class="form-group boder-bottom" @click="jump(1)">
             <label>所属项目</label>
             <input type="text" readonly="readonly" v-model="organName" class="" name="" placeholder="请选择">
         </div>
         <div class="form-group boder-bottom" @click="jump(2)">
             <label>所属部门</label>
             <input type="text" readonly="readonly" v-model="scenesName" class="" name="" placeholder="请选择">
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
    <selectItem v-else-if="isComplete == 1"  v-on:fn="hidePanel"></selectItem>
    <selectSector v-else-if="isComplete == 2"  v-on:fn="hidePanel"></selectSector>
  </div>
</template>
<script>
  import selectItem from '../../components/selectItem.vue';
  import selectSector from '../../components/selectSector.vue';
  export default {
    name: 'register',
    data () {
      return {
        isComplete:0,
        msg: 'test message',
        loginAcct: '',
        password: '',
        qzPassword:'',
        nickName: '',
        organId: '',
        organName: '',
        scenesID: '',
        scenesName: '',
        fax:''
      }
    },
    created: function () {
        this.$setTitle('注册');
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
              this.$api.post('/Appinterface/register?',params,'',function(res) {
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
      jump (key) {
          this.isComplete = key;         
      },
      hidePanel(rs){
        console.log(rs);
          this.isComplete = 0;  
          if(rs != ''){
              if(rs.key == 1){
                  this.organId = rs.id;
                  this.organName = rs.text;
              }
              if(rs.key == 2){
                 this.scenesID = rs.id;
                 this.scenesName = rs.text;
              }          
                        
          } 
      }
    },
    components:{
        selectItem,
        selectSector
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
