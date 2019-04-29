'use strict'

// 计算初始展开时需要的marginBottim值
export default function processToggle(data) {
  let marginBottom = 0
  for (var i in data) {
    if (data[i].childHeight) {
      marginBottom += data[i].childHeight
      if (data[i].children) {
        marginBottom += processToggle(data[i].children)
      }
    }
  }
  return marginBottom
}
