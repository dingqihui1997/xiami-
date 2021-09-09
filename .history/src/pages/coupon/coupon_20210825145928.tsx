import React, { useState, useEffect } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import style from '../index.less';
import { useSelector, useDispatch, } from 'umi';

const Coupon = () => {
    let Nav = useSelector((state: any) => state.User.User)
    let dispatch = useDispatch()
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm();//
    let [url, seturl] = useState('')//预览图
    const [current, setcurrent] = React.useState(1) //页数
    const [pageSize, setpageSize] = React.useState(5)
    let [data, setdata] = useState<any>({})
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
        if (data) {//编辑
            if (values.username && url) {
                dispatch({
                    type: 'User/updateUser',
                    payload: { id: data._id, username: values.username, avatar: url, email: values.email, mobile: values.mobile, status: data.status }
                })
                setVisible(false)
            } else message.error('请填写完整信息')
        } else {
            if (values.username && values.password && url) {
                dispatch({
                    type: 'User/addUser',
                    payload: { username: values.username, avatar: url, email: values.email, mobile: values.mobile, password: values.password, status: false }
                })
                setVisible(false)
            } else {
                message.error('请填写完整信息')
            }
        }
    }
    let isblock = (isShow: boolean, record: any) => {//是否显示
        dispatch({
            type: 'User/showUser',
            payload: { id: record._id, status: isShow }
        })
    }
    let edit = (text: any, record: any) => {//编辑
        setVisible(true)
        setdata(record)
        seturl(record.avatar)
    }
    let columns: any = [//表格数据
        {
            title: '用户头像',
            dataIndex: 'avatar',
            key: '_id',
            align: 'center',
            render: (avatar: any) => (<img className="radius100" src={avatar} width="70" height="70" />)
        },
        {
            title: '用户名称',
            dataIndex: 'username',
            key: '_id',
            align: 'center',
        },
        {
            title: '用户电话',
            dataIndex: 'mobile',
            align: 'center',
            key: '_id',
        },
        {
            title: '用户邮箱',
            dataIndex: 'email',
            align: 'center',
            key: '_id',
        },
        {
            title: '是否禁用',
            dataIndex: 'status',
            key: '_id',
            align: 'center',
            render: (status: boolean, _id: any,) => (<Switch defaultChecked={status} onChange={() => { isblock(!status, _id,) }} />)
        },
        {
            title: '操作',
            dataIndex: 'isShow',
            key: '_id',
            align: 'center',
            render: (text: any, record: any) => (<div><Button type="primary" onClick={() => { edit(text, record) }}>编辑</Button> <Popconfirm
                title="确定删除该用户吗？"
                onConfirm={() => { confirm(text, record) }}
                okText="Yes"
                cancelText="No"
            >
                <Button className="mal10" danger >删除</Button>
            </Popconfirm></div>)
        },
    ]
    useEffect(() => {
        // getdata()
    }, [])
    let getdata = () => {
        dispatch({
            type: 'User/getUser',
            payload: { current: current, pageSize: pageSize, query: value }
        })
    }
    let onShowSizeChange = (current1: number, pageSize1?: number) => {//分页
        setcurrent(current1)
        setpageSize(pageSize1!)
        dispatch({
            type: 'User/getUser',
            payload: { current: current1, pageSize: pageSize1, query: value }
        })
    }
    let confirm = (text: any, record: any) => {//确认删除用户
        console.log(record);
        dispatch({
            type: 'User/delUser',
            payload: record._id
        })
    }
    //时间
    let onChange = (e: any) => {
        console.log(e);
    }
    let onOk = (e: any) => {
        console.log(e);
    }
    return (
        <div>
            <Card>
                <div className="margin-b20">
                    <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加优惠券</Button>
                </div>
                <Modal visible={visible} title={data ? '编辑导航' : '添加导航'} onOk={handleOk}
                    onCancel={onCancel}
                    destroyOnClose={true}
                    okText="确定" cancelText="取消">
                    <Form
                        form={form}
                        preserve={false}
                    >
                        <Form.Item
                            className="-mar-l5"
                            label="优惠券名称"
                            name="name"
                            rules={[{ required: true, message: '优惠券名称不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            className="mal10"
                            label="使用门槛"
                            name="amount"
                            initialValue={data ? data.username : ""}
                            rules={[{ required: true, message: '使用门槛不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                        {data ? '' : <Form.Item
                            className="mal10"
                            label="优惠金额"
                            name="threshold"
                            rules={[{ required: true, message: '优惠金额不能为空' }]}
                        >
                            <Input.Password />
                        </Form.Item>}

                        <Form.Item
                            className="mal10"
                            label="开始时间"
                            name="start_time"
                            rules={[{ required: true, message: '开始时间不能为空' }]}
                        >
                            <DatePicker showTime onChange={onChange} onOk={onOk} placeholder="请选择开始时间" style={{ width: 380 }} />
                        </Form.Item>
                        <Form.Item
                            className="mal10"
                            label="结束时间"
                            name="end_time"
                            rules={[{ required: true, message: '结束时间不能为空' }]}
                        >
                            <DatePicker showTime onChange={onChange} onOk={onOk} placeholder="请选择开始时间" style={{ width: 380 }} />
                        </Form.Item>
                        <Form.Item
                            className="mal10"
                            label="发放数量"
                            name="number"
                            rules={[{ required: true, message: '数量不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                {/* <Table columns={columns} pagination={false} dataSource={Nav && Nav.data} rowKey="_id" /> */}
                {/* <div className="mat10">
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

export default Coupon
