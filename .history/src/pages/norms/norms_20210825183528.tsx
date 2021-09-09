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
    let [modelid, setmodelid] = useState('')
    let [flag, setflag] = useState(true)
    const [form] = Form.useForm();//
    let formRef = React.createRef<FormInstance>();
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
                <Button icon={<PlusOutlined />} disabled={flag}>添加规格</Button>
            </Card>
        </div>
    )
}

export default Norms
