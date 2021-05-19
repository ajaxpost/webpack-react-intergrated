import React from 'react'
import { InputNumber } from 'antd'
const CommonInputNumber = ({ value, onChange = null, width = 210 }) => {
  return <InputNumber value={value} onChange={onChange} style={{ width }} />
}

export default CommonInputNumber
