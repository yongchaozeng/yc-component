<template>
    <div v-html="payHtml"></div>
</template>

<script>

    export default {
        name: "payLink",
        data() {
            return {
                payHtml: '',
                timeId: '',
            };
        },
        mounted() {
            this.$nextTick(() => {
                if (sessionStorage.getItem('payHtml')) {
                    let num = 0;
                    this.payHtml = sessionStorage.getItem('payHtml');
                    this.timeId = setInterval(() => {
                        num++;
                        document.pay_form.submit();
                        if (num === 40) {
                            clearInterval(this.timeId);
                        }
                    }, 500);
                }
            });
        },
        beforeDestroy(){
            clearInterval(this.timeId);
        },
        computed: {},

    };
</script>

<style scoped>

</style>
