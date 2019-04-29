<template>
  <div>
    <div class="tinymce-gallery"
         style="position:relative">
      <textarea :id="id"
                :value="value"></textarea>
      <vue-dialog :visible="visible"
                  :title='"图片库"'
                  :type='type'
                  v-model="value"
                  :width='"80%"'
                  @closeHandler="visible=false"
                  @confirmHandler="confirmHandler"></vue-dialog>
      <el-dialog title="MarkDown 语法"
                 :visible.sync="dialogVisible"
                 width="60%">
        <img class="markdown"
             src="../../static/markdown.jpg">
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="Html Test"
                 :visible.sync="dialogVisible2"
                 width="80%">
        <span id="html-test"></span>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="dialogVisible2 = false">确 定</el-button>
        </span>
      </el-dialog>
      <div style="position:absolute;top:2px;right:5px">
        <el-button class="tinymce-gallery-button markdown-button"
                   type="primary"
                   circle
                   @click='dialogVisible=true'>?
          <!-- icon="el-icon-question" -->
        </el-button>
        <el-button class="tinymce-gallery-button"
                   type=""
                   @click='dialogVisible2=true;toHtml()'>MarkDown预览
        </el-button>
        <el-button class="tinymce-gallery-button"
                   type=""
                   @click='visible=true'>图片库
        </el-button>
        <el-button class="tinymce-gallery-button"
                   type=""
                   @click="clickHandler">清空
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
// Import TinyMCE
import tinymce from 'tinymce/tinymce'
import VueDialog from './VueDialog'
// A theme is also required
import 'tinymce/themes/modern/theme'

// Any plugins you want to use has to be imported
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/media'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/print'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/bbcode'
import 'tinymce/plugins/code'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/help'
import 'tinymce/plugins/image'
import 'tinymce/plugins/importcss'
import 'tinymce/plugins/legacyoutput'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/save'
import 'tinymce/plugins/spellchecker'
import 'tinymce/plugins/table'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/toc'
import 'tinymce/plugins/visualchars'

import 'tinymce/skins/lightgray/skin.min.css'

// Import showdown
import showdown from 'showdown'

export default {
  name: 'TinymceMarkdown',
  components: { VueDialog },
  props: {
    tinyOpt: {
      Object,
      default: function() {
        return { height: 400 }
      }
    },
    id: {
      type: String,
      required: false,
      default: 'tinymce'
    },
    value: { default: '' },
    htmlClass: { default: '', type: String },
    plugins: {
      default: function() {
        return []
      },
      type: Array
    },
    other_options: {
      default: function() {
        return {}
      },
      type: Object
    },
    readonly: { default: false, type: Boolean },
    type: {
      String,
      default: ''
    }
  },
  data() {
    return {
      // 显示选择库弹窗
      visible: false,
      content: '',
      editor: null,
      cTinyMce: null,
      checkerTimeout: null,
      isTyping: false,
      dialogVisible: false,
      dialogVisible2: false,
      markDownValue: ''
    }
  },
  mounted() {
    this.content = this.value
    this.init()
  },
  beforeDestroy() {
    try {
      this.editor.destroy()
    } catch (e) {
      console.error(e)
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    },
    value: function(newValue) {
      if (!this.isTyping) {
        this.content = newValue
        try {
          if (this.hasOwnProperty('editor')) this.editor.setContent(this.content)
        } catch (e) {
          console.error(e)
        }
      }
    },
    readonly(value) {
      if (value) {
        this.editor.setMode('readonly')
      } else {
        this.editor.setMode('design')
      }
    }
  },
  methods: {
    init() {
      const options = {
        selector: '#' + this.id,
        skin: false,
        toolbar1: this.toolbar1,
        toolbar2: this.toolbar2,
        plugins: this.plugins,
        init_instance_callback: this.initEditor,
        height: 350,
        language_url:
          document.location.protocol +
          '//' +
          window.location.host +
          '/static/langs/zh_CN.js',
        // menubar: false,  // 去掉顶部菜单
        branding: false, // 是否显示POWERED BY TINYMCE
        theme: 'modern',
        toolbar_items_size: 'small', // 按钮大小
        // 插件
        plugins: [
          'advlist autolink link image lists charmap print hr anchor pagebreak',
          'searchreplace visualblocks visualchars code fullscreen media nonbreaking',
          'table directionality emoticons textcolor paste textcolor colorpicker'
        ],
        branding: false,
        style_formats: [
          { title: 'Bold', icon: 'bold', format: 'bold' },
          { title: 'Italic', icon: 'italic', format: 'italic' },
          { title: 'Underline', icon: 'underline', format: 'underline' },
          {
            title: 'Strikethrough',
            icon: 'strikethrough',
            format: 'strikethrough'
          },
          { title: 'Superscript', icon: 'superscript', format: 'superscript' },
          { title: 'Subscript', icon: 'subscript', format: 'subscript' },
          { title: 'Code', icon: 'code', format: 'code' }
        ],
        block_formats:
          'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;',
        toolbar1:
          'insertfile undo redo | formatselect | bullist numlist | link unlink | uploadimg image media | fullscreen',
        toolbar2:
          'styleselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat'
      }
      tinymce.init(this.concatAssciativeArrays(options, this.other_options))
    },
    initEditor(editor) {
      this.editor = editor
      editor.setContent(this.content)
      editor.on('KeyUp', e => {
        this.submitNewContent('keyup')
      })
      editor.on('Change', e => {
        if (this.editor.getContent() !== this.value) {
          this.submitNewContent('keyup')
        }
      })
      editor.on('init', e => {
        editor.setContent(this.content)
        this.$emit('input', this.content)
      })
      if (this.readonly) {
        this.editor.setMode('readonly')
      } else {
        this.editor.setMode('design')
      }

      this.$emit('editorInit', editor)
    },
    concatAssciativeArrays(array1, array2) {
      if (array2.length === 0) return array1
      if (array1.length === 0) return array2
      const dest = []
      for (const key in array1) dest[key] = array1[key]
      for (const key in array2) dest[key] = array2[key]
      return dest
    },
    submitNewContent(eventType) {
      this.isTyping = true
      if (this.checkerTimeout !== null) clearTimeout(this.checkerTimeout)
      this.checkerTimeout = setTimeout(() => {
        this.isTyping = false
        this.$emit(eventType, this.editor.getContent())
        // this.content = this.editor.getContent()
        // console.debug(eventType)
        // console.debug(this.content)
      }, 300)
    },
    clickHandler() {
      // 清空富文本
      tinymce.activeEditor.setContent('')
      this.submitNewContent('keyup')
    },
    confirmHandler(params) {
      // 确认按钮回调
      this.visible = false
      let picSelectedList = ''
      for (const i in params.galleryList) {
        picSelectedList += '<img src=' + params.galleryList[i] + '>'
      }
      tinymce.execCommand('mceInsertContent', false, picSelectedList)
      this.submitNewContent('keyup')
    },
    toHtml() {
      // markdown -> html
      this.$nextTick(() => {
        var MarkdownContent = tinyMCE.activeEditor.getContent()
        // 去掉标签
        var transMessageContent = MarkdownContent.replace(/<\/?.+?>/g, '')
        var afterMessageContent = transMessageContent.replace(/ /g, '')
        // console.log(afterMessageContent)
        // 转化成html
        const converter = new showdown.Converter()
        // console.log(converter.makeHtml(afterMessageContent))
        document.getElementById('html-test').innerHTML = converter.makeHtml(
          afterMessageContent
        )
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-dialog__wrapper /deep/ {
  .el-dialog__body {
    padding: 10px 0 0 0;
  }
  .markdown {
    width: 100%;
  }
  #html-test {
    padding: 0 20px;
    display: inline-block;
    min-width: 100%;
    max-width: 100%;
    min-height: 400px;
    max-height: 600px;
    resize: none;
    border: 0;
  }
}
.tinymce-gallery-button /deep/ {
  position: relative;
  height: 25px;
  margin-left: 0;
  padding: 5px 15px;
  span {
    display: inline-block;
    margin: auto;
  }
}
.markdown-button /deep/ {
  padding: 5px 8px;
}
</style>
