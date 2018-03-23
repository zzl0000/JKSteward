<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav b-white mb" > 
	    	<div class="back" @click="back"><img src="/static/img/back-icon.png" height="36" width="20"></div>
	        <div class="top-title"><span>我的资料</span></div>
	    </div>	
		<div class="content">
			<!-- 用户信息 -->
			<div class="user-ifon b-white mb">
				<div class="user-header"><span>王</span></div>
				<div class="user-list">
					<p>姓名:<span>王宝强</span></p>
					<p>岗位:<span>项目管理人</span></p>
					<p>公司:<span>金科物业服务集团</span></p>
				</div>
				<div class="user-detail-btn">
					<span>查看</span>
				</div>
			</div>	
			<!-- 操作列表 -->
			<div class="user-opreation-list b-white mb">
				<ul>
					<li class="boder-bottom">
						<a>
							<span class="">分公司</span>
							<span class="">重庆分公司</span>
						</a>
					</li>
					<li class="boder-bottom">
						<a>
							<span class="">项目</span>
							<span class="">金科十年城东</span>
						</a>
					</li>
					<li class="boder-bottom">
						<a>
							<span class="">部门</span>
							<span class="">工程部</span>
						</a>
					</li>
					<li class="boder-bottom">
						<a>
							<span class="">岗位</span>
							<span class="">工程主管</span>
						</a>
					</li>
					<li class="boder-bottom">
						<a>
							<span class="">岗位</span>
							<span class="">电话</span>
						</a>
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
	.user-ifon{
		padding: 0.4rem;
		padding-right: 0;
		flex-flow: initial;
		justify-content: space-between;
		align-items: center;
	}
	.user-ifon .user-header{
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 50%;
		background-color: #36a9fc;
		justify-content: center; 
	}
	.user-ifon .user-header span{
		align-self: center;
	}
	.user-ifon .user-list p{
		padding: 0.2rem 0;
		font-size: .38rem;

	}
	.user-ifon .user-list p span{
		font-size: .38rem;

	}
	.user-detail-btn {
		background-color: #36a9fc;
		width: 1.35rem;
		height: .60rem;
		justify-content: center;
		/*border-radius: 50% 0 0 50%;*/
	}
	.user-detail-btn span {
		color:white;
		text-align: center;
	}

	.user-opreation-list {
		padding: 0 0.4rem;
		padding-top: .2rem;
		padding-right: 0;
	}

	.user-opreation-list li a{
		padding: 0.4rem 0;
		display: flex;
		flex-flow: initial;
		align-items: center;
		justify-content: space-between;
		padding-right:0.25rem;
	}

	.user-opreation-list li div.opreation-list-icon{
		width: .44rem;
		height: .44rem;
	}
	figure{
		width: 100%;
		height: 100%;
	}
	.user-opreation-list li span.title{
		width: 100%;
		padding-left: .25rem;
		font-size: .38rem;
	}
	.user-opreation-list li span.advance{
		width: .18rem;
		height:.32rem;
		align-self: flex-end;
	}

	.register-operation{
		top: 1.5rem;
	}


</style>
