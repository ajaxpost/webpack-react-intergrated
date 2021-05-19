import React, { useEffect } from 'react'
import { FormConfig, layout } from './config'
import { Form, Input, Button } from 'antd'
import _ from 'lodash'
import { saveNginxConfig, getNginxConfig } from '@/server/index'
import CommonInputNumber from '@/common/CommonInputNumber'

const Components = {
  Input,
  InputNumber: CommonInputNumber,
}
const CreateConfigNginx = ({ onCancel }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    getNginxConfig().then((ret) => {
      if (ret.code === 0) {
        form.setFieldsValue(ret.data)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onFinish = (values) => {
    console.log(values)
    saveNginxConfig(values).then((ret) => {
      console.log(ret)
      onCancel()
    })
  }
  return (
    <Form name="CreateAddClusters" form={form} {...layout} onFinish={onFinish}>
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
                id={item.id}
                placeholder={item.placeholder}
                {...item.componentProps}
              />
            </Form.Item>
          </div>
        )
      })}
      <Form.Item>
        <Button htmlType="submit" type="primary">
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateConfigNginx
