import React, { memo } from 'react'
import { Table, Space, Button, Form } from 'antd'
import _ from 'lodash'
import CommonSelect from '@/common/CommonSelect'

const CommonTable = ({
  columns,
  dataSource,
  showHeader = true,
  loading,
  actions,
  onFinish,
  initialValues,
}) => {
  const Components = {
    Select: CommonSelect,
  }
  const tableProps = {
    columns,
    dataSource,
    loading,
    showHeader,
  }

  return (
    <>
      <div className="CommonTable">
        <Form
          name="CommonTable"
          onFinish={onFinish}
          initialValues={{ ...initialValues }}
        >
          <Space size="large">
            {_.map(actions, (item, key) => {
              if (item.isButton) {
                return (
                  <Button key={key} type={item.type} onClick={item.onClick}>
                    {item.title}
                  </Button>
                )
              } else if (item.isFormItem) {
                const Component = item.component
                  ? Components[item.component]
                  : ''
                if (item.id === 'submit') {
                  return (
                    <div key={item.id} className="commonTable-form-item">
                      <Form.Item>
                        <Button htmlType="submit" type="primary">
                          {item.title}
                        </Button>
                      </Form.Item>
                    </div>
                  )
                }
                return (
                  <div key={item.id} className="commonTable-form-item">
                    <Form.Item
                      name={item.name}
                      label={item.label}
                      rules={item.rules}
                      {...item.props}
                    >
                      <Component {...item.componentProps} />
                    </Form.Item>
                  </div>
                )
              }
            })}
          </Space>
        </Form>
      </div>

      <Table {...tableProps} />
    </>
  )
}

export default memo(CommonTable)
