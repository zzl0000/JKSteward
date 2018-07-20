<template>
    <div class="wrapper mt-none select_item">
        <div class="content">
            <!-- 请选择所属项目 -->
            <div class="b-white">
                <div class="search boder-bottom">
                    <div class="search-control">
                        <div class="img"><img src="../../static/img/search-icon.png" height="23" width="23"></div>
                        <div class="form-group">
                            <input type="text" name="" placeholder="请输入所属项目">
                        </div>
                        <button>搜索</button>
                    </div>
                </div>
                <div class="search-list">
                    <ul>
                        <li v-for="item in  items" v-if="item.type == 1"  @click="select(1,item.id,item.name)" class="pd-list boder-bottom">
                            {{item.name}}
                        </li>
                        <li v-for="item in  items" v-if="item.type == 0"  @click="query(item.id)" class="pd-list boder-bottom">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'select',
        data() {
            let params = {
                parentId: '',
                key: '',
                flag: '',
                thirdParty: 1
            };
            let items = [];
            return {
                items: items,
                params: params,
            }
        },
        created: function () {
            var _self = this;
            _self.$setTitle('请选择所属项目');
            // 获取项目列表
            _self.$api.post('/Appinterface/XMList', _self.params, '', function (rs) {
                _self.items = rs.data.listObj

            })

        },
        methods: {
            select(key, id, text) {
                this.$emit('fn', {key, id, text});
            },
            query(parentId) {
                let _self = this;
                _self.params.parentId = parentId;
                _self.$api.post('/Appinterface/XMList', _self.params, '', function (rs) {
                    _self.items = rs.data.listObj
                })
            }
        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$router': 'getParams',
        }
    }
</script>

<style>
    .select_item {
        height: 100%;
    }

    .select_item .content {
        height: calc(100vh - 0.4rem);
        overflow-y: scroll;
        padding-bottom: 1.5rem;
    }

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