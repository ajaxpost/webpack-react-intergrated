import React, { useEffect, useState } from 'react'
import { FormConfig, layout, initialValues } from './config'
import { Form, Input, Button, message, Spin } from 'antd'
import _ from 'lodash'
import { getNodeConfig, addNodeConfig } from '@/server/index'
import CommonInputNumber from '@/common/CommonInputNumber'

const Components = {
  Input,
  InputNumber: CommonInputNumber,
}

const CreateAddClusters = ({
  componentProps: { addText, setAnew, setAddr },
  onCancel,
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (addText) {
      setLoading(true)
      getNodeConfig({ name: addText }).then((ret) => {
        if (ret.code === 0) {
          form.setFieldsValue(ret.data)
        }
        setLoading(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onFinish = (values) => {
    setLoading(true)
    setAddr(values.addr)
    addNodeConfig(values).then((ret) => {
      if (ret.code === 0) {
        message.success(ret.message || '成功')
        setAnew([])
      }
      setLoading(false)
      onCancel()
    })
  }
  return (
    <Form
      name="CreateAddClusters"
      initialValues={{ ...initialValues }}
      form={form}
      {...layout}
      onFinish={onFinish}
    >
      <Spin spinning={loading}>
        {_.map(FormConfig, (item, key) => {
          const Component = item.component ? Components[item.component] : ''
          return (
            <div key={key}>
              <Form.Item
                name={item.name}
                label={item.label}
                rules={item.rules}
                {...item.props}
              >
                <Component
                  placeholder={item.placeholder}
                  {...item.componentProps}
                />
              </Form.Item>
            </div>
          )
        })}
      </Spin>
      {addText ? (
        ''
      ) : (
        <Form.Item>
          <Button htmlType="submit" type="primary">
            部署
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}

export default CreateAddClusters
