<template>
  <div>
    <el-container class="filter-container filter">
      <el-form>
        <!-- 筛选器名称 -->
        <el-form-item label="筛选器名称："
                      prop="userName"
                      class="filter-container-name"
                      label-position="left"
                      label-width="100px">
          <el-input></el-input>
        </el-form-item>

        <!-- 符合筛选条件 -->
        <div class="filter-container-title">综合删选</div>
        <el-row v-for="(add, index) in formData.list"
                :key="add.key"
                :gutter="10">
          <el-col :span="6">
            <el-form-item :prop="'list.' + index + '.settingKey'">
              <el-select placeholder="条件"
                         v-model="value">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :prop="'list.' + index + '.settingValue'">
              <el-select placeholder="包含："
                         v-model="value">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :prop="'list.' + index + '.settingRemark'">
              <el-select placeholder="内容："
                         v-model="value">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="success"
                         @click.prevent="addDomain"
                         icon="el-icon-plus"
                         size="mini"></el-button>
              <el-button type="danger"
                         @click.prevent="removeDomain(add)"
                         icon="el-icon-minus"
                         size="mini"></el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 执行操作 -->
        <div class="filter-container-title">执行操作</div>
        <el-row v-for="(add, index) in formData2.list"
                :key="add.key"
                :gutter="10">
          <el-col :span="6">
            <el-form-item :prop="'list.' + index + '.settingKey'">
              <el-select placeholder="操作："
                         v-model="value">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item :prop="'list.' + index + '.settingRemark'">
              <el-select placeholder="实施："
                         v-model="value">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="success"
                         @click.prevent="addDomain2"
                         icon="el-icon-plus"
                         size="mini"></el-button>
              <el-button type="danger"
                         @click.prevent="removeDomain2(add)"
                         icon="el-icon-minus"
                         size="mini"></el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'script-filter',
  props: {
    // 弹窗是否可见
    visible: {
      Boolean,
      default: false
    }
  },
  mounted() {},
  data() {
    return {
      formData: {
        list: [{}, {}]
      },
      formData2: {
        list: [{}]
      },
      value: '',
      options: [
        {
          value: '选项1',
          label: '操作1'
        },
        {
          value: '选项2',
          label: '操作2'
        },
        {
          value: '选项3',
          label: '操作3'
        }
      ]
    }
  },
  created() {},
  methods: {
    addDomain() {
      // 新增1项
      this.formData.list.push({})
    },
    removeDomain(item) {
      // 删除1项
      var index = this.formData.list.indexOf(item)
      if (index !== -1) {
        this.formData.list.splice(index, 1)
      }
    },
    addDomain2() {
      // 新增1项
      this.formData2.list.push({})
    },
    removeDomain2(item) {
      // 删除1项
      var index = this.formData2.list.indexOf(item)
      if (index !== -1) {
        this.formData2.list.splice(index, 1)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../styles/filter.scss';
// .filter-container {
//   .el-form {
//     width: 100%;
//     .filter-container-name {
//       width: 300px;
//       margin-bottom: 40px;
//       .el-input {
//         width: 300px;
//       }
//       /deep/ .el-form-item__label {
//         text-align: left;
//       }
//     }
//     .filter-container-title {
//       padding: 10px 0;
//       margin-top: 20px;
//       border-top: 1px solid #d6d6db;
//     }
//     .el-select {
//       width: 100%;
//     }
//     .el-button {
//       padding: 7px;
//       width: 30%;
//       min-width: 30px;
//       display: inline-block;
//       margin: 0;
//     }
//   }
// }
</style>
