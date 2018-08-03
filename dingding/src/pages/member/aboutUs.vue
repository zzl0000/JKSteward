<template>

  <div class="wrapper">
    <div class="content b-white">
         <div class="aboutus-group boder-bottom">
              <div class="aboutus-icon"><img src="../../../static/img/log-icon.png" height="168" width="197"></div>
              <div class="aboutus-info">
                  <p>大管家巡航系统</p>
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
    created: function () {
          this.$setTitle('关于我们');
          let _self = this;
          /*请求数据*/
          // this.$api.post('/Appinterface/userInfo?',_self.params,function(data) {
          //    	console.log(data);
          //  })

      },
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
