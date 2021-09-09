import React, { useState, useEffect } from 'react'
import { Card, Select, Button, Radio, Divider, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import { useSelector, useDispatch, useHistory } from 'umi';
import { FormInstance } from 'antd/lib/form';
import {
import { type } from './../../.umi/plugin-dva/connect';
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
    let [modename, setmodename] = useState('')//模型名称
    let onGenderChange = (e: any) => { //所属模型下拉框
        console.log(e);
        setmodelid(e)
        if (e) {
            setflag(false)
        } else {
            setflag(true)
        }
    }
    let onGenderChange1 = (e: string, item: any) => {//新增规格下拉框
        setmodename(item.children)
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
    }, [])
    let onCancel = () => {//模态框取消
        setVisible(false)
    }
    let add = () => {//添加规格按钮
        setVisible(true)
    }
    let handleOk = () => {//表单通过
        let values = form.getFieldsValue()
        console.log(values);
        values.guige.jion('/n')
        dispatch({
            type: 'Norms/addNorms',
            payload: {

            }
        })
    }
    let submit = () => {//ok
        form.submit()
    }
    return (
        <div>
            <Card>
                <Form form={form}  >
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
                <Modal visible={visible} title={data ? '编辑模型' : '新增规格'} onOk={submit}
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
                        <Form.Item className="flex" name="gender" label="所属模型" rules={[{ required: true, message: '模型名称不能为空' }]}>
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
                            <Input.TextArea />
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
