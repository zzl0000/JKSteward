<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav mb b-white " > 
	    	<div class="back" @click="back()"><img src="/static/img/back-icon.png" height="36" width="20"></div>
        	<div class="top-title"><span>巡更中</span></div>
        	<div class="replacePL" @click="jump('')"><span class="">巡检登记</span></div>
	    </div>

		<div class="pl-content">

			<!-- 巡更人员信息 -->
			<div class="user-opreation-list b-white mb b-white">
				<ul>
					<li class="boder-bottom">

							<span class="td-color">巡更人员</span>
							<span class="">王小二</span>

					</li>
					<li class="boder-bottom">

							<span class="td-color">职位</span>
							<span class="">协管班长</span>

					</li>
					<li class="">

							<span class="td-color">当前时间</span>
							<span class="">2017/06/15 09:20</span>

					</li>
				</ul>
			</div>
			<!-- 巡更任务 -->
			<div class="partol-task b-white pd-list boder-bottom">

					<label>巡更任务</label>
					<input type="text" readonly="readonly"  name="">
					<div class="select" @click="jump('partoltask')">
						<span>请选择</span>
						<div class="img"><img src="/static/img/advance-cion.png" height="32" width="18"></div>
					</div>
	
			</div>
			<!-- 巡更 table -->
			
			<div class="partol-table pd-list b-white">
				<table class="table">
                <thead>
                    <tr>
                        <th>点位名称</th>
                        <th>巡检时间</th>
                        <th>巡检状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>1号点位</td>
                      <td>9.15.22</td>
                      <td>已检</td>
                    </tr>
                    <tr>
                      <td>2号点位</td>
                      <td>9.15.222</td>
                      <td>已检</td>
                    </tr>
                </tbody>
            </table>
			</div>


		</div>

		<!-- 悬浮块 -->
		<div class="subtn">
				<button class="btn btn-blue mb-list border-radius" @click="jump('partoling')">结束巡更</button>
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

	.partol-task{
		display: flex;
		flex-flow: nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.partol-task .select {
		flex-flow: nowrap;
		align-items: center;
	}

	.partol-task .select .img{
		flex-grow: 0;
		width: .21rem;
		height: .36rem;
		margin-left: .15rem;
	}




</style>
