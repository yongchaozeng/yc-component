<template>
    <div class="apply-invoice-container">
        <div class="apply-invoice-header">发票申请</div>
        <div class="apply-invoice-main">
            <div class="apply-invoice-form ">
                <div class="form-input">
                    <p class="label">发票类型</p>
                    <pc-input height="35" v-model="value" disabled ></pc-input>
                </div>
                <div class="form-input">
                    <p class="label">发票抬头</p>
                    <pc-select v-model="invoice.invoice_title">
                        <pc-option v-for="(item,index) in invoiceType" :key="index" :label="item.label"
                                   :value="item.value">
                        </pc-option>
                    </pc-select>
                </div>
                <template v-if="invoice.invoice_title === 2">
                    <div class="form-input">
                        <p class="label">发票单位</p>
                        <pc-input height="35" v-model="invoice.unit_name"></pc-input>
                    </div>
                    <div class="form-input">
                        <p class="label">纳税人识别号</p>
                        <pc-input height="35" v-model="invoice.identification_number"></pc-input>
                    </div>
                </template>
                <div class="form-input">
                    <p class="label">发票内容</p>
                    <pc-input height="35" v-model="invoice.content"></pc-input>
                </div>
                <div class="form-input">
                    <p class="label">收票人手机号</p>
                    <pc-input height="35" v-model="invoice.phone_of_receiver"></pc-input>
                </div>
                <div class="form-input">
                    <p class="label">收票人邮箱</p>
                    <pc-input height="35" v-model="invoice.mailbox_of_receiver"></pc-input>
                </div>
            </div>
            <div class="apply-invoice-handle">
                <pc-button height="35" @click="cancel" radius>取消</pc-button>
                <pc-button class="submit-button" @click="seva" height="35" radius>保存</pc-button>
            </div>
            <div class="apply-invoice-tips">
                <img class="tip-icon" src="../../assets/imgs/tip-icon.png" alt="">
                <div class="tip-text">
                    <p class="title">
                        温馨提示
                    </p>
                    <p>
                        尊敬的各位家长：<br/>
                        为了给您提供更方便快捷的发票领取服务，自即日起停止提供纸质版增值税普通发票，中心全面推行增值税电子普通发票。
                    </p>
                    <p style="margin-top: 30px;" class="title">
                        注意事项：
                    </p>
                    <p>
                        1、申请电子发票的时间为：3次课后的次日起至90天之内申请发票，逾期不再办理。<br/>
                        2、请在“中国儿童中心报名系统-已报班级信息-发票申请”输入开票信息（开票单位、纳税人识别号），准确填写手机号码、电子邮箱等相关信息，完成网上发票领用申请的在线提交处理。<br/>
                        3、发票开具内容为：学员姓名—培训费。<br/>
                        4、中心将通过手机、电子邮箱等方式将发票信息发送给家长。<br/>
                        5、请家长自行下载、打印增值税电子普通发票。<br/>
                    </p>
                </div>
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
    import {applyInvoice} from "../../utils/formValidation";

    export default {
        name: "applyInvoice",
        data() {
            return {
                value: '普通开票',
                invoice: {
                    invoice_title: '',
                    unit_name: '',
                    identification_number: '',
                    content: '',
                    phone_of_receiver: '',
                    mailbox_of_receiver: '',
                },
                invoiceType: []
            };
        },
        mounted() {
            this.getInvoiceType();
        },
        methods: {
            async getInvoiceType() {
                let data = await request.invoiceType();
                if (data && data.data && data.data.select_list) {
                    this.invoiceType = data.data.select_list
                }
            },
            cancel() {
                this.$router.go(-1);
            },
            async seva() {
                let params = {
                    order_id: this.$route.query.id,
                    ...this.invoice
                };
                if(applyInvoice.call(this)){
                    return
                }
                if(this.invoice.invoice_title !== 2){
                    delete params.unit_name
                    delete params.identification_number
                }


                let data = await request.invoiceApplication(params);
                if (data && data.msg) {
                    this.$msg(data.msg, 'succeed');
                    this.$router.go(-1);
                }
            },
        },
        components: {PcOption, PcButton, PcSelect, PcInput}
    };
</script>

<style lang="less" scoped>
    .apply-invoice-container {

        background: #F9F9F9;

        .apply-invoice-header {
            height: 50px;
            margin-bottom: 10px;
            text-align: center;
            line-height: 50px;
            border-top: 4px solid @baseColor;
            background: @white;
            font-size: 16px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }

        .apply-invoice-main {
            background: @white;

            .apply-invoice-form {
                padding-top: 20px;
                background: @white;

                .form-input {
                    margin-top: 20px;
                    .clear-both;

                    .label {
                        float: left;
                        width: 130px;
                        height: 35px;
                        margin-right: 40px;
                        line-height: 35px;
                        text-align: right;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1)
                    }

                    .input-box {
                        float: left;
                        width: 290px;
                    }

                }

            }

            .apply-invoice-handle {
                margin: 40px 0 30px 216px;
                .clear-both;

                .pc-button {
                    float: left;
                    width: 100px;
                    font-size: 14px;
                    font-weight: 400;
                }

                .submit-button {
                    margin-left: 40px;
                    color: @white;
                    background: #21BA58;
                }
            }

            .apply-invoice-tips {
                padding: 30px 114px 30px 20px;
                margin: 0 26px;
                border-top: 1px solid rgba(243, 243, 243, 1);
                .clear-both;

                .tip-icon {
                    float: left;
                    width: 16px;
                    height: 16px;
                    margin-right: 20px;
                }

                .tip-text {
                    float: right;
                    width: 95%;
                    font-size: 14px;
                    color: #999999;

                    .title {
                        color: #333333;
                    }
                }
            }
        }

    }
</style>
