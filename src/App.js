import React, { useState, useCallback } from 'react'
import { tableConfig, actions, initialValues } from './config'
import CommonTable from '@/common/CommonTable'
import _ from 'lodash'
import CommonModal from '@/common/CommonModal'
import CreateAddClusters from '@/components/CreateAddClusters/CreateAddClusters'
import CreateConfigNginx from '@/components/CreateConfigNginx/CreateConfigNginx'
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
  const handlerStart = () => {
    alert('start')
  }

  const handleCancel = useCallback(() => {
    setModalVisible(false)
  }, [])

  const actionsOnClick = {
    addClusters: () => handlerAddClusters('添加集群节点', 'CreateAddClusters'),
    configNginx: () => handlerConfigNginx('Nginx配置', 'CreateConfigNginx'),
    start: () => handlerStart(),
  }
  const tableProps = {
    columns: tableConfig,
    dataSource: [],
    loading: false,
    actions: _.map(actions, (item, key) => {
      if (!item.isButton) {
        return { ...item }
      }
      const obj = { ...item }

      obj.onClick = actionsOnClick[item.id]

      return obj
    }),
    onFinish: (value) => {
      console.log(value)
    },
    initialValues,
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
