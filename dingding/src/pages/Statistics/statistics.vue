<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <!-- <div class="top-nav mb b-white " > 
	    	<div class="back" @click="back()"><img src="/static/img/back-icon.png" height="36" width="20"></div>
	            	<div class="top-title"><span>自查统计</span></div>
	    </div> -->
	    <div class="content mt"></div>

	<FooterComponent></FooterComponent>
	</div>
</template>
<script>
	import FooterComponent from '../../components/footercomponent.vue';
	export default {
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
