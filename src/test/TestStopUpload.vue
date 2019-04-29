<template>
  <stop-upload :uploadUrl="uploadUrl"></stop-upload>
</template>

<script>
import StopUpload from '../components/StopUpload'

export default {
  name: 'TestStopUpload',
  components: { StopUpload },
  data() {
    return {
      // 系统配置url
      baseURL: '',
      // 断点上传文件
      uploadUrl: ''
    }
  },
  methods: {},
  created() {
    this.baseURL = `${process.env.BASE_API + process.env.ZUUL + process.env.PREFIX}`
    this.uploadUrl = this.baseURL + '/general/upload/uploadRandomAccessFile/123'
  }
}
</script>

<style scoped>
</style>
