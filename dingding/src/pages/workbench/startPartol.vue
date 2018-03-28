<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav b-white mb box-shadow" > 
	    	<div class="back" @click="back()"><img src="/static/img/back-icon.png" height="36" width="20"></div>
        	<div class="top-title"><span>开始巡更</span></div>
	    </div>

		<div class="pl-content">
			<!-- 操作列表 -->
			<div class="user-opreation-list b-white mb">
				<ul>
					<li class="boder-bottom">
							<span class="td-color">巡更人员</span>
							<span class="">王小二</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">职位</span>
							<span class="">协管班长</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">当前时间</span>
							<span class="">2017/06/15 09:20</span>
					</li>
				</ul>
			</div>

		</div>
		<div class="subtn">
				<button class="btn btn-blue mb-list border-radius" @click="jump('partoling')">开始巡更</button>
		</div>
	</div>
</template>
<script>
	import FooterComponent from '../../components/footercomponent.vue';
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
		      },
		     jump (url) {
		     	this.$router.push(url)
		     }

   		 },
   		components:{
   			FooterComponent
   		} 
	}
</script>

<style>



</style>
