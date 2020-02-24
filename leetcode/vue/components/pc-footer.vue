<template>
    <div class="footer-container">
        <div class="footer">
            <ul class="footer-nav">
                <li><a href="https://www.ccc.org.cn/">官网</a></li>
                <li><a href="https://www.cnccbm.org.cn/cncc-bsp/cc/apply-front.action">课程</a></li>
                <li><a href="http://ticket.cnccbm.org.cn/site/">门票</a></li>
                <li><a href="https://www.ccc.org.cn/col/col80/index.html">关于我们</a></li>
                <li><a href="https://www.ccc.org.cn/col/col86/index.html">联系我们</a></li>
            </ul>
            <div class="copyright">
                <p>京ICP备06022358号-1</p>
                <p>京公网安备11010502033859号</p>
            </div>
            <p class="copyright-company">中国儿童中心版权所有 &emsp;© China National Children's Center All rights
                reserved 2012-2020</p>
            <div class="copyright-image">
                <img src="../assets/imgs/footer-company.png"
                     alt=""/>
                <img src="../assets/imgs/footer-web.png"
                     alt=""/>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'pc-footer',
    data(){
      return {
      }
    },
  }
</script>

<style lang="less" scoped>
    .footer-container {
        margin-top: -200px;
        text-align: center;
        background: #333;
        .footer {
            width: 900px;
            padding: 37px 0 38px 0;
            margin: 0 auto;
            .footer-nav {
                padding: 0 190px;
                li {
                    float: left;
                    margin-left: 84px;
                    a{
                        line-height: 14px;
                        color: @white;
                        font-size:14px;
                        font-weight:bold;
                        letter-spacing: -1px;
                    }
                    &:nth-of-type(1) {
                        margin-left: 0;
                    }
                    &:nth-last-of-type(1):after {
                        display: none;
                    }
                }
                &:after {
                    clear: both;
                    content: '.';
                    display: block;
                    width: 0;
                    height: 0;
                    visibility: hidden;
                }
            }
            .copyright {
                padding: 32px 285px 14px 285px;
                font-size: 12px;
                font-weight: 400;
                color:rgba(153,153,153,.8);
                p {
                    float: left;
                    line-height: 12px;
                    &:nth-of-type(2) {
                        float: right;
                    }
                }
                &:after {
                    clear: both;
                    content: '.';
                    display: block;
                    width: 0;
                    height: 0;
                    visibility: hidden;
                }
            }
            .copyright-company {
                font-size: 12px;
                font-weight: 400;
                line-height: 14px;
                color:rgba(153,153,153,.8);
            }
            .copyright-image {
                display: flex;
                margin-top: 15px;
                justify-content: center;
                img {
                    margin-right: 12px;
                    height: 24px;
                }
            }
        }
    }



</style>
