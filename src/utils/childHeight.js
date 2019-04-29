'use strict'
// 计算初始展开时，每一个主项需要的marginBottim值
export default function childHeight(arr) {
  for (var j in arr) {
    // 如果最外层有childHeight项（有子集）
    if (arr[j].childHeight !== undefined) {
      for (var i in arr[j].children) {
        var obj = arr[j][i]
        // 如果第二层有childHeight项（有子集）
        if (arr[j][i].childHeight !== undefined) {
          arr[j].childHeight += arr[j][i].childHeight
          // 如果还有子集，递归方法
          // if (Array.isArray(arr[j][i].children)) {
          //   childHeight(arr[j][i].children)
          // }
        }
      }
    }
  }
  return arr
}
