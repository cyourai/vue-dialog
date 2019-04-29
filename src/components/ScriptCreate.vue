<!--
  *改变主题需要同时设置：
    1、editorOption.theme 的值
    2、.cm-s-[name] (name即theme值)
 -->

<template>
  <!-- 编辑器 -->
  <div class="table-content-spe"
       style="max-height:1000px;overflow:auto">
    <codemirror :value="codeMirror"
                :options="editorOption"
                ref="myEditor"
                @change="codeChange"
                v-loading="loading">
    </codemirror>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'
import Bus from '@/utils/bus.js'

// language
import 'codemirror/mode/python/python.js'
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/vue/vue')

// theme css
// import 'codemirror/addon/lint/lint.css'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/base16-dark.css'
// import 'codemirror/theme/base16-light.css'
// import 'codemirror/theme/rubyblue.css'
// import 'codemirror/theme/erlang-dark.css'
// import 'codemirror/theme/monokai.css'
// import 'codemirror/theme/Cobalt.css'
// import 'codemirror/theme/Mbo.css'
// import 'codemirror/theme/Lesser-Dark.css'
// import 'codemirror/theme/blackboard.css'
// import 'codemirror/theme/Solarized.css'

// closebrackets
import 'codemirror/addon/edit/closebrackets.js'

// require('script-loader!jsonlint')
require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/show-hint.css')
require('codemirror/addon/hint/javascript-hint.js')

export default {
  name: 'codeMirror',
  components: {
    codemirror
  },
  data() {
    return {
      codeMirror: ``,
      editorOption: {
        mode: 'application/json',
        theme: 'rubyblue',
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
        autoCloseBrackets: true,
        autofocus: true,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        lineWrapping: 'wrap',
        cursorHeight: 0.85,
        scrollbarStyle: null
      },
      radio: 'Json',
      loading: false
    }
  },
  computed: {
    editor() {
      // get current editor object
      return this.$refs.myEditor.editor
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // this.loading = true
      this.$nextTick(() => {
        Bus.$on('editPreview', data => {
          var str = ''
          for (var i in data) {
            str += data[i] + '\n'
          }
          str = str.substring(0, str.length - 1)
          this.codeMirror = str

          this.loading = false
        })
      })
    },
    isEdit() {
      return typeof this.codeMirror !== 'undefined'
    },
    codeChange() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// @import '~@/styles/smart-ui/smart-ui.scss';
.vue-codemirror-wrap /deep/ {
  height: 100%;
  position: relative;
  .CodeMirror {
    height: auto;
    min-height: 300px;
  }
  .CodeMirror-scroll {
    min-height: 300px;
  }
  .cm-s-rubyblue span.cm-string {
    color: #f08047;
  }
}

.CodeMirror {
  border: 1px solid #eee;
  height: auto;
  &-scroll {
    height: auto;
    overflow-y: hidden;
    overflow-x: auto;
  }
}

// 滚动条样式
.table-content-spe::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.table-content-spe::-webkit-scrollbar-thumb {
  background-color: rgba(64, 158, 255, 0.5);
  outline: 1px solid slategrey;
  border-radius: 5px;
}
.table-content-spe::-webkit-scrollbar {
  width: 10px;
}
</style>

