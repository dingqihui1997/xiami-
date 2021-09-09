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
                <div>商品名称：{props.data && props.data.name}</div>
                <div>所属分类</div>
                <div>商品原价</div>
                <div>商品现价</div>
                <div>商品单位</div>
                <div>商品库存</div>
                <div>商品简介</div>
                <div>推荐介绍</div>
                <div>是否新品</div>
                <div>是否热销</div>
                <div>是否推荐</div>
                <div>商品规格</div>
                <div>封面图</div>
                <div>产品图</div>
            </Modal>
        </div>
    )
}

export default goodsDetails
