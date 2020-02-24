import React, {} from 'react';
import './index.scss';

export default function PcHeader() {
    return (
        <div className='footer'>
            <div className='footer-content'>
                <img className='footer-logo' src={require('../../../assets/imgs/footer-logo.png')} alt=""/>
                <div className='footer-right-box' >
                    <ul className='footer-text'>
                        <li>抵触不良游戏</li>
                        <li>拒绝盗版游戏</li>
                        <li>注意自我保护</li>
                        <li>谨防上当受骗</li>
                        <li>适度游戏益脑</li>
                        <li>沉迷游戏伤身</li>
                        <li>合理安排时间</li>
                    </ul>
                    <p className='copyright'>©2013-2020 All Rights Reserved.版权所有.成都龙渊网络科技有限公司</p>
                </div>
            </div>
        </div>
    );
}

