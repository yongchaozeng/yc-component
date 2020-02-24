import React, { useState, } from 'react';
import './index.scss'
import { useSelector } from 'react-redux';
import PcHeader from '../../components/pc/pc-header';
import PcFooter from '../../components/pc/pc-footer';
import Modal from '../../components/pc/modal';
import PcBanner from "../../components/pc/pc-banner";


function imgs(path) {
    return require(`../../assets/imgs/${path}.png`);
}

function PcIndex(props) {

    const [userShow, setUserShow] = useState(false)
    const [message, setMessage] = useState('')
    const championInfo = useSelector((state) => state.championInfo)



    /* 卡牌信息 */
    const champion = useSelector(state => state.champion);
    const isEnd = useSelector(state => state.isEnd);

    /* 规则内容和时间 */
    const ruleText = useSelector(state => {
        if (state && state.ruleText) {
            try {
                return state.ruleText.data.list[0].fields_data;
            } catch (e) {
                console.log(e);
            }
        }
    });

    const endPage = (
        <>
            <img className='vote-end-title' src={imgs('vote-end-title')} alt="" />
            <div className='vote-end'>
                {
                    champion && champion.name && championInfo && championInfo.card_name === champion.name ?
                        <>
                            <div className='vote-end-left'>
                                <div className='card-image'>
                                    <div className='picture-box'>
                                        <img src={champion.cardImg} alt="" />
                                    </div>
                                    <div className='picture-desc'>
                                        <p className='picture-desc-title'>{champion.name}</p>
                                        <p className={'picture-desc-camp'}>（
                                    所属阵营:{champion.category} ）</p>
                                        <i className='picture-line' />
                                        <p className='picture-cost'>费用：{champion.cardExpend}</p>
                                        <p>品质：{champion.cardQuality}</p>
                                    </div>
                                </div>
                                <p className='champion'>本期应援投票人气冠军:</p>
                                <p className='champion-number'>( 截至活动结束获得总票数：{championInfo && championInfo.vote_count} )</p>
                                <p className='champion-name'>{champion.name}</p>
                            </div>
                            <img className='end-champion-role' src={champion.homeBigImg} alt="" />
                        </>
                        :
                        <>
                            <div className='vote-end-left'>
                                <div className='card-image'>
                                    <div className='picture-box'>
                                        <img src={imgs('expect-border')} alt="" />
                                    </div>
                                    <div className='picture-desc'>
                                        <p className='picture-desc-title'>敬请期待</p>
                                        <p className={'picture-desc-camp'}>（ 所属阵营: ）</p>
                                        <i className='picture-line' />
                                        <p className='picture-cost'>费用：</p>
                                        <p>品质：</p>
                                    </div>
                                </div>
                                <p className='champion'>本期应援投票人气冠军:</p>
                                <p className='champion-number'>( 截至活动结束获得总票数：敬请期待 )</p>
                                <p className='champion-name'>票数统计中</p>
                            </div>
                            <img className='end-champion-role' src={imgs('figure-unknown')} alt="" />
                        </>
                }
            </div>
        </>
    )

    return (
        <>
            <PcHeader />
            <div id="fullpage" className='pc-main'>
                <div className="section banner-box">
                    <div className="banner">
                        <div className='scroll-img'>
                            滑动进行投票
                        </div>
                    </div>
                </div>
                {/* 投票 */}
                <div className={`section  vote-banner`}>
                    <div className={isEnd ? 'vote-end-box ' : 'vote-banner'}>
                        {
                            !isEnd && <PcBanner setMessage={setMessage} setUserShow={setUserShow} />
                        }

                        {isEnd &&
                            endPage
                        }
                    </div>
                    <div className='scroll-img'>
                        <img src={require('../../assets/imgs/mousel-icon.png')} alt="" />
                        <span>滑动查看投票规则</span>
                    </div>
                </div>
                {/* 规则 */}
                <div className="section rule-banner">
                    <div className='rule-box'>
                        <img className='rule-title' src={require('../../assets/imgs/rule-title.png')} alt="" />
                        {ruleText && <div className='rule-text' dangerouslySetInnerHTML={{ __html: ruleText.rule }} />}
                    </div>
                    <PcFooter />
                </div>
            </div>
            <Modal show={userShow} close={setUserShow} >
                <div className='download-modal'>
                    <img src={require('../../assets/imgs/warn-icon.png')} alt="" />
                    <p className='modal-text'>{message}</p>
                </div>
            </Modal>
            <Modal show={false}>
                <div className='download-modal'>
                    <img src={require('../../assets/imgs/warn-icon.png')} alt="" />
                    <p className='modal-text'>非常抱歉</p>
                    <p className='modal-text'>您在游戏内的 <span>等级未达到五级</span></p>
                    <p className='modal-text'>没有投票资格</p>
                </div>
            </Modal>
            <Modal show={false}>
                <div className='download-modal'>
                    <img src={require('../../assets/imgs/warn-icon.png')} alt="" />
                    <p className='modal-text'>活动已结束</p>
                </div>
            </Modal>

        </>
    );
}

export default PcIndex;


