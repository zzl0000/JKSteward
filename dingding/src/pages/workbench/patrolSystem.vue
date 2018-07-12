<template>
	<div class="wrapper">

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
		name:'patrolSystem',
		data () {
            let params = {
                userId: this.$storage.getItem('userId'),
                sessionId: this.$storage.getItem('sessionId'),
                appKey:'wGQt7hiz7MeSbQbdyBp1',
                thirdParty: 1
            };
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
                params:params,
	        	imgUrl: imgUrls,
	        	pImgUrl: pImgUrls,
                openId:'',

	        }
		},
		created (){
            this.$setTitle('智能巡更');
			var _self = this;
			const modal = weex.requireModule('modal');

            this.$api.post('/APIInterface/platformOauth',_self.params,function(res) {

                if(res.errcode == 1){
                    //存储 Token 及用户信息
                    _self.openId = res.data.openId;
                    let params = {
                        openId:_self.openId,
                        projectId:_self.$storage.getItem('projectId'),
                        thirdParty:1,
                    }
                    _self.$api.post('/dian/app/getToken',params,function(res) {
                        console.log(res);
                        if(res.errcode == 200){
                            //存储 Token 及用户信息
                            _self.$storage.setItem('token',res.data.token);
                            _self.$storage.setItem('staffName',res.data.staffName);
                            _self.$storage.setItem('position',res.data.position);
                        }else{
                            modal.toast({
                                message: res.errmsg,
                                duration: 2
                            })
                        }
                    });
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
		top: 3em;
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
		height: calc(100vh - .4rem);
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
