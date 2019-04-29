<template>
  <div class="container"
       :style="containerStyle">

    <!-- title -->
    <h1 class="title1">{{title1}}</h1>
    <h1>{{title2}}</h1>

    <!-- content -->
    <div class="content">

      <!-- row1 -->
      <div class="row">
        <div class="block block-rec">
          <router-link :to="list[0].url">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[0].bcColor}">
              <i :class="list[0].icon"></i>
              <p class="p-in">
                {{list[0].text}}
              </p>
            </div>
            <p class="p-out">
              {{list[0].text}}
            </p>
          </router-link>
        </div>
        <div class="block block-rec">
          <router-link :to="list[1].url">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[1].bcColor}">
              <i :class="list[1].icon"></i>
              <p class="p-in">
                {{list[1].text}}
              </p>
            </div>
            <p class="p-out">
              {{list[1].text}}
            </p>
          </router-link>
        </div>
        <div class="block block-rec">
          <router-link :to="list[2].url">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[2].bcColor}">
              <i :class="list[2].icon"></i>
              <p class="p-in">
                {{list[2].text}}
              </p>
            </div>
            <p class="p-out">
              {{list[2].text}}
            </p>
          </router-link>
        </div>
      </div>

      <!-- row2 -->
      <div class="row">
        <div class="block block-rec">
          <router-link :to="list[3].url">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[3].bcColor}">
              <i :class="list[3].icon"></i>
              <p class="p-in">
                {{list[3].text}}
              </p>
            </div>
            <p class="p-out">
              {{list[3].text}}
            </p>
          </router-link>
        </div>
        <div class="block block-rec">
          <router-link :to="list[4].url">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[4].bcColor}">
              <i :class="list[4].icon"></i>
              <p class="p-in">
                {{list[4].text}}
              </p>
            </div>
            <p class="p-out">
              {{list[4].text}}
            </p>
          </router-link>
        </div>
        <div class="block block-rec">
          <router-link :to="list[5].url">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[5].bcColor}">
              <i :class="list[5].icon"></i>
              <p class="p-in">
                {{list[5].text}}
              </p>
            </div>
            <p class="p-out">
              {{list[5].text}}
            </p>
          </router-link>
        </div>
      </div>

      <!-- row3 -->
      <div class="row">
        <div class="block block-rec">
          <router-link :to="list[6].url">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[6].bcColor}">
              <i :class="list[6].icon"></i>
              <p class="p-in">
                {{list[6].text}}
              </p>
            </div>
            <p class="p-out">
              {{list[6].text}}
            </p>
          </router-link>
        </div>
        <div class="block block-rec">
          <router-link :to="list[7].url">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[7].bcColor}">
              <i :class="list[7].icon"></i>
              <p class="p-in">
                {{list[7].text}}
              </p>
            </div>
            <p class="p-out">
              {{list[7].text}}
            </p>
          </router-link>
        </div>
        <div class="block block-rec">
          <router-link :to="list[8].url">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[8].bcColor}">
              <i :class="list[8].icon"></i>
              <p class="p-in">
                {{list[8].text}}
              </p>
            </div>
            <p class="p-out">
              {{list[8].text}}
            </p>
          </router-link>
        </div>
      </div>

      <!-- row3 -->
      <!-- <div class="row">
        <div class="block block-squ">
          <div class="block-transfer"
               :style="{'backgroundColor':list[9].bcColor}">
            <i :class="list[9].icon"></i>
            <p class="p-in">
              {{list[9].text}}
            </p>
          </div>
          <p class="p-out">
            {{list[9].text}}
          </p>
        </div>
        <div class="block block-squ">
          <div class="block-transfer"
               :style="{'backgroundColor':list[10].bcColor}">
            <i :class="list[10].icon"></i>
            <p class="p-in">
              {{list[10].text}}
            </p>
          </div>
          <p class="p-out">
            {{list[10].text}}
          </p>
        </div>
        <div class="block block-rec">
          <div class="block-transfer"
               :style="{'backgroundColor':list[11].bcColor}">
            <i :class="list[11].icon"></i>
            <p class="p-in">
              {{list[11].text}}
            </p>
          </div>
          <p class="p-out">
            {{list[11].text}}
          </p>
        </div>
        <div class="block block-squ">
          <div class="block-transfer"
               :style="{'backgroundColor':list[12].bcColor}">
            <i :class="list[12].icon"></i>
            <p class="p-in">
              {{list[12].text}}
            </p>
          </div>
          <p class="p-out">
            {{list[12].text}}
          </p>
        </div> -->
      <!-- 右下角4个小方块 -->
      <!-- <div class="block-rightBottom">
          <div class="block block-small"
               style="margin-right:0">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[13].bcColor}">
              <i :class="list[13].icon"></i>
            </div>
          </div>
          <div class="block block-small"
               style="margin-right:0">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[14].bcColor}">
              <i :class="list[14].icon"></i>
            </div>
          </div>
          <div class="block block-small"
               style="margin-right:0">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[15].bcColor}">
              <i :class="list[15].icon"></i>
            </div>
          </div>
          <div class="block block-small"
               style="margin-right:0">
            <div class="block-transfer"
                 :style="{'backgroundColor':list[16].bcColor}">
              <i :class="list[16].icon"></i>
            </div>
          </div>
        </div>
      </div> -->

    </div>

  </div>
</template>

<script>
  // import Time from './onekey/time/time'

  export default {
    components: {
      // Time
    },
    props: {
      title1: {
        type: String,
        default: "SmartBCM"
      },
      title2: {
        type: String,
        default: "智能容灾管理系统"
      },
      containerStyle: {
        type: Object,
        default: {
          backgroundImage: "none"
        }
      },
      list: {
        type: Array,
        default: () => {
          return [
            // {
            //   text: "参演人员",
            //   bcColor: "#F29500",
            //   icon: "fa fa-users",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   text: "参演时间",
            //   bcColor: "#C23916",
            //   icon: "fa fa-clock-o",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   text: "演练宣传册",
            //   bcColor: "#3C7780",
            //   icon: "fa fa-picture-o",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   text: "点击开始演练",
            //   bcColor: "#0097AA",
            //   icon: "fa fa-youtube-play",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   text: "视频播放",
            //   bcColor: "#6FA014",
            //   icon: "fa fa-play-circle-o",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   text: "演练流程监控",
            //   bcColor: "#BE213E",
            //   icon: "fa fa-hand-o-up",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   text: "演练预案",
            //   bcColor: "#94C849",
            //   icon: "fa fa-file-o",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   text: "任务列表",
            //   bcColor: "#0097AA",
            //   icon: "fa fa-pie-chart",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   text: "已切换的业务",
            //   bcColor: "#3C7780",
            //   icon: "fa fa-plus-square",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   text: "服务器列表",
            //   bcColor: "#0097AA",
            //   icon: "fa fa-bars",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   text: "脚本效率分析",
            //   bcColor: "#3C7780",
            //   icon: "fa fa-bar-chart",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   text: "扫一扫有惊喜",
            //   bcColor: "#F29500",
            //   icon: "fa fa-qrcode",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   text: "关于我们",
            //   bcColor: "#94C849",
            //   icon: "fa fa-weixin",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   bcColor: "#0097AA",
            //   icon: "fa fa-facebook-square",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   bcColor: "#0097AA",
            //   icon: "fa fa-facebook-square",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   bcColor: "#0097AA",
            //   icon: "fa fa-facebook-square",
            //   url: "onekey/onekey-index"
            // },
            // {
            //   bcColor: "#0097AA",
            //   icon: "fa fa-facebook-square",
            //   url: "onekey/onekey-index"
            // }
          ];
        }
      }
    },
    mounted() {
      const that = this;
      // 屏幕缩放时
      window.onresize = () => {
        return (() => {
          that.screenWidth = document.body.clientWidth;
          // that.containerWidth = document.getElementsByClassName('container')[0].clientWidth
          this.$nextTick(() => {
            // const clouds = document.getElementsByClassName('cloud-item')
            if (this.screenWidth <= 1920 && this.screenWidth >= 1170) {
            } else if (this.screenWidth <= 1170 && this.screenWidth >= 750) {
            } else if (this.screenWidth <= 750) {
            }
          });
        })();
      };
    },
    created() {
      this.$nextTick(() => {
        this.screenWidth = document.body.clientWidth;
        // this.containerWidth = document.getElementsByClassName('container')[0].clientWidth
        if (this.screenWidth <= 1920 && this.screenWidth >= 1170) {
        } else if (this.screenWidth <= 1170 && this.screenWidth >= 750) {
        } else if (this.screenWidth <= 750) {
        }
      });
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../styles/onekey/onekeyIndex.scss";
  @import "../styles/fontawesome/css/font-awesome.min.css";
</style>
