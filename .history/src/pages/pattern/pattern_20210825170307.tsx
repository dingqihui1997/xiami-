import React, { useState, useEffect } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import style from '../index.less';
import { useSelector, useDispatch, } from 'umi';
import dayjs from 'dayjs'
const Pattern = () => {
    let Nav = useSelector((state: any) => state.Model.Model)
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
    let handleOk = () => {//欧克按钮
        let values = form.getFieldsValue()
        console.log(values);
        if (!data) {
            dispatch({
                type: 'Model/addModel',
                payload: values
            })
        }
        else {//编辑
            dispatch({
                type: 'Model/updateModel',
                payload: { id: data._id, name: values.name }
            })
        }
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
            title: '#',
            dataIndex: 'active',
            key: '_id',
            align: 'center',
        },
        {
            title: '模型名称',
            dataIndex: 'name',
            key: '_id',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'isShow',
            key: '_id',
            align: 'center',
            render: (text: any, record: any) => (<div><Button type="primary" onClick={() => { edit(text, record) }}>编辑</Button> <Button type="primary" className="mal10">添加规格</Button><Popconfirm
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
            type: 'Model/getModel',
            payload: { current: current, pageSize: pageSize, query: value }
        })
    }
    let onShowSizeChange = (current1: number, pageSize1?: number) => {//分页
        setcurrent(current1)
        setpageSize(pageSize1!)
        dispatch({
            type: 'Model/getModel',
            payload: { current: current1, pageSize: pageSize1, query: value }
        })
    }
    let confirm = (text: any, record: any) => {//确认删除用户
        console.log(record);
        dispatch({
            type: 'Model/delModel',
            payload: record._id
        })
    }

    let submit = () => {
        form.submit()
    }
    return (
        <div>
            <Card>
                <div className="margin-b20">
                    <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加模型</Button>
                </div>
                <Modal visible={visible} title={data && data ? '编辑模型' : '添加模型'} onOk={submit}
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
                            label="模型名称"
                            name="name"
                            initialValue={data ? data.name : ''}
                            rules={[{ required: true, message: '模型名称不能为空' }]}
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

export default Pattern
