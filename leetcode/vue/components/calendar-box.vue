<template>
    <pc-modal :close="true" v-model="show" width="590" height="auto">
        <div class="calendar-box timetable">
            <div class="calendar" v-for="(item,index) in dateSet" :key="index">
                <p class="calendar-title">{{item.ym}}</p>
                <pc-calendar v-if="dateList" :year="item.year" :month="item.month-1"
                             :information="dateList"></pc-calendar>
            </div>
        </div>
    </pc-modal>
</template>

<script>
    import PcModal from "./pc-modal";
    import PcCalendar from "./pc-calendar";

    export default {
        name: "calendar-box",
        props: ['dateList', 'dateSet',],
        data() {
          return {
              show:false
          }
        },
        methods: {
            open() {
                this.show = true;
            }
        },

        components: {PcCalendar, PcModal}
    };
</script>

<style lang="less">
    .timetable {
        max-height: 580px;
        overflow: auto;
        //.scrollbar-box;
        .calendar {
            padding: 0 0 20px 20px;

            .calendar-title {
                margin: 10px 0 10px 20px;
                font-size: 14px;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
            }

            .date-list {
                width: 78px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                font-size: 12px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                border: 1px solid #f3f3f3;
                border-right: 0;

            }

            .date-list:nth-last-of-type(1) {
                border-right: 1px solid #f3f3f3;
            }

            .calendar-list-box {
                border-left: 1px solid #f3f3f3;

                .calendar-list {
                    width: 78px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 12px;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);

                    border-bottom: 1px solid #f3f3f3;
                    border-right: 1px solid #f3f3f3;

                    .index {

                    }

                }

                .calendar-list:nth-of-type(7n) {
                    border-right: 1px solid #f3f3f3;
                    /*border-bottom: 1px solid #f3f3f3;*/
                }

                .active {
                    line-height: inherit;
                    color: @white;
                    background: #21BA58;
                }
            }


        }
    }
</style>
