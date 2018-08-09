<template>
    <div class="wrapper">

        <div class="content">
            <div class="b-white">
                <ul>
                    <li  v-for="item in  items" @click.stop="select(item.pointId,item.pointName)"
                         class="pd-list boder-bottom">{{item.pointName}}
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
                url: 'getPointList',
                isComplete:false
            }
        },
        created: function () {

            let _self = this;

            _self.$setTitle('替换巡更点位');

            let params = {
                token: this.$storage.getItem('token'),
                projectId: this.$storage.getItem('projectId'),
                thirdParty: 1
            }
            this.$api.post('/dian/app/' + _self.url + '?', params,'', function (res) {
                if (res.errcode == 200) {
                    _self.items = res.data.listData
                } else {
                    modal.toast({
                        message: res.errmsg,
                        duration: 2
                    })
                }

            });
           
        },
        methods: {
            select(id, pointName) {
                this.$router.push({ path:'replacePrtol',  name:'replacePrtol', query: {id: id,pointName:pointName }});
                this.$storage.setItem('type','1')
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