import React, {} from 'react';
import './index.scss';



function imgs(path) {
    return require(`../../../assets/imgs/m/${path}.png`)
}

export default function MHeader() {

    return (
        <div className='m-footer'>
            <img className='footer-logo' src={imgs('footer-logo')} alt=""/>
            <ul className='footer-text'>
                <li>成都龙渊网络科技有限公司 蜀ICP备13010684号</li>
                <li>©2013-2020 All Rights Reserved.版权所有.</li><br/>
                <li>川网文 [2017]2279-065号 </li><br/>
                <li>川公网安备 51019002000972号</li>
            </ul>
        </div>
    );
}

