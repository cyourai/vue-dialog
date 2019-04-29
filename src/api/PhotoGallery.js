import {
  request
} from '@/utils/request'
import axios from 'axios'
import {
  objectMerge
} from '@/utils/index'
// 图片库（收藏）分页查询

export function selectPhotoByPage(object, filter) {
  const params = objectMerge({
    pageSize: object.pageSize,
    pageNum: object.pageNum,
    // defaultSort: "[{'prop':'uploadId', 'order':'des' }]", // 默认按上传时间逆序排序
    // uploadStatus: '1', // 后端未删除状态的图片，
    uploadName: object.picSearch // 上传文件标题检索

  }, object.filterFormData)
  return request({
    url: '/general/upload/page/' + filter,
    method: 'get',
    params
  })
}
// 图片库新增收藏

export function insertFavoritePhoto(data) {
  return request({
    url: '/general/uploaduser/insertUploadUser',
    method: 'post',
    data
  })
}
// 图片库删除收藏

export function deleteFavoritePhoto(code) {
  return request({
    url: '/general/uploaduser/deleteUploadUser/' + code,
    method: 'delete'
  })
}
// 删除单张图片

export function deletePhotoByCode(code, object) {
  object

    .$confirm('确定删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    .then(() => {
      return request({
        url: '/general/upload/deleteUpload/' + code,
        method: 'delete'
      }).then(res => {
        object.selectListByType()
      })
    })
    .catch(error => {})
}
// 删除多张图片

export function deletePhotoByCodeArray(codeArray, object) {
  object

    .$confirm('确定删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    .then(() => {
      return request({
        url: '/general/upload/deleteUploads/' + codeArray,
        method: 'delete'
      }).then(res => {
        object.selectListByType()
      })
    })
    .catch(error => {})
}
// 更新图片名称

export function updatePhoto(data) {
  return request({
    url: '/general/upload',
    method: 'put',
    data
  })
}
// 图片上传

export function uploadByType(data, type) {
  // 后面地址为测试地址
  // const baseURL = typeof process.env.BASE_API === 'undefined' ? process.env.BASE_API : 'http://192.168.7.194:8888'

  let uploadType = 'picture'
  if (type === 'PhotoGallery') {
    uploadType = 'picture'
  }
  return request({ // 对应上传中文名问题
    baseURL: process.env.BASE_API + process.env.ZUUL + process.env.PREFIX,
    url: '/general/upload/insertUpload/' + uploadType,
    method: 'post',
    data,
    headers: {
      'ContentType': 'multipart/formdata'
    }
  })
}
