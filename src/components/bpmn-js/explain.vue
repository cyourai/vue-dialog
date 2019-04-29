<template>
  <!--节点说明页面-->
  <div v-loading="loading" class="bind-container">
    <div v-show="taskType === 'bpmn:StartEvent'" v-html="explains['StartEvent']"/>
    <div v-show="taskType === 'bpmn:EndEvent'" v-html="explains['EndEvent']"/>
    <div v-show="taskType === 'bpmn:Process'" v-html="explains['Process']"/>
    <div v-show="taskType === 'bpmn:UserTask'" v-html="explains['UserTask']"/>
    <div v-show="taskType === 'bpmn:CallActivity'" v-html="explains['CallActivity']"/>
    <div v-show="taskType === 'bpmn:ExclusiveGateway'" v-html="explains['ExclusiveGateway']"/>
    <div v-show="taskType === 'bpmn:ParallelGateway'" v-html="explains['ParallelGateway']"/>
    <div v-show="taskType === 'bpmn:SequenceFlow'" v-html="explains['SequenceFlow']"/>
  </div>
</template>

<script>
  export default {
    name: 'explain',
    components: {
    },
    props: {
      // 节点类型
      taskType: {
        type: String,
        required: true,
        default: ''
      }
    },
    data() {
      return {
        loading: false,
        // 说明
        explains: {
          StartEvent: '开始点(StartEvent): <br>一个流程必须由一个开始点开始',
          EndEvent: '结束点(EndEvent): <br>一个流程必须由一个结束点结束',
          Process: '流程定义页(Process): <br>负责定义整个流程的编号和名称, 编号和名称需要唯一,避免重复',
          UserTask: '用户任务(UserTask): <br>负责执行具体工作任务, 可通过绑定权限限制此环节的由具体团队或个人执行',
          CallActivity: '调用子流程(CallActivity): <br>通过绑定子流程,与子流程进行关联,流程流转到此处自动进入到子流程环境',
          SequenceFlow: '连线(SequenceFlow): <br>连接不同任务节点, 连接网关前可指定表达式作为进入网关的前置条件<br>如: <br>正常 ${condition=="ok"}<br>   异常 ${condition=="ng"}'
        }
      }
    },
    watch: {
      $route(to, from) {
        this.init()
        this.refreshTable()
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
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '~@/styles/smart-ui/smart-ui.scss';
  .bind-container /deep/ {
    .el-row {
      margin-top: 10px;
    }
    .el-tag {
      margin-right: 5px
    }
  }
</style>
