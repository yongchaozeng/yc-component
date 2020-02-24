import axios from "axios";

import {refreshToken,STastDue} from "./tokenAuth";
import $msg from "../utils/message";



const service = axios.create({
    baseURL: process.env.baseUrl,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
    }
});
const client = axios.create({
    baseURL: process.env.clientBaseUrl,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
    }
});

setHeader(client)
setHeader(service)

function setHeader(service){
    service.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";

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
            const error_code = response.data.error_code;

            if (Object.prototype.toString.call(res) === "[object ArrayBuffer]") {
                return res;
            }

            if (error_code != 999999) {
                if (process.client) {
                    $msg(response, {type: "error"});
                } else {
                    console.error(response);
                }
            }
            return res;
        },
        async (error) => {
            // 错误码 99993 刷新token 客户端和服务端

            if (process.client) {
                if (error &&
                    error.response &&
                    error.response.data && error.response.data.error_code === 99993) {
                    return await refreshToken(service,error);

                }
                if (
                    error &&
                    error.response &&
                    error.response.data &&
                    error.response.data.msg
                ) {
                    if (error.response.data.error_code === 99995 ||error.response.data.error_code === 99994) {
                        await STastDue(service);
                    }else{
                        $msg(error.response.data.msg, {type: "error"});
                    }
                   
                }
            } else {
                console.error(error.response || "");
            }

            return Promise.reject(error);
        }
    );
}


export const axiosCreate = service;
export const clientAxiosCreate = client;
export default {
    get: (...params) => {
        let getParams= params[0].includes('?')
            ? `${params[0]}&time=${new Date().getTime()}`
            : params[0] = `${params[0]}?time=${new Date().getTime()}`;
        return (process.client?client:service).get(getParams).catch(e => {
            console.error(e);
        });
    },
    post: (...params) => {
        return (process.client?client:service).post(...params).catch(e => {
            console.error(e);
            // return e
        });
    },
    put: (...params) => {
        return (process.client?client:service).put(...params).catch(e => {
            console.error(e);
        });
    },
    delete: (...params) => {
        return (process.client?client:service).delete(...params).catch(e => {
            console.error(e);
        });
    }
};

