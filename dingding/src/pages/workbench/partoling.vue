<template>
    <div class="wrapper">
        <!-- 顶部导航栏 -->

        <div class="pl-content" v-if="todo.isComplete == false">

            <!-- 巡更人员信息 -->
            <div class="user-opreation-list b-white mb b-white">
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
            <!-- 巡更任务 -->
            <div class="partol-task b-white pd-list boder-bottom">
                <label>巡更任务</label>
                <input type="text" readonly="readonly" name="" v-model="todo.pointName">
                <div class="select">
                    <span @click="choosePointLocation">请选择</span>
                    <div class="img"><img src="../../../static/img/advance-cion.png" height="32" width="18"></div>
                </div>

            </div>
            <!-- 巡更 table -->

            <div class="partol-table pd-list b-white">
                <table class="table" cellpadding="0" cellspacing="0">
                    <thead>
                    <tr>
                        <th>点位名称</th>
                        <th>巡检时间</th>
                        <th>巡检状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in  list">
                        <td>{{item.pointName}}</td>
                        <td>{{item.completeTime}}</td>
                        <td>{{item.pointState | capitalize}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <!--&lt;!&ndash; 抢单块 &ndash;&gt;-->

        <!--<div class="qd-content" v-if="todo.isComplete == false" @click="jump('addPrtol')">-->
        <!--<div class="b-bule">-->
        <!--<span>巡检登记</span>-->
        <!--</div>-->
        <!--</div>-->

        <!-- 悬浮块 -->
        <div class="subtn" v-if="todo.isComplete == false">

            <button class="btn btn-blue mb-list border-radius" @click="endpPatrol('patrolSystem')">结束巡更</button>
        </div>

        <selecTask v-on:fn="hidePanel" v-else post-url="getTaskInfo"></selecTask>

    </div>
</template>
<script>
    import selecTask from '../../components/selecTask.vue';

    export default {
        name: 'workbench',
        data() {
            let imgUrls = [
                '/static/img/partol-bg.png',
                '/static/img/equipment-icon.png',
            ];
            let items = {
                staffName: '王小二',
                position: '值班班长',
                currTime: this.$api.formats()
            };
            let todos = {
                isComplete: false,
                title: '巡更中',
                pointName: '',
                taskId: ''
            }
            return {
                imgUrl: imgUrls,
                item: items,
                todo: todos,
                list: [],
                state: '',
                pointListS: [],
            }
        },
        created() {
            this.$setTitle(this.todo.title);
            this.item.staffName = this.$storage.getItem('staffName') || this.item.staffName;
            this.item.position = this.$storage.getItem('position') || this.item.position;
            this.getNfc();
        },
        methods: {
            getNfc() {
                var _self = this;
               if(_self.list != undefined){
                   if(_self.list.length === 0){
                       return false;
                   }
               }
                _self.$setNfc(function (rs) {
                    // alert(JSON.stringify(rs));
                    if (rs.errorCode == 3) {
                        _self.$toast('设备不支持NFC, 请更换设备');
                        return false;
                    }
                    _self.changePointState(rs.tagId.replace(/':'/g,''));
                    _self.todo.pointId = rs.tagId.replace(/':'/g,'');
                    let pointList = {
                        pointId: rs.tagId.replace(/':'/g,''),
                        inspecTime: _self.$api.formats(),
                        result: '1',
                        remark: 'z正常'
                    };
                    _self.getNetworkType(function () {
                       // alert(_self.state)
                        if (_self.state) {
                            _self.pointListS.push(pointList);
                            _self.uplodPointInfo(_self.pointListS);
                        } else {
                            _self.pointListS.push(pointList);
                        }
                        _self.getNfc();
                    });

                })
            },
            getNetworkType(fn) {
                let _self = this;
                _self.$getNetwork(function (rs) {
                    // alert(JSON.stringify(rs))
                    if (rs.result == '4G' || rs.result == 'wifi') {
                        _self.state = true;
                    } else {
                        _self.state = false;
                    }
                    fn()
                });
            },
            changePointState(rs) {
                var _self = this;
                console.log(_self.list)
                if(_self.list.length === 0){
                     return false;
                }
                for(let i = 0; i <= _self.list.length; i++ ){
                    if(rs === _self.list[i].pointId){
                        _self.list[i].pointState = 'Y';
                    }
                }

            },
            choosePointLocation() {
                this.todo.isComplete = true;
                this.todo.title = '巡更任务';
                this.$setTitle(this.todo.title)
            },
            hidePanel(rs) {
                //console.log(rs);
                this.todo.isComplete = false;
                this.todo.title = '巡更中';
                this.todo.pointName = rs.pointName;
                this.todo.taskId = rs.Id;
                this.$setTitle(this.todo.title)
                this.getPointList(rs);
                this.getNfc();
            },
            endpPatrol(url) {

                let _self = this;
                let params = {
                    token: _self.$storage.getItem('token'),
                    signId: _self.$storage.getItem('signId'),
                    outTime: _self.item.currTime,
                    thirdParty: 1
                }
                this.$api.post('/dian/app/signOutPatrol', params, '', function (res) {
                    console.log(res);
                    if (res.errcode == 200) {
                        //存储 Token 及用户信息
                        _self.$toast(res.errmsg);
                        setTimeout(function () {
                            _self.$router.push(url);
                        }, 2001)
                    } else {
                        _self.$toast(res.errmsg)
                    }
                })
            },
            uplodPointInfo(pointList) {
                let _self = this;
                let params = {
                    token: _self.$storage.getItem('token'),
                    signId: _self.$storage.getItem('signId'),
                    projectId: _self.$storage.getItem('projectId'),
                    resultList: '',
                    thirdParty: 1
                };

                params.resultList = {
                    taskId: _self.todo.taskId,
                    completeTime: '',
                    listData: '',
                };
                params.resultList.listData = pointList;

                alert(JSON.stringify(params));

                this.$api.post('/dian/app/patrolPunchCard', params, '', function (res) {
                    //console.log(res);
                    _self.$toast(res.errmsg)
                })
            },
            getPointList(rs) {
                //console.log(id)
                let _slef = this;
                let params = {
                    token: this.$storage.getItem('token'),
                    taskId: rs.id,
                    thirdParty: 1
                }
                this.$api.post('/dian/app/isStart', params, '', function (res) {
                    //console.log(res);
                    if (res.errcode == 200) {
                        _slef.list = res.data.listData
                    } else {
                        _self.$toast(res.errmsg)
                    }
                })
            },
            jump(url) {
                this.$router.push({path: url, name: url})
            }

        },
        filters: {
            capitalize: function (value) {
                //console.log(value)
                if (!value) return ''
                if (value == "N") {
                    value = '未检'
                } else {
                    value = '已检'
                }
                return value
            }
        },
        components: {
            selecTask
        }
    }
</script>

<style>

    .partol-task {
        display: flex;
        flex-flow: nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .partol-task input {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #45a4f2;
    }

    .partol-task .select {
        flex-flow: nowrap;
        align-items: center;
    }

    .partol-task .select .img {
        flex-grow: 0;
        width: .21rem;
        height: .36rem;
        margin-left: .15rem;
    }

    .qd-content {
        bottom: 2.8rem;
    }

    .qd-content span {
        width: 50%;
        font-size: .36rem;
        text-align: center;
    }


</style>
