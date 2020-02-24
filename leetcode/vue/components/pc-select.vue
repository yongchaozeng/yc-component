<template>
    <div class="input-box" @click.stop="optionsOpen" v-clickoutside="handleClose">
        <input class="input" type="text" :value="label" :placeholder="placeholder" readonly>
        <div class="options-box" @click.stop v-show="optionsShow">
            <slot></slot>
        </div>
        <p class="close" :class="{'close-hover':optionsShow}"></p>
    </div>
</template>

<script>
    import Clickoutside from '@@/utils/clickoutside';

    export default {
        name: 'pc-select',
        componentName: 'zzq-select',
        props: {
            value: [String, Number],
            placeholder: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                optionsShow: false,// 下拉列表
                label: '',// 下拉列表
            };
        },
        created() {

        },
        mounted() {
            this.init();
            this.$on('handleOptionClick', this.handleOptionSelect);

        },
        methods: {
            init() {
                let array = this.$children.find((item) => {
                    if (item) {
                        return item.value === this.value;
                    }
                });
                if (array) {
                    this.label = array.label;
                }
            },
            handleOptionSelect(val) {
                this.$emit('input', val.value);
                this.label = val.label;
                this.optionsOpen();
                this.$emit('change');
            },
            optionsOpen() {
                if (this.disabled) return;
                this.optionsShow = !this.optionsShow;
            },
            handleClose() {
                this.optionsShow = false;
            },
        },
        watch: {
            value() {
                this.init();
            },

        },
        directives: {Clickoutside},
    };
</script>

<style lang="less" scoped>
    .scrollbar-box;
    .input-box {
        position: relative;
        box-sizing: content-box;


        .input {
            width: 100%;
            height: 37px;
            padding: 0 25px 0 10px;
            line-height: 37px;
            color: #333;
            background: @white;
            border: 1px solid @gray;
            cursor: default;

            &:hover, &:focus {
                outline: 0;
                box-shadow: 0 0 3px #21BA58;
            }
        }

        .close {
            content: ' ';
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            border-top: 10px solid #ccc;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 0 solid transparent;
            cursor: pointer;
            transition: all .2s;
        }

        .options-box {
            position: absolute;
            top: 40px;
            left: 0;
            width: 100%;
            max-height: 338px;
            margin-top: 5px;
            color: #333;
            background: @white;
            border: 1px solid @gray;
            z-index: 10;
            overflow-y: auto;
            cursor: pointer;
        }

        /*&::after{*/
        /*  content: ' ';*/
        /*  position: absolute;*/
        /*  top: 50%;*/
        /*  right: 10px;*/
        /*  transform: translateY(-50%);*/
        /*  border-top: 14px solid #FFEFD4;*/
        /*  border-left: 8px solid transparent;*/
        /*  border-right: 8px solid transparent;*/
        /*  border-bottom: 0 solid transparent;*/
        /*  cursor: pointer;*/
        /*  !*transform: rotate(135deg);*!*/
        /*}*/
    }

    .close-hover {
        transform: translateY(-50%) rotate(180deg) !important;

    }
</style>
