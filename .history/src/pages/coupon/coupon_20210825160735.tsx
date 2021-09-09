import React, { useState, useEffect } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import style from '../index.less';
import { useSelector, useDispatch, } from 'umi';
import dayjs from 'dayjs'
const Coupon = () => {
    let Nav = useSelector((state: any) => state.Coupon.Coupon)
    let dispatch = useDispatch()
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm();//
    let [url, seturl] = useState('')//预览图
    const [current, setcurrent] = React.useState(1) //页数
    const [pageSize, setpageSize] = React.useState(5)
    let [data, setdata] = useState<any>({})
    let [start_time, setstart_time] = useState('')//开始时间，结束时间
    let [end_time, setend_time] = useState('')
    const { RangePicker } = DatePicker;
    const onSearch = (e: any) => { //搜索
        setvalue(e)
        dispatch({
            type: 'User/getUser',
            payload: { current: current, pageSize: pageSize, query: e }
        })
    };//输入框的值
    let add = () => {//添加用户按钮
        setVisible(true)
        setdata('')
        seturl('')
    }
    let onCancel = () => {//取消按钮
        setVisible(false)
    }
    let handleOk = () => {//欧克按钮
        let values = form.getFieldsValue()
        console.log(values);
        if (!data) {
            dispatch({
                type: 'Coupon/addCoupon',
                payload: values
            })
            setVisible(false)
        }
    }
    let isblock = (isShow: boolean, record: any) => {//是否显示
        dispatch({
            type: 'Coupon/showCoupon',
            payload: { id: record._id, isShow: isShow }
        })
    }
    let edit = (text: any, record: any) => {//编辑
        setVisible(true)
        // setdata(record)
    }
    let columns: any = [//表格数据
        {
            title: '优惠券名称',
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
            title: '优惠金额',
            dataIndex: 'threshold',
            align: 'center',
            key: '_id',
        },
        {
            title: '使用门槛',
            dataIndex: 'amount',
            key: '_id',
            align: 'center',
        },
        {
            title: '发放数量',
            dataIndex: 'number',
            align: 'center',
            key: '_id',
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
        getdata()
    }, [])
    let getdata = () => {
        dispatch({
            type: 'Coupon/getCoupon',
            payload: { current: current, pageSize: pageSize, query: value }
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
    let onChange = (e: any) => {//开始时间
        console.log(e);
        // setstart_time(e._d)
    }
    let endonChange = (e: any) => {//结束时间
        // console.log(e);
        // setend_time(e._d)
    }
    let submit = () => {
        form.submit()
    }
    return (
        <div>
            <Card>
                <div className="margin-b20">
                    <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加优惠券</Button>
                </div>
                <Modal visible={visible} title={data ? '编辑优惠券' : '添加优惠券'} onOk={submit}
                    onCancel={onCancel}
                    destroyOnClose={true}
                    okText="确定" cancelText="取消">
                    <Form
                        form={form}
                        preserve={false}
                        onFinish={handleOk}
                    >
                        <Form.Item
                            className="-mar-l5"
                            label="优惠券名称"
                            name="name"
                            initialValue={data ? data.name : ''}
                            rules={[{ required: true, message: '优惠券名称不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            className="mal10"
                            label="使用门槛"
                            name="amount"
                            initialValue={data ? data.amount : ""}
                            rules={[{ required: true, message: '使用门槛不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                        {data ? '' : <Form.Item
                            className="mal10"
                            label="优惠金额"
                            name="threshold"
                            initialValue={data ? data.threshold : ""}
                            rules={[{ required: true, message: '优惠金额不能为空' }]}
                        >
                            <Input />
                        </Form.Item>}

                        <Form.Item
                            className="mal10"
                            label="开始时间"
                            name="start_time"
                            initialValue={data ? dayjs(data.start_time).format('YYYY-MM-DD HH:mm:ss') : ""}
                            rules={[{ required: true, message: '开始时间不能为空' }]}
                        >
                            <DatePicker showTime onChange={onChange} onOk={onChange} placeholder="请选择开始时间" style={{ width: 380 }} />
                        </Form.Item>
                        <Form.Item
                            className="mal10"
                            label="结束时间"
                            name="end_time"
                            initialValue={data ? dayjs(data.end_time).format('YYYY-MM-DD HH:mm:ss') : ""}
                            rules={[{ required: true, message: '结束时间不能为空' }]}
                        >
                            <DatePicker showTime onChange={endonChange} onOk={endonChange} placeholder="请选择开始时间" style={{ width: 380 }} />
                        </Form.Item>
                        <Form.Item
                            className="mal10"
                            label="发放数量"
                            name="number"
                            initialValue={data ? dayjs(data.number).format('YYYY-MM-DD HH:mm:ss') : ""}
                            rules={[{ required: true, message: '数量不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table columns={columns} pagination={false} dataSource={Nav && Nav.data} rowKey="_id" />
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
                </div>
            </Card>
        </div>
    )
}

export default Coupon
