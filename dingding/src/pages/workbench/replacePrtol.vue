<template>
    <div class="wrapper">


        <div class="pl-content">
            <!-- 加载层 -->
            <div class="loading-layer">
                <div class="loading-bg img">
                    <img v-bind:src="imgUrl[0]" height="1206" width="750">
                </div>

                <div class="tips-layer">
                    <div class="tips-bg">
                        <div class="img"><img v-bind:src="imgUrl[1]" height="184" width="204"></div>
                        <p>
                            <span class="td-color">操作提示:请把手机贴近巡更点</span>
                            <span class="td-color min">巡更点ID:{{todo.newPoint}}</span>
                        </p>
                    </div>
                </div>

            </div>

            <!-- add pl form -->
            <div class="add-form mb-model border-radius">
                <div class="form-group">
                    <label>你所在的项目</label>
                    <input type="text" name="" v-model="orgName" readonly>
                </div>
                <div class="form-group" @click="choosePointLocation('selectPoint')">
                    <label>巡更点名称</label>
                    <p style="padding:0">
                        <span v-text="todo.pointName"></span>
                    <div class="img"><img src="../../../static/img/advance-cion.png" height="32" width="18"></div>
                    </p>

                </div>
                <div class="form-group">
                    <label>备注</label>
                    <input type="text" name="" v-model="remark" placeholder="请输入备注信息">
                </div>
            </div>
            <div class="subtn">
                <button class="btn btn-blue mb-list border-radius" v-on:click.prevent="submit()">保存</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'workbench',
        data() {
            let imgUrls = [
                './static/img/partol-bg01.png',
                './static/img/equipment-icon01.png'
            ];
            let todos = {
                title: '替换巡更点位',
                pointName: '请选择需要替换的点位名称',
                newPoint: '',
                oldPoint: ''
            };
            return {
                imgUrl: imgUrls,
                todo: todos,
                remark: '',
                tagId:'',
                orgName: this.$storage.getItem('orgName')
            }
        },
        created() {
            this.$setTitle(this.todo.title);
            this.init();
        },
        methods: {
            init() {
                this.todo.pointName = this.$route.query.pointName || this.todo.pointName;
                this.todo.oldPoint = this.$route.query.id || this.todo.oldPoint;
                this.todo.newPoint = this.$storage.getItem('tagId') || this.todo.newPoint;
                this.getNfc();
            },
            getNfc() {
                let _self = this;
                _self.$setNfc(function (rs) {
                    _self.$storage.setItem('tagId',rs.tagId.replace(/:/g, ''));
                    _self.todo.newPoint = rs.tagId.replace(/:/g, '');
                    _self.getNfc();
                })
            },
            choosePointLocation(url) {
                let _self = this;
                this.$storage.setItem('type','0')
                _self.$router.push(url)
            },
            submit() {
                let _self = this;
                let params = {
                    token: this.$storage.getItem('token'),
                    oldPoint: this.todo.oldPoint,
                    newPoint: this.todo.newPoint,
                    remark: this.remark,
                    thirdParty: 1
                };
                if (params.newPoint === '') {
                    return false;
                }
                this.$api.post('/dian/app/replacePoint', params, '', function (res) {

                    if (res.errcode == 200) {
                        _self.$toast(res.errmsg);
                        setTimeout(function () {
                            _self.$router.go(-1);
                        }, 3000)

                    } else {
                        _self.$toast(res.errmsg)
                    }
                })
            }

        }
    }
</script>

<style>
    .add-form {
        position: absolute;
        left: 0;
        bottom: 2.85rem;
        width: 92%;
        z-index: 101;
        background-color: #f6f3f1;
        opacity: 0.8;
        padding-left: .42rem;
    }

    .add-form .form-group {
        flex-flow: nowrap;
        align-items: center;
        padding: 0.3rem 0;
    }

    .add-form .form-group input {
        background: none;
        font-size: .42rem;
        color: #333333;
    }

    .add-form .form-group label {
        display: inline-block;
        text-align: right;
        width: 30%;
        margin-right: .26rem;
    }

    .add-form .form-group p {
        padding: .15rem;
    }

    .add-form .form-group p span {
        color: #333333;
        font-size: .42rem;
    }

    .add-form .form-group .img {
        flex-grow: 0;
        width: .24rem;
        height: .42rem;
        position: absolute;
        right: .35rem;

    }

    .add-form .form-group input::-webkit-input-placeholder {
        color: #333333;
    }


</style>