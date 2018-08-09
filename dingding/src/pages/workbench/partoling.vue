<template>
    <div class="wrapper">
        <!-- 顶部导航栏 -->

        <div class="pl-content">

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
                <input type="text" readonly="readonly" name="" v-model="todo.taskName">
                <div class="select">
                    <span @click="choosePointLocation('selectTask')">请选择</span>
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
        <div class="subtn">
            <button class="btn btn-blue mb-list border-radius" @click="endpPatrol('endPartol')">结束巡更</button>
        </div>
    </div>
</template>
<script>

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
                title: '巡更中',
                taskName: '',
                taskId: ''
            }

            let pointListS;

            if (this.$storage.getItem('pointListS')) {
                pointListS = JSON.parse(this.$storage.getItem('pointListS'));
            } else {
                pointListS = new Array();
            }
            return {
                isTime: false,
                imgUrl: imgUrls,
                item: items,
                todo: todos,
                list: [],
                state: '',
                pointListS: pointListS,
                pointIdA: [],
            }
        },
        created() {

            let _self = this;
            this.$setTitle(this.todo.title);
            this.item.staffName = this.$storage.getItem('staffName') || this.item.staffName;
            this.item.position = this.$storage.getItem('position') || this.item.position;

            this.init();
        },
        methods: {
            init() {
                this.todo.taskName = this.$storage.getItem('taskName');
                this.todo.taskId = this.$route.query.id;
                this.$storage.setItem('taskId', 0)
                this.$storage.setItem('pointList', '[]');
                if (this.$route.query.id) {
                    this.getPointList();
                }
                this.getNfc();
            },
            getNfc() {
                var _self = this;

                _self.$setNfc(function (rs) {

                    if (rs.errorCode == 3) {
                        _self.$toast('设备不支持NFC, 请更换设备');
                        return false;
                    }

                    _self.todo.pointId = rs.tagId.replace(/:/g, '');

                    let pointList = {
                        pointId: rs.tagId.replace(/:/g, ''),
                        inspecTime: _self.$api.formats(),
                        result: '1',
                        remark: '正常'
                    };
                    _self.getNetworkType(function () {
                        if (_self.state) {

                            _self.changePointState(_self.todo.pointId, function () {

                                if(_self.pointListS.length == 0){
                                    _self.pointListS = [pointList]
                                } else {
                                    _self.pointListS.push(pointList)
                                    _self.pointListS = _self.$pointDistinct(_self.pointListS)
                                }
                                _self.uplodPointInfo(_self.pointListS);
                            });
                        } else {
                            _self.changePointState(_self.todo.pointId, function () {
                                _self.pointListS.push(pointList);
                                _self.pointListS = _self.$pointDistinct(_self.pointListS);
                                _self.$storage.setItem('pointListS', JSON.stringify(_self.pointListS));
                                _self.getNfc();
                            });
                        }

                    });

                })
            },
            getNetworkType(fn) {
                let _self = this;
                _self.$getNetwork(function (rs) {
                    if (rs.result === '4g' || rs.result === 'wifi' || rs.result === '4G') {
                        _self.state = true;
                    } else {
                        _self.$toast('不在4g网络或wifi,进入离线打卡模式');
                        _self.state = false;
                    }
                    fn()
                });
            },
            changePointState(rs, fn) {
                let _self = this;
                if (JSON.stringify(_self.list).indexOf(rs) === -1) {
                    _self.$toast('点位不存在');
                    _self.getNfc();
                    return false;
                }

                for (let i = 0; i <= _self.list.length; i++) {
                    if (rs === _self.list[i].pointId) {
                        if (_self.list[i].pointState === 'Y') {
                            _self.isTime = true;
                            let curTime = new Date(_self.list[i].completeTime);
                            let curMin = curTime.getMinutes();
                            curTime.setMinutes(curMin + 5);

                            if (curTime.getTime() <= new Date().getTime()) {
                                _self.isTime = false;
                            }

                            if (_self.isTime) {
                                _self.$toast('此点位已经打卡，请5分钟后再操作');
                                _self.getNfc();
                                return false;
                            } else {
                                _self.list[i].completeTime = _self.$api.formats();
                                _self.$storage.setItem('pointList', JSON.stringify(_self.list));
                                fn();
                            }
                        } else {
                            _self.list[i].pointState = 'Y';
                            _self.list[i].completeTime = _self.$api.formats();
                            _self.$storage.setItem('pointList', JSON.stringify(_self.list));
                            fn();
                        }
                    }
                }
            },
            readPointListS() {
                let _self = this;

                if (_self.pointListS.length > 0) {
                    for (let i = 0; i <= _self.pointListS.length; i++) {
                        let pointId = _self.pointListS[i].pointId;

                        for (let j = 0; j <= _self.list.length; j++) {
                            let pointIdS = _self.list[j].pointId;

                            if (pointId == pointIdS) {
                                _self.list[j].completeTime = _self.pointListS[i].inspecTime;
                                _self.list[j].pointState = 'Y';
                                break;
                            }
                        }
                    }
                }
            },
            choosePointLocation(url) {
                let _self = this;
                this.$storage.setItem('type', '0')
                _self.$router.push(url);

            },
            endpPatrol(url) {
                let _self = this;
                let params = {
                    token: _self.$storage.setItem('token'),
                    signId: _self.$storage.getItem('signId'),
                    outTime: _self.item.currTime,
                    thirdParty: 1
                }
                this.$api.post('/dian/app/signOutPatrol', params, '', function (res) {

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

                params.resultList = [{
                    taskId: _self.todo.taskId,
                    completeTime: '',
                    listData: '',
                }];
                params.resultList[0].listData = pointList;
                if (JSON.stringify(_self.list).indexOf('"pointState":"N"') === -1) {
                    params.resultList[0].completeTime = _self.$api.formats();
                }


                this.$api.post('/dian/app/patrolPunchCard', params, '', function (res) {

                    _self.$toast(res.errmsg);

                    if (JSON.stringify(_self.list).indexOf('"pointState":"N"') === -1) {
                        _self.$toast('打卡已完成');
                    }
                    setTimeout(function () {
                        _self.$storage.setItem('pointListS', '[]');
                        _self.pointListS = new Array();
                        _self.getNfc();
                    }, 0)

                })
            },
            getPointList() {

                let _self = this;
                let params = {
                    token: this.$storage.getItem('token'),
                    taskId: _self.todo.taskId,
                    thirdParty: 1
                }
                let index = _self.todo.taskId;

                this.$api.post('/dian/app/isStart', params, '', function (res) {
                    if (res.errcode == 200) {
                        _self.list = res.data.listData;
                        _self.readPointListS();
                        _self.$storage.setItem('pointList', JSON.stringify(_self.list));
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

                if (!value) return ''
                if (value == "N") {
                    value = '未检'
                } else {
                    value = '已检'
                }
                return value
            }
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

    .partol-table {
        height: 7rem;
        overflow-y: scroll;
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
