<template>
    <div class="wrapper">
        <!--<div class="replacePL" @click="jump('replacePrtol')"><span class="">替换点位</span></div>-->
        <div class="pl-content b-white">

            <!-- 巡更列表 -->
            <div class="partol-list m-list  pd-list b-gray">
                <div class="partol-list-title">
                    <span class="td-color">所在项目| </span>
                    <span>{{this.orgName}}</span>
                </div>
                <ul>
                    <li v-for="item in  taskItems" v-if="item.state == 3">
                        <label>漏检</label>
                        <div class="space-between" @click="detail('missingLoaction', item.pointList)">
                            <span class="tips">8个</span>
                            <p class="td-color">{{item.taskName}} {{item.startTime.substring(10)}} {{item.endTime.substring(10)}}</p>
                            <div class="img"><img src="../../../static/img/advance-cion.png" height="32" width="18">
                            </div>
                        </div>
                    </li>
                    <li v-for="item in  taskItems" v-if="item.state == 1">
                        <label>已完成</label>
                        <div>
                            <span></span>
                            <p class="td-color">{{item.taskName}} {{item.startTime.substring(10)}} {{item.endTime.substring(10)}}</p>
                        </div>
                    </li>
                    <li v-for="item in  taskItems" v-if="item.state == 2">
                        <label>进行中</label>
                        <div>
                            <span></span>
                            <p class="td-color">{{item.taskName}} {{item.startTime.substring(10)}} {{item.endTime.substring(10)}}</p>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 巡更 table -->

            <div class="partol-table pd-list b-white">
                <table class="table">
                    <thead>
                    <tr>
                        <th>点位名称</th>
                        <th>今日巡检次数</th>
                        <th>本月巡检次数</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in  items">
                        <td>{{item.pointName}}</td>
                        <td>{{item.todayNum}}</td>
                        <td>{{item.monthNum}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>


        </div>

        <!-- 悬浮块 -->

        <div class="qd-content">
            <div class="b-bule" v-on:click="jump('addPrtol')">
                <span>添加</span>
            </div>
        </div>
        <!-- 悬浮块 -->

        <div class="qd-content qd-content2">
            <div class="b-bule" v-on:click="jump('replacePrtol')">
                <span>替换</span>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'pointLocation',
        data() {
            let imgUrls = [
                '/static/img/partol-bg.png',
                '/static/img/equipment-icon.png',
            ];
            return {
                items: '',
                taskItems: '',
                imgUrl: imgUrls,
                orgName: this.$storage.getItem('orgName')
            }
        },
        created() {
            var _self = this;
            this.$setTitle('巡更点位管理');
            // 获取点位信息
            let params = {
                token: _self.$storage.getItem('token'),
                projectId: _self.$storage.getItem('projectId'),
                thirdParty: 1
            };
            this.$api.post('/dian/app/getPointList', params, '', function (res) {
                if (res.errcode == 200) {
                    //console.log(res)
                    _self.items = res.data.listData
                }
            });

            // 获取各个状态的任务列表

            this.$api.post('/dian/app/getTimeOutTask', params, '', function (res) {
                if (res.errcode == 200) {
                    _self.taskItems = res.data;
                    console.log(_self.taskItems)
                }
            })


        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            jump(url, id) {
                this.$router.push({path: url, name: url, query: {id: id}})
            },
            detail(url, pointList) {
                this.$router.push({path: url, name: url});
                this.$storage.setItem('pointList',JSON.stringify(pointList))
            }

        }
    }
</script>

<style>

    .replacePL {
        position: absolute;
        right: .30rem;
        top: 0.4rem;
        z-index: 100;

    }

    .replacePL span {
        color: #38acff;
    }

    .partol-list {
    }

    .partol-list-title {
        flex-flow: nowrap;
    }

    .partol-list ul {
        display: flex;
        flex-flow: wrap;
        height: 3.5rem;
        overflow-y: scroll;
        padding-top: .6em;
    }

    .partol-list ul li {
        display: flex;
        flex-flow: nowrap;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding-top: .25rem;
        padding-bottom: .25rem;
    }

    .partol-list ul li span.tips {
        padding: 0.05rem .10rem;
        background-color: #f09a71;
        color: white;
        border-radius: 0.05rem;
        font-size: .39rem;
    }

    .partol-list ul li div {
        flex-flow: nowrap;
        flex-grow: 0.8;
        justify-content: flex-start;
        align-items: center;
    }

    .partol-list ul li div.space-between {
        justify-content: space-between;
    }

    .partol-list ul li div p {
        padding-left: .25rem;
        font-size: .36rem;
        flex-grow: 0.8;
    }

    .partol-list ul li div .img {
        flex-grow: 0;
        width: .24rem;
        height: .42rem;

    }

    .qd-content2 {
        bottom: 1rem;
        z-index: 1;
    }


</style>
