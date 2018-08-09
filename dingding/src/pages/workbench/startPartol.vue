<template>
	<div class="wrapper">
		<div class="pl-content">
			<!-- 操作列表 -->
			<div class="user-opreation-list b-white mb">
				<ul>
					<li class="boder-bottom">
							<span class="td-color">巡更人员</span>
							<span class="">{{item.staffName}}</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">职位</span>
							<span class="">{{item.position}}</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">当前时间</span>
							<span class="">{{item.currTime}}</span>
					</li>
				</ul>
			</div>

		</div>
		<div class="subtn">
			<button class="btn btn-blue mb-list border-radius" @click="jump('partoling')">开始巡更</button>
		</div>
	</div>
</template>
<script>
	import FooterComponent from '../../components/footercomponent.vue';
	export default {
		name:'workbench',
		data () {
			let imgUrls =[
				'./static/img/partol-bg.png',
				'./static/img/equipment-icon.png',
				];
			let items = {
					staffName:'',
					position:'',
					currTime: this.$api.formats()
				};	
	        return {
	        	imgUrl: imgUrls,
	        	item: items
	        }
		},
		created (){
             this.$setTitle('员工签到');
		     this.item.staffName = this.$storage.getItem('staffName') ;
		     this.item.position = this.$storage.getItem('position') ;
		},
		methods: {
			 back () {
		        this.$router.go(-1);
		      },
		     jump (url) {
		     	let _self = this;
		     	let params ={
		     		token : _self.$storage.getItem('token'),
		     		signTime:_self.item.currTime,
		     		thirdParty:1
		     	}
		     	this.$api.post('/dian/app/signPatrol',params,'',function(res) {
					console.log(res);
                    if(res.errcode == 200){
                        //存储 Token 及用户信息 和签到时间
                        _self.$storage.setItem('signId',res.data.signId);
                        _self.$storage.setItem('signTime',_self.item.currTime);
                        _self.$toast(res.errmsg)
						setTimeout(function(){
                            _self.$router.replace(url);
						},2001)
                    }else{
                        _self.$toast(res.errmsg)
                    }

			  	})
		     }

   		 },
   		components:{
   			FooterComponent
   		} 
	}
</script>

<style>



</style>
