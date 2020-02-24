export const appointmentStatus = {
  waitLottery: {
    title: "预约成功，请注意关注摇号结果和通知短信，摇中后请尽快缴费",
    subTitle: "",
    submitBool: true,
    cancelBool: true,
    cancelMsg: "取消预约后将不能参与班级摇号是否继续？"
  },
  waitInterview: {
    title: "预约成功，请尽快联系老师进行面试",
    subTitle: "",
    submitBool: true,
    cancelBool: true,
    cancelMsg: "取消预约后将不能参与班级面试是否继续？"
  },

  lotterySuccess: {
    title: "恭喜你，您已经中签",
    subTitle:
      "请尽快在有效期内完成支付；超过有效期未完成缴费，将自动取消您的资格",
    submitBool: true,
    cancelBool: true,
    cancelMsg: ""
  },
  interviewSuccess: {
    title: "已通过面试",
    subTitle:
      "请尽快在有效起内完成支付；超过有效期未完成缴费的，将自动取消您的资格",
    submitBool: true,
    cancelBool: true,
    cancelMsg: ""
  },
  lotterySuccessInterview: {
    title: "已通过面试",
    subTitle:
      "请按照面试信息进行面试，通过后才可缴费",
    submitBool: true,
    cancelBool: true,
    cancelMsg: ""
  },

  lotteryFail: {
    title: "很抱歉，您未中签",
    subTitle: "您还可以选择报名其他班级",
    submitBool: false,
    cancelBool: false,
    cancelMsg: ""
  },
  interviewFail: {
    title: "很抱歉，您未通过面试",
    subTitle: "您还可以选择报名其他班级",
    submitBool: false,
    cancelBool: false,
    cancelMsg: ""
  }
};
export const constant = {
  WAIT_LOTTERY: 1, // 等待摇号
  WAIT_INTERVIEW: 2, // 等待面试
  SUCCESS: 3, //成功 分为三种情况  摇号成功 面试成功 摇号加面试都成功
  INTERVIEW_FAIL: 10, // 面试失败
  LOTTERY_FAIL: 11 //摇号失败
};
