<template>
    <div class="pc-pagination-container">
        <p class="page-prev" :class="{'disabled':this.pageIndex === 1}" @click="prevPage"><</p>
        <ul class="page-number-box">
            <li class="page-number" v-if="pageList[0]!==1">1</li>
            <li class="page-number" v-if="pageList[0]!==1 ">...</li>
            <li v-for="(item,index) in pageList" :class="{'active':item === pageIndex}" :key="index"
                @click="changePage(item,index)" class="page-number">
                {{item}}
            </li>
            <li class="page-number" v-if="nextSkip" @click="skipPage">...</li>
            <li class="page-number" v-if="this.pagination > 7">{{pagination}}</li>
        </ul>
        <p class="page-next" :class="{'disabled':this.pageIndex === this.pagination}" @click="nextPage">{{'>'}}</p>

        <!--        <div>跳转</div>-->
        <!--        <pc-input></pc-input>-->

    </div>
</template>

<script>
  import PcInput from './pc-input'

  export default {
    name: 'pc-pagination',
    components: { PcInput },
    props: {
      total: Number,
    },
    data() {
      return {

        pagination: 0, // 最大页数
        pageSize: 10,
        pageList: [],
        page: 1,
        pageIndex: 1,
      }
    },
    created() {
      this.init()

    },
    mounted() {

    },
    computed: {
      nextSkip() {
        return (this.pageList[this.pageList.length - 1] !== (this.pagination - 1)) && this.pagination > 7
      }
    },
    methods: {
      init() {
        this.pagination = Math.ceil(this.total / this.pageSize)
        this.pageList = Array.from({ length: this.pagination }).map((item, index) => {
          return index + 1
        })
        if (this.pageList.length > 7) {
          this.pageList = this.pageList.slice(0, 5)
        }
      },
      // 改变页数
      changePage(item, index) {
        this.pageIndex = item
        // this.$emit('emitChangePage', { page: index + 1 })
      },
      // 分页跳跃
      skipPage() {
        let num = 3
        if (this.pageList[0] + num + 5 > this.pagination) {
          num = 2
          if (this.pageList[0] + num + 5 > this.pagination) {
            num = 1
            if (this.pageList[0] + num + 5 > this.pagination) {
              num = 0
            }
          }

        }
        this.pageList = this.pageList.map((item, index) => {
          if (item + num < this.pagination) {
            return item + num
          }
        })
      },
      prevPage(item, index) {
        if (this.pageIndex === 1) {
          return
        }
        this.pageIndex -= 1
        if (this.pageIndex === this.pageList[0]) {
          let num = 1
          if (this.pageList[0] <= 5) {
            num = 0
          }
          this.pageList = this.pageList.map((item, index) => {
            if (item + num < this.pagination) {
              // return item - num
              return item - num
            }
          })
          // this.$emit('nextPage', { page: index + 1 })
        }
      },
      nextPage() {
        if (this.pageIndex === this.pagination) {
          return
        }
        this.pageIndex += 1

        if (this.pageIndex === this.pageList[this.pageList.length - 1]) {
          let num = 1
          if (this.pageList[0] + num + 5 > this.pagination) {
            num = 2
            if (this.pageList[0] + num + 5 > this.pagination) {
              num = 1
              if (this.pageList[0] + num + 5 > this.pagination) {
                num = 0
              }
            }

          }
          this.pageList = this.pageList.map((item, index) => {
            if (item + num < this.pagination) {
              return item + num
            }
          })
          // this.$emit('nextPage', { page: index + 1 })
        }

        // let num = 1
        // if (this.pageList[0] + num + 5 > this.pagination) {
        //   num = 2
        //   if (this.pageList[0] + num + 5 > this.pagination) {
        //     num = 1
        //     if (this.pageList[0] + num + 5 > this.pagination) {
        //       num = 0
        //     }
        //   }
        //
        // }
        // this.pageList = this.pageList.map((item, index) => {
        //   if (item + num < this.pagination) {
        //     return item + num
        //   }
        // })
        // this.$emit('nextPage', { page: index + 1 })
      },
    },

  }
</script>

<style lang="less" scoped>
    .pc-pagination-container {
        display: flex;

        .page-number-box {
            display: flex;


            .page-number {
                padding: 15px;

            }

            .active {
                color: red;
            }
        }

        .disabled {
            color: #C0C4CC;
            cursor: not-allowed;
        }
    }
</style>
