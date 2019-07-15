<template>
  <div class="dialog-user-container">
    <el-dialog title=""
               width="60%"
               :visible.sync="visable"
               :btn-text="btnText"
               :init-dialog-url="initDialogUrl"
               ref="elDialog">
      <div class="transfer-panel"
           v-loading="loading">
        <el-transfer class="el-transfer"
                     filterable
                     :titles="titles"
                     :filter-method="filterMethod"
                     :filter-placeholder="filterPlaceholder"
                     @change="changeHandler"
                     v-model="value"
                     :data="data">
        </el-transfer>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   :disabled="loading"
                   @click="submitDialog">{{btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request, isNotEmpty } from '@/utils'

export default {
  name: 'DialogTransfer',
  components: {},
  props: {
    filterPlaceholder: {
      String,
      required: false,
      default: '选择绑定用户'
    },
    titles: {
      Array,
      required: false,
      default: function() {
        return ['全部用户', '已绑定用户']
      }
    },
    initDialogUrl: {
      String,
      required: false,
      default: '/user/selectOrganizationUserTransfer'
    },
    queryParam: {
      Object,
      default: ''
    },
    btnText: {
      String,
      default: '确 定'
    }
  },
  data() {
    return {
      loading: false,
      visable: false,
      params: {},
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1
      }
    }
  },
  watch: {
    queryParam(val) {
      this.queryParam = val
    },
    initDialogUrl(val) {
      this.initDialogUrl = val
      this.refreshTable()
    }
  },
  mounted() {
    // 挂在reisze 事件
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
        // 屏幕缩放 -> 动态获取elDialog高度 -> 设置elDialogBody高度 -> 设置elCheckboxGroupHeiht高度
        this.$nextTick(() => {
          const elDialog = document.getElementsByClassName('el-dialog')
          const elDialogBody = document.getElementsByClassName(
            'el-dialog__body'
          )
          const elCheckboxGroup = document.getElementsByClassName(
            'el-checkbox-group'
          )

          if (this.visable) {
            const elDialogBodyHeight = elDialog[0].offsetHeight - 30 - 70
            const elCheckboxGroupHeiht = elDialogBodyHeight - 40 - 70
            // console.log(elDialogBodyHeight)
            // console.log(elCheckboxGroupHeiht)
            elDialogBody[0].style.height = elDialogBodyHeight + 'px'
            elCheckboxGroup[0].style.height = elCheckboxGroupHeiht + 'px'
            elCheckboxGroup[1].style.height = elCheckboxGroupHeiht + 'px'
          }
        })
      })()
    }
  },
  created() {},
  methods: {
    init() {
      this.refreshTable()
    },
    refreshTable() {
      if (isNotEmpty(this.initDialogUrl)) {
        this.loading = true
        request({
          url: this.initDialogUrl,
          method: 'get'
        })
          .then(result => {
            this.data = result.data.left
            this.value = result.data.right
            const params = {
              left: this.data,
              right: this.value
            }
            this.$emit('sendSelectedChild', params)
            // 数据加载完 -> 根据elDialog的高度 -> 设置elDialogBody高度 -> 设置elCheckboxGroupHeiht高度
            this.$nextTick(() => {
              const elDialog = document.getElementsByClassName('el-dialog')
              const elDialogBody = document.getElementsByClassName(
                'el-dialog__body'
              )
              const elCheckboxGroup = document.getElementsByClassName(
                'el-checkbox-group'
              )
              if (this.visable) {
                const elDialogBodyHeight = elDialog[0].offsetHeight - 30 - 70
                const elCheckboxGroupHeiht = elDialogBodyHeight - 40 - 70
                // console.log(elDialogBodyHeight)
                // console.log(elCheckboxGroupHeiht)
                elDialogBody[0].style.height = elDialogBodyHeight + 'px'
                elCheckboxGroup[0].style.height = elCheckboxGroupHeiht + 'px'
                elCheckboxGroup[1].style.height = elCheckboxGroupHeiht + 'px'
              }
            })
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    changeHandler(value, direction, movedKeys) {
      this.value = value
      this.$emit('change', {
        value: value,
        direction: direction,
        movedKeys: movedKeys
      })
    },
    showDialog() {
      this.visable = true
      // this.refreshTable()
    },
    closeDialog() {
      this.visable = false
    },
    showLoading(flg) {
      this.loading = flg
    },
    submitDialog() {
      this.$emit('submit', {
        value: this.value
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../styles/bulldog-ui/dialogTransfer.scss';
</style>
