import React, { useState, useEffect } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import style from '../index.less';
import { useSelector, useDispatch, } from 'umi';

const Navigation = () => {
    let Nav = useSelector((state: any) => state.Nav.Nav)
    let dispatch = useDispatch()
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm();//
    let [url, seturl] = useState('')//预览图
    const [current, setcurrent] = React.useState(1) //页数
    const [pageSize, setpageSize] = React.useState(5)
    let [total, settotal] = React.useState(0)
    let [data, setdata] = useState<any>({})
    const onSearch = (e: any) => {
    };//输入框的值
    let add = () => {//添加轮播图按钮
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

        } else {
            if (values && url) {
                dispatch({
                    type: 'Nav/addNav',
                    payload: { title: values.title, url: url }
                })
                setVisible(false)
            } else {
                message.error('请上传完整信息')
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
    let onchange = (info: any) => {//图片预览
        if (info.file.status === 'done') {
            console.log(info);
            seturl(info.file.response.data)
        }
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
        getdata()
        if (Nav) {
            settotal(Nav.total)
            console.log(Nav.total);
        }
    }, [])
    let getdata = () => {
        dispatch({
            type: 'Nav/getNav',
            payload: { current: current, pageSize: pageSize, query: value }
        })
    }
    let onShowSizeChange = (current1: number, pageSize1?: number) => {//分页
        setcurrent(current1)
        setpageSize(pageSize1!)
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
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加导航</Button>
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
                            initialValue={data && data ? data.title : ''}
                            label="图片标题"
                            name="title"
                            rules={[{ required: true, message: '标题不能为空' }]}
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
                        defaultCurrent={1}
                        defaultPageSize={pageSize}
                        pageSizeOptions={['5', '10']}
                        total={Nav && total && total}
                        showTotal={total => `共计 ${total && total} 条`}
                    />
                </div>
            </Card>
        </div>
    )
}

export default Navigation
