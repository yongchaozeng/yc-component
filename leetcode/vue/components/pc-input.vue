<template>
    <div class="input-box">
        <div class="input">
            <div v-if="$slots.prefix" class="prefix" @click="handlePrefix">
                <slot name="prefix"></slot>
            </div>

            <input v-if="!disabled" :type="type"
                   :style="{'height':height+'px','borderRadius':radius?(height/2)+'px':'0pxr','paddingRight':$slots.append?'100px':'0px'}"
                   :class="[{'prefix-left':$slots.prefix},{'error':error}]" :value="value" :placeholder="placeholder"
                   ref="input"
                   @blur="blurInput" @input="handleInput"  @keyup.enter="handleAppend" >
            <span v-else>{{value}}</span>
            <!--      <p class="close" @click="clear">X</p>-->
        </div>
        <div v-if="$slots.append" class="append"
             :style="{'height':height+'px','line-height':height+'px','borderRadius':radius?`0 ${height/2}px ${height/2}px 0`:'0pxr'}"
             @click="handleAppend">
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'pc-input',
    props: {
      value: [String, Number],
      index: Number,
      height: {
        type: String,
        default: '40'
      },
      radius: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    data() {
      return {
        error: false
      }
    },
    created() {

    },
    mounted() {

    },
    computed: {
      prefixShow() {
        return this.$slots.prefix
      },
      appendShow() {
        return this.$slots.append
      },
    },
    methods: {

      clear() {
        this.$emit('input', '')
      },
      prompt() {
        this.error = true
        this.$refs.input.focus()
      },
      handleInput(event) {
        this.error = false
        this.$emit('input', event.target.value)
      },
      blurInput(event) {
        this.error = false
        this.$emit('blur', event.target.value)
      },
      handleAppend() {
        this.$emit('handleAppend', this.index)
      },
      handlePrefix() {
        this.$emit('handlePrefix', this.index)
      },

    }

  }
</script>

<style lang="less" scoped>
    .input-box {
        position: relative;
        box-sizing: content-box;
        /*border: 1px solid #5f551a;*/
        /*background: #332019;*/

        .input {
            width: 100%;
            position: relative;

            .prefix-left {
                padding: 0 15px 0 28px;
            }

            .error {
                box-shadow: 0 0 3px #ff6b55;
            }
            input::-ms-reveal{
                display: none;
            }
            input::-ms-clear{
                display: none;
            }
            input {
                width: 100%;
                /*width: 520px;*/
                /*height: 35px;*/
                padding: 0 15px 0 15px;
                /*line-height: 35px;*/
                border: 1px solid @gray;
                transition: all .3s;
                outline: 0;

                &:focus {
                    box-shadow: 0 0 3px #21BA58;
                }
            }
            .placeholder-style(#999);


        }

        .prefix {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            margin-left: 10px;
            line-height: 35px;
        }

        .append {
            position: absolute;
            top: 0;
            right: 0;
            width: 54px;
            padding: 0 5px;
            /*height: 35px;*/
            /*line-height: 35px;*/
            text-align: center;
            /*color: #251811;*/
            color: #333333;
            font-size: 14px;
            font-weight: 400;
            background: @gray;
            cursor: pointer;
            /*border: 1px solid #ccc;*/
            border-left: 1px solid transparent;
            border-radius: 4px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        .close {
            position: absolute;
            top: 50%;
            right: 5px;
            width: 20px;
            height: 20px;
            transform: translateY(-50%);
            cursor: pointer;
        }
    }
</style>
