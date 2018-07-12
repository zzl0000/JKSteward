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
                    <span  @click="choosePointLocation">请选择</span>
                    <div class="img"><img src="/static/img/advance-cion.png" height="32" width="18"></div>
                </div>

            </div>
            <!-- 巡更 table -->

            <div class="partol-table pd-list b-white">
                <table class="table">
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
        <!-- 抢单块 -->

        <div class="qd-content" v-if="todo.isComplete == false" @click="jump('addPrtol')">
            <div class="b-bule">
                <span>巡检登记</span>
            </div>
        </div>

        <!-- 悬浮块 -->
        <div class="subtn" v-if="todo.isComplete == false">
            <button class="btn btn-blue mb-list border-radius" @click="endpPatrol('patrolSystem')">结束巡更</button>
        </div>

        <selectComponent v-on:fn="hidePanel" v-else post-url="getTaskInfo"></selectComponent>

    </div>
</template>
<script>
    import selectComponent from '../../components/selectComponent.vue';

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
                pointId: ''
            }
            return {
                imgUrl: imgUrls,
                item: items,
                todo: todos,
                list: ''
            }
        },
        created() {
            this.$setTitle(this.todo.title)
            this.item.staffName = this.$storage.getItem('staffName') || this.item.staffName;
            this.item.position = this.$storage.getItem('position') || this.item.position;
        },
        methods: {
            jump (url) {
                this.$router.push({path:url,  name:url})
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
                this.todo.pointId = rs.Id;
                this.$setTitle(this.todo.title)
                this.getPointList(rs);
            },
            endpPatrol(url) {
                let _self = this;
                const modal = weex.requireModule('modal');
                let params = {
                    token: _self.$storage.getItem('token'),
                    signId: _self.$storage.getItem('signId'),
                    outTime: _self.item.currTime,
                    thirdParty: 1
                }
                this.$api.post('/dian/app/signOutPatrol', params, function (res) {
                    console.log(res);
                    if (res.errcode == 200) {
                        //存储 Token 及用户信息
                        modal.toast({
                            message: res.errmsg,
                            duration: 2
                        })
                        setTimeout(function () {
                            _self.$router.push(url);
                        }, 2001)
                    } else {
                        modal.toast({
                            message: res.errmsg,
                            duration: 2
                        })
                    }
                })
            },
            getPointList(rs){
                //console.log(id)
                let _slef = this;
                let params = {
                    token: this.$storage.getItem('token'),
                    taskId:rs.id,
                    thirdParty:1
                }
                this.$api.post('/dian/app/isStart', params, function (res) {
                    console.log(res);
                    if (res.errcode == 200) {
                        _slef.list = res.data.listData
                    } else {
                        modal.toast({
                            message: res.errmsg,
                            duration: 2
                        })
                    }
                })
            }
        },
        filters: {
            capitalize: function (value) {
                console.log(value)
                if (!value) return ''
                if(value == "N"){
                    value = '已检'
                }else{
                    value = '未检'
                }
                return value
            }
        },
        components: {
            selectComponent
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

    .qd-content{
       bottom: 2.8rem;
    }

    .qd-content span{
        width: 50%;
        font-size: .36rem;
        text-align: center;
    }


</style>
