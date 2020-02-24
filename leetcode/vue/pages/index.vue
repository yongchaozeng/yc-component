<template>
  <div class="home-container">
    <!--        banner-->
    <div class="banner-box">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div
            @click="toDetails(banner,index)"
            class="swiper-slide"
            v-for="(banner,index) in bannerData"
            :key="index"
          >
            <img :src="banner.pc_banner" class="swiper-img" />
          </div>
        </div>
        <div class="swiper-pagination">
          <div class="down-inner"></div>
        </div>
      </div>
    </div>
    <!--        公告栏-->
    <div class="bulletin-board-box">
      <div class="bulletin-board">
        <div class="bulletin-board-hidden" v-html="siteInformationData.content"></div>
      </div>
      <div class="look-board" @click="advertisingShow=true">
        查看更多
        <span class="icon iconfont">&#xe655;</span>
      </div>
    </div>
    <!--        推荐班级-->
    <div class="course-list-box">
      <div class="course-main-title"></div>
      <!--        秒杀班级-->
      <div class="course-list">
        <div class="course-head">
          <p class="title">即将结束报名</p>
          <div class="date-list">
            <span
              :class="{'active':activeIndex.seckillClass === item.value}"
              v-for="(item,index) in detaList"
              :key="index"
              @click="changeDate(item,'seckillClass','seckillList')"
            >{{item.label}}</span>
          </div>

          <div class="more" @click="changeMoreList('seckillClass','seckillList')">
            <span class="icon iconfont seckill-icon">&#xe6aa;</span>
            <span>换一换</span>
          </div>
        </div>
        <div class="course-content-box">
          <div class="referral-img"></div>
          <template v-if="seckillList && seckillList.length>0">
            <nuxt-link
              :to="`/details?id=${item.id}`"
              class="course-content"
              v-for="(item,index) in seckillList"
              :key="index"
            >
              <div class="course-img-box">
                <img
                  class="course-img"
                  v-lazy="item.pc_cover?item.pc_cover:require('../assets/imgs/small-logo-background.png')"
                  alt
                />
              </div>
              <p class="course-title" :title="item.name">{{item.name}}</p>
              <p class="course-describe">
                <span v-if="item.min_age && item.min_age">{{item.min_age}}-{{item.max_age}}岁</span>
                <span class="gray" v-if="tagShow(item) ">无限制条件</span>
              </p>
              <div class="course-describe-info">
                <div class="money-box">
                  <span class="reduced-rate" :title="item.total_fee">￥{{item.total_fee}}</span>
                  <div class="other-info">
                    <!--                                    剩余{{item.sign_up_quota}}-->
                    {{item.time}}结束
                  </div>
                </div>
                <pc-button
                  class="course-button"
                  style="background: #fe0000;"
                  v-if="!item.is_interview && !item.is_rocking_number"
                  height="30"
                >立即报名</pc-button>
                <pc-button
                  v-else
                  class="course-button"
                  style="background: #21BA58;"
                  height="30"
                >立即预约</pc-button>
              </div>
            </nuxt-link>
          </template>
          <div class="no-info-background" v-else></div>
        </div>
      </div>
      <!--        秒杀班级-->
      <div class="course-list start-course">
        <div class="course-head">
          <p class="title">即将开始预约</p>
          <div class="date-list">
            <span
              :class="{'active':activeIndex.upcomingClass === item.value}"
              v-for="(item,index) in detaList"
              :key="index"
              @click="changeDate(item,'upcomingClass','startList')"
            >{{item.label}}</span>
          </div>
          <div class="more" @click="changeMoreList('upcomingClass','startList')">
            <span class="icon iconfont upcoming-start-icon">&#xe6aa;</span>
            <span>换一换</span>
          </div>
        </div>
        <div class="course-content-box">
          <div class="referral-img"></div>
          <template v-if="startList && startList.length>0">
            <nuxt-link
              :to="`/details?id=${item.id}`"
              class="course-content"
              v-for="(item,index) in startList"
              :key="index"
            >
              <div class="course-img-box">
                <img
                  class="course-img"
                  v-lazy="item.pc_cover?item.pc_cover:require('../assets/imgs/small-logo-background.png')"
                  alt
                />
              </div>
              <p class="course-title" :title="item.name">{{item.name}}</p>
              <p class="course-describe">
                <span v-if="item.min_age && item.min_age">{{item.min_age}}-{{item.max_age}}岁</span>
                <span class="blue" v-if="item.is_interview ">需要面试</span>
                <span class="orange" v-if="item.is_rocking_number ">需要摇号</span>
                <span class="gray" v-if="tagShow(item) ">无限制条件</span>
              </p>
              <div class="course-describe-info">
                <div class="money-box">
                  <span class="reduced-rate" :title="item.total_fee">￥{{item.total_fee}}</span>
                </div>
                <p
                  class="count-down"
                  style="margin-top: 14px;"
                  :title="`${item.time}预约`"
                  v-if="item.time!==0"
                >{{item.time}}预约</p>
                <template v-else-if="item.time === 0">
                  <pc-button
                    class="course-button"
                    style="background: #fe0000;"
                    v-if="!item.is_interview && !item.is_rocking_number"
                    height="30"
                  >立即报名</pc-button>
                  <pc-button
                    v-else
                    class="course-button"
                    style="background: #21BA58;"
                    height="30"
                  >立即预约</pc-button>
                </template>
              </div>
            </nuxt-link>
          </template>
          <div class="no-info-background" v-else></div>
        </div>
      </div>

      <div class="course-list end-course">
        <div class="course-head">
          <p class="title" title="a">即将结束预约</p>
          <div class="date-list">
            <span
              :class="{'active':activeIndex.upcomingClassEnd === item.value}"
              v-for="(item,index) in detaList"
              :key="index"
              @click="changeDate(item,'upcomingClassEnd','endList')"
            >{{item.label}}</span>
          </div>
          <div class="more" @click="changeMoreList('upcomingClassEnd','endList')">
            <span class="icon iconfont upcoming-end-icon">&#xe6aa;</span>
            <span>换一换</span>
          </div>
        </div>
        <div class="course-content-box">
          <div class="referral-img"></div>
          <template v-if="endList && endList.length>0">
            <nuxt-link
              :to="`/details?id=${item.id}`"
              class="course-content"
              v-for="(item,index) in endList"
              :key="index"
            >
              <div class="course-img-box">
                <img
                  class="course-img"
                  v-lazy="item.pc_cover?item.pc_cover:require('../assets/imgs/small-logo-background.png')"
                  alt
                />
              </div>
              <p class="course-title" :title="item.name">{{item.name}}</p>
              <p class="course-describe">
                <span v-if="item.min_age && item.min_age">{{item.min_age}}-{{item.max_age}}岁</span>
                <span class="blue" v-if="item.is_interview ">需要面试</span>
                <span class="orange" v-if="item.is_rocking_number ">需要摇号</span>
                <span class="gray" v-if="tagShow(item) ">无限制条件</span>
              </p>
              <div class="course-describe-info">
                <div class="money-box">
                  <span class="reduced-rate" :title="item.total_fee">￥{{item.total_fee}}</span>
                </div>
                <p class="count-down" :title="`${item.time}结束`">{{item.time}}结束</p>
              </div>
            </nuxt-link>
          </template>
          <div class="no-info-background" v-else></div>
        </div>
      </div>
    </div>

    <div class="full-strength">
      <p class="full-strength-title"></p>
      <ul class="full-strength-list-box" v-if="fullStrengthList && fullStrengthList.length>0">
        <nuxt-link
          :to="`/details?id=${item.id}`"
          class="full-strength-list"
          v-for="(item,index) in fullStrengthList"
          :key="index"
        >
          <div class="course-img-box">
            <img
              class="course-img"
              v-lazy="item.pc_cover?item.pc_cover:require('../assets/imgs/logo-background.png')"
              alt
            />
          </div>
          <div class="course-info-box">
            <p class="course-title" :title="item.name">{{item.name}}</p>
            <p class="course-describe">
              <span v-if="item.min_age && item.min_age">{{item.min_age}}-{{item.max_age}}岁</span>
              <span class="gray" v-if="tagShow(item) ">无限制条件</span>
            </p>
            <div class="course-describe-info">
              <div class="other-info">剩余{{item.sign_up_quota}}个名额</div>
              <span class="reduced-rate" :title="item.total_fee">￥{{item.total_fee}}</span>
            </div>
          </div>
        </nuxt-link>
      </ul>
      <div class="no-info-background" v-else></div>
      <div @click="changeMoreList('appointmentClass','fullStrengthList')" class="more">
        <span class="icon iconfont appointment-icon">&#xe6aa;</span>
        <span>换一换</span>
      </div>
    </div>
    <pc-tool></pc-tool>
    <pc-modal
      close
      class="advertising-container"
      width="900"
      height="400"
      v-model="advertisingShow"
    >
      <img class="head-title" src="../assets/imgs/modal-head-title.png" alt />
      <img class="modal-head-balloon" src="../assets/imgs/modal-head-balloon.png" alt />
      <div class="advertising-box" v-html="siteInformationData.content"></div>
      <div class="modal-bottom-balloon"></div>
    </pc-modal>
  </div>
</template>

<script>
import request from "@/axios/request";
import PcButton from "../components/pc-button";
import axios from "../axios/server";
import PcDate from "../components/pc-date";
import { getDateStr } from "../utils/utils";
import PcModal from "../components/pc-modal";
import PcTool from "../components/pc-tool";

export default {
  name: "home",
  components: { PcModal, PcDate, PcButton ,PcTool},
  // layout:'loginHead',
  data() {
    return {
      advertisingShow: false,
      startTimeId: null,
      seckillTimeId: null,
      endTimeId: null,
      deg: {
        seckill: 0,
        start: 0,
        end: 0,
        appointment: 0
      },
      detaList: [
        { label: "全部", value: 6 },
        { label: "今天", value: 1 },
        { label: "明天", value: 2 },
        { label: getDateStr(2), value: 3 },
        { label: getDateStr(3), value: 4 }
      ],
      activeIndex: {
        seckillClass: 6,
        upcomingClass: 6,
        upcomingClassEnd: 6
      },
      morePage: {
        seckillClass: 1,
        upcomingClass: 1,
        upcomingClassEnd: 1,
        appointmentClass: 1
      },
      stairsIndex: null,
      swiperOption: {
        loop: true,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30,
        paginationClickable: true,
        pagination: {
          el: ".swiper-pagination .down-inner",
          type: "custom",
          clickable: true,
          renderCustom: (swiper, current, total) => {
            let html = "";
            for (let index = 1; index <= total; index++) {
              if (current === index) {
                html += `<span class="swiper-pagination-bullet swiper-down-button swiper-pagination-bullet-active down-btn-hover" ></span>`;
              } else {
                html += `<span class="swiper-pagination-bullet swiper-down-button down-btn" ></span>`;
              }
            }
            return html;
          }
        },
        autoplay: { disableOnInteraction: false },
        on: {
          slideChange() {},
          tap() {}
        }
      }
    };
  },

  async asyncData() {
    const day = 6;
    let bannerData = (await request.getBanner()) || { data: {} };

    let seckillList = [];
    let startList = [];
    let endList = [];
    let fullStrengthList = {};
    let siteInformationData = {};
    // 秒杀班级
    let seckillClass = await request.seckillClass({ page_no: 1, page_size: 4 });
    try {
      seckillList = seckillClass.data.list;
    } catch (e) {
      console.log(e);
    }
    // 预约开始
    let upcomingClass = await request.upcomingClass({
      page_no: 1,
      page_size: 4,
      day: day
    });
    try {
      startList = upcomingClass.data.list;
    } catch (e) {
      console.log(e);
    }
    // 预约结束
    let upcomingClassEnd = await request.upcomingClassEnd({
      page_no: 1,
      page_size: 4,
      day: day
    });
    try {
      endList = upcomingClassEnd.data.list;
    } catch (e) {
      console.log(e);
    }
    // 预约满员
    let appointmentClass = await request.appointmentClass({
      page_no: 1,
      page_size: 5,
      day: day
    });
    if (
      appointmentClass &&
      appointmentClass.data &&
      appointmentClass.data.list
    ) {
      fullStrengthList = appointmentClass.data.list;
    }

    // 报名提醒
    let siteInformation = await request.siteInformation({
      site_manage_type: 2
    });
    if (
      siteInformation &&
      siteInformation.data &&
      siteInformation.data.site_information
    ) {
      siteInformationData = siteInformation.data.site_information;
    }

    return {
      bannerData: bannerData.data.banner_list, // 轮播
      seckillList: seckillList, // 轮播
      startList: startList, // 轮播
      endList: endList, // 轮播
      fullStrengthList: fullStrengthList, // 轮播
      siteInformationData: siteInformationData, // 报名提醒,
     
    };
  },
  async mounted() {
    // 设置定时器
    if (this.seckillList && this.seckillList.length > 0) {
      this.comSetInterval(
        "seckillTimeId",
        this.seckillList,
        "sign_up_end_time",
        () => {
          this.getClassList("seckillClass", "seckillList");
        }
      );
    }
    if (this.startList && this.startList.length > 0) {
      this.comSetInterval(
        "startTimeId",
        this.startList,
        "sign_up_start_time",
        () => {
          this.getClassList("upcomingClass", "startList");
        }
      );
    }
    if (this.endList && this.endList.length > 0) {
      this.comSetInterval("endTimeId", this.endList, "sign_up_end_time", () => {
        this.getClassList("upcomingClassEnd", "endList");
      });
    }
  },
  beforeDestroy() {
    // 清空定时器
    clearInterval(this.seckillTimeId);
    clearInterval(this.startTimeId);
    clearInterval(this.endTimeId);
  },
  methods: {
    listSetTime(timeId, list, paramName, cb) {
      list.map((item, index) => {
        let endTime = new Date(item[paramName]).getTime();
        let time = new Date().getTime();
        let date = endTime - time;

        if (endTime >= time) {
          var leave1 = date % (24 * 3600 * 1000);
          var leave2 = leave1 % (3600 * 1000);
          var leave3 = leave2 % (60 * 1000);
          let day = Math.floor(date / (24 * 3600 * 1000));
          let h =
            Math.floor(leave1 / (3600 * 1000)) > 9
              ? Math.floor(leave1 / (3600 * 1000))
              : "0" + Math.floor(leave1 / (3600 * 1000));
          let m =
            Math.floor(leave2 / (60 * 1000)) > 9
              ? Math.floor(leave2 / (60 * 1000))
              : "0" + Math.floor(leave2 / (60 * 1000));
          let s =
            Math.round(leave3 / 1000) > 9
              ? Math.round(leave3 / 1000)
              : "0" + Math.round(leave3 / 1000);

          this.$set(
            item,
            "time",
            day ? `${day}天${h}:${m}:${s}` : `${h}:${m}:${s}`
          );
        } else {
          this.$set(item, "time", 0);
        }
        if (cb && item.oldTime && !item.time) {
          cb();
        }
      });
    },
    // list设置定时器方法
    comSetInterval(timeId, list, paramName, cb) {
      this.listSetTime(timeId, list, paramName);
      this[timeId] = setInterval(() => {
        this.listSetTime(timeId, list, paramName, cb);
      }, 1000);
    },
    // 进入详情
    toDetails(item, index) {
      this.$router.push({ path: `/details?id=${item.class_id}` });
    },
    // 获取更多列表
    changeMoreList(type, list) {
      // page添加
      this.morePage[type]++;
      // 获取列表
      this.getClassList(type, list, this.morePage[type]);
      // 按钮旋转
      this.moreRotate(type);
    },
    // 更多旋转
    async moreRotate(type) {
      if (type === "seckillClass") {
        document.querySelector(
          ".seckill-icon"
        ).style.transform = `rotate(${(this.deg.seckill += 360)}deg)`;
      }
      if (type === "upcomingClass") {
        document.querySelector(
          ".upcoming-start-icon"
        ).style.transform = `rotate(${(this.deg.start += 360)}deg)`;
      }
      if (type === "upcomingClassEnd") {
        document.querySelector(
          ".upcoming-end-icon"
        ).style.transform = `rotate(${(this.deg.end += 360)}deg)`;
      }
      if (type === "appointmentClass") {
        document.querySelector(
          ".appointment-icon"
        ).style.transform = `rotate(${(this.deg.appointment += 360)}deg)`;
      }

      // if (data && data.data && data.data.list && data.data.list[0]) {
      //   this.morePage[type]++
      // }
    },
    // 根据type获取数据
    async getClassList(type, list, page) {
      let data = await request[type]({
        day: this.activeIndex[type],
        page_no: page ? page : 1,
        page_size: type === "appointmentClass" ? 5 : 4
      });
      if (data && data.data && data.data.list) {
        if (page) {
          if (data.data.list[0]) {
            this[list] = data.data.list;
          }
        } else {
          this[list] = data.data.list;
        }
        // 重置定时器
        if (type === "seckillClass") {
          clearInterval(this.seckillTimeId);
          this.comSetInterval(
            "seckillTimeId",
            this.seckillList,
            "sign_up_end_time",
            () => {
              this.getClassList(type, list, page);
            }
          );
        }
        if (type === "upcomingClass") {
          clearInterval(this.startTimeId);
          this.comSetInterval(
            "startTimeId",
            this.startList,
            "sign_up_start_time",
            () => {
              this.getClassList(type, list, page);
            }
          );
        }
        if (type === "upcomingClassEnd") {
          clearInterval(this.endTimeId);
          this.comSetInterval(
            "endTimeId",
            this.endList,
            "sign_up_end_time",
            () => {
              this.getClassList(type, list, page);
            }
          );
        }
      }
    },
  
  
  
    // 改变列表的日期
    changeDate(item, type, list) {
      this.activeIndex[type] = item.value;
      this.morePage[type] = 1;
      this.getClassList(type, list);
    },
    tagShow(item) {
      return (
        !item.min_age &&
        !item.min_age &&
        !item.is_rocking_number &&
        !item.is_interview
      );
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.home-container {
  .bulletin-board-box {
    position: relative;

    .bulletin-board {
      width: 1120px;
      height: 298px;
      padding: 65px 40px 121px 40px;
      margin: 68px auto 38px auto;
      background: url("../assets/imgs/bulletin-board.png") no-repeat;
      background-size: 100% 100%;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.9);

      .bulletin-board-hidden {
        height: 76px;
        overflow: hidden;
      }
    }

    .look-board {
      position: absolute;
      bottom: 100px;
      left: 50%;
      margin-left: -35px;
      font-size: 16px;
      font-weight: 400;
      color: #f9f2a5;
      cursor: pointer;

      .iconfont {
        margin-left: -7px;
      }
      &:hover {
        text-shadow: 0 0 2px #f9f2a5;
      }
    }
  }

  .mix-course-describe {
    height: 29px;
    margin: 9px 0 0 0;
    padding-bottom: 8px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    border-bottom: 1px solid @gray;

    span {
      display: inline-block;
      padding: 4px;
      margin-right: 2px;
      line-height: 10px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(33, 186, 88, 1);
      border: 1px solid rgba(33, 186, 88, 1);
    }

    span:nth-of-type(1) {
      // margin-right: 10px;
    }

    .blue {
      border: 1px solid #41d0ff;
      color: #41d0ff;
    }

    .orange {
      border: 1px solid #ff7723;
      color: #ff7723;
    }

    .gray {
      border: 1px solid #333;
      color: #333;
    }
  }

  .mix-course-describe-info {
    padding-top: 7px;

    .clear-both;

    .money-box {
      float: left;

      .reduced-rate {
        display: inline-block;
        width: 130px;
        font-size: 22px;
        font-weight: bold;
        color: rgba(254, 0, 0, 1);
        line-height: 17px;
        .com-ellipsis;
      }

      .original-cost {
        display: inline-block;
        margin: 4px 0 0 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        line-height: 12px;
        text-decoration: line-through;
      }

      .other-info {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 12px;
      }
    }

    .count-down {
      float: right;
      width: 95px;
      margin-top: 8px;
      text-align: right;
      line-height: 14px;
      font-size: 12px;
      font-weight: bold;
      color: rgba(153, 153, 153, 1);
      .com-ellipsis;
    }

    .course-button {
      float: right;
      width: 80px;
      margin-top: 2px;
      padding: 8px 9px 9px 9px;
      font-size: 14px;
      font-weight: bold;
      line-height: 14px;
      color: @white;
      border-radius: 2px;
      background: #fe0000;
    }

    .end-button {
      color: #fe0000;
      border: 1px solid #fe0000;
    }
  }

  .course-list-box {
    width: 1200px;
    margin: 0 auto;
    transition: all 2s;

    .course-main-title {
      width: 244px;
      height: 34px;
      margin: 0 auto 34px auto;
      background: url("../assets/imgs/course-title.png") no-repeat;
      background-size: 100% 100%;
    }

    .course-list {
      padding-bottom: 10px;
      transition: all 2s;
      background: @white;

      .course-head {
        padding: 43px 0 26px 0;
        margin-left: 15px;
        border-bottom: 1px solid @gray;
        .clear-both;

        .title {
          float: left;
          width: 150px;
          height: 23px;
          color: #333333;
          line-height: 23px;
          font-size: 24px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }

        .date-list {
          float: left;
          height: 16px;
          margin: 4px 0 0 60px;
          line-height: 16px;

          span {
            display: inline-block;
            margin-right: 48px;
            font-size: 16px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            cursor: pointer;

            &:hover {
              color: #21ba58;
            }
          }

          .active {
            position: relative;
            color: #21ba58;
            /*border-bottom: 4px solid #21BA58;*/

            &:after {
              position: absolute;
              display: block;
              content: " ";
              left: 0;
              bottom: -8px;
              width: 100%;
              height: 4px;
              background: #21ba58;
            }
          }
        }
      }

      .course-content-box {
        height: 278px;
        padding: 32px 0 0 11px;
        .clear-both;

        .referral-img {
          float: left;
          max-width: 190px;
          min-width: 190px;
          height: 245px;
          background-size: 100% 100%;
        }

        .course-content {
          float: left;
          display: inline-block;
          width: 225px;
          margin-left: 19px;
          /*padding: 0 5px;*/

          .course-img-box {
            width: 225px;
            height: 140px;
            border-radius: 2px;
            overflow: hidden;

            .course-img {
              width: 100%;
              height: 100%;
              transition: all 0.3s;
            }
          }

          .course-title {
            margin-top: 10px;
            font-size: 16px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 18px;
            .com-ellipsis;
          }

          .course-describe {
            .mix-course-describe;
          }

          .course-describe-info {
            .mix-course-describe-info;
          }

          &:hover {
            border-color: #05ce61;

            .course-title {
              color: #21ba58;
            }

            .course-img {
              transform: scale(1.2);
            }
          }
        }

        .course-content:nth-of-type(4) {
          margin-right: 20px;
        }
      }
    }

    .end-course {
      .reduced-rate {
        margin-top: 6px;
      }

      .course-button {
        /*background: #21BA58 !important;*/
      }
    }

    .start-course {
      .reduced-rate {
        margin-top: 12px;
      }

      .course-button {
        /*background: #21BA58 !important;*/
      }
    }

    .course-list:nth-of-type(2) {
      .referral-img {
        background-image: url("../assets/imgs/seckill-referral.png");
      }
    }

    .course-list:nth-of-type(3) {
      .referral-img {
        background-image: url("../assets/imgs/start-referral.png");
      }
    }

    .course-list:nth-of-type(4) {
      padding-bottom: 30px;

      .referral-img {
        background-image: url("../assets/imgs/end-referral.png");
      }
    }
  }

  .full-strength {
    width: 1200px;
    height: 391px;
    margin: 0 auto 50px auto;

    .more {
      float: inherit;
      margin: 0 auto;
    }

    .full-strength-title {
      width: 136px;
      height: 34px;
      margin: 58px auto 29px auto;
      background: url("../assets/imgs/full-strength.png") no-repeat;
      background-size: 100% 100%;
    }

    .full-strength-list-box {
      .full-strength-list {
        width: 230px;
        margin-right: 12px;
        transition: all 2s;
        background: @white;
        border-radius: 5px;

        .course-img-box {
          width: 230px;
          height: 140px;
          border-radius: 2px;
          overflow: hidden;

          .course-img {
            width: 100%;
            height: 100%;
            transition: all 0.3s;
          }
        }

        .course-info-box {
          padding: 13px 10px;

          .course-title {
            font-size: 17px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 17px;
            .com-ellipsis;
          }

          .course-describe {
            .mix-course-describe;
            padding-bottom: 9px;
            border-color: transparent;

            span {
              margin-right: 0;
            }
          }

          .course-describe-info {
            line-height: 18px;

            .clear-both;

            .other-info {
              float: left;
              height: 14px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(204, 204, 204, 1);
            }

            .reduced-rate {
              float: right;
              height: 18px;
              font-size: 21px;
              font-weight: bold;
              color: rgba(254, 0, 0, 1);
              line-height: 18px;
            }
          }
        }

        &:hover {
          /*background: #05CE61 !important;*/

          .course-title {
            color: #21ba58;
          }

          .course-img {
            transform: scale(1.2);
          }
        }
      }

      .full-strength-list:nth-last-of-type(1) {
        margin-right: 0;
      }
    }
  }

  .no-info-background {
    height: 100%;
    max-height: 300px;
    background: url("../assets/imgs/no-info.png") no-repeat;
    background-position: 50% 50%;
    background-color: @white;
  }

  .more {
    float: right;
    width: 82px;
    height: 28px;
    margin-right: 22px;
    padding: 7px 0;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    cursor: pointer;
    background-size: 100% 100%;

    .icon {
      margin-right: 5px;
      font-size: 14px;
      transition: all 0.3s;

      &:before {
        display: inline-block;
      }
    }

    span {
      display: inline-block;
      line-height: 14px;
    }

    &:hover {
      color: @baseColor;
    }
  }

  .stairs-box {
    position: fixed;
    top: 100px;
    right: 50%;
    width: 50px;
    margin-right: 620px;
    z-index: 4;
    font-size: 12px;

    .stairs {
      height: 57px;
      padding: 13px 6px 13px 10px;
      background: rgba(255, 255, 255, 1);
      letter-spacing: 4px;
      line-height: 16px;
      color: #666;
      cursor: pointer;
    }

    .last-stairs {
      height: 72px !important;
      padding: 13px 6px 28px 10px !important;

      border-radius: 0 0 25px 25px;
      border: 1px solid @gray;
      .stairs;
    }

    .first-stairs {
      height: 72px !important;
      padding: 28px 6px 13px 10px !important;

      border-radius: 25px 25px 0 0;
      border: 1px solid @gray;
      .stairs;
    }

    .active {
      color: @white;
      background: #21ba58;
    }
  }


}
</style>
<style lang="less">
.home-container {
  .bulletin-board {
    p {
      margin-bottom: 10px;
    }

    .ly-mce-radius {
      color: #515957 !important;
      background: #f9f2a5 !important;
      border-radius: 50% !important;
    }

    /*ol{*/
    /*    li{*/
    /*        position: relative;*/
    /*        width: 100%;*/
    /*    }*/
    /*}*/
  }

  .banner-box {
    position: relative;
    width: 100%;
    height: 450px;
    background: #343434;

    .swiper-container {
      height: 100%;

      .swiper-slide {
        width: auto;
        min-width: 1920px;
        overflow: hidden;
        text-align: center;
        background: rgba(255, 255, 255, 0.7);
        cursor: pointer;
      }

      img {
        /*min-width: 100%;*/
        height: 100%;
      }

      .swiper-pagination {
        position: absolute;
        left: 50%;
        bottom: 10px;
        padding: 3px 9px 4px 9px;
        z-index: 2;
        /*background: url("../assets/imgs/banner-btn.png") no-repeat;*/
        /*background-size: 100%;*/
        background: rgba(0, 0, 0, 0.3);
        transform: translateX(-50%);
        border-radius: 9px;

        .down-inner {
          display: flex;
          height: 100%;
          justify-content: space-between;

          .down-btn-hover {
            opacity: 1;
            background: #fff !important;
          }

          .down-btn {
            opacity: 1;
            background: rgba(255, 255, 255, 0.5);
          }

          .swiper-down-button {
            display: block;
            width: 11px;
            height: 11px;
            margin-left: 14px;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
          }

          .swiper-down-button:nth-of-type(1) {
            margin-left: 0;
          }
        }
      }

      /* .swiper-pagination {
                     position: absolute;
                     top: 50%;
                     right: 361px;
                     left: auto;
                     bottom: auto;
                     width: 172px;
                     padding: 16px 20px 17px 20px;
                     background-color: rgba(0, 0, 0, 0.5);
                     !*background: #000;*!
                     color: @white;
                     transform: translateY(-50%);

                     .swiper-pagination-bullet-active {
                         !*background: #05CE61 !important;*!
                         color: #21BA58 !important;
                     }

                     .swiper-pagination-bullet {
                         letter-spacing: -0.8px;
                         display: block !important;
                         width: 100% !important;
                         height: 100%;
                         margin: 0 0 24px 0;
                         text-align: left;
                         color: @white;
                         background: transparent;
                         border-radius: 0;
                         font-size: 15px;
                         font-weight: 400;
                         opacity: 1;
                         cursor: pointer;
                         .com-ellipsis;

                         &:hover {
                             color: #21BA58;
                         }
                     }

                     .swiper-pagination-bullet:nth-last-of-type(1) {
                         margin-bottom: 0;
                     }
                 }*/
    }
  }

  .advertising-container {
    position: relative;
    width: 100%;

    .advertising-box {
      height: 100%;
      padding: 64px 35px 45px 35px;
      overflow: auto;
      .scrollbar-box;

      p {
        margin-bottom: 10px;
      }
    }

    .head-title {
      position: absolute;
      top: -31px;
      left: 50%;
      width: 187px;
      height: 63px;
      margin-left: -94px;
    }

    .modal-head-balloon {
      position: absolute;
      top: -103px;
      left: -69px;
      width: 138px;
      height: 206px;
    }

    .modal-bottom-balloon {
      box-sizing: content-box;
      position: absolute;
      bottom: -20px;
      left: -17px;
      width: 100%;
      height: 131px;
      padding: 0 20px;
      background: url("../assets/imgs/modal-bottom-balloon.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
