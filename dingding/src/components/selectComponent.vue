<template>
    <div class="wrapper">

        <div class="content">
            <div class="b-white">
                <ul v-if="isComplete == false">
                    <li  v-for="item in  items" @click.stop="select(item.taskId,item.taskName)"
                        class="pd-list boder-bottom">{{item.taskName}}
                    </li>

                </ul>
                <ul  v-else>
                    <li  v-for="item in  items" @click.stop="select(item.pointId,item.pointName)"
                         class="pd-list boder-bottom">{{item.pointName}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { setLeft } from '../lib/util.js';
    export default {
        name: 'select',
        props: ['postUrl'],
        data() {
            return {
                items: '',
                url: this.postUrl,
                isComplete:false
            }
        },
        created: function () {

            if( this.postUrl == 'getPointList'){
                this.isComplete = true;
            }else{
                this.isComplete = false;
            }
            let _self = this;


            let params = {
                token: this.$storage.getItem('token'),
                projectId: this.$storage.getItem('projectId'),
                thirdParty: 1
            }
            this.$api.post('/dian/app/' + this.postUrl + '?', params,'', function (res) {
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

    .search {
        padding: 0.2rem 0.4rem;
    }

    .search-control {
        background-color: #f5f5f7;
        border-radius: 0.1rem;
        flex-flow: initial;
        align-items: center;
        justify-content: space-between;
    }

    .search-control .form-group {
        flex-grow: 0.6;
        padding: .08rem 0;
    }

    .search-control .img {
        width: .46rem;
        height: .46rem;
        left: .25rem;
    }

    .search-control .form-group input {
        padding-left: .25rem;
        background: none;
    }

    .search-control button {
        width: 17%;
        border-left: 1px solid #c5c5c5;
        background: none;
        text-align: center;
        color: #999999;
        padding: .08rem 0;
    }

    figure {
        width: 100%;
        height: 100%;
    }


</style>