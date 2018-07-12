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
				'/static/img/partol-bg.png',
				'/static/img/equipment-icon.png',
				];
			let items = {
					staffName:'王小二',
					position:'值班班长',
					currTime: this.$api.formats()
				};	
	        return {
	        	imgUrl: imgUrls,
	        	item: items
	        }
		},
		created (){
             this.$setTitle('员工签到');
		     this.item.staffName = this.$storage.getItem('staffName') || this.item.staffName;
		     this.item.position = this.$storage.getItem('position') || this.item.position;
		},
		methods: {
			 back () {
		        this.$router.go(-1);
		      },
		     jump (url) {
		     	let _self = this;
		     	const modal = weex.requireModule('modal');
		     	let params ={
		     		token : _self.$storage.getItem('token'),
		     		signTime:_self.item.currTime,
		     		thirdParty:1
		     	}
		     	this.$api.post('/dian/app/signPatrol',params,function(res) {
			  			console.log(res);
                    if(res.errcode == 200){
                        //存储 Token 及用户信息
                        _self.$storage.setItem('signId',res.data.signId);
                        modal.toast({
                            message: res.errmsg,
                            duration: 2
                        })
						setTimeout(function(){
                            _self.$router.push(url);
						},2001)
                    }else{
                        modal.toast({
                            message: res.errmsg,
                            duration: 2
                        })
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
