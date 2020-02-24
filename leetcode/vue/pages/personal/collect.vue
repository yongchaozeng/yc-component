<template>
    <div class="collect-container">
        <div class="com-form-tabs" v-if="collectionType">
            <span class="com-form-tab active" v-for="(item,index) in collectionType" v-if="index === 1" :key="index"
            >{{item.label}}</span>
        </div>
        <div class="collect-list-head">
            <p class="name-text">班级名称</p>
            <p class="time-text">收藏时间</p>
            <p class="handle-text">操作</p>
        </div>
        <ul class="collect-list-main">

            <template v-if="infoShow === true">
                <li class="collect-list" v-for="(item,index) in classGradeList" @click="toDetails(item,index)"
                    :key="index">
                    <div class="collect-info">
                        <img class="img" :src="item.img" alt="">
                        <div class="collect-info-text">
                            {{item.name}}
                        </div>
                    </div>
                    <div class="collect-time">
                        {{item.collection_time}}
                    </div>
                    <div class="collect-handle">
                        <pc-button @click.stop="deleteCollection(item,index)" class="button" height="30" radius>取消收藏
                        </pc-button>
                    </div>
                </li>
            </template>
            <no-info v-else-if="infoShow === false"></no-info>

        </ul>
        <pc-page class="page-box" v-if="total>6" :current="page_no" :page-size="page_size" @on-change="changePage"
                 :total="total"></pc-page>


    </div>
</template>

<script>
    import PcButton from '../../components/pc-button';
    import request from '../../axios/request';
    import PcPage from '../../components/pc-page';
    import NoInfo from "../../components/no-info";

    export default {
        name: 'collect',
        components: {NoInfo, PcPage, PcButton},
        data() {
            return {
                infoShow: null,
                activeIndex: 2,
                collectionType: null,
                informationList: [],
                page_no: 1,
                page_size: 6,
                total: 0,
                classGradeList: [],
            };
        },
        async created() {
            await this.getCollectionType();
            await this.getCollectionList();
        },
        methods: {
            async getCollectionType() {
                let data = await request.collectionType();

                if (data && data.data && data.data.select_list) {
                    this.collectionType = data.data.select_list;

                }
            },
            async getCollectionList() {
                let data = await request.collectionList(this.activeIndex, {
                    page_no: this.page_no,
                    page_size: this.page_size
                });
                if (data && data.data && data.data.list && data.data.total) {
                    this.total = data.data.total;
                    this.classGradeList = data.data.list;
                    this.infoShow = true;
                } else {
                    this.infoShow = false;
                }
            },
            toDetails(item, index) {
                this.$router.push({path: `/details?id=${item.class_id}`});
            },

            // 删除收藏
            async deleteCollection(item, index) {
                let data = await request.deleteCollectionList(item.id);
                this.$msg(data.msg, 'succeed');
                this.getCollectionList();

            },
            changePage(index) {
                this.page_no = index;
                this.getCollectionList();
            }

        },
    };
</script>

<style lang="less" scoped>
    .collect-container {
        width: 100%;
        /*background: #fff;*/

        .com-form-tabs {

            .com-form-tab {
                color: #21BA58;
            }
        }

        .com-form-head {
            text-align: center;
        }

        .collect-list-head {
            height: 40px;
            padding: 0 18px 0 30px;
            background: rgba(249, 249, 249, 1);
            .clear-both;

            .name-text {
                width: 555px;
                text-align: left;
            }

            .time-text, .handle-text {
                width: 154px;
                text-align: center;
            }

            p {
                display: inline-block;
                font-size: 14px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                line-height: 44px;
            }
        }

        .collect-list-main {
            height: 570px;
            padding: 0 23px 0 20px;
            background: @white;
            overflow: hidden;

            .collect-list {
                height: 74px;
                margin-top: 20px;
                border: 1px solid @gray;
                cursor: pointer;
                .clear-both;

                .collect-info {
                    float: left;
                    width: 569px;
                    padding: 12px 0 12px 24px;
                    line-height: 50px;
                    align-items: center;
                    .clear-both;

                    .img {
                        float: left;
                        width: 90px;
                        height: 50px;
                        border-radius: 5px;
                    }

                    .collect-info-text {
                        float: left;
                        margin-left: 11px;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);

                    }
                }

                .collect-time {
                    float: left;
                    width: 155px;
                    height: 100%;
                    text-align: center;
                    line-height: 72px;
                    border-left: 1px solid @gray;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                }

                .collect-handle {
                    float: left;
                    width: 155px;
                    height: 100%;
                    padding-top: 22px;
                    text-align: center;
                    border-left: 1px solid @gray;

                    .button {
                        width: 93px;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        line-height: 14px;
                        /*line-height:44px;*/
                        background: rgba(33, 186, 88, 1);
                    }
                }

            }

        }

        .page-box {
            float: right;
            margin-right: 16px;
        }
    }
</style>
