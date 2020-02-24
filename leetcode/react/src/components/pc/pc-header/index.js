import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import './index.scss';
import Modal from '../modal';
import voteRequest from "../../../axios/voteRequest";
import $msg from '../../../utils/message'

const share = {
    title: '《天神学院》「第一届人气投票」正式开启！',
    desc: '亲爱的学员，快为你最喜爱的英雄投上一票吧！',
    pic: `${window.location.origin}/b196d8caa0c7fe50ce0ec.png`,
    wb: '《天神学院》「第一届人气投票」正式开启！亲爱的学员，快为你最喜爱的英雄投上一票吧！'
};


export default function PcHeader() {


    const userInfo = useSelector((state) => state.userInfo)
    const download = useSelector((state) => state.download)

    const [android, setAndroid] = useState(true);
    const [wxShow, setWxShow] = useState(false);

    const openWxModal = () => {
        setWxShow(true);
    };
    const closeWxModal = () => {
        setWxShow(false);
    };
  
    const downloadAndroid = () => {
        if (download.androidDownload) {
            window.open(download.androidDownload)
        } else {
            $msg(download.AndroidPoint, 'pc')
        }
    }
    const downloadOpenIos = () => {
        if (download.iosDownload) {
            window.open(download.iosDownload)
        } else {
            $msg(download.iosPoint, 'pc')
        }
    }

    const shareWb = () => {
        window.open(
            "https://service.weibo.com/share/share.php?url=" +
            window.location.href +
            "&title=" +
            share.wb +
            "&content=utf8&pic=" +
            share.pic
        );
    };
    const shareInterspace = () => {
        let image_urls = [share.pic].map(function (image) {
            return encodeURIComponent(image);
        });

        window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='
            + encodeURIComponent(window.location.href) + '&title='
            + share.title + '&pics=' + image_urls.join('|') +
            '&summary=' + share.desc);

    };
    const shareQQ = () => {
        window.location.href = `https://connect.qq.com/widget/shareqq/index.html?url=${window.location.href}&sharesource=qzone&title=${share.title}&pics=${share.pic}'&desc=${share.desc}'`;
    };

    const logout = async () => {
        let data = await voteRequest.logout();
        if (data) {
            sessionStorage.clear()
            localStorage.clear()
            window.location.replace('/vote')
        }
    };
    const login = async () => {
        let data = await voteRequest.login({ url: window.location.href });
        if (data && data.data && data.data.data && data.data.data.callback_url) {
            window.location.href = data.data.data.callback_url;
        }
    };
    return (
        <div className='header'>
            <div className='header-main'>
                <div className='header-left'>
                    <img className='login-icon' src={require('../../../assets/imgs/login-icon.png')} alt="" />
                    {
                        userInfo && userInfo.attributes
                            ?
                            <>
                                <span className='login-white'>
                                    欢迎{userInfo.attributes.name}
                                </span>
                                <span onClick={logout} className='login-logout'>[注销]</span>
                            </>
                            : <div onClick={login} style={{ display: 'inline-block', cursor: 'pointer' }}>
                                <span className='login-text login-white'>
                                    欢迎登录
                                </span>
                                <span className='login-white'>&emsp;<span
                                    style={{ fontStyle: 'normal' }}>/</span>&emsp;</span>
                                <span className='login-white login-tips'>
                                    登录后可进行投票
                                </span>
                            </div>
                    }
                </div>
                {/*<img style={{cursor: 'pointer'}} src={require('../../../assets/imgs/login-title.png')}*/}
                {/*     alt=""/>*/}
                <img className='logo' src={require('../../../assets/imgs/logo.png')} alt="" />
                <div className='header-right'>
                    <span className='icon-box share-box-hover'>
                        <img className=' icon' src={require('../../../assets/imgs/share-icon.png')} alt="" />
                        <span className='text'>分享</span>
                        <div className='share-modal-box modal-box'>
                            <ul className='share-box'>
                                <li className='share-list' onClick={openWxModal}>
                                    <img className='share-icon' src={require('../../../assets/imgs/wx-icon.png')}
                                        alt="" />
                                    <span>微 信</span>
                                </li>
                                <li onClick={shareQQ} className='share-list'>
                                    <img className='share-icon' src={require('../../../assets/imgs/qq-icon.png')}
                                        alt="" />
                                    <span> Q Q</span>
                                </li>
                                <li onClick={shareInterspace} className='share-list'>
                                    <img className='share-icon'
                                        src={require('../../../assets/imgs/interspace-icon.png')}
                                        alt="" />
                                    <span>QQ 空间</span>
                                </li>
                                <li onClick={shareWb} className='share-list'>
                                    <img className='share-icon' src={require('../../../assets/imgs/wb-icon.png')}
                                        alt="" />
                                    <span>微 博</span>
                                </li>
                            </ul>
                        </div>
                    </span>
                    <div className='icon-box download-box-hover'>
                        <img className=' icon' src={require('../../../assets/imgs/download-icon.png')} alt="" />
                        <span>下载游戏</span>
                        {
                            download &&
                            (
                                <div className='download-modal-box modal-box'>
                                    <div className='download-box'>
                                        {
                                            android  &&
                                            (
                                                download.androidDownload ?
                                                    <div className='download-code'>
                                                        <img className='qr-code-img'
                                                            src={download.QRCode}
                                                            alt="" />
                                                    </div>
                                                    : <div className='download-ios'>
                                                        {download.AndroidPoint}
                                                    </div>
                                            )

                                        }
                                        {
                                            !android  &&
                                            (
                                                download.iosDownload ?
                                                    <div className='download-code'>
                                                        <img className='qr-code-img'
                                                            src={download.QRCode}
                                                            alt="" />
                                                    </div>
                                                    : <div className='download-ios'>
                                                        {download.iosPoint}
                                                    </div>
                                            )

                                        }

                                        <p onClick={() => {
                                            downloadOpenIos()

                                        }} className='download-button'>
                                            <img className='iphone-icon'
                                                src={require('../../../assets/imgs/iphone-icon.png')}
                                                alt="" />
                                            <span className='download-text'>APP Store下载</span>
                                        </p>
                                        <p onClick={() => {
                                            downloadAndroid()
                                        }}>
                                            <img className='iphone-icon' src={require('../../../assets/imgs/an-icon.png')}
                                                alt="" />
                                            <span className='download-text'>Android下载</span>
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <a href="http://chaosacademy.dragonest.com/" target='_blank' rel="noopener noreferrer">
                        <span className='icon-box'>
                            <img className=' icon' src={require('../../../assets/imgs/home-icon.png')} alt="" />
                            <span>进入官网</span>
                        </span>
                    </a>
                </div>

            </div>
            <Modal show={wxShow} close={closeWxModal}>
                <div className='qr-modal'>
                    <img className='qr-code' src={require('../../../assets/imgs/qr-code.png')} alt="" />
                    <p className='modal-text'>请使用<span>微信识别二维码</span>进行分享</p>
                </div>
            </Modal>

        </div>

    );
}

