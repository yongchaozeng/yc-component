<template>
    <div class="pc-tabs-container">
        <ul class="pc-tabs">
            <li class="pc-tabs-list">
                a
            </li>
            <li class="pc-tabs-list">
                b
            </li>
            <li class="pc-tabs-list">
                c
            </li>
        </ul>
        <slot >
            <h1>{{name}}11</h1>
        </slot>

    </div>
</template>

<script>
  export default {
    name: 'pc-tabs'
  }
</script>

<style lang="less" scoped>
    .pc-tabs-container {
        .pc-tabs {
            display: flex;
            height: 50px;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);

            .pc-tabs-list {
                flex: 1;
                text-align: center;
                background: red;
            }
        }
    }
</style>
