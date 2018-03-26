<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav b-white mb box-shadow" > 
	    	<div class="back"></div>
	        <div class="top-title"><span>金科服务集团</span></div>
	    </div>

		<div class="content">
			<!-- 巡检应用 -->
				<div class=" b-white mb">
					<div class="subnav boder-bottom">
						<span class="title">巡检应用</span>
					</div>
					<ul class="apply-list">
						<li @click='jump()'>
							<div class="img"><img v-bind:src="imgUrl[0]"></div>
							<span>工单池</span>
						</li>
						<li @click='jump()'>
							<div class="img"><img v-bind:src="imgUrl[1]"></div>
							<span>品质巡检</span>
						</li>
						<li @click='jump()'>
							<div class="img"><img v-bind:src="imgUrl[2]"></div>
							<span>巡更</span>
						</li>
						<li @click='jump()'>
							<div class="img"><img v-bind:src="imgUrl[3]"></div>
							<span>设备巡检</span>
						</li>
					</ul>
				</div>


			<!-- 常用应用 -->
				<div class=" b-white">
					<div class="subnav boder-bottom">
						<span class="title">常用应用</span>
					</div>
					<ul class="apply-list">
						<li @click='jump'>
							<div class="img"><img v-bind:src="imgUrl[4]"></div>
							<span>审批</span>
						</li>
						<li @click='jump'>
							<div class="img"><img v-bind:src="imgUrl[5]"></div>
							<span>通讯录</span>
						</li>
					</ul>
				</div>
		</div>

	    <FooterComponent></FooterComponent>
	</div>
</template>
<script>
	import FooterComponent from '../../components/footercomponent.vue';
	export default {
		name:'workbench',
		data () {
			let imgUrls =[
				'/static/img/apply-icon01.png',
				'/static/img/apply-icon02.png',
				'/static/img/apply-icon03.png',
				'/static/img/apply-icon04.png',
				'/static/img/apply-icon05.png',
				'/static/img/apply-icon06.png'];
	        return {
	        	imgUrl: imgUrls
	        }
		},
		methods: {

			jump (){
				
			}
   		 },
   		components:{
   			FooterComponent
   		} 
	}
</script>

<style>
	.subnav{
		flex-flow: initial; 
		padding: .4rem;
	}

	.apply-list{
		display: flex;
		flex-flow: wrap;
		height: auto;
		overflow: hidden;
	}
	.apply-list li{
		width: 33%;
		padding-top: .4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.apply-list li .img{
		width: 1rem;
		height: 1rem;

	}

	.apply-list li span{
		padding-top: .4rem;
		width: 100%;
		text-align: center;
		display: inline-block;
	}
</style>
