<template>
    <div class="search-home-container">
        <div>

            <div class="search-box-back">
                <div class="search-box w1200">
                    <p class="com-title">条件筛选</p>
                    <div class="search-list">
                        <p class="type-title">项目大类</p>
                        <ul class="type-list-box" :class="{'hidden-type':searchShow.center}">
                            <li
                                    v-for="(item,index) in centerList"
                                    @click="changeSeatch(item,index,'center')"
                                    :key="index"
                                    :class="{'active':activeIndex.center === item.id}"
                                    class="type-list cursor"
                            >{{item.name}}
                            </li>
                        </ul>
                        <div class="view-more-box" :class="{'active':!searchShow.center}" @click="openSearch('center')">
                            <p class="view-more cursor">{{searchShow.center?'更多':'收起'}}</p>
                            <span v-if="searchShow.center" class="iconfont icon">&#xe674;</span>
                            <span v-else class="iconfont icon">&#xe607;</span>
                        </div>

                    </div>
                    <div class="search-list">
                        <p class="type-title">项目</p>
                        <ul class="type-list-box" :class="{'hidden-type':searchShow.specialty}">
                            <li
                                    class="type-list cursor"
                                    @click="changeSeatch(item,index,'specialty')"
                                    v-for="(item,index) in specialtyList"
                                    :class="{'active':activeIndex.specialty === item.id}"
                                    :key="index"
                            >{{item.name}}
                            </li>
                        </ul>
                        <div @click="openSearch('specialty')" :class="{'active':!searchShow.specialty}"
                             class="view-more-box">
                            <p class="view-more cursor">
                                {{searchShow.specialty?'更多':'收起'}}
                            </p>
                            <span v-if="searchShow.specialty" class="iconfont icon">&#xe674;</span>
                            <span v-else class="iconfont icon">&#xe607;</span>
                        </div>

                    </div>
                    <div class="search-list year">
                        <p class="type-title">学年</p>
                        <ul class="type-list-box" :class="{'hidden-type':searchShow.studyYear}">
                            <li
                                    v-for="(item,index) in studyYear"
                                    @click="changeSeatch(item,index,'studyYear')"
                                    :key="index"
                                    :class="{'active':activeIndex.studyYear === item.id}"
                                    class="type-list cursor"
                            >{{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="search-list" v-show="!searchShow.semester">
                        <p class="type-title">学期</p>
                        <ul class="type-list-box" :class="{'hidden-type':searchShow.semester}">
                            <li
                                    v-for="(item,index) in semester"
                                    @click="changeSeatch(item,index,'semester')"
                                    :key="index"
                                    :class="{'active':activeIndex.semester === item.id}"
                                    class="type-list cursor"
                            >{{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="search-list" v-show="!searchShow.ageRange">
                        <p class="type-title">年龄</p>
                        <ul class="type-list-box" :class="{'hidden-type':searchShow.ageRange}">
                            <li
                                    v-for="(item,index) in ageRange"
                                    @click="changeSeatch(item,index,'ageRange')"
                                    :key="index"
                                    :class="{'active':activeIndex.ageRange === item.id}"
                                    class="type-list cursor"
                            >{{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="search-list start-date">
                        <p class="type-title">开课时间</p>
                        <div class="start-date-box">
                            <p class="all-date" style="margin-right: 60px;" @click="deleteFiltrate({type:'date'})"
                               :class="{'active':!date}">全部</p>


                            <div class="date-box">
                                <date-picker v-model="dateValue"  @change="changeDate"
                                             value-type="format" :clearable="true"
                                             format="YYYY-MM-DD" type="date" range placeholder="请选择开课日期">
                                    <template v-slot:icon-calendar="{ emit }">
                                        <i></i>
                                    </template>
                                </date-picker>
                                <img class="date-icon" src="../assets/imgs/calenda-box-icon.png" alt="">
                            </div>


                        </div>
                    </div>
                    <div class="view-more-bottom cursor" :class="{'active':!searchShow.semester}"
                         @click="openSearch('all')">
                        {{searchShow.semester?'更多':'收起'}}
                        <span v-if="searchShow.semester" class="iconfont icon">&#xe674;</span>
                        <span v-else class="iconfont icon">&#xe607;</span>
                    </div>
                </div>
            </div>

            <div class="filtrate-box" v-if="filtrateList && filtrateList.length>0">
                <div class="filtrate-condition">
                    <p class="title">筛选条件</p>
                    <ul class="filtrate-list-box">
                        <li v-show="item.id!==0" class="filtrate-list" v-for="(item,index) in filtrateList"
                            :key="index">
                            <span>{{item.name}}</span>
                            <i class="close-button cursor" @click="deleteFiltrate(item,index)"></i>
                        </li>
                    </ul>
                </div>

                <!--                <div class="sort" @click="changeSort">-->
                <!--                    <span>默认排序</span>-->
                <!--                    <img src="../assets/imgs/sort.png" alt="">-->
                <!--                </div>-->
            </div>

            <ul class="course-container">
                <nuxt-link v-for="(item,index) in dataList" :key="index" class="course-list"
                           :to="`/details?id=${item.id}`">
                    <div class="course-info-box">
                        <div class="course-img-box">
                            <img class="course-img" v-lazy="item.pc_cover" alt/>
                        </div>
                        <div class="course-info">
                            <div class="title">
                                <span class="course-title">  {{item.name}}</span>
                                <span class="com-sign" v-if="item.is_interview">需要面试</span>
                                <span class="com-sign" v-if="item.is_rocking_number"> 需要摇号</span>
                                <span class="com-sign" v-if="item.is_age_limit&&item.min_age && item.max_age">{{item.min_age === item.max_age?item.min_age:`${item.min_age}-${item.max_age}`}}岁</span>

                            </div>
                            <div class="course-limit">
                                <span class="">课程相关：  {{item.year}}</span>
                                <span class=""> | {{item.term_label}}</span>
                                <span class=""> | {{item.specialized_subject_name}}</span>
                            </div>
                            <div class="course-schedule">
                                开课时间：{{item.first_class_start_time|dateFormat}}
                            </div>
                            <div v-if="item.teacher " class="course-teacher">
                                主讲老师：
                                <p v-for="(teacher,idx) in item.teacher" :key="idx">{{teacher.real_name}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="course-handle">
                        <p class="apply-money">
                            ￥<span class="money">{{item.total_fee}}</span>元
                        </p>
                        <pc-button v-if="(item.is_interview || item.is_rocking_number )&& item.sign_up_status ===2"
                                   class="apply-button notstart-active" height="40">正在预约
                        </pc-button>
                        <pc-button v-else class="apply-button" height="40"
                                   :class="[{'notstart-active':item.sign_up_status === 1},{'start-active':item.sign_up_status === 2},{'end-active':item.sign_up_status ===3}]">
                            {{item.sign_up_status_label}}
                        </pc-button>
                    </div>
                </nuxt-link>
            </ul>

        </div>

        <div class="search-loading" :class="{'scroll-show':scrollShow}">
            <img class="search-loading-icon" src="../assets/imgs/search-loading.png" alt/>
            <span class="text">正在加载</span>
        </div>
        <pc-tool></pc-tool>
    </div>
</template>

<script>
    import PcCheckbox from '../components/pc-checkbox';
    import PcButton from '../components/pc-button';
    import PcTool from '../components/pc-tool';
    import request from '../axios/request';
    import utils from '../utils/utils';
    import {isString} from '../utils/utils';
    import PcDate from '../components/pc-date';
    import {searchQuery} from '../utils/mixin';
    import PcCalendar from '../components/pc-calendar';
    import PcModal from '../components/pc-modal';

    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import 'vue2-datepicker/locale/zh-cn';

    let activeIndex = {
        center: 0,
        specialty: 0,
        studyYear: 0,
        semester: 0,
        ageRange: 0,
        interview: 0,
        classType: 0
    };
    let deg = 360;

    export default {
        name: 'searchHome',
        layout: 'search',
        components: {PcModal, PcTool,PcCalendar, PcDate, PcButton, PcCheckbox, DatePicker},

        async asyncData({query}) {

            let {
                centerList, specialtyList, filtrateList, dataList, name,
                date, studyYear, semester, ageRange, interview, classType
            } = await searchQuery(query, activeIndex);
            const condition = [{name: '秒杀'}, {name: '面试'}, {name: '摇号'}];

            // console.log(12, date?[date.split('~')[0],date.split('~')[1]]:'')
            return {
                centerList: centerList || [], // 个人中心列表
                specialtyList: specialtyList || [], // 个人中心列表
                condition: condition,
                studyYear: studyYear,
                semester: semester,
                ageRange: ageRange,
                interview: interview,
                classType: classType,
                filtrateList: filtrateList,
                dataList: dataList,
                seckillShow: false,
                interviewShow: false,

                searchShow: {
                    // 显隐
                    center: true,
                    specialty: true,
                    semester: true,
                    ageRange: true,
                    interview: true,
                    classType: true
                },
                name: name,
                date: date,
                dateValue: date ? [date.split('~')[0], date.split('~')[1]] : '',
                activeIndex: activeIndex // 选中效果
            };
        },
        data() {
            return {
                page: 2,
                scrollShow: false,
                timeId: '',
                lang: {
                    formatLocale: {
                        firstDayOfWeek: 1,
                    },
                    monthBeforeYear: false,
                },
            };
        },

        async mounted() {
            // this.date = '2019-11-21'
            this.$nextTick(() => {
                if (this.dataList && this.dataList.length === 0) {
                    this.$msg('暂无更多数据', {type: 'succeed'});
                }
                this.scrollInit();
                let height = document.querySelector('.search-box').clientHeight;
                document.querySelector('.search-box-back').style.height = `${Number(
                    height
                ) - 113}px`;
            });
        },

        beforeDestroy() {
            window.onscroll = null;
            clearTimeout(this.timeId);
        },

        methods: {

            scrollInit() {
                window.onscroll = () => {
                    if (
                        utils.getScrollTop() + utils.getWindowHeight() >= utils.getScrollHeight() - 10
                    ) {

                        if (!this.scrollShow) {
                            this.scrollShow = true;
                            document.querySelector(
                                '.search-loading-icon'
                            ).style.transform = `rotate(${(deg += 360)}deg)`;

                            this.getListData('scroll');
                            this.timeId = setTimeout(() => {
                                this.scrollShow = false;
                            }, 2000);
                        }
                    }
                };
            },

            // 请求列表数据
            async getListData() {
                let activeIndex = this.activeIndex;
                let params = {page_no: this.page, page_size: 10};

                if (activeIndex.center) {
                    params.professional_id = activeIndex.center;
                }
                if (activeIndex.studyYear) {
                    params.year = activeIndex.studyYear;
                }
                if (activeIndex.semester) {
                    params.term = activeIndex.semester;
                }
                if (this.name) {
                    params.class_or_profess = this.name;
                }
                if (activeIndex.specialty) {
                    params.professional_id = activeIndex.specialty;
                }
                if (activeIndex.ageRange) {
                    if (activeIndex.ageRange === 1) {
                        // params.max_age = 2
                        params.min_age = 2;
                    } else if (activeIndex.ageRange === 2) {
                        params.max_age = 6;
                        params.min_age = 3;
                    } else if (activeIndex.ageRange === 3) {
                        params.max_age = 13;
                        params.min_age = 7;
                    } else if (activeIndex.ageRange === 4) {
                        params.max_age = 13;
                    }
                }
                if (activeIndex.classType) {
                    params.is_rocking_number = activeIndex.classType;
                }
                if (activeIndex.interview) {
                    params.is_interview = activeIndex.interview;
                }
                if (this.date && this.date.split('~')) {
                    params.begin_open_class_date = this.date ? this.date.split('~')[0] : '';
                }
                if (this.date && this.date.split('~')) {
                    params.end_open_class_date = this.date ? this.date.split('~')[1] : '';
                }

                let data = await request.searchConditions(params);
                if (data && data.data.list) {
                    if (data.data.list[0]) {
                        this.dataList = this.dataList.concat(data.data.list);
                        this.page++;
                    } else {
                        this.$msg('暂无更多数据', {type: 'succeed'});
                    }
                }
            },
            clearTime() {
                // console.log(111)
                // this.dateValue = '';
                // this.deleteFiltrate('date');

            },
            // 删除标签
            deleteFiltrate(item, index) {
                let urlObj = this.$route.query;
                if (item.type === 'date') {
                    delete urlObj['date'];

                } else {
                    delete urlObj[item.type];
                }
                delete urlObj.time;
                if (item.type === 'center') {
                    delete urlObj.specialty;
                }
                let url = utils.formateObjToParamStr(urlObj);
                this.$router.push({path: `/searchHome?time=${new Date().getTime()}&${url}`});

            },
            // 更改搜索时间
            changeDate(value) {
                if(!value[0]||!value[1]){
                    this.deleteFiltrate({type:'date'});
                    return
                }
                let startY = new Date(value[0]).getFullYear();
                let startM = new Date(value[0]).getMonth() + 1 >= 10 ? new Date(value[0]).getMonth() + 1 : '0' +( new Date(value[0]).getMonth() + 1);
                let startD = new Date(value[0]).getDate() >= 10 ? new Date(value[0]).getDate() : '0' + new Date(value[0]).getDate();
                let endY = new Date(value[1]).getFullYear();
                let endM = new Date(value[1]).getMonth() + 1 >= 10 ? new Date(value[1]).getMonth() + 1 : '0' +( new Date(value[1]).getMonth() + 1);
                let endD = new Date(value[1]).getDate() >= 10 ? new Date(value[1]).getDate() : '0' + new Date(value[1]).getDate();


                this.changeSeatch({id: `${startY}-${startM}-${startD}~${endY}-${endM}-${endD}`}, 0, 'date');
            },
            // 查看更多
            openSearch(type) {
                if (type === 'all') {
                    this.searchShow.semester = !this.searchShow.semester;
                    this.searchShow.ageRange = !this.searchShow.ageRange;
                    this.searchShow.interview = !this.searchShow.interview;
                    this.searchShow.classType = !this.searchShow.classType;
                } else {
                    this.searchShow[type] = !this.searchShow[type];
                }
                this.$nextTick(() => {
                    let height = document.querySelector('.search-box').clientHeight;
                    document.querySelector('.search-box-back').style.height = `${Number(
                        height
                    ) - 113}px`;
                });
            },

            // 改变搜索条件
            changeSeatch(item, index, type) {
                let urlObj = {...this.$route.query, [type]: item.id};
                if (type === 'center') {
                    delete urlObj.specialty;
                }
                let url = utils.formateObjToParamStr(urlObj);
                this.$router.push({path: `${this.$route.path}?${url}`});
            },

        },
        watch: {
            $route(to, from) {

                searchQuery(this.$route.query, this.activeIndex, this.name, this.date)
                    .then(({
                               centerList, specialtyList, filtrateList, dataList, name,
                               date
                           }) => {
                        this.centerList = centerList;
                        this.specialtyList = specialtyList;
                        this.filtrateList = filtrateList;
                        this.dataList = dataList;
                        this.name = name;
                        this.date = date,
                            this.dateValue = date ? [date.split('~')[0], date.split('~')[1]] : '';
                    });

            },

        },
        filters: {
            time(value) {
                if (value && isString(value)) {
                    return value.split(' ')[0];
                } else {
                    return '暂无';
                }
            },
            dateFormat(value) {
                return value.replace(/\-/g, '/');
            },

        }
    };
</script>

<style lang="less" scoped>
    .search-home-container {
        /*width: 1200px;*/
        /*margin: 0 auto;*/

        .w1200 {
            width: 1200px;
            margin: 0 auto;
        }

        .search-box-back {
            position: relative;
            width: 100%;
            height: 225px;


            .search-box {
                position: absolute;
                top: -151px;
                left: 50%;
                padding: 17px 25px 17px 25px;
                margin-left: -600px;
                /*margin-top: -151px;*/
                /*margin-bottom: 34px;*/
                background: @white;
                box-shadow: 0 2px 13px 2px rgba(0, 0, 0, 0.05);
                border-radius: 6px;

                .com-title {
                    width: 72px;
                    height: 18px;
                    margin: 0;
                    margin-bottom: 30px;
                    font-size: 18px;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                    line-height: 18px;
                    letter-spacing: -1px;

                    &:after {
                        bottom: -2px;
                    }
                }

                .view-more-bottom {
                    width: 100px;
                    height: 14px;
                    margin: 21px auto 0 auto;
                    line-height: 14px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);

                    &:hover {
                        color: rgba(33, 186, 88, 1);
                    }
                }

                .search-list {
                    margin-bottom: 23px;
                    .clear-both;

                    .type-title {
                        float: left;
                        width: 71px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        font-size: 15px;
                        font-weight: bold;
                        color: rgba(255, 255, 255, 1);
                        background: rgba(33, 186, 88, 1);
                        border-radius: 2px;

                        /*width: 45px;*/
                        /*line-height: 60px;*/
                        /*font-size: 14px;*/
                        /*font-weight: 400;*/
                        /*color: rgba(153, 153, 153, 1);*/
                    }

                    .hidden-type {
                        height: 30px;
                        overflow: hidden;
                    }

                    .type-list-box {
                        float: left;
                        width: 1000px;
                        margin-right: 20px;
                        font-size: 16px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        .clear-both;


                        .active {
                            color: #00a14a;
                        }

                        .type-list {
                            float: left;
                            height: 45px;
                            margin-left: 60px;
                            line-height: 30px;

                            &:hover {
                                color: #00a14a;
                            }
                        }
                    }

                    .view-more-box {
                        float: right;
                        padding: 0 4px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        color: rgba(51, 51, 51, 1);

                        .view-more {
                            display: inline-block;
                            padding-right: 5px;
                            margin-right: -3px;
                            font-weight: 400;
                            line-height: 30px;

                        }

                        .icon {
                            font-size: 14px;
                        }


                        &:hover {
                            color: #05ce61;

                        }

                    }

                    .active {
                        color: #05ce61;
                    }

                }

                .search-list:nth-of-type(4) {
                    .type-list-box {
                        height: 30px;
                    }
                }

                .search-list:nth-of-type(5) {
                    .type-list-box {
                        height: 30px;
                    }
                }

                .start-date {
                    .clear-both;

                    .start-date-box {

                        .clear-both;

                        .date-box {
                            position: relative;
                            width: 100%;

                            .date-icon {
                                position: absolute;
                                top: 7px;
                                left: 6px;
                                width: 20px;
                                height: 20px;
                            }
                        }

                        .start-date-title {
                            float: left;
                            width: 160px;
                            height: 30px;
                            padding: 7px 12px;
                            font-size: 16px;
                            border-radius: 2px;
                            border: 1px solid rgba(216, 216, 216, 1);

                            .calenda-icon {
                                width: 14px;
                                height: 14px;
                                vertical-align: top;
                                margin-right: 6px;
                            }

                            span {
                                display: inline-block;
                                line-height: 14px;
                                vertical-align: top;
                            }
                        }

                        .line {
                            float: left;
                            width: 64px;
                            height: 1px;
                            margin: 15px 10px 0 10px;
                            background: #CCCCCC;
                        }

                        .start-date-title:nth-of-type(1) {
                            margin-left: 60px;
                        }

                        .all-date {
                            float: left;
                            margin-left: 60px;
                            line-height: 30px;
                            cursor: pointer;
                        }

                        .active {
                            color: #00a14a;
                        }

                        .date-box {
                            float: left;
                            width: 160px;
                        }
                    }

                    .start-date-box:nth-of-type(2) {
                        margin-top: 20px;
                        margin-left: 70px;
                    }

                }

                .year,
                .seckillShow {
                    height: 30px;
                }

                .active {
                    color: #05ce61;
                }

                .view-more-icon {
                    display: inline-block;
                    width: 13px;
                    height: 8px;
                    margin-top: 10px;
                    background: url("../assets/imgs/back-up-icon.png") no-repeat;
                    background-size: 100% 100%;
                    cursor: pointer;

                    &:hover {
                        color: #05ce61;
                    }
                }

                .pack-up-icon {
                    display: inline-block;
                    width: 13px;
                    height: 8px;
                    margin-top: 10px;
                    background: url("../assets/imgs/pack-up-icon.png") no-repeat;
                    background-size: 100% 100%;
                    cursor: pointer;
                }
            }
        }


        .filtrate-box {

            width: 1200px;
            padding: 26px 0 27px 24px;
            margin: 0 auto 31px auto;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 2px 13px 2px rgba(0, 0, 0, 0.05);
            border-radius: 6px;

            .clear-both;

            .sort {
                margin-top: 30px;
                cursor: pointer;

                img {
                    width: 10px;
                    height: 13px;
                    margin-left: 13px;
                }
            }

            .filtrate-condition {
                .clear-both;

                .title {
                    float: left;
                    min-width: 64px;
                    height: 18px;
                    margin-top: 9px;
                    margin-right: 25px;
                    line-height: 18px;
                    color: rgba(51, 51, 51, 1);
                    font-size: 18px;
                    font-weight: bold;
                }

                .filtrate-list-box {
                    float: left;
                    height: 35px;
                    .clear-both;

                    .filtrate-list {
                        float: left;
                        /*height: 27px;*/
                        position: relative;
                        padding: 9px 30px 10px 11px;
                        margin-right: 18px;
                        /*margin: 5px 10px 5px 0;*/
                        /*line-height: 27px;*/
                        text-align: center;
                        line-height: 14px;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(5, 206, 97, 1);
                        border: 1px solid rgba(5, 206, 97, 1);
                        background: @white;

                        .close-button {
                            position: absolute;
                            top: 0;
                            right: 0;
                            width: 25px;
                            height: 100%;
                            line-height: 30px;
                            background-image: url("../assets/imgs/close-filter.png");
                            background-repeat: no-repeat;
                            background-size: 8px 8px;
                            background-position: 50% 47%;

                            &:hover {
                                color: @white;
                                background-color: #05ce61;
                                background-image: url("../assets/imgs/close-filter-white.png");
                            }
                        }

                        &:active {
                            .close-button {
                                color: @white;
                                background-color: #05ce61;
                                background-image: url("../assets/imgs/close-filter-white.png");
                            }
                        }
                    }
                }

            }


        }

        .course-container {
            width: 1200px;
            margin: 0 auto;


            .course-list {
                width: 100%;
                padding: 14px 32px 14px 13px;
                margin-bottom: 30px;
                border-bottom: 1px solid @gray;
                background: @white;
                /*a{*/
                .clear-both;

                .course-info-box {
                    float: left;
                    .clear-both;

                    .course-img-box {
                        float: left;
                        width: 260px;
                        height: 163px;
                        margin-right: 22px;
                        border-radius: 5px;
                        border: 1px solid @gray;
                        overflow: hidden;

                        .course-img {
                            width: 100%;
                            height: 100%;
                            transition: all .3s;
                        }
                    }

                    .course-info {
                        float: right;
                        width: 600px;
                        padding: 15px 0 13px 0;

                        .title {
                            .course-title {
                                font-size: 20px;
                                font-weight: bold;
                                color: rgba(51, 51, 51, 1);
                                line-height: 20px;
                            }

                            span {
                                display: inline-block;
                            }

                            .com-sign {
                                padding: 3px 5px;
                                vertical-align: text-top;
                            }

                            .com-sign:nth-of-type(3) {
                                background: #41d0ff;
                            }

                            .com-sign:nth-of-type(4) {
                                background: #ff7723;
                            }
                        }

                        .course-limit {
                            margin: 15px 0 10px 0;
                            line-height: 13px;
                            font-size: 12px;
                            font-weight: 300;
                            color: rgba(153, 153, 153, 1);
                        }

                        .course-schedule {
                            line-height: 14px;
                            font-size: 12px;
                            font-weight: 300;
                            color: rgba(153, 153, 153, 1);
                        }

                        .course-teacher {
                            margin-top: 30px;
                            font-size: 16px;
                            font-weight: bold;
                            color: rgba(51, 51, 51, 1);
                            line-height: 16px;

                            p {
                                display: inline-block;
                                margin-right: 10px;
                            }
                        }
                    }
                }

                .course-handle {

                    float: right;
                    padding-top: 23px;
                    text-align: right;

                    .apply-money {
                        height: 26px;
                        margin-top: 13px;
                        margin-bottom: 13px;
                        text-align: center;
                        line-height: 26px;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(254, 0, 0, 1);

                        .money {
                            font-size: 32px;
                        }
                    }

                    .apply-button {
                        width: 125px;
                        letter-spacing: -1px;
                        border: 1px solid rgba(254, 0, 0, 1);
                        border-radius: 2px;
                        background: @white;
                        font-size: 18px;
                        font-weight: 400;
                        color: rgba(254, 0, 0, 1);

                        &:hover {
                            color: @white;
                            background: rgba(254, 0, 0, 1);

                        }
                    }

                    .notstart-active {
                        color: #00a14a;
                        border: 1px solid #00a14a;

                        &:hover {
                            color: @white;
                            background: #00a14a;

                        }
                    }
                }

                /*}*/


                &:hover {
                    .course-img {
                        transform: scale(1.2);
                    }

                    .course-info-box {
                        .course-info {
                            .title {
                                .course-title {
                                    color: #00a14a;
                                }
                            }

                            .course-teacher {
                                color: #00a14a;
                            }
                        }
                    }


                }

                /*.start-active{*/
                /*    background-color: #FE0000;*/
                /*} .end-active{*/
                /*    background-color: #FE0000;*/
                /*}*/
            }
        }

        .search-loading {
            margin-top: 16px;
            margin-bottom: 30px;
            text-align: center;
            transition: 1s all;
            opacity: 0;

            .search-loading-icon {
                width: 20px;
                height: 20px;
                vertical-align: bottom;
                transition: 1s all;
            }

            .text {
                display: inline-block;
                font-size: 20px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                line-height: 20px;
            }
        }

        .scroll-show {
            opacity: 1;
        }
    }
</style>
<style lang="less">

    .mx-datepicker-range {
        width: 250px !important;
    }

    .mx-icon-calendar {
        left: 8px;
        right: auto;
    }

    .mx-input {
        padding-left: 35px;
        padding-right: 8px;
    }

    .mx-input:hover, .mx-input:focus {
        border-color: #00a14a !important;
    }

    .mx-table-date {
        .today {
            color: #00a14a !important;
        }
    }

    .mx-btn {
        &:hover {
            color: #00a14a !important;
        }
    }

    .mx-calendar-content {
        .cell {
            .active {
                background: #21ba58 !important;
            }

            &:hover {
                background: #74c892 !important;
            }
        }

    }

    .mx-calendar-content .cell.in-range {
        background: #74c892 !important;
        color: #fff !important;
    }

    .mx-calendar-content .cell.active {
        background: #21ba58 !important;
    }
</style>
