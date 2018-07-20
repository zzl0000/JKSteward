<template>
    <div class="wrapper">

        <div class="pl-content" v-if="isComplete == false">
            <!-- 巡检应用 -->
            <div class=" b-white mb">
                <div class="subnav boder-bottom">
                    <span class="title">巡检应用</span>
                </div>
                <ul class="apply-list">
                    <li v-for="item in  items" @click="jump(item.url)">
                        <div class="img"><img v-bind:src="item.imgurl"></div>
                        <span>{{item.title}}</span>
                    </li>
                </ul>
            </div>


            <!-- 常用应用 -->
            <div class=" b-white">
                <div class="subnav boder-bottom">
                    <span class="title">常用应用</span>
                </div>
                <ul class="apply-list">
                    <li>
                        <div class="img"><img v-bind:src="imgUrl[0]"></div>
                        <span>审批</span>
                    </li>
                    <li>
                        <div class="img"><img v-bind:src="imgUrl[1]"></div>
                        <span>通讯录</span>
                    </li>
                </ul>
            </div>
            <!-- 悬浮块 -->
            <div class="qd-content">
                <div class="b-bule" @click="amendItem()">
                    <span>修改项目</span>
                </div>
            </div>
        </div>

        <selectItem v-else-if="isComplete == true" v-on:fn="hidePanel"></selectItem>

        <FooterComponent></FooterComponent>
    </div>
</template>
<script>
    import selectItem from '../../components/selectItem.vue';
    import FooterComponent from '../../components/footercomponent.vue';

    export default {
        name: 'workbench',
        data() {
            let itemArray = [
                {
                    imgurl: './static/img/apply-icon01.png',
                    title: '工单池',
                    url: ''
                },
                {
                    imgurl: './static/img/apply-icon02.png',
                    title: '品质巡检',
                    url: ''
                },
                {
                    imgurl: './static/img/apply-icon03.png',
                    title: '巡更',
                    url: 'patrolSystem'
                },
                {
                    imgurl: './static/img/apply-icon04.png',
                    title: '设备巡检',
                    url: ''
                }
            ]

            let imgUrls = [
                './static/img/apply-icon05.png',
                './static/img/apply-icon06.png'];

            return {
                isComplete: false,
                items: itemArray,
                imgUrl: imgUrls,
                title: this.$storage.getItem('orgName')
            }
        },
        created: function () {
            let _self = this;
            _self.$setTitle(_self.title);

        },
        methods: {
            jump(url) {
                this.$router.push(url);
            },
            amendItem() {
                this.isComplete = true;
            },
            hidePanel(rs) {

                this.isComplete = 0;
                if (rs != '') {
                    {
                        this.$setTitle(rs.text);
                        this.$storage.setItem('projectId', rs.id);
                        this.$storage.setItem('orgName', rs.text);
                    }

                }
            }
        },
        components: {
            selectItem,
            FooterComponent
        }
    }
</script>

<style>
    .subnav {
        flex-flow: initial;
        padding: .4rem;
    }

    .apply-list {
        display: flex;
        flex-flow: wrap;
        height: auto;
        overflow: hidden;
    }

    .apply-list li {
        width: 33%;
        padding-top: .4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .apply-list li .img {
        width: 1rem;
        height: 1rem;

    }

    .apply-list li span {
        padding-top: .4rem;
        width: 100%;
        text-align: center;
        display: inline-block;
    }
</style>
