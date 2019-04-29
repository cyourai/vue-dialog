<!--
  *改变主题需要同时设置：
    1、editorOption.theme 的值
    2、.cm-s-[name] (name即theme值)
 -->

<template>
  <!-- 编辑器 -->
  <div class="table-content-spe"
       style="max-height:1000px;overflow:auto">
    Html Test
  </div>
</template>

<script>
export default {
  name: 'htmlTest',
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// @import '~@/styles/smart-ui/smart-ui.scss';
</style>

