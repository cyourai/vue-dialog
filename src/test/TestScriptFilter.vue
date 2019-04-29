<template>
  <div>
    <el-button type="text"
               @click='visible=true'>脚本筛选</el-button>
    <vue-dialog :visible="visible"
                :title='"脚本筛选"'
                :type='"ScriptFilter"'
                :width='"50%"'
                @closeHandler="visible=false"
                @confirmHandler="confirmHandler"></vue-dialog>
  </div>
</template>

<script>
// import VueDialog from 'cyourai-vue-dialog' // 开发替换引用
import VueDialog from '@/components/VueDialog'

export default {
  name: 'TestScriptFilter',
  components: { VueDialog },
  mounted() {},
  data() {
    return {
      // 显示选择库弹窗
      visible: false
    }
  },
  created() {},
  methods: {
    confirmHandler(params) {
      // 确认按钮回调
      this.visible = false
      // console.debug('confirmHandler: %s', params.galleryList.length)
      // console.debug('confirmHandler: %s', params.galleryList.join(','))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .el-dialog__wrapper /deep/ .el-dialog__body {
//   padding: 10px 0 0 0;
// }
</style>
