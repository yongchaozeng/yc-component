<template>
    <div class="contact-list-container" v-if="userId">
        <img class="contacts-logo" src="../assets/imgs/contacts-logo.png" alt="">
        <ul class="contact-list-box">

            <p class="present-contacts">{{contact.name?contact.name:'请选择联系人'}}</p>
<!--                <transition-group name="fade">-->
            <template v-if="contactShow">
                <li  class="contact-list " v-for="(item,index) in contactList"
                     @click="changeContact(item,index)"
                     :key="index">
                    <p class="text">{{item.name}}</p>
                    <p class="sign" v-if="item.id!==0" :class="{'active':contact.id === item.id}"></p>
                    <p class="sign addActive" v-else>
                        <i></i>
                    </p>
                </li>
            </template>

<!--                </transition-group>-->
        </ul>
        <i :class="[{'contact-open':!contactShow},{'contact-close':contactShow}]" @click="shrinkContact()"
           :title="contactShow?'收起联系人':'展开联系人'"></i>
    </div>
</template>

<script>
  import request from '../axios/request'

  export default {
    name: 'contacts-list',
    data() {
      return {
        contactList: [],
        contact: {},
        contactShow: false,
        height:0,

      }
    },
    beforeMount() {
      this.$bus.$off('changeContacts')

    },
    mounted() {
      this.$bus.$on('changeContacts', (type) => {
          this.contactShow = false
        this.getContactList()
      })
      if (this.userId) {
        this.getContactList()
      }
      if (sessionStorage.contact) {
        this.contact = JSON.parse(sessionStorage.contact)
      }
    },
    methods: {
      shrinkContact() {
        let box = document.querySelector('.contact-list-box')
          if (this.contactShow) {
            this.height = box.offsetHeight
            box.style.height = `${this.height}px`
            this.$nextTick(()=>{
              setTimeout(()=>{
                box.style.height = `46px`
                setTimeout(()=>{
                  this.contactShow = false
                },30)
              },80)
            })

          }else{
            this.contactShow = true
              setTimeout(()=>{
                  box.style.height = `${(this.contactList.length-1 )* 23+74}px`

              },80)
          }
      },
      // 获取联系人
      async getContactList() {
        let data = await request.contactList()
        try {
          this.contactList = data.data.list.concat({ name: '添加', id: 0 })
          if (this.contactList.length > 1 && !sessionStorage.contact) {
            this.changeContact(this.contactList[0], 1,'init')
          }
          if(this.contactList.length === 0){
              this.contact = {}
              sessionStorage.contact.clear()
          }

        } catch (e) {
          this.contactList = [{ name: '添加', id: 0 }]
        }

      },
      // 更换联系人
      async changeContact(item, index,init) {
        if (item.name === '添加') {
          this.$router.push({ path: '/personal/contacts' })
          return
        }

        let data = await request.contactDetails(item.id)
        if (data && data.data && data.data.contact_info_detail) {
          sessionStorage.contact = JSON.stringify(data.data.contact_info_detail)
          this.contact = data.data.contact_info_detail
            if(init!=='init'){
                this.shrinkContact()
            }
        }
      },
    },
    computed: {
      userId() {
        return this.$store.state.userId
      },
    },
  }
</script>

<style lang="less" scoped>
    @media screen and (max-width: 1440px) {

        .contact-list-container {
            right: 43% !important;
        }
    }

    .contact-list-container {
        position: fixed;
        bottom: 29%;
        right: 50%;
        width: 130px;
        /*padding: 7px 10px 0 8px;*/
        margin-right: 600px;
        z-index: 3;

        /*background: url("../assets/imgs/contacts-border.png") no-repeat;*/
        /*background-size: 100% 100%;*/

        .contacts-logo {
            position: absolute;
            top: -47px;
            left: 0;
            display: block;
            width: 130px;
            height: 54px;
        }

        .present-contacts {
            margin-bottom: 8px;
            text-align: center;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }


        .contact-list-box {
            width: 118px;
            height: 46px;
            margin: 0 auto;
            padding: 7px 8px 0 8px;
            border: 6px solid #26BB5C;
            background: @white;
            border-radius: 10px;
            transition: all .2s;
            overflow: hidden;

            .contact-list {
                margin-bottom: 11px;
                cursor: pointer;
                .clear-both;

                .text {
                    float: left;
                    width: 76px;
                    line-height: 11px;
                    font-size: 12px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                }

                .sign {
                    float: right;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 1px solid rgba(243, 243, 243, 1);
                    transition: all .3s;
                }

                .active {
                    border: 4px solid #26BB5C;
                    color: #26BB5C;
                }

                .addActive {
                    background: url("../assets/imgs/add-contacts-icon.png");
                    background-size: 100% 100%;
                    border: 0;
                }

                &:hover {
                    .text {
                        color: #26BB5C;
                    }
                }
            }

        }

        .contact-icon {
            display: block;
            position: absolute;
            bottom: -19px;
            left: 59px;
            width: 12px;
            height: 6px;
            margin: 0 auto;
            background: url("../assets/imgs/contact-open-icon.png") no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
            transition: all 0.2s;
        }

        .contact-open {
            .contact-icon;
            transform: rotate(0deg);

        }

        .contact-close {
            .contact-icon;
            transform: rotate(180deg);

        }


    }
</style>
