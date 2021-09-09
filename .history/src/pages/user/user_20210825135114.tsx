import React, { useState, useEffect } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import style from '../index.less';
import { useSelector, useDispatch, } from 'umi';
import { type } from './../../.umi/plugin-model/Provider';

const User = () => {
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
    const onSearch = (e: any) => {
        setvalue(e)
        dispatch({
            type: 'Nav/getNav',
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
        console.log(url);
        console.log(values);
        if (data) {//编辑
            // dispatch({
            //     type: 'Nav/updateNav',
            //     payload: { title: value.title, url: url, id: data._id }
            // })
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
    let onPreview = async (file: any) => {//点击预览图片 
        // let src1 = file.url;
        // if (!src1) {
        //     src1 = await new Promise(resolve => {
        //         const reader = new FileReader();
        //         reader.readAsDataURL(file.originFileObj);
        //         reader.onload = () => resolve(reader.result);
        //     });
        // }
        // // setflag(true)
        // seturl(src1)
    }
    let onchange = (info: any) => {//图片预览 上传图片成功
        if (info.file.status === 'done') {
            console.log(info);
            seturl(info.file.response.data)
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
        seturl(record.url)
        console.log(record);
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
        getdata()
    }, [])
    let getdata = () => {
        dispatch({
            type: 'User/getUser',
            payload: { current: current, pageSize: pageSize, query: value }
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

    return (
        <div>
            <Card>
                <div>
                    <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加用户</Button>
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
                            className="mar-l15"
                            label="图片地址"
                            name="url"
                            rules={[{ required: true, message: '图片为必传项' }]}
                        >
                            <Upload onChange={onchange} showUploadList={false} name="logo" headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload" listType="picture" onPreview={onPreview}>
                                <div className={`${style.upload}`}>点击上传图片</div>
                            </Upload>
                            <div>
                                <Image
                                    width="200"
                                    src={url}
                                />
                            </div>
                        </Form.Item>
                        <Form.Item
                            className="mar-l15"
                            label="用户名称"
                            name="username"
                            rules={[{ required: true, message: '标题不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            className="mar-l15"
                            label="用户密码"
                            name="password"
                            rules={[{ required: true, message: '标题不能为空' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="用户电话"
                            name="mobile"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="用户邮箱"
                            name="email"
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table columns={columns} pagination={false} dataSource={Nav && Nav.data} rowKey="_id" />
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

export default User
