<template>
	<div class="wrapper">

		<div class="error-tips" v-if="isComplete == false">
	    		<p class="">你的项目未设置巡更时间请联系项目主管后台添加</p>
	    </div>
	    <div class="pl-content b-white" v-else >
	    	
	    	
	    	<div class="remind-list pd-list" >
	    		<ul>
					<li v-for="item in  items" class="boder-bottom" >
						<p class="">
							<span class="time">7.50</span>
							<em class="">每天</em>
						</p>
						<div class="img">
							<img src="../../../static/img/close-icon.png" height="74" width="108">
						</div>
					</li>
				</ul>
	    	</div>	
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
	        	imgUrl: imgUrls,
                isComplete:true,
				items:''
	        }
		},
        created: function () {
            this.$setTitle('巡更提醒');
            let _self = this;
            let params = {
                token: this.$storage.getItem('token'),
                projectId: this.$storage.getItem('projectId'),
                thirdParty:1
            }
            this.$api.post('/dian/app/getRemindTime?',params,'',function(res) {
                if (res.errcode == 200) {
                    if(res.data.listData.length == 0){
                        _self.isComplete = false;
					}else{
                        _self.isComplete = true;
                        _self.items = res.data.listData
					}

                } else {
                    modal.toast({
                        message: res.errmsg,
                        duration: 2
                    })
                }

            })
        },
		methods: {
			 back () {
		        this.$router.go(-1);
		      }
   		 }
	}
</script>

<style>
	.remind-list{
		padding-top: 0 !important;
	}

	.remind-list ul{}

	.remind-list ul li{
		display: flex;
		flex-flow: nowrap;
		justify-content: space-between;
		align-items: center;
		padding-top: .6rem;
	}

	.remind-list ul li p{
		display: flex;
		flex-direction:column; 
	}

	.remind-list ul li p .time{
		font-size: .8rem;
		color: #adadad;
	}

	.remind-list ul li p em{
		color: #adadad;
		padding-top: .15rem;
	}

	.remind-list ul li .img{
		width: 1.06rem;
		height:.72rem;
		margin-bottom: .35rem;
	}

	.error-tips{
		width: 100%;
		position: relative;
		top: 5rem;
		align-items: center;
	}

	.error-tips p{
		width: 50%;
		text-align: center;
		font-size: .45rem;
		color: #424041;
	}

</style>
