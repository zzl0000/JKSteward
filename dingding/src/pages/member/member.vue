<template>

	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav b-white mb box-shadow" > 
	    	<div class="back"></div>
	        <div class="top-title"><span>个人中心</span></div>
	    </div>	
		<div class="content ">
			<!-- 用户信息 -->
			<div class="user-ifon b-white mb">
				<div class="user-header"><span class="t-white-color">王</span></div>
				<div class="user-list">
					<p class="td-color">姓名:<span class="t-bold-color">{{nickName}}</span></p>
					<p class="td-color">岗位:<span class="t-bold-color">{{fax}}</span></p>
					<p class="td-color">公司:<span class="t-bold-color">{{commpany}}</span></p>
				</div>
				<div class="user-detail-btn">
					<div class="img" @click="jump('memberIfon')">
						<img src="/static/img/look-icon.png" height="60" width="136">
						<span>查看</span>
					</div>
				</div>
			</div>	
			<!-- 操作列表 -->
			<div class="user-opreation-list b-white mb">
				<ul>
					<li class="boder-bottom" @click="jump('staffList')">
							<div class="opreation-list-icon"><img src="/static/img/member-icon01.png" height="46" width="42"></div>
							<span class="title">人员信息待审核</span>
							<span class="advance"><img src="/static/img/advance-cion.png" height="32" width="18"></span>
					</li>
					<li class="boder-bottom" @click="jump('changePassword')">
							<div class="opreation-list-icon"><img src="/static/img/member-icon02.png" height="44" width="38"></div>
							<span class="title">修改密码</span>
							<span  class="advance"><img src="/static/img/advance-cion.png" height="32" width="18"></span>
					</li>
					<li class="" @click="jump('aboutUs')">
							<div class="opreation-list-icon"><img src="/static/img/member-icon03.png" height="44" width="44"></div>
							<span class="title">版本信息</span>
							<span  class="advance"><img src="/static/img/advance-cion.png" height="32" width="18"></span>
					</li>
				</ul>
			</div>
		</div>

		<!-- 退出登录 -->
		<div class="register-operation">
            <button class="btn b-white t-gray-color " @click="Logout"> 退出登录 </button>
       </div> 
	   
       <FooterComponent></FooterComponent>

	</div>

</template>
<script>
	import FooterComponent from '../../components/footercomponent.vue';
	export default {
		name:'member',
		data () {
			let params = {
				  signature:this.$storage.getItem('signature'),
                  uid:this.$storage.getItem('userId'),
                  userId: this.$storage.getItem('userId'),
                  sessionId: this.$storage.getItem('sessionId'),
                  thirdParty:1
            };
			return{
				params : params,
				nickName:'王宝强',
				fax:'项目管理人',
				commpany:'金科物业服务集团'
			}
		},
		created: function () {
       		 let _self = this;
        	 /*请求数据*/
             this.$api.post('/Appinterface/userInfo?',_self.params,function(data) {
                	console.log(data);
              })

    	},
		methods: {
			Logout () {
				let _self = this;
				const modal = weex.requireModule('modal');
				modal.confirm({
				    message: '请确认是否退出当前登录',
				    duration: 0.3,
				    okTitle :'确定',
				    cancelTitle :'取消'
				}, function (value) {
					if(value == '确定'){
						 _self.$api.post('/Appinterface/userLoginOut',_self.params,function(data) {
	                		console.log(data);
	              		});
	              		_self.$router.push('/');
					}			   
				})
				
				
				//this.$router.push('/');
			},
			jump (url){ 
				this.$router.push(url);
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
		flex-flow: nowrap;
		flex-grow: 1;
		justify-content: space-between;
		align-items: center;
	}
	.user-ifon .user-header{
		width: 1.60rem;
		height: 1.60rem;
		border-radius: 100%;
		background-color: #36a9fc;
		justify-content: center; 

	}
	.user-ifon .user-header span{
		align-self: center;
	}

	.user-ifon .user-list{
		flex-grow: 0.8 ;
		padding-left: .25rem;
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
	.user-detail-btn .img {
		position: relative;
		width: 2.04rem;
		height: .90rem;
		align-self: flex-end;
	}
	.user-detail-btn .img span{
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 1;
		color:white;
		text-align: center;
		line-height: .90rem;

	}

	.user-opreation-list {
		padding: 0 0.4rem;
		padding-top: .2rem;
		padding-right:0;
	}

	.user-opreation-list li {
		padding: 0.4rem 0;
		display: flex;
		flex-flow: initial;
		align-items: center;
		justify-content: space-between;
		padding-right:0.25rem;
	}

	.user-opreation-list li div.opreation-list-icon{
		width: .50rem;
		height: .66rem;

	}
	.user-opreation-list li div.opreation-list-icon figure{
		width: 100%;
		height: 100%;
		background-size: 100% auto !important;
		background-position: 60% 50% !important;

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
