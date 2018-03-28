<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav mb b-white " > 
	    	<div class="back" @click="back()"><img src="/static/img/back-icon.png" height="36" width="20"></div>
        	<div class="top-title"><span>巡更提醒</span></div>
	    </div>
		<div class="error-tips">
	    		<p class="">你的项目未设置巡更时间请联系项目主管后台添加</p>
	    </div>
	    <div class="pl-content b-white" v-show=''>
	    	
	    	
	    	<div class="remind-list pd-list" >
	    		<ul>
					<li class="boder-bottom">
						<p class="">
							<span class="time">7.50</span>
							<em class="">每天</em>
						</p>
						<div class="img">
							<img src="/static/img/close-icon.png" height="74" width="108">
						</div>
					</li>

					<li class="boder-bottom">
						<p class="">
							<span class="time">17.50</span>
							<em class="">每天</em>
						</p>
						<div class="img">
							<img src="/static/img/close-icon.png" height="74" width="108">
						</div>
					</li>

					<li class="boder-bottom">
						<p class="">
							<span class="time">22.50</span>
							<em class="">每天</em>
						</p>
						<div class="img">
							<img src="/static/img/close-icon.png" height="74" width="108">
						</div>
					</li>
				</ul>
	    	</div>	
	    </div>

	</div>
</template>
<script>
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
		      }
   		 }
	}
</script>

<style>
	.remind-list{
		padding-top: 0 !important;
	}

	.remind-list ul{}

	.remind-list ul li{
		display: flex;
		flex-flow: nowrap;
		justify-content: space-between;
		align-items: center;
		padding-top: .6rem;
	}

	.remind-list ul li p{
		display: flex;
		flex-direction:column; 
	}

	.remind-list ul li p .time{
		font-size: .8rem;
		color: #adadad;
	}

	.remind-list ul li p em{
		color: #adadad;
		padding-top: .15rem;
	}

	.remind-list ul li .img{
		width: 1.06rem;
		height:.72rem;
		margin-bottom: .35rem;
	}

	.error-tips{
		width: 100%;
		position: relative;
		top: 5rem;
		align-items: center;
	}

	.error-tips p{
		width: 50%;
		text-align: center;
		font-size: .45rem;
		color: #424041;
	}

</style>
