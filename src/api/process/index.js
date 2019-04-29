import {
  objectMerge,
  request
} from '@/utils'

// 获取全部流程模型-分页
export function selectModelListByPage(_this) {
  _this.tableDataLoading = true
  const params = objectMerge({
    pageSize: _this.tableData.pageSize,
    pageNum: _this.tableData.pageNum,
    sort: _this.tableData.sort,
    defaultSort: _this.defaultSort
  },
  _this.filterFormData)
  // console.debug(params)
  return request({
    url: '/process/selectModelListAll',
    method: 'get',
    params: params
  })
}

// 获取全部主流程列表-分页
export function selectModelListForMainByPage(_this) {
  _this.tableDataLoading = true
  const params = objectMerge({
    pageSize: _this.tableData.pageSize,
    pageNum: _this.tableData.pageNum,
    sort: _this.tableData.sort,
    defaultSort: _this.defaultSort
  },
  _this.filterFormData)
  // console.debug(params)
  return request({
    url: '/process/selectModelListForMain',
    method: 'get',
    params: params
  })
}

// 根据modelId获取模型
export function getByModelId(id) {
  return request({
    url: '/process/selectModelByModelId/' + id,
    method: 'get',
    id: id
  })
}

// 根据modelId获取模型定义信息
export function getModelDefineByModeId(modelId) {
  return request({
    url: `/process/actremodel/${modelId}`,
    method: 'get'
  })
}

// 根据taskId获取当前任务
export function getTaskById(taskId) {
  return request({
    url: `/process/task/${taskId}`,
    method: 'get'
  })
}

// 单行删除
export function deleteByCode(_this, data) {
  _this
    .$confirm('确定删除? (包含正在运行的所有流程)', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    .then(() => {
      _this.loading = true
      request({
        url: '/process/deleteProcessModel',
        method: 'delete',
        data
      }).then(() => {
        if (_this.hasOwnProperty('refreshTable')) _this.refreshTable()
      }).finally(() => {
        _this.loading = false
      })
    }).catch(() => {})
}

// 批量操作
export function batchExecute(_this) {
  if (_this.batchFilterData === '') {
    _this.$message({
      type: 'warning',
      message: '请选择批处理操作！'
    })
    return
  }
  if (_this.batchFilterData === 'delete') {
    _this
      .$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        const codes = []
        _this.multipleSelection.selection.forEach(row => {
          codes.push(row.id)
        })
        _this.loading = true
        return request({
          url: '/process/deleteProcessModel',
          method: 'delete',
          data: codes
        }).then(res => {
          if (_this.hasOwnProperty('refreshTable')) _this.refreshTable()
        }).finally(() => {
          _this.loading = false
        })
      })
  }
}

// 删除流程实例
export function delProcessInstance(_this, data) {
  return request({
    url: '/process/delProcessInstance',
    method: 'post',
    data
  })
}

// 新增模型（未部署）
export function insertProcessModel(data) {
  return request({
    message: '保存成功',
    url: '/process/model/insertNewModel',
    method: 'post',
    data
  })
}

// 新增/保存模型（已部署）
export function updateModel(data) {
  return request({
    message: '保存成功',
    url: '/process/model/updateModel',
    method: 'post',
    data
  })
}

// 根据业务key查询历史记录
export function selectHistoryByBusinessKey(businessKey) {
  return request({
    url: `/process/selectProcessHistoryByBusinessKey/${businessKey}`,
    method: 'get'
  })
}

// 根据流程实例id查询历史记录
export function selectHistoryByProcessInstanceId(processInstanceId) {
  return request({
    url: `/process/selectHistoryByProcessInstanceId/${processInstanceId}`,
    method: 'get'
  })
}

// 生成二维码
export function createQrcode(_this, data) {
  _this.loading = true
  return request({
    url: `/process/createQrcode`,
    method: 'post',
    data
  }).then(result => {
    // _this.refreshTable()
  }).finally(() => {
    // _this.loading = false
  })
}

// 更新流程实例对应参数
export function updateVariables(_this, data) {
  // _this.loading = true
  return request({
    url: `/process/updateVariables`,
    method: 'post',
    data
  }).then(result => {
    _this.refreshTable()
  }).finally(() => {
    _this.loading = false
  })
}

// 点击流程节点获取附加信息
export function selectBindingInfo(modelId, taskId) {
  return request({
    url: `/process/actnodesub/selectBindingInfo/${modelId}/${taskId}`,
    method: 'get'
  })
}

// 穿梭框保存节点用户权限
export function saveActNodeUser(modelId, taskId, userList) {
  const data = {
    modelId: modelId,
    nodeId: taskId,
    userNameList: userList
  }
  return request({
    url: `/process/actnodeuser/saveActNodeUser`,
    method: 'post',
    data: data
  })
}

// 穿梭框保存节点对应子流程
export function saveChildModelToModel(modelId, taskId, selectedChildProcess) {
  const data = {
    modelId: modelId,
    nodeId: taskId,
    childModelIdList: selectedChildProcess
  }
  return request({
    url: `/process/actremodel/saveChildModelToModel`,
    method: 'post',
    data: data
  })
}

// 部署流程模型
export function deployByModelId(modelId) {
  return request({
    url: `/process/deployByModelId/${modelId}`,
    method: 'get'
  })
}

// 保存节点对应团队
export function saveActNodeOrg(data) {
  return request({
    url: `/process/actnodeorg/saveActNodeOrg`,
    method: 'post',
    data
  })
}

// 保存节点对应工作组
export function saveActNodeJobs(data) {
  return request({
    url: `/process/actnodejobs/saveActNodeJobs`,
    method: 'post',
    data
  })
}

