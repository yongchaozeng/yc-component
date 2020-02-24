import Axios from './server';
import qs from 'qs';

const appcode = 'e584d8e7c40';

/*
  通用官网接口
   groupList 投票卡牌分组列表
   voteDownInfo 下载信息
   voteRuleText 总决赛配置
   votingGroup 卡牌分组管理
   champion 人气冠军配置
*/
export default {
    groupList() {
        return Axios.get(`/resources?${qs.stringify({
            appcode: appcode,
            menu_mark: ['cardManagement',],
            lang: 'zh-cn',
            'per-page':1000
        })}`,);
    },
    voteDownInfo() {
        return Axios.get(`/resources?${qs.stringify({
            appcode: appcode,
            menu_mark: 'download',
            lang: 'zh-cn'
        })}`,);
    },
    voteRuleText() {
        return Axios.get(`/resources?${qs.stringify({
            appcode: appcode,
            menu_mark: 'finals',
            lang: 'zh-cn'
        })}`,);
    },
    votingGroup() {
        return Axios.get(`/resources?${qs.stringify({
            appcode: appcode,
            menu_mark: 'votingGroup',
            lang: 'zh-cn'
        })}`,);
    },
    champion() {
        return Axios.get(`/resources?${qs.stringify({
            appcode: appcode,
            menu_mark: 'champion',
            lang: 'zh-cn'
        })}`,);
    },
};

