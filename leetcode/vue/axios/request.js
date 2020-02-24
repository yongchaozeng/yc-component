import Axios from './server'
import {clientAxiosCreate} from './server'
import qs from 'qs'
import cookie from 'js-cookie'

if (process.client) {
  let client_id = null
  let access_token = null
  // client_id = cookie.get('add')

  clientAxiosCreate.defaults.headers.client_id = cookie.get('client_id')
  clientAxiosCreate.defaults.headers.Authorization = cookie.get('access_token')

}



export default {
  //  st校验
  stValidate(data) {
    return Axios.post('/children_center/front/api/st_validate', data)
  },
  //
  setUser(data) {
    return Axios.post('/children_center/front/api/edit_personal_data',data)
  },
  //  上传
  upload(data) {
    return Axios.post('/children_center/front/api/upload', data)
  },
  //  ossUrl
  ossUrl(data) {
    return Axios.get('/children_center/front/api/oss_base_url')
  },
  //  用户信息 // 需要token
  logOut(data) {
    return Axios.post('/children_center/front/api/logout',)
  },

  //  获取班级信息
  classCategory() {
    return Axios.get('/children_center/front/api/class_category')
  },
  //  获取轮播
  getBanner() {
    return Axios.get(`/children_center/front/api/exhibition_banner`)
  },
  //  获取个人用户信息
  personalData() {
    return Axios.get(`/children_center/front/api/personal_data?${new Date().getTime()}`)
  },
  //  获取联系人列表
  contactList() {
    return Axios.get(`/children_center/front/api/contact_information`)
  },
  //   添加联系人
  addContactList(data) {
    return Axios.post(`/children_center/front/api/add_contact_information`, data)
  },
  //   删除联系人
  daleteContactList(data) {
    return Axios.delete(`/children_center/front/api/delete_contact_information/${data}`)
  },
  //   编辑联系人
  editContactList(id, data) {
    return Axios.put(`/children_center/front/api/edit_contact_information/${id}`, data, )
  },
  //  获取联系人详情
  contactDetails(data) {
    return Axios.get(`/children_center/front/api/detail_contact_information/${data}`)
  },
  //  联系人年级枚举
  enumChoose(data) {
    return Axios.get(`/children_center/front/api/grade_type_enum_choose`)
  },


  //  获取修改密码验证码
  passwordCode(data) {
    return Axios.get(`/children_center/front/api/change_password?time=${new Date().getTime()}`,)
    // return `${process.env.baseUrl}/children_center/front/api/change_password?time=${data}`
  },
  //  修改密码验证旧密码
  changePassword(data) {
    return Axios.post(`/children_center/front/api/change_password`, data)
  },
  //  修改密码
  putChangePassword(data) {
    return Axios.put(`/children_center/front/api/change_password`, data)
  },

  //  绑定手机的图片验证码
  phoneImgCode(data) {
    return Axios.get(`/children_center/front/api/send_sms?time=${new Date().getTime()}`,)
  },
  //  获取手机绑定需要的短信验证码
  phoneNoteCode(data) {
    return Axios.post(`/children_center/front/api/send_sms`, data)
  },
  //  绑定手机号
  bindPhone(data) {
    return Axios.post(`/children_center/front/api/binding_phone_number`, data)
  },
  //  获取当前手机号
  sendPhoneNumber(data) {
    return Axios.get(`/children_center/front/api/see_phone_num`, data)
  },
  //  验证旧手机号
  verifyOldPhone(data) {
    return Axios.post(`/children_center/front/api/verify_old_phone_number`, data)
  },
  //  验证旧手机号获取短信
  verifyOldSms(data) {
    return Axios.post(`/children_center/front/api/verify_old_phone_number_send_sms`, data)
  },
  //  绑定新手机号
  bindNewPhone(data) {
    return Axios.post(`/children_center/front/api/binding_new_phone_num`, data)
  },
  //  获取系统消息
  systemMessageList(data) {
    return Axios.get(`/children_center/front/api/system_message_list?${qs.stringify(data)}`,)
  },
  //  获取系统消息详情
  systemMessageDetails(data) {
    return Axios.get(`/children_center/front/api/system_message_detail/${data}`,)
  },
  //  查看系统消息
  readSystemMessageAll(data) {
    return Axios.put(`/children_center/front/api/system_message_all_read`,)
  },
  //  系统消息数量
  sysMessageNumber(data) {
    return Axios.get(`/children_center/front/api/system_message_is_see_num`,)
  },
  //  获取邮箱
  sendMailbox(data) {
    return Axios.get(`/children_center/front/api/check_mailbox`, data)
  },
  //  首次绑定邮箱验证码
  binMailboxCode(data) {
    return Axios.post(`/children_center/front/api/send_mailbox_verification_code`, data)
  },
  //  首次绑定邮箱
  binMailbox(data) {
    return Axios.post(`/children_center/front/api/mailbox_relevance`, data)
  },
  //  更改邮箱验证码
  changeMailboxCode(data) {
    return Axios.get(`/children_center/front/api/verify_old_mailbox?time=${new Date().getTime()}`, data)
  },
  //  验证旧邮箱
  verifyOldMailbox(data) {
    return Axios.post(`/children_center/front/api/verify_old_mailbox`, data)
  },
  //  更改邮箱
  changeMailbox(data) {
    return Axios.post(`/children_center/front/api/change_mailbox`, data)
  },
  //  获取实名信息
  authentication(data) {
    return Axios.get(`/children_center/front/api/real_name_authentication`, data)
  },
  //  认证实名信息
  changeAuthentication(data) {
    return Axios.post(`/children_center/front/api/real_name_authentication`, data)
  },
  //  分中心
  centerList(data) {
    return Axios.get(`/children_center/front/api/homepage_center`, data)
  },
  //  专业
  specialtyList(data) {
    return Axios.get(`/children_center/front/api/search_page_specialty/${data}`,)
  },
  //  搜索班级
  searchConditions(data) {
    return Axios.get(`/children_center/front/api/search_by_screening_conditions?${qs.stringify(data)}`,)
  },
  //  班级详情
  classDetails(data) {
    return Axios.get(`/children_center/front/api/class_detail/${data}`,)
  },
  //  班级大类
  classDetailsCategories(data) {
    return Axios.get(`/children_center/front/api/get_major_categories_of_projects/${data}`,)
  },
  //  班级详情日历
  classDetailsDate(data) {
    return Axios.get(`/children_center/front/api/class_detail_datetime_and_classroom/${data}`,)
  },
  //  获取项目大类
  classDetailsProjects(data) {
    return Axios.get(`/children_center/front/api/get_major_categories_of_projects/${data}`,)
  },
  //  新增收藏
  addCollection(data) {
    return Axios.post(`/children_center/front/api/add_my_collection`, data)
  },
  //  是否收藏
  whetherCollection(data) {
    return Axios.get(`/children_center/front/api/judge_whether_collection/${data}`,)
  },
  //  收藏枚举对应关系
  collectionType(data) {
    return Axios.get(`/children_center/front/api/get_collection_type`,)
  },
  //  收藏列表
  collectionList(type, data) {
    return Axios.get(`/children_center/front/api/get_my_collection/${type}?${qs.stringify(data)}`,)
  },
  //  删除收藏
  deleteCollectionList(data) {
    return Axios.delete(`/children_center/front/api/delete_my_collection/${data}`,)
  },
  //  富文本信息
  siteInformation(data) {
    return Axios.get(`/children_center/front/api/site_information?${qs.stringify(data)}`,)
  },
  //  秒杀班级
  seckillClass(data) {
    return Axios.get(`/children_center/front/api/seckill_class_curriculum?${qs.stringify(data)}`,)
  },
  //  预约开始
  upcomingClass(data) {
    return Axios.get(`/children_center/front/api/sign_up_for_upcoming_class?${qs.stringify(data)}`,)
  },
  //  预约结束
  upcomingClassEnd(data) {
    return Axios.get(`/children_center/front/api/sign_up_is_coming_to_end?${qs.stringify(data)}`,)
  },
  //  预约即将满员
  appointmentClass(data) {
    return Axios.get(`/children_center/front/api/make_full_appointment_class?${qs.stringify(data)}`,)
  },
  //  意见反馈列表
  feedbackList(data) {
    return Axios.get(`/children_center/front/api/feedback_get_problem_type`,)
  },
  //  意见反馈
  feedbackOption(data) {
    return Axios.post(`/children_center/front/api/opinion_feedback`, data)
  },
  //  家长问答
  parentsList(data) {
    return Axios.get(`/children_center/front/api/parents_questions_and_answers`, data)
  },
  //  招生意见详情
  contactUs(data) {
    return Axios.get(`/children_center/front/api/contact_us?${qs.stringify(data)}`)
  },
  //  招生意见列表
  allOrg(data) {
    return Axios.get(`/children_center/front/api/get_all_org`, data)
  },
  //  获取报名费用
  getSignUpFee(data) {
    return Axios.get(`/children_center/front/api/get_sign_up_fee?${qs.stringify(data)}`,)
  },
  //  报名
  signUp(data) {
    return Axios.post(`/children_center/front/api/sign_up`, data)
  },
  //  订单列表
  orderList(data) {
    return Axios.get(`/children_center/front/api/order_list?${qs.stringify(data)}`,)
  },
  //  取消订单
  cancelOrder(data) {
    return Axios.post(`/children_center/front/api/cancel_order/${data}`,)
  },
   //  订单详情
   orderDetails(data) {
    return Axios.get(`/children_center/front/api/order_detail/${data}`,)
  },
  //  获取支付类型
  payTypeChoose(data) {
    return Axios.get(`/children_center/front/api/pay_type_choose`,)
  },
  //  支付
  paySignUp(data) {
    return Axios.post(`/children_center/front/api/pay_sign_up`,data)
  },
  //  wx认证信息
  wxInfo(data) {
    return Axios.get(`/children_center/front/api/get_register_user_auth_info?${qs.stringify(data)}`,)
  },
  //  wx认证解绑
  wxDelete(data) {
    return Axios.delete(`/children_center/front/api/unbound_register_user_auth_info?${qs.stringify(data)}`,)
  },
 //  预约列表
  signUpList(data) {
    return Axios.get(`/children_center/front/api/sign_up_list?${qs.stringify(data)}`,)
  },
//  预约order信息
  signUpOrder(data) {
    return Axios.get(`/children_center/front/api/sign_up/${data}`,)
  },

//  signUpOrder接口没有order的时候调用
  placeOrder(data) {
    return Axios.post(`/children_center/front/api/place_order`,data)
  },
  //  取消预约
  cancelSignUp(data) {
    return Axios.post(`/children_center/front/api/cancel_sign_up/${data}`,)
  },
 //  退款详情
  refundDetail(data) {
    return Axios.get(`/children_center/front/api/refund_detail/${data}`,)
  },

 //  申请退款
  applyRefund(data) {
    return Axios.post(`/children_center/front/api/apply_refund/${data}`,)
  },

 //  我的班级列表
  myClass(data) {
    return Axios.get(`/children_center/front/api/my_class?${qs.stringify(data)}`,)
  },
  //  获取订单状态 //2已经付
  orderStatus(data) {
    return Axios.get(`/children_center/front/api/get_order_status/${data}`,)
  },
  // 申请发票
  invoiceApplication(data) {
    return Axios.post(`/children_center/front/api/invoice_application`,data)
  },
  // 发票枚举类型
  invoiceType(data) {
    return Axios.get(`/children_center/front/api/invoice_title_enum_type_choose`,data)
  },
  // 获取发票详情
  queryInvoiceDetail(data) {
    return Axios.get(`/children_center/front/api/query_invoice_detail/${data}`,)
  },



}
