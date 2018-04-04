<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
	    <div class="top-nav b-white  boder-bottom " >
	        <div class="back" @click="back()"><img src="/static/img/back-icon.png" height="36" width="20"></div>
	        <div class="top-title"><span>请选择所属部门</span></div>
	    </div>

	    
	    <div class="content">
	    	<!-- 请选择所属部门 -->
	    	<div class="b-white">
		          <ul>
		          		<li v-for="item in  items" @click="select(2,item.id,item.text)" class="pd-list boder-bottom" >{{item.text}}</li>
		          </ul>
		    </div>
		 	 
	    </div>
	</div>
</template>

<script>
	

	  
	export default {
	    name: 'select',
	    data () {
		    	let items = [
		    		{id:10,text:"客服板块"},
		    		{id:10,text:"环境板块"},
		    		{id:10,text:"安全板块"},
		    		{id:10,text:"工程板块"}
		    	];
		      return {
		      		items:items
		      }
	    },
	    created: function () {
	    	let params = {
	    		orgId:'6849',
	    		thirdParty:1
	    	}
             this.$api.post('/Appinterface/deptList?',params,function(res) {
             		console.log(res);
              })
        },
	    methods:{
	      select (key,id,text){
	      	  this.$emit('fn',{key,id,text});
	      },

	      back () {
	        this.$emit('fn','');
	      }
	    },
	    watch: {
	    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
	      '$router': 'getParams',
	    }
	  }
</script>
	
<style>

	.search{
		padding: 0.2rem 0.4rem;
	}
	.search-control{
		background-color: #f5f5f7; 
		border-radius: 0.1rem;
		flex-flow: initial;
		align-items: center;
		justify-content: space-between;
	}

	.search-control .form-group{
		flex-grow: 0.6;
		padding: .08rem 0;
	}
	.search-control .img{
		width: .46rem;
		height: .46rem;
		left: .25rem; 
	}
	.search-control .form-group input{
		padding-left: .25rem;
		background:none;
	}
	.search-control button{
		width: 17%;
		border-left: 1px solid #c5c5c5;
		background: none;
		text-align: center;
		color: #999999;
		padding: .08rem 0;
	}
	figure{
		width: 100%;
		height: 100%;
	}

	
</style>