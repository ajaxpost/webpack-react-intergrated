import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import '@/style/index.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

ReactDOM.render(
  <ConfigProvider prefixCls="wh" locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('wh')
)
