import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swiper from 'react-id-swiper';
import { actionGroup, actionUser, actionRule } from '../../../store/action'
import { voteDict, } from "../../../utils/utils";
import voteRequest from "../../../axios/voteRequest";

let groupBanner = []
const setArray = (array, newArray) => {
    if (array.length > 6) {
        newArray.push(array.splice(0, 6));
        if (array.length > 6) {
            setArray(array, newArray);
        } else {
            newArray.push(array);
        }
        setArray(array, newArray);
    }
};

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

const MBanner = (props) => {

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
                mark: state.groupInfo.mark,
                name: state.groupInfo.name,
                date: state.groupInfo.date,
            };
        }
    });

    /* 卡牌信息 */
    const groupList = useSelector(state => {
        if (state && state.groupList) {
            try {
                if (state.groupList.data.data.length <= 6 && groupBanner.length === 0) {
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
            window.location.replace('/vote/m')
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

        <>
            {
                groupList && groupList.length > 0 ?

                    <>
                        <div className='current-voting'>
                            <p className='groupInfo-date'>{groupInfo && groupInfo.date}</p>
                        </div>

                        {groupInfo && groupInfo.mark === 'GroupA' &&
                            <img className='group' src={require(`../../../assets/imgs/m/a-group.png`)} alt="" />
                        }
                        {groupInfo && groupInfo.mark === 'GroupB' &&
                            <img className='group' src={require(`../../../assets/imgs/m/b-group.png`)} alt="" />
                        }
                        {groupInfo && groupInfo.mark === 'GroupC' &&
                            <img className='group' src={require(`../../../assets/imgs/m/c-group.png`)} alt="" />
                        }
                        {groupInfo && groupInfo.mark === 'GroupD' &&
                            <img className='group' src={require(`../../../assets/imgs/m/d-group.png`)} alt="" />
                        }
                        {groupInfo && groupInfo.mark === 'GroupF' &&
                            <img className='group' src={require(`../../../assets/imgs/m/final-group.png`)} alt="" />
                        }

                        <div className='m-banner-center'>
                            {
                                groupList && groupList.length > 0 &&
                                <Swiper {...params}>
                                    {
                                        groupList.map((group, index) => {
                                            return (
                                                <div key={index}>
                                                    <ul className='m-vote-box'>
                                                        {
                                                            group && group.map((item, idx) => {
                                                                return (
                                                                    <li onClick={() => {
                                                                        changeVote(item, index + 1, idx + 1);
                                                                    }} key={idx}>
                                                                        <div className='m-vote-border'>
                                                                            <img src={item.card_img} className={`img-${index + 1}-${idx + 1}`} alt="" />

                                                                            {
                                                                                ((userInfo && !userInfo.is_voted) || !userInfo) &&
                                                                                <>
                                                                                    {
                                                                                        !((index + 1) === active.groupIndex && (idx + 1) === active.index) &&
                                                                                        <img className={`shade-box index-${index + 1}-${idx + 1}`} data-pricture={`${item.card_name}-${item.card_group}`}
                                                                                            data-index={`index-${index + 1}-${idx + 1}`} src={require('../../../assets/imgs/shadow-border.png')} alt='' />
                                                                                    }
                                                                                </>
                                                                            }


                                                                            {
                                                                                (index + 1) === active.groupIndex && (idx + 1) === active.index &&
                                                                                <img className='pitch-on'
                                                                                    src={require('../../../assets/imgs/pitch-on.png')}
                                                                                    alt="" />
                                                                            }
                                                                        </div>
                                                                        <div className='mvote-number-box'>
                                                                            <p className='mvote-number-title' >获得票数</p>
                                                                            <p className='mvote-number'>{item.vote_count}</p>
                                                                        </div>
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


                            {
                                !userInfo || (userInfo && !userInfo.is_voted) ? (
                                    active.groupIndex && active.index ?
                                        <img onClick={voteSubmit} className='submit'
                                            src={require('../../../assets/imgs/m/m-submit.png')} alt="" /> :
                                        <img className='submit' src={require('../../../assets/imgs/m/submit-button.png')} alt="" />
                                ) : ''
                            }

                        </div>
                        <img className='next-page' src={require('../../../assets/imgs/m/next-page.png')} alt="" />

                    </>
                    : groupList ? <div className='m-vote-notstart'>
                        <img src={require('../../../assets/imgs/warn-icon.png')} alt="" />
                        <p> 活动即将开启，敬请期待！</p>
                    </div> : ''
            }
        </>



    )
}
export default MBanner