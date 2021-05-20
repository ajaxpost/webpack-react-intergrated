import CommonFetch from '@/common/CommonFetch'

function request(url, method, body) {
  return CommonFetch[method](url, body)
}

// 获取所有集群节点信息
export const getAllNodeConfig = () =>
  request('http://119.3.177.131:8081/cluster/getAllNodeConfig.wh', 'post')

// 获取指定集群节点信息
export const getNodeConfig = (body) =>
  request('http://119.3.177.131:8081/cluster/getNodeConfig.wh', 'post', body)

// 获取所有节点状态
export const getNodeStatus = () =>
  request('http://119.3.177.131:8081/cluster/getNodeStatus.wh', 'post')

// 启动指定集群节点
export const startNodeConfig = (body) =>
  request('http://119.3.177.131:8081/cluster/startNodeConfig.wh', 'post', body)

// 停止指定集群节点
export const stopNodeConfig = (body) =>
  request('http://119.3.177.131:8081/cluster/stopNodeConfig.wh', 'post', body)

// 删除指定集群节点
export const delNodeConfig = (body) =>
  request('http://119.3.177.131:8081/cluster/delNodeConfig.wh', 'post', body)

// 添加集群节点
export const addNodeConfig = (body) =>
  request('http://119.3.177.131:8081/cluster/addNodeConfig.wh', 'post', body)

// 保存nginx配置
export const saveNginxConfig = (body) =>
  request('http://119.3.177.131:8081/cluster/saveNginxConfig.wh', 'post', body)

// 获取nginx配置
export const getNginxConfig = (body) =>
  request('http://119.3.177.131:8081/cluster/getNginxConfig.wh', 'post', body)

// 停止nginx服务
export const stopNginxServer = () =>
  request('http://119.3.177.131:8081/cluster/stopNginxService.wh', 'post')

// 启动nginx服务
export const startNginxServer = () =>
  request('http://119.3.177.131:8081/cluster/startNginxService.wh', 'post')

// 重启nginx服务
export const restartNginxServer = () =>
  request('http://119.3.177.131:8081/cluster/restartNginxService.wh', 'post')
