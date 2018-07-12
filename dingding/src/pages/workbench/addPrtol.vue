<template>
	<div class="wrapper mt-none">

		<div class="pl-content" v-if="todo.isComplete == false">
			<!-- 加载层 -->
		    <div class="loading-layer" >
		    	<div class="loading-bg img">
		    		<img v-bind:src="imgUrl[0]" height="1206" width="750">
		    	</div>

		    	<div class="tips-layer">
		    		<div class="tips-bg">
		    			<div class="img"><img v-bind:src="imgUrl[1]" height="184" width="204" ></div>
			    		<p>
			    			<span class="td-color">操作提示:请把xxx贴近巡更点</span> 
			    			<span class="td-color min">巡更点ID:123456789912213213213</span>
			    		</p>
		    		</div>		
		    	</div>
					
		    </div>

			<!-- add pl form -->
		    <div class="add-form mb-model border-radius">
		    	<div class="form-group">
		    		<label>你所在的项目</label>
		    		<input type="text" name="" value="金科十年城">
		    	</div>
		    	<div class="form-group" @click="choosePointLocation">
		    		<label>巡更点名称</label>
		    		<p style="padding:0">
		    			<span v-text="todo.pointName"></span>
		    			<div class="img"><img src="/static/img/advance-cion.png" height="32" width="18"></div>
		    		</p>
		    		
		    	</div>
		    	<div class="form-group">
		    		<label>备注</label>
		    		<input type="text" name="" v-model="remark"  placeholder="请输入备注信息">
		    	</div>
		    </div>
			<div class="subtn">
					<button class="btn btn-blue mb-list border-radius" @click="submit">保存</button>
			</div>
		</div>
		<selectComponent v-on:fn="hidePanel" v-else post-url="getPointList" ></selectComponent>
	</div>
</template>
<script>
	import selectComponent from '../../components/selectComponent.vue';
	export default {
		name:'workbench',
		data () {
			let imgUrls =[
				'/static/img/partol-bg01.png',
				'/static/img/equipment-icon01.png'
				];
			let todos = {
				isComplete:false,
	        	title:'新增巡更点位',
	        	pointName:'请选择需要替换的点位名称',
	        	pointId:''
			}	
	        return {
	        	imgUrl: imgUrls,
	        	todo : todos,
                remark:'',
	        }
		},
		created (){
            this.$setTitle(this.todo.title)
		},
		methods: {

		      choosePointLocation (){
		      		this.todo.isComplete = true;
		      		this.title = '巡更点';
                  this.$setTitle(this.todo.title)
		      },
		      hidePanel(rs){
		      		console.log(rs);
		      		this.todo.isComplete = false;
		      		this.title = '新增巡更点位';
		      		this.todo.pointName = rs.pointName;
	       		    this.todo.pointId = rs.id;
                    this.$setTitle(this.todo.title)
		      },
			  submit () {
                  	const modal = weex.requireModule('modal');
				  	let params = {
				  		token: this.$storage.getItem('token'),
				  		id: this.todo.pointId,
				  		projectId: this.$storage.getItem('projectId'),
				  		pointName:this.todo.pointName,
				  		remark:this.remark,
				  		thirdParty:1
				  	}
			  		this.$api.post('/dian/app/addPoint',params,function(res) {
			  			console.log(res);
                        if (res.errcode == 200) {

                        } else {
                            modal.toast({
                                message: res.errmsg,
                                duration: 2
                            })
                        }
			  		})
			  }

   		 },
   		components:{
   			selectComponent
   		} 
	}
</script>

<style>

	.add-form{
		position: absolute;
		left: 0;
		bottom: 2.85rem;
		width: 92%;
		z-index: 101;
		background-color: #f6f3f1;
		opacity: 0.8;
		padding-left: .42rem;
	}

	.add-form .form-group{
		flex-flow: nowrap;
		align-items: center;
		padding: 0.3rem 0;
	}
	.add-form .form-group input{
		background:none; 
		font-size: .4rem;
		 color: #333333;
	}

	.add-form .form-group label{
		display: inline-block;
		text-align: right;
		width: 30%;
		margin-right: .26rem;
		font-size: .4rem;
	}
	.add-form .form-group p{
		padding: .15rem;
	}
	.add-form .form-group p span{
		color: #333333;
		font-size: .4rem;
	}
	.add-form .form-group .img{
		flex-grow: 0;
		width: .24rem;
		height: .42rem;
		position: absolute;
   		right: .35rem;

	}

	.add-form .form-group input::-webkit-input-placeholder {
		  color: #333333;
	}



</style>