import { GROUP_LIST, DOWNLOAD, RULE_TEXT, GROUP_INFO, USER_INFO, CHAMPION, CHAMPION_NUMBER } from './actionTypes';

const initializeState = {
    groupList: null,
    ruleText: null,
    download: null,
    userInfo: null,
    groupInfo: null,
    champion: null,
    isEnd: false,
    firstNumber: 0,
    championInfo: null,
};

const reducer = (state = initializeState, action) => {

    switch (action.type) {
        case USER_INFO:
            return { ...state, userInfo: action.userInfo };
        case GROUP_LIST:
            return { ...state, groupList: action.groupList, firstNumber: action.firstNumber };
        case DOWNLOAD:
            return { ...state, download: action.download };
        case RULE_TEXT:
            let isEnd = false
            if (action.ruleText) {
                if (new Date().getTime() > (action.ruleText.data.list[0].fields_data.votingTime[1] * 1000)) {
                    isEnd = true
                }
            }
            return { ...state, isEnd: isEnd, ruleText: action.ruleText };
        case GROUP_INFO:
            return { ...state, groupInfo: action.groupInfo };
        case CHAMPION_NUMBER:
            return { ...state, championInfo: action.championInfo };
        case CHAMPION:
            return { ...state, champion: action.champion };
        default:
            return state;
    }
};


export default reducer;
