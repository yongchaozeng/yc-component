<template>
    <div class="step-box-list">
        <div class="step-box" v-if="index === 0">
            <div class="step">
                <!--                <span>{{index+1}}</span>-->
            </div>
            <div class="step-line">
            </div>
        </div>
        <div class="step-box" v-if="index === this.$parent.steps.length-1">

            <div class="step-line">
            </div>
            <div class="step">
                <!--                <span>{{index+1}}</span>-->
            </div>


        </div>
        <div class="title">开课时间</div>
        <div class="text">2019-1-1</div>
    </div>

</template>

<script>
  export default {
    name: 'pc-step',
    props: {},
    data() {
      return {
        index: -1
      }
    },
    created() {
      this.$parent.steps.push(this)
    },

    // beforeDestroy() {
    //   const steps = this.$parent.steps;
    //   const index = steps.indexOf(this);
    //   if (index >= 0) {
    //     steps.splice(index, 1);
    //   }
    // },

    computed: {},
    methods: {}

  }
</script>

<style lang="less" scoped>
    .step-box-list {
        width: 100%;


        .step-box {

            .step {
                display: inline-block;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                color: @white;
                background-color: @white;
                border-radius: 50%;
                border: 5px solid rgba(33, 186, 88, 1);
            }

            .step-left-title {
                width: 50px;
                margin: 0 5px;
            }

            .step-line {
                display: inline-block;
                width: 42%;
                height: 10px;
                margin: 0 0 9px 0;
                /*background-color: #ccc;*/
                border-bottom: 1px dashed @white;
            }

            &:after {
                .clear;
            }
        }


        .title {
            height: 24px;
            line-height: 24px;
            padding-left: 5px;
            text-align: center;
            font-size:14px;
            font-weight:400;
            color:rgba(255,255,255,1);
        }

        .text {
            padding-left: 5px;
            white-space: nowrap;
            text-align: center;
            font-size:24px;
            font-weight:bold;
            color:rgba(255,255,255,1);
        }
    }

    .step-box-list:nth-of-type(1) {
        .step-box {
            text-align: right;
        }
    }

    .step-box-list:nth-last-of-type(1) {
        width: 100%;

        .step-box {
            text-align: left;

            .step-line {
            }
        }
    }


</style>
