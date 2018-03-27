<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav mb b-white " > 
	    	<div class="back" @click="back()"><img src="/static/img/back-icon.png" height="36" width="20"></div>
        	<div class="top-title"><span>巡更提醒</span></div>
	    </div>

	</div>
</template>
<script>
	export default {
		name:'workbench',
		data () {
			let imgUrls =[
				'/static/img/partol-bg.png',
				'/static/img/equipment-icon.png',
				];
	        return {
	        	imgUrl: imgUrls
	        }
		},
		methods: {
			 back () {
		        this.$router.go(-1);
		      }
   		 }
	}
</script>

<style>





</style>
