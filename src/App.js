import React, { useState, useCallback, useEffect } from 'react'
import { tableConfig, actions, initialValues, operationRender } from './config'
import CommonTable from '@/common/CommonTable'
import _ from 'lodash'
import CommonModal from '@/common/CommonModal'
import CreateAddClusters from '@/components/CreateAddClusters/CreateAddClusters'
import CreateConfigNginx from '@/components/CreateConfigNginx/CreateConfigNginx'
import { message, Space, Tooltip } from 'antd'
import {
  getAllNodeConfig,
  getNodeStatus,
  startNodeConfig,
  stopNodeConfig,
  delNodeConfig,
  stopNginxServer,
  startNginxServer,
  restartNginxServer,
} from '@/server/index.js'

const Components = {
  CreateAddClusters,
  CreateConfigNginx,
}

const App = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [title, setTitle] = useState('添加集群节点')
  const [componentId, setComponentId] = useState('CreateAddClusters')
  const [addText, setAddText] = useState('')
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    getAllNodeConfig().then((ret) => {
      if (ret.code === 0) {
        getNodeStatus().then((res) => {
          setDataSource(
            _.map(Object.keys(ret.data), (item, key) => {
              const obj = ret.data[item]
              return {
                addr: obj.addr,
                insPath: obj.insPath,
                jdkPath: obj.jdkPath,
                password: obj.password,
                port: obj.port,
                username: obj.username,
                id: key,
                status: res.data[obj.addr] || '运行中',
              }
            })
          )
        })
      }
    })
  }, [])

  const handlerAddClusters = (title, componentId) => {
    setModalVisible(true)
    setTitle(title)
    setComponentId(componentId)
  }
  const handlerConfigNginx = (title, componentId) => {
    setModalVisible(true)
    setTitle(title)
    setComponentId(componentId)
  }

  const handleCancel = useCallback(() => {
    setModalVisible(false)
    setAddText(null)
  }, [])
  const AddCustomHeader = (text) => {
    setModalVisible(true)
    setTitle('编辑集群节点')
    setComponentId('CreateAddClusters')
    setAddText(text)
  }
  const nameColumns = (text) => {
    return (
      <Tooltip trigger="hover" placement="topLeft" title={text}>
        <div className="click-column" onClick={() => AddCustomHeader(text)}>
          {text}
        </div>
      </Tooltip>
    )
  }
  const actionsOnClick = {
    addClusters: () => handlerAddClusters('添加集群节点', 'CreateAddClusters'),
    configNginx: () => handlerConfigNginx('Nginx配置', 'CreateConfigNginx'),
  }
  const handlerStart = (name) => {
    startNodeConfig({ name }).then((ret) => {
      if (ret.code === 0) {
        message.success('启动成功')
      }
    })
  }
  const handlerStop = (name) => {
    stopNodeConfig({ name }).then((ret) => {
      if (ret.code === 0) {
        message.success('启动成功')
      }
    })
  }
  const handlerDelte = (name) => {
    delNodeConfig({ name }).then((ret) => {
      if (ret.code === 0) {
        message.success('启动成功')
      }
    })
  }

  const operationOnClick = {
    start: (name) => handlerStart(name),
    stop: (name) => handlerStop(name),
    del: (name) => handlerDelte(name),
  }

  const operation = _.map(operationRender, (item, key) => {
    const obj = { ...item }
    obj.onClick = operationOnClick[item.id]
    return obj
  })

  const tableProps = {
    columns: _.map(tableConfig, (item, key) => {
      const obj = { ...item }
      switch (item.dataIndex) {
        case 'operation':
          obj.render = (text, record) => {
            return (
              <Space>
                {_.map(operation, (item, key) => {
                  return (
                    <div
                      onClick={() => item.onClick(record.addr)}
                      key={item.id}
                    >
                      <Tooltip title={item.title}>
                        <div className={item.className}></div>
                      </Tooltip>
                    </div>
                  )
                })}
              </Space>
            )
          }
          break

        case 'addr':
          obj.render = (text, record, index) => nameColumns(text)
          break
        default:
          break
      }
      return obj
    }),
    dataSource,
    rowKey: 'id',
    loading: false,
    actions: _.map(actions, (item, key) => {
      if (!item.isButton) {
        return { ...item }
      }
      const obj = { ...item }
      obj.onClick = actionsOnClick[item.id]
      return obj
    }),
    className: 'wh-table-button',
    initialValues,
    onFinish: (values) => {
      console.log(values)
      switch (values.status) {
        case 'stop':
          stopNginxServer().then((ret) => {
            if (ret.code === 0) {
              message.success(ret.message)
            }
          })
          break
        case 'start':
          startNginxServer().then((ret) => {
            if (ret.code === 0) {
              message.success(ret.message)
            }
          })
          break
        case 'restart':
          restartNginxServer().then((ret) => {
            if (ret.code === 0) {
              message.success(ret.message)
            }
          })
          break
        default:
          break
      }
    },
  }

  return (
    <>
      <CommonTable {...tableProps} />
      <CommonModal
        visible={modalVisible}
        title={title}
        footer={false}
        onCancel={handleCancel}
        component={Components[componentId]}
        width="50%"
        modalCompProps={{
          onCancel: handleCancel,
          addText,
        }}
      />
    </>
  )
}

export default App
