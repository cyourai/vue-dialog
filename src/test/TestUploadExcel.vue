<template>
  <div>
    <el-button type="text"
               @click='visible = true'>上传EXCEL</el-button>
    <vue-dialog :visible="visible"
                :loading="loading"
                :uploadResult="uploadResult"
                :title='"上传Excel"'
                :type='"UploadExcel"'
                @closeHandler="visible=false"
                @confirmHandler="visible=false"
                @httpRequestHandler="this.httpRequestHandler"></vue-dialog>
  </div>
</template>

<script>
// 开发替换引用
// import VueDialog from 'cyourai-vue-dialog'
import VueDialog from '@/components/VueDialog'
import { request } from '@/utils/request'

export default {
  name: 'TestUploadExcel',
  components: { VueDialog },
  data() {
    return {
      // 默认不显示Dialog : false
      visible: false,
      // loading
      loading: false,
      // 导入结果
      uploadResult: ''
    }
  },

  methods: {
    httpRequestHandler(params) {
      console.debug('httpRequestHandler: %s', params)
      this.loading = true

      var form = new FormData()
      form.append('file', params.param.file, params.param.file['filename'])
      form.append('publishedType', 'special')
      return request({
        // 开发时注释掉测试baseURL
        baseURL: 'http://192.168.11.168:8888/zuul/api/',
        // baseURL: 'http://localhost:8888/zuul/api/',
        url: '/media/published/uploadExcel',
        method: 'post',
        data: form,
        config: {
          headers: {
            // 开发时注释掉测试token-header'
            'token-header':
              'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ6aGFuZ3hpYW96aGkiLCJqd3RfdXNlcmlkIjoiMjQ1YmYxM2MtNDk3YS0xMWU4LWJlZDQtMDAxNjNlMDA0Zjc5Iiwiand0X25hbWUiOiIiLCJleHAiOjE1Mjc1OTA4ODF9.FJUZaCSQwn2ZnZDsood7Q6zdzwis-KcSGNMtEWSP_ifFOV8SYN2wL0Yv26wWdvnkiTFl91Bp2fHmXml6z83PQ6-yANNydx7HfJkN8ii4ut2rS3X4OjUbAFZIga8NPiDxOHHzWaYqr9MzZiBjWXVr2qS7Qb7oRjqFmwfnN5NqirE',
            'Content-Type': 'multipart/form-data;boundary=boundary'
          }
        }
      })
        .then(result => {
          console.log(result)
          this.uploadResult =
            this.uploadResult +
            '------------------------------------------------\r\n' +
            result.data.messageList.title
          params.uploadExcel.clearFiles()
          this.loading = false
        })
        .catch(error => {
          console.error(error)
          this.loading = false
        })
    }
  }
}
</script>
