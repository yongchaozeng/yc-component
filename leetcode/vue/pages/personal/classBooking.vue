<template>
  <div class="class-booking-container com-order-style">
    <div class="order-search">
      <div class="order-filter" :class="{'active':orderType === 0}" @click="changeOrderType(0)">全部班级</div>
      <div class="order-filter" :class="{'active':orderType === 1}" @click="changeOrderType(1)">待摇号</div>
      <div class="order-filter" :class="{'active':orderType === 2}" @click="changeOrderType(2)">待面试</div>
    </div>
    <div class="order-head">
      <div class="order-head-info">
        <p class="info">班级信息</p>
        <p class="money">学员姓名</p>
      </div>
      <p class="handle-title">操作</p>
      <p class="order-status-title">班级状态</p>
    </div>
    <template v-if="infoShow === true">
      <div class="order-list-box" v-if="orderList && orderList.length>0">
        <div
          @click="toDetails(item,index)"
          class="order-list"
          v-for="(item,index) in orderList"
          :key="index"
        >
          <div class="order-course">
            <div class="order-course-info">
              <div class="order-course-title">
                <div class="course-title">{{item.class_name}}</div>
                <p class="com-sign" v-if="item.term_label">{{item.term_label}}</p>
                <p class="com-sign" v-if="item.year" style="background: #41D0FF">{{item.year}}</p>
                <p
                  class="com-sign"
                  v-if="item.specialized_subject_name"
                  style="background: #FF7723"
                >{{item.specialized_subject_name}}</p>

                <div class="course-number">
                  <span class="subscribe-number">预约号：{{item.reservation_number}}</span>
                </div>
              </div>
            </div>
            <div class="order-course-status">
              <div class="order-money">{{item.contact_name}}</div>
              <span
                class="order-status"
                :class="[{'red':item.sign_up_status  === 4 ||item.sign_up_status  === 8||item.sign_up_status  === 11||item.sign_up_status  === 12}
                              ,{'green':item.sign_up_status  === 7 ||item.sign_up_status  === 1 ||item.sign_up_status ===2 ||item.sign_up_status  === 3}]"
              >{{item.sign_up_status_label}}</span>
              <span class="handle-button">
                <pc-button
                  v-if="item.is_interview && (item.sign_up_status===2)"
                  type="login"
                  height="30"
                  @click.stop="openInterview(item,index)"
                  radius
                  style=" margin-bottom: 8px;"
                >面试信息</pc-button>

                <pc-button
                  v-if="item.sign_up_status === 1 || item.sign_up_status === 2"
                  class="cancel-order"
                  type="login"
                  height="30"
                  @click.stop="openCancelOrder(item,index)"
                  radius
                >取消预约</pc-button>

                <pc-button
                  class="apply-order"
                  v-if="item.sign_up_status === 3"
                  type="login"
                  height="30"
                  @click.stop="toDetails(item,index)"
                  radius
                >立即缴费</pc-button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <pc-page
        class="page-container"
        v-if="total>5"
        :current="page"
        :page-size="5"
        @on-change="changeOrder"
        :total="total"
      ></pc-page>
    </template>
    <no-info v-else-if="infoShow === false"></no-info>

    <pc-modal width="520" height="250" v-model="interviewShow">
      <div class="interview-box">
        <p class="interview-title">面试信息</p>
        <p
          class="interview-date"
        >面试时间：{{interview.interview_start_time}}-{{interview.interview_end_time}}</p>
        <p class="interview-address">面试备注:{{interview.interview_remarks}}</p>
        <pc-button class="confirm" @click="interviewShow = false">确定</pc-button>
      </div>
    </pc-modal>

    <pc-modal width="520" height="198" v-model="cancelShow">
      <div class="interview-box">
        <p class="interview-title">取消预约</p>
        <p class="interview-date">{{signStatus === 1?'取消预约后将不能参与班级摇号是否继续':'取消预约后将不能参与班级面试是否继续'}}？</p>
        <pc-button class="cancel-button" @click="cancelShow = false">取消</pc-button>
        <pc-button class="confirm-button" @click="cancelInterview">确定</pc-button>
      </div>
    </pc-modal>
  </div>
</template>

<script>
import PcButton from "../../components/pc-button";
import request from "../../axios/request";
import PcModal from "../../components/pc-modal";
import PcPage from "../../components/pc-page";
import NoInfo from "../../components/no-info";

const FAIL_INTERVIEW = 10

export default {
  /* 个人资料 */
  name: "classBooking",
  data() {
    return {
      interview: {},
      interviewShow: false,
      cancelShow: false,
      orderType: 0,
      orderList: null,
      page: 1,
      total: 1,
      timeId: null,
      infoShow: null,
      signStatus:0,
    };
  },

  mounted() {
    this.getOrderList();
  },
  beforeDestroy() {
    clearInterval(this.timeId);
  },
  methods: {
    toDetails(item, index) {
      if (
        item.sign_up_status === 1 ||
        item.sign_up_status === 2 ||
        item.sign_up_status === 3|| item.sign_up_status === FAIL_INTERVIEW
      ) {
        this.$router.push({ path: `/appointment?id=${item.id}` });
      }
    },
    changeOrder(page) {
      this.page = page;
      this.getOrderList();
    },

    openInterview(item) {
      this.interviewShow = true;
      this.interview = item;
    },
    payOrder(item, index) {
      sessionStorage.order = JSON.stringify(item);
      this.$router.push({ path: "/collectMoney" });
    },
    async getOrderList() {
      let formData = { page_no: this.page, page_size: 5 };
      if (this.orderType) {
        formData.sign_up_status = this.orderType;
      }
      let data = await request.signUpList(formData);
      if (data && data.data && data.data.list && data.data.total) {
        this.orderList = data.data.list;
        this.total = data.data.total;
        this.infoShow = true;
      } else {
        this.infoShow = false;
      }
    },

    changeOrderType(type) {
      this.page = 1;
      this.orderType = type;
      this.getOrderList();
    },
    openCancelOrder(item, index) {
      this.id = item.id;
      this.signStatus = item.sign_up_status
      this.cancelShow = true;
    },
    // 取消面试
    async cancelInterview() {
      let data = await request.cancelSignUp(this.id);
      try {
        this.$msg(data.msg);
        this.cancelShow = false;
        this.getOrderList();
      } catch (e) {}
    }
  },
  components: { NoInfo, PcPage, PcModal, PcButton }
};
</script>

<style lang="less">
.class-booking-container {
  .cancel-order {
    color: #333 !important;
    background: rgba(249, 249, 249, 1) !important;
    border: 1px solid rgba(243, 243, 243, 1) !important;
  }

  .apply-order {
    background: #fe3a36 !important;
  }
}
</style>

