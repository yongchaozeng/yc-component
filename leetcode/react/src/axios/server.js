import axios from "axios";
import {lyUrl} from "../config";
import $msg from '../utils/message'
const service = axios.create({
    baseURL: lyUrl,
    timeout: 20000,
});

service.defaults.headers["Content-Type"] =
    "application/x-www-form-urlencoded";
// service.defaults.withCredentials=true

// request拦截器
service.interceptors.request.use(
    config => {
        config.emulateJSON = true;
        return config;
    },
    error => {
        Promise.reject(error);
    }
);
// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if(res.errno === 202){
               $msg('活动已结束啦~')
        }
        // if (Object.prototype.toString.call(res) === "[object ArrayBuffer]") {
        //     return res;
        // }
        //
        return res;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

export default {
    get: (...params) => {
        let getParams= params[0].includes('?')
            ? `${params[0]}&time=${new Date().getTime()}`
            : params[0] = `${params[0]}?time=${new Date().getTime()}`;
        return service.get(getParams).catch(e => {
            console.error(e);
        });
    },
    post: (...params) => {
        return service.post(...params).catch(e => {
            console.error(e);
            // return e
        });
    },
    put: (...params) => {
        return service.put(...params).catch(e => {
            console.error(e);
        });
    },
    delete: (...params) => {
        return service.delete(...params).catch(e => {
            console.error(e);
        });
    }
};


