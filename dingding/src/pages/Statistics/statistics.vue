<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="content"></div>

	<FooterComponent></FooterComponent>
	</div>
</template>
<script>
	import FooterComponent from '../../components/footercomponent.vue';
	export default {
        created: function () {
            this.$setTitle('自查统计');
            let _self = this;
            /*请求数据*/
            // this.$api.post('/Appinterface/userInfo?',_self.params,function(data) {
            //    	console.log(data);
            //  })

        },
		methods: {
			back (){
				this.$router.push('/')
			}
   		 },
   		components:{
   			FooterComponent
   		} 
	}
</script>

<style>



</style>
