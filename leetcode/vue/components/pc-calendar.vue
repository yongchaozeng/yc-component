<template>
    <div class="pc-calendar-container">
        <ul class="date-list-box">
            <li class="date-list" v-for="(item,index) in date">
                {{item.name}}
            </li>
        </ul>
        <ul class="calendar-list-box">
            <li class="calendar-list" :title="item?item.room_name:''" :class="{'active':item && item.room_name}" v-for="(item,index) in calendarList"
                :key="index">
                <template v-if="type === 'detail' && item">
                    <div class="name" :class="{'active':item.room_name}" >
                        <p class="index"  >{{item.index+1>9?item.index+1:'0'+(item.index+1)}}</p>
                    </div>
                    <p v-if="item.class_start_time  ">{{item.hm}}</p>
                    <p class="room_name">{{item.room_name}}</p>
                </template>
                <template v-else>
                    <p class="index">{{item?item.index+1:''}}</p>
                    <p class="room_name">{{item?item.room_name:''}}</p>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'pc-calendar',
    props: {
      type: {
        type: String,
        default: ''
      },
      year: [String, Number],
      month: [String, Number],
      information: [Array],
    }, data() {
      return {
        date: [
          { name: '星期一' },
          { name: '星期二' },
          { name: '星期三' },
          { name: '星期四' },
          { name: '星期五' },
          { name: '星期六' },
          { name: '星期日' },
        ],
        monthList: [],
        monthDay: 0,
        monthOlympic: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        monthNormal: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        calendarList: []
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let array = []
        let week = new Date(this.year, this.month, 1).getDay()

        if (this.year % 4 === 0) {
          this.monthDay = this.monthOlympic[this.month]
        } else {
          this.monthDay = this.monthOlympic[this.month]
        }

        array = Array.from(new Array(this.monthDay)).map((item, index) => {
          return { index }
        })

        array.map((item, index, array) => {
          this.information.map((date, idx) => {

            if (date.year === Number(this.year) && date.month === Number(this.month + 1) && date.day === (index + 1)) {
              this.$set(array, index, { ...date, index: index })
            }
          })

        })


        if (week === 0) {
          this.calendarList = Array.from(new Array(6)).concat(array)
        } else if (week === 1) {
          this.calendarList = array
        } else {
          this.calendarList = Array.from(new Array(week - 1)).concat(array)
        }


        this.calendarList = this.calendarList
          .concat(Array.from(new Array(this.calendarList.length > 35 ? (42 - this.calendarList.length) : (35 - this.calendarList.length))))
        // this.monthDay = Array.from(new Array(week-1)).concat( this.calendarList)
      }
    },
      watch:{
          month(){
              this.init()
          },
      }
  }
</script>

<style lang="less" scoped>
    .pc-calendar-container {
        //.clear-both;

        .date-list-box {
            .clear-both;

            .date-list {
                float: left;
                width: 78px;
            }
        }

        .calendar-list {
            float: left;
            width: 78px;
            height: 78px;
            /*border: 1px solid red;*/
            .room_name{
                width: 100%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .name{
                width: 26px;
                height: 26px;
                border-radius:50%;


            }
            .active{
                color: #fff;
                background: url("../assets/imgs/calendar-title-active.png");
                background-size: 100% 100%;
                /*-webkit-background-clip:text;*/
                /*-webkit-text-fill-color:transparent;*/
                .index{
                    background: transparent ;
                }
            }
        }


    }
</style>
