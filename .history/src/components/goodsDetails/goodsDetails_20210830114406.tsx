import React, { useState } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
interface props {
    visible: boolean
}
const goodsDetails = (props: props) => {
    console.log(props.visible);
    return (
        <div>
            <Modal visible={props.visible} title="商品详情" okText="确认" cancelText="取消">
                dsf
            </Modal>
        </div>
    )
}

export default goodsDetails
