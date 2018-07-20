<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
		<div class="content staff"  v-if="isComplete == 0">
			<div class="b-white">
				<div class="form-group boder-bottom">
					<label>姓名</label>
					<input type="text" class="" v-model="username" readonly>
				</div>
				<div class="form-group boder-bottom">
					<label>手机号</label>
					<input type="text" class="" v-model="peopleData.phone" readonly>
				</div>
				<div class="form-group boder-bottom">
					<label>职位</label>
					<input type="text" class="" v-model="peopleData.fax" readonly>
				</div>
				<div class="form-group boder-bottom">
					<label>所属项目</label>
					<input type="text" class="" v-model="peopleData.org" readonly>
				</div>
				<div class="form-group boder-bottom">
					<label>安全管理</label>
					<input type="text" class="" v-model="peopleData.scene" readonly>
				</div>
			</div>
			<!-- 同意& 删除 -->
			<div class="operation">
				<button class="btn btn-blue border-radius" v-if="status == 'N'" @click="agree"> 同意 </button>
				<button class="btn b-white border-radius t-gray-color " @click="del"> 删除 </button>
			</div>
		</div>
	</div>
</template>
<script>
    import selectItem from '../../components/selectItem.vue';
    import selectSector from '../../components/selectSector.vue';
	export default {
		name:'staffList',
		data (){
            let params = {
                sessionId: this.$storage.getItem('sessionId'),
                thirdParty:1,
                userId: this.$storage.getItem('userId'),
                userTargetId:this.$route.query.id
            };
			return{
                isComplete:0,
                params : params,
                headersData:[],
				peopleData:'',
				username:'',
                status:'',
			}
		},
		created: function(){
		    var _self = this;
            _self.$setTitle('人员信息');
            _self.username = _self.$route.query.name;
            _self.status = _self.$route.query.status;
            _self.headersData = {
                signature:_self.setmd5(_self.$storage.getItem('signature'),_self.params),
                uid:_self.$storage.getItem('userId'),
            }
            // 获取审核人员 详情
            _self.$api.post('/Appinterface/userDetail',_self.params,_self.headersData,function(rs) {
                _self.peopleData = rs.data.obj
            })
		},
		methods: {
			back () {
				this.$router.go(-1);
			},
            agree() {
                var _self = this;
				this.$confirm('是否确定同意'+ this.username +'!',function (rs) {
					if(rs == '确定'){
                        let params = {
                            controlType:'check',
                            pass:'true',
                            sessionId: _self.$storage.getItem('sessionId'),
                            thirdParty:1,
                            userId: _self.$storage.getItem('userId'),
                            userTargetId:_self.$route.query.id
                        };
                        let headersData ={
                            signature:_self.setmd5(_self.$storage.getItem('signature'), params),
                            uid:_self.$storage.getItem('userId'),
                        }
                        _self.$api.post('/Appinterface/UserCheckDelete',params,headersData,function(rs) {
                            if(rs.errcode == 1){
                                _self.$toast(rs.errmsg)
                                setTimeout(function () {
                                    _self.$router.go(-1);
                                },300)
                            }
                        })
					}
                })
			},
            del() {
			    var _self = this;
                this.$confirm('是否确定删除'+ this.username +'!',function (rs) {
                    if(rs == '确定'){
                        let params = {
                            controlType:'delete',
                            sessionId: _self.$storage.getItem('sessionId'),
                            thirdParty:1,
                            userId: _self.$storage.getItem('userId'),
                            userTargetId:_self.$route.query.id
						};
                        let headersData ={
                            signature:_self.setmd5(_self.$storage.getItem('signature'), params),
                            uid:_self.$storage.getItem('userId'),
						}
                        _self.$api.post('/Appinterface/UserCheckDelete',params,headersData,function(rs) {
                           if(rs.errcode == 1){
                               _self.$toast(rs.errmsg)
								setTimeout(function () {
                                    _self.$router.go(-1);
                                },300)
						   }
                        })
                    }
                })
			},
            setmd5(key,params){
                var _self = this;
                var md5 = _self.$crypto.createHash("md5");
                md5.update(_self.$urlEncode(params).substring(1) + '&key='+ key +''); //这个是 排序加密
                var d= md5.digest('hex').toUpperCase();
                console.log(d);
                return d;
            }
		}
	}
</script>

<style>
	.staff .form-group{
		padding:.25rem;
		display: flex;
		flex-flow: initial;
		align-items: center;
	}
	.staff .form-group label{
		width: 25%;
		text-align: left;
		color: #999999;
	}
	.staff .form-group input{
		width: 75%;
		text-align: right;
		align-self: flex-end;
		font-size: .40rem;
		color: #333333;
	}
	.staff .form-group .img{
		flex-grow: 0;
		width: .24rem;
		height: .42rem;
	}

	.staff .operation{
		margin: 0 .5rem;
		top: 3.5rem;
		flex-flow: nowrap;
		justify-content: space-between;

	}
	.staff .operation button{
		width: 100%;
		margin: .2rem;
		display: flex;
		justify-content: center;
	}
</style>
