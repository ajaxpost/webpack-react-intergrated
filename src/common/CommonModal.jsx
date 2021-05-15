import React, { memo } from 'react'
import { Modal, Button } from 'antd'

const CommonModal = memo(function CommonModal({
  visible,
  title = '',
  onOk = null,
  onCancel = null,
  maskClosable = false,
  destroyOnClose = true,
  footer,
  component,
  modalCompProps = {},
  className = '',
  width = '80%',
  onGetData = null,
}) {
  /* eslint-disable indent */
  const _footer = footer
    ? [
        <Button type="primary" onClick={onOk} size={'large'} key={'save'}>
          保存
        </Button>,
        <Button onClick={onCancel} size={'large'} key={'cancel'}>
          取消
        </Button>,
      ]
    : null
  const ModalComp = component

  return (
    <>
      <Modal
        title={title}
        visible={visible}
        maskClosable={maskClosable}
        destroyOnClose={destroyOnClose}
        footer={_footer}
        width={width}
        onCancel={onCancel}
        className={`common-modal ${className}`}
      >
        {ModalComp ? (
          <ModalComp
            onCancel={onCancel}
            onGetData={onGetData}
            componentProps={{ ...modalCompProps }}
          ></ModalComp>
        ) : null}
      </Modal>
    </>
  )
})

export default CommonModal
