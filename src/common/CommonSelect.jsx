import React from 'react'
import { Select } from 'antd'
import _ from 'lodash'
const { Option } = Select

const CommonSelect = ({ options, className, value, onChange = null }) => {
  return (
    <Select value={value} onChange={onChange} className={className}>
      {_.map(options, (item, key) => {
        return (
          <Option key={key} value={item.value}>
            {item.label}
          </Option>
        )
      })}
    </Select>
  )
}

export default CommonSelect
