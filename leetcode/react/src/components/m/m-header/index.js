import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.scss";
import MModal from "../m-modal";
import { judgeClient } from "../../../utils/utils";
import voteRequest from "../../../axios/voteRequest";

const wx = require("weixin-js-sdk");

function imgs(path) {
    return require(`../../../assets/imgs/${path}.png`);
}
const shareList = [
    { name: "微信", img: "wx-icon" },
    { name: "QQ空间", img: "interspace-icon" },
    { name: "微博", img: "wb-icon" }
];

const shareUrlDict = {
    title: "《天神学院》「第一届人气投票」正式开启！",
    desc: "亲爱的学员，快为你最喜爱的英雄投上一票吧！",
    pic: `${window.location.protocol}//chaosacademy.dragonest.com/Christmas/b196d8caa0c7fe50ce0ec.png`,
    wb:
        "《天神学院》「第一届人气投票」正式开启！亲爱的学员，快为你最喜爱的英雄投上一票吧！"
};

export default function MHeader() {
    useEffect(() => {
        wxInit();
    }, []);

    const download = useSelector(state => state.download);

    const userInfo = useSelector(state => state.userInfo);
    const [shareShow, setShareShow] = useState(false);
    const [downloadShow, setDownloadShow] = useState(false);
    const [wxShow, setWxShow] = useState(false);

    const openShareModal = () => {
        setShareShow(true);
        setWxShow(false);
    };
    const openDownModal = () => {
        setDownloadShow(true);
    };
    const closeShareModal = () => {
        setShareShow(false);
    };
    const closeDownModal = () => {
        setDownloadShow(false);
    };
    const wxShare = () => {
        setWxShow(true);
    };
    const openShare = (index, e) => {
        if (index === 1) {
            wxShare(e);
        }
        if (index === 2) {
            qqShare(e);
        }
        if (index === 3) {
            wbShare(e);
        }
    };

    const wxInit = async () => {
        const url = window.location.href;
        let data = await voteRequest.wxShare({ url: url });
        let getMsg = data.data.data;
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: getMsg.appId, // 必填，公众号的唯一标识
            timestamp: getMsg.timestamp, // 必填，生成签名的时间戳
            nonceStr: getMsg.nonceStr, // 必填，生成签名的随机串
            signature: getMsg.signature, // 必填，签名，见附录1
            jsApiList: getMsg.jsApiList,
            //   jsApiList: [
            //     "checkJsApi",
            //     "onMenuShareAppMessage",
            //     "onMenuShareTimeline",
            //     "updateAppMessageShareData",
            //     "updateTimelineShareData"
            //   ]
        });

        wx.ready(function () {
            // 分享给朋友
            wx.updateAppMessageShareData({
                title: shareUrlDict.title, // 分享标题
                desc: shareUrlDict.desc, // 分享描述
                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareUrlDict.pic, // 分享图标
                success: function () {
                    console.log("分享成功");
                },
                cancel: function () {
                    console.log("取消分享");
                },
                fail: function () {
                    console.log("分享失败");
                }
            });

            // 分享到朋友圈
            wx.updateTimelineShareData({
                title: shareUrlDict.title, // 分享标题
                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareUrlDict.pic, // 分享图标
                success: function () {
                    console.log("分享成功");
                },
                cancel: function () {
                    console.log("取消分享");
                },
                fail: function () {
                    console.log("分享失败");
                }
            });

           
        });
        wx.error(function (res) {
            console.log("errorMSG:" + res);
        });
    };

    const wbShare = async e => {
        e.preventDefault();
        e.returnValue = false;
        window.open(
            "https://service.weibo.com/share/mobile.php?url=" +
            window.location.href +
            "&title=" +
            shareUrlDict.wb +
            "&content=utf8&pic=" +
            shareUrlDict.pic
        );
    };
    const qqShare = e => {
        e.preventDefault();
        e.returnValue = false;
        let image_urls = [shareUrlDict.pic].map(function (image) {
            return encodeURIComponent(image);
        });

        window.location.href =
            "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
            encodeURIComponent(window.location.href) +
            "&title=" +
            shareUrlDict.title +
            "&pics=" +
            image_urls.join("|") +
            "&summary=" +
            shareUrlDict.desc;
    };

    const logout = async () => {
        let data = await voteRequest.logout();
        if (data) {
            sessionStorage.clear();
            localStorage.clear();
            window.location.replace("/vote/m");
        }
    };
    const login = async () => {
        let data = await voteRequest.login({ url: window.location.href });
        if (data && data.data && data.data.data && data.data.data.callback_url) {
            window.location.href = data.data.data.callback_url;
        }
    };

    return (
        <div className="m-header">
            <div className="header-left">
                <img className="login-icon" src={imgs("m/m-login-icon")} alt="" />
                {userInfo && userInfo.attributes ? (
                    <div className="m-login-button">
                        <p className="m-user-name">{userInfo.attributes.name}</p>
                        <p onClick={logout} className="login-logout">
                            [注销]
            </p>
                    </div>
                ) : (
                        <div onClick={login} className="m-login-button">
                            <p className="m-login-border">欢迎登录</p>
                            <p>登录后进行投票</p>
                        </div>
                    )}
            </div>
            <div className="header-right">
                <img
                    className="header-icon"
                    onClick={openShareModal}
                    src={imgs("m/share-icon")}
                    alt=""
                />
                <img
                    className="header-icon"
                    onClick={openDownModal}
                    src={imgs("m/download-icon")}
                    alt=""
                />
                <a href="http://chaosacademy.dragonest.com/" target="_black">
                    <img className="header-icon" src={imgs("m/home-icon")} alt="" />
                </a>
            </div>

            <MModal show={shareShow} close={closeShareModal}>
                {wxShow && (
                    <div className="wx-share-qrcode">
                        <img src={imgs("qr-code")} alt="" />
                        <p className="wx-share-text">长按图片保存到本地</p>
                    </div>
                )}

                {!wxShow && (
                    <ul className="m-share-modal-box">
                        {shareList.map((item, index) => {
                            return (
                                <li
                                    onClick={e => {
                                        openShare(index + 1, e);
                                    }}
                                    key={index}
                                >
                                    <img className={"icon"} src={imgs(item.img)} alt="" />
                                    <span>{item.name}</span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </MModal>
            <MModal show={downloadShow} close={closeDownModal}>
                {judgeClient === "IOS" ? (
                    <div className="m-down-modal-box">
                        {download && download.iosDownload ? (
                            <a
                                href={download.iosDownload}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={imgs("m/ios-icon")} alt="" />
                                <span>IOS下载</span>
                            </a>
                        ) : (
                                <p>{download && download.iosPoint}</p>
                            )}
                    </div>
                ) : (
                        <div className="m-down-modal-box">
                            {download && download.androidDownload ? (
                                <a
                                    href={download.androidDownload}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={imgs("m/android-icon")} alt="" />
                                    <span>Android下载</span>
                                </a>
                            ) : (
                                    <p>{download && download.AndroidPoint}</p>
                                )}
                        </div>
                    )}
            </MModal>
        </div>
    );
}
