<template>
	<div class="wrapper">
		<div class="pl-content b-white">

			<!-- 巡更 table -->
			
			<div class="partol-table pd-list b-white" style="height: calc(100vh - .4rem)">
				<table class="table">
                <thead>
                    <tr>
                        <th>巡更任务名称</th>
                        <th>点位名称</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in  pointData.pointList">
                        <td width="60%">{{taskName}}</td>
                        <td>{{item.name || ''}}</td>
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
              pointData:'',
              taskName:''
          }
        },
        created (){
            var _self = this;
            this.$setTitle('漏检点位');
            _self.pointData = JSON.parse(_self.$storage.getItem('pointList'));
            _self.taskName = _self.pointData.taskName + _self.pointData.startTime + _self.pointData.endTime
            console.log(JSON.parse(_self.$storage.getItem('pointList')))

        },
		methods: {

   		 }
	}
</script>

<style>

</style>
