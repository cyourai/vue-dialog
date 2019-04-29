<template>
  <div class="upload-context">
    <el-row :gutter="22">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <!-- :headers="this.headers" -->
          <el-upload class="upload"
                     ref="uploadExcel"
                     drag
                     multiple
                     action=""
                     :limit=1
                     :auto-upload="false"
                     :file-list="this.fileList"
                     :on-change="this.filesChangeHandler"
                     :http-request="this.httpRequestHandler"
                     :uploadResult="this.uploadResult"
                     accept=".xls,.xlsx,.xlsm">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip"
                 slot="tip">只能上传xls/xlsx/xlsm文件，且不超过5MB</div>
          </el-upload>
          <el-button type="warning"
                     class="uploadBtn"
                     @click="this.uploadHandler">导入数据</el-button>
          <el-button type="success"
                     class="copyBtn"
                     icon="document"
                     v-clipboard:copy='myUploadResult'
                     v-clipboard:success='clipboardSuccess'>复制结果到粘帖板</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="22">
      <el-col :span="22">
        导入结果：
        <div class="grid-content bg-purple">
          <el-input type="textarea"
                    :autosize="{ minRows: 6, maxRows: 6}"
                    placeholder=""
                    v-model="myUploadResult">
          </el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'UploadExcel',
  created() {},
  mounted() {},
  props: {
    // 上传结果
    uploadResult: {
      String,
      default: ''
    }
  },
  watch: {
    uploadResult(value) {
      if (this.myUploadResult != value) {
        this.myUploadResult = value
      }
    }
  },
  components: {},
  data() {
    return {
      // 上传文件列表
      fileList: [],
      myUploadResult: ''
    }
  },
  methods: {
    filesChangeHandler(file, fileList) {
      // 上传队列变化
      this.fileList = fileList.slice(file)
    },
    httpRequestHandler(param) {
      // console.debug('httpRequestHandler: %s', param)
      this.$emit('httpRequestHandler', {
        param: param,
        uploadExcel: this.$refs.uploadExcel
      })
    },
    uploadHandler(event) {
      // 上传数据
      // console.debug('uploadHandler: %s', this.fileList)
      event.preventDefault()
      if (this.fileList.length == 0) {
        Message({
          message: '请选择上传文件',
          type: 'warning'
        })
      } else {
        this.$refs.uploadExcel.submit()
      }
    },
    clipboardSuccess() {
      Message({
        message: '已将结果复制到粘帖板',
        type: 'success'
      })
    }
  }
}
</script>

<style language="scss" scoped>
.uploadBtn {
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.upload-context {
  text-align: left;
  margin-left: 30px;
}
.uploadResult-context {
  width: 100%;
  height: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
