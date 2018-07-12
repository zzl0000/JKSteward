<template>
	<div class="wrapper">
		<div class="pl-content b-white">

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

	</div>
</template>
<script>
	export default {
		name:'',
        created (){
            this.$setTitle('漏检点位')
        },
		methods: {
			 back () {
		        this.$router.go(-1);
		      }
   		 }
	}
</script>

<style>

	
</style>
