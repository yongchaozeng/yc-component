import {getcookies, clearCookie, formateObjToParamStr} from '../utils/utils';
import utils from '../utils/utils';
import {axiosCreate} from '../axios/server';
import {isAuthUrl} from "../axios/tokenAuth";


export default async function ({req, res, route, redirect, query, store}) {
    // loginClose用来处理弹窗刷新父级页面
    if (route.path !== '/loginClose') {

        if (process.server) {
            // 存在st调用login获取token 并存入cookie
            if (query.ticket) {
                await store.dispatch('login', {ticket: query.ticket, req: req, res: res});
                await getCommonData(store, res, req, redirect);
                delete query.ticket;
                redirect(`${route.path}?${utils.formateObjToParamStr(query)}`);
            }
            // 已经有token 页面刷新时从cookie获取
            else if (req.headers.cookie && getcookies(req.headers.cookie, 'client_id') && getcookies(req.headers.cookie, 'access_token')) {
                let client_id = getcookies(req.headers.cookie, 'client_id');
                let access_token = getcookies(req.headers.cookie, 'access_token');
                axiosCreate.defaults.headers.client_id = client_id;
                axiosCreate.defaults.headers.Authorization = access_token;
                store.commit('setUser', {client_id: client_id, access_token: access_token});

                await getCommonData(store, res, req, redirect, route);
            }
            // 没有token的时候 拦截进入一些页面
            else if (req && route.path && isAuthUrl(route.path)) {
                if (req.headers.cookie && getcookies(req.headers.cookie, 'client_id')) {

                } else {
                    redirect('/');
                }
            }
        }
    }

}


// 获取到token后请求公共数据
async function getCommonData(store, res, req, redirect, route) {
    await store.dispatch('getOssUrl', {res, req, redirect, route});
    await store.dispatch('getPersonalData',);
}


