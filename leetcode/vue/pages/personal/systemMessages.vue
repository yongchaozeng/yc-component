<template>
    <div class="sys-message-container">
        <template v-if="!messageDetails">
            <div class="sys-message-head">
                <div class="msg-number">
                    <span>未读消息（{{number?number:0}}）</span>
                </div>
                <pc-button @click="readSystemMessageAll" class="msg-button" height="40" radius>
                    <img class="icon" src="../../assets/imgs/read-ll-icon.png" alt="">
                    <span>全部设置已读</span>
                </pc-button>
            </div>
            <template v-if="infoShow=== true">
                <div class="message-list-box">
                    <div class="message-list" @click="getMessageDetails(item,index)"
                         v-for="(item,index) in messageList" :key="index">
                        <div class="message-list-head">
                            <div class="title">
                                <img class="notification" src="../../assets/imgs/notification.png" alt="">
                                <span class="text">{{item.sys_msg_name}}</span>
                                <i class="com-dot" v-if="!item.is_see"></i>
                            </div>
                            <i class="sign com-triangle"></i>
                        </div>
                    </div>
                </div>
                <div class="page-box">
                    <pc-page :total="total" v-if="total>7" :current-page="page" :current="page"
                             @on-change="changePage"></pc-page>
                </div>
            </template>
            <no-info v-else-if="infoShow === false"></no-info>
        </template>
        <div class="content" v-else>
            <div class="back-up-box" @click="messageDetails=''">
                <span class="back-up icon iconfont">&#xe628;</span>
                <span>返回上一页</span>
            </div>
            <div v-html="messageDetails.msg_content"></div>
        </div>

    </div>
</template>

<script>
    import request from '../../axios/request';
    import PcButton from '../../components/pc-button';
    import PcPage from '../../components/pc-page';
    import NoInfo from "../../components/no-info";

    export default {
        /* 系统消息 */
        name: 'personalData',
        components: {NoInfo, PcPage, PcButton},
        data() {
            return {
                messageList: null, // 消息列表
                messageDetails: '', // 消息详情
                page: 1,
                total: 0,
                id: 0,
                number: 0,
                infoShow: null
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.getMessageList();
            },
            async getMessageNumber() {
                let data = await request.sysMessageNumber();
                if (data && data.data && data.data.sys_msg_info_not_see_num) {
                    this.number = data.data.sys_msg_info_not_see_num;
                }
            },
            // 获取列表
            async getMessageList() {
                let data = await request.systemMessageList({page_no: this.page, page_size: 7});
                if (data && data.data && data.data.list && data.data.total) {
                    this.messageList = data.data.list;
                    this.total = data.data.total;
                    this.getMessageNumber();
                    this.infoShow = true;
                } else {
                    this.infoShow = false;
                }
            },
            // 查看详情
            async getMessageDetails(item, index) {

                if (item.id === this.id) {
                    this.id = 0;
                    return;
                }
                this.id = item.id;
                let data = await request.systemMessageDetails(item.id);
                if (data && data.data && data.data.sys_msg_detail) {
                    this.messageDetails = data.data.sys_msg_detail;
                    this.getMessageList();
                }
            },
            // 全部已读
            async readSystemMessageAll() {
                let data = await request.readSystemMessageAll();
                this.getMessageList();
                this.$msg(data.msg);
            },
            changePage(page) {
                this.page = page;
                this.getMessageList();

            },
        },
    };
</script>

<style lang="less" scoped>
    .sys-message-container {
        position: relative;
        width: 100%;
        height: 100%;
        background: @white;
        padding: 15px 35px 15px 35px;
        border-top: 4px solid @baseColor;

        .sys-message-head {
            .clear-both;

            .msg-number {
                float: left;
                line-height: 40px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);

            }

            .msg-button {
                float: right;
                width: 136px;
                height: 40px;
                background: rgba(33, 186, 88, 1);
                font-size: 14px;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);

                .icon {
                    width: 18px;
                    height: 16px;
                    vertical-align: sub;
                }
            }
        }

        .message-list-box {
            overflow: auto;
            height: 585px;

            .message-list {
                padding: 30px 0;
                border: 1px solid transparent;
                border-bottom-color: @gray;
                font-size: 18px;
                font-weight: 300;
                color: rgba(51, 51, 51, 1);
                cursor: pointer;
                .clear-both;

                .message-list-head {
                    .clear-both;

                    .title {
                        position: relative;
                        float: left;
                        .clear-both;

                        .notification {
                            float: left;
                            width: 17px;
                            height: 14px;

                        }

                        .text {
                            float: left;
                            margin-left: 8px;
                            line-height: 15px;
                        }

                        .com-dot {
                            position: absolute;
                            top: -3px;
                            left: 14px;
                            width: 5px;
                            height: 5px;
                            background: red;
                        }
                    }

                    .sign {
                        float: right;
                        display: block;
                        width: 0;
                        right: 0;
                        margin-top: 5px;
                        border-top: 7px solid #ccc;
                        border-left: 7px solid transparent;
                        border-right: 6px solid transparent;
                        border-bottom: 0 solid transparent;
                        transition: all .3s;
                        cursor: pointer;
                        transform: rotate(-90deg);


                    }

                }

                &:hover {
                    color: rgba(33, 186, 88, 1);
                }

            }

        }

        .details {
            .message-list-head {
                .sign {
                    transform: rotate(0deg);
                }
            }

        }

        .page-box {
            position: absolute;
            bottom: 10px;
            right: 10px;
        }

        .back-up-box {
            width: 120px;
            margin-bottom: 15px;
            cursor: pointer;

            &:hover {
                color: @baseColor;
            }

        }


    }
</style>
