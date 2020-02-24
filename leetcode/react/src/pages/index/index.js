import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './index.scss';
import Mheader from '../../components/m/m-header';
import MFooter from '../../components/m/m-footer';
import MModal from '../../components/m/m-modal';
import MBanner from '../../components/m/m-banner'

function imgs(path) {
    return require(`../../assets/imgs/m/${path}.png`);
}

const Index = () => {

    const [userShow, setUserShow] = useState(false)
    const [message, setMessage] = useState('')

    // const firstNumber = useSelector(state => state.firstNumber);
    const championInfo = useSelector((state) => state.championInfo)
    const champion = useSelector(state => state.champion);
    const isEnd = useSelector(state => state.isEnd);
    const ruleText = useSelector(state => {
        if (state && state.ruleText) {
            try {
                return state.ruleText.data.list[0].fields_data;
            } catch (e) {
                console.log(e);
            }
        }
    });

    return (
        <>
            <Mheader />
            <div id="mFullpage" className='m-home-container'>
                <div className="section banner-box" data-anchor="slide1">
                    <div className='banner' />
                    <div className='scroll-button'>
                        <img className='home-prev-page' src={require('../../assets/imgs/m/next-page.png')} alt="" />
                        滑动进行投票
                    </div>

                    {/* <div className='scroll-button'>滑动进行投票</div> */}
                </div>

                <div className="section vote-main" data-anchor="slide2">
                    {

                        <div className={isEnd ? 'm-champion' : 'vote-main m-champion'}>
                            {isEnd ?
                                <>
                                    {
                                        champion && champion.name && championInfo && championInfo.card_name === champion.name ? <>
                                            <img className='vote-end' src={imgs('vote-end')} alt="" />
                                            <img className='champion-role' src={champion && champion.homeBigImg} alt="" />
                                            <div className='champion-info'>
                                                <div className='champion-info-img'>
                                                    <p className='text'>(截至活动结束获得总票数)</p>
                                                    <p className='number'>{championInfo && championInfo.vote_count} </p>
                                                </div>
                                                <p className='name'>{champion && champion.name}</p>
                                            </div>
                                        </> :
                                            <>
                                                <img className='vote-end' src={imgs('vote-end')} alt="" />
                                                <img className='champion-role' src={require('../../assets/imgs/m/champion-figure.png')} alt="" />
                                                <div className='champion-info'>
                                                    <div className='champion-info-img'>
                                                        <p className='text'>(截至活动结束获得总票数)</p>
                                                        <p className='number'>敬请期待 </p>
                                                    </div>
                                                    <p className='name'>票数统计中</p>
                                                </div>
                                            </>
                                    }
                                </>

                                :
                                <MBanner setMessage={setMessage} setUserShow={setUserShow} />
                            }
                        </div>
                    }

                </div>

                <div className="section m-rule-box" data-anchor="slide3" >
                    <img className='rule-title' src={require('../../assets/imgs/m/rule-title.png')} alt="" />
                    <a href="#slide2">
                        <img className='prev-page' src={require('../../assets/imgs/m/next-page.png')} alt="" />

                    </a>
                    <div>
                        {ruleText && <div className='rule-text' dangerouslySetInnerHTML={{ __html: ruleText.rule }} />}

                    </div>

                    <MFooter />
                </div>

            </div>
            <MModal show={userShow} close={setUserShow}>
                <div className='warn-modal'>
                    <img className='warn-icon' src={require('../../assets/imgs/warn-icon.png')} alt="" />
                    <p className='text'>{message}</p>
                </div>
            </MModal>

        </>
    );
};

export default Index;
