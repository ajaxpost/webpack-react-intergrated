export const tableConfig = [
  {
    title: '序号',
    dataIndex: 'serial',
    key: 'serial',
    width: '25%',
  },
  {
    title: 'IP地址',
    dataIndex: 'IP',
    key: 'IP',
    width: '25%',
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
  // {
  //   id: '#4',
  //   component: 'Select',
  //   isFormItem: true,
  //   name: 'xxx',
  //   label: '',
  //   rules: [],
  //   props: [],
  //   componentProps: {
  //     options: [
  //       { label: '启动', value: 'start' },
  //       { label: '停止', value: 'stop' },
  //       { label: '删除', value: 'del' },
  //     ],
  //     className: 'wh-Select-status',
  //   },
  // },
  // {
  //   id: 'submit',
  //   title: '开始执行',
  //   isFormItem: true,
  // },
]
