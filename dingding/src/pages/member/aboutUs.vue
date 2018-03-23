<template>

  <div class="wrapper">
    <!-- 顶部导航栏 -->
    <div class="top-nav b-white  boder-bottom" >
        <div class="back" @click="back()"><img src="/static/img/back-icon.png" height="36" width="20"></div>
        <div class="top-title"><span>关于我们</span></div>
    </div>
    <div class="content b-white">
         <div class="aboutus-group boder-bottom">
              <div class="aboutus-icon"><img src="/static/img/log-icon.png" height="168" width="197"></div>
              <div class="aboutus-info">
                  <p>大管家续航系统</p>
                  <span>当前版本号2.2.2</span>
              </div>
         </div>
         <div class="contact"><span>联系管理中心:13883554007</span></div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'aboutUs',
    methods:{
      back (){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
 
  .aboutus-group{
     padding: 1.2rem 0;
     align-items: center;
  }

  .aboutus-icon{
    width: 1.97rem;
    height: 1.68rem;
  }

  .aboutus-info{
    padding-top: .4rem;
  }
  
  .aboutus-info p, .aboutus-info span{
    padding-top: .4rem;
    text-align: center;
  }
  
  .aboutus-info p {
    font-size: .6rem;
  }

  .aboutus-info span {
    font-size: .38rem;
  }

  .contact{
    padding: .4rem;
  }

  .contact span{
    text-align: center;
  }



</style>
