<template>

</template>

<script>
  export default {
    name: 'loginClose',
    mounted() {
      if(window.opener){
        window.opener.location.href = window.opener.location.href
        window.close()
      }else{
        setTimeout(()=>{
          window.location.replace(window.location.href.replace(/\/loginClose/,'/'))
        },1000)
      }
    }
  }
</script>
<style scoped>

</style>
