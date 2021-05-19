import CommonFetch from '@/common/CommonFetch'

function request(url, method, body) {
  return CommonFetch[method](url, body)
}

// 获取所有集群节点信息
export const getAllNodeConfig = () =>
  request('/cluster/getAllNodeConfig.wh', 'post')

// 获取指定集群节点信息
export const getNodeConfig = (body) =>
  request('/cluster/getNodeConfig.wh', 'post', body)

// 获取所有节点状态
export const getNodeStatus = () => request('/cluster/getNodeStatus.wh', 'post')

// 启动指定集群节点
export const startNodeConfig = (body) =>
  request('/cluster/startNodeConfig.wh', 'post', body)

// 停止指定集群节点
export const stopNodeConfig = (body) =>
  request('/cluster/stopNodeConfig.wh', 'post', body)

// 删除指定集群节点
export const delNodeConfig = (body) =>
  request('/cluster/delNodeConfig.wh', 'post', body)

// 添加集群节点
export const addNodeConfig = (body) =>
  request('/cluster/addNodeConfig.wh', 'post', body)

// 保存nginx配置
export const saveNginxConfig = (body) =>
  request('cluster/saveNginxConfig.wh', 'post', body)

// 获取nginx配置
export const getNginxConfig = (body) =>
  request('/cluster/getNginxConfig.wh', 'post', body)

// 停止nginx服务
export const stopNginxServer = () =>
  request('/cluster/stopNginxServer.wh', 'post')

// 启动nginx服务
export const startNginxServer = () =>
  request('/cluster/startNginxServer.wh', 'post')

// 重启nginx服务
export const restartNginxServer = () =>
  request('/cluster/restartNginxServer.wh', 'post')
