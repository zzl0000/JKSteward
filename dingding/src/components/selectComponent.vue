<template>
	<div class="wrapper">

	    <div class="content">
	    	<!-- 请选择所属部门 -->
	    	<div class="b-white">
		          <ul>
		          		<li v-for="item in  items" @click="select(item.id,item.pointName)" class="pd-list boder-bottom" >{{item.pointName}}</li>
		          </ul>
		    </div>
	    </div>
	</div>
</template>

<script>
	
	export default {
	    name: 'select',
		props: ['todo'],
	    data () {
		    	let items = [
		    		{id:10,pointName:"1号大厅"},
		    		{id:10,pointName:"门岗一号"},
		    		{id:10,pointName:"链家门口点位"},
		    		{id:10,pointName:"小雨火锅侧面点位"}
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
            /* this.$api.post('/Appinterface/deptList?',params,function(res) {
             		console.log(res);
              })*/
        },
	    methods:{
	      select (id,pointName){
	     	 this.$emit('fn',{id,pointName});
	      }
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