<template>
  <div style="width:600px">
    <process-grid :queryParam='queryParam'
                  :selectUrl='selectUrl'
                  :headers='headers'
                  :selectChildUrl='selectChildUrl'
                  :deployProcess='deployProcess'
                  :startProcess='startProcess'>
    </process-grid>
  </div>
</template>

<script>
import ProcessGrid from '../components/ProcessGrid'

export default {
  name: 'TestTableGrid',
  components: { ProcessGrid },
  data() {
    return {
      // 系统配置url
      baseURL: '',
      // 表头
      headers: [
        { prop: 'name', label: '流程名' },
        { prop: 'key', label: '流程key' }
      ],
      // 根据字段进行子查询
      childKey: 'userName',
      /*
        接口
      */
      // 分页查询所有主流程列表
      selectUrl: '',
      // 查询模型的所有的子流程及子子流程-不分页
      selectChildUrl: '',
      // 部署流程
      deployProcess: '',
      // 启动流程
      startProcess: '',
      queryParam: {}
    }
  },
  methods: {},
  created() {
    this.selectUrl = '/process/actremodel/selectModelListForMain'
    this.selectChildUrl = '/process/actremodel/selectChildModelByModelId/'
    this.deployProcess = 'process/createDeploy/'
    this.startProcess = 'process/startProcessDefinition/'
  }
}
</script>

<style scoped>
</style>
