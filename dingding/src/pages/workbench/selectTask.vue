<template>
    <div class="wrapper">

        <div class="content">
            <div class="b-white">
                <ul>
                    <li v-for="item in  items"  @click.stop="select(item)"
                        class="pd-list boder-bottom">
                        <h5>{{item.taskName}}</h5>
                        <span class="time">
                            {{item.startTime}}到 {{item.endTime}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'select',
        data() {
            return {
                items: '',
                url:'getTimeOutTask',
            }
        },
        created: function () {
            this.$storage.setItem('type','0')
            let _self = this;
            this.$setTitle('巡更任务');

            let params = {
                token: this.$storage.getItem('token'),
                projectId: this.$storage.getItem('projectId'),
                thirdParty: 1
            };
            this.$api.post('/dian/app/' + _self.url, params,'', function (res) {
                if (res.errcode == 200) {
                    _self.items = res.data
                } else {
                    _self.$toast(res.errmsg);
                }
            });


        },
        methods: {
            select(rs) {
                let id = rs.taskId;
                let taskName = rs.taskName + rs.startTime +  rs.endTime;

                if(rs.state === 3){
                    this.$alert('当前巡更任务已超时');
                    return false
                }else if(rs.state === 1){
                    this.$alert('当前巡更任务已完成');
                    return false
                }
                else if(rs.state === 4){
                    this.$alert('当前巡更任务未开始');
                    return false
                }else {
                    this.$router.push({ path:'partoling',  name:'partoling', query: {id: id}});
                    this.$storage.setItem('type','1')
                    this.$storage.setItem('taskName',taskName)

                }
            }
        }
    }
</script>

<style>
    .pd-list h5{
        font-size: .40rem;
        margin: .1rem 0;
    }
    .pd-list span.time{
        color: #999999;
        font-size: .28rem;
    }

</style>