<template>
    <div class="wrapper">

        <div class="content">
            <div class="b-white">
                <ul>
                    <li v-for="item in  items" @click.stop="select(item.taskId,item.taskName +' '+ item.startTime +' '+ item.endTime)"
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
        props: ['postUrl'],
        data() {
            return {
                items: '',
                url: this.postUrl,
            }
        },
        created: function () {

            let _self = this;

            let params = {
                token: this.$storage.getItem('token'),
                projectId: this.$storage.getItem('projectId'),
                thirdParty: 1
            }
            this.$api.post('/dian/app/' + this.postUrl, params,'', function (res) {
                if (res.errcode == 200) {
                    _self.items = res.data.listData
                } else {
                    modal.toast({
                        message: res.errmsg,
                        duration: 2
                    })
                }
            })
        },
        methods: {
            select(id, pointName) {
                this.$emit('fn', {id, pointName});
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