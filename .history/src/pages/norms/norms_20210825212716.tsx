import React, { useState, useEffect } from 'react'
import { Card, Select, Button, Radio, Divider, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import { useSelector, useDispatch, useHistory } from 'umi';
import { FormInstance } from 'antd/lib/form';
import { SearchOutlined, UndoOutlined, PlusOutlined } from '@ant-design/icons';

const Norms = () => {
    let Nav = useSelector((state: any) => state.Model.Model)
    let Norms = useSelector((state: any) => state.Norms.Norms)
    let dispatch = useDispatch()
    const { Option } = Select;
    const [visible, setVisible] = React.useState(false);
    let [modelid, setmodelid] = useState('')
    let [flag, setflag] = useState(true)
    const [form] = Form.useForm();//
    let formRef = React.createRef<FormInstance>();
    let [data, setdata] = useState<any>({})
    let [modename, setmodename] = useState('')//模型名称
    let onGenderChange = (e: any, item: any) => { //所属模型下拉框
        console.log(item);
        setmodename(item.children)
        setmodelid(e)
        if (e) {
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
            title: '操作',
            dataIndex: 'isShow',
            key: '_id',
            align: 'center',
            render: (text: any, record: any) => (<div><Button type="primary" onClick={() => { edit(text, record) }}>编辑</Button> <Button type="primary" className="mal10" onClick={() => { addgoto(record) }}>添加规格</Button><Popconfirm
                title="确定删除该用户吗？"
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
    }
    useEffect(() => {
        getdata()
    }, [])
    let onCancel = () => {//模态框取消
        setVisible(false)
    }
    let add = () => {//添加规格按钮
        setVisible(true)
        console.log(data);
    }
    let handleOk = () => {//表单通过
        let values = form.getFieldsValue()
        console.log(values);
        let a = values.guige.split('\n')  //新增
        console.log(modename);

        // dispatch({
        //     type: 'Norms/addNorms',
        //     payload: {
        //         name: values.name, model: modename, spec_item: a, mode: values.zhanshi, parentId: values.gender
        //     }
        // })
        setVisible(false)
    }
    let submit = () => {//ok
        form.submit()
    }
    return (
        <div>
            <Card>
                <Form form={form} preserve={false} >
                    <div className="flex">
                        <div className="margin-r10">
                            <Form.Item className="flex" style={{ width: 400 }} name="gender" label="所属模型" rules={[{ required: true }]}>
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
        </div>
    )
}

export default Norms