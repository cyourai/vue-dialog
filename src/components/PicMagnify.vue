<template>
  <div class="pic-magnify">
    <img :src="picUrl"
         :onerror="getErrorImg()"
         v-show='picUrl!==""'
         :width="width" />
    <div class="pic-magnify-glass">
      <i class="el-icon-zoom-in"
         @click.prevent.stop="picGlass"></i>
    </div>
    <!-- 图片放大 -->
    <div class="gallery-list-bigMask"
         v-if="picBigShow"
         @click.prevent.stop="picBigShow=!picBigShow">
      <img class="gallery-list-bigMask-img"
           :src="picUrl"
           :onerror="getErrorImg()">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PicMagnify',
  mounted() {},
  props: {
    // 单张图片url
    picUrl: {
      String,
      default: ''
    },
    onerror: {
      String,
      default: ''
    },
    width: {
      String,
      default: '200px'
    }
  },
  data() {
    return {
      // 单张图片放大，默认隐藏
      picBigShow: false
    }
  },
  created() {},
  methods: {
    getErrorImg() {
      return "this.src='" + this.onerror + "'"
    },
    picGlass() {
      this.picBigShow = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../styles/gallery.scss';
</style>
