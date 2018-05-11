<template>
    <div class="wrapper">
        <!-- 顶部导航栏 -->
        <div class="top-nav mb b-white ">
            <div class="back" @click="back(todo.isComplete)"><img src="/static/img/back-icon.png" height="36" width="20"></div>
            <div class="top-title"><span>{{todo.title}}</span></div>
            <div class="replacePL" @click="jump('')"><span class="">巡检登记</span></div>
        </div>

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
                <input type="text" readonly="readonly" name="">
                <div class="select" @click="choosePointLocation">
                    <span>请选择</span>
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
                    <tr>
                        <td>1号点位</td>
                        <td>9.15.22</td>
                        <td>已检</td>
                    </tr>
                    <tr>
                        <td>2号点位</td>
                        <td>9.15.22</td>
                        <td>已检</td>
                    </tr>
                    </tbody>
                </table>
            </div>


        </div>

        <!-- 悬浮块 -->
        <div class="subtn">
            <button class="btn btn-blue mb-list border-radius" @click="endpPatrol('patrolSystem')">结束巡更</button>
        </div>
        <!--<selectComponent v-on:fn="hidePanel" v-else v-bind="todo"></selectComponent>-->
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
                isComplete:false,
                title:'巡更中',
                pointName:'请选择需要替换的点位名称',
                pointId:''
            }
            return {
                imgUrl: imgUrls,
                item: items,
                todo : todos
            }
        },
        created() {
            this.item.staffName = this.$storage.getItem('staffName') || this.item.staffName;
            this.item.position = this.$storage.getItem('position') || this.item.position;
        },
        methods: {
            back(type) {
                if(type){
                    this.todo.isComplete = false;
                    this.title = '巡更中';
                }else{
                    this.$router.go(-1);
                }
            },
            choosePointLocation() {
                this.todo.isComplete = true;
                this.title = '巡更任务';
            },
            hidePanel(rs) {
                console.log(rs);
                this.todo.isComplete = false;
                this.title = '巡更中';
                this.todo.pointName = rs.pointName;
                this.todo.pointId = rs.Id;
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
            }
        },
        components:{
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


</style>
