<template>
    <div class="invoice-info-container">
        <div class="invoice-info-header">
            <div class="to-refund-button" @click="torefundList">
                <span class=" icon iconfont">&#xe628;</span>
                <span class="to-refund-text">返回</span>
            </div>
            发票申请
        </div>
        <div class="invoice-info-form">
            <div class="form-text">
                <p class="label">发票类型</p>
                <p class="value">普通发票</p>
            </div>
            <div class="form-text">
                <p class="label">发票抬头</p>
                <p class="value">{{invoice.invoice_title_label}}</p>
            </div>
            <tepmlate v-if="invoice.invoice_title === 2">
                <div class="form-text">
                    <p class="label">单位名称</p>
                    <p class="value">{{invoice.unit_name}}</p>
                </div>
                <div class="form-text">
                    <p class="label">纳税人识别号</p>
                    <p class="value">{{invoice.identification_number}}</p>
                </div>
            </tepmlate>
            <div class="form-text">
                <p class="label">收取人邮箱</p>
                <p class="value">{{invoice.mailbox_of_receiver}}</p>
            </div>
            <div class="form-text">
                <p class="label">减免原因</p>
                <p class="value">{{invoice.reason||'暂无'}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import PcInput from "../../components/pc-input";
    import PcSelect from "../../components/pc-select";
    import PcButton from "../../components/pc-button";
    import PcOption from "../../components/pc-option";
    import request from "../../axios/request";

    export default {
        name: "applyInvoice",
        data() {
            return {
                invoice: {

                },
            };
        },
        mounted(){
            this.init()
        },
        methods:{
            async init(){
                let data = await request.queryInvoiceDetail(this.$route.query.id)
                if(data && data.data && data.data.invoice_detail){
                    this.invoice = data.data.invoice_detail
                }
            },
            torefundList(){
                this.$router.go(-1)
            },
        },
        components: {PcOption, PcButton, PcSelect, PcInput}
    };
</script>

<style lang="less" scoped>
    .invoice-info-container {

        background: #F9F9F9;

        .invoice-info-header {
            position: relative;
            width: 100%;
            height: 50px;
            margin-bottom: 10px;
            text-align: center;
            line-height: 50px;
            border-top: 4px solid @baseColor;
            background: @white;
            font-size: 16px;
            font-weight: bold;
            color: #21BA58;

            .to-refund-button {
                position: absolute;
                top: 0;
                left: 27px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                cursor: pointer;

                .to-refund-text {
                    margin-left: 10px;
                }

                &:hover {
                    color: @baseColor;
                }
            }
        }

        .invoice-info-form {
            padding: 30px 0 125px 125px;
            background: @white;

            .form-text {
                .clear-both;

                .label {
                    float: left;
                    width: 170px;
                    height: 50px;
                    padding-left: 45px;
                    text-align: left;
                    line-height: 50px;
                    background: rgba(243, 243, 243, 1);
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                    border-bottom: 1px solid @white;
                }

                .value {
                    float: left;
                    width: 500px;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    background: @white;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                    border: 1px solid rgba(243, 243, 243, 1);
                    border-bottom: none;
                }

            }

            .form-text:nth-last-of-type(1) {
                .label {
                    border-bottom: 1px solid transparent;
                }

                .value {
                    border-bottom: 1px solid rgba(243, 243, 243, 1);
                }
            }
        }


    }
</style>
