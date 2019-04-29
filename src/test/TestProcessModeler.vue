<template>
  <div class="container">
    <div class="content">
      <div class="modeler-container" v-loading="loading">
        <!-- 流程编辑器 -->
        <bpmn-js :model-id="modelId"
                 :is-view="isView"
        ></bpmn-js>
      </div>
    </div>
  </div>
</template>

<script>
  import BpmnJs from '@/components/bpmn-js'

  export default {
    name: 'modeler',
    components: {
      BpmnJs
    },
    data() {
      return {
        loading: false,
        modelId: '592964',
        isView: true
      }
    },
    watch: {
      $route(to, from) {
        this.init()
      }
    },
    created() {
      this.init()
    },
    mounted() {
    },
    methods: {
      // 页面初始化
      init() {
      },
      // 刷新页面
      refresh() {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
