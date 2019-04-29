<template>
  <table-file :queryParam='queryParam'
              :selectUrl="selectUrl"
              :updateUrl='updateUrl'
              :downloadUrl='downloadUrl'
              :delUrl='delUrl'>
  </table-file>
</template>

<script>
import TableFile from '../components/TableFile'

export default {
  name: 'TestTableFile',
  components: { TableFile },
  data() {
    return {
      // 系统配置url
      baseURL: '',
      // 下载文件
      downloadUrl: '',
      queryParam: {
        uploadType: 'block',
        uploadStatus: '1'
      }
    }
  },
  methods: {
  },
  created() {
    this.baseURL = `${process.env.BASE_API + process.env.ZUUL + process.env.PREFIX}`
    this.selectUrl = this.baseURL + '/general/upload/page/'
    this.updateUrl = this.baseURL + '/general/upload/'
    this.downloadUrl = this.baseURL + '/general/upload/downFile/'
    this.delUrl = this.baseURL + '/general/upload/deleteUpload/'
  }
}
</script>

<style scoped>
</style>
