<template>
    <div class="pc-modal-container" id="modal">
        <template v-if="value">
            <div class="pc-modal-mask"></div>
            <div class="pc-modal-wrap">
                <div class="custom-box" :style="{width:`${width}px`,'height':`${height}px`}">
                    <img v-if="close" src="../assets/imgs/modal-close-icon.png" class="modal-close-button"
                         @click="closeModal"/>
                    <slot></slot>

                    <!--                    <div class="button-box">-->
                    <!--                        <pc-button class="confirm" height="30">确认</pc-button>-->
                    <!--                        <pc-button class="cancel" height="30">取消</pc-button>-->
                    <!--                    </div>-->
                </div>


            </div>
        </template>
    </div>
</template>

<script>
    import PcButton from './pc-button';

    export default {
        name: 'pc-modal',
        components: {PcButton},
        props: {
            value: {},
            close: [Boolean],
            width: {
                type: [String, Number],
                default: '500'
            },
            height: {
                type: [String, Number],
                default: '400'
            },
        },

        created() {
            // let dom = document.createElement('div')
            // dom.setAttribute('id', 'modalContainer')

        },
        mounted() {
            // this.$nextTick(() => {
            //   setTimeout(() => {
            //     let dom = document.querySelector('#modal')
            //     document.body.appendChild(dom)
            //     // let modal = document.querySelector('#modalContainer')
            //     // modal.innerHTML = modalDom
            //     // console.log(1.1,modalDom)
            //     // console.log(1.2,modal)
            //   }, 0)
            // })
        },
        data() {
            return {
                steps: []
            };
        },

        computed: {},
        methods: {
            closeModal() {
                this.$emit('input', !this.value);
            },
        },
        watch: {
            value(val) {

                return val;
            },
        },

    };
</script>

<style lang="less" scoped>
    .pc-modal-container {
        .modal-box {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100%;
        }

        .pc-modal-mask {
            .modal-box;
            z-index: 1000;
            background: rgba(55, 55, 55, .6);
        }

        .pc-modal-wrap {
            .modal-box;
            z-index: 1000;

            .custom-box {
                position: absolute;
                top: 50%;
                left: 50%;

                /*padding: 50px 20px 50px 20px;*/
                background: #f9f9f9;
                border-radius: 4px;
                transform: translate(-50%, -50%,);

            }

            .content {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 500px;
                min-height: 400px;
                transform: translate(-50%, -50%,);
                background: @white;
                border-radius: 4px;

            }

            .button-box {
                position: absolute;
                bottom: 0;
                right: 0;

                .confirm {
                    width: 80px;
                    height: 30px;
                    color: @white;
                    background: #21BA58;
                }

                .cancel {

                }
            }

            .modal-close-button {
                position: absolute;
                top: -56px;
                right: -56px;
                width: 48px;
                height: 48px;
                cursor: pointer;


            }

        }
    }
</style>
<style lang="less">

    .interview-box {
        text-align: center;
        font-size: 0;

        .interview-title {
            height: 20px;
            margin: 30px 0 22px 0;
            font-size: 20px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
        }

        .interview-date, .interview-address, .interview-teacher {
            /*height: 15px;*/
            margin-bottom: 15px;
            padding: 0 15px;
            font-size: 16px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            /*line-height: 15px;*/
        }

        .confirm {
            width: 145px;
            margin-top: 15px;
            font-size: 16px;
            font-weight: 400;
            color: @white;
            background: @baseColor2;
            border-radius: 2px;

        }

        .cancel-button {
            .confirm;
            display: inline-block;
            margin-right: 90px;
            color: #333333;
            background: #F3F3F3;
        }

        .confirm-button {
            .confirm;
            display: inline-block;
        }
    }
</style>
