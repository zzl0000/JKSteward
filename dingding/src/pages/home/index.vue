<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
		<div class="content ">
			<!-- 我的消息 -->
			<div class="news b-white mb mb-list">
					<div class="subnav boder-bottom">
						<span class="title">我的消息</span>
						<span class="more">更多</span>
					</div>

					<div class="news-list">
						<ul>
							<li>
								<span class="b-red">警</span>
								<p><em>「未读」</em>你的待处理工单消息请注意</p>
							</li>
							<li>
								<span class="b-y">超</span>
								<p>你的待处理工单消息请注意</p>
							</li>
							<li>
								<span class="b-bule">工</span>
								<p>你的待处理工单消息请注意</p>
							</li>
							<li>
								<span class="b-green">告</span>
								<p>你的待处理工单消息请注意</p>
							</li>
						</ul>
					</div>
			</div>	
			<!-- 问题处理 -->
			<div class="problem b-white mb mb-list" style="display: none">
				<div class="subnav boder-bottom">
						<span class="title">我的问题处理</span>
						<span class="more">更多</span>
				</div>
				<div class="problem-list">
					<ul>
						<li>
							<span class="num t-red-color">10</span>
							<span class="td-color">待处理工单</span>
						</li>
						<li>
							<span class="num t-red-color">2</span>
							<span class="td-color">已处理工单</span>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- 抢单块 -->

		<div class="qd-content" style="display: none">
			<div class="b-bule">
				<span>抢单</span>
			</div>
		</div>


		<FooterComponent></FooterComponent>
	</div>
</template>
<script>
	import FooterComponent from '../../components/footercomponent.vue';

	export default {
		name:'home',
		data () {
			let params = {
                  userId: this.$storage.getItem('userId'),
                  sessionId: this.$storage.getItem('sessionId'),
                  orgId:'6849',
                  thirdParty:1
            };
			return{
				params : params
			}
		},
		created: function () {
		    //console.log(this.$setTitle);
            this.$setTitle('金科大管家');
        	let _self = this;
        	/*请求数据*/
            // this.$api.post('/Appinterface/todayWork',_self.params,function(data) {
			// 	console.log(data);
			// })
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
	.subnav{
		flex-flow: initial; 
		padding: .4rem;
		justify-content: space-between;
	}
	.subnav span.title{
		align-self: flex-start;
		color: #515151;
	}
	.subnav span.more{
		align-self: flex-end;
		color: #515151;
	}

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
		align-items:center;
	}
	.news-list ul li span{
		display:flex;
    	align-items:center;
    	justify-content: center;
		width: .82rem;
		height: .82rem;
		border-radius: 100%;
		text-align: center;
		color: white;
	}

	.news-list ul li p{
		padding-left: .35rem; 
		font-size: .36rem;
		color: #515151;
	}

	.news-list ul li p em{
		color: #45a4f2;
	}

	.problem-list{
		padding-top: 1.2rem;
		padding-bottom: 1.6rem;
		
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
	
	.problem-list li span.num{
		font-size: .64rem;
	}

	.qd-content{
		position: absolute;
		right: .25rem;
		bottom: 1.60rem;
		z-index: 1;
	}
	.qd-content div{
		border-radius: 100%;
		width: 1.60rem;
		height:1.60rem;
		align-items: center;
		justify-content: center;
	}

	.qd-content div span{
		color: white;
	}




</style>
