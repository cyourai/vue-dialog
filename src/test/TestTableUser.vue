<template>
  <table-user :queryParam='queryParam'
              :selectUrl='selectUrl'
              :headers='headers'
  >
  </table-user>
</template>

<script>
  import TableUser from '../components/TableUser'

  export default {
    name: 'TestTableUser',
    components: { TableUser },
    data() {
      return {
        // 系统配置url
        baseURL: '',
        selectUrl: '',
        queryParam: {},
        // 表头
        headers: [
          { prop: 'userName', label: '用户名' },
          { prop: 'userNickName', label: '用户名' },
          { prop: 'userMobile', label: '手机' }
        ]
      }
    },
    methods: {},
    created() {
      this.selectUrl = '/user/userPage'
    }
  }
</script>

<style scoped>
</style>
