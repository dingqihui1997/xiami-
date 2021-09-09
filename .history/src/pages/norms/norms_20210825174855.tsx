import React, { useState, useEffect } from 'react'
import { Card, Select, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import { useSelector, useDispatch, useHistory } from 'umi';
let dispatch = useDispatch()

const Norms = () => {
    let Nav = useSelector((state: any) => state.Model.Model)
    const { Option } = Select;
    let onGenderChange = (e: any) => {
        console.log(e);
    }

    let getdata = () => {
        dispatch({
            type: 'Model/getModel',
            payload: { current: '', pageSize: '', query: '' }
        })
    }
    return (
        <div>
            <Card>
                <Form>
                    <Form.Item style={{ width: 400 }} name="gender" label="所属模型" rules={[{ required: true }]}>
                        <Select
                            placeholder="请选择所属模型"
                            onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Norms
