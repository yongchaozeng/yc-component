<template>
  <div class="option"  @click="changeSelect">
    {{label}}
  </div>
</template>

<script>
  export default {
    name: "pc-option",
    props: {
      label:[String,Number],
      value:[String,Number]
    },
    created(){

    },
    methods:{
      changeSelect(){
        this.dispatch('zzq-select', 'handleOptionClick', [this, true]);
      },
      dispatch(componentName, eventName, params) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.componentName;

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
          if (parent) {
            name = parent.$options.componentName;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
    },
  }
</script>

<style lang="less" scoped>
.option{
  height: 34px;
  padding-left: 15px;
  line-height: 34px;
  overflow: hidden;
  transition: all .3s;
  &:hover{
    color: @white;
    background: @baseColor2;
  }
}
</style>
