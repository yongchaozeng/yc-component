<template>
    <div class="error-container">

    </div>
</template>

<script>
  export default {
    name:'error',
    layout:'empty'
  }
</script>

<style lang="less" scoped>
    .error-container {
        height: 100%;
        background: url("../assets/imgs/error.png") no-repeat;

        .error-box {
            width: 700px;
            height: 600px;
        }
    }
</style>
