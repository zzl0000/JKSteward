<template>
    <div class="wrapper">
        <div class="pl-content">
            <!-- 操作列表 -->
            <div class="user-opreation-list b-white mb">
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
                        <span class="td-color">签到时间</span>
                        <span class="">{{item.signTime}}</span>
                    </li>
                    <li class="boder-bottom">
                        <span class="td-color">签退时间</span>
                        <span class="">{{item.currTime}}</span>
                    </li>
                    <li class="boder-bottom">
                        <span class="td-color">本次完成巡更点位数</span>
                        <span class="">{{pointLength}}</span>
                    </li>
                    <li class="boder-bottom">
                        <span class="td-color">本次未检位数</span>
                        <span class="t-red-color">{{noPointLength}}</span>
                    </li>
                </ul>
            </div>

        </div>
        <div class="subtn">
            <button class="btn btn-blue mb-list border-radius" @click="jump('patrolSystem')">退出</button>
        </div>
    </div>
</template>
<script>
    import FooterComponent from '../../components/footercomponent.vue';

    export default {
        name: 'workbench',
        data() {
            let imgUrls = [
                './static/img/partol-bg.png',
                './static/img/equipment-icon.png',
            ];
            let items = {
                staffName: '',
                position: '',
                currTime: this.$api.formats(),
                signTime: this.$storage.getItem('signTime'),
            };
            return {
                imgUrl: imgUrls,
                item: items,
                pointLength: 0,
                noPointLength: 0,
            }
        },
        created() {

            this.$setTitle('结束巡更');
            this.item.staffName = this.$storage.getItem('staffName');
            this.item.position = this.$storage.getItem('position');

            let arr = []
            if (this.$storage.getItem('pointList')) {
                arr = JSON.parse(this.$storage.getItem('pointList'));
            } else {
                arr = []
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].pointState === 'N') {
                    this.noPointLength++;
                } else {
                    this.pointLength++;
                }
            }

        },
        methods: {

            jump(url) {
                let _self = this;
                _self.$toast('成功')
                _self.$storage.setItem('pointLength', 0);
                _self.$storage.setItem('taskId', 0)
                _self.$storage.setItem('type', '2');
                _self.$storage.setItem('pointListS', '[]')
                _self.$storage.setItem('signId', 'undefined');
                setTimeout(function () {
                    _self.$router.push(url);
                }, 2001)
            }

        },
        components: {
            FooterComponent
        }
    }
</script>

<style>


</style>
