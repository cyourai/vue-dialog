/**
 */
'use strict'
import Vue from 'vue'
export default function treeToArray(data, parent = null, level = null, total = null, nodeStatus = null) {
  let tmp = []
  Array.from(data).forEach(function(record) {
    // 添加_expanded项，默认为false
    if (record.isExpanded === undefined) {
      Vue.set(record, 'isExpanded', true)
    }

    // 添加show项，默认为true
    if (record.show === undefined) {
      Vue.set(record, 'show', true)
    }

    // 添加_level项，即第几层级
    let _level = 0
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)

    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }

    // 子集总个数
    let _total = 0
    if (record.processShowList && record.processShowList.length > 0) {
      _total = _total + record.processShowList.length
    }
    Vue.set(record, '_total', _total)

    // 子集nodeStatus
    let _nodeStatus = record.nodeStatus
    if (nodeStatus !== undefined && nodeStatus !== null) {
      switch (nodeStatus) {
        case '0':
          _nodeStatus = '0'
          break
        case '1':
          _nodeStatus = '3'
          break
        case '2':
          _nodeStatus = '2'
          break
        default:
          _nodeStatus = '3'
      }
    }
    Vue.set(record, '_nodeStatus', _nodeStatus)

    tmp.push(record)

    // 如果有子元素，则再次执行treeToArray()方法，即在项里加入子元素
    if (record.processShowList && record.processShowList.length > 0) {
      const processShowList = treeToArray(record.processShowList, record, _level, _total, _nodeStatus)
      tmp = tmp.concat(processShowList)
    }
  })
  return tmp
}
