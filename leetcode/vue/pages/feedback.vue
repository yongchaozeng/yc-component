<template>
    <div class="feedback-container">
        <div class="issue-list-box">
            <p class="title">请选择问题类型</p>
            <ul class="issue-list-ul">
                <li class="issue-list" v-for="(item,index) in selectList" :key="index" @click="changeIssue(item,index)">
                    <div class="img-box">

                        <img class="img" v-if='item.value === id'
                             :src="require(`../assets/imgs/fb-hover-icon${index+1}.png`)" alt="">
                        <img class="img" v-else :src="require(`../assets/imgs/fb-icon${index+1}.png`)" alt="">
                    </div>
                    <div class="text" :class="{'active':item.value === id}">{{item.label}}</div>
                </li>

            </ul>
        </div>
        <div class="issue-title">
            <p class="title">请输入问题标题</p>
            <pc-input ref="title" @keyup.native="numberLimit" class="title-input" height="50"
                      placeholder="请输入问题标题（限定20字以内）"
                      v-model="formData.title"></pc-input>
        </div>
        <div class="issue-text">
            <p class="title">
                请描述详细问题
            </p>
            <!--            <pc-input  height="120" type="textarea" v-model="text"></pc-input>-->
            <textarea @blur="blurColor" @input="blurColor" ref="content" placeholder="请描述详细问题" class="text-input"
                      name="" id="" cols="30" rows="10" v-model="formData.content"></textarea>
        </div>
        <div class="sub-button-box">
            <pc-button class="sub-button" @click="submit">确定提交</pc-button>

        </div>
    </div>
</template>

<script>
  import PcInput from '../components/pc-input'
  import PcButton from '../components/pc-button'
  import request from '../axios/request'

  export default {
    name: 'feedback',
    components: { PcButton, PcInput },
    data() {
      return {
        formData: {
          title: '',
          content: '',
        },
        id: 0,

        selectList: [],
      }
    },

    async mounted() {
      this.getFeedbackList()
    },
    methods: {
      async getFeedbackList() {
        let data = await request.feedbackList()
        if (data.data && data.data.select_list) {
          this.selectList = data.data.select_list
          if (this.selectList && this.selectList[0]) {
            this.id = this.selectList[0].value
          }
        }
      },
      numberLimit(e) {
        if (e.target.value.length > 20) {
          // this.$msg('标题只能输入20个字', { type: 'error' })
          e.target.value = e.target.value.substr(0, 20)
        }
      },
      async submit() {
        if (!this.formData.title) {
          // this.$refs.title.prompt()
          this.$msg('请输入标题', { type: 'error' })
          return
        }
        if (!this.formData.content) {
          // this.$refs.content.style.boxShadow = '0 0 3px #FF0000'
          // this.$refs.content.focus()
          this.$msg('请输入内容', { type: 'error' })
          return
        }

        let data = await request.feedbackOption({ type: this.id, ...this.formData })
        try {
          this.formData.title = ''
          this.formData.content = ''
          this.$msg(data.msg, 'succeed')
          this.getFeedbackList()
        } catch (e) {
        }

      },
      blurColor() {
        // this.$refs.content.style.boxShadow = '0 0 3px #fff'
      },
      changeIssue(item) {
        this.id = item.value
        this.formData = {}
      },
    }
  }
</script>

<style lang="less" scoped>
    .feedback-container {
        width: 1200px;
        margin: 30px auto 32px auto;
        padding: 31px 81px 20px 56px;
        background: @white;

        .issue-list-box {

            .title {
                margin-bottom: 20px;
                font-size: 16px;
                font-weight: bold;
                color: rgba(33, 186, 88, 1);
            }

            .issue-list-ul {
                .issue-list {
                    float: left;
                    width: 16%;
                    text-align: center;
                    cursor: pointer;

                    .img-box {
                        width: 53px;
                        height: 53px;
                        margin: 0 auto 20px auto;
                        border-radius: 50%;
                        transition: all .8s;

                        .img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .text {
                        margin-bottom: 40px;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                        line-height: 13px;
                    }

                    .active {
                        color: rgba(33, 186, 88, 1);
                    }

                    &:hover {
                        .img-box{
                            opacity: .9;
                            transform: rotate(360deg);

                        }
                        .text {
                            color: rgba(33, 186, 88, 1);
                        }
                    }
                }

                &:after {
                    .clear;
                }
            }
        }

        .issue-title {
            .title {
                font-size: 16px;
                font-weight: 600;
                color: #333;
            }

            .title-input {
                margin: 20px 0 40px 48px;
            }


        }

        .issue-text {
            .title {
                font-size: 16px;
                font-weight: 600;
                color: #333;
            }

            .text-input {
                width: 1016px;
                height: 120px;
                padding: 18px 41px 18px 41px;
                margin: 18px 0 0 48px;
                border: 1px solid #f3f3f3;
                resize: none;
                outline: 0;
                &:focus{
                    box-shadow: 0 0 3px #21BA58;
                }
            }
        }

        .sub-button-box {
            text-align: right;

            .sub-button {
                width: 177px;
                height: 50px;
                margin-top: 30px;
                font-size: 18px;
                font-weight: 600;
                color: rgba(255, 255, 255, 1);
                background: #21BA58;
            }
        }

    }
</style>
<style lang="less">
    .feedback-container {
        .issue-title {
            input {
                padding-left: 40px !important;
            }
        }
    }
</style>
