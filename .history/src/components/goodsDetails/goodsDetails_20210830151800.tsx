import React, { useState, useEffect } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import List from 'wangeditor/dist/menus/list';
interface props {
    visible: boolean
    onCancel: () => void
    data: any
    Norms: any
}

const goodsDetails = (props: props) => {
    let [category, setcategory] = useState('')
    let [name, setname] = useState<any>()
    let onCancel = () => {
        props.onCancel()
    }
    useEffect(() => {
        if (props.Norms && props.Norms.length && props.data.category) {
            let arr: any = []
            console.log(props.Norms);
            console.log(props.data.category);
            let a: any = {}
            props.Norms.map((item: any, index: number) => {
                item.list.map((item1: any, index: number) => {
                    if (item1._id == props.data.category) {
                        arr.push(`${item.name} / ${item1.name}`)
                    }
                })
            })
            setname(arr[0])
            console.log(arr);
        }
    }, [])
    return (
        <div>
            <Modal width={800} visible={props.visible} title="商品详情" okText="确认" cancelText="取消" onCancel={onCancel}>
                <div>商品名称：{props.data && props.data.name}</div>
                <div>所属分类:{name && name}</div>
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
                    props.data && props.data.spec.map((item: any, index: number) => {
                        return <div key={index}>
                            <div >{item.name}</div>
                            <div>{item.spec_item}</div>
                        </div>
                    })
                }</div>
                <div className="flex">封面图:
                    <img style={{ width: 120, height: 120 }} src={props.data && props.data.cover}></img>
                </div>
                <div >产品图
                    {
                        props.data && props.data.pic.map((item: any, index: number) => {
                            return <img src={item} alt="" key={index} style={{ width: 120, height: 120 }} />
                        })
                    }
                </div>
            </Modal>
        </div>
    )
}

export default goodsDetails
