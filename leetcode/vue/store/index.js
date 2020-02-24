import Vue from 'vue'
import Vuex from 'vuex'
import request from '../axios/request'
import { axiosCreate } from '../axios/server'
import {serviceAuth} from "../axios/tokenAuth";

Vue.use(Vuex)
const store = () =>
  new Vuex.Store({
    state: {
      personalData: {},
      classCategory: {},
      ticket: '',
      accessToken: '',
      userId: '',
      ossUrl: '',
      contact: {},
      details: '',
    },
    mutations: {
      setPersonalData(state, data) {
        // 默认头像
        data.url = data.url ? data.url : require('@/assets/imgs/base-head-img.png')
        state.personalData = data
      },
      setClassCategory(state, data) {
        state.classCategory = data
      },
      setTicket(state, data) {
        state.ticket = data
      },
      setUser(state, data) {
        state.accessToken = data.access_token
        state.userId = data.client_id
      },
      setContact(state, data) {
        state.contact = data
      },
      setDetails(state, data) {
        state.datails = data
      },
      setOssUrl(state, data) {
        state.ossUrl = data
      },
    },
    actions: {
      async nuxtServerInit({ commit, state, dispatch, }, { route, query, res, req }) {

        // 首页分类列表
        await dispatch('getClassCategory')
      },
      /* 获取用户信息 */
      async login({ commit, state }, { ticket, res, req }) {
        let data = await request.stValidate({ st: ticket })
        try {
          res.setHeader('Set-Cookie', [[`client_id=${ data.data.client_id};path=/;` ], ['access_token=' + `${data.data.access_token}; path=/;`]])
          axiosCreate.defaults.headers.client_id = data.data.client_id
          axiosCreate.defaults.headers.Authorization = data.data.access_token
          commit('setUser', { client_id: data.data.client_id, access_token: data.data.access_token })
        } catch (e) {
          console.log(e)
        }
      },
      /* 获取用户信息 */
      async getPersonalData({ commit }) {
        let data = await request.personalData()
        try {
          commit('setPersonalData', data.data.user_info)
        } catch (e) {
          console.log(e)
        }
      },
      /* 获取班级细腻些 */
      async getClassCategory({ commit }) {
        let data = await request.classCategory() // 班级列表
        if(data && data.data && data.data.class_list){
          commit('setClassCategory', data.data.class_list)
        }else{
        }
      },

      /* 获取oss地址 */
      async getOssUrl({ commit },{res,req,redirect,route}) {
        let data = await request.ossUrl() // 班级列表
        if(data && data.data && data.data.oss_base_url){
          commit('setOssUrl', data.data.oss_base_url)
        }else{
            serviceAuth()
        }

      },
      /* 进入登录页 */
      async toLogin({ commit }) {
        window.location.href = `${process.env.loginUrl}?service=${process.env.service}`
      },

    },
    getters: {
      userName(state) {
        return state.personalData.real_name || state.personalData.phone || state.personalData.id
      },
    },

  })

export default store
