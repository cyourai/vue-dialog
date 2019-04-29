<template>
  <div>
    <uploader browse_button="browse_button"
              :url="uploadUrl"
              chunk_size="2MB"
              :max_retries="3"
              :filters="{prevent_duplicates:true}"
              :FilesAdded="filesAdded"
              :BeforeUpload="beforeUpload"
              :Error="error"
              :UploadComplete="uploadComplete"
              @inputUploader="inputUploader"/>
    <br/>
    <el-table :data="tableData"
              style="width: 100%; margin: 10px 10px;">
      <el-table-column label="文件名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="大小">
        <template slot-scope="scope">
          <span>{{scope.row.showSize}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === -1">正在计算MD5</span>
          <span v-if="scope.row.status === 1 && scope.row.percent === 0">MD5计算完成，准备上传</span>
          <span v-if="scope.row.status === 4"
                style="color: brown">上传失败</span>
          <span v-if="scope.row.status === 5"
                style="color: chartreuse">已上传</span>
          <el-progress v-if="scope.row.status === 2 || scope.row.status === 1 && scope.row.percent > 0"
                       :text-inside="true"
                       :stroke-width="20"
                       :percentage="scope.row.percent"></el-progress>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger"
                     @click="deleteFile(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button :disabled="uploading"
               type="primary"
               id="browse_button">选择文件
    </el-button>
    <el-button :disabled="uploading"
               type="success"
               @click="uploadStart()">开始上传
    </el-button>
    <el-button :disabled="!uploading"
               type="default"
               @click="uploadStop()">暂停上传
    </el-button>
    <el-button :disabled="uploading"
               type="warning"
               @click="cleanFileList()">取消上传，清空上传列表
    </el-button>
  </div>
</template>

<script>
  import FileMd5 from '../models/file-md5.js'
  import Uploader from './Uploader'

  export default {
    name: 'StopUpload',
    components: {
      'uploader': Uploader
    },
    data() {
      return {
        up: {},
        files: [],
        tableData: [],
        uploading: false
      }
    },
    props: {
      uploadUrl: {
        String,
        default: ''
      }
    },
    watch: {
      uploadUrl(newValue, oldValue) {
        this.uploadUrl = newValue
        // alert("stopuploader:" + this.uploadUrl)
      },
      files: {
        handler() {
          this.tableData = []
          this.files.forEach((e) => {
            this.tableData.push({
              name: e.name,
              size: e.size,
              showSize: this.bytesToSize(e.size),
              status: e.status,
              id: e.id,
              percent: e.percent
            })
          })
        },
        deep: true
      }
    },
    methods: {
      inputUploader(up) {
        this.up = up
        this.files = up.files
      },
      filesAdded(up, files) {
        files.forEach((f) => {
          f.status = -1
          FileMd5(f.getNative(), (e, md5) => {
            f['md5'] = md5
            f.status = 1
          })
        })
      },
      deleteFile(id) {
        const file = this.up.getFile(id)
        this.up.removeFile(file)
      },
      beforeUpload(up, file) {
        up.setOption('multipart_params', { 'size': file.size, 'md5': file.md5 })
      // console.log(file.size)
      // console.log(up)
      },
      uploadStart() {
        this.uploading = true
        this.up.start()
      },
      uploadStop() {
        this.uploading = false
        this.up.stop()
      },
      error() {
        this.uploading = false
      },
      uploadComplete() {
        this.uploading = false
      },
      cleanFileList() {
        this.uploadStop()
        this.files.forEach((e) => {
          const file = this.up.getFile(e.id)
          this.up.removeFile(file)
        })
      },
      bytesToSize(bytes) {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]
      }
    }
  }
</script>

<style scoped>
</style>
