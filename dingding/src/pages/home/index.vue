<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav b-white mb" > 
	    	<div class="back" @click="back"><img src="/static/img/back-icon.png" height="36" width="20"></div>
	        <div class="top-title"><span>主页</span></div>
	    </div>	
		<div class="content">
			<!-- 我的消息 -->
			<div class="news b-white mb">
					<div class="subnav boder-bottom">
						<span class="title">我的消息</span>
						<span class="more">更多</span>
					</div>
					<div class="news-list">
						<ul>
							<li>
								<span>警</span>
								<p>你的待处理工单消息请注意</p>
							</li>
							<li>
								<span>警</span>
								<p>你的待处理工单消息请注意</p>
							</li>
							<li>
								<span>警</span>
								<p>你的待处理工单消息请注意</p>
							</li>
							<li>
								<span>警</span>
								<p>你的待处理工单消息请注意</p>
							</li>
						</ul>
					</div>
			</div>	
			<!-- 问题出路 -->
			<div class="problem b-white mb">
				<div class="subnav boder-bottom">
						<span class="title">我的问题处理</span>
						<span class="more">更多</span>
					</div>
				<div class="problem-list">
					<ul>
						<li>
							<span>10</span>
							<span>待处理工单</span>
						</li>
						<li>
							<span>2</span>
							<span>已处理工单</span>
						</li>
					</ul>
				</div>
				
			</div>
		</div>
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
	.subnav{
		flex-flow: initial; 
		padding: .4rem;
	}
	.subnav span.title{}
	.subnav span.more{}

	.news-list{
		padding: .25rem;
	}
	.news-list ul{
		display: flex;
		flex-direction: column;
	}

	.news-list ul li {
		padding: .25rem;
		display: flex;
		flex-flow: initial;
	}

	.news-list ul li p{
		padding-left: .25rem; 
	}

	.problem-list{
		padding: 1rem;
		
	}
	.problem-list ul{
		display: flex;
		flex-flow: initial;
	}
	.problem-list li{
		display: flex;
		flex-direction: column;
		width: 50%;	
		justify-content: center;
	}
	.problem-list li span{
		width: 100%;
		text-align: center;
		padding-top: .25rem;
	}





</style>
