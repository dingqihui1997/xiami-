import React, { useState } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
interface props {
    visible: boolean
    onCancel: () => void
    data: any
}
const goodsDetails = (props: props) => {
    let onCancel = () => {
        props.onCancel()
    }
    return (
        <div>
            <Modal width={800} visible={props.visible} title="商品详情" okText="确认" cancelText="取消" onCancel={onCancel}>

            </Modal>
        </div>
    )
}

export default goodsDetails
