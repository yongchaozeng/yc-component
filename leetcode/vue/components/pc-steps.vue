<template>
<div class="pc-steps-container">
  <slot></slot>
</div>
</template>

<script>
  export default {
    name: "pc-steps",
    props: {
      value: [String, Number],
      index:Number,
      placeholder: {
        type: String,
        default: ''
      },
    },
    data(){
      return{
        steps:[]
      }
    },
    created(){

    },
    computed: {

    },
    methods: {

    },
    watch:{
      steps(child){
        child.map((item,index)=>{
          item.index = index
        })
      },
    },

  }
</script>

<style lang="less" scoped>
 .pc-steps-container{
   display: flex;
 }
</style>
