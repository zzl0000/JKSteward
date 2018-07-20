<template>
	<!-- 底部导航 -->
		<div class="footer-nav b-white">
            <ul>
            	<li @click="jump('home',1)">
            			<div class="img">
            				<img v-bind:src="imgUrl.home[0]" v-if="cur_id == 1">
            				<img v-bind:src="imgUrl.home[1]" v-else>
            			</div>
            			<span>消息</span>           		
            	</li>
            	<li @click="jump('repository',2)">
            			<div class="img">
            				<img v-bind:src="imgUrl.repository[0]" v-if="cur_id == 2">
            				<img v-bind:src="imgUrl.repository[1]" v-else>
            			</div>
            			<span>知识库</span>
         
            	</li>
            	<li @click="jump('workbench',3)">
            			<div class="img">
            				<img v-bind:src="imgUrl.workbench[0]" v-if="cur_id == 3">
            				<img v-bind:src="imgUrl.workbench[1]" v-else>
            			</div>
            			<span>工作台</span>

            	</li>
            	<!--<li @click="jump('statistics',4)">-->
            			<!--<div class="img">-->
            				<!--<img v-bind:src="imgUrl.statistics[0]" v-if="cur_id == 4">-->
            				<!--<img v-bind:src="imgUrl.statistics[1]" v-else>-->
            			<!--</div>-->
            			<!--<span>自查统计</span>-->

            	<!--</li>-->
            	<li @click="jump('member',5)">
            			<div class="img">
            				<img v-bind:src="imgUrl.member[0]" v-if="cur_id == 5">
            				<img v-bind:src="imgUrl.member[1]" v-else>
            			</div>
            			<span>个人中心</span>
            	</li>
            </ul>
       </div> 
</template>
<script>
	export default {

		name:'',
		data () {
		 let imgUrls ={
	        	'home':['./static/img/nav-icon02.png','./static/img/nav-icon01.png'],
	        	'repository':['./static/img/nav-icon04.png','./static/img/nav-icon03.png'],
	        	'workbench':['./static/img/nav-icon06.png','./static/img/nav-icon05.png'],
	        	'statistics':['./static/img/nav-icon08.png','./static/img/nav-icon07.png'],
	        	'member':['./static/img/nav-icon10.png','./static/img/nav-icon09.png']
	      };
	      return {
	        imgUrl: imgUrls,
	        cur_id : this.$route.query.id
	      }
	    },
		created() {
			console.log(this.$route.query.id)
		},
		methods: {	
	        jump (url,id) {
	          this.$router.push({path:url,  name:url,query: {id: id}})
	     	}
   		 }
	}
</script>
<style>
		/* 底部导航 */

	.footer-nav {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	.footer-nav ul{ 
		padding-top: .25rem;
		padding-bottom: .15rem;
		display: flex;
		flex-flow: initial;
		justify-content: space-around;
	}

	.footer-nav ul li {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 20%;
	}
	.footer-nav ul li .img{
		width: .53rem;
		height: .53rem;
	}

	.footer-nav ul li .img figure{
		width: 100%;
		height:100%;
		background-size: auto 100% !important;
	}

	.footer-nav ul li span{
		position: relative;
		padding-top: .15rem;
		font-size: .24rem;
		color: #bfbfbf;
	}

</style>