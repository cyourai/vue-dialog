<template>
  <div>
    <el-button type="text"
               @click="editPreview();visible=true">脚本生成器</el-button>
    <vue-dialog :visible="visible"
                :title='"脚本生成器"'
                :type='"ScriptCreate"'
                :width='"80%"'
                @closeHandler="visible=false"
                @confirmHandler="confirmHandler"></vue-dialog>
  </div>
</template>

<script>
// import VueDialog from 'cyourai-vue-dialog' // 开发替换引用
import VueDialog from '@/components/VueDialog'
import Bus from '@/utils/bus.js'

export default {
  name: 'TestScriptCreate',
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
      console.debug('confirmHandler: %s', params.galleryList.length)
      console.debug('confirmHandler: %s', params.galleryList.join(','))
    },
    editPreview() {
      const data = [
        ['张三', '11', '111'],
        ['李四', '22', '222'],
        ['王五', '33', '333'],
        ['赵刘', '44', '444'],
        ['侯七', '55', '555']
      ]
      Bus.$emit('editPreview', data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .el-dialog__wrapper /deep/ .el-dialog__body {
//   padding: 10px 0 0 0;
// }
</style>
