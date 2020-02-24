<template>
    <div class="apply-container">
        <div v-if="data" class="apply-main" v-html="data.content">
        </div>
    </div>
</template>

<script>
  import request from '../axios/request'

  export default {
    name: 'apply',
    async asyncData(){
      let data = await request.siteInformation({site_manage_type:4})
      return {
        data:data.data.site_information
      }
    },

  }
</script>

<style lang="less" scoped>
    .apply-container {
        width: 1200px;
        margin: 30px auto 50px auto;
        padding: 55px 70px 102px 70px;
        background: @white;
        line-height: 30px;

    }
</style>
