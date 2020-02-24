<template>
    <div class="payment-container">
        <div v-if="payment" class="payment-main" v-html="payment.content"></div>
    </div>
</template>

<script>
  import request from '../axios/request'

  export default {
    name: 'payment',
    data() {
      return {}
    },
    async asyncData() {
      let payment = {}
      let data = await request.siteInformation({ site_manage_type: 3 })
      if (data && data.data && data.data.site_information) {
        payment = data.data.site_information
      } else {
        payment = {}
      }
      return {
        payment: payment
      }
    }
  }
</script>

<style lang="less">
    .payment-container {
        width: 1200px;
        min-height: 601px;
        margin: 31px auto 141px auto;
        padding: 55px 70px;
        background: @white;
        overflow: hidden;

        .payment-title {
            margin: 55px 0 68px 0;
            text-align: center;
            font-size: 26px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 30px;
        }

        .payment-main {
            p{
                margin-bottom: 8px;
            }
            p:nth-of-type(2) {
                margin-top: 69px;
                margin-left: -20px;

                &:before {
                    content: ' ';
                    display: inline-block;
                    width: 4px;
                    height: 19px;
                    margin-right: 16px;
                    background: #00A14A;
                    vertical-align: text-bottom;
                }

            }

            p:nth-of-type(3) {
                margin-top: 8px;
                margin-bottom: 30px;
            }

            p:nth-of-type(4) {
                margin-bottom: 8px;
                margin-left: -20px;

                &:before {
                    content: ' ';
                    display: inline-block;
                    width: 4px;
                    height: 19px;
                    margin-right: 16px;
                    background: #00A14A;
                    vertical-align: text-bottom;
                }
            }

            .secondary-title {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 10px;
            }

            .text {
                line-height: 30px;
            }

            .secondary-tips {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 10px;
                margin-top: 20px;
            }
        }

        .signature {
            margin-top: 20px;
            text-align: right;
            line-height: 30px;
        }
    }
</style>
