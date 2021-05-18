import React, { useState, useCallback } from 'react'
import { tableConfig, actions } from './config'
import CommonTable from '@/common/CommonTable'
import _ from 'lodash'
import CommonModal from '@/common/CommonModal'
import CreateAddClusters from '@/components/CreateAddClusters/CreateAddClusters'
import CreateConfigNginx from '@/components/CreateConfigNginx/CreateConfigNginx'
import { Button, Space, Tooltip } from 'antd'

const Components = {
  CreateAddClusters,
  CreateConfigNginx,
}

const App = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [title, setTitle] = useState('添加集群节点')
  const [componentId, setComponentId] = useState('CreateAddClusters')
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
  }, [])
  const AddCustomHeader = (text) => {
    setModalVisible(true)
    setComponentId('CreateAddClusters')
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
  const handlerStart = (record) => {
    console.log(record)
  }
  const handlerStop = (record) => {
    console.log(record)
  }
  const handlerDelte = (record) => {
    console.log(record)
  }
  const tableProps = {
    columns: _.map(tableConfig, (item, key) => {
      const obj = { ...item }
      switch (item.dataIndex) {
        case 'operation':
          obj.render = (text, record) => {
            return (
              <Space>
                <Button onClick={() => handlerStart(record)}>启动</Button>
                <Button onClick={() => handlerStop(record)}>停止</Button>
                <Button onClick={() => handlerDelte(record)}>删除</Button>
              </Space>
            )
          }
          break
        case 'serial':
          obj.render = (text, record, index) => {
            return <span>{index}</span>
          }
          break
        case 'IP':
          obj.render = (text, record, index) => nameColumns(text)
          break
        default:
          break
      }
      return obj
    }),
    dataSource: [{ id: 1, IP: 123 }],
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
        }}
      />
    </>
  )
}

export default App
