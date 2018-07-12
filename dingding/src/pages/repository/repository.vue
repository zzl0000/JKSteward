<template>
	<div class="wrapper">

		<div class="content ">
			<!-- 巡检应用 -->
				<div class=" b-white mb">
					<div class="subnav boder-bottom">
						<span class="title">巡检应用</span>
					</div>
					<ul class="apply-list">
						<li>
							<div class="img"><img v-bind:src="imgUrl[0]"></div>
							<span class="td-color">品质巡检知识库</span>
						</li>
						<li>
							<div class="img"><img v-bind:src="imgUrl[1]"></div>
							<span class="td-color">设备巡检知识库</span>
						</li>
						<li>
							<div class="img"><img v-bind:src="imgUrl[2]"></div>
							<span class="td-color">设备维保知识库</span>
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
				'/static/img/apply-icon02.png',
				'/static/img/apply-icon04.png',
				'/static/img/apply-icon07.png'];
	        return {
	        	imgUrl: imgUrls
	        }
		},
        created: function () {
            this.$setTitle('知识库');
            let _self = this;
            /*请求数据*/
            // this.$api.post('/Appinterface/userInfo?',_self.params,function(data) {
            //    	console.log(data);
            //  })

        },
		methods: {

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
		padding: .4rem .6rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.apply-list li .img{
		width: 1rem;
		height: 1rem;

	}

	.apply-list li span{
		padding: .4rem 0; 
		width: 100%;
		text-align: center;
		display: inline-block;
		line-height: .6rem;
		font-size: .4rem;
	}
</style>
