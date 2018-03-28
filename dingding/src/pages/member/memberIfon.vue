<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav b-white mb box-shadow" > 
	    	<div class="back" @click="back"><img src="/static/img/back-icon.png" height="36" width="20"></div>
	        <div class="top-title"><span>我的资料</span></div>
	    </div>	
		<div class="content">
			<!-- 用户信息 -->
			<div class="user-ifon b-white mb">
				<div class="user-header"><span class="t-white-color">王</span></div>
				<div class="user-list user-list-flow">
					<p class="td-color">姓名:<span class="t-bold-color">王宝强</span></p>
					<p class="td-color">岗位:<span class="t-bold-color">项目管理人</span></p>
					<p class="td-color">公司:<span class="t-bold-color">金科物业服务集团</span></p>
				</div>
			</div>	
			<!-- 操作列表 -->
			<div class="user-opreation-list b-white mb">
				<ul>
					<li class="boder-bottom">
							<span class="td-color">分公司</span>
							<span class="">重庆分公司</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">项目</span>
							<span class="">金科十年城东</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">部门</span>
							<span class="">工程部</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">岗位</span>
							<span class="">工程主管</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">岗位</span>
							<span class="">电话</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import FooterComponent from '../../components/footercomponent.vue';
	export default {
		methods: {
			back () {
				this.$router.go(-1);
			},
			Logout () {
				this.$router.push('/')
			}
		},
   		components:{
   			FooterComponent
   		} 
	}
</script>

<style>
	
	.user-ifon .user-list-flow{
		flex-grow: 0.8;
	}
	

	.user-opreation-list {
		padding: 0 0.4rem;
		padding-top: .2rem;
		padding-right: 0;
	}

	.user-opreation-list li span{
		font-size: .36rem;
	}

</style>
