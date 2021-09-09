import React, { useState, useEffect } from 'react'
import { Card, Select, Button, Divider, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import { useSelector, useDispatch, useHistory } from 'umi';
import {
    SearchOutlined, UndoOutlined, PlusOutlined
} from '@ant-design/icons';

const Norms = () => {
    let dispatch = useDispatch()
    let Nav = useSelector((state: any) => state.Model.Model)
    const { Option } = Select;
    let [id, setid] = useState('')
    let onGenderChange = (e: any) => {
        console.log(e);
        setid(e)
    }
    let getdata = () => {
        dispatch({
            type: 'Model/getModel',
            payload: { current: '', pageSize: '', query: '' }
        })
    }
    useEffect(() => {
        getdata()
        console.log(Nav);
    }, [])

    return (
        <div>
            <Card>
                <div className="flex">
                    <Form className="margin-r10">
                        <Form.Item style={{ width: 400 }} name="gender" label="所属模型" rules={[{ required: true }]}>
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
                    </Form>
                    <Button type="primary" icon={<SearchOutlined />} className="margin-r10">查询</Button>
                    <Button icon={<UndoOutlined />}>重置</Button>
                </div>
                <Divider />
                <Button icon={<PlusOutlined />} disabled>添加规格</Button>
            </Card>
        </div>
    )
}

export default Norms
