import qs from 'qs';
import axios from 'axios'
import {baseUrl} from "../config";
let url = baseUrl

axios.defaults.withCredentials=true
export default {
    wxShare(data) {
        return axios.post( `${url}/api/wechat/config`,data);
    },
    login(data) {
        return axios.post( `${url}/sso/login`,data);
    },
    gameLogin(data) {
        return axios.post( `${url}/login`,data);
    },
    logout(data) {
        return axios.post( `${url}/logout`,data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}});
    },
    user(data) {
        return axios.post( `${url}/sso/user`,data);
    },
    vote(data) {
        return axios.post( `${url}/api/vote/add`,data);
    },
    cardList(data) {
        return axios.get( `${url}/api/vote/card_list?${qs.stringify(data)}`,);
    },
    championInfo(data) {
        return axios.get( `${url}/api/vote/champion`,);
    },
};

