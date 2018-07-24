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
                    <tr v-for="item in  pointList">
                        <td>{{item.name || ''}}</td>
                        <td>0</td>
                        <td>0</td>
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
        data() {
		  return{
              pointList:[]
          }
        },
        created (){
            var _self = this;
            this.$setTitle('漏检点位');
            _self.pointList = JSON.parse(_self.$storage.getItem('pointList'));
            console.log(JSON.parse(_self.$storage.getItem('pointList')))

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
