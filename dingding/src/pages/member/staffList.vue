<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav b-white box-shadow boder-bottom" > 
	    	<div class="back" @click="back"><img src="/static/img/back-icon.png" height="36" width="20"></div>
	        <div class="top-title"><span>人员名单</span></div>
	    </div>	
		<div class="content">
			<!-- 所属部门 -->
			<div class="mb sector-select b-white pd-list">
				<div class="sector-select-list">
					<span>工程管理(3)</span>
					<div class="img"><img src="/static/img/advance-cion.png" height="32" width="18"></div>
				</div>
			</div>	
			<!-- 人员列表 -->
			<div class="member-list b-white mb">
				<ul>
					<li>
						<span class="b-blues icon">梦屏</span>
						<p class="boder-bottom">
							<span>周梦屏<em>待审核</em></span>
							<span class="td-color"></span>
						</p>
						
					</li>
					<li>
						<span class="b-blues icon">王东</span>
						<p class="boder-bottom">
							<span>王东<em>待审核</em></span>
							<span class="td-color">电工</span>
						</p>
						
					</li>
					<li>
						<span class="b-blues icon">梦屏</span>
						<p class="boder-bottom">
							<span>周梦屏<em>待审核</em></span>
							<span class="td-color">员工</span>
						</p>
						
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		methods: {
			back () {
				this.$router.go(-1);
			}
		}
	}
</script>

<style>


	.member-list-list {
		padding: 0 0.4rem;
		padding-top: .2rem;
		padding-right: 0;
	}

	.member-list ul{
	}

	.member-list ul li {
		display: flex;
		flex-flow: nowrap;
		justify-content: space-between;
		align-items: center;
		
		padding-left: .4rem;
	}

	.member-list ul li p {
		display: flex;
		flex-grow: 0.9;
		flex-flow: nowrap;
		justify-content: space-between;
		align-items: center;
		padding: .4rem 0;
		padding-right: .4rem;
	}

	.member-list ul li p span{
		font-size: .39rem;
	}

	.member-list ul li p span em{
		position: relative;
		left: 0.30rem;
		font-size: .30rem;
		padding: 0.05rem 0.15rem;
		background-color: #45a4f2;
		border-radius: 0.05rem;
		color: white;
	}

	.member-list li span.icon{
		display:flex;
    	align-items:center;
    	justify-content: center;
		width: .82rem;
		height: .82rem;
		border-radius: 50%;
		text-align: center;
		color: white;
		font-size: .30rem;
	}

	.sector-select .sector-select-list{
		display: flex;
		flex-flow: nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.sector-select .sector-select-list .img{
		flex-grow: 0;
		width: .24rem;
		height: .42rem;
	}

</style>
