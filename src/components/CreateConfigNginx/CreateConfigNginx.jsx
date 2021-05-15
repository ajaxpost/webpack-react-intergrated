import React from 'react'
import { FormConfig, layout } from './config'
import { Form, Input, Button } from 'antd'
import _ from 'lodash'

const Components = {
  Input,
}
const onFinish = (values) => {
  console.log(values)
}
const CreateConfigNginx = () => {
  return (
    <Form name="CreateAddClusters" {...layout} onFinish={onFinish}>
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