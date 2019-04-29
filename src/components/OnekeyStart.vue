<template>
  <div class="container">
    <!-- nav -->
    <nav class="navbar">
      <h1>{{title}}</h1>
    </nav>

    <!-- content -->
    <div class="page">
      <div class="main">
        <!-- 动画 -->
        <div class="main-animation">
          <img class="main-image"
               src="../assets/onekey/ic-cloud-main-760px.svg">
          <div class="main-animation-text">{{animateTitle}}</div>
          <div class="anim-random-bar"></div>
        </div>

        <div class="main-clouds">
          <!-- 左侧 -->
          <Left :left="left"></Left>
          <!-- 右侧 -->
          <Right :right="right"></Right>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Left from './onekey/start/left'
import Right from './onekey/start/right'

export default {
  components: {
    Left, Right
  },
  props: {
    // 标题
    title: {
      type: String,
      default: '测试演练'
    },
    // 中心标题
    animateTitle: {
      type: String,
      default: '业务连续性'
    },
    // 左侧
    left: {
      type: Array
    },
    // 右侧
    right: {
      type: Array
    }
  },
  data() {
    return {
      screenWidth: ''
    }
  },
  mounted() {
    const that = this
    // 屏幕缩放时
    window.onresize = () => {
      return (() => {
        that.screenWidth = document.body.clientWidth
        that.containerWidth = document.getElementsByClassName('container')[0].clientWidth
        this.$nextTick(() => {
          const clouds = document.getElementsByClassName('cloud-item')
          if (this.screenWidth <= 1920 && this.screenWidth >= 1170) {
            for (var cloud of clouds) {
              cloud.style.width = this.containerWidth * 1 / 5 + 'px'
            }
          } else if (this.screenWidth <= 1170 && this.screenWidth >= 750) {
            for (var cloud of clouds) {
              cloud.style.width = this.containerWidth * 2 / 5 + 'px'
            }
          } else if (this.screenWidth <= 750) {
            for (var cloud of clouds) {
              cloud.style.width = this.containerWidth * 4 / 5 + 'px'
            }
          }
        })
      })()
    }
  },
  created() {
    this.$nextTick(() => {
      this.screenWidth = document.body.clientWidth
      this.containerWidth = document.getElementsByClassName('container')[0].clientWidth
      const clouds = document.getElementsByClassName('cloud-item')
      // this.screenHeight = document.body.scrollHeight
      // console.log(this.screenHeight)
      // document.getElementsByClassName('container')[0].style.height = this.screenHeight + 'px'
      if (this.screenWidth <= 1920 && this.screenWidth >= 1170) {
        for (var cloud of clouds) {
          cloud.style.width = this.containerWidth * 1 / 5 + 'px'
        }
      } else if (this.screenWidth <= 1170 && this.screenWidth >= 750) {
        for (var cloud of clouds) {
          cloud.style.width = this.containerWidth * 2 / 5 + 'px'
        }
      } else if (this.screenWidth <= 750) {
        for (var cloud of clouds) {
          cloud.style.width = this.containerWidth * 4 / 5 + 'px'
        }
      }
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../styles/onekey/onekeyStart.scss';
</style>
