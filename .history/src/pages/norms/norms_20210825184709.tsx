import React, { useState, useEffect } from 'react'
import { Card, Select, Button, Divider, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import { useSelector, useDispatch, useHistory } from 'umi';
import { FormInstance } from 'antd/lib/form';
import {
    SearchOutlined, UndoOutlined, PlusOutlined
} from '@ant-design/icons';

const Norms = () => {
    let dispatch = useDispatch()
    let Nav = useSelector((state: any) => state.Model.Model)
    const { Option } = Select;
    const [visible, setVisible] = React.useState(false);
    let [modelid, setmodelid] = useState('')
    let [flag, setflag] = useState(true)
    const [form] = Form.useForm();//
    let formRef = React.createRef<FormInstance>();
    let [data, setdata] = useState<any>({})
    const layout = {//文本域
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    let onGenderChange = (e: any) => {
        console.log(e);
        setmodelid(e)
        if (e) {
            setflag(false)
        } else {
            setflag(true)

        }
    }
    let getdata = () => {
        dispatch({
            type: 'Model/getModel',
            payload: { current: '', pageSize: '', query: '' }
        })
    }
    let onReset = () => {//清空表单
        form.resetFields();
        setflag(true)
    }
    useEffect(() => {
        getdata()
        console.log(Nav);
    }, [])
    let onCancel = () => {//模态框取消
        setVisible(false)
    }
    let onOk = () => {//ok

    }
    let add = () => {//添加规格按钮
        setVisible(true)
    }
    return (
        <div>
            <Card>
                <Form form={form}>
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
                <Modal visible={visible} title={data ? '编辑模型' : '新增规格'} onOk={onOk}
                    onCancel={onCancel}
                    destroyOnClose={true}
                    okText="确定" cancelText="取消">
                    <Form
                        form={form}
                        preserve={false}
                    >
                        <Form.Item
                            label="规格名称"
                            name="name"
                            rules={[{ required: true, message: '模型名称不能为空' }]}
                        >
                            <Input />
                        </Form.Item>
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
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}></Form.Item>
                    </Form>
                </Modal>
            </Card>
        </div>
    )
}

export default Norms
