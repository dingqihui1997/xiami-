import React, { useState, useEffect } from 'react'
import { Card, Button, Select, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import style from '../index.less';
import { useSelector, useDispatch, } from 'umi';
import dayjs from 'dayjs'
const Seckill = () => {
    let goods = useSelector((state: any) => state.Goods.Goods)
    let dispatch = useDispatch()
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm();//
    let [id, setid] = useState('')//id
    const [current, setcurrent] = React.useState(1) //页数
    const [pageSize, setpageSize] = React.useState(5)
    let [data, setdata] = useState<any>({})
    let [start_time, setstart_time] = useState('')//开始时间，结束时间
    let [end_time, setend_time] = useState('')
    let [good, setgood] = useState<any>({})//商品
    const { RangePicker } = DatePicker;
    const onSearch = (e: any) => { //搜索
        setvalue(e)
        dispatch({
            type: 'Coupon/getCoupon',
            payload: { current: current, pageSize: pageSize, query: e }
        })
    };//输入框的值
    let add = () => {//添加用户按钮
        setVisible(true)
        setdata('')
    }
    let onCancel = () => {//取消按钮
        setVisible(false)
    }
    let choice = (e: string, item: any) => {//选择商品
        setgood(item)
    }
    let handleOk = () => {//表单验证成功
        let values = form.getFieldsValue()
        dispatch({
            type: 'Seckill/addSeckill',
            payload: { start_time: values.start_time, end_time: values.end_time, goods_number: values.goods_number, price: values.price, goods: good, isShow: true }
        })
        setVisible(false)
    }
    let isblock = (isShow: boolean, record: any) => {//是否显示
        dispatch({
            type: 'Coupon/showCoupon',
            payload: { id: record._id, isShow: isShow }
        })
    }
    let edit = (text: any, record: any) => {//编辑
        setVisible(true)
        setdata(record)
        setid(record._id)
    }
    let columns: any = [//表格数据
        {
            title: '秒杀商品',
            dataIndex: 'name',
            key: '_id',
            align: 'center',
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'start_time',
            align: 'center',
            render: (start_time: any) =>
                (<div>{dayjs(start_time).format('YYYY-MM-DD HH:mm:ss')}</div>)

        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
            align: 'center',
            key: 'end_time',
            render: (end_time: any) => (<div>{dayjs(end_time).format('YYYY-MM-DD HH:mm:ss')}</div>)
        },
        {
            title: '秒杀价格',
            dataIndex: 'threshold',
            align: 'center',
            key: '_id',
        },
        {
            title: '秒杀数量',
            dataIndex: 'amount',
            key: '_id',
            align: 'center',
        },
        {
            title: '是否禁用',
            dataIndex: 'isShow',
            align: 'center',
            key: '_id',
            render: (isShow: boolean, _id: any,) => (<Switch defaultChecked={isShow} onChange={() => { isblock(!isShow, _id,) }} />)
        },
        {
            title: '操作',
            dataIndex: 'isShow',
            key: '_id',
            align: 'center',
            render: (text: any, record: any) => (<div><Button type="primary" onClick={() => { edit(text, record) }}>编辑</Button> <Popconfirm
                title="确定删除该用户吗？"
                onConfirm={() => { confirm(text, record) }}
                okText="确定"
                cancelText="取消"
            >
                <Button className="mal10" danger >删除</Button>
            </Popconfirm></div>)
        },
    ]
    useEffect(() => {
        getgoods()
    }, [])

    let getgoods = () => {//获取商品列表
        dispatch({
            type: 'Goods/getGoods',
            payload: { current: current, pageSize: 9999, query: value }
        })
    }
    let getseckill = () => {//获取秒杀列表
        dispatch({
            type: 'Seckill/getSeckill',
            payload: { current: current, pageSize: 9999, query: value }
        })
    }
    let onShowSizeChange = (current1: number, pageSize1?: number) => {//分页
        setcurrent(current1)
        setpageSize(pageSize1!)
        dispatch({
            type: 'Coupon/getCoupon',
            payload: { current: current1, pageSize: pageSize1, query: value }
        })
    }
    let confirm = (text: any, record: any) => {//确认删除用户
        console.log(record);
        dispatch({
            type: 'Coupon/delCoupon',
            payload: record._id
        })
    }
    //时间
    let submit = () => {
        form.submit()
    }

    return (
        <div>
            <Card>
                <div className="margin-b20">
                    <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加秒杀</Button>
                </div>
                <Modal visible={visible} title={data && data ? '编辑秒杀' : '添加秒杀'} onOk={submit}
                    onCancel={onCancel}
                    destroyOnClose={true}
                    okText="确定" cancelText="取消">
                    <Form
                        form={form}
                        preserve={false}
                        onFinish={handleOk}
                    >
                        <Form.Item

                            className="mal10"
                            label="秒杀商品"
                            name="goods"
                            initialValue={data && data ? data.name : ''}
                            rules={[{ required: true, message: '秒杀商品不能为空' }]}
                        >
                            <Select onChange={choice}>
                                {goods && goods.data && goods.data.map((item: any, index: number) => {
                                    return <option value={item._id} key={index}>{item.name}</option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            className="mal10"
                            label="开始时间"
                            name="start_time"
                            initialValue={data && data ? data.start_time : ""}
                            rules={[{ required: true, message: '开始时间不能为空' }]}
                        >
                            <DatePicker showTime placeholder="请选择开始时间" style={{ width: 380 }} />
                        </Form.Item>
                        <Form.Item
                            className="mal10"
                            label="结束时间"
                            name="end_time"
                            initialValue={data && data ? data.end_time : ""}
                            rules={[{ required: true, message: '结束时间不能为空' }]}
                        >
                            <DatePicker showTime placeholder="请选择开始时间" style={{ width: 380 }} />
                        </Form.Item>
                        <Form.Item
                            className="mal10"
                            label="秒杀价格"
                            name="price"
                            initialValue={data && data ? data.amount : ""}
                            rules={[{ required: true, message: '开始时间不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            className="mal10"
                            label="秒杀数量"
                            name="goods_number"
                            initialValue={data && data ? data.threshold : ""}
                            rules={[{ required: true, message: '结束时间不能为空' }]}
                        >
                            <Input />
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

export default Seckill

