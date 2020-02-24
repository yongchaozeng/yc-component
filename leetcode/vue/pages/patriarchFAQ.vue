<template>
    <div class="patriarch-container">
        <div class="patriarch-left">
            <div class="patriarch-list-title">常见问题</div>
            <ul class="patriarch-list-box">
                <li v-for="(item,index) in parentsList" @click="lookOver(item,index)" :key="index"
                    :class="{'active':id === item.id}" class="patriarch-list">{{index+1}}.{{item.question}}</li>
            </ul>
        </div>
        <div class="patriarch-right">
            {{answer}}
        </div>
    </div>
</template>

<script>
  import request from '../axios/request'

  export default {
    name: 'patriarchFAQ',
    data(){
      return{
        parentsList:[],
        id:0,
        answer:''
      }
    },
    mounted(){
      this.getParentsList()
    },
    methods:{
      async getParentsList(){
        let data = await request.parentsList()
        if(data.data && data.data.parents_questions_and_answers_list){
          this.parentsList = data.data.parents_questions_and_answers_list
          if(this.parentsList[0]){
            this.lookOver({id:this.parentsList[0].id,answer:this.parentsList[0].answer})
          }
        }
      },
      lookOver(item,index){
        this.id = item.id
        this.answer = item.answer
      },
    }
  }
</script>

<style lang="less" scoped>
    .scrollbar-box;

    .patriarch-container{
    width: 1200px;
    margin: 30px auto 75px auto;
    .clear-both;
    .patriarch-left{
        float: left;
        width: 353px;
        margin-right: 10px;
        background: @white;
        .patriarch-list-title{
            height: 50px;
            padding-left: 30px;
            line-height: 50px;
            border-bottom: 1px solid @gray;
        }
        .patriarch-list-box{
            height: 578px;
            padding: 20px 30px 20px 30px;
            overflow-y: auto;
            .patriarch-list{
                margin-bottom: 35px;
                line-height: 18px;
                font-size:13px;
                font-weight:400;
                color:rgba(51,51,51,1);
                cursor: pointer;
                &:hover{
                    color:rgba(33,186,88,1);
                }
            }
            .active{
                font-size:13px;
                font-weight:bold;
                color:rgba(33,186,88,1);
            }
        }
    }
    .patriarch-right{
        float: right;
        width: 836px;
        height: 630px;
        padding: 20px 30px;
        line-height: 28px;
        background: @white;
        font-size:14px;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
}
</style>
