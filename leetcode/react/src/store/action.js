import request from "../axios/request";
import { GROUP_LIST, RULE_TEXT, DOWNLOAD, GROUP_INFO, USER_INFO, CHAMPION, CHAMPION_NUMBER } from "./actionTypes";
import voteRequest from "../axios/voteRequest";
import { timestampGetDate, groupDict } from "../utils/utils";
import qs from 'qs';
import { judgeClient } from "../utils/utils";

/* 通用官网 */
export async function actionGroup() {
    let finalArray = 0
    let data = await voteRequest.cardList({ rand: sessionStorage.rand, size: 999 });
    if (sessionStorage.getItem('rand') === 'f' && data && data.data && data.data.data) {
        finalArray = JSON.parse(JSON.stringify(data.data.data))
        finalArray.sort((a, b) => {
            return b.vote_count - a.vote_count
        })
    }
    return {
        type: GROUP_LIST,
        groupList: data,
        firstNumber: finalArray && finalArray[0] ? finalArray[0].vote_count : 0,
    };
}
export async function championInfo() {
    let data = await voteRequest.championInfo()
    if(data && data.data && data.data.data){
        return {
            type: CHAMPION_NUMBER,
            championInfo: data.data.data
        };
    }
    return {
        type: CHAMPION_NUMBER,
        championInfo: null
    };

}

export async function actionRule() {
    let data = await request.voteRuleText();
    if (data && data.data && data.data.list && data.data.list[0] && data.data.list[0].fields_data) {
        let time = data.data.list[0].fields_data.votingTime;
        if ((time[0] * 1000) < (new Date().getTime())) {

            sessionStorage.setItem('final', JSON.stringify({
                time: time,
                is_final: true,
                mark: 'GroupF',
                name: '总决赛',
                date: `${timestampGetDate(time[0])}-${timestampGetDate(time[1])}`,
            }))
        } else {
            sessionStorage.removeItem('final')
        }
    }
    return {
        type: RULE_TEXT,
        ruleText: data
    };
}

export async function actionChampion() {

    let data = await request.champion();
    try {
        return {
            type: CHAMPION,
            champion: data.data.list[0].fields_data
        };
    } catch (e) {
        return {
            type: CHAMPION,
            champion: null
        };
    }

}


export async function actionDownload() {
    let data = await request.voteDownInfo();
    try {
        return {
            type: DOWNLOAD,
            download: data.data.list[0].fields_data
        };
    } catch (e) {
        return {
            type: DOWNLOAD,
            download: null
        };
    }

}

async function ssoLogin() {
    let ticket = null
    if (window.location.search) {
        ticket = window.location.search.split('?')[1]
        sessionStorage.setItem('ticket', ticket)
    } else if (sessionStorage.getItem('ticket')) {
        ticket = sessionStorage.getItem('ticket').split('?')[1]
    }
    let data = await voteRequest.user(qs.parse(ticket));
    if (data && data.data && data.data.code === 200 && data.data.data) {
        sessionStorage.setItem('user', JSON.stringify(data.data.data));
        if (window.location.search) {
            if (judgeClient() === 'PC') {
                window.location.replace(`/vote`);
            } else {
                window.location.replace(`/vote/m`);
            }
        }
        return data.data.data
    }
}
async function gameLogin() {
    let { sdkUserId, userName, sdk } = qs.parse(window.location.search.split('?')[1])
    let params = {
        user_name: userName,
        user_id: sdkUserId,
        sdk: sdk,
    }
    let data = await voteRequest.gameLogin(params);
    if (data && data.data && data.data.code === 200 && data.data.data) {
        let info = data.data.data
        let user = {
            attributes: {
                name: info.user_name
            },
            is_voted: info.is_voted,
        }
        sessionStorage.setItem('user', JSON.stringify(user));
        return user

    }
}


export async function actionUser() {

    let userInfo = null;

    if (window.location.search || sessionStorage.getItem('ticket')) {
        // sso 获取用户信息

        if (window.location.search.includes('ticket') || sessionStorage.getItem('ticket')) {
            userInfo = await ssoLogin()
        }
        // game 登录获取信息
        if (window.location.search.includes('sdkUserId')) {
            userInfo = await gameLogin()
        }
        return {
            type: USER_INFO,
            userInfo: userInfo
        };
    }
    // 已经登录过
    if (sessionStorage.user) {
        userInfo = JSON.parse(sessionStorage.getItem('user'));
    }
    return {
        type: USER_INFO,
        userInfo: userInfo
    };
}

export async function actionVotingGroup() {
    let data = await request.votingGroup();
    let currentGroup = data.data.list.find((item) => {
        return (item.fields_data.time[0] * 1000) < (new Date().getTime()) && (new Date().getTime()) < (item.fields_data.time[1] * 1000);
    });
    if (sessionStorage.getItem('final')) {
        sessionStorage.setItem('rand', 'f')
        return {
            type: GROUP_INFO,
            groupInfo: JSON.parse(sessionStorage.getItem('final'))
        }
    }
    if (currentGroup && currentGroup.fields_data) {
        currentGroup.fields_data.date = `${timestampGetDate(currentGroup.fields_data.time[0])}-${timestampGetDate(currentGroup.fields_data.time[1])}`;
        sessionStorage.setItem('rand', groupDict[currentGroup.fields_data.mark])
        return {
            type: GROUP_INFO,
            groupInfo: currentGroup.fields_data
        };
    }

    return {
        type: GROUP_INFO,
        groupInfo: null
    };
}

/* vote接口 */
export async function login() {
    // let data = await voteRequest.login({url:window.location.href});
    // console.log(11,data)

}
