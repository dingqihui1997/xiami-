import React, { useState, useEffect } from 'react'
import { Card, Select, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import { useSelector, useDispatch, useHistory } from 'umi';

const Norms = () => {
    let dispatch = useDispatch()
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
    useEffect(() => {
        getdata()
        console.log(Nav);
    }, [])

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
                            {Nav && Nav.data.map((item: any, index: number) => {
                                return <Option value={item._id} key={index}>{item.name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Norms
