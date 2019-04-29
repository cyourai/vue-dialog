<template>
  <!--封装BpmnjsModeler 流程编辑器组件
    modelId(必填): 模型id
    isView(非必填): 是否只显示视图不能编辑
  -->
  <div :model-id=modelId
       :isView=isView
       class="bpmn-container"
       ref="bpmnContainer"
       v-loading="loading">
    <!--Modeler编辑器-->
    <div class="canvas"
         ref="canvas">
    </div>
    <!--流程信息-->
    <div class="info" v-show="isView">
      <div>流程名称: &nbsp;{{this.modelName}}</div>
      <div>流程编号: &nbsp;{{this.modelId}}</div>
      <div>当前选中环节: &nbsp;{{this.taskName}}</div>
      <div>
        <el-button type="warning" plain @click="zoomOut" :disabled="loading">查看全景图</el-button>
        <el-button type="success" plain @click="zoomIn" :disabled="loading">查看近景图</el-button>
      </div>
    </div>
    <!--控制面板-->
    <div class="panel" v-show="!isView">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="属性"
                          name="property">
          <div ref="propertiesPanel"></div>
        </el-collapse-item>
        <el-collapse-item title="绑定" name="bind" v-if="!isView">
          <bind ref="bind"
                :model-id="modelId"
                :task-id="taskId"
                :task-type="taskType"
                :active-element="activeElement"
                @submit="submit"></bind>
        </el-collapse-item>
        <el-collapse-item title="说明"
                          name="explain">
          <!--绑定说明组件-->
          <!--<explain :task-type="taskType"></explain>-->
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="option" v-show="!isView">
      <!--功能按钮组-->
      <el-button-group>
        <a href="javascript:void(0)"
           ref="downloadSvgLink"
           @click="isClick=true;saveHandler()"
           class="el-button el-button--default el-button--medium">
          <el-tooltip class="item"
                      effect="dark"
                      content="保存"
                      placement="top">
            <svg-icon icon-class="save" v-if="!isView"/>
          </el-tooltip>
        </a>
        <a href="javascript:void(0)"
           ref="downloadLink"
           class="el-button el-button--default el-button--medium">
          <el-tooltip class="item"
                      effect="dark"
                      content="下载Bpmn文件"
                      placement="top">
            <i class="el-icon-download"></i>
          </el-tooltip>
        </a>
        <el-tooltip class="item"
                    effect="dark"
                    content="上传Bpmn文件"
                    placement="top">
          <input type="file"
                 ref="upload"
                 class="upload"
                 @change="uploadHandler"/>
        </el-tooltip>
        <a href="javascript:void(0)"
           ref="uploadLink"
           class="el-button el-button--default el-button--medium">
          <i class="el-icon-upload2"></i>
        </a>
        <a href="javascript:void(0)"
           ref="downloadSvgLink"
           class="el-button el-button--default el-button--medium">
          <el-tooltip class="item"
                      effect="dark"
                      content="下载图片"
                      placement="top">
            <i class="el-icon-picture-outline"></i>
          </el-tooltip>
        </a>
        <a href="javascript:void(0)"
           ref="statusLink"
           class="el-button el-button--default el-button--medium deploy-btn">
          <p v-if="!isDeployed"
             class="red"
             @click="deployHandler">
            未部署 /
            <span class="blue">去部署</span>
          </p>
          <div v-else
               class="green">已部署
          </div>
        </a>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  // BpmnJs封装相关
  import BpmnViewer from 'bpmn-js'
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  // 控制面板 https://github.com/bpmn-io/bpmn-js-examples/tree/master/properties-panel-extension
  import propertiesPanelModule from 'bpmn-js-properties-panel'
  // propertiesProvider:左边/右边工具栏以及节点 camunda会显示更丰富
  import propertiesProvider from './plugins/Modeler/Provider'
  // paletteProvider:自定义左侧工具栏
  import paletteProvider from './plugins/Modeler/Provider'
  // contextPadProvider:自定义节点弹出中央工具栏
  import contextPadProvider from './plugins/Modeler/Provider'
  // replaceMenuProvider:自定义节点弹出中央任务栏
  import replaceMenuProvider from './plugins/Modeler/Provider'
  import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
  // 中文化
  import translate from './plugins/translate'
  // 防抖
  import { debounce, isEmpty, request } from '@/utils'
  // 业务相关
  import { getByModelId, updateModel, deployByModelId } from '../../api/process'
  // // 绑定面板组件
  // import bind from './bind'
  // 绑定说明组件
  // import explain from './explain'

  export default {
    name: 'BpmnJs',
    components: {
      BpmnViewer,
      BpmnModeler,
      propertiesPanelModule,
      propertiesProvider,
      camundaModdleDescriptor,
      paletteProvider,
      contextPadProvider,
      replaceMenuProvider
      // bind,
      // explain
    },
    props: {
      // 模型id
      modelId: {
        type: String,
        default: '筛选查询',
        required: true
      },
      // 是否只显示视图
      isView: {
        Boolean,
        default: true,
        required: false
      }
    },
    data() {
      return {
        loading: false,
        // 默认激活属性面板
        activeNames: ['property', 'bind', 'explain'],
        // bpmn建模器
        bpmnModeler: null,
        container: null,
        canvas: null,
        // 当前激活状态的图形
        activeElement: null,
        // bpmn xml文件
        xmlStr: '',
        // 流程模型名称
        modelName: '',
        // 当前节点id
        taskId: '',
        // 当前节点名称
        taskName: '',
        // 当前节点类型
        taskType: '',
        // 当前流程模型的版本
        version: 1,
        // 取引id
        tenantId: '',
        // 当前流程的部署id,没有则未部署
        deploymentId: '',
        // 是否已部署 true:已部署
        isDeployed: false,
        // 全局变量，判定是否为点击“保存”
        isClick: false
      }
    },
    watch: {
      $route(to, from) {
        this.mounted()
      },
      deploymentId(val) {
        this.isDeployed = !isEmpty(val)
      },
      modelId(val) {
        this.modelId = val
      }
    },
    created() {
      this.init()
      this.loading = true
    },
    mounted() {
      // 中文化
      const translateModule = {
        translate: ['value', translate]
      }
      // 获取到属性ref为“content”的dom节点
      this.container = this.$refs.content
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas
      // 右侧控制面板
      const propertiesPanel = this.$refs.propertiesPanel
      // 按默认方式加载
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        // 添加控制板
        propertiesPanel: {
          parent: propertiesPanel
        },
        // 附加组件
        additionalModules: [
          // 中文化
          translateModule,
          // 右边工具栏以及节点
          propertiesProvider,
          // 控制面板
          propertiesPanelModule,
          // 自定义中央工具栏
          contextPadProvider,
          // 自定义左侧工具栏
          paletteProvider,
          // 自定义节点弹出中央任务栏
          replaceMenuProvider
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      })

      const that = this
      // 防抖下载
      const exportArtifacts = debounce(() => {
        that.saveSVG(function(err, svg) {
          that.setEncoded(that.$refs.downloadSvgLink, `${that.modelName}.svg`, err ? null : svg)
        })
        that.saveDiagram(function(err, xml) {
          that.setEncoded(that.$refs.downloadLink, `${that.modelName}.bpmn`, err ? null : xml)
        })
        // const commandStack = that.bpmnModeler.get('commandStack')
      }, 500)
      // 当图有发生改变触发事件绑定
      this.bpmnModeler.on('commandStack.changed', exportArtifacts)
      // 鼠标点击时触发事件绑定
      this.bpmnModeler.on('element.click', this.clickTaskHandler)
      this.createNewDiagram(this.bpmnModeler)
      this.loading = false

      // 浏览模式隐藏左侧工具栏
      if (this.isView) {
        document.getElementsByClassName('djs-palette')[0].style.display = 'none'
      }
    },
    methods: {
      // 页面初始化
      init() {
      },
      // 刷新页面
      refresh() {
      },
      // 上一步
      undoHandler() {
        const commandStack = this.bpmnModeler.get('commandStack')
        commandStack.canUndo()
      },
      // 下一步
      redoHandler() {
      },
      // 点击任务节点绑定
      clickTaskHandler(node) {
        // console.log(node)
        this.taskId = node.element.id
        this.taskType = node.element.type
        this.activeElement = node.element
        if (this.taskType === 'bpmn:CallActivity' &&
          document.getElementsByName('callableElementRef')[0] !== undefined
        ) {
          // 设置编号绑定为只读
          document.getElementsByName('callableElementRef')[0].setAttribute('readOnly', true)
          // 如果未绑定，则将input框标红
          if (document.getElementsByName('callableElementRef')[0].value === '可通过绑定子流程按钮进行操作') {
            document.getElementsByName('callableElementRef')[0].style.borderColor = 'red'
            document.getElementsByName('callableElementRef')[0].style.background = '#f0c2c2'
          }
        }
        this.taskName = document.getElementById('camunda-name').innerText
      },
      // 保存图片
      saveSVG(done) {
        this.bpmnModeler.saveSVG(done)
      },
      // 保存流程文件
      saveDiagram() {
        const that = this
        /* eslint-disable */
        this.bpmnModeler.saveXML({format: true}, function (err, xml) {
          that.xmlStr = xml
        })
        // 如果是点击按钮 -> 添加一些判定和notice
        if (this.isClick === true) {
          /*
            1.未绑定子流程的CallActivity给出提示
          */
          var strUnBound = ''
          var str = that.xmlStr
          // console.log(str)
          while (
            str.lastIndexOf('可通过绑定子流程按钮进行操作') > -1
            ) {
            // 获取 "可通过绑定子流程按钮进行操作" 在xmlStr中的末位置
            var indexCall = str.lastIndexOf('可通过绑定子流程按钮进行操作')
            str = str.slice(0, indexCall)
            // 获取name在该字符串中的末位置
            var indexName = str.lastIndexOf('name')
            // 分别截取对应字符串：name -> "可通过绑定子流程按钮进行操作"
            var str2 = str.slice(indexName, indexCall)
            // 最终获取 name="..." 引号里的字符串，并拼接
            str2 = str2.slice(6, -17)
            strUnBound += str2 + ','
          }
          strUnBound = strUnBound.slice(0, -1)
          // console.log(strUnBound)
          if (that.xmlStr.indexOf('可通过绑定子流程按钮进行操作') > -1) {
            this.$notify({
              title: '提示',
              message: strUnBound + '未绑定子流程，启动时请记得绑定，否则将影响启动',
              type: 'warning'
            })
          }
          /*
            2.未写表达式的SequenceFlow给出提示
          */
          var str3 = that.xmlStr
          const gateArray = []
          while (
            str3.lastIndexOf('exclusiveGateway') > -1
            ) {
            // 获取 "exclusiveGateway" 在xmlStr中的2个位置（1个标签）
            var indexGate = str3.lastIndexOf('exclusiveGateway')
            str3 = str3.slice(0, indexGate)
            gateArray.push(indexGate)
          }
          // 如果gateArray -> 即有exclusiveGateway -> 即有并发网关
          if (gateArray.length > 0) {
            // 初始化 outgoingNum & conditionNum & str4
            var outgoingNum = 0
            var conditionNum = 0
            var str4 = ''
            // 循环gateArray，每两个凑成1对exclusiveGateway标签
            for (var i = gateArray.length - 1; i >= 0; i = i - 2) {
              // 截取2个exclusiveGateway标签之间的内容
              str4 = that.xmlStr.slice(gateArray[i], gateArray[i - 1])
              // 根据内容获取outgoing的数量
              outgoingNum += (str4.split('outgoing').length - 1) / 2
              // 如果 outgoingNum > conditionNum，则有未填写表达式的线
            }
            // 获取 ${condition == "ok"} 和 ${condition == "ng"} 的数量
            conditionNum +=
              (that.xmlStr.split('${condition=="ok"}').length - 1) +
              (that.xmlStr.split('${condition=="ng"}').length - 1)
            // 如果 outgoingNum > conditionNum，则有未填写表达式的线
            if (outgoingNum > conditionNum) {
              this.$notify({
                title: '提示',
                message: '网关后的线未全部填写表达式，启动时请记得填写，否则将影响启动',
                type: 'warning',
                offset: 100
              })
            }
          }
        }
        // 重置isClick
        this.isClick = false
      },
      // 更新流程文件
      saveHandler() {
        if (this.isDeployed) {
          this.$confirm('流程已部署, 保存将删除已部署的流程及相关信息', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.updateModel()
          }).catch(_ => {
          })
        } else {
          this.updateModel()
        }
      },
      updateModel() {
        this.loading = true
        this.saveDiagram()
        const data = {
          id: this.modelId,
          name: this.modelName,
          version: this.version,
          bpmnXml: this.xmlStr,
          tenantId: this.tenantId
        }
        updateModel(data).then(() => {
          this.deploymentId = ''
        }).finally(() => {
          this.loading = false
        })
      },
      // 改变a锚点内容实现下载
      setEncoded(link, name, data) {
        if (!this.isView) {
          const encodedData = encodeURIComponent(data)
          if (data) {
            this.xmlStr = data
            link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
            link.download = name
          } else {
            this.$alert('下载失败')
            this.loading = false
          }
        }
      },
      // 读取上传文件
      uploadHandler() {
        const uploader = this.$refs.upload
        const files = uploader.files
        if (files.length > 0) {
          const reader = new FileReader()
          const that = this
          reader.readAsText(files[0], 'UTF-8')
          reader.onload = function (evt) {
            that.xmlStr = evt.target.result
            that.importXml(that)
            // console.debug(evt.target.result)
          }
        }
      },
      // 页面展开
      createNewDiagram() {
        this.loading = true
        // 获取流程模型
        getByModelId(this.modelId).then(result => {
          this.xmlStr = result.data.xml
          this.deploymentId = result.data.deploymentId
          this.importXml(this)
        }).finally(() => {
          this.loading = false
        })
      },
      // 读取xml
      importXml(that) {
        that.bpmnModeler.importXML(that.xmlStr, function (err) {
          if (err) {
            that.$alert('流程模型错误,无法打开')
          } else {
            // 流程图自适应画布
            const canvas = that.bpmnModeler.get('canvas')
            canvas.zoom('fit-viewport')
            // 获取流程模型名称
            const name = document.getElementById('camunda-name').innerText
            const version = document.getElementById('camunda-versionTag').value
            that.modelName = isEmpty(name) ? 'diagram' : name
            that.version = isEmpty(version) ? 1 : version * 1
            // 开启下载
            that.setEncoded(that.$refs.downloadSvgLink, `${name}.svg`, that.xmlStr)
            that.setEncoded(that.$refs.downloadLink, `${name}.bpmn`, that.xmlStr)
          }
        })
      },
      // 部署流程模型
      deployHandler() {
        this.loading = true
        deployByModelId(this.modelId).then(result => {
          if (result.data.status === 20000) {
            this.deploymentId = result.data.model.deploymentId
          }
        }).finally(() => {
          this.loading = false
        })
      },
      // 接收子组件事件 -> 调用1次 刷新&保存
      submit(data) {
        this.saveDiagram()
      },
      // 查看全景图
      zoomOut() {
        this.loading = true
        request({
          url: `process/model/front/permit/zoomOut/${this.modelId}`,
          method: 'get',
        }).then(result => {
          if (!isEmpty(result.data.message)) {
            this.$alert(result.data.message)
          } else {
            window.location.href = `#/process/modelId/${result.data.modelId}`
            window.location.reload()
          }
        }).catch(error => {
          console.error(error)
        }).finally(() => {
          this.loading = false
        })
      },
      // 查看近景图
      zoomIn() {
        if (this.taskType === 'bpmn:CallActivity') {
          this.loading = true
          request({
            url: `process/model/front/permit/zoomIn/${this.modelId}/${this.taskId}`,
            method: 'get',
          }).then(result => {
            this.loading = true
            window.location.href = `#/process/modelId/${result.data.modelId}`
            window.location.reload()
          }).catch(error => {
            console.error(error)
          }).finally(() => {
            this.loading = false
          })
        } else {
          this.$alert('请选择调用子流程类型环节,查看近景流程')
        }
      },
    }
  }
</script>

<style>
  /*左边工具栏以及编辑节点的样式*/
  @import 'bpmn-js/dist/assets/diagram-js.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
  /*右边工具栏样式*/
  @import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .bpmn-container /deep/ {
    .canvas {
      height: 800px !important;
    }
    .djs-context-pad {
      display: none !important;
    }
    .info {
      height: 200px;
      position: absolute;
      left:100px;
      top:50px;
    }
    .bjs-powered-by {
      display: none;
    }
    .el-button-group {
      height: 53px;

      a {
        height: 100%;
      }
    }

    .deploy-btn {
      margin-left: -1px;
    }

    .green {
      color: #30b08f;
    }

    .red {
      color: #c03639;
      font-size: 10px;
      margin-top: 4px;
      margin-bottom: 4px;
    }

    .blue {
      color: #1087ff;
    }
  }
</style>
