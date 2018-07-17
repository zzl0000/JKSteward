<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
		<div class="content">
			<!-- 用户信息 -->
			<div class="user-ifon b-white mb">
				<div class="user-header"><span class="t-white-color">王</span></div>
				<div class="user-list user-list-flow">
					<p class="td-color">姓名:<span class="t-bold-color">{{data.nickName}}</span></p>
					<p class="td-color">岗位:<span class="t-bold-color">{{data.fax}}</span></p>
					<p class="td-color">公司:<span class="t-bold-color">{{data.commpany}}</span></p>
				</div>
			</div>	
			<!-- 操作列表 -->
			<div class="user-opreation-list b-white mb">
				<ul>
					<li class="boder-bottom">
							<span class="td-color">分公司</span>
							<span class="">{{data.fenCompany}}</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">项目</span>
							<span class="">{{data.ors}}</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">部门</span>
							<span class="">{{data.deptName}}</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">岗位</span>
							<span class="">{{data.fax}}</span>
					</li>
					<li class="boder-bottom">
							<span class="td-color">电话</span>
							<span class="">{{data.phone}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import FooterComponent from '../../components/footercomponent.vue';
	export default {
		name:'memberIfon',
		data (){
			let params = {
				nickName:'',
				fax:'',
				commpany:'',
				fenCompany:'',
				ors:'',
				deptName:'',
				phone:''
			};
            let getParams = {
                userId: this.$storage.getItem('userId'),
                sessionId: this.$storage.getItem('sessionId'),
                thirdParty:1,
            };
			return{
				data : params,
                getParams: getParams,
			}
		},
        created: function () {
            this.$setTitle('我的资料');
            let _self = this;

            _self.headersData = {
                signature:_self.setmd5(_self.$storage.getItem('signature')),
                uid:_self.$storage.getItem('userId'),
            }
            /*请求数据*/
            this.$api.post('/Appinterface/userInfo?',_self.getParams,_self.headersData,function(rs) {
                _self.data = rs.data[0];
                _self.data.ors = rs.data[0].ors[0]

                // console.log(rs);
            })

        },
		methods: {
			back () {
				this.$router.go(-1);
			},
            setmd5(key){
                var md5 = this.$crypto.createHash("md5");
                md5.update('sessionId='+ this.getParams.sessionId +'&thirdParty=1&userId='+ this.getParams.userId +'&key='+ key +''); //这个是 排序加密
                var d= md5.digest('hex').toUpperCase();
                console.log(d);
                return d;
            }
		},
   		components:{
   			FooterComponent
   		} 
	}
</script>

<style>
	
	.user-ifon .user-list-flow{
		flex-grow: 0.8;
	}
	

	.user-opreation-list {
		padding: 0 0.4rem;
		padding-top: .2rem;
		padding-right: 0;
	}

	.user-opreation-list li span{
		font-size: .36rem;
	}

</style>
