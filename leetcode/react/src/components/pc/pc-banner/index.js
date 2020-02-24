import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Picture from "../../pc/picture";
import Swiper from 'react-id-swiper';
import { actionGroup, actionUser, actionRule } from '../../../store/action'
import { voteDict, setArray } from "../../../utils/utils";
import voteRequest from "../../../axios/voteRequest";


let groupBanner = []
const params = {
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    // loop: true,
};

const PcBanner = (props) => {

    const dispatch = useDispatch();
    let { setUserShow, setMessage, } = props
    const [active, setActive] = useState({
        groupIndex: null,
        index: null
    });
    const [card, setCard] = useState({
        name: '',
        group: '',
    });

    const userInfo = useSelector((state) => state.userInfo)

    /* 卡牌分组配置 */
    const groupInfo = useSelector(state => {
        if (state && state.groupInfo) {
            return {
                name: state.groupInfo.name,
                date: state.groupInfo.date,
            };
        }
    });

    /* 卡牌信息 */
    const groupList = useSelector(state => {
        if (state && state.groupList) {
            try {
                if (state.groupList.data.data.length <= 12 && groupBanner.length === 0) {
                    if (state.groupList.data.data.length > 0) {
                        return [state.groupList.data.data];
                    } else {
                        return [];
                    }

                } else {
                    setArray(state.groupList.data.data, groupBanner);
                    return groupBanner;
                }

            } catch (e) {
                console.log(e);
            }
        }
    });
   
    
    const changeVote = (item, index, idx) => {
        if (userInfo && userInfo.is_voted) {
            return
        }
        let dom = document.querySelector(`.swiper-slide-duplicate .index-${index}-${idx}`)
        if (index === active.groupIndex && idx === active.index) {
            setActive({
                groupIndex: 0,
                index: 0,
            });
            setCard({
                name: '',
                group: '',
            });
        } else {
            setActive({
                groupIndex: index,
                index: idx,
            });
            setCard({
                name: item.card_name,
                group: item.card_group,
            });
        }
    };

 
    const login = async () => {
        let data = await voteRequest.login({ url: window.location.href });
        if (data && data.data && data.data.data && data.data.data.callback_url) {
            window.location.href = data.data.data.callback_url;
        }
    };

    const logout = async () => {
        let data = await voteRequest.logout();
        if (data) {
            sessionStorage.clear()
            localStorage.clear()
            window.location.replace('/vote')
        }
    };


    const voteSubmit = async () => {
        if (!sessionStorage.getItem('user')) {
            login()
            return
        }
        let { name, group } = card;
        let is_final = sessionStorage.getItem('final') ? 1 : 0
        group = voteDict[group];
        let data = await voteRequest.vote({ card_name: name, card_group: group, is_final: is_final });
        if (data.data.code === 200) {
            setMessage('投票成功')
            setUserShow(true)

            setActive({
                groupIndex: 0,
                index: 0,
            });
            await dispatch(await actionRule())
            groupBanner = []
            await dispatch(await actionGroup());
            await dispatch(await actionUser())

        } else if (data.data.code === 100401) {
            await logout()
            await login()
        } else {
            setMessage(data.data.message)
            setUserShow(true)
        }
    };

    return (
        (
            <>
                {
                    groupList && groupList.length > 0 &&
                    <div className='vote-box'>
                        <div className="vote-left-banner">
                            {
                                groupList &&
                                <Swiper {...params}>
                                    {
                                        groupList.map((group, index) => {
                                            return (
                                                <div key={index}>
                                                    <ul className='vote-list-box'>
                                                        {
                                                            group && group.map((item, idx) => {
                                                                return (
                                                                    <li key={idx} onClick={() => {
                                                                        changeVote(item, index + 1, idx + 1);
                                                                    }}>
                                                                        <Picture src={item.card_img}
                                                                            item={item}
                                                                            index={index + 1}
                                                                            idx={idx + 1}
                                                                            shadow={userInfo && userInfo.is_voted ? false : true}
                                                                            active={active.groupIndex === index + 1 && active.index === idx + 1} />
                                                                        <p className='vote-number'>票数：{item.vote_count}</p>
                                                                        <p className='text'>{item.card_name}</p>
                                                                    </li>
                                                                );
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            );
                                        })
                                    }
                                </Swiper>
                            }
                        </div>

                        <div className='vote-box-right'>
                            <div className='vote-info-box'>
                                <img className='vote-figure' src={require('../../../assets/imgs/vote-figure.png')}
                                    alt="" />
                                <div className='vote-info'>
                                    <p className='vote-info-title'>{groupInfo && groupInfo.name}</p>
                                    <p className='vote-info-date vote-info-date-title'>活动时间</p>
                                    <p className='vote-info-date'>{groupInfo && groupInfo.date}</p>
                                </div>
                            </div>
                            {
                                !userInfo || (userInfo && !userInfo.is_voted) ? (
                                    active.groupIndex && active.index ?
                                        <img onClick={voteSubmit} className='submit'
                                            src={require('../../../assets/imgs/submit-vote.png')} alt="" /> :
                                        <img className='submit' src={require('../../../assets/imgs/submit.png')} alt="" />
                                ) : ''
                            }

                        </div>
                    </div>
                }

                {
                    groupList && groupList.length === 0 &&
                    <div className='vote-not-start'>
                        <img src={require('../../../assets/imgs/warn-icon.png')} alt="" /> 活动即将开启，敬请期待！
                        </div>
                }
            </>
        )
    )
}
export default PcBanner