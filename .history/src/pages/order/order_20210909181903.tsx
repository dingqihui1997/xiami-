import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch, useHistory, } from 'umi';
import { Card, Button, Tabs, Switch, Select, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import dayjs from 'dayjs'
const Order = () => {
    let Order = useSelector((state: any) => state.Notice.Order)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: 'Notice/getOrder'
        })
        console.log(Order)
    }, [])
    let columns: any = [//表格数据
        {
            title: '用户id',
            dataIndex: 'user_id',
            key: '_id',
            align: 'center',
        },
        {
            title: '订单日期',
            dataIndex: 'pay_time',
            key: '_id',
            align: 'center',
            render: (pay_time: string) => (dayjs(pay_time).format(`YYYY-MM-DD HH:mm:ss`))
        },
        {
            title: '商品数量',
            dataIndex: 'count',
            key: '_id',
            align: 'center',
        },
        {
            title: '订单价格',
            dataIndex: 'price',
            key: '_id',
            align: 'center',
        },
        {
            title: '商品名称',
            dataIndex: 'goods_list',
            key: '_id',
            align: 'center',
            render: (text: any, record: any) => {
                return (record.goods_list.map((item: any, index: number) => {
                    return <div>{item.goods.name}</div>
                }))
            }
        },
        {
            title: '是否新品',
            dataIndex: 'isNewGood',
            key: '_id',
            align: 'center',
            render: (isNewGood: boolean) => (<div>{isNewGood ? '是' : '否'}</div>)
        },
        {
            title: '是否热卖',
            dataIndex: 'isHot',
            key: '_id',
            align: 'center',
            render: (isHot: boolean) => (<div>{isHot ? '是' : '否'}</div>)
        },
        {
            title: '是否推荐',
            dataIndex: 'isRecommend',
            key: '_id',
            align: 'center',
            render: (isRecommend: boolean) => (<div>{isRecommend ? '是' : '否'}</div>)
        },
        {
            title: '上下架',
            dataIndex: 'isShow',
            key: '_id',
            align: 'center',
            render: (isShow: boolean, _id: any,) => (<Switch defaultChecked={isShow} />)
        },
    ]
    return (
        <div>
            <Card>
                {/* <Table columns={columns} pagination={false} dataSource={goods && goods.data} rowKey="_id" /> */}
            </Card>
        </div>
    )
}

export default Order
