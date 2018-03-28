<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav mb b-white " > 
	    	<div class="back" @click="back()"><img src="/static/img/back-icon.png" height="36" width="20"></div>
        	<div class="top-title"><span>巡更点位管理</span></div>
        	<div class="replacePL" @click="jump('addPrtol')"><span class="">替换点位</span></div>
	    </div>

		<div class="pl-content b-white">

			<!-- 巡更列表 -->
			<div class="partol-list m-list  pd-list b-gray">
				<div class="partol-list-title">
					<span class="td-color">所在项目| </span>
					<span>金科智慧城</span>
				</div>
				<ul>
					<li>
						<label>漏检</label>
						<div class="space-between" @click="jump('missingLoaction')">
							<span class="tips">8个</span>
							<p class="td-color">金科智慧城巡更任务 09:00 12:00</p>
							<div class="img"><img src="/static/img/advance-cion.png" height="32" width="18"></div>
						</div>
					</li>
					<li>
						<label>已完成</label>
						<div>
							<span></span>
							<p class="td-color">金科智慧城巡更任务 09:00 12:00</p>
						</div>
					</li>
					<li>
						<label>进行中</label>
						<div>
							<span></span>
							<p class="td-color">金科智慧城巡更任务 09:00 12:00</p>						
						</div>
					</li>
				</ul>
			</div>

			<!-- 巡更 table -->
			
			<div class="partol-table pd-list b-white">
				<table class="table">
                <thead>
                    <tr>
                        <th>点位名称</th>
                        <th>今日巡检次数</th>
                        <th>本月巡检次数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>1号点位</td>
                      <td>11</td>
                      <td>11</td>
                    </tr>
                    <tr>
                      <td>2号点位</td>
                      <td>22</td>
                      <td>22</td>
                    </tr>
                </tbody>
            </table>
			</div>


		</div>

		<!-- 悬浮块 -->

		<div class="qd-content">
			<div class="b-bule" @click="jump('addPrtol')">
				<span>添加</span>
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
		      },
		     jump (url) {
		     	this.$router.push(url)
		     }

   		 }
	}
</script>

<style>

	.replacePL{
		position: absolute;
		right: .30rem;
		top: 0.4rem;
		z-index: 100;
		
	}

	.replacePL span{
		color: #38acff;
	}
	.partol-list{
	}

	.partol-list-title{
		flex-flow: nowrap; 
	}

	.partol-list ul{
		display: flex;
		flex-flow: wrap;
		padding-top: .6em;
	}

	.partol-list ul li{
		display: flex;
		flex-flow: nowrap;
		width:100%;
		justify-content: space-between;
		align-items: center;
		padding-top: .25rem;
		padding-bottom: .25rem;
	}

	.partol-list ul li span.tips{
		padding: 0.05rem .10rem;
		background-color: #f09a71;
		color: white;
		border-radius: 0.05rem;
		font-size: .39rem;
	}

	.partol-list ul li div{
		flex-flow: nowrap; 
		flex-grow: 0.8;
		justify-content:flex-start;
		align-items: center;
	}
	.partol-list ul li div.space-between{
		justify-content:space-between;
	}

	.partol-list ul li div p{
		padding-left: .25rem;
		font-size: .36rem;
		flex-grow: 0.8;
	}

	.partol-list ul li div .img{
		flex-grow: 0;
		width: .24rem;
		height: .42rem;

	}




</style>
