
import React, { useState, useEffect } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, Modal, Select, Image, Pagination, Popconfirm } from 'antd';
import style from '../index.less';
import { useSelector, useDispatch, } from 'umi';
import Goods from './../goods/goods';
import { type } from './../../.umi/plugin-dva/connect';

const Recommend = () => {
    let goods = useSelector((state: any) => state.Goods.Goods)
    let dispatch = useDispatch()
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm();//
    let [url, seturl] = useState('')//预览图
    const [current, setcurrent] = React.useState(1) //页数
    const [pageSize, setpageSize] = React.useState(5)
    const { Option } = Select;
    let [data, setdata] = useState<any>({})
    const onSearch = (e: any) => {
        setvalue(e)
        dispatch({
            type: 'Nav/getNav',
            payload: { current: current, pageSize: pageSize, query: e }
        })
    };//输入框的值
    let add = () => {//添加轮播图按钮
        setVisible(true)
        setdata('')
        seturl('')
    }
    let onChange = (e: any, item: any) => {//选择下属商品
        console.log(item);
    }
    let onCancel = () => {//取消按钮
        setVisible(false)
    }
    let handleOk = () => {//欧克按钮
        form.submit()
        // if (data) {//编辑
        //     let value = form.getFieldsValue()
        //     dispatch({
        //         type: 'Nav/updateNav',
        //         payload: { title: value.title, url: url, id: data._id }
        //     })
        // } else {
        //     if (values && url) {
        //         dispatch({
        //             type: 'Nav/addNav',
        //             payload: { title: values.title, url: url }
        //         })
        //     } else {
        //         message.error('请上传完整信息')
        //     }
        // }
        // setVisible(false)
    }
    let isblock = (isShow: boolean, record: any) => {//是否显示
        dispatch({
            type: 'Nav/showNav',
            payload: { id: record._id, isShow: isShow }
        })
    }
    let edit = (text: any, record: any) => {//编辑
        setVisible(true)
        setdata(record)
        seturl(record.url)
        console.log(record);
    }
    let columns: any = [//表格数据
        {
            title: '图片',
            dataIndex: 'url',
            key: '_id',
            align: 'center',
            render: (url: any) => (<img src={url} width="70" height="70" />)
        },
        {
            title: '路径',
            dataIndex: 'url',
            key: '_id',
            align: 'center',
        },
        {
            title: '标题',
            dataIndex: 'title',
            align: 'center',
            key: '_id',
        },
        {
            title: '是否显示',
            dataIndex: 'isShow',
            key: '_id',
            align: 'center',
            render: (isShow: boolean, _id: any,) => (<Switch defaultChecked={isShow} onChange={() => { isblock(!isShow, _id,) }} />)
        },
        {
            title: '操作',
            dataIndex: 'isShow',
            key: '_id',
            align: 'center',
            render: (text: any, record: any) => (<div><Button type="primary" onClick={() => { edit(text, record) }}>编辑</Button> <Popconfirm
                title="确定删除该导航吗"
                onConfirm={() => { confirm(text, record) }}
                okText="Yes"
                cancelText="No"
            >
                <Button className="mal10" danger >删除</Button>
            </Popconfirm></div>)
        },
    ]
    useEffect(() => {
        getgoods()
        console.log(goods);
    }, [])
    let getgoods = () => {//获取商品列表
        dispatch({
            type: 'Goods/getGoods',
            payload: { current: current, pageSize: 999999, query: '' }
        })
    }
    let onShowSizeChange = (current1: number, pageSize1?: number) => {//分页
        dispatch({
            type: 'Nav/getNav',
            payload: { current: current1, pageSize: pageSize1, query: value }
        })
    }
    let confirm = (text: any, record: any) => {//确认
        console.log(record);
        dispatch({
            type: 'Nav/delNav',
            payload: record._id
        })
    }
    let onFinish = () => {//完成验证点击确定
        let values = form.getFieldsValue()
        dispatch({
            type: 'recommend/addrecommend',
            payload: values
        })
        setVisible(false)
    }
    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加导航</Button>
                <Modal visible={visible} title={data ? '编辑导航' : '添加推荐导航'} onOk={handleOk}
                    onCancel={onCancel}
                    destroyOnClose={true}
                    okText="确定" cancelText="取消">
                    <Form
                        form={form}
                        preserve={false}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="导航名称"
                            name="name"
                            rules={[{ required: true, message: '图片为必传项' }]}
                        >
                            <Input placeholder="请输入导航名称" />
                        </Form.Item>
                        <Form.Item
                            initialValue={data && data ? data.title : ''}
                            label="导航描述"
                            name="desc"
                            rules={[{ required: true, message: '标题不能为空' }]}
                        >
                            <Input placeholder="请输入导航描述" />
                        </Form.Item>
                        <Form.Item
                            label="下属商品"
                            name="goods"
                            rules={[{ required: true, message: '标题不能为空' }]}
                        >
                            <Select onChange={onChange} mode="multiple" placeholder="请选择下属商品" allowClear>
                                {
                                    goods.data && goods.data.map((item: any, index: number) => {
                                        return <Option value={item._id} key={index}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                {/* <Table columns={columns} pagination={false} dataSource={Nav && Nav.data} rowKey="_id" />
                <div className="mat10">
                    <Pagination
                        showSizeChanger
                        onChange={onShowSizeChange}
                        current={current}
                        defaultPageSize={pageSize}
                        pageSizeOptions={['5', '10']}
                        total={Nav && Nav.total}
                        showTotal={total => `共计 ${total && total} 条`}
                    />
                </div> */}
            </Card>
        </div>
    )
}

export default Recommend
