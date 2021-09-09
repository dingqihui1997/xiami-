import React, { useState, useEffect } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, Modal, Upload, Image, Pagination, Popconfirm, Select } from 'antd';
import style from '../index.less';
import { useSelector, useDispatch, } from 'umi';

const Parameter = () => {
    let goods = useSelector((state: any) => state.Goods.Goods)
    let Params = useSelector((state: any) => state.Params.Params)
    let dispatch = useDispatch()
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm();//
    let [url, seturl] = useState('')//预览图
    const [current, setcurrent] = React.useState(1) //页数
    const [pageSize, setpageSize] = React.useState(5)
    let [data, setdata] = useState<any>({})
    let [parentId, setparentId] = useState('')
    const onSearch = (e: any) => {
        setvalue(e)
        dispatch({
            type: 'Nav/getNav',
            payload: { current: current, pageSize: pageSize, query: e }
        })
    };//输入框的值
    let choice = (e: string) => {//选择商品
        setparentId(e)
        getParams(e)
    }
    let add = () => {//添加轮播图按钮
        parentId ? setVisible(true) : message.error('请选择所属商品')
        setdata('')
        seturl('')
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
    let onFinish = () => {//验证通过
        let values = form.getFieldsValue()
        console.log(data);
        if (!data) {
            dispatch({//添加
                type: 'Params/addParams',
                payload: { parentId: parentId, url: values.url, name: values.name, desc: values.desc }
            })
        } else {
            dispatch({//编辑
                type: 'Params/putParams',
                payload: { id: data._id, url: values.url, name: values.name, desc: values.desc }
            })
        }

        // setVisible(false)
    }
    let onchange = (info: any) => {//图片预览 上传图片成功
        if (info.file.status === 'done') {
            console.log(info);
            seturl(info.file.response.data)
            form.setFieldsValue({ url: info.file.response.data })
        }
    }
    let edit = (text: any, record: any) => {//编辑
        setVisible(true)
        setdata(record)
        seturl(record.url)
        form.setFieldsValue({ url: record.url })
    }
    let columns: any = [//表格数据
        {
            title: '#',
            dataIndex: 'index',
            key: '_id',
            align: 'center',
            render: (e: any, record: any, index: number) => (<div>{index + 1}</div>)
        },
        {
            title: '图片',
            dataIndex: 'url',
            key: '_id',
            align: 'center',
            render: (url: any) => (<img src={url} width="70" height="70" />)
        },
        {
            title: '参数名称',
            dataIndex: 'name',
            key: '_id',
            align: 'center',
        },
        {
            title: '参数描述',
            dataIndex: 'desc',
            align: 'center',
            key: '_id',
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
    }, [])

    let getgoods = () => {//获取商品列表
        dispatch({
            type: 'Goods/getGoods',
            payload: { current: current, pageSize: 9999, query: value }
        })
    }
    let getParams = (e: string) => {//获取规格列表
        dispatch({
            type: "Params/getParams",
            payload: { parentId: e }
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
                <Form
                    preserve={false}>
                    <Form.Item label="所属商品" name="parentId" rules={[{ required: true, message: '请选择商品' }]}>
                        <Select style={{ width: 300 }} onChange={choice}>
                            {goods && goods.data && goods.data.map((item: any, index: number) => {
                                return <option value={item._id} key={index}>{item.name}</option>
                            })}
                        </Select>
                        <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>添加参数</Button>
                    </Form.Item>
                </Form>
                <Modal visible={visible} title={data ? '编辑轮播图' : '添加轮播图'} onOk={handleOk}
                    onCancel={() => (setVisible(false))}
                    destroyOnClose={true}
                    okText="确定" cancelText="取消">
                    <Form
                        form={form}
                        preserve={false}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className="mar-l15"
                            label="图片地址"
                            name="url"
                            rules={[{ required: true, message: '图片为必传项' }]}
                        >
                            <Upload onChange={onchange} showUploadList={false} name="logo" headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload" listType="picture">
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
                            initialValue={data && data ? data.name : ''}
                            label="参数名称"
                            name="name"
                            rules={[{ required: true, message: '参数名称不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            initialValue={data && data ? data.desc : ''}
                            label="参数描述"
                            name="desc"
                            rules={[{ required: true, message: '参数描述不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table columns={columns} pagination={false} dataSource={Params && Params.data} rowKey="_id" />
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

export default Parameter
