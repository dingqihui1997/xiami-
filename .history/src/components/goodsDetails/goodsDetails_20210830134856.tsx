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
                <div>所属分类:{props.data && props.data.name}</div>
                <div>商品原价:{props.data && props.data.originalPrice}</div>
                <div>商品现价:{props.data && props.data.presentPrice}</div>
                <div>商品单位:{props.data && props.data.company}</div>
                <div>商品库存:{props.data && props.data.stock}</div>
                <div>商品简介:{props.data && props.data.introduction}</div>
                <div>推荐介绍:{props.data && props.data.sellDesc[0]}</div>
                <div>是否新品:{props.data && props.data.isNewGood ? '是' : '否'}</div>
                <div>是否热销:{props.data && props.data.isHot ? '是' : '否'}</div>
                <div>是否推荐:{props.data && props.data.isRecommend ? '是' : '否'}</div>
                <div>商品规格{
                    props.data && props.data.spec.map((item: any) => {
                        return <div>
                            <div>{item.name}</div>
                            <div>{item.spec_item}</div>
                        </div>
                    })
                }</div>
                <div className="flex">封面图:
                    <img style={{ width: 60, height: 60 }} src={props.data && props.data.cover}></img>
                </div>
                <div>产品图</div>
            </Modal>
        </div>
    )
}

export default goodsDetails
