<template>
    <div class="details-container">

        <section class="details-main-back">
            <div class="details-main">
                <div class="details-main-left">
                    <div class="details-img">
                        <video v-if="classDetail.publicity_video" controls="controls"
                               :poster="classDetail.publicity_cover||classDetail.pc_cover"
                               :src="classDetail.publicity_video"></video>
                        <img v-else class="" :src="classDetail.pc_cover" alt="">
                    </div>
                </div>
                <div class="details-main-right">
                    <div class="details-info-head">
                        <p class="title">{{classDetail.name}}</p>
                        <div class="other-handle">
                            <div class="collect" @click="addCollection">
                                <img v-if="!starHover" src="../assets/imgs/details-star.png" class="collect-icon"
                                     alt="">
                                <img v-else class="collect-icon" src="../assets/imgs/star-hover-icon.png"
                                     alt="">
                                <!--                                <span :class="{'active':starHover}" class="icon iconfont">&#xe63f;</span>-->
                                <span>收藏</span>
                            </div>
                            <!--                            <div class="share">-->
                            <!--                                <span class="icon iconfont">&#xe629;</span>分享-->
                            <!--                                <div class="share-list">-->
                            <!--                                    <img src="../assets/imgs/share-wb.png" alt="">-->
                            <!--                                    <img src="../assets/imgs/share-wx.png" alt="">-->
                            <!--                                    <img src="../assets/imgs/share-qq.png" alt="">-->
                            <!--                                    <img src="../assets/imgs/share-wx-circle.png" alt="">-->
                            <!--                                    <img src="../assets/imgs/share-qq-space.png" alt="">-->
                            <!--                                </div>-->
                            <!--                            </div>-->

                        </div>
                    </div>
                    <ul class="com-sign-box">
                        <!--                        <li class="com-sign">{{classDetail.year}}{{classDetail.term_label}}</li>-->
                        <li class="com-sign" v-if="classDetail.min_age!==0 && classDetail.max_age!==0">
                            {{classDetail.min_age}}-{{classDetail.max_age}}岁
                        </li>
                        <li class="com-sign " v-if="classDetail.is_rocking_number">需要摇号</li>
                        <li class="com-sign" v-if="classDetail.is_interview">需要面试</li>
                    </ul>
                    <div class="course-info">
                        <div class="money-text">
                            <span class="label">价格：</span> <span class="money">￥{{classDetail.total_fee}}</span>
                        </div>
                        <div class="teacher" v-if="classDetail.teacher">
                            <span class="label">任课老师：</span>
                            <span style="color: #333;" v-for="(teacher,idx) in classDetail.teacher" :key="idx"> {{teacher.real_name}}</span>
                        </div>
                        <div class="time">
                            <span class="label">上课时间：</span>
                            <span style="color: #333;">{{classDetail.first_class_start_time|time}}至{{classDetail.last_class_end_time|time}}</span>
                        </div>
                    </div>
                    <pc-button class="submit" height="40" @click="submit">
                        {{buttonName}}
                        <!--                        {{classDetail.is_interview?'预约面试':classDetail.is_rocking_number?'预约摇号':'立即报名'}}-->
                    </pc-button>
                </div>
            </div>
        </section>
        <ul class="details-tabs">
            <li class="details-tabs-list" v-for="(item,index) in tabList" :key="index"
                :class="{'active':tabIndex === index}" @click="changeTab(item,index)">{{item}}
            </li>
        </ul>
        <div class="details-tab">
            <div class="number-title">
                <span>基础信息</span>
                <i class="ellipse"></i>
                <i class="stand-ellipse"></i>
                <img class="title-back" src="../assets/imgs/title-01.png" alt="">
            </div>
            <table class="base-table-box" border="1">
                <thead class="table-head">
                <tr>
                    <th>班级代码</th>
                    <th>{{classDetail.class_code||'暂无'}}</th>
                    <th>班级名称</th>
                    <th colspan="7">{{classDetail.name}}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>所属年份</td>
                    <td>{{classDetail.year}}</td>
                    <td>学期</td>
                    <td >{{classDetail.term_label}}</td>
                    <td>项目大类</td>
                    <td >{{categorie.name}}</td>
                    <td>项目</td>
                    <td colspan="3">{{classDetail.professional_name}}</td>


                </tr>
                <tr class="course-info">
                    <td>任课老师</td>
                    <td>
                        <template v-if="classDetail.teacher">
                            <p style="margin-right: 2px;" v-for="(item,index) in classDetail.teacher" :key="index">
                                {{item.real_name}}</p>
                        </template>
                    </td>
                    <td>开课时间</td>
                    <td>{{classDetail.first_class_start_time|time}}</td>
                    <td>结课时间</td>
                    <td>{{classDetail.last_class_end_time|time}}</td>
                    <td>总课次</td>
                    <td>{{classDetail.courses_count}}</td>
                    <td>费用</td>
                    <td>{{classDetail.total_fee}}</td>
                </tr>
                <tr class="presentation">
                    <td class="title">班级介绍</td>
                    <td class="text" colspan="9">
                        {{classDetail.class_desc||'暂无'}}
                    </td>
                </tr>
                </tbody>

            </table>
        </div>
        <div class="details-tab">
            <div class="number-title">
                <span>费用详情</span>
                <i class="ellipse"></i>
                <i class="stand-ellipse"></i>
                <img class="title-back" src="../assets/imgs/title-02.png" alt="">
            </div>
            <table class="cost-table-box">
                <tbody>
                <tr>
                    <th class="th" v-for="(item,index) in costTable" :key="index">{{item.name}}</th>
                </tr>
                <tr>
                    <td class="td" v-for="(item,index) in costTable" :key="index">{{item.value}}</td>
                </tr>
                </tbody>

            </table>
        </div>
        <!-- 课程表 -->
        <div class="details-tab">
            <div class="number-title number-course-title">
                <span style="width: 86px">课程表</span>
                <i class="ellipse"></i>
                <i class="stand-ellipse"></i>
                <img class="title-back" src="../assets/imgs/title-03.png" alt="">
            </div>
            <div class="course-time-box">
                <div class="course-time">
                    <p class="course-time-title">总计 <span class="number">{{classDetail.courses_count||0}}</span>课次</p>
                    <div class="course-start-end-time">
                        <div class="start-time">
                            <p class="title">开课时间</p>
                            <p class="text">{{classDetail.first_class_start_time|time}}</p>
                        </div>
                        <div class="end-time">
                            <p class="title">结束时间</p>
                            <p class="text">{{classDetail.last_class_end_time|time}}</p>
                        </div>
                    </div>
                </div>
                <div class="calendar-box">
                    <div class="calendar" v-for="(item,index) in nowDateSet" :key="index">
                        <p class="calendar-head">{{item.date}}</p>
                        <pc-calendar type="detail" v-if="dateList" :year="item.year" :month="item.month-1" :information="dateList">

                        </pc-calendar>
                    </div>
<!--                    <template v-if="nowDateSet.length>1">-->
                        <div class="left-icon" v-if="dateIndex - 1 >= 0" @click="changeCalendar('left')"></div>
                        <div class="right-icon" v-if="dateIndex < dateSet.length - 1"
                             @click="changeCalendar('right')"></div>
<!--                    </template>-->
                </div>
            </div>
        </div>
        <!-- 报名限制 -->
        <div class="details-tab">
            <div class="number-title">
                <span>限制条件</span>
                <i class="ellipse"></i>
                <i class="stand-ellipse"></i>
                <img class="title-back" src="../assets/imgs/title-04.png" alt="">
            </div>
            <ul class="apply-box">
                <li class="apply-list">
                    <div class="label">
                        <span>年龄限制</span>
                    </div>
                    <div class="text" v-if="classDetail.min_age!==0 && classDetail.max_age!==0">
                        {{classDetail.min_age}}-{{classDetail.max_age}}岁学员可参与报名
                    </div>
                    <div class="text" v-else>年龄无限制</div>
                </li>
                <li class="apply-list">
                    <div class="label">
                        <span>面试限制</span>
                    </div>
                    <div v-if="classDetail.is_interview" class="text">需要先面试，面试通过后才可缴费报名</div>
                    <div v-else class="text">不需要面试</div>
                </li>
                <li class="apply-list">
                    <div class="label">
                        <span>摇号限制</span>
                    </div>
                    <div v-if="classDetail.is_rocking_number" class="text">先参与摇号，摇中后才可缴费报名</div>
                    <div v-else class="text">不需要摇号</div>
                </li>
            </ul>
        </div>
        <!-- 报名协议 -->
        <div class="details-tab">
            <div class="number-title agreement-title">
                <span>报名协议</span>
                <i class="ellipse"></i>
                <i class="stand-ellipse"></i>
                <img class="title-back" src="../assets/imgs/title-05.png" alt="">
            </div>
            <div class="agreement">
                <!--                <div class="title">{{siteInformation.module_label}}</div>-->
                <div class="content" v-html="siteInformation.content"></div>
            </div>
        </div>
        <div class="com-sidebar">
            <div class="text" v-for="(item,index) in tabList" @click="changeTab(item,index)"
                 :class="{'active':tabIndex === index}" :key="index">
                {{item}}
            </div>
        </div>
    </div>
</template>

<script>
    import PcTabs from '../components/pc-tabs';
    import PcButton from '../components/pc-button';
    import request from '../axios/request';
    import PcSteps from '../components/pc-steps';
    import PcStep from '../components/pc-step';
    import {isString} from '../utils/utils';
    import PcCalendar from '../components/pc-calendar';

    export default {
        name: 'course-details',
        layout: 'details',
        async asyncData({route}) {
            let classDetail = {};
            let month = {};
            let siteInformationData = {};

            let data = await request.classDetails(route.query.id ? route.query.id : 0);
            try {


                classDetail = data.data.class_detail;
            } catch (e) {

            }
            let table = [{name: '项目', value: '金额（元）'}];
            let siteInformation = await request.siteInformation({site_manage_type: 5});
            if (siteInformation && siteInformation.data && siteInformation.data.site_information) {
                siteInformationData = siteInformation.data.site_information;
            }

            table = table.concat([
                {name: '学费', value: classDetail.class_fee},
                {name: '保险费', value: classDetail.insurance},
                {name: '餐饮费', value: classDetail.food_expenses},
                {name: '书本费', value: classDetail.material_fee},
                {name: '托管费', value: classDetail.hosting_fee},
                {name: '陪读费', value: classDetail.accompanying_fee},
                {name: '总计', value: classDetail.total_fee},
            ]);

            month = Array.from(new Array(35).keys());
            return {
                costTable: table,
                classDetail: classDetail,
                month: month,
                siteInformation: siteInformationData
            };
        },

        mounted() {
            this.getCalendar();
            if (this.userId) {
                this.whetherCollection();
            }
            this.classDetailsCategories();
            this.contact = sessionStorage.contact ? JSON.parse(sessionStorage.contact) : {};
        },
        data() {
            return {
                starHover: false,
                starInfo: {},
                calendarStart: 0,
                calendarEnd: 1,
                tabIndex: 0,
                feeDetails: 0,
                tabList: [
                    '基础信息',
                    '费用详情',
                    '课程表',
                    '限制条件',
                    '报名协议',
                ],
                startMonth: [],
                endMonth: [],
                dateList: [],
                dateSet: [],
                nowDateSet: [],
                dateIndex: 0,
                yearMonthList: [],
                changeDateList: [],
                contact: null,
                leftCalendar: 0,
                rightCalendar: 1,
                categorie: {},

            };
        },
        methods: {
            async classDetailsCategories() {
                let data = await request.classDetailsCategories(this.classDetail.professional_name_id);
                try {
                    this.categorie = data.data.first_class;
                } catch (e) {

                }
            },
            async submit() {
                let age = null;
                // 未登录
                if (!this.userId) {
                    this.$store.dispatch('toLogin');
                    return;
                }

                if (this.classDetail.sign_up_status === 2) {
                    if (!sessionStorage.contact) {
                        this.$msg('请选择联系人');
                        return;
                    }
                    age = JSON.parse(sessionStorage.contact).age;
                    if ((this.classDetail.min_age > age || age > this.classDetail.max_age) && this.classDetail.max_age !== this.classDetail.min_age) {
                        this.$msg(`该课程年龄限制${this.classDetail.min_age}到${this.classDetail.max_age}岁`);
                        return;
                    }
                    sessionStorage.details = JSON.stringify(this.classDetail);
                    if (this.classDetail.is_interview || this.classDetail.is_rocking_number) {
                        await this.getSignUpFee();
                        await this.signUp();
                    } else {

                        this.$router.push({path: `/settlement?id=${this.$route.query.id}`});
                    }

                } else {
                    this.$msg(this.buttonName);
                }
            },
            // 获取折扣信息
            async getSignUpFee() {
                let data = await request.getSignUpFee({class_id: this.$route.query.id});
                try {
                    this.feeDetails = data.data;
                    /*
                    *is_shift	减免
                    * original 原价
                    * shift_class_number 已上班级科数
                    * sign_up_fee 注册费用
                    * sign_up_reduction 减少钱数
                    * specialized_subject_name班级名
                    * */
                } catch (e) {

                }
            },
            // 报名
            async signUp() {
                if (sessionStorage.contact) {
                    this.contact = JSON.parse(sessionStorage.contact);
                }
                let formData = {
                    class_id: this.$route.query.id,
                    contact_id: this.contact.id,
                    // contact_phone:18483692611,
                    contact_phone: this.personalData.phone,
                    is_allow_agreement: true,
                    is_shift: this.feeDetails.is_shift,
                    register_user_id: this.personalData.id,
                    shift_class_number: this.feeDetails.shift_class_number,
                    sign_up_fee: this.feeDetails.sign_up_fee,
                    sign_up_reduction: this.feeDetails.sign_up_reduction,
                    specialized_subject_name: this.feeDetails.specialized_subject_name,
                };

                let data = await request.signUp(formData);
                try {
                    this.$router.push(`/appointment?id=${data.data.order.sign_up_id}`);
                } catch (e) {

                }
            },

            async getCalendar() {
                let data = await request.classDetailsDate(this.$route.query.id);
                this.dateList = data.data.class_list.map((item) => {
                    try {
                        let date = item.class_start_time.split(' ')[0];
                        let time = item.class_start_time.split(' ')[1];
                        let endTime = item.class_end_time.split(' ')[1];
                        return {
                            ...item,
                            date: date,
                            year: Number(date.split('-')[0]),
                            month: Number(date.split('-')[1]),
                            day: Number(date.split('-')[2]),
                            ym: `${date.split('-')[0]}-${date.split('-')[1]}`,
                            hm: `${time.split(':')[0]}:${time.split(':')[1]}-${endTime.split(':')[0]}:${endTime.split(':')[1]}`,
                        };

                    } catch (e) {
                    }
                });

                function getArray(array, key) {
                    let repetition = [];
                    let newArray = [];
                    array.map((item, index) => {
                        if (repetition.indexOf(item[key]) === -1) {
                            newArray.push(item);
                            repetition.push(item[key]);
                        }
                    });
                    return newArray;
                }

                this.dateSet = getArray(this.dateList, 'ym');
                this.nowDateSet = this.dateSet.slice(this.dateIndex, 1);


            },

            changeCalendar(type) {
                if (type === 'left') {
                    this.dateIndex--;
                    this.nowDateSet = this.dateSet.slice(this.dateIndex, this.dateIndex + 1);
                } else {
                    this.dateIndex++;
                    this.nowDateSet = this.dateSet.slice(this.dateIndex, this.dateIndex + 1);
                }

            },
            // 切换tab
            changeTab(item, index) {
                this.tabIndex = index;
                let stairs = document.querySelectorAll('.details-tab');
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let newScrollTop = stairs[index].offsetTop;
                if (scrollTop > newScrollTop) {
                    let timeId = setInterval(() => {
                        if (scrollTop <= newScrollTop) {
                            window.scroll(0, newScrollTop);
                            clearInterval(timeId);
                        }
                        window.scroll(0, scrollTop -= 15);
                    }, 5);
                } else if (scrollTop < newScrollTop) {
                    let timeId = setInterval(() => {
                        if (scrollTop >= newScrollTop) {
                            window.scroll(0, newScrollTop);
                            clearInterval(timeId);
                        }
                        window.scroll(0, scrollTop += 15);
                    }, 5);
                }
            },
            // 判断是否收藏
            async whetherCollection() {
                let data = await request.whetherCollection(this.$route.query.id);
                try {
                    // this.collection
                    if (data.data.collection) {
                        this.starHover = true;
                        this.starInfo = data.data.collection;
                    } else {
                        this.starHover = false;
                    }
                } catch (e) {

                }
            },

            // 添加收藏
            async addCollection() {
                // 未登录
                if (!this.userId) {
                    this.$store.dispatch('toLogin');
                    return;
                }
                if (!this.starHover) {
                    //  添加收藏
                    let data = await request.addCollection({collection_id: this.$route.query.id});
                    if (data) {
                        this.$msg(data.msg, {type: 'succeed'});
                    }
                } else {
                    // 删除收藏
                    let data = await request.deleteCollectionList(this.starInfo.id);
                    if (data) {
                        this.$msg(data.msg, {type: 'succeed'});
                    }
                }
                this.whetherCollection();
            },
        },
        computed: {
            personalData() {
                return this.$store.state.personalData;
            },
            userId() {
                return this.$store.state.userId;
            },
            buttonName() {
                if (this.classDetail.sign_up_status === 2) {
                    if (this.classDetail.is_interview) {
                        return '立即预约';
                    } else if (this.classDetail.is_rocking_number) {
                        return '立即预约';
                    } else {
                        return '立即报名';
                    }
                } else {
                    return this.classDetail.sign_up_status_label;
                }
            },
        },
        filters: {
            time(value) {
                if (value && isString(value)) {
                    return value.split(' ')[0];
                } else {
                    return '暂无';
                }
            }
        },
        components: {PcCalendar, PcStep, PcSteps, PcButton, PcTabs}
    };
</script>

<style lang="less" scoped>
    .details-container {
        width: 1200px;
        margin: 30px auto 30px auto;

        .com-sidebar {
            padding: 20px 0;

            .text {
                padding: 20px 0;
                font-size: 12px;
                text-align: center;
                cursor: pointer;

                &:hover {
                    color: @baseColor;
                }
            }

            .active {
                color: @baseColor;
            }
        }

        .details-main-back {
            height: 318px;
            padding: 23px 33px 54px 42px;
            background: @white;

            .details-main {

                &:after {
                    .clear;
                }

                .details-main-left {
                    float: left;
                    margin-right: 47px;

                    .details-img {
                        width: 390px;
                        height: 242px;
                        border-radius: 5px;
                        border: 1px solid @gray;

                        img, video {
                            width: 100%;
                            height: 100%;
                        }

                    }


                }

                .details-main-right {
                    float: left;
                    width: 668px;
                    margin-top: 5px;

                    .details-info-head {
                        line-height: 26px;

                        .title {
                            float: left;
                            font-size: 24px;
                            font-weight: bold;
                            color: rgba(0, 0, 0, 1);
                        }

                        .other-handle {
                            position: relative;
                            float: right;
                            font-size: 12px;
                            font-weight: 400;
                            color: rgba(102, 102, 102, 1);

                            .collect {
                                display: inline-block;
                                cursor: pointer;

                                .collect-icon {
                                    width: 15px;
                                    height: 15px;
                                    vertical-align: text-top;
                                }

                                &:hover {
                                    color: @baseColor;
                                }
                            }

                            .share {
                                display: inline-block;
                                cursor: pointer;


                                .share-list {
                                    display: none;
                                    position: absolute;
                                    top: 23px;
                                    right: 0;
                                    width: 260px;
                                    height: 48px;
                                    padding: 10px 0 10px 15px;
                                    background: #F3F3F3;

                                    img {
                                        display: inline-block;
                                        width: 30px;
                                        height: 30px;
                                        margin-right: 15px;
                                    }
                                }

                                &:hover {
                                    color: @baseColor;

                                    .share-list {
                                        display: block;
                                    }
                                }

                            }

                            .active {
                                color: @baseColor;
                            }
                        }

                        &:after {
                            .clear;
                        }
                    }

                    .com-sign-box {
                        height: 48px;

                        .com-sign {
                            float: left;
                            margin: 11px 10px 19px 0;
                        }

                        .com-sign:nth-of-type(2) {
                            background: #41D0FF;
                        }

                        .com-sign:nth-of-type(3) {
                            background: #FF7723;
                        }

                        .com-sign:nth-of-type(4) {
                            background: #FE0000;
                        }

                        &:after {
                            .clear;
                        }
                    }

                    .course-info {

                        margin-bottom: 39px;
                        border-radius: 5px;
                        font-size: 12px;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);

                        .label {
                            margin-right: 24px;
                            font-size: 14px;
                            font-weight: 400;
                            color: rgba(153, 153, 153, 1);
                        }

                        .money {
                            height: 23px;
                            margin-right: 20px;
                            line-height: 23px;
                            font-size: 28px;
                            font-weight: bold;
                            color: rgba(254, 0, 0, 1);
                        }

                        .teacher {
                            margin-top: 21px;
                            margin-bottom: 14px;
                        }

                        .money-text, .teacher, .time {
                            line-height: 11px;
                        }
                    }

                    .submit {
                        width: 125px;
                        background: rgba(254, 0, 0, 1);
                        border-radius: 2px;
                        font-size: 18px;
                        font-weight: bold;
                        color: rgba(255, 255, 255, 1);
                    }
                }

            }
        }

        .details-tabs {
            margin-top: 31px;
            height: 50px;

            color: rgba(51, 51, 51, 1);

            &:after {
                .clear;
            }

            .details-tabs-list {
                float: left;
                width: 240px;
                text-align: center;
                line-height: 48px;
                font-size: 14px;
                font-weight: 400;
                cursor: pointer;
                border: 1px solid @gray;

                &:hover {
                    color: #05CE61;
                }
            }

            .active {
                color: #05CE61;
                font-weight: 600;
                background: @white;
                border: 1px solid transparent;
            }
        }

        .details-tab {

            /*margin-bottom: 50px;*/
            background: @white;

            .agreement-title {
                margin-bottom: 25px;
            }

            .base-table-box {
                margin-top: 31px;

                th, td {
                    height: 48px;
                }

                th:nth-of-type(1n), td:nth-of-type(1n) {
                    width: 93px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                    line-height: 24px;
                    background: rgba(13, 169, 85, 1);
                    border: 1px solid transparent;
                    border-bottom: 1px solid @white;

                }

                th:nth-of-type(2n), td:nth-of-type(2n) {
                    width: 112px;
                    padding-left: 14px;
                    padding-right: 14px;
                    text-align: left;
                    font-size: 12px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                    line-height: 24px;
                    border: 1px solid rgba(13, 169, 85, 1);
                    background: @white;
                }

                .course-info {
                    td:nth-of-type(1) {
                        border-bottom-color: @white;
                    }

                    td {
                        border-bottom-color: rgba(13, 169, 85, 1);
                    }
                }

                .presentation {

                    td {
                        height: 75px;
                        /*line-height: 75px;*/
                        border-bottom-color: rgba(13, 169, 85, 1);
                    }

                    .text {
                        padding: 0 17px 0 17px;
                    }
                }


            }

            .cost-table-box {
                margin-top: 31px;
                width: 100%;

                .th {
                    height: 60px;
                    font-size: 14px;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                    background: rgba(21, 174, 77, 1);
                    border-right: 1px solid @white;
                }

                .th:nth-last-of-type(1) {
                    border-right: 1px solid rgba(13, 169, 85, 1);
                }

                .td {
                    height: 60px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                    border-left: 1px solid rgba(13, 169, 85, 1);
                    border-bottom: 1px solid rgba(13, 169, 85, 1);
                }

                .td:nth-of-type(1) {
                    font-weight: bold;
                }

                .td:nth-last-of-type(1) {
                    border-right: 1px solid rgba(13, 169, 85, 1);
                }
            }

            .apply-box {
                margin-left: 36px;
                margin-top: 24px;

                .apply-list {
                    float: left;
                    width: 33%;
                    position: relative;

                    .label {

                        width: 60px;
                        height: 60px;
                        padding: 9px 14px;
                        background: rgba(33, 186, 88, 1);
                        border-radius: 50%;
                        font-size: 16px;
                        font-weight: bold;
                        color: rgba(255, 255, 255, 1);
                        letter-spacing: -1px;
                    }

                    .text {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 88%;
                        height: 48px;
                        margin-top: 6px;
                        padding: 0 15px 0 67px;
                        line-height: 48px;
                        border: 1px solid rgba(33, 186, 88, 1);
                        border-radius: 24px;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                    }

                }

                .apply-list:nth-of-type(1) {
                    width: 30%;
                }

                .apply-list:nth-of-type(2) {
                    width: 36%;
                }

                &:after {
                    .clear;
                }
            }

            .course-time-box {
                margin-top: 30px;

                .course-time {

                    height: 171px;
                    background: url("../assets/imgs/course-time.png");
                    background-size: 100% 100%;
                    border-radius: 5px;
                    overflow: hidden;

                    .course-time-title {
                        margin-top: 30px;
                        text-align: center;
                        font-size: 18px;
                        font-weight: bold;
                        color: rgba(255, 255, 255, 1);

                        .number {
                            font-size: 24px;
                        }

                    }

                    .course-start-end-time {
                        padding: 0 233px 0 252px;
                        .clear-both;

                        .time-box {
                            min-width: 130px;

                            margin-top: 30px;
                            text-align: center;
                            color: @white;

                            .title {
                                font-size: 14px;
                                font-weight: 400;
                                color: rgba(255, 255, 255, 1);
                                line-height: 14px;

                            }

                            .text {
                                margin-top: 9px;
                                margin-bottom: 34px;
                                font-size: 24px;
                                font-weight: bold;
                                color: rgba(255, 255, 255, 1);
                                line-height: 19px;
                            }
                        }

                        .start-time {
                            float: left;

                            .time-box;
                        }

                        .end-time {
                            float: right;
                            .time-box;
                        }
                    }

                    .course-time-steps {
                        width: 567px;
                        margin: 0 auto;
                    }
                }


            }

            .agreement {
                margin-top: 30px;
                .clear-both;

                .title-box {
                    float: left;
                    height: 37px;
                    font-size: 28px;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);

                    .title-back {
                        width: 36px;
                        height: 37px;
                        background: url("../assets/imgs/details-step.png");
                        background-size: 100%;
                        vertical-align: sub;
                    }

                    .title-text {
                        margin-left: -15px;
                        line-height: 37px;
                        vertical-align: middle;
                        font-size: 25px;
                        font-weight: bold;
                        color: rgba(51, 51, 51, 1);
                    }

                    p {
                        display: inline-block;
                    }
                }

                .text {
                    float: left;
                    width: 968px;
                    margin-left: 10px;
                    margin-top: 20px;

                    .steps {
                        .steps-text {
                            margin-bottom: 15px;

                            .strong {
                                font-size: 14px;
                                font-weight: bold;
                                color: rgba(51, 51, 51, 1);
                            }
                        }
                    }


                }


            }
        }

        .details-tab:nth-of-type(1) {

            padding: 25px 64px 0 80px;
        }

        .details-tab:nth-of-type(2) {
            padding: 47px 80px 0 80px;
        }

        .details-tab:nth-of-type(3) {
            padding: 50px 89px 162px 89px;
        }

        .details-tab:nth-of-type(4) {
            padding: 20px 64px 0 80px;
        }

        .details-tab:nth-of-type(5) {
            padding: 30px 64px 20px 80px;
        }
    }
</style>
<style lang="less">

    .details-container {
        .calendar-box {
            position: relative;
            width: 100%;
            /*padding: 0 20px;*/
            /*height: 436px;*/
            margin-top: 46px;


            .calendar {
                /*float: left;*/
                /*width: 504px;*/
                /*margin-right: 47px;*/

                .calendar-head {
                    height: 53px;
                    padding-top: 21px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                    background: url("../assets/imgs/details-time-head.png");
                    background-size: 100% 100%;
                }

                .date-list-box {

                    .date-list {
                        float: left;
                        width: 146px;
                        height: 60px;
                        text-align: center;
                        line-height: 60px;
                        font-size: 14px;
                        font-weight: 400;
                        color:rgba(37,188,92,1);
                        border-left: 1px solid #21BA58;
                        border-bottom: 1px solid #21BA58;

                    }

                    .date-list:nth-last-of-type(1) {
                        border-right: 1px solid #21BA58;
                    }

                    &:after {
                        .clear;
                    }
                }

                .calendar-list-box {

                    .calendar-list {
                        float: left;
                        width: 146px;
                        height: 88px;
                        padding: 8px;
                        text-align: left;
                        font-size: 14px;
                        font-weight: 400;
                        color: #25BC5C;
                        border-left: 1px solid #21BA58;
                        border-bottom: 1px solid #21BA58;

                    }

                    .calendar-list:nth-of-type(7n) {
                        border-right: 1px solid #21BA58;
                    }

                    .index {
                        width:26px;
                        height:26px;
                        text-align: center;
                        line-height: 26px;
                        font-size:18px;
                        font-weight:bold;
                        /*color:rgba(51,51,51,1);*/

                    }

                    &:after {
                        .clear;
                    }
                }

            }

            .calendar:nth-of-type(2) {
                float: right;
            }

            &:after {
                .clear;
            }

            .calendar-icon {
                position: absolute;
                top: 50%;
                width: 20px;
                height: 40px;
                margin-top: -20px;
                background-image: url("../assets/imgs/calendar-icon.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                cursor: pointer;
                z-index: 3;
            }

            .left-icon {
                .calendar-icon();
                left: -20px;

            }

            .right-icon {
                .calendar-icon();
                right: -20px;
                transform: rotate(180deg);
            }
        }
    }


    .ly-mce-step {
        float: left;
        position: relative;
        bottom: 20px;
        z-index: 10;
    }

    .ly-mce-step::before {
        content: '';
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url('../assets/imgs/step.png');
        background-color: #fff;
        background-size: contain;
        background-repeat: no-repeat;
        z-index: 10;
    }

    .ly-mce-m-t-20 {
        margin-top: 20px;
    }

    .ly-mce-left-line {
        position: relative;
    }

    .ly-mce-left-line::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: -60px;
        padding: 10px 0;
        top: 1px;
        width: 1px;
        height: 100%;
        background: #25BC5C;
        opacity: .2;
        z-index: 1;
    }
</style>
