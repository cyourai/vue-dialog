/**
 * 对数组进行格式转换，以便前端tree能够接收
 */
'use strict'
import Vue from 'vue'
const _level = 0
export default function treeToArray(data) {
  const tmp = []

  Array.from(data).forEach(function(record, parent = null, total = null, level = null, nodeStatus = null) {
    let childHeight = 0

    // 添加_expanded项，默认为true
    if (record.isExpanded === undefined) {
      Vue.set(record, 'isExpanded', true)
    }

    // 添加show项，默认为true
    if (record.show === undefined) {
      Vue.set(record, 'show', true)
    }

    // 添加_level项，即第几层级
    const _level = 0
    if (level !== undefined && level !== null) {
      // _level = level + 1
    }
    Vue.set(record, '_level', _level)

    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }

    // 子集高度
    Vue.set(record, 'childHeight', childHeight)

    // 子集总个数
    let _total = 0

    // 子集nodeStatus
    const _nodeStatus = 0
    if (nodeStatus !== undefined && nodeStatus !== null) {
      Vue.set(record, '_nodeStatus', '1')
    }
    // Vue.set(record, 'nodeStatus', '1')

    // 最外层数据转化完成
    tmp.push(record)

    // 如有子元素 -> 再次执行treeToArray()方法 -> 在项里加入子元素
    if (record.children && record.children.length > 0) {
      // total赋值
      _total = _total + record.children.length
      // childHeight赋值
      childHeight += record.children.length * (42 + 10) + 12
      Vue.set(record, 'childHeight', childHeight)
      // nodeStatus赋值
      switch (record.nodeStatus) {
        case '0':
          // record.children.nodeStatus === '0'
          break
        case '1':
          // record.children.nodeStatus === '0'
          break
        case '2':
          // record.children.nodeStatus === '2'
          break
      }

      // 再次执行treeToArray
      record.children = treeToArray(record.children, record, _total, _level + 1, _nodeStatus)
    }

    Vue.set(record, '_total', _total)
  })
  return tmp
}
