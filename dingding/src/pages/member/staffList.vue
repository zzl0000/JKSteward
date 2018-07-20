<template>
	<div class="wrapper">
		<!-- 顶部导航栏 -->
		<div class="content">
			<!-- 所属部门 -->
			<div v-for="item in sectionList" class="mb sector-select b-white pd-list">
				<div  class="sector-select-list">
					<span>{{item.name}}({{item.ulist.length}})</span>
					<div class="img"><img src="../../../static/img/advance-cion.png" height="32" width="18"></div>
				</div>
			</div>	
			<!-- 人员列表 -->
			<div class="member-list b-white mb">
				<ul>
					<li v-for="item in peopleList" @click="jump('staffAudit',item.id,item.nickName,item.checkStatus)">
						<span class="b-blues icon">{{item.nickName.substring(0,1)}}</span>
						<p class="boder-bottom">
							<span>{{item.nickName}}<em v-if="item.checkStatus == 'N'">待审核</em></span>
							<span class="td-color"></span>
						</p>
						
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name:'staffList',
		data (){
            let params = {
                sessionId: this.$storage.getItem('sessionId'),
                thirdParty:1,
                userId: this.$storage.getItem('userId')
            };
			return{
                params : params,
                headersData:[],
                sectionList:'',
                peopleList:'',
			}
		},
		created: function(){
		    var _self = this;
            _self.$setTitle('人员名单');
            _self.headersData = {
                signature:_self.setmd5(_self.$storage.getItem('signature')),
                uid:_self.$storage.getItem('userId'),
            }
            // 获取审核人员名单
            _self.$api.post('/Appinterface/checkUserList',_self.params,_self.headersData,function(rs) {
                _self.sectionList = rs.data.obj;
                _self.peopleList = rs.data.user;
            })
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			jump(url,id,name,status) {
                this.$router.push({path:url,  name:url,query: {id: id,name:name,status:status}})
			},
            setmd5(key){
                var _self = this;
                var md5 = _self.$crypto.createHash("md5");
                md5.update(_self.$urlEncode(_self.params).substring(1) + '&key='+ key +''); //这个是 排序加密
                var d= md5.digest('hex').toUpperCase();
                console.log(d);
                return d;
            }
		}
	}
</script>

<style>
	.member-list-list {
		padding: 0 0.4rem;
		padding-top: .2rem;
		padding-right: 0;
	}

	.member-list ul{
	}

	.member-list ul li {
		display: flex;
		flex-flow: nowrap;
		justify-content: space-between;
		align-items: center;
		padding-left: .4rem;
	}

	.member-list ul li p {
		width: 100%;
		display: flex;
		flex-flow: nowrap;
		justify-content: space-between;
		align-items: center;
		padding: .4rem 0.2rem;
		padding-right: .4rem;
	}

	.member-list ul li p span{
		font-size: .39rem;
	}

	.member-list ul li p span em{
		position: relative;
		left: 0.30rem;
		font-size: .30rem;
		padding: 0.05rem 0.15rem;
		background-color: #45a4f2;
		border-radius: 0.05rem;
		color: white;
	}

	.member-list li span.icon{
		display:flex;
    	align-items:center;
    	justify-content: center;
		width: .82rem;
		height: .82rem;
		border-radius: 50%;
		text-align: center;
		color: white;
		font-size: .30rem;
	}

	.sector-select .sector-select-list{
		display: flex;
		flex-flow: nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.sector-select .sector-select-list .img{
		flex-grow: 0;
		width: .24rem;
		height: .42rem;
	}

</style>
