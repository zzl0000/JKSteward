<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav b-white  boder-bottom mb" >
	        <div class="back" @click="back()"><img src="../../../static/img/back-icon.png" height="36" width="20"></div>
	        <div class="top-title"><span>任务列表</span></div>
	    </div>

	    
	    <div class="content">
	    	<!-- 请选择所属部门 -->
	    	<div class="b-white task-list">
		          <ul>
		        	 	<li class="pd-list boder-bottom">
		        	 		<span>金科十年巡更计划</span>
		        	 		<span>09:00-11:00</span>
		        	 	</li>
		        	 	<li class="pd-list boder-bottom">
		        	 		<span>金科十年巡更计划</span>
		        	 		<span>09:00-11:00</span>
		        	 	</li>
		        	 	<li class="pd-list boder-bottom">
		        	 		<span>金科十年巡更计划</span>
		        	 		<span>09:00-11:00</span>
		        	 	</li>
		          </ul>
		      </div>
		 	  
	    </div>
	</div>
</template>

<script>
	

	    
	export default {
	    name: 'select',
	    data () {
	      return {
	      }
	    },
	    methods:{
	      back () {
	        this.$router.go(-1);
	      }
	    },
	    watch: {
	    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
	      '$router': 'getParams',
	    }
	  }
</script>
	
<style>

	.task-list li{
		display: flex;
		flex-flow: nowrap;
		justify-content: space-between;
		align-items: center;
	}

	
</style>