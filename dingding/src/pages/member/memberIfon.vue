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
					<p class="td-color">姓名:<span class="t-bold-color">{{data.nickName}}</span></p>
					<p class="td-color">岗位:<span class="t-bold-color">{{data.fax}}</span></p>
					<p class="td-color">公司:<span class="t-bold-color">{{data.commpany}}</span></p>
				</div>
			</div>	
			<!-- 操作列表 -->
			<div class="user-opreation-list b-white mb">
				<ul>
					<li class="boder-bottom">
							<span class="td-color">分公司</span>
							<span class="">{{data.fenCompany}}</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">项目</span>
							<span class="">{{data.ors}}</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">部门</span>
							<span class="">{{data.deptName}}</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">岗位</span>
							<span class="">{{data.fax}}</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">电话</span>
							<span class="">{{data.phone}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import FooterComponent from '../../components/footercomponent.vue';
	export default {
		name:'memberIfon',
		data (){
			let params = {
				nickName:'王宝强',
				fax:'项目管理人',
				commpany:'金科物业服务集团',
				fenCompany:'重庆分公司',
				ors:'金科十年城东',
				deptName:'工程主管',
				phone:'13426474705'
			};
			return{
				data : params				
			}
		},
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
