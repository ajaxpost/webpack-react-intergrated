export const tableConfig = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'IP地址',
    dataIndex: 'addr',
    key: 'addr',
  },
  // {
  //   title: '主机用户名',
  //   dataIndex: 'username',
  //   key: 'username',
  //   align: 'center',
  // },
  // {
  //   title: '主机密码',
  //   dataIndex: 'password',
  //   key: 'password',
  // },
  // {
  //   title: '端口',
  //   dataIndex: 'port',
  //   key: 'port',
  // },
  // {
  //   title: 'JDK路径',
  //   dataIndex: 'jdkPath',
  //   key: 'jdkPath',
  // },
  {
    title: '服务安装路径',
    dataIndex: 'insPath',
    key: 'insPath',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
  },
]

export const actions = [
  {
    id: 'configNginx',
    component: 'Button',
    title: 'Nginx配置',
    isButton: true,
  },
  {
    id: 'addClusters',
    component: 'Button',
    title: '添加集群节点',
    isButton: true,
  },
  // {
  //   id: '#3',
  //   component: 'Select',
  //   name: 'xxx1',
  //   label: '',
  //   rules: [],
  //   props: [],
  //   isFormItem: true,
  //   componentProps: {
  //     options: [],
  //     className: 'wh-Select',
  //   },
  // },
  {
    id: '#4',
    component: 'Select',
    isFormItem: true,
    name: 'status',
    label: '',
    rules: [],
    props: [],
    componentProps: {
      options: [
        { label: '启动(Nginx)', value: 'start' },
        { label: '停止(Nginx)', value: 'stop' },
        { label: '重启(Nginx)', value: 'restart' },
      ],
      className: 'wh-Select-status',
    },
  },
  {
    id: 'submit',
    title: '开始执行',
    isFormItem: true,
  },
]

export const initialValues = {
  status: 'start',
}

export const operationRender = [
  {
    id: 'start',
    title: '启动',
    className: 'iconfont icon-qidong wh-icon-qidong',
  },
  {
    id: 'stop',
    title: '停止',
    className: 'iconfont icon-tingzhi wh-icon-tingzhi',
  },
  {
    id: 'del',
    title: '删除',
    className: 'iconfont icon-delete wh-icon-delete',
  },
]
