<template>
  <div>
    <!--原cyourai封装-->
    <!--    <tinymce id="tinymce1"
             v-model="formData.remark1"
             @keyup="this.tinymceHandler"
             @change="this.tinymceHandler"></tinymce>
    {{formData.remark1}}-->
    <tinymce-gallery id="tinymce2"
                     v-model="formData.remark2"
                     :type='"PhotoGallery"'
                     @keyup="this.tinymceHandler"></tinymce-gallery>
    父组件接收:{{formData.remark2}}
  </div>
</template>

<script>
// 开发替换引用
import TinymceGallery from '../components/TinymceGallery'

export default {
  name: 'TestTinymceGallery',
  components: { TinymceGallery },
  mounted() {},
  data() {
    return {
      // 开发替换真实数据
      formData: {
        remark1: '原封装',
        remark2: '带图片组件封装'
      },
      // 富文本规格
      tinyOpt: {
        height: 300
      }
    }
  },
  created() {},
  methods: {
    tinymceHandler(content) {
      this.formData.remark1 = content
      this.formData.remark2 = content
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding: 10px 0 0 0;
}
</style>
