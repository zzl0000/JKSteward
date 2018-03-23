<template>
	<!-- 底部导航 -->
		<div class="footer-nav b-white">
            <ul>
            	<li>
            		<a @click="jump('home')">
            			<div class="footer-icon"><img src="/static/img/nav-icon01.png" ></div>
            			<span>消息</span>
            		</a>
            	</li>
            	<li>
            		<a @click="jump('repository')">
            			<div class="footer-icon"><img src="/static/img/nav-icon03.png"></div>
            			<span>知识库</span>
            		</a>
            	</li>
            	<li>
            		<a @click="jump('workbench')">
            			<div class="footer-icon"><img src="/static/img/nav-icon05.png"></div>
            			<span>工作台</span>
            		</a>
            	</li>
            	<li>
            		<a @click="jump('statistics')">
            			<div class="footer-icon"><img src="/static/img/nav-icon07.png"></div>
            			<span>自查统计</span>
            		</a>
            	</li>
            	<li>
            		<a @click="jump('member')">
            			<div class="footer-icon"><img src="/static/img/nav-icon10.png"></div>
            			<span>个人中心</span>
            		</a>
            	</li>
            </ul>
       </div> 
</template>
<script>
	export default {
		methods: {	
	        jump (url) {
	          this.$router.push(url)
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
		padding: .4rem 0;
		display: flex;
		flex-flow: initial;
		justify-content: space-around;
	}

	.footer-nav ul li a{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.footer-nav ul li .footer-icon{
		width: .55rem;
		height: .66rem;
	}

	.footer-nav ul li .footer-icon figure{
		width: 100%;
		height:100%;
	}

	.footer-nav ul li span{
		position: relative;
		padding-top: .25rem;
		font-size: .24rem;
		color: #333333;
	}

</style>