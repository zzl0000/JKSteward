<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav b-white mb  box-shadow" > 
	    	<div class="back" @click="back()"><img src="/static/img/back-icon.png" height="36" width="20"></div>
        	<div class="top-title"><span>智能巡更</span></div>
	    </div>

	    <!-- 加载层 -->

	    <div class="loading-layer" v-show="">
	    	<div class="loading-bg img">
	    		<img v-bind:src="imgUrl[0]" height="1206" width="750">
	    	</div>

	    	<div class="tips-layer">
	    		<div class="tips-bg">
	    			<div class="img"><img v-bind:src="imgUrl[1]" height="184" width="204" ></div>
		    		<p>
		    			<span>请打开设备右侧开关</span> 
		    			<span class="min">红灯闪烁表示设备开启</span>
		    		</p>
	    		</div>		
	    	</div>
			<div class="subtn">
				<button class="btn btn-blue mb-list border-radius" @click="connect">连接读卡器</button>
			</div>
			
	    </div>

		<div class="pl-content b-white">
			<ul class="partol-tbl mb-list">
				<li @click="jump('startPartol')">
					<div class="img">
						<img v-bind:src="pImgUrl[0]">
					</div>
					<span>开始巡更</span>
				</li>
				<li @click="jump('pointLocation')">
					<div class="img">
						<img v-bind:src="pImgUrl[1]">
					</div>
					<span>点位管理</span>
				</li>
				<li @click="jump('partolRemind')">
					<div class="img">
						<img v-bind:src="pImgUrl[2]">
					</div>
					<span>巡更提醒</span>
				</li>
			</ul>
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
				'/static/img/equipment-icon.png'
				];
			let	pImgUrls = [
				'/static/img/partol-icon01.png',
				'/static/img/partol-icon02.png',
				'/static/img/partol-icon03.png'
			]
	        return {
	        	imgUrl: imgUrls,
	        	pImgUrl: pImgUrls
	        }
		},
		created (){
			var _self = this;
			const modal = weex.requireModule('modal'); 
			let params = {
				openId: '1497405254263',
				projectId: '210',
				thirdParty: 1,
			}
			this.$api.post('/dian/app/getToken',params,function(res) {
				console.log(res);
			  	if(res.errcode == 1){
                    //存储 Token 及用户信息
                   _self.$storage.setItem('Token',res.token);
                   _self.$storage.setItem('staffName',res.staffName);
                   _self.$storage.setItem('position',res.position);
                }else{
                      modal.toast({
                        message: res.errmsg,
                        duration: 2
                    })
                }
			 })
		},
		methods: {
			 back () {
		        this.$router.go(-1);
		      },
		     jump (url) {
		     	this.$router.push(url)
		     }
, 
		     connect () {
		     	let imgUrls =[
					'/static/img/partol-bg.png',
					'/static/img/equipment-icon01.png',
					];
		     	this.imgUrl = imgUrls;
		     	//this.$router.push('');
		     }

   		 },
   		components:{
   			FooterComponent
   		} 
	}
</script>

<style>

	.loading-layer{
		width: 100%;
		height: calc(100vh - 1.2rem);
	}
	.loading-bg{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		
	}
	.tips-layer{
		top: 3.9rem;
		align-items: center;
	}
	.tips-layer div{
		align-items: center;
	}
	.tips-layer .img{
		width: 3.06rem;
		height: 2.76rem;
	}
	.tips-layer p{
		padding-top: .4rem;
		display: flex;
		flex-direction: column;
		
	}
	.tips-layer p span{
		padding-top: .15rem;
		text-align: center;
		font-size: .46rem;
	}

	.tips-layer p span.min{
		font-size: .41rem;
	}

	.subtn{
		width: 100%;
		position: absolute;
		bottom: .99rem;	
	}

	.pl-content{
		width: 100%;
		height: calc(100vh - 1.6rem);
	}

	.partol-tbl{
		display: flex;
		flex-flow: nowrap;
		justify-content: space-between;
		top: .40rem;
		position: relative;
	}
	.partol-tbl li{
		border: 1px solid #e5e5e5;
		width: 31%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top:.44rem;
		padding-bottom: .44rem;  
	}

	.partol-tbl li .img{
		width: 1.26rem;
		height: 1.125rem;
	}

	.partol-tbl li span{
		padding-top: .80rem;
		color: #193e5c;
		font-size: .42rem;
	}


</style>
