import React, { useState, useEffect } from 'react'
import { Card, Select, Button, Radio, Divider, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import { useSelector, useDispatch, useHistory, } from 'umi';
import { FormInstance } from 'antd/lib/form';
import { SearchOutlined, UndoOutlined, PlusOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router'
const Norms = () => {
    let Nav = useSelector((state: any) => state.Model.Model)
    let Norms = useSelector((state: any) => state.Norms.Norms)
    let dispatch = useDispatch()
    let location: any = useLocation().state//路由传参
    const { Option } = Select;
    const [visible, setVisible] = React.useState(false);
    let [modelid, setmodelid] = useState('')
    let [flag, setflag] = useState(true)
    const [form] = Form.useForm();//
    let formRef = React.createRef<FormInstance>();
    let [data, setdata] = useState<any>({})
    let [modename, setmodename] = useState('')//模型名称
    let [show, setshow] = useState(false)
    let onGenderChange = (e: any, item: any) => { //所属模型下拉框
        if (e) {
            data = item.children
            setmodename(data)
            setmodelid(e)
            setflag(false)
        } else {
            setflag(true)
        }
        getnorms(e)
    }
    let onGenderChange1 = (e: string, item: any) => {//新增规格下拉框
        setmodename(item.children)
    }
    let getdata = () => {//获取模型名称数据
        dispatch({
            type: 'Model/getModel',
            payload: { current: '', pageSize: '', query: '' }
        })
    }
    let getnorms = (e: String) => {//获取规格列表
        dispatch({
            type: 'Norms/getNorms',
            payload: { parentId: e }
        })
    }
    let columns: any = [//表格数据
        {
            title: '#',
            dataIndex: 'active',
            key: '_id',
            align: 'center',
        },
        {
            title: '规格名称',
            dataIndex: 'name',
            key: '_id',
            align: 'center',
        },
        {
            title: '所属模型',
            dataIndex: 'model',
            key: '_id',
            align: 'center',
        },
        {
            title: '展现方式',
            dataIndex: 'mode',
            key: '_id',
            align: 'center',
        },
        {
            title: '规格项',
            dataIndex: 'spec_item',
            key: '_id',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'isShow',
            key: '_id',
            align: 'center',
            render: (text: any, record: any) => (<div> <Popconfirm
                title="确定删除该规格吗？"
                onConfirm={() => { confirm(text, record) }}
                okText="确定"
                cancelText="取消"
            >
                <Button className="mal10" danger >删除</Button>
            </Popconfirm></div>)
        },
    ]
    let onReset = () => {//清空表单
        form.resetFields();
        setflag(true)
        setshow(false)
    }
    useEffect(() => {
        getdata()
        // console.log(location.name);
        if (location && location.id) {
            getnorms(location.id)
            setflag(false)
            console.log(111);
        }
    }, [])
    let onCancel = () => {//模态框取消
        setVisible(false)
    }
    let add = () => {//添加规格按钮
        setVisible(true)
    }
    let handleOk = () => {//表单通过
        let values = form.getFieldsValue()
        let a = values.guige.split('\n')  //新增
        dispatch({
            type: 'Norms/addNorms',
            payload: {
                name: values.name, model: modename, spec_item: a, mode: values.zhanshi, parentId: values.gender
            }
        })
        setVisible(false)
    }
    let submit = () => {//ok
        form.submit()
    }
    let confirm = (text: string, record: any) => {//确定删除
        dispatch({
            type: 'Norms/delNorms',
            payload: { parentId: record.parentId, attrId: record._id }
        })
        getnorms(modelid)
    }
    return (
        <div>
            <Card>
                <Form form={form} preserve={false} >
                    <div className="flex">
                        <div className="margin-r10">
                            <Form.Item initialValue={location && location ? location && location.id : ''} className="flex" style={{ width: 400 }} name="gender" label="所属模型" rules={[{ required: true }]}>
                                <Select
                                    placeholder="请选择所属模型"
                                    onChange={onGenderChange}
                                    allowClear
                                >
                                    {Nav && Nav.data && Nav.data.map((item: any, index: number) => {
                                        return <Option value={item._id} key={index}>{item.name}</Option>
                                    })}
                                </Select>

                            </Form.Item>
                        </div>
                        <div>
                            <Button type="primary" icon={<SearchOutlined />} className="margin-r10">查询</Button>
                            <Button icon={<UndoOutlined />} onClick={onReset}>重置</Button>
                        </div>
                    </div>
                </Form>
                <Divider />
                <Button icon={<PlusOutlined />} disabled={flag} onClick={add}>添加规格</Button>
                <Modal visible={visible} title={Object.keys(data).length ? '编辑规格' : '新增规格'} onOk={submit}
                    onCancel={onCancel}
                    destroyOnClose={true}
                    okText="确定" cancelText="取消">
                    <Form
                        form={form}
                        preserve={false}
                        onFinish={handleOk}
                    >
                        <Form.Item
                            label="规格名称"
                            name="name"
                            rules={[{ required: true, message: '模型名称不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item initialValue={modename} className="flex" name="gender" label="所属模型" rules={[{ required: true, message: '模型名称不能为空' }]}>
                            <Select
                                placeholder="请选择所属模型"
                                onChange={onGenderChange1}
                                allowClear
                            >
                                {Nav && Nav.data && Nav.data.map((item: any, index: number) => {
                                    return <Option value={item._id} key={index}>{item.name}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="规格项" name="guige" rules={[{ required: true, message: '规格项不能为空' }]}>
                            <Input.TextArea placeholder="请输入规格项，一行一个" />
                        </Form.Item>
                        <Form.Item name="zhanshi" rules={[{ required: true, message: '展示方式不能为空' }]} label="展示文字">
                            <Radio.Group name="radiogroup" >
                                <Radio value="文字">文字</Radio><Radio value="图片">图片</Radio><Radio value="颜色">颜色</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
            <Card>
                <Table columns={columns} pagination={false} dataSource={Norms && Norms.data} rowKey="_id" />
            </Card>
        </div>
    )
}

export default Norms
